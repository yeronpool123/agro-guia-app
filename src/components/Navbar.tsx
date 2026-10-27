import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { AppleEmoji } from './AppleEmoji';
import { useAuth } from '../context/AuthContext';
import { ExperienceLevel } from '../data/crops';
import { ChevronDown, User, LogOut, LayoutDashboard, Shield, Menu, X } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onOpenAuth: (mode?: 'login' | 'register') => void;
  selectedLevel: ExperienceLevel;
  onSelectLevel: (lvl: ExperienceLevel) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenAuth,
  selectedLevel,
  onSelectLevel
}) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [levelMenuOpen, setLevelMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const levelConfigs: Record<ExperienceLevel, { label: string; emoji: string }> = {
    PRINCIPIANTE: { label: 'Principiante', emoji: '🌱' },
    INTERMEDIO: { label: 'Intermedio', emoji: '🌿' },
    AVANZADO: { label: 'Avanzado', emoji: '🌾' }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF7F0]/95 backdrop-blur-md border-b border-[#0F3D2E]/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-2 sm:gap-6">
        {/* Zone 1: Single text element Brand Wordmark with sprout */}
        <div className="shrink-0 max-w-[180px] xs:max-w-none cursor-pointer" onClick={() => onNavigate('landing')}>
          <BrandLogo size="md" />
        </div>

        {/* Zone 2: 4-5 Nav links, single-line, whitespace-nowrap */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-[#1E2922]/80">
          <button
            onClick={() => onNavigate('landing')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#0F3D2E] ${
              currentView === 'landing' ? 'text-[#0F3D2E] font-bold border-b-2 border-[#0F3D2E] pb-0.5' : ''
            }`}
          >
            Inicio
          </button>
          <button
            onClick={() => onNavigate('cultivos')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#0F3D2E] ${
              currentView === 'cultivos' ? 'text-[#0F3D2E] font-bold border-b-2 border-[#0F3D2E] pb-0.5' : ''
            }`}
          >
            Cultivos
          </button>
          <button
            onClick={() => onNavigate('modulos')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#0F3D2E] ${
              currentView === 'modulos' ? 'text-[#0F3D2E] font-bold border-b-2 border-[#0F3D2E] pb-0.5' : ''
            }`}
          >
            Módulos
          </button>
          <button
            onClick={() => onNavigate('riego')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#0F3D2E] flex items-center gap-1.5 ${
              currentView === 'riego' ? 'text-[#0F3D2E] font-bold border-b-2 border-[#0F3D2E] pb-0.5' : ''
            }`}
          >
            <span>Riego</span>
            <AppleEmoji symbol="💧" size="xs" />
          </button>
          <button
            onClick={() => onNavigate('camara')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#0F3D2E] ${
              currentView === 'camara' ? 'text-[#0F3D2E] font-bold border-b-2 border-[#0F3D2E] pb-0.5' : ''
            }`}
          >
            Cámara IA
          </button>
          <button
            onClick={() => onNavigate('manuales')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#0F3D2E] ${
              currentView === 'manuales' ? 'text-[#0F3D2E] font-bold border-b-2 border-[#0F3D2E] pb-0.5' : ''
            }`}
          >
            Manuales
          </button>
          {isAuthenticated && (
            <button
              onClick={() => onNavigate('dashboard')}
              className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#0F3D2E] ${
                currentView === 'dashboard' ? 'text-[#0F3D2E] font-bold border-b-2 border-[#0F3D2E] pb-0.5' : ''
              }`}
            >
              Mi Panel
            </button>
          )}
        </nav>

        {/* Zone 3: Primary Action & Selectors */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Level Selector Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setLevelMenuOpen(!levelMenuOpen);
                setUserMenuOpen(false);
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#0F3D2E] bg-white border border-[#0F3D2E]/20 rounded-full hover:bg-neutral-50 transition-colors shadow-xs"
            >
              <span>Nivel: {levelConfigs[selectedLevel].label}</span>
              <AppleEmoji symbol={levelConfigs[selectedLevel].emoji} size="xs" />
              <ChevronDown className="w-3.5 h-3.5 text-neutral-500" />
            </button>

            {levelMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-neutral-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                  Cambiar nivel técnico
                </div>
                {(['PRINCIPIANTE', 'INTERMEDIO', 'AVANZADO'] as ExperienceLevel[]).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => {
                      onSelectLevel(lvl);
                      setLevelMenuOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-[#FAF7F0] ${
                      selectedLevel === lvl ? 'text-[#0F3D2E] font-bold bg-[#FAF7F0]' : 'text-neutral-700'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <AppleEmoji symbol={levelConfigs[lvl].emoji} size="xs" />
                      <span>{levelConfigs[lvl].label}</span>
                    </span>
                    {selectedLevel === lvl && <span className="w-1.5 h-1.5 rounded-full bg-[#0F3D2E]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Auth Status / Action Button */}
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setUserMenuOpen(!userMenuOpen);
                  setLevelMenuOpen(false);
                }}
                className="inline-flex items-center gap-2 pl-2 pr-3 py-1.5 bg-[#0F3D2E] text-white rounded-full hover:bg-[#1B5E3F] transition-colors shadow-sm"
              >
                <div className="w-6 h-6 rounded-full bg-[#C5E063] text-[#0F3D2E] flex items-center justify-center font-bold text-xs">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-xs font-bold truncate max-w-[80px] sm:max-w-[100px]">{user.name.split(' ')[0]}</span>
                <ChevronDown className="w-3.5 h-3.5 text-white/70" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-neutral-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-4 py-2 border-b border-neutral-100">
                    <p className="text-xs font-bold text-[#0F3D2E] truncate">{user.name}</p>
                    <p className="text-[11px] text-neutral-500 truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      onNavigate('dashboard');
                      setUserMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-neutral-700 hover:bg-[#FAF7F0] flex items-center gap-2"
                  >
                    <LayoutDashboard className="w-4 h-4 text-[#2E8B57]" />
                    <span>Mi Panel Agrícola</span>
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('historial');
                      setUserMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-neutral-700 hover:bg-[#FAF7F0] flex items-center gap-2"
                  >
                    <Shield className="w-4 h-4 text-[#2E8B57]" />
                    <span>Historial y Descargas</span>
                  </button>
                  <div className="border-t border-neutral-100 my-1" />
                  <button
                    onClick={() => {
                      logout();
                      setUserMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Cerrar sesión</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onOpenAuth('login')}
                className="px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs font-bold text-white bg-[#0F3D2E] rounded-full hover:bg-[#1B5E3F] transition-all shadow-sm hover:shadow whitespace-nowrap shrink-0 cursor-pointer"
              >
                Entrar
              </button>
            </div>
          )}

          {/* Mobile hamburger menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 sm:p-2 text-neutral-700 hover:text-[#0F3D2E] focus:outline-none"
            aria-label="Abrir menú de navegación"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-[#FAF7F0] px-4 pt-3 pb-5 space-y-2 animate-in slide-in-from-top-2 duration-150">
          {/* Mobile Level Selector */}
          <div className="p-2 bg-white rounded-xl border border-[#0F3D2E]/10 space-y-1 mb-2">
            <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block px-1">
              Nivel de experiencia agrícola:
            </span>
            <div className="grid grid-cols-3 gap-1">
              {(['PRINCIPIANTE', 'INTERMEDIO', 'AVANZADO'] as ExperienceLevel[]).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => onSelectLevel(lvl)}
                  className={`py-1.5 px-2 text-[11px] font-bold rounded-lg flex items-center justify-center gap-1 transition-all ${
                    selectedLevel === lvl
                      ? 'bg-[#0F3D2E] text-white'
                      : 'bg-[#FAF7F0] text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  <AppleEmoji symbol={levelConfigs[lvl].emoji} size="xs" />
                  <span>{levelConfigs[lvl].label}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              onNavigate('landing');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 text-sm font-semibold text-neutral-800 rounded-lg hover:bg-neutral-200/50"
          >
            Inicio
          </button>
          <button
            onClick={() => {
              onNavigate('cultivos');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 text-sm font-semibold text-neutral-800 rounded-lg hover:bg-neutral-200/50"
          >
            Cultivos (12+ especies)
          </button>
          <button
            onClick={() => {
              onNavigate('modulos');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 text-sm font-semibold text-neutral-800 rounded-lg hover:bg-neutral-200/50"
          >
            Control de Plagas & Módulos
          </button>
          <button
            onClick={() => {
              onNavigate('riego');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 text-sm font-semibold text-neutral-800 rounded-lg hover:bg-neutral-200/50 flex items-center justify-between"
          >
            <span>Notificaciones de Riego</span>
            <AppleEmoji symbol="💧" size="xs" />
          </button>
          <button
            onClick={() => {
              onNavigate('camara');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 text-sm font-semibold text-neutral-800 rounded-lg hover:bg-neutral-200/50"
          >
            Cámara IA (Diagnóstico en vivo)
          </button>
          <button
            onClick={() => {
              onNavigate('manuales');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 text-sm font-semibold text-neutral-800 rounded-lg hover:bg-neutral-200/50"
          >
            Manuales Técnicos PDF
          </button>
          {isAuthenticated && (
            <button
              onClick={() => {
                onNavigate('dashboard');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 px-3 text-sm font-bold text-[#0F3D2E] bg-white rounded-lg border border-[#0F3D2E]/20"
            >
              Ir a Mi Panel Agrícola
            </button>
          )}
        </div>
      )}
    </header>
  );
};

