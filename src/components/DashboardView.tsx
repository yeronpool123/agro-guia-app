import React from 'react';
import { useAuth } from '../context/AuthContext';
import { CROPS_DATA, Crop, ExperienceLevel } from '../data/crops';
import { AppleEmoji } from './AppleEmoji';
import { generateCropManualPDF } from '../utils/pdfGenerator';
import { useToast } from './SonnerToaster';
import {
  Camera,
  BookOpen,
  Download,
  Shield,
  Sparkles,
  ArrowRight,
  TrendingUp,
  FileCheck2,
  Calendar,
  Droplets,
  Bell
} from 'lucide-react';

interface DashboardViewProps {
  onNavigate: (view: string) => void;
  onSelectCrop: (crop: Crop) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate, onSelectCrop }) => {
  const { user, recordDownload } = useAuth();
  const toast = useToast();

  const recommendedCrop =
    user?.preferredLevel === 'AVANZADO'
      ? CROPS_DATA.find((c) => c.slug === 'cafe') || CROPS_DATA[0]
      : user?.preferredLevel === 'INTERMEDIO'
      ? CROPS_DATA.find((c) => c.slug === 'papa') || CROPS_DATA[0]
      : CROPS_DATA.find((c) => c.slug === 'maiz') || CROPS_DATA[0];

  const handleDownload = (crop: Crop) => {
    const level = user?.preferredLevel || 'PRINCIPIANTE';
    generateCropManualPDF(crop, level);
    recordDownload(crop.slug, level);
    toast.success('Manual generado', `Manual de ${crop.name} descargado en tu dispositivo.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-150">
      {/* Saludo y Cabecera */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#0F3D2E]">
            Hola, {user?.name?.split(' ')[0] || 'Productor'} <span className="inline-block">👋</span>
          </h1>
          <p className="text-sm text-neutral-600 mt-1">
            Bienvenido a tu panel de control técnico de AgroGuía. Gestiona tus cultivos y escaneos.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onNavigate('riego')}
            className="px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-full shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Droplets className="w-4 h-4 text-sky-200" />
            <span>Notificaciones de Riego</span>
          </button>

          <button
            onClick={() => onNavigate('camara')}
            className="px-5 py-2.5 bg-[#0F3D2E] hover:bg-[#1B5E3F] text-white font-bold text-xs rounded-full shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Camera className="w-4 h-4 text-[#C5E063]" />
            <span>Diagnosticar planta con IA</span>
          </button>
        </div>
      </div>

      {/* Alerta Inteligente de Riego */}
      <div className="bg-gradient-to-r from-sky-50 via-emerald-50 to-amber-50 rounded-3xl p-5 border border-sky-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-sky-500 text-white flex items-center justify-center shrink-0 shadow-md">
            <Droplets className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black px-2 py-0.5 rounded-full bg-red-600 text-white">
                Riego Pendiente Hoy
              </span>
              <span className="text-xs text-neutral-500 font-semibold">Sensor Lote A-2</span>
            </div>
            <h3 className="font-extrabold text-sm sm:text-base text-[#0F3D2E] mt-0.5">
              Tomate de Mesa (Humedad: 28% — Turno: 17:30)
            </h3>
            <p className="text-xs text-neutral-600">
              Dosis requerida: 5.5 L/m² por goteo · Demanda climática ET0: 4.2 mm/día.
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('riego')}
          className="px-4 py-2 bg-[#0F3D2E] hover:bg-[#1B5E3F] text-white font-bold text-xs rounded-xl shadow-xs transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
        >
          <span>Abrir módulo de riego</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-xs space-y-2">
          <p className="text-xs text-neutral-500 font-semibold">Cultivos en catálogo</p>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black text-[#0F3D2E]">{CROPS_DATA.length}</span>
            <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
              100% verificados
            </span>
          </div>
          <p className="text-[11px] text-neutral-400">36 manuales disponibles</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-xs space-y-2">
          <p className="text-xs text-neutral-500 font-semibold">Manuales descargados</p>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black text-[#0F3D2E]">{user?.downloadCount || 0}</span>
            <FileCheck2 className="w-5 h-5 text-[#2E8B57]" />
          </div>
          <p className="text-[11px] text-neutral-400">En formato PDF vectorial</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-xs space-y-2">
          <p className="text-xs text-neutral-500 font-semibold">Diagnósticos con IA</p>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black text-[#0F3D2E]">{user?.scanCount || 0}</span>
            <Sparkles className="w-5 h-5 text-[#C5E063]" />
          </div>
          <p className="text-[11px] text-neutral-400">Cámara Gemini Vision</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-xs space-y-2">
          <p className="text-xs text-neutral-500 font-semibold">Nivel agronómico</p>
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-black text-[#0F3D2E] truncate">
              {user?.preferredLevel === 'PRINCIPIANTE'
                ? 'Principiante 🌱'
                : user?.preferredLevel === 'INTERMEDIO'
                ? 'Intermedio 🌿'
                : 'Avanzado 🌾'}
            </span>
            <Shield className="w-5 h-5 text-[#0F3D2E]" />
          </div>
          <p className="text-[11px] text-neutral-400">Personalizado a tu perfil</p>
        </div>
      </div>

      {/* Cultivo Recomendado y Accesos Directos */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recomendación personalizada */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-[#E8F4EC] text-[#0F3D2E] text-xs font-bold">
              Recomendado para tu nivel
            </span>
            <span className="text-xs text-neutral-400 font-medium">Ciclo: {recommendedCrop.durationDays} días</span>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#FAF7F0] flex items-center justify-center shrink-0 border border-[#0F3D2E]/10">
              <AppleEmoji symbol={recommendedCrop.emoji} size="xl" />
            </div>

            <div>
              <h3 className="text-xl font-black text-[#0F3D2E]">{recommendedCrop.name}</h3>
              <p className="text-xs text-neutral-500 italic">
                {recommendedCrop.scientificName} · {recommendedCrop.family}
              </p>
              <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                {recommendedCrop.shortDescription}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-100 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                onSelectCrop(recommendedCrop);
                onNavigate('detalle');
              }}
              className="px-5 py-2.5 bg-[#0F3D2E] hover:bg-[#1B5E3F] text-white font-bold text-xs rounded-full transition-all flex items-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Ver ficha técnica</span>
            </button>

            <button
              onClick={() => handleDownload(recommendedCrop)}
              className="px-5 py-2.5 bg-white border border-[#0F3D2E]/30 text-[#0F3D2E] hover:bg-[#FAF7F0] font-bold text-xs rounded-full transition-all flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descargar PDF</span>
            </button>
          </div>
        </div>

        {/* Accesos rápidos */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-neutral-200 shadow-xs space-y-4">
          <h3 className="font-black text-base text-[#0F3D2E]">Accesos Rápidos</h3>

          <div className="space-y-2.5">
            <button
              onClick={() => onNavigate('cultivos')}
              className="w-full p-3.5 rounded-2xl bg-[#FAF7F0] hover:bg-[#E8F4EC] transition-all flex items-center justify-between text-left cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-[#0F3D2E] shadow-xs">
                  <AppleEmoji symbol="🌽" size="sm" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#0F3D2E] group-hover:text-[#2E8B57]">
                    Catálogo de Cultivos
                  </h4>
                  <p className="text-[11px] text-neutral-500">12 especies con tablas NPK</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-[#0F3D2E] transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => onNavigate('camara')}
              className="w-full p-3.5 rounded-2xl bg-[#FAF7F0] hover:bg-[#E8F4EC] transition-all flex items-center justify-between text-left cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-[#0F3D2E] shadow-xs">
                  <Camera className="w-4 h-4 text-[#2E8B57]" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#0F3D2E] group-hover:text-[#2E8B57]">
                    Cámara con IA
                  </h4>
                  <p className="text-[11px] text-neutral-500">Diagnóstico fotográfico en vivo</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-[#0F3D2E] transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => onNavigate('riego')}
              className="w-full p-3.5 rounded-2xl bg-[#FAF7F0] hover:bg-[#E8F4EC] transition-all flex items-center justify-between text-left cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-[#0F3D2E] shadow-xs">
                  <AppleEmoji symbol="💧" size="sm" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#0F3D2E] group-hover:text-[#2E8B57]">
                    Notificaciones de Riego
                  </h4>
                  <p className="text-[11px] text-neutral-500">Humedad de suelo, ET0 y alertas</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-[#0F3D2E] transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => onNavigate('modulos')}
              className="w-full p-3.5 rounded-2xl bg-[#FAF7F0] hover:bg-[#E8F4EC] transition-all flex items-center justify-between text-left cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-[#0F3D2E] shadow-xs">
                  <AppleEmoji symbol="🐛" size="sm" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#0F3D2E] group-hover:text-[#2E8B57]">
                    Control de Plagas
                  </h4>
                  <p className="text-[11px] text-neutral-500">Insecticidas, hongos y biocontrol</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-[#0F3D2E] transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
