import React, { useState, useMemo } from 'react';
import { CROPS_DATA, Crop, CropCategory, ExperienceLevel } from '../data/crops';
import { AppleEmoji } from './AppleEmoji';
import { Search, Filter, BookOpen, Clock, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface CropCatalogViewProps {
  onSelectCrop: (crop: Crop) => void;
  selectedLevel: ExperienceLevel;
  onRequireAuth: () => void;
}

export const CropCatalogView: React.FC<CropCatalogViewProps> = ({
  onSelectCrop,
  selectedLevel,
  onRequireAuth
}) => {
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('TODOS');

  const categories: { key: string; label: string }[] = [
    { key: 'TODOS', label: 'Todos los cultivos' },
    { key: 'CEREAL', label: 'Cereales 🌽' },
    { key: 'TUBERCULO', label: 'Tubérculos 🥔' },
    { key: 'RAIZ', label: 'Raíces 🍠' },
    { key: 'HORTALIZA', label: 'Hortalizas 🍅' },
    { key: 'FRUTAL', label: 'Frutales 🍌' },
    { key: 'INDUSTRIAL', label: 'Industriales ☕' },
    { key: 'LEGUMINOSA', label: 'Leguminosas 🫘' }
  ];

  const filteredCrops = useMemo(() => {
    return CROPS_DATA.filter((crop) => {
      const matchSearch =
        crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        crop.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        crop.family.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategory =
        selectedCategory === 'TODOS' || crop.category === selectedCategory;

      return matchSearch && matchCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header del Catálogo */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F4EC] text-[#0F3D2E] text-xs font-bold mb-2">
            <span>Catálogo Botánico y Agronómico</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-[#0F3D2E]">Catálogo de Cultivos</h1>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-xl">
            Explora las 12 especies fundamentales con manuales técnicos detallados por nivel (Principiante 🌱, Intermedio 🌿, Avanzado 🌾).
          </p>
        </div>

        {/* Buscador */}
        <div className="w-full md:w-72 relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nombre o familia..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-neutral-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3D2E] shadow-xs"
          />
        </div>
      </div>

      {/* Filtros de Categoría */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            className={`px-3.5 sm:px-4 py-2 text-xs font-bold rounded-full whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat.key
                ? 'bg-[#0F3D2E] text-white shadow-sm'
                : 'bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid de Cultivos */}
      {filteredCrops.length === 0 ? (
        <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-neutral-200 space-y-3">
          <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-base text-neutral-800">No encontramos cultivos con esa búsqueda</h3>
          <p className="text-xs text-neutral-500 max-w-xs mx-auto">
            Intenta con otro término o selecciona "Todos los cultivos" en los filtros superiores.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredCrops.map((crop) => (
            <div
              key={crop.id}
              onClick={() => onSelectCrop(crop)}
              className="agro-card bg-white rounded-2xl p-5 border border-neutral-200/80 hover:shadow-xl hover:border-[#2E8B57]/50 transition-all flex flex-col justify-between group cursor-pointer"
            >
              <div>
                {/* Cabecera con emoji Apple grande y badge de dificultad */}
                <div className="flex items-start justify-between mb-3">
                  <div className="w-16 h-16 rounded-2xl bg-[#FAF7F0] border border-[#0F3D2E]/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <AppleEmoji symbol={crop.emoji} size="xl" />
                  </div>
                  <span
                    className={`px-2.5 py-1 text-[10px] font-bold rounded-full ${
                      crop.difficulty === 'Fácil'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : crop.difficulty === 'Media'
                        ? 'bg-amber-50 text-amber-800 border border-amber-200'
                        : 'bg-rose-50 text-rose-800 border border-rose-200'
                    }`}
                  >
                    {crop.difficulty}
                  </span>
                </div>

                <h3 className="font-black text-lg text-[#0F3D2E] group-hover:text-[#2E8B57] transition-colors">
                  {crop.name}
                </h3>
                <p className="text-xs text-neutral-500 italic mt-0.5">
                  {crop.scientificName} · {crop.family}
                </p>

                <p className="text-xs text-neutral-600 mt-2.5 line-clamp-2 leading-relaxed">
                  {crop.shortDescription}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-neutral-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{crop.durationDays} días</span>
                </div>

                <button
                  onClick={() => onSelectCrop(crop)}
                  className="px-4 py-2 text-xs font-bold text-[#0F3D2E] bg-[#FAF7F0] hover:bg-[#0F3D2E] hover:text-white border border-[#0F3D2E]/20 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Ver ficha</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
