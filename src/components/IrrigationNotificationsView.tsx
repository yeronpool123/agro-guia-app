import React, { useState, useEffect } from 'react';
import { AppleEmoji } from './AppleEmoji';
import { useAuth } from '../context/AuthContext';
import { useToast } from './SonnerToaster';
import {
  Droplets,
  CloudRain,
  Sun,
  Wind,
  Bell,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  Volume2,
  Smartphone,
  ChevronRight,
  Sliders,
  Calendar,
  Layers,
  Download
} from 'lucide-react';
import jsPDF from 'jspdf';

interface CropIrrigationSchedule {
  id: string;
  cropName: string;
  emoji: string;
  variety: string;
  stage: string;
  kcFactor: number;
  currentMoisture: number; // 0-100%
  thresholdMoisture: number;
  recommendedLitersPerM2: number;
  irrigationMethod: 'Goteo automatizado' | 'Aspersión' | 'Microaspersión' | 'Surcos / Gravedad';
  nextScheduledTime: string;
  status: 'URGENTE' | 'PROGRAMADO' | 'OPTIMO' | 'POSPUESTO';
  lastWatered: string;
}

export const IrrigationNotificationsView: React.FC<{ onNavigateToCatalog?: () => void }> = () => {
  const { user } = useAuth();
  const toast = useToast();

  // Estado de las notificaciones
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [moistureThreshold, setMoistureThreshold] = useState<number>(35);
  const [activeTab, setActiveTab] = useState<'CALENDARIO' | 'SENSORES' | 'BITACORA'>('CALENDARIO');

  // Datos de los cultivos con programación de riego inteligente
  const [schedules, setSchedules] = useState<CropIrrigationSchedule[]>([
    {
      id: 'irrig-1',
      cropName: 'Tomate de Mesa',
      emoji: '🍅',
      variety: 'Chonto / Solanum lycopersicum',
      stage: 'Floración y cuajado de frutos',
      kcFactor: 1.15,
      currentMoisture: 28, // Crítico
      thresholdMoisture: 35,
      recommendedLitersPerM2: 5.5,
      irrigationMethod: 'Goteo automatizado',
      nextScheduledTime: 'Hoy a las 17:30 (En 2 horas)',
      status: 'URGENTE',
      lastWatered: 'Hace 3 días'
    },
    {
      id: 'irrig-2',
      cropName: 'Maíz Choclo',
      emoji: '🌽',
      variety: 'Híbrido Dekalb / Zea mays',
      stage: 'Emisión de espiga y llenado',
      kcFactor: 1.20,
      currentMoisture: 42,
      thresholdMoisture: 35,
      recommendedLitersPerM2: 6.0,
      irrigationMethod: 'Aspersión',
      nextScheduledTime: 'Mañana a las 06:00',
      status: 'PROGRAMADO',
      lastWatered: 'Ayer'
    },
    {
      id: 'irrig-3',
      cropName: 'Papa Pastusa',
      emoji: '🥔',
      variety: 'Solanum tuberosum',
      stage: 'Tuberización activa',
      kcFactor: 1.10,
      currentMoisture: 58,
      thresholdMoisture: 40,
      recommendedLitersPerM2: 4.0,
      irrigationMethod: 'Microaspersión',
      nextScheduledTime: 'En 3 días',
      status: 'OPTIMO',
      lastWatered: 'Hoy a las 05:30'
    },
    {
      id: 'irrig-4',
      cropName: 'Banano / Plátano',
      emoji: '🍌',
      variety: 'Cavendish / Musa paradisiaca',
      stage: 'Crecimiento vegetativo vigoroso',
      kcFactor: 1.25,
      currentMoisture: 51,
      thresholdMoisture: 45,
      recommendedLitersPerM2: 7.0,
      irrigationMethod: 'Microaspersión',
      nextScheduledTime: 'En 2 días a las 07:00',
      status: 'OPTIMO',
      lastWatered: 'Hace 2 días'
    },
    {
      id: 'irrig-5',
      cropName: 'Pimiento Morrón',
      emoji: '🫑',
      variety: 'Capsicum annuum',
      stage: 'Engrose de fruto',
      kcFactor: 1.05,
      currentMoisture: 33,
      thresholdMoisture: 35,
      recommendedLitersPerM2: 4.5,
      irrigationMethod: 'Goteo automatizado',
      nextScheduledTime: 'Hoy a las 18:00',
      status: 'URGENTE',
      lastWatered: 'Hace 2 días'
    },
    {
      id: 'irrig-6',
      cropName: 'Café Arábica',
      emoji: '☕',
      variety: 'Castillo / Coffea arabica',
      stage: 'Llenado de grano (Cereza verde)',
      kcFactor: 0.95,
      currentMoisture: 62,
      thresholdMoisture: 30,
      recommendedLitersPerM2: 3.5,
      irrigationMethod: 'Surcos / Gravedad',
      nextScheduledTime: 'En 5 días',
      status: 'OPTIMO',
      lastWatered: 'Ayer por la tarde'
    }
  ]);

  // Historial de riegos ejecutados
  const [waterLog, setWaterLog] = useState<{ id: string; crop: string; emoji: string; date: string; volumeMm: number; method: string }[]>([
    { id: 'log-1', crop: 'Papa Pastusa', emoji: '🥔', date: 'Hoy, 05:30 AM', volumeMm: 12, method: 'Microaspersión' },
    { id: 'log-2', crop: 'Café Arábica', emoji: '☕', date: 'Ayer, 06:15 PM', volumeMm: 15, method: 'Surcos' },
    { id: 'log-3', crop: 'Maíz Choclo', emoji: '🌽', date: 'Ayer, 06:00 AM', volumeMm: 18, method: 'Aspersión' },
    { id: 'log-4', crop: 'Tomate de Mesa', emoji: '🍅', date: 'Hace 3 días', volumeMm: 14, method: 'Goteo' }
  ]);

  // Acción: Marcar como regado
  const handleMarkAsWatered = (scheduleId: string) => {
    setSchedules((prev) =>
      prev.map((item) => {
        if (item.id === scheduleId) {
          return {
            ...item,
            currentMoisture: 65, // Restaura a Capacidad de Campo óptima
            status: 'OPTIMO',
            lastWatered: 'Hoy (hace instantes)',
            nextScheduledTime: 'En 3 días a las 06:30'
          };
        }
        return item;
      })
    );

    const target = schedules.find((s) => s.id === scheduleId);
    if (target) {
      setWaterLog((prev) => [
        {
          id: 'log-' + Date.now(),
          crop: target.cropName,
          emoji: target.emoji,
          date: 'Hoy (Ahora)',
          volumeMm: Math.round(target.recommendedLitersPerM2 * 2.5),
          method: target.irrigationMethod
        },
        ...prev
      ]);

      toast.success(
        'Riego registrado exitosamente',
        `Lote de ${target.cropName}: lámina aplicada y suelo restaurado al 65% de humedad.`
      );
    }
  };

  // Acción: Posponer por lluvia pronosticada
  const handlePostponeForRain = (scheduleId: string) => {
    setSchedules((prev) =>
      prev.map((item) => {
        if (item.id === scheduleId) {
          return {
            ...item,
            status: 'POSPUESTO',
            nextScheduledTime: 'Pospuesto 48h por lluvia'
          };
        }
        return item;
      })
    );

    const target = schedules.find((s) => s.id === scheduleId);
    if (target) {
      toast.info(
        'Riego pospuesto por lluvia 🌧️',
        `Se aplazó el riego de ${target.cropName} 48 horas. Ahorro hídrico estimado: ${target.recommendedLitersPerM2 * 10} m³.`
      );
    }
  };

  // Acción: Simular Alerta de Riego interactiva inmediata
  const handleSimulateAlert = () => {
    const urgentCrop = schedules.find((s) => s.status === 'URGENTE') || schedules[0];
    toast.error(
      `🚨 ALERTA DE RIEGO: ${urgentCrop.cropName}`,
      `La humedad ha descendido a ${urgentCrop.currentMoisture}% (por debajo del umbral crítico de ${moistureThreshold}%). Inicie ${urgentCrop.irrigationMethod} para evitar estrés hídrico.`
    );
  };

  // Exportar Bitácora en PDF
  const handleExportPDF = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Encabezado
    doc.setFillColor(15, 61, 46); // #0F3D2E
    doc.rect(0, 0, 210, 36, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('AgroGuia', 16, 18);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Reporte Oficial de Bitacora y Programacion de Riego', 16, 27);
    doc.text(`Fecha: ${new Date().toLocaleDateString('es-ES')}`, 150, 27);

    // Resumen Técnico
    doc.setTextColor(30, 41, 34);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('1. Estado Hidrico por Cultivo Monitoreado', 16, 48);

    let yPos = 58;
    schedules.forEach((item, index) => {
      doc.setFillColor(index % 2 === 0 ? 250 : 255, 247, 240);
      doc.roundedRect(16, yPos, 178, 16, 2, 2, 'F');

      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text(`${item.cropName} (${item.variety})`, 20, yPos + 7);

      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text(`Humedad: ${item.currentMoisture}% | Kc: ${item.kcFactor} | Metodo: ${item.irrigationMethod}`, 20, yPos + 12);

      doc.setFont('helvetica', 'bold');
      doc.text(`Estado: ${item.status}`, 150, yPos + 10);

      yPos += 20;
    });

    // Riegos ejecutados
    yPos += 6;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('2. Registro de Riegos Aplicados Recientemente', 16, yPos);

    yPos += 10;
    waterLog.forEach((log) => {
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`• ${log.crop} - ${log.date} - Lamina: ${log.volumeMm} mm (${log.method})`, 20, yPos);
      yPos += 7;
    });

    // Pie de página con autoría obligatoria
    doc.setFillColor(232, 244, 236);
    doc.rect(0, 275, 210, 22, 'F');
    doc.setFontSize(9);
    doc.setTextColor(15, 61, 46);
    doc.setFont('helvetica', 'bold');
    doc.text('AgroGuia - Plataforma Web para la Comunidad Agricola', 16, 283);
    doc.setFont('helvetica', 'normal');
    doc.text('Conceptualizado y disenado por el Ing. Yeron Pool Cuero Montano, Desarrollador Web Full Stack.', 16, 289);

    doc.save(`AgroGuia-Bitacora-Riego-${new Date().toISOString().slice(0, 10)}.pdf`);
    toast.success('Bitácora descargada', 'Documento PDF generado y descargado en tu dispositivo.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-150">
      {/* Cabecera Principal */}
      {/* Cabecera Principal */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F4EC] text-[#0F3D2E] text-xs font-bold mb-2">
            <Droplets className="w-3.5 h-3.5 text-[#2E8B57]" />
            <span>Módulo Agronómico Inteligente</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-[#0F3D2E] tracking-tight">
            Notificaciones y Calendario de Riego
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-2xl">
            Monitoreo en tiempo real de humedad del suelo, balance hídrico y alertas automáticas para no desperdiciar agua ni someter tus cultivos a estrés hídrico.
          </p>
        </div>

        {/* Acciones de Cabecera */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={handleExportPDF}
            className="w-full sm:w-auto px-5 py-2.5 bg-[#0F3D2E] hover:bg-[#1B5E3F] text-white font-bold text-xs rounded-full shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#C5E063]" />
            <span>Descargar Bitácora PDF</span>
          </button>
        </div>
      </div>

      {/* Tarjetas de Clima y Sensores Agrícolas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        <div className="bg-white rounded-2xl p-3.5 sm:p-5 border border-neutral-200/80 shadow-xs space-y-1.5 sm:space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-semibold text-neutral-500 truncate">Evapotranspiración</span>
            <Sun className="w-4 h-4 text-amber-500 shrink-0" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl sm:text-3xl font-black text-[#0F3D2E]">4.2</span>
            <span className="text-[10px] sm:text-xs text-neutral-500 font-bold">mm/día</span>
          </div>
          <p className="text-[10px] sm:text-[11px] text-emerald-700 font-medium">Demanda moderada</p>
        </div>

        <div className="bg-white rounded-2xl p-3.5 sm:p-5 border border-neutral-200/80 shadow-xs space-y-1.5 sm:space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-semibold text-neutral-500 truncate">Humedad Suelo</span>
            <Droplets className="w-4 h-4 text-sky-500 shrink-0" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl sm:text-3xl font-black text-[#0F3D2E]">46%</span>
            <span className="text-[10px] sm:text-xs text-neutral-500 font-bold">VWC</span>
          </div>
          <p className="text-[10px] sm:text-[11px] text-sky-700 font-medium">Capacidad adecuada</p>
        </div>

        <div className="bg-white rounded-2xl p-3.5 sm:p-5 border border-neutral-200/80 shadow-xs space-y-1.5 sm:space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-semibold text-neutral-500 truncate">Pronóstico Lluvia</span>
            <CloudRain className="w-4 h-4 text-indigo-500 shrink-0" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl sm:text-3xl font-black text-[#0F3D2E]">70%</span>
            <span className="text-[10px] sm:text-xs text-neutral-500 font-bold">Prob.</span>
          </div>
          <p className="text-[10px] sm:text-[11px] text-indigo-600 font-medium">Lluvia en ~36h</p>
        </div>

        <div className="bg-white rounded-2xl p-3.5 sm:p-5 border border-neutral-200/80 shadow-xs space-y-1.5 sm:space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-semibold text-neutral-500 truncate">Ahorro de Agua</span>
            <Sparkles className="w-4 h-4 text-[#C5E063] shrink-0" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl sm:text-3xl font-black text-[#0F3D2E]">38%</span>
            <span className="text-[10px] sm:text-xs text-neutral-500 font-bold">vs ciego</span>
          </div>
          <p className="text-[10px] sm:text-[11px] text-emerald-700 font-medium">Sensores + Kc</p>
        </div>
      </div>

      {/* Tabs de Navegación Interna */}
      <div className="flex items-center gap-2 sm:gap-3 border-b border-neutral-200 pb-2 overflow-x-auto scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
        <button
          onClick={() => setActiveTab('CALENDARIO')}
          className={`pb-2 px-2.5 sm:px-3 text-xs sm:text-sm font-bold whitespace-nowrap transition-all border-b-2 cursor-pointer flex items-center gap-1.5 sm:gap-2 ${
            activeTab === 'CALENDARIO'
              ? 'border-[#0F3D2E] text-[#0F3D2E]'
              : 'border-transparent text-neutral-500 hover:text-neutral-800'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Cultivos y Programación ({schedules.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('SENSORES')}
          className={`pb-2 px-2.5 sm:px-3 text-xs sm:text-sm font-bold whitespace-nowrap transition-all border-b-2 cursor-pointer flex items-center gap-1.5 sm:gap-2 ${
            activeTab === 'SENSORES'
              ? 'border-[#0F3D2E] text-[#0F3D2E]'
              : 'border-transparent text-neutral-500 hover:text-neutral-800'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Configuración de Alertas</span>
        </button>

        <button
          onClick={() => setActiveTab('BITACORA')}
          className={`pb-2 px-2.5 sm:px-3 text-xs sm:text-sm font-bold whitespace-nowrap transition-all border-b-2 cursor-pointer flex items-center gap-1.5 sm:gap-2 ${
            activeTab === 'BITACORA'
              ? 'border-[#0F3D2E] text-[#0F3D2E]'
              : 'border-transparent text-neutral-500 hover:text-neutral-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Bitácora de Riegos ({waterLog.length})</span>
        </button>
      </div>

      {/* TAB 1: CALENDARIO Y CULTIVOS */}
      {activeTab === 'CALENDARIO' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schedules.map((item) => {
            const isUrgent = item.status === 'URGENTE';
            const isOptimal = item.status === 'OPTIMO';

            return (
              <div
                key={item.id}
                className={`bg-white rounded-3xl p-6 border transition-all shadow-xs hover:shadow-md flex flex-col justify-between ${
                  isUrgent
                    ? 'border-red-300 ring-2 ring-red-100 bg-red-50/20'
                    : 'border-neutral-200/80'
                }`}
              >
                <div className="space-y-4">
                  {/* Encabezado de la Tarjeta */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-[#FAF7F0] border border-[#0F3D2E]/10 flex items-center justify-center shrink-0">
                        <AppleEmoji symbol={item.emoji} size="xl" />
                      </div>
                      <div>
                        <h3 className="font-black text-lg text-[#0F3D2E] leading-tight">{item.cropName}</h3>
                        <p className="text-xs text-neutral-500 italic mt-0.5">{item.variety}</p>
                      </div>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-black tracking-wide ${
                        isUrgent
                          ? 'bg-red-600 text-white animate-pulse'
                          : isOptimal
                          ? 'bg-[#C5E063] text-[#0F3D2E]'
                          : item.status === 'POSPUESTO'
                          ? 'bg-sky-100 text-sky-800'
                          : 'bg-amber-100 text-amber-900'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  {/* Estado Fenológico y Kc */}
                  <div className="p-3 bg-[#FAF7F0] rounded-2xl border border-neutral-200/60 text-xs space-y-1">
                    <div className="flex items-center justify-between text-neutral-600">
                      <span>Etapa Fenológica:</span>
                      <span className="font-bold text-[#0F3D2E]">{item.stage}</span>
                    </div>
                    <div className="flex items-center justify-between text-neutral-600">
                      <span>Coeficiente Kc:</span>
                      <span className="font-bold text-[#0F3D2E]">{item.kcFactor.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between text-neutral-600">
                      <span>Sistema:</span>
                      <span className="font-bold text-[#0F3D2E]">{item.irrigationMethod}</span>
                    </div>
                  </div>

                  {/* Barra de Humedad del Suelo */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-neutral-700 flex items-center gap-1.5">
                        <Droplets className="w-3.5 h-3.5 text-sky-600" />
                        <span>Humedad de Raíz:</span>
                      </span>
                      <span
                        className={`font-black ${
                          item.currentMoisture < item.thresholdMoisture ? 'text-red-600' : 'text-[#0F3D2E]'
                        }`}
                      >
                        {item.currentMoisture}%{' '}
                        {item.currentMoisture < item.thresholdMoisture ? '(Crítico)' : '(Adecuado)'}
                      </span>
                    </div>

                    <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden p-0.5 border border-neutral-200/50">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          item.currentMoisture < item.thresholdMoisture
                            ? 'bg-red-500'
                            : item.currentMoisture > 55
                            ? 'bg-[#2E8B57]'
                            : 'bg-[#C5E063]'
                        }`}
                        style={{ width: `${Math.min(100, item.currentMoisture)}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-neutral-400">
                      <span>Umbral mínimo: {item.thresholdMoisture}%</span>
                      <span>Capacidad de campo: 65%</span>
                    </div>
                  </div>

                  {/* Próximo Riego */}
                  <div className="flex items-center gap-2 text-xs text-neutral-600 pt-1">
                    <Clock className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    <span>
                      <strong>Próximo turno:</strong> {item.nextScheduledTime}
                    </span>
                  </div>
                </div>

                {/* Acciones de la Tarjeta */}
                <div className="pt-6 space-y-2 border-t border-neutral-100 mt-4">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleMarkAsWatered(item.id)}
                      className="py-2.5 px-3 bg-[#0F3D2E] hover:bg-[#1B5E3F] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C5E063]" />
                      <span>Regado hoy</span>
                    </button>

                    <button
                      onClick={() => handlePostponeForRain(item.id)}
                      className="py-2.5 px-3 bg-[#FAF7F0] hover:bg-neutral-100 text-[#0F3D2E] border border-[#0F3D2E]/20 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <AppleEmoji symbol="🌧️" size="xs" />
                      <span>Posponer lluvia</span>
                    </button>
                  </div>

                  <p className="text-[10px] text-center text-neutral-400">
                    Último riego: {item.lastWatered} · Dosis sugerida: {item.recommendedLitersPerM2} L/m²
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: CONFIGURACIÓN Y SENSORES */}
      {activeTab === 'SENSORES' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-xs space-y-6">
            <h3 className="font-black text-lg text-[#0F3D2E] flex items-center gap-2">
              <Bell className="w-5 h-5 text-[#2E8B57]" />
              <span>Canales y Notificaciones</span>
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#FAF7F0] rounded-2xl">
                <div>
                  <h4 className="font-bold text-sm text-[#0F3D2E]">Notificaciones en Pantalla / Push</h4>
                  <p className="text-xs text-neutral-500">Recibe alertas en tu celular o navegador cuando la humedad caiga.</p>
                </div>
                <button
                  onClick={() => {
                    setNotificationsEnabled(!notificationsEnabled);
                    toast.success(
                      notificationsEnabled ? 'Notificaciones silenciadas' : 'Notificaciones activadas',
                      'Configuración de alerta guardada.'
                    );
                  }}
                  className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                    notificationsEnabled ? 'bg-[#0F3D2E]' : 'bg-neutral-300'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      notificationsEnabled ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-[#FAF7F0] rounded-2xl">
                <div>
                  <h4 className="font-bold text-sm text-[#0F3D2E]">Alerta Sonora Fuerte</h4>
                  <p className="text-xs text-neutral-500">Emite un tono acústico ante eventos de sequedad crítica.</p>
                </div>
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                    soundEnabled ? 'bg-[#0F3D2E]' : 'bg-neutral-300'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      soundEnabled ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center text-sm font-bold text-[#0F3D2E]">
                <span>Umbral de Activación de Alerta Crítica:</span>
                <span className="px-2.5 py-1 bg-[#E8F4EC] rounded-lg text-xs">{moistureThreshold}% VWC</span>
              </div>
              <input
                type="range"
                min="20"
                max="50"
                value={moistureThreshold}
                onChange={(e) => setMoistureThreshold(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[#0F3D2E]"
              />
              <p className="text-xs text-neutral-500">
                Se notificará inmediatamente si algún cultivo cae por debajo de este nivel de humedad del suelo.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-xs space-y-4">
            <h3 className="font-black text-lg text-[#0F3D2E] flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-[#2E8B57]" />
              <span>Integración con WhatsApp de Campo</span>
            </h3>

            <p className="text-xs text-neutral-600 leading-relaxed">
              Puedes enviar un reporte de riego directamente al encargado de campo o cuadrilla con un solo toque:
            </p>

            <div className="p-4 bg-[#FAF7F0] rounded-2xl border border-neutral-200 font-mono text-xs text-neutral-700 space-y-1">
              <p className="font-bold text-[#0F3D2E]">💧 *ALERTA DE RIEGO — AGROGUÍA* 💧</p>
              <p>🌱 *Lote:* Tomates (Floración)</p>
              <p>📉 *Humedad:* 28% (Crítico)</p>
              <p>🚰 *Dosis recomendada:* 5.5 L/m² por Goteo</p>
              <p>🕒 *Turno:* Hoy a las 17:30</p>
            </div>

            <button
              onClick={() => {
                toast.success('Mensaje copiado', 'Listo para enviar por WhatsApp al operador de riego.');
              }}
              className="w-full py-3 bg-[#0F3D2E] hover:bg-[#1B5E3F] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <AppleEmoji symbol="📱" size="xs" />
              <span>Compartir programación de riego</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: BITÁCORA */}
      {activeTab === 'BITACORA' && (
        <div className="bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-lg text-[#0F3D2E]">Historial de Riegos Aplicados</h3>
            <span className="text-xs text-neutral-500">{waterLog.length} registros recientes</span>
          </div>

          <div className="divide-y divide-neutral-100">
            {waterLog.map((log) => (
              <div key={log.id} className="py-3.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <AppleEmoji symbol={log.emoji} size="md" />
                  <div>
                    <h4 className="font-bold text-sm text-[#0F3D2E]">{log.crop}</h4>
                    <p className="text-xs text-neutral-500">
                      {log.date} · Método: {log.method}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-sm font-black text-[#2E8B57]">{log.volumeMm} mm</span>
                  <p className="text-[10px] text-neutral-400">Lámina neta</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
