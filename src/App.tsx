import React, { useState } from 'react';
import { ToastProvider, useToast } from './components/SonnerToaster';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { CropCatalogView } from './components/CropCatalogView';
import { CropDetailView } from './components/CropDetailView';
import { CameraIA } from './components/CameraIA';
import { PestControlView } from './components/PestControlView';
import { DashboardView } from './components/DashboardView';
import { HistoryView } from './components/HistoryView';
import { IrrigationNotificationsView } from './components/IrrigationNotificationsView';
import { AuthModal } from './components/AuthModal';
import { CROPS_DATA, Crop, ExperienceLevel } from './data/crops';
import { generateCropManualPDF } from './utils/pdfGenerator';
import { AppleEmoji } from './components/AppleEmoji';
import { Download, FileText, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

function AgroGuiaApp() {
  const [currentView, setCurrentView] = useState<string>('landing');
  const [selectedCrop, setSelectedCrop] = useState<Crop>(CROPS_DATA[0]);
  const [selectedLevel, setSelectedLevel] = useState<ExperienceLevel>('PRINCIPIANTE');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  const { isAuthenticated, user, recordDownload } = useAuth();
  const toast = useToast();

  const handleOpenAuth = (mode: 'login' | 'register' = 'login') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const handleNavigate = (view: string) => {
    // Protección de rutas privadas
    if (view === 'dashboard' || view === 'historial') {
      if (!isAuthenticated) {
        toast.info('Acceso para usuarios', 'Inicia sesión para acceder a tu panel de control e historial.');
        handleOpenAuth('login');
        return;
      }
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCrop = (crop: Crop) => {
    setSelectedCrop(crop);
    setCurrentView('detalle');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#1E2922]">
      {/* Navbar Superior con Contrato de 3 Zonas */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenAuth={handleOpenAuth}
        selectedLevel={selectedLevel}
        onSelectLevel={setSelectedLevel}
      />

      {/* Contenedor Principal de Vistas */}
      <main className="flex-1">
        {currentView === 'landing' && (
          <LandingPage
            onNavigate={handleNavigate}
            onOpenAuth={handleOpenAuth}
            onSelectCrop={handleSelectCrop}
            selectedLevel={selectedLevel}
          />
        )}

        {currentView === 'cultivos' && (
          <CropCatalogView
            onSelectCrop={handleSelectCrop}
            selectedLevel={selectedLevel}
            onRequireAuth={() => handleOpenAuth('login')}
          />
        )}

        {currentView === 'detalle' && (
          <CropDetailView
            crop={selectedCrop}
            onBack={() => setCurrentView('cultivos')}
            selectedLevel={selectedLevel}
            onSelectLevel={setSelectedLevel}
            onRequireAuth={() => handleOpenAuth('login')}
          />
        )}

        {currentView === 'camara' && (
          <div className="py-6">
            <CameraIA onRequireAuth={() => handleOpenAuth('login')} />
          </div>
        )}

        {currentView === 'modulos' && <PestControlView />}

        {currentView === 'riego' && <IrrigationNotificationsView />}

        {currentView === 'manuales' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-150">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F4EC] text-[#0F3D2E] text-xs font-bold mb-2">
                <span>Biblioteca de Consulta Técnica</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-[#0F3D2E]">
                Manuales Técnicos Descargables en PDF
              </h1>
              <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-2xl">
                Documentos completos por cultivo y por nivel de experiencia con tablas de nutrición NPK, requerimientos edáficos y calendario fitosanitario.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CROPS_DATA.map((c) => (
                <div
                  key={c.id}
                  className="agro-card bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-xs hover:shadow-xl hover:border-[#2E8B57]/40 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-14 h-14 rounded-2xl bg-[#FAF7F0] flex items-center justify-center border border-[#0F3D2E]/10 group-hover:scale-110 group-hover:rotate-2 transition-transform duration-300">
                        <AppleEmoji symbol={c.emoji} size="xl" />
                      </div>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#E8F4EC] text-[#0F3D2E]">
                        {c.categoryLabel}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-black text-lg text-[#0F3D2E]">{c.name}</h3>
                      <p className="text-xs text-neutral-500 italic">
                        {c.scientificName} · {c.durationDays} días
                      </p>
                      <p className="text-xs text-neutral-600 mt-2 line-clamp-2">{c.shortDescription}</p>
                    </div>
                  </div>

                  <div className="pt-6 space-y-2">
                    <div className="grid grid-cols-3 gap-1.5 text-[11px] font-bold">
                      {(['PRINCIPIANTE', 'INTERMEDIO', 'AVANZADO'] as ExperienceLevel[]).map((lvl) => (
                        <button
                          key={lvl}
                          onClick={() => {
                            if (!isAuthenticated) {
                              toast.info('Acceso con cuenta', 'Inicia sesión para descargar este manual.');
                              handleOpenAuth('login');
                              return;
                            }
                            generateCropManualPDF(c, lvl);
                            recordDownload(c.slug, lvl);
                            toast.success('Descargando PDF', `Manual de ${c.name} (${lvl})`);
                          }}
                          className="py-2 px-1 bg-[#FAF7F0] hover:bg-[#0F3D2E] hover:text-white text-[#0F3D2E] rounded-xl border border-[#0F3D2E]/20 transition-all text-center flex flex-col items-center gap-0.5 cursor-pointer"
                        >
                          <span>{lvl === 'PRINCIPIANTE' ? '🌱 Básico' : lvl === 'INTERMEDIO' ? '🌿 Medio' : '🌾 Técnico'}</span>
                          <span className="text-[9px] opacity-75">PDF</span>
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => handleSelectCrop(c)}
                      className="w-full py-2 text-xs font-bold text-neutral-600 hover:text-[#0F3D2E] transition-colors flex items-center justify-center gap-1 cursor-pointer pt-1"
                    >
                      <span>Ver ficha detallada</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentView === 'dashboard' && (
          <DashboardView onNavigate={handleNavigate} onSelectCrop={handleSelectCrop} />
        )}

        {currentView === 'historial' && <HistoryView />}
      </main>

      {/* Footer simplificado para vistas interiores */}
      {currentView !== 'landing' && (
        <footer className="bg-[#0A261C] text-white/80 py-8 px-4 sm:px-6 lg:px-8 border-t border-white/10 mt-16">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <p>© 2026 AgroGuía · Plataforma para la Comunidad Agrícola</p>
            <p className="font-medium text-white/80 text-center sm:text-right">
              Conceptualizado y diseñado por el{' '}
              <span className="text-[#C5E063] font-bold">Ing. Yeron Pool Cuero Montaño</span>, Desarrollador Web Full Stack e Ing. de Software.
            </p>
          </div>
        </footer>
      )}

      {/* Modal de Autenticación con Seguridad Reforzada */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultMode={authModalMode}
      />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <AgroGuiaApp />
      </AuthProvider>
    </ToastProvider>
  );
}
