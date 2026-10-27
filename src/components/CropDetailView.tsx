import React, { useState } from 'react';
import { Crop, ExperienceLevel } from '../data/crops';
import { AppleEmoji } from './AppleEmoji';
import { generateCropManualPDF } from '../utils/pdfGenerator';
import { useToast } from './SonnerToaster';
import { useAuth } from '../context/AuthContext';
import {
  Download,
  ArrowLeft,
  Calendar,
  Thermometer,
  CloudRain,
  Compass,
  Layers,
  Sparkles,
  ShieldAlert,
  Bug,
  HelpCircle,
  FileText
} from 'lucide-react';

interface CropDetailViewProps {
  crop: Crop;
  onBack: () => void;
  selectedLevel: ExperienceLevel;
  onSelectLevel: (lvl: ExperienceLevel) => void;
  onRequireAuth: () => void;
}

export const CropDetailView: React.FC<CropDetailViewProps> = ({
  crop,
  onBack,
  selectedLevel,
  onSelectLevel,
  onRequireAuth
}) => {
  const { isAuthenticated, recordDownload } = useAuth();
  const toast = useToast();
  const [activeTab, setActiveTab] = useState<'resumen' | 'siembra' | 'npk' | 'plagas' | 'cosecha'>('resumen');

  const manual = crop.manuals[selectedLevel] || crop.manuals.PRINCIPIANTE;

  const handleDownloadPDF = () => {
    if (!isAuthenticated) {
      toast.info('Acceso restringido', 'Inicia sesión para descargar los manuales técnicos completos en PDF.');
      onRequireAuth();
      return;
    }

    generateCropManualPDF(crop, selectedLevel);
    recordDownload(crop.slug, selectedLevel);
    toast.success(
      'Manual PDF descargado',
      `Manual técnico de ${crop.name} (${selectedLevel}) generado y descargado exitosamente.`
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-150">
      {/* Botón Volver */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-bold text-neutral-600 hover:text-[#0F3D2E] transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Volver al catálogo</span>
      </button>

      {/* Hero Banner del Cultivo */}
      <div className="bg-white rounded-3xl p-5 sm:p-8 border border-neutral-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start sm:items-center gap-4 sm:gap-5">
          <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-2xl bg-[#FAF7F0] flex items-center justify-center shrink-0 border border-[#0F3D2E]/10">
            <AppleEmoji symbol={crop.emoji} size="2xl" />
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#E8F4EC] text-[#0F3D2E] text-xs font-bold">
                {crop.categoryLabel}
              </span>
              <span className="text-xs text-neutral-500 font-medium">Ciclo: {crop.durationDays} días</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-[#0F3D2E]">{crop.name}</h1>
            <p className="text-xs sm:text-sm text-neutral-600 italic">
              {crop.scientificName} · Familia {crop.family}
            </p>
          </div>
        </div>

        {/* CTA de Descarga */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          <button
            onClick={handleDownloadPDF}
            className="w-full sm:w-auto px-6 py-3.5 bg-[#0F3D2E] hover:bg-[#1B5E3F] text-white font-bold text-xs rounded-full shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#C5E063]" />
            <span>Descargar Manual PDF ({selectedLevel})</span>
          </button>
        </div>
      </div>

      {/* Selector de Nivel de Experiencia */}
      <div className="bg-[#FAF7F0] p-1.5 rounded-2xl border border-[#0F3D2E]/10 grid grid-cols-1 xs:grid-cols-3 gap-1.5">
        {(['PRINCIPIANTE', 'INTERMEDIO', 'AVANZADO'] as ExperienceLevel[]).map((lvl) => (
          <button
            key={lvl}
            onClick={() => onSelectLevel(lvl)}
            className={`w-full py-2.5 px-3 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 hover:scale-[1.01] ${
              selectedLevel === lvl
                ? 'bg-[#0F3D2E] text-white shadow-sm'
                : 'text-neutral-600 hover:text-[#0F3D2E] hover:bg-white/70'
            }`}
          >
            <AppleEmoji
              symbol={lvl === 'PRINCIPIANTE' ? '🌱' : lvl === 'INTERMEDIO' ? '🌿' : '🌾'}
              size="xs"
            />
            <span>
              {lvl === 'PRINCIPIANTE' && 'Principiante'}
              {lvl === 'INTERMEDIO' && 'Intermedio'}
              {lvl === 'AVANZADO' && 'Avanzado'}
            </span>
          </button>
        ))}
      </div>

      {/* Pestañas de contenido */}
      <div className="border-b border-neutral-200 flex gap-4 sm:gap-6 overflow-x-auto text-xs font-bold scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
        <button
          onClick={() => setActiveTab('resumen')}
          className={`pb-3 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'resumen'
              ? 'border-[#0F3D2E] text-[#0F3D2E]'
              : 'border-transparent text-neutral-500 hover:text-neutral-800'
          }`}
        >
          Resumen & Requerimientos
        </button>
        <button
          onClick={() => setActiveTab('siembra')}
          className={`pb-3 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'siembra'
              ? 'border-[#0F3D2E] text-[#0F3D2E]'
              : 'border-transparent text-neutral-500 hover:text-neutral-800'
          }`}
        >
          Siembra y Labores ({manual.plantingSteps.length} pasos)
        </button>
        <button
          onClick={() => setActiveTab('npk')}
          className={`pb-3 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'npk'
              ? 'border-[#0F3D2E] text-[#0F3D2E]'
              : 'border-transparent text-neutral-500 hover:text-neutral-800'
          }`}
        >
          Plan de Fertilización NPK
        </button>
        <button
          onClick={() => setActiveTab('plagas')}
          className={`pb-3 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'plagas'
              ? 'border-[#0F3D2E] text-[#0F3D2E]'
              : 'border-transparent text-neutral-500 hover:text-neutral-800'
          }`}
        >
          Plagas y Enfermedades ({manual.plagueControl.length})
        </button>
        <button
          onClick={() => setActiveTab('cosecha')}
          className={`pb-3 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'cosecha'
              ? 'border-[#0F3D2E] text-[#0F3D2E]'
              : 'border-transparent text-neutral-500 hover:text-neutral-800'
          }`}
        >
          Cosecha & Poscosecha
        </button>
      </div>

      {/* Contenido de la pestaña activa */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/80 shadow-sm space-y-6">
        {activeTab === 'resumen' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-[#0F3D2E]">{manual.title}</h3>
              <p className="text-xs text-neutral-500 mt-0.5">{manual.subtitle}</p>
              <p className="text-sm text-neutral-700 mt-3 leading-relaxed">{manual.introduction}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Clima */}
              <div className="p-5 rounded-2xl bg-[#FAF7F0] border border-[#0F3D2E]/10 space-y-3">
                <h4 className="font-bold text-sm text-[#0F3D2E] flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-[#2E8B57]" />
                  <span>Requerimientos Climáticos</span>
                </h4>
                <ul className="text-xs text-neutral-700 space-y-2">
                  <li>
                    <strong>Temperatura óptima:</strong> {manual.climateRequirements.tempOptima}
                  </li>
                  <li>
                    <strong>Precipitación requerida:</strong> {manual.climateRequirements.precipitacion}
                  </li>
                  <li>
                    <strong>Fotoperiodo / Luz:</strong> {manual.climateRequirements.fotoperiodo}
                  </li>
                  <li>
                    <strong>Altitud recomendada:</strong> {manual.climateRequirements.altitud}
                  </li>
                </ul>
              </div>

              {/* Suelo */}
              <div className="p-5 rounded-2xl bg-[#FAF7F0] border border-[#0F3D2E]/10 space-y-3">
                <h4 className="font-bold text-sm text-[#5C4033] flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#5C4033]" />
                  <span>Requerimientos de Suelo</span>
                </h4>
                <ul className="text-xs text-neutral-700 space-y-2">
                  <li>
                    <strong>Rango de pH:</strong> {manual.soilRequirements.ph}
                  </li>
                  <li>
                    <strong>Textura recomendada:</strong> {manual.soilRequirements.textura}
                  </li>
                  <li>
                    <strong>Materia orgánica:</strong> {manual.soilRequirements.materiaOrganica}
                  </li>
                  <li>
                    <strong>Drenaje y permeabilidad:</strong> {manual.soilRequirements.drenaje}
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-start gap-3 text-xs text-emerald-950">
              <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Plan de riego recomendado</p>
                <p className="mt-0.5 leading-relaxed">{manual.irrigationPlan}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'siembra' && (
          <div className="space-y-4">
            <h3 className="font-bold text-base text-[#0F3D2E]">Proceso de Siembra y Establecimiento</h3>
            <div className="space-y-3">
              {manual.plantingSteps.map((st) => (
                <div
                  key={st.step}
                  className="p-4 rounded-2xl bg-[#FAF7F0] border border-neutral-200/80 flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 border border-neutral-200 shadow-xs">
                    <AppleEmoji symbol={st.emoji} size="md" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#0F3D2E]">
                      Paso {st.step}: {st.title}
                    </h4>
                    <p className="text-xs text-neutral-600 mt-1 leading-relaxed">{st.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'npk' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-[#0F3D2E]">Plan de Fertilización NPK por Etapa</h3>
                <p className="text-xs text-neutral-500">
                  Dosis estándar calibradas en kg/ha para rendimiento óptimo
                </p>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-neutral-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0F3D2E] text-white">
                  <tr>
                    <th className="py-3 px-4 font-bold">Etapa Fenológica</th>
                    <th className="py-3 px-3 font-bold text-center">N (kg/ha)</th>
                    <th className="py-3 px-3 font-bold text-center">P2O5 (kg/ha)</th>
                    <th className="py-3 px-3 font-bold text-center">K2O (kg/ha)</th>
                    <th className="py-3 px-4 font-bold">Observaciones Agronómicas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {manual.fertilizationNPK.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#FAF7F0]'}>
                      <td className="py-3 px-4 font-bold text-[#0F3D2E]">{row.etapa}</td>
                      <td className="py-3 px-3 text-center font-mono font-bold text-[#2E8B57]">{row.n}</td>
                      <td className="py-3 px-3 text-center font-mono font-bold text-amber-700">{row.p}</td>
                      <td className="py-3 px-3 text-center font-mono font-bold text-[#5C4033]">{row.k}</td>
                      <td className="py-3 px-4 text-neutral-600">{row.observaciones}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'plagas' && (
          <div className="space-y-4">
            <h3 className="font-bold text-base text-[#0F3D2E]">Control de Plagas y Enfermedades Comunes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {manual.plagueControl.map((pest, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-[#FAF7F0] border border-neutral-200/80 space-y-2">
                  <div className="flex items-center gap-2">
                    <AppleEmoji symbol={pest.emoji} size="md" />
                    <div>
                      <h4 className="font-bold text-sm text-[#0F3D2E]">{pest.name}</h4>
                      {pest.scientificName && (
                        <p className="text-[11px] text-neutral-500 italic">{pest.scientificName}</p>
                      )}
                    </div>
                  </div>

                  <div className="text-xs space-y-1.5 pt-1 text-neutral-700">
                    <p>
                      <strong>Síntomas:</strong> {pest.symptoms}
                    </p>
                    <p>
                      <strong>Tratamiento:</strong> {pest.treatment}
                    </p>
                    <p>
                      <strong>Control biológico:</strong> {pest.biologicalControl}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'cosecha' && (
          <div className="space-y-6 text-xs text-neutral-700">
            <div className="p-5 rounded-2xl bg-[#FAF7F0] border border-neutral-200/80 space-y-2">
              <h4 className="font-bold text-sm text-[#0F3D2E]">Indicadores de Cosecha</h4>
              <p className="leading-relaxed">{manual.harvestIndicators}</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF7F0] border border-neutral-200/80 space-y-2">
              <h4 className="font-bold text-sm text-[#0F3D2E]">Manejo Poscosecha y Almacenamiento</h4>
              <p className="leading-relaxed">{manual.postHarvest}</p>
            </div>

            {manual.glossary.length > 0 && (
              <div className="space-y-2 pt-2">
                <h4 className="font-bold text-sm text-[#0F3D2E]">Glosario Agronómico</h4>
                <div className="divide-y divide-neutral-100">
                  {manual.glossary.map((g, idx) => (
                    <div key={idx} className="py-2">
                      <span className="font-bold text-neutral-800">{g.term}: </span>
                      <span>{g.definition}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
