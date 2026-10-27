import React, { useState } from 'react';
import { AppleEmoji } from './AppleEmoji';
import { Search, ShieldAlert, Sparkles, AlertCircle, CheckCircle } from 'lucide-react';

interface PestItem {
  id: string;
  name: string;
  category: 'INSECTICIDAS' | 'FUNGICIDAS' | 'HERBICIDAS' | 'BIOLOGICO';
  emoji: string;
  affectedCrops: string;
  symptoms: string;
  treatment: string;
  biologicalAction: string;
  safetyInterval: string;
}

export const PestControlView: React.FC = () => {
  const [filter, setFilter] = useState<string>('TODOS');
  const [search, setSearch] = useState('');

  const pestCatalog: PestItem[] = [
    {
      id: 'pest-1',
      name: 'Gusano Cogollero (Spodoptera frugiperda)',
      category: 'INSECTICIDAS',
      emoji: '🐛',
      affectedCrops: 'Maíz, Arroz, Sorgo',
      symptoms: 'Perforaciones irregulares en hojas tiernas y cogollos taponados con excrementos tipo aserrín.',
      treatment: 'Spinetoram o Clorantraniliprole rotando modos de acción (IRAC) en horas del atardecer.',
      biologicalAction: 'Aplicación de Bacillus thuringiensis (Bt) o liberación de avispitas Trichogramma.',
      safetyInterval: '14 días antes de cosecha'
    },
    {
      id: 'pest-2',
      name: 'Mosca Blanca (Bemisia tabaci)',
      category: 'INSECTICIDAS',
      emoji: '🪰',
      affectedCrops: 'Tomate, Pimiento, Fríjol',
      symptoms: 'Insectos diminutos blanquecinos bajo la hoja, exudación de mielecilla y transmisión de virosis.',
      treatment: 'Jabón potásico al 2% o Spiromesifen en rotación.',
      biologicalAction: 'Parasitoides Encarsia formosa y hongos entomopatógenos Beauveria bassiana.',
      safetyInterval: '7 días antes de cosecha'
    },
    {
      id: 'pest-3',
      name: 'Broca del Café (Hypothenemus hampei)',
      category: 'INSECTICIDAS',
      emoji: '🪲',
      affectedCrops: 'Café',
      symptoms: 'Orificio milimétrico en la cicatriz o corona de la cereza de café verde o madura.',
      treatment: 'Recolección rigurosa y zoqueo de cafetales abandonados.',
      biologicalAction: 'Aspersión de cepas nativas de Beauveria bassiana en época de vuelo.',
      safetyInterval: 'Cero residuos tóxicos con biocontrol'
    },
    {
      id: 'pest-4',
      name: 'Tizón Tardío o Lancha (Phytophthora infestans)',
      category: 'FUNGICIDAS',
      emoji: '🍄',
      affectedCrops: 'Papa, Tomate',
      symptoms: 'Manchas acuosas verde oscuro a pardas en folíolos con vellón blanco algodonoso por el envés en clima frío y húmedo.',
      treatment: 'Oxicloruro de cobre preventivo; Mancozeb o Dimethomorph con síntomas iniciales.',
      biologicalAction: 'Extractos de cola de caballo (Equisetum) y cepas de Bacillus subtilis.',
      safetyInterval: '10 días antes de cosecha'
    },
    {
      id: 'pest-5',
      name: 'Sigatoka Negra (Pseudocercospora fijiensis)',
      category: 'FUNGICIDAS',
      emoji: '🍄',
      affectedCrops: 'Plátano, Banano',
      symptoms: 'Rayas y estrías marrón rojizo en hojas que necrosan el área foliar provocando maduración prematura del racimo.',
      treatment: 'Deshoje fitosanitario semanal y fungicidas triazoles con aceite agrícola.',
      biologicalAction: 'Manejo riguroso de drenajes y extractos botánicos de Melaleuca alternifolia.',
      safetyInterval: '15 días antes de cosecha'
    },
    {
      id: 'pest-6',
      name: 'Moniliasis del Cacao (Moniliophthora roreri)',
      category: 'FUNGICIDAS',
      emoji: '🍄',
      affectedCrops: 'Cacao',
      symptoms: 'Giba o deformación precoz en pepinillos, mancha café en mazorcas y polvo blanco de esporas sumamente infectivo.',
      treatment: 'Remoción semanal de mazorcas enfermas antes de que esporulen y regulación de sombra.',
      biologicalAction: 'Inoculación de Trichoderma viride en floración.',
      safetyInterval: 'Cero químicos necesarios con poda sanitaria'
    },
    {
      id: 'pest-7',
      name: 'Manejo de Gramíneas y Hoja Ancha',
      category: 'HERBICIDAS',
      emoji: '🌿',
      affectedCrops: 'Arroz, Maíz, Fríjol, Yuca',
      symptoms: 'Competencia agresiva por agua, luz y nitrógeno que reduce hasta un 40% el rendimiento.',
      treatment: 'Aplicaciones de pre-emergentes selectivos con suelo húmedo tras la siembra.',
      biologicalAction: 'Cultivos de cobertura con mucuna o canavalia y acolchado orgánico denso.',
      safetyInterval: '30 días antes de cosecha'
    },
    {
      id: 'pest-8',
      name: 'Trichoderma harzianum (Hongo Antagonista)',
      category: 'BIOLOGICO',
      emoji: '🐞',
      affectedCrops: 'Papa, Tomate, Maíz, Fríjol, Yuca',
      symptoms: 'Controla hongos de suelo como Fusarium, Rhizoctonia, Pythium y Sclerotinia.',
      treatment: 'Inoculación en drench o en mezcla con abono orgánico en la siembra.',
      biologicalAction: 'Micoparasitismo directo, antibiosis y bioestimulación radicular.',
      safetyInterval: 'Cero días (100% orgánico y seguro)'
    },
    {
      id: 'pest-9',
      name: 'Beauveria bassiana (Entomopatógeno)',
      category: 'BIOLOGICO',
      emoji: '🐞',
      affectedCrops: 'Café, Maíz, Plátano, Pimiento',
      symptoms: 'Controla insectos perforadores, broca, picudos y gusanos de follaje.',
      treatment: 'Aspersión foliar al atardecer para proteger las esporas de la luz ultravioleta.',
      biologicalAction: 'El hongo germina y penetra la cutícula del insecto, momificándolo.',
      safetyInterval: 'Cero días (biodegradable)'
    }
  ];

  const filteredPests = pestCatalog.filter((item) => {
    const matchCat = filter === 'TODOS' || item.category === filter;
    const matchSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.affectedCrops.toLowerCase().includes(search.toLowerCase()) ||
      item.symptoms.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-150">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F4EC] text-[#0F3D2E] text-xs font-bold mb-2">
          <span>Sanidad Vegetal y Buenas Prácticas</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-[#0F3D2E]">Control de Plagas y Enfermedades</h1>
        <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-xl">
          Protocolos agronómicos para el manejo integrado de plagas (MIP), dosis seguras, rotación de moléculas y bioprotección.
        </p>
      </div>

      {/* Controles de Búsqueda y Filtro */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {[
            { key: 'TODOS', label: 'Todos', emoji: null },
            { key: 'INSECTICIDAS', label: 'Insecticidas', emoji: '🐛' },
            { key: 'FUNGICIDAS', label: 'Fungicidas', emoji: '🍄' },
            { key: 'HERBICIDAS', label: 'Herbicidas', emoji: '🌿' },
            { key: 'BIOLOGICO', label: 'Control Biológico', emoji: '🐞' }
          ].map((cat) => (
            <button
              key={cat.key}
              onClick={() => setFilter(cat.key)}
              className={`px-3.5 sm:px-4 py-2 text-xs font-bold rounded-full whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                filter === cat.key
                  ? 'bg-[#0F3D2E] text-white shadow-sm'
                  : 'bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-50'
              }`}
            >
              <span>{cat.label}</span>
              {cat.emoji && <AppleEmoji symbol={cat.emoji} size="xs" />}
            </button>
          ))}
        </div>

        <div className="w-full md:w-64 relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar plaga o cultivo..."
            className="w-full pl-9 pr-3.5 py-2 bg-white border border-neutral-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0F3D2E]"
          />
        </div>
      </div>

      {/* Grid de Fichas Fitosanitarias */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPests.map((pest) => (
          <div
            key={pest.id}
            className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-xs hover:shadow-md transition-shadow space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#FAF7F0] flex items-center justify-center border border-[#0F3D2E]/10">
                  <AppleEmoji symbol={pest.emoji} size="lg" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E8F4EC] text-[#0F3D2E]">
                  {pest.category}
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-base text-[#0F3D2E] leading-snug">{pest.name}</h3>
                <p className="text-xs text-neutral-500 font-semibold mt-0.5">
                  Cultivos atacados: <span className="text-neutral-700">{pest.affectedCrops}</span>
                </p>
              </div>

              <div className="p-3 bg-neutral-50 rounded-xl text-xs space-y-1.5 text-neutral-700">
                <p>
                  <strong className="text-[#0F3D2E]">Síntomas:</strong> {pest.symptoms}
                </p>
                <p>
                  <strong className="text-[#0F3D2E]">Manejo técnico:</strong> {pest.treatment}
                </p>
                <p>
                  <strong className="text-[#2E8B57]">Opción biológica:</strong> {pest.biologicalAction}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500 font-medium">
              <span>Periodo de carencia:</span>
              <span className="font-bold text-[#0F3D2E]">{pest.safetyInterval}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
