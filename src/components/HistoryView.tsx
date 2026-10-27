import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { AppleEmoji } from './AppleEmoji';
import { CROPS_DATA } from '../data/crops';
import { generateCropManualPDF } from '../utils/pdfGenerator';
import { useToast } from './SonnerToaster';
import { Download, FileText, Camera, Calendar, Clock, Trash2 } from 'lucide-react';

export const HistoryView: React.FC = () => {
  const { user } = useAuth();
  const toast = useToast();
  const [tab, setTab] = useState<'descargas' | 'escaneos'>('descargas');

  const [downloadHistory, setDownloadHistory] = useState<any[]>([]);
  const [scanHistory, setScanHistory] = useState<any[]>([]);

  useEffect(() => {
    try {
      const d = JSON.parse(localStorage.getItem('agroguia_audit_downloads') || '[]');
      setDownloadHistory(d);
      const s = JSON.parse(localStorage.getItem('agroguia_user_scans') || '[]');
      setScanHistory(s);
    } catch {}
  }, []);

  const handleReDownload = (cropSlug: string, level: string) => {
    const crop = CROPS_DATA.find((c) => c.slug === cropSlug) || CROPS_DATA[0];
    generateCropManualPDF(crop, (level as any) || 'PRINCIPIANTE');
    toast.success('Manual descargado', `Copia de ${crop.name} generada exitosamente.`);
  };

  const handleClearHistory = () => {
    if (tab === 'descargas') {
      localStorage.removeItem('agroguia_audit_downloads');
      setDownloadHistory([]);
      toast.info('Historial vaciado', 'Se eliminó el historial de descargas.');
    } else {
      localStorage.removeItem('agroguia_user_scans');
      setScanHistory([]);
      toast.info('Historial vaciado', 'Se eliminó el historial de escaneos.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-150">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F4EC] text-[#0F3D2E] text-xs font-bold mb-2">
            <span>Bitácora de Campo</span>
          </div>
          <h1 className="text-3xl font-black text-[#0F3D2E]">Historial y Descargas</h1>
          <p className="text-sm text-neutral-600 mt-1">
            Registro de manuales técnicos consultados y diagnósticos fitosanitarios realizados.
          </p>
        </div>

        {(downloadHistory.length > 0 || scanHistory.length > 0) && (
          <button
            onClick={handleClearHistory}
            className="px-4 py-2 border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer self-start"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Limpiar bitácora</span>
          </button>
        )}
      </div>

      {/* Selector de pestañas */}
      <div className="flex gap-2 border-b border-neutral-200 pb-2 text-xs font-bold">
        <button
          onClick={() => setTab('descargas')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
            tab === 'descargas'
              ? 'bg-[#0F3D2E] text-white shadow-xs'
              : 'bg-white text-neutral-600 hover:bg-neutral-100'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Manuales Descargados ({downloadHistory.length})</span>
        </button>

        <button
          onClick={() => setTab('escaneos')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
            tab === 'escaneos'
              ? 'bg-[#0F3D2E] text-white shadow-xs'
              : 'bg-white text-neutral-600 hover:bg-neutral-100'
          }`}
        >
          <Camera className="w-3.5 h-3.5" />
          <span>Diagnósticos con Cámara ({scanHistory.length})</span>
        </button>
      </div>

      {/* Contenido de la pestaña */}
      {tab === 'descargas' ? (
        downloadHistory.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-neutral-200 space-y-3">
            <div className="w-16 h-16 rounded-full bg-[#FAF7F0] flex items-center justify-center mx-auto text-[#0F3D2E]">
              <FileText className="w-8 h-8 text-[#2E8B57]" />
            </div>
            <h3 className="font-bold text-base text-neutral-800">No tienes descargas registradas aún</h3>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto">
              Entra a cualquier cultivo en el catálogo para generar y descargar su manual técnico oficial en PDF.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-6 border border-neutral-200 divide-y divide-neutral-100 shadow-xs">
            {downloadHistory.map((d, idx) => {
              const crop = CROPS_DATA.find((c) => c.slug === d.cropSlug) || CROPS_DATA[0];
              return (
                <div key={idx} className="py-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <AppleEmoji symbol={crop.emoji} size="md" />
                    <div>
                      <h4 className="font-extrabold text-sm text-[#0F3D2E]">
                        Manual de {crop.name} ({d.level})
                      </h4>
                      <p className="text-[11px] text-neutral-500">
                        Descargado el {new Date(d.timestamp).toLocaleDateString('es-EC')} a las{' '}
                        {new Date(d.timestamp).toLocaleTimeString('es-EC', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleReDownload(d.cropSlug, d.level)}
                    className="px-3.5 py-1.5 bg-[#FAF7F0] hover:bg-[#E8F4EC] border border-[#0F3D2E]/20 text-[#0F3D2E] text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-[#2E8B57]" />
                    <span>Volver a descargar</span>
                  </button>
                </div>
              );
            })}
          </div>
        )
      ) : scanHistory.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-neutral-200 space-y-3">
          <div className="w-16 h-16 rounded-full bg-[#FAF7F0] flex items-center justify-center mx-auto text-[#0F3D2E]">
            <Camera className="w-8 h-8 text-[#2E8B57]" />
          </div>
          <h3 className="font-bold text-base text-neutral-800">Sin escaneos guardados</h3>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            Utiliza el módulo de Cámara IA para diagnosticar hojas y plantas. Los informes guardados aparecerán aquí.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {scanHistory.map((s, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AppleEmoji symbol={s.emoji || '🌱'} size="md" />
                  <div>
                    <h4 className="font-bold text-sm text-[#0F3D2E]">{s.species}</h4>
                    <p className="text-[11px] text-neutral-500 italic">{s.scientificName}</p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E8F4EC] text-[#0F3D2E]">
                  {s.status}
                </span>
              </div>
              <p className="text-xs text-neutral-600 pt-1 line-clamp-2">{s.diagnosis}</p>
              <p className="text-[10px] text-neutral-400 pt-1">Registrado: {s.dateStr}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
