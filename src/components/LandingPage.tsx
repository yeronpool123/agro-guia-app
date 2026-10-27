import React from 'react';
import { AppleEmoji } from './AppleEmoji';
import { BrandLogo } from './BrandLogo';
import { Corn3DViewer } from './Corn3DViewer';
import { RotatingTagline } from './RotatingTagline';
import { CROPS_DATA, Crop, ExperienceLevel } from '../data/crops';
import { generateCropManualPDF } from '../utils/pdfGenerator';
import { useToast } from './SonnerToaster';
import { useAuth } from '../context/AuthContext';
import { Camera, BookOpen, ArrowRight, Download, Sparkles, ShieldCheck } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (view: string) => void;
  onOpenAuth: (mode?: 'login' | 'register') => void;
  onSelectCrop: (crop: Crop) => void;
  selectedLevel: ExperienceLevel;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigate,
  onOpenAuth,
  onSelectCrop,
  selectedLevel
}) => {
  const toast = useToast();
  const { isAuthenticated, recordDownload } = useAuth();

  // 4 cultivos populares de la referencia
  const popularCrops = CROPS_DATA.slice(0, 4);

  const handleDownloadSample = () => {
    const cornCrop = CROPS_DATA.find((c) => c.slug === 'maiz') || CROPS_DATA[0];
    generateCropManualPDF(cornCrop, 'PRINCIPIANTE');
    recordDownload('maiz', 'PRINCIPIANTE');
    toast.success(
      'Manual PDF de muestra descargado',
      'Has obtenido el manual técnico de Maíz (Nivel Principiante).'
    );
  };

  const handleViewCrop = (crop: Crop) => {
    onSelectCrop(crop);
    onNavigate('detalle');
  };

  return (
    <div className="w-full bg-[#FAF7F0] text-[#1E2922]">
      {/* ================= 1. HERO SECTION ================= */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Orbes flotantes ambientales que no interfieren con el contenido */}
        <div className="absolute -top-10 -left-10 w-96 h-96 rounded-full bg-gradient-to-br from-[#C5E063]/25 via-[#A8D5BA]/20 to-transparent blur-3xl pointer-events-none animate-float-orb-1" />
        <div className="absolute top-1/3 -right-16 w-96 h-96 rounded-full bg-gradient-to-tl from-[#2E8B57]/15 via-[#C5E063]/15 to-transparent blur-3xl pointer-events-none animate-float-orb-2" />
        <div className="absolute -bottom-10 left-1/4 w-80 h-80 rounded-full bg-[#FAF7F0] blur-2xl pointer-events-none animate-float-orb-3" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Columna izquierda de texto y CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E8F4EC] text-[#0F3D2E] text-xs font-bold border border-[#0F3D2E]/10 shadow-xs hover:scale-105 transition-transform duration-300">
              <span className="w-2 h-2 rounded-full bg-[#2E8B57] animate-pulse" />
              <span>Para agricultores de todos los niveles</span>
            </div>

            <h1 className="text-2xl min-[360px]:text-[28px] xs:text-3xl sm:text-5xl lg:text-6xl font-black text-[#0F3D2E] tracking-tight leading-[1.22] sm:leading-[1.18] text-balance">
              Cultiva con conocimiento. <br className="hidden sm:inline" />
              <RotatingTagline className="mt-0.5 sm:mt-1.5" />
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-neutral-600 max-w-xl leading-relaxed pt-1">
              Manuales, módulos por nivel y una cámara con IA que identifica tu planta, diagnostica su salud y
              te dice cómo fertilizar.
            </p>

            <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('camara')}
                className="w-full xs:w-auto px-6 py-3.5 bg-[#0F3D2E] hover:bg-[#1B5E3F] text-white font-bold text-sm rounded-full shadow-lg shadow-[#0F3D2E]/15 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Camera className="w-4 h-4 text-[#C5E063]" />
                <span>Probar cámara IA</span>
              </button>

              <button
                onClick={() => onNavigate('cultivos')}
                className="w-full xs:w-auto px-6 py-3.5 bg-white border border-[#0F3D2E]/25 hover:bg-neutral-50 text-[#0F3D2E] font-bold text-sm rounded-full transition-all hover:-translate-y-0.5 hover:shadow-md flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <AppleEmoji symbol="🌿" size="sm" />
                <span>Ver cultivos</span>
              </button>
            </div>
          </div>

          {/* Columna derecha: Teléfono interactivo con maíz 3D (Three.js + GSAP) */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <div className="w-full max-w-[270px] xs:max-w-[300px] sm:max-w-[320px] aspect-[9/18] bg-[#0F3D2E] rounded-[36px] sm:rounded-[40px] p-2.5 sm:p-3 shadow-2xl border-[6px] sm:border-[8px] border-[#0F3D2E] relative flex flex-col justify-between overflow-hidden hover:shadow-emerald-950/20 hover:-translate-y-1 transition-all duration-500">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-3.5 sm:h-4 bg-[#0F3D2E] rounded-b-xl z-20" />

              {/* Header mockup */}
              <div className="flex items-center justify-between px-2 sm:px-3 pt-2 sm:pt-3 text-[10px] sm:text-[11px] text-white/80 z-20">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Escáner IA activo</span>
                </div>
                <span className="text-[10px] text-[#C5E063] font-bold">Zea mays</span>
              </div>

              {/* Marco de enfoque interactivo con Choclo 3D en Three.js & GSAP */}
              <div className="my-auto w-full aspect-square border-2 border-dashed border-[#C5E063] rounded-2xl sm:rounded-3xl flex items-center justify-center relative shadow-inner overflow-hidden bg-radial from-[#154a38] to-[#0A261C]">
                <Corn3DViewer className="w-full h-full" enableScrollRotation={true} />
              </div>

              {/* Tarjeta de resultado inferior */}
              <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-3.5 space-y-1.5 sm:space-y-2 text-xs shadow-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-black text-[#0F3D2E] text-xs sm:text-sm">Maíz · Zea mays</h4>
                    <p className="text-[9px] sm:text-[10px] text-neutral-500">Confianza 96%</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold bg-[#C5E063] text-[#0F3D2E]">
                    Sana
                  </span>
                </div>

                <div className="pt-1 text-[10px] sm:text-[11px] text-neutral-600 flex items-center gap-1 sm:gap-1.5 font-medium flex-wrap">
                  <span className="px-1.5 py-0.5 bg-neutral-100 rounded">NPK: N media</span>
                  <span className="px-1.5 py-0.5 bg-neutral-100 rounded">P baja</span>
                  <span className="px-1.5 py-0.5 bg-neutral-100 rounded">K media</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. CULTIVOS POPULARES ================= */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-neutral-200/60">
        <div className="flex items-center gap-2 mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F3D2E]">Cultivos populares</h2>
          <AppleEmoji symbol="🌿" size="md" />
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {popularCrops.map((crop) => (
            <div
              key={crop.id}
              className="agro-card bg-white rounded-2xl p-5 border border-neutral-200/80 hover:shadow-xl transition-all flex flex-col justify-between group cursor-pointer"
              onClick={() => handleViewCrop(crop)}
            >
              <div>
                <div className="w-16 h-16 rounded-2xl bg-[#FAF7F0] border border-[#0F3D2E]/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-2 transition-transform duration-300">
                  <AppleEmoji symbol={crop.emoji} size="xl" />
                </div>
                <h3 className="font-black text-lg text-[#0F3D2E] group-hover:text-[#2E8B57] transition-colors">{crop.name}</h3>
                <p className="text-xs text-neutral-500 italic mt-0.5">{crop.family}</p>
              </div>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-neutral-100">
                <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-[#E8F4EC] text-[#0F3D2E] group-hover:bg-[#C5E063] transition-colors">
                  {crop.difficulty}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewCrop(crop);
                  }}
                  className="px-4 py-1.5 text-xs font-bold text-[#0F3D2E] hover:text-white bg-transparent hover:bg-[#0F3D2E] border border-[#0F3D2E]/30 rounded-full transition-all group-hover:shadow-xs cursor-pointer"
                >
                  Ver manual
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 3. LO QUE APRENDERÁS ================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-neutral-200/60">
        <h2 className="text-2xl sm:text-3xl font-black text-[#0F3D2E] mb-8">Lo que aprenderás</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="agro-card bg-white rounded-2xl p-6 border border-neutral-200/80 space-y-4 hover:shadow-xl transition-all">
            <h3 className="font-black text-base text-[#0F3D2E] flex items-center gap-2">
              <AppleEmoji symbol="🌱" size="sm" />
              <span>Principiante</span>
            </h3>
            <ul className="space-y-2 text-xs text-neutral-600 font-medium">
              <li>• Preparar el suelo</li>
              <li>• Siembra y riego</li>
              <li>• Cuidados básicos</li>
            </ul>
          </div>

          <div className="agro-card bg-white rounded-2xl p-6 border border-neutral-200/80 space-y-4 hover:shadow-xl transition-all">
            <h3 className="font-black text-base text-[#0F3D2E] flex items-center gap-2">
              <AppleEmoji symbol="🌿" size="sm" />
              <span>Intermedio</span>
            </h3>
            <ul className="space-y-2 text-xs text-neutral-600 font-medium">
              <li>• Fertilización NPK</li>
              <li>• Rotación de cultivos</li>
              <li>• Seguimiento de cultivos</li>
            </ul>
          </div>

          <div className="agro-card bg-white rounded-2xl p-6 border border-neutral-200/80 space-y-4 hover:shadow-xl transition-all">
            <h3 className="font-black text-base text-[#0F3D2E] flex items-center gap-2">
              <AppleEmoji symbol="🌾" size="sm" />
              <span>Avanzado</span>
            </h3>
            <ul className="space-y-2 text-xs text-neutral-600 font-medium">
              <li>• Manejo integrado de plagas</li>
              <li>• Taxonomía botánica</li>
              <li>• Planificación de cosecha</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= 4. MÓDULO ESTRELLA: CÁMARA IA ================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-neutral-200/60">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-3">
            <span className="px-3 py-1 rounded-full bg-[#E8F4EC] text-[#0F3D2E] font-bold text-xs">
              Módulo estrella
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0F3D2E] flex items-center gap-2">
              <span>Cámara IA</span>
              <AppleEmoji symbol="📷" size="sm" />
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Apunta a una planta y recibe especie, estado de salud y recomendación de fertilización en
              segundos.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('camara')}
                className="px-5 py-2.5 bg-[#0F3D2E] hover:bg-[#1B5E3F] text-white font-bold text-xs rounded-full transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Camera className="w-4 h-4 text-[#C5E063]" />
                <span>Abrir escáner</span>
              </button>
            </div>
          </div>

          {/* Tarjeta de NPK de la referencia */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-sm space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-black text-lg text-[#0F3D2E]">Maíz</h4>
                  <p className="text-xs text-neutral-500 italic">Zea mays · Poaceae</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#C5E063] text-[#0F3D2E]">
                  Sana · 96%
                </span>
              </div>

              <div className="space-y-3 pt-2">
                <p className="text-xs font-extrabold text-[#0F3D2E]">Recomendación NPK</p>

                {/* Barra Nitrógeno */}
                <div>
                  <div className="flex justify-between text-xs text-neutral-600 mb-1">
                    <span>Nitrógeno: media</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <div className="w-3/5 h-full bg-[#2E8B57] rounded-full" />
                  </div>
                </div>

                {/* Barra Fósforo */}
                <div>
                  <div className="flex justify-between text-xs text-neutral-600 mb-1">
                    <span>Fósforo: baja</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <div className="w-1/4 h-full bg-[#C5E063] rounded-full" />
                  </div>
                </div>

                {/* Barra Potasio */}
                <div>
                  <div className="flex justify-between text-xs text-neutral-600 mb-1">
                    <span>Potasio: media</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <div className="w-1/2 h-full bg-[#2E8B57] rounded-full" />
                  </div>
                </div>

                <p className="text-xs text-neutral-700 pt-2">
                  <strong className="text-[#0F3D2E]">Acción:</strong> aplicar fósforo en banda a 10 cm de la base.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 5. CONTROL DE PLAGAS ================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-neutral-200/60">
        <h2 className="text-2xl sm:text-3xl font-black text-[#0F3D2E] mb-8">Control de plagas</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div
            onClick={() => onNavigate('modulos')}
            className="agro-card bg-white rounded-2xl p-5 border border-neutral-200/80 hover:shadow-xl transition-all flex flex-col justify-between cursor-pointer group"
          >
            <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
              <AppleEmoji symbol="🐛" size="lg" />
            </div>
            <h3 className="font-black text-sm text-[#0F3D2E] group-hover:text-[#2E8B57] transition-colors">
              Insecticidas
            </h3>
          </div>

          <div
            onClick={() => onNavigate('modulos')}
            className="agro-card bg-white rounded-2xl p-5 border border-neutral-200/80 hover:shadow-xl transition-all flex flex-col justify-between cursor-pointer group"
          >
            <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
              <AppleEmoji symbol="🍄" size="lg" />
            </div>
            <h3 className="font-black text-sm text-[#0F3D2E] group-hover:text-[#2E8B57] transition-colors">
              Fungicidas
            </h3>
          </div>

          <div
            onClick={() => onNavigate('modulos')}
            className="agro-card bg-white rounded-2xl p-5 border border-neutral-200/80 hover:shadow-xl transition-all flex flex-col justify-between cursor-pointer group"
          >
            <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
              <AppleEmoji symbol="🌿" size="lg" />
            </div>
            <h3 className="font-black text-sm text-[#0F3D2E] group-hover:text-[#2E8B57] transition-colors">
              Herbicidas
            </h3>
          </div>

          <div
            onClick={() => onNavigate('modulos')}
            className="agro-card bg-white rounded-2xl p-5 border border-neutral-200/80 hover:shadow-xl transition-all flex flex-col justify-between cursor-pointer group"
          >
            <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
              <AppleEmoji symbol="🐞" size="lg" />
            </div>
            <h3 className="font-black text-sm text-[#0F3D2E] group-hover:text-[#2E8B57] transition-colors">
              Control biológico
            </h3>
          </div>
        </div>
      </section>

      {/* ================= 6. MANUALES PDF DESCARGABLES ================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-neutral-200/60">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black text-[#0F3D2E] flex items-center gap-2">
              <span>Manuales PDF descargables</span>
              <AppleEmoji symbol="📄" size="sm" />
            </h2>
            <p className="text-sm text-neutral-600 max-w-lg leading-relaxed">
              Guías paso a paso para llevar al campo, incluso sin conexión. Cada cultivo cuenta con información
              botánica específica según tu nivel de experiencia.
            </p>
            <div className="pt-2">
              <button
                onClick={handleDownloadSample}
                className="px-6 py-3 bg-[#0F3D2E] hover:bg-[#1B5E3F] text-white font-bold text-xs rounded-full transition-all flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Download className="w-4 h-4 text-[#C5E063]" />
                <span>Descargar muestra gratuita (Maíz)</span>
              </button>
            </div>
          </div>

          {/* Vista previa miniatura del PDF */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-64 bg-white rounded-2xl p-5 border border-neutral-200 shadow-xl relative overflow-hidden">
              <div className="flex items-center gap-1.5 mb-6">
                <BrandLogo size="sm" showText={false} />
                <span className="font-extrabold text-xs text-[#0F3D2E]">AgroGuía</span>
              </div>

              <h4 className="font-black text-sm text-[#0F3D2E] flex items-center gap-1.5">
                <span>Manual de maíz</span>
                <AppleEmoji symbol="🌽" size="sm" />
              </h4>
              <p className="text-[11px] text-neutral-500 mt-1">Buenas prácticas · Nivel principiante</p>

              {/* Marca de agua G */}
              <div className="w-28 h-28 absolute -bottom-6 -right-6 opacity-15 pointer-events-none">
                <BrandLogo size="xl" showText={false} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 7. BANNER CTA FINAL ================= */}
      <section className="bg-[#0F3D2E] text-white py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black flex items-center justify-center gap-2">
            <span>¿Listo para mejorar tu cosecha?</span>
            <AppleEmoji symbol="🌾" size="md" />
          </h2>

          <p className="text-sm text-white/80 max-w-xl mx-auto leading-relaxed">
            Accede al catálogo completo de 12+ cultivos, 36+ manuales técnicos descargables y el módulo de
            diagnóstico inteligente.
          </p>

          <div>
            <button
              onClick={() => onOpenAuth('register')}
              className="px-8 py-3.5 bg-[#C5E063] hover:bg-[#b5d055] text-[#0F3D2E] font-black text-sm rounded-full shadow-lg transition-transform active:scale-95 cursor-pointer"
            >
              Crear cuenta gratis
            </button>
          </div>
        </div>
      </section>

      {/* ================= 8. FOOTER OFICIAL ================= */}
      <footer className="bg-[#0A261C] text-white/80 pt-14 pb-8 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 text-xs">
          <div className="space-y-3">
            <h4 className="font-black text-white uppercase tracking-wider text-[11px]">Producto</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('camara')} className="hover:text-white">
                  Cámara IA
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('modulos')} className="hover:text-white">
                  Módulos Técnicos
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-black text-white uppercase tracking-wider text-[11px]">Cultivos</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('cultivos')} className="hover:text-white">
                  Maíz
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('cultivos')} className="hover:text-white">
                  Papa
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('cultivos')} className="hover:text-white">
                  Tomate
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-black text-white uppercase tracking-wider text-[11px]">Recursos</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('manuales')} className="hover:text-white">
                  Manuales PDF
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('modulos')} className="hover:text-white">
                  Plagas y Sanidad
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-black text-white uppercase tracking-wider text-[11px]">Legal</h4>
            <ul className="space-y-2">
              <li>
                <span className="hover:text-white cursor-pointer">Privacidad</span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer">Términos de servicio</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Atribución permanente obligatoria */}
        <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/60">
          <p>© 2026 AgroGuía · Plataforma Web para la Comunidad Agrícola</p>
          <p className="font-medium text-white/80">
            Conceptualizado y diseñado por el{' '}
            <span className="text-[#C5E063] font-bold">Ing. Yeron Pool Cuero Montaño</span>, Desarrollador Web Full
            Stack e Ing. de Software.
          </p>
        </div>
      </footer>
    </div>
  );
};
