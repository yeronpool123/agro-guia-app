export type CropCategory =
  | 'TUBERCULO'
  | 'RAIZ'
  | 'CEREAL'
  | 'FRUTAL'
  | 'HORTALIZA'
  | 'INDUSTRIAL'
  | 'LEGUMINOSA';

export type ExperienceLevel = 'PRINCIPIANTE' | 'INTERMEDIO' | 'AVANZADO';

export interface NpkStage {
  etapa: string;
  n: number;
  p: number;
  k: number;
  observaciones: string;
}

export interface PlantingStep {
  step: number;
  title: string;
  description: string;
  emoji: string;
}

export interface PestInfo {
  name: string;
  scientificName?: string;
  type: 'INSECTO' | 'HONGO' | 'BACTERIA' | 'VIRUS' | 'ACARO';
  symptoms: string;
  treatment: string;
  biologicalControl: string;
  emoji: string;
}

export interface CropManualData {
  title: string;
  subtitle: string;
  introduction: string;
  climateRequirements: {
    tempOptima: string;
    precipitacion: string;
    fotoperiodo: string;
    altitud: string;
  };
  soilRequirements: {
    ph: string;
    textura: string;
    materiaOrganica: string;
    drenaje: string;
  };
  plantingSteps: PlantingStep[];
  fertilizationNPK: NpkStage[];
  irrigationPlan: string;
  plagueControl: PestInfo[];
  harvestIndicators: string;
  postHarvest: string;
  glossary: { term: string; definition: string }[];
  references: string[];
}

export interface Crop {
  id: string;
  slug: string;
  name: string;
  scientificName: string;
  family: string;
  emoji: string;
  category: CropCategory;
  categoryLabel: string;
  shortDescription: string;
  durationDays: number;
  difficulty: 'Fácil' | 'Media' | 'Exigente';
  commonDiseasesCount: number;
  manuals: Record<ExperienceLevel, CropManualData>;
}

export const CROPS_DATA: Crop[] = [
  {
    id: 'crop-maiz',
    slug: 'maiz',
    name: 'Maíz',
    scientificName: 'Zea mays',
    family: 'Poaceae',
    emoji: '🌽',
    category: 'CEREAL',
    categoryLabel: 'Cereal',
    shortDescription: 'Cereal fundamental de alta adaptabilidad con gran demanda de nitrógeno y luz solar plena.',
    durationDays: 130,
    difficulty: 'Fácil',
    commonDiseasesCount: 4,
    manuals: {
      PRINCIPIANTE: {
        title: 'Manual Básico de Cultivo de Maíz',
        subtitle: 'Guía esencial para pequeños productores y huertos familiares',
        introduction: 'El maíz (Zea mays) es uno de los cereales más cultivados en el mundo. Para principiantes, es un cultivo noble y gratificante que requiere buena radiación solar, suelo suelto y riego oportuno durante la floración.',
        climateRequirements: {
          tempOptima: '18°C - 27°C',
          precipitacion: '500 - 800 mm por ciclo',
          fotoperiodo: 'Luz solar directa (mínimo 6-8 horas)',
          altitud: '0 a 2,600 msnm según la variedad'
        },
        soilRequirements: {
          ph: '6.0 - 7.2 (neutro a ligeramente ácido)',
          textura: 'Franco a franco-arenoso, fértil y suelto',
          materiaOrganica: '2% a 4%',
          drenaje: 'Muy bueno (no tolera encharcamientos prolongados)'
        },
        plantingSteps: [
          { step: 1, title: 'Preparación del terreno', description: 'Remover la tierra a 25 cm de profundidad eliminando malezas y terrones grandes.', emoji: '🌱' },
          { step: 2, title: 'Apertura de surcos o golpes', description: 'Abrir surcos separados a 80 cm y colocar 2 semillas cada 25-30 cm a 4-5 cm de profundidad.', emoji: '🟤' },
          { step: 3, title: 'Riego inicial', description: 'Regar suavemente para humedecer sin desplazar las semillas. La germinación ocurre entre 4 y 7 días.', emoji: '💧' },
          { step: 4, title: 'Aporque y deshierbe', description: 'A los 25-30 días amontonar tierra en la base del tallo para dar soporte y controlar maleza.', emoji: '🌿' }
        ],
        fertilizationNPK: [
          { etapa: 'Siembra (Basal)', n: 30, p: 50, k: 30, observaciones: 'Aplicar a 5 cm al lado y debajo de la semilla para estimular enraizamiento.' },
          { etapa: 'Desarrollo vegetativo (V6: 30 días)', n: 60, p: 10, k: 20, observaciones: 'Aplicar nitrógeno antes del aporque con suelo húmedo.' },
          { etapa: 'Espigazón / Floración', n: 40, p: 10, k: 30, observaciones: 'Fundamental para el llenado óptimo de los granos en la mazorca.' }
        ],
        irrigationPlan: 'Regar cada 4 a 6 días en clima cálido. El momento crítico es 2 semanas antes y 2 semanas después de la aparición de los estigmas (pelos de la mazorca).',
        plagueControl: [
          { name: 'Gusano cogollero', scientificName: 'Spodoptera frugiperda', type: 'INSECTO', symptoms: 'Hojas raspadas y cogollo con excrementos y perforaciones.', treatment: 'Aplicar Bacillus thuringiensis o extracto de Neem en horas tempranas.', biologicalControl: 'Liberación de avispitas parasitoides Trichogramma.', emoji: '🐛' },
          { name: 'Roya del maíz', scientificName: 'Puccinia sorghi', type: 'HONGO', symptoms: 'Pústulas pulverulentas de color café o rojizo en hojas.', treatment: 'Fungicidas a base de cobre o caldo sulfocálcico preventivo.', biologicalControl: 'Uso de variedades resistentes y rotación con leguminosas.', emoji: '🍄' }
        ],
        harvestIndicators: 'Las hojas y chalas se tornan pajizas y secas. El grano ofrece resistencia a la uña y muestra la capa negra en la base.',
        postHarvest: 'Desgranar con humedad inferior al 14%. Almacenar en sacos limpios o silos metálicos en lugar fresco, seco y ventilado.',
        glossary: [
          { term: 'Aporque', definition: 'Labor que consiste en acumular tierra alrededor del tallo de la planta para darle sostén.' },
          { term: 'Estigma', definition: 'Pelos del choclo que reciben el polen para fecundar cada grano.' }
        ],
        references: ['INIAP - Manual de producción de maíz amiláceo y duro', 'FAO - Guía técnica para cultivo de cereales']
      },
      INTERMEDIO: {
        title: 'Manual Técnico de Manejo Agronómico del Maíz',
        subtitle: 'Optimización de densidad de siembra, fertilización balanceada y sanidad',
        introduction: 'Este nivel profundiza en la fenología del cultivo (etapas V y R), cálculo de densidades poblacionales (55,000 - 70,000 plantas/ha) y nutrición de precisión para elevar rendimientos.',
        climateRequirements: {
          tempOptima: '20°C - 30°C (temperatura base 10°C)',
          precipitacion: '600 - 900 mm bien distribuidos',
          fotoperiodo: 'Heliofanía de 1,500 - 1,800 horas totales',
          altitud: 'Variedades mejoradas adaptadas por franjas de altitud'
        },
        soilRequirements: {
          ph: '6.2 - 6.8 (C.I.C. superior a 15 meq/100g)',
          textura: 'Franco-arcillo-limosa con buena aireación',
          materiaOrganica: '3% a 5%',
          drenaje: 'Conductividad hidráulica moderada, sin capas compactadas (pie de arado)'
        },
        plantingSteps: [
          { step: 1, title: 'Subsolado y descompactación', description: 'Rotura de pie de arado a 40 cm y rastreado nivelador para asegurar cama uniforme.', emoji: '🚜' },
          { step: 2, title: 'Inoculación y curado de semilla', description: 'Tratamiento con Trichoderma harzianum y bioestimulante enraizante.', emoji: '🌱' },
          { step: 3, title: 'Siembra de precisión calibrada', description: 'Calibración a 6.5 semillas por metro lineal con distancia de 75 cm entre hileras.', emoji: '📏' },
          { step: 4, title: 'Manejo integrado de malezas', description: 'Control temprano pre-emergente y aplicaciones selectivas dirigidas antes de V4.', emoji: '🛡️' }
        ],
        fertilizationNPK: [
          { etapa: 'V0 (Siembra)', n: 35, p: 70, k: 40, observaciones: 'Fósforo prioritario para masa radicular profunda.' },
          { etapa: 'V4 - V6 (6 hojas)', n: 80, p: 20, k: 40, observaciones: 'Diferenciación de mazorcas. Aplicación de Zinc quelatado foliar.' },
          { etapa: 'V10 - VT (Panoja)', n: 50, p: 10, k: 50, observaciones: 'Potasio previene acame y optimiza transporte de azúcares.' }
        ],
        irrigationPlan: 'Monitoreo con tensiómetros manteniendo el potencial mátrico entre -30 y -50 kPa durante el periodo crítico de polinización.',
        plagueControl: [
          { name: 'Gusano cogollero', scientificName: 'Spodoptera frugiperda', type: 'INSECTO', symptoms: 'Ventanilleo en hojas y daño al ápice de crecimiento.', treatment: 'Spinetoram o Clorantraniliprole rotando modos de acción (IRAC).', biologicalControl: 'Beauveria bassiana al 1x10^9 esporas/ml.', emoji: '🐛' },
          { name: 'Complejo de Mancha de Asfalto', scientificName: 'Phyllachora maydis + Monographella maydis', type: 'HONGO', symptoms: 'Costras negras brillantes rodeadas de halo necrótico que secan el follaje prematuramente.', treatment: 'Azoxystrobin + Difenoconazole aplicado al inicio de síntomas.', biologicalControl: 'Rotación obligatoria con no gramíneas.', emoji: '🍄' }
        ],
        harvestIndicators: 'Humedad de grano al 18-20% para cosecha mecanizada con secado posterior controlado hasta 13.5%.',
        postHarvest: 'Control estricto de gorgojo del maíz (Sitophilus zeamais) con tierra de diatomeas y ventilación forzada.',
        glossary: [
          { term: 'Etapa VT', definition: 'Panojamiento o floración masculina completa.' },
          { term: 'Acame', definition: 'Caída o doblamiento del tallo debido a debilidad mecánica o viento.' }
        ],
        references: ['CIMMYT - Guía de diagnóstico y manejo fenológico del maíz', 'CIAT - Manejo integrado de plagas en maíz']
      },
      AVANZADO: {
        title: 'Manual Avanzado de Agrotecnología y Fisiología del Maíz',
        subtitle: 'Agricultura de precisión, curvas de absorción nutrimental y biotecnología',
        introduction: 'Para ingenieros agrónomos y productores empresariales: dinámica de translocación de fotoasimilados, índices NDVI, zonificación edáfica y balance nutricional por hectárea.',
        climateRequirements: {
          tempOptima: 'Acumulación de Unidades de Calor (GDD: 1,300 a 1,600 Grados-Día)',
          precipitacion: 'Demanda hídrica estacional de 650 a 850 mm',
          fotoperiodo: 'Radiación fotosintéticamente activa (PAR) óptima > 1,800 µmol/m²/s',
          altitud: 'Selección de germoplasma según índice de madurez comparativa (CRM)'
        },
        soilRequirements: {
          ph: '6.5 buffer, saturación de bases > 70%, contenido de fósforo Bray II > 25 ppm',
          textura: 'Porosidad total > 48%, conductividad eléctrica < 1.5 dS/m',
          materiaOrganica: '> 3.5% con relación C:N equilibrada (10-12:1)',
          drenaje: 'Drenaje subterráneo controlado con capacidad de campo monitoreada por sondas FDR'
        },
        plantingSteps: [
          { step: 1, title: 'Mapeo electroconductivo y nutricional', description: 'Levantamiento de variabilidad de lote para prescripción de dosis variable.', emoji: '📡' },
          { step: 2, title: 'Tratamiento industrial de semilla con biofertilizantes', description: 'Azospirillum brasilense + consorcio micorrícico Glomus intraradices.', emoji: '🔬' },
          { step: 3, title: 'Siembra directa en camas sin labranza', description: 'Siembra sobre rastrojo con tren de siembra neumático y corte de paja.', emoji: '⚙️' },
          { step: 4, title: 'Monitoreo espectral y sensores foliares', description: 'Índices NDVI y NDRE mediante dron multiespectral para fertilización dirigida.', emoji: '🛸' }
        ],
        fertilizationNPK: [
          { etapa: 'Presiembra / Siembra', n: 45, p: 90, k: 60, observaciones: 'Incluir 15 kg/ha de Azufre elemental y 5 kg/ha de Zinc quelatado.' },
          { etapa: 'V6 (Rápida absorción)', n: 110, p: 25, k: 50, observaciones: 'Fraccionamiento mediante fertirriego o inyección lateral de UAN-32.' },
          { etapa: 'V12 - Pre-VT', n: 65, p: 15, k: 70, observaciones: 'Aporte de Boro (0.5 kg/ha) foliar para viabilidad del tubo polínico.' }
        ],
        irrigationPlan: 'Riego por goteo subterráneo (SDI) automatizado por coeficiente Kc (0.3 inicial, 1.2 en floración, 0.6 en maduración).',
        plagueControl: [
          { name: 'Spodoptera frugiperda resistente', scientificName: 'Spodoptera frugiperda', type: 'INSECTO', symptoms: 'Perforaciones destructivas en verticilo con daño a meristemo.', treatment: 'Rotación con Baculovirus SfNPV y feromonas de confusión sexual.', biologicalControl: 'Mantenimiento de corredores de parasitoides naturales.', emoji: '🐛' },
          { name: 'Fusariosis de la espiga', scientificName: 'Fusarium verticillioides', type: 'HONGO', symptoms: 'Pudrición rosada en granos con producción de micotoxinas (fumonisinas).', treatment: 'Control riguroso de insectos vectores de espiga y fungicidas en R1.', biologicalControl: 'Cepas antagónicas de Bacillus subtilis.', emoji: '🍄' }
        ],
        harvestIndicators: 'Cosecha anticipada al 22% de humedad con cabezal desgranador rotativo y secado estacionario con aire caliente a 60°C.',
        postHarvest: 'Monitoreo de micotoxinas (aflatoxinas < 20 ppb) y almacenamiento hermético bajo atmósfera modificada de CO2.',
        glossary: [
          { term: 'Kc (Coeficiente de cultivo)', definition: 'Parámetro adimensional que relaciona la evapotranspiración del cultivo con la de referencia.' },
          { term: 'CRM', definition: 'Comparative Relative Maturity: índice estándar de días a madurez fisiológica.' }
        ],
        references: ['IPNI - Manual de nutrición vegetal en cultivos de grano', 'American Phytopathological Society - Compendium of Corn Diseases']
      }
    }
  },
  {
    id: 'crop-papa',
    slug: 'papa',
    name: 'Papa',
    scientificName: 'Solanum tuberosum',
    family: 'Solanaceae',
    emoji: '🥔',
    category: 'TUBERCULO',
    categoryLabel: 'Tubérculo',
    shortDescription: 'Tubérculo andino de gran valor nutritivo, requiere suelos sueltos y control preventivo de tizón tardío.',
    durationDays: 140,
    difficulty: 'Media',
    commonDiseasesCount: 5,
    manuals: {
      PRINCIPIANTE: {
        title: 'Manual Práctico de Cultivo de Papa',
        subtitle: 'Siembra, manejo sencillo y cosecha de tubérculos sanos',
        introduction: 'La papa (Solanum tuberosum) es originaria de los Andes sudamericanos. Crece debajo de la tierra y requiere suelos esponjosos, libres de piedras y bien abonados.',
        climateRequirements: {
          tempOptima: '14°C - 20°C',
          precipitacion: '600 - 800 mm bien distribuidos',
          fotoperiodo: 'Días cortos estimulan la tuberización',
          altitud: '2,000 a 3,600 msnm en el trópico'
        },
        soilRequirements: {
          ph: '5.2 - 6.5 (tolera suelos ligeramente ácidos)',
          textura: 'Franco-arenosa, profunda y muy suelta',
          materiaOrganica: 'Mayor a 3%',
          drenaje: 'Excelente; la raíz se asfixia con exceso de agua'
        },
        plantingSteps: [
          { step: 1, title: 'Selección de tubérculos semilla', description: 'Usar papas de 40 a 60 gramos con 3-4 brotes vigorosos y sanos.', emoji: '🥔' },
          { step: 2, title: 'Preparación de surcos', description: 'Surcos de 30 cm de profundidad distanciados a 90 cm entre sí.', emoji: '🌱' },
          { step: 3, title: 'Colocación de la semilla', description: 'Colocar cada tubérculo a 30 cm de distancia con los brotes hacia arriba y tapar con 8-10 cm de tierra.', emoji: '🟤' },
          { step: 4, title: 'Primer aporque', description: 'A los 35-40 días subir tierra a la base para que los tubérculos crezcan en la oscuridad y no se pongan verdes.', emoji: '🌿' }
        ],
        fertilizationNPK: [
          { etapa: 'Siembra (Fondo)', n: 40, p: 80, k: 40, observaciones: 'Abono orgánico bien descompuesto más fósforo localizado en el fondo del surco.' },
          { etapa: 'Primer aporque (35 días)', n: 50, p: 20, k: 40, observaciones: 'Nitrógeno para follaje y potasio para inicio de tuberización.' },
          { etapa: 'Floración (Llenado)', n: 30, p: 10, k: 60, observaciones: 'El potasio es el nutriente rey para el engorde del tubérculo.' }
        ],
        irrigationPlan: 'Riegos ligeros y regulares cada 5 a 7 días. Suspender el riego 15 días antes de la cosecha para que la piel de la papa cure.',
        plagueControl: [
          { name: 'Tizón tardío (Lancha)', scientificName: 'Phytophthora infestans', type: 'HONGO', symptoms: 'Manchas acuosas en hojas con moho blanco por el envés en clima húmedo y frío.', treatment: 'Oxicloruro de cobre preventivo en días de neblina o llovizna.', biologicalControl: 'Eliminar follaje afectado y plantar variedades con resistencia.', emoji: '🍄' },
          { name: 'Gorgojo de los Andes', scientificName: 'Premnotrypes vorax', type: 'INSECTO', symptoms: 'Larvas que perforan túneles dentro de los tubérculos bajo tierra.', treatment: 'Zanjas perimetrales y aporques altos.', biologicalControl: 'Uso de hongos entomopatógenos como Beauveria brongniartii.', emoji: '🐛' }
        ],
        harvestIndicators: 'El follaje se amarillea y se seca naturalmente. Al frotar la papa con el pulgar la piel no debe desprenderse.',
        postHarvest: 'Curar a la sombra por 8 días. Guardar en oscuridad total para evitar que produzca solanina (sustancia amarga verde tóxica).',
        glossary: [
          { term: 'Tuberización', definition: 'Proceso fisiológico en el que los estolones subterráneos engrosan formando la papa.' },
          { term: 'Solanina', definition: 'Alcaloide que se forma cuando la papa se expone a la luz, tornándola verdosa y no apta para consumo.' }
        ],
        references: ['Centro Internacional de la Papa (CIP) - Guía ilustrada de buenas prácticas', 'INIAP - Manejo del cultivo de papa']
      },
      INTERMEDIO: {
        title: 'Manual Técnico de Producción de Papa Comercial',
        subtitle: 'Certificación de semilla, balance catiónico y sanidad vegetal',
        introduction: 'Enfoque técnico en nutrición mineral balanceada (relaciones K/Mg y Ca/B), manejo integrado del Tizón Tardío con sistemas de alerta temprana y cosecha clasificada por calibres.',
        climateRequirements: {
          tempOptima: 'Día: 18-20°C / Noche: 10-12°C (amplitud térmica favorece fotosíntesis neta)',
          precipitacion: '650 a 850 mm por ciclo',
          fotoperiodo: '12 a 13 horas',
          altitud: '2,400 a 3,400 msnm'
        },
        soilRequirements: {
          ph: '5.5 a 6.2, C.I.C. > 20 meq/100g, conductividad < 1.2 dS/m',
          textura: 'Franco a franco-arenoso con densidad aparente < 1.1 g/cm³',
          materiaOrganica: '4% a 7%',
          drenaje: 'Drenaje interno rápido para prevenir Rhizoctonia solani y Erwinia carotovora'
        },
        plantingSteps: [
          { step: 1, title: 'Desinfección de semilla certificada', description: 'Inmersión en solución de sulfato de cobre y promotor de brotación apical.', emoji: '🧪' },
          { step: 2, title: 'Diseño de camellones elevados', description: 'Levantamiento de camas a 35 cm de altura con distancia de 1.0 m para facilitar drenaje.', emoji: '📐' },
          { step: 3, title: 'Fertilización en banda profunda', description: 'Colocación de fertilizantes 5 cm por debajo del tubérculo para evitar quemaduras.', emoji: '🌾' },
          { step: 4, title: 'Aporque escalonado doble', description: 'Primer aporque a los 20 cm de altura foliar y segundo aporque antes del cierre de hileras.', emoji: '🌱' }
        ],
        fertilizationNPK: [
          { etapa: 'Siembra', n: 60, p: 140, k: 70, observaciones: 'Alta dosis de fósforo por baja disponibilidad en suelos andinos (fijación por alófanas).' },
          { etapa: 'Tuberización (45 días)', n: 70, p: 40, k: 100, observaciones: 'Aplicar Sulfato de Potasio (K2SO4) en lugar de Cloruro para no afectar materia seca.' },
          { etapa: 'Engorde de tubérculos', n: 30, p: 10, k: 90, observaciones: 'Aporte de Calcio y Magnesio soluble para firmeza de cáscara.' }
        ],
        irrigationPlan: 'Riego por aspersión con láminas de 25-30 mm semanales según etapa fenológica.',
        plagueControl: [
          { name: 'Phytophthora infestans', scientificName: 'Phytophthora infestans', type: 'HONGO', symptoms: 'Necrosis foliar rápida y pudrición parda en tubérculos.', treatment: 'Rotación preventiva de Mancozeb, Clorotalonil y sistémicos como Dimethomorph.', biologicalControl: 'Extractos de cola de caballo (Equisetum arvense) y Bacillus amyloliquefaciens.', emoji: '🍄' },
          { name: 'Polilla de la papa', scientificName: 'Phthorimaea operculella', type: 'INSECTO', symptoms: 'Galerías transparentes en hojas y larvas minadoras en tubérculos.', treatment: 'Trampas con feromonas sexuales e insecticidas biorracionales.', biologicalControl: 'Virus de la granulosis de la papa.', emoji: '🦋' }
        ],
        harvestIndicators: 'Senescencia foliar del 80% o corte mecánico del follaje (chamusco) 12 días antes de la cosecha para inducir suberización.',
        postHarvest: 'Clasificación por calibres (Primera, Segunda, Tercera). Lavado solo si es mercado fresco inmediato.',
        glossary: [
          { term: 'Suberización', definition: 'Engrosamiento de la piel del tubérculo mediante formación de suberina protectora.' },
          { term: 'Materia seca', definition: 'Porcentaje de peso seco respecto al total, clave para papas fritas y procesamiento industrial.' }
        ],
        references: ['CIP - Compendio de enfermedades y plagas de la papa', 'FAO - Guía técnica para sistemas de semillas de papa']
      },
      AVANZADO: {
        title: 'Manual Avanzado de Agrotecnología y Nutrición en Papa',
        subtitle: 'Fertirriego intensivo, bioestimulación y poscosecha industrial',
        introduction: 'Tratado agronómico para especialistas: fertirriego proporcional, balances catiónico/aniónico, biotecnología de microtubérculos y prevención de defectos fisiológicos.',
        climateRequirements: {
          tempOptima: 'Días soleados con 20°C y noches frías con 10°C; Cero heladas en ciclo',
          precipitacion: 'Evapotranspiración total del cultivo: 550 - 700 mm',
          fotoperiodo: 'Inducción de tuberización por señal hormonal mediada por fitocromos',
          altitud: 'Zonas óptimas de páramo bajo y valles interandinos altos'
        },
        soilRequirements: {
          ph: '5.6 - 6.0 libre de carbonato de calcio activo',
          textura: 'Suelos volcánicos Andosoles ricos en humus',
          materiaOrganica: '> 6% con alta capacidad de retención de humedad',
          drenaje: 'Conductividad hidráulica saturada Ksat > 15 cm/h'
        },
        plantingSteps: [
          { step: 1, title: 'Termoterapia y desinfección termoquímica', description: 'Tratamiento de tubérculos a 45°C contra patógenos latentes y virosis.', emoji: '🌡️' },
          { step: 2, title: 'Camas de cultivo con acolchado biodegradable', description: 'Conservación de humedad y prevención total de tubérculos expuestos a luz.', emoji: '🌱' },
          { step: 3, title: 'Instalación de doble cinta de fertirriego', description: 'Emisores autocompensantes a 20 cm para distribución milimétrica de nutrientes.', emoji: '💧' },
          { step: 4, title: 'Bioestimulación con extractos de algas y aminoácidos', description: 'Aplicaciones foliares para mitigar estrés térmico y potenciar tuberización uniforme.', emoji: '🔬' }
        ],
        fertilizationNPK: [
          { etapa: 'Enraizamiento inicial', n: 50, p: 160, k: 60, observaciones: 'Formulaciones polifosfatadas para máxima biodisponibilidad en suelo ácido.' },
          { etapa: 'Tuberización e inicio de floración', n: 90, p: 60, k: 140, observaciones: 'Relación N:K de 1:1.5. Aporte de Nitrato de Calcio soluble.' },
          { etapa: 'Llenado y maduración', n: 30, p: 20, k: 180, observaciones: 'Relación N:K de 1:2.5. Clave para densidad de almidón > 1.08 g/cm³.' }
        ],
        irrigationPlan: 'Programación diaria basada en sonda capacitiva de capacitancia FDR multicanal a 10, 20 y 40 cm de profundidad.',
        plagueControl: [
          { name: 'Sarna común', scientificName: 'Streptomyces scabies', type: 'BACTERIA', symptoms: 'Lesiones corchosas rugosas en la epidermis del tubérculo que deprecian su valor comercial.', treatment: 'Acidificación controlada de la zona radicular con azufre y riego uniforme en iniciación de tubérculos.', biologicalControl: 'Inoculación de cepas antagónicas de Pseudomonas fluorescens.', emoji: '🦠' },
          { name: 'Virus del enrollamiento (PLRV)', scientificName: 'Potato Leafroll Virus', type: 'VIRUS', symptoms: 'Hojas enrolladas hacia arriba, quebradizas y coriáceas; tubérculos con necrosis reticular.', treatment: 'Control exhaustivo de áfidos vectores (Myzus persicae) y semilla prebásica indexada.', biologicalControl: 'Conservación de crisopas y mariquitas (Coccinellidae).', emoji: '🐞' }
        ],
        harvestIndicators: 'Densidad específica de pulpa > 1.085 mediante balanza hidrostática y azúcares reductores < 0.2% en glucosa.',
        postHarvest: 'Cámara de curado con 95% de humedad relativa a 15°C durante 10 días, luego reducción gradual a 8°C para papa consumo o 4°C para semilla.',
        glossary: [
          { term: 'Azúcares reductores', definition: 'Glucosa y fructosa que al freírse a altas temperaturas reaccionan con aminoácidos produciendo oscurecimiento indeseado (reacción de Maillard).' },
          { term: 'Indexación viral', definition: 'Pruebas moleculares (ELISA o PCR) para certificar que la semilla esté libre de virus.' }
        ],
        references: ['CIP - Compendio de fisiología y agronomía de la papa', 'Wageningen University - Potato Nutrition & Quality']
      }
    }
  },
  {
    id: 'crop-platano',
    slug: 'banano',
    name: 'Plátano / Banano',
    scientificName: 'Musa × paradisiaca',
    family: 'Musaceae',
    emoji: '🍌',
    category: 'FRUTAL',
    categoryLabel: 'Frutal',
    shortDescription: 'Megahierba perenne de climas tropicales con alta demanda hídrica, potásica y protección contra Sigatoka.',
    durationDays: 300,
    difficulty: 'Media',
    commonDiseasesCount: 4,
    manuals: {
      PRINCIPIANTE: {
        title: 'Manual Sencillo de Plátano y Banano',
        subtitle: 'Establecimiento de colinos, deshije, deshoje y cosecha del racimo',
        introduction: 'El plátano y el banano pertenecen a la familia de las musáceas. No son árboles, sino hierbas gigantescas con un pseudotallo formado por capas concéntricas de hojas.',
        climateRequirements: {
          tempOptima: '24°C - 30°C',
          precipitacion: '1,800 - 2,500 mm anuales bien repartidos',
          fotoperiodo: 'Alta luminosidad sin sombra densa',
          altitud: '0 a 1,200 msnm para óptimo rendimiento'
        },
        soilRequirements: {
          ph: '5.8 a 6.8',
          textura: 'Franco-arcillosa a franco-limosa aluvial',
          materiaOrganica: '3% a 5%',
          drenaje: 'Muy profundo; raíces sensibles a freática alta'
        },
        plantingSteps: [
          { step: 1, title: 'Selección del colino (hijo)', description: 'Elegir colinos de espada vigorosos de 1.5 a 2 kg libres de perforaciones.', emoji: '🌱' },
          { step: 2, title: 'Limpieza y pelado de cormo', description: 'Pelar el cormo retirando raíces viejas y partes necrosadas con machete desinfectado.', emoji: '🔪' },
          { step: 3, title: 'Apertura de hoyos', description: 'Hoyos de 40x40x40 cm con distancia de 2.5x2.5 m (1,600 plantas/ha).', emoji: '🕳️' },
          { step: 4, title: 'Siembra y compactado', description: 'Colocar abono orgánico en el fondo, ubicar el colino y compactar la tierra lateral firmemente.', emoji: '🌿' }
        ],
        fertilizationNPK: [
          { etapa: 'Siembra y enraizamiento (Mes 1)', n: 30, p: 40, k: 30, observaciones: 'Abono orgánico más fósforo en el fondo del hoyo.' },
          { etapa: 'Desarrollo vegetativo (Meses 3-6)', n: 80, p: 20, k: 100, observaciones: 'Aplicar en media luna alrededor de la planta a 40 cm del pseudotallo.' },
          { etapa: 'Diferenciación floral y racimo (Mes 7+)', n: 40, p: 10, k: 160, observaciones: 'El potasio da peso, longitud y grados Brix a los dedos del racimo.' }
        ],
        irrigationPlan: 'Riego frecuente de 35 a 45 mm semanales durante la temporada seca.',
        plagueControl: [
          { name: 'Sigatoka negra', scientificName: 'Pseudocercospora fijiensis', type: 'HONGO', symptoms: 'Rayas de color marrón rojizo que coalescen y queman las hojas secándolas prematuramente.', treatment: 'Deshoje fitosanitario semanal y fungicidas protectores a base de mancozeb.', biologicalControl: 'Biofungicidas a base de Melaleuca alternifolia (árbol de té).', emoji: '🍄' },
          { name: 'Picudo negro', scientificName: 'Cosmopolites sordidus', type: 'INSECTO', symptoms: 'Túneles en el cormo que debilitan la planta y provocan su volcamiento.', treatment: 'Trampas de pseudotallo tipo sándwich con atrayentes.', biologicalControl: 'Hongos Beauveria bassiana aplicados en las trampas.', emoji: '🐛' }
        ],
        harvestIndicators: 'Dedos redondeados con 3/4 de grosor comercial. La flor terminal se desprende con facilidad.',
        postHarvest: 'Desmane del racimo, lavado en agua limpia para retirar látex (leche) y empaque en cartón ventilado.',
        glossary: [
          { term: 'Colino de espada', definition: 'Brote lateral con hojas estrechas puntiagudas, ideal para siembra por su reserva energética.' },
          { term: 'Desmane', definition: 'Corte de las manos del racimo para su empaque y comercialización.' }
        ],
        references: ['INIAP - Guía de buenas prácticas agrícolas en plátano', 'Corbana - Manual de cultivo de banano']
      },
      INTERMEDIO: {
        title: 'Manual Técnico de Manejo de Musáceas',
        subtitle: 'Poblaciones, desflore, enfundado y control integrado de Sigatoka',
        introduction: 'Buenas prácticas agrícolas comerciales: densidad de siembra (arreglo hexagonal o tresbolillo), enfundado prematuro, apuntalamiento para evitar caídas y programas de nutrición por racimo.',
        climateRequirements: {
          tempOptima: '26°C - 30°C constante con baja variación nocturna',
          precipitacion: '2,000 - 3,000 mm anuales',
          fotoperiodo: 'Alta radiación fotosintética',
          altitud: '0 a 800 msnm'
        },
        soilRequirements: {
          ph: '6.0 a 6.5, C.I.C. > 25 meq/100g',
          textura: 'Franco-arcillo-arenosa aluvial profunda (> 1.2 m sin freática)',
          materiaOrganica: '4% a 6%',
          drenaje: 'Red de canales primarios, secundarios y terciarios mantenidos permanentemente'
        },
        plantingSteps: [
          { step: 1, title: 'Inmersión nematicida biológica', description: 'Tratamiento de colinos con Paecilomyces lilacinus contra nematodos.', emoji: '🧪' },
          { step: 2, title: 'Trazado topográfico en tresbolillo', description: 'Optimización de intercepción lumínica a 2.3 x 2.3 m.', emoji: '📐' },
          { step: 3, title: 'Deshije selectivo programado', description: 'Mantener la unidad productiva madre-hijo-nieto.', emoji: '✂️' },
          { step: 4, title: 'Enfundado temprano con plástico microperforado', description: 'Protección contra trips, polvo y sol para piel limpia sin manchas.', emoji: '🛍️' }
        ],
        fertilizationNPK: [
          { etapa: 'Vegetativo temprano', n: 70, p: 40, k: 80, observaciones: 'Aporte de Magnesio para síntesis de clorofila y área foliar activa.' },
          { etapa: 'Emisión foliar máxima', n: 110, p: 30, k: 180, observaciones: 'Distribución en corona a 60 cm del pseudotallo.' },
          { etapa: 'Llenado del racimo', n: 50, p: 10, k: 250, observaciones: 'Dosis alta de Nitrato de Potasio para calibre homogéneo.' }
        ],
        irrigationPlan: 'Microaspersión subfoliar programada con Kc 1.1 - 1.2.',
        plagueControl: [
          { name: 'Pseudocercospora fijiensis', scientificName: 'Pseudocercospora fijiensis', type: 'HONGO', symptoms: 'Manchas elípticas oscuras en hoja que reducen el índice de área foliar antes de cosecha.', treatment: 'Rotación estricta de fungicidas triazoles y estrobirulinas en emulsión con aceite agrícola.', biologicalControl: 'Manejo riguroso del drenaje y deshoje temprano de puntas.', emoji: '🍄' },
          { name: 'Nematodo barrenador', scientificName: 'Radopholus similis', type: 'ACARO', symptoms: 'Lesiones rojizo-negras en raíces que causan volcamiento de plantas paridas.', treatment: 'Biofumigación y nematicidas específicos autorizados.', biologicalControl: 'Inoculación de Pochonia chlamydosporia.', emoji: '🪱' }
        ],
        harvestIndicators: 'Calibración con cinta métrica de dedos centrales de la segunda mano (calibre 39 a 44 grados).',
        postHarvest: 'Tina de desleche con sulfato de aluminio al 1% y tratamiento fungicida cicatrizante de corona con ácido cítrico.',
        glossary: [
          { term: 'Desflore', definition: 'Retiro manual de los restos florales en la punta del dedo para evitar pudriciones fúngicas.' },
          { term: 'Calibre', definition: 'Diámetro del dedo medido en treintaidosavos de pulgada.' }
        ],
        references: ['CIRAD - Biología y control de plagas en banano y plátano', 'Augura - Manual de Buenas Prácticas Agrícolas']
      },
      AVANZADO: {
        title: 'Manual Avanzado de Musáceas de Exportación',
        subtitle: 'Fisiología del racimo, biosólidos, bioseguridad contra Foc R4T',
        introduction: 'Protocolo de bioseguridad internacional frente a Fusarium oxysporum f. sp. cubense Raza 4 Tropical (Foc R4T), manejo ecofisiológico de huertos de alta densidad y embalaje de exportación.',
        climateRequirements: {
          tempOptima: 'Días 28°C y noches 22°C; Déficit de presión de vapor (VPD) entre 0.8 y 1.4 kPa',
          precipitacion: '2,500 mm anuales suplementados con fertirriego',
          fotoperiodo: 'Radiación solar global > 18 MJ/m²/día',
          altitud: 'Valles costeros tropicales'
        },
        soilRequirements: {
          ph: '6.2 - 6.8, relación Ca/Mg de 3:1 y Mg/K de 2:1',
          textura: 'Suelos aluviales jóvenes clase I',
          materiaOrganica: '> 4.5% con alta actividad biológica supresora de patógenos',
          drenaje: 'Nivel freático controlado permanentemente a > 1.4 m'
        },
        plantingSteps: [
          { step: 1, title: 'Plantas meristemáticas in vitro certificadas', description: 'Sanidad absoluta libre de virus del mosaico del banano (BSV) y Foc R4T.', emoji: '🧫' },
          { step: 2, title: 'Siembra en doble hilera pareada', description: 'Densidades intensivas de hasta 2,200 plantas/ha.', emoji: '📐' },
          { step: 3, title: 'Bioestimulación radicular con bacterias PGPR', description: 'Colonización de rizosfera con Pseudomonas putida y Bacillus subtilis.', emoji: '🦠' },
          { step: 4, title: 'Monitoreo de bioseguridad en portón de entrada', description: 'Rodiluvios, pediluvios con amonio cuaternario y control estricto de visitas.', emoji: '🛡️' }
        ],
        fertilizationNPK: [
          { etapa: 'Vegetativo acelerado', n: 120, p: 40, k: 180, observaciones: 'Aporte de Silicio foliar para reforzar paredes celulares contra ataques fúngicos.' },
          { etapa: 'Emisión de bacota', n: 80, p: 20, k: 280, observaciones: 'Boro y Zinc quelatado para fecundación y número de manos.' },
          { etapa: 'Desarrollo de dedos', n: 40, p: 10, k: 320, observaciones: 'Aplicación semanal de fertilizantes solubles por pulsos de fertirriego.' }
        ],
        irrigationPlan: 'Riego por aspersión computarizado automatizado por estaciones meteorológicas telemétricas.',
        plagueControl: [
          { name: 'Fusarium Raza 4 Tropical (Alerta Máxima)', scientificName: 'Fusarium oxysporum f. sp. cubense R4T', type: 'HONGO', symptoms: 'Amarillamiento de hojas viejas que colapsan en falda alrededor del pseudotallo, estrías vasculares castañas rojizas en el cormo.', treatment: 'NO TIENE CURA QUÍMICA. Cuarentena absoluta, destrucción de plantas infectadas y desinfección total.', biologicalControl: 'Manejo de suelos supresores y selección de clones resistentes somaclonales.', emoji: '☣️' },
          { name: 'Moko de la platanera', scientificName: 'Ralstonia solanacearum Raza 2', type: 'BACTERIA', symptoms: 'Marchitamiento foliar rápido, amarillamiento interno y pudrición vascular bacteriana con exudado fétido.', treatment: 'Erradicación con glifosato y cal viva.', biologicalControl: 'Desinfección obligatoria de herramientas de deshoje con amonio al 5%.', emoji: '🦠' }
        ],
        harvestIndicators: 'Edad cronológica del racimo (semanas desde floración marcadas con cintas de colores: 10 a 12 semanas) y calibración.',
        postHarvest: 'Trazabilidad global GAP, pesaje automático, sellado térmico y enfriamiento rápido en túnel a 13.5°C.',
        glossary: [
          { term: 'Foc R4T', definition: 'Hongo de suelo devastador que amenaza la producción mundial de plátano y banano.' },
          { term: 'Suelo supresor', definition: 'Suelo con alta biodiversidad microbiana que impide naturalmente el desarrollo de patógenos del suelo.' }
        ],
        references: ['FAO - Plan de acción global contra el Marchitamiento por Fusarium R4T', 'Promusa - Musa Knowledge Platform']
      }
    }
  },
  {
    id: 'crop-tomate',
    slug: 'tomate',
    name: 'Tomate',
    scientificName: 'Solanum lycopersicum',
    family: 'Solanaceae',
    emoji: '🍅',
    category: 'HORTALIZA',
    categoryLabel: 'Hortaliza',
    shortDescription: 'Hortaliza de fruto de alto valor comercial, demandante de tutorado, poda constante y protección fitosanitaria.',
    durationDays: 110,
    difficulty: 'Exigente',
    commonDiseasesCount: 5,
    manuals: {
      PRINCIPIANTE: {
        title: 'Manual Básico de Cultivo de Tomate',
        subtitle: 'Siembra en semillero, trasplante, tutorado y cuidados de huerto',
        introduction: 'El tomate es una de las hortalizas más populares. Requiere mucha luz solar, tutores para no tocar el suelo húmedo y podas sencillas de chupones para obtener frutos grandes.',
        climateRequirements: {
          tempOptima: '20°C - 26°C día / 15°C - 18°C noche',
          precipitacion: '600 - 800 mm (preferible riego por goteo)',
          fotoperiodo: 'Sol directo mínimo 8 horas diarias',
          altitud: '500 a 2,200 msnm'
        },
        soilRequirements: {
          ph: '6.0 - 6.8',
          textura: 'Franco a franco-arenoso, rico en humus',
          materiaOrganica: '3% a 5%',
          drenaje: 'Excelente; encharcamiento pudre la raíz rápidamente'
        },
        plantingSteps: [
          { step: 1, title: 'Almácigo o semillero', description: 'Sembrar semillas a 1 cm en bandejas con sustrato húmedo. Germinan en 5 a 8 días.', emoji: '🌱' },
          { step: 2, title: 'Trasplante definitivo', description: 'A los 25-30 días (con 4 hojas verdaderas), trasplantar en suelo fértil a 40 cm entre plantas.', emoji: '🪴' },
          { step: 3, title: 'Tutorado con cañas o hilo', description: 'Colocar estacas o hilos para guiar el tallo hacia arriba a medida que crece.', emoji: '🎋' },
          { step: 4, title: 'Desbrote o poda de chupones', description: 'Retirar con los dedos los brotes axilares que salen entre el tallo y las hojas.', emoji: '✂️' }
        ],
        fertilizationNPK: [
          { etapa: 'Trasplante', n: 30, p: 60, k: 30, observaciones: 'Fósforo para inducir abundante raíz nueva.' },
          { etapa: 'Crecimiento y primera flor', n: 60, p: 30, k: 70, observaciones: 'Incorporar calcio soluble para evitar que la base del tomate se ponga negra.' },
          { etapa: 'Fructificación y maduración', n: 50, p: 20, k: 120, observaciones: 'El potasio favorece el color rojo uniforme y el dulzor.' }
        ],
        irrigationPlan: 'Regar la base sin mojar las hojas para evitar enfermedades. Riego regular cada 2 o 3 días según temperatura.',
        plagueControl: [
          { name: 'Mosca blanca', scientificName: 'Bemisia tabaci', type: 'INSECTO', symptoms: 'Insectos pequeños blancos volando en el envés de la hoja y melaza pegajosa.', treatment: 'Jabón potásico y trampas cromáticas amarillas.', biologicalControl: 'Encarsia formosa parasitoide.', emoji: '🪰' },
          { name: 'Tizón temprano', scientificName: 'Alternaria solani', type: 'HONGO', symptoms: 'Manchas concéntricas en forma de diana en hojas inferiores.', treatment: 'Fungicida a base de cobre preventivo.', biologicalControl: 'Retirar hojas viejas de la base para ventilar la planta.', emoji: '🍄' }
        ],
        harvestIndicators: 'Frutos con cambio de color verde a rosado o rojo firme. Cosechar con el cáliz verde intacto.',
        postHarvest: 'No refrigerar tomates inmaduros para no alterar su aroma. Conservar a 12-15°C en lugar ventilado.',
        glossary: [
          { term: 'Chupón', definition: 'Brote que nace en la unión de la hoja con el tallo principal que resta energía al fruto.' },
          { term: 'Pudrición apical', definition: 'Mancha negra en la base del tomate provocada por falta de calcio o riegos irregulares.' }
        ],
        references: ['FAO - Producción de tomate bajo buenas prácticas', 'INTA - Manual práctico de cultivo de tomate']
      },
      INTERMEDIO: {
        title: 'Manual Técnico de Tomate Comercial',
        subtitle: 'Manejo en invernadero y campo abierto, fertirriego y podas',
        introduction: 'Control agronómico en variedades indeterminadas: podas de formación a 1 o 2 tallos, despunte terminal, balance hídrico y manejo de trips y polilla del tomate (Tuta absoluta).',
        climateRequirements: {
          tempOptima: '22°C - 28°C día / 16°C noche; HR 60-70%',
          precipitacion: 'Demanda de 4 a 6 litros de agua por planta al día en plena producción',
          fotoperiodo: 'Alta radiación solar',
          altitud: '800 a 2,000 msnm'
        },
        soilRequirements: {
          ph: '6.2 - 6.6, C.I.C. > 20 meq/100g, C.E. < 2.0 dS/m',
          textura: 'Franco-arenosa profunda y porosa',
          materiaOrganica: '3.5% a 5%',
          drenaje: 'Tubos de drenaje o camas elevadas de 30 cm'
        },
        plantingSteps: [
          { step: 1, title: 'Injerto en portainjerto tolerante', description: 'Uso de patrones resistentes a Ralstonia y Fusarium.', emoji: '🧬' },
          { step: 2, title: 'Acolchado plástico bitono (negro/plata)', description: 'Control de malezas, ahorro de agua y repelencia a áfidos.', emoji: '🌾' },
          { step: 3, title: 'Tutorado holandés con carretes y clips', description: 'Sistema de descenso de tallos para fácil recolección.', emoji: '⚙️' },
          { step: 4, title: 'Deshoje basal sanitario continuo', description: 'Eliminación sistemática de hojas bajo el racimo cosechado.', emoji: '✂️' }
        ],
        fertilizationNPK: [
          { etapa: 'Enraizamiento y desarrollo', n: 80, p: 70, k: 80, observaciones: 'Relación balanceada 1:1 de N y K.' },
          { etapa: 'Floración 1° a 3° racimo', n: 120, p: 40, k: 180, observaciones: 'Aporte obligatorio de Calcio (Nitrato de Calcio) y Magnesio.' },
          { etapa: 'Fructificación continua', n: 140, p: 30, k: 280, observaciones: 'Relación N:K 1:2.0 para densidad y firmeza de pulpa.' }
        ],
        irrigationPlan: 'Riego por goteo con pulsos cortos de 10 a 15 minutos 3 a 5 veces al día según radiación acumulada.',
        plagueControl: [
          { name: 'Polilla del tomate', scientificName: 'Tuta absoluta', type: 'INSECTO', symptoms: 'Galerías amplias e irregulares en hojas y orificios en cáliz de frutos.', treatment: 'Spinosad o Emamectina en rotación IRAC.', biologicalControl: 'Chinches depredadoras Nesidiocoris tenuis y trampas de agua con feromona.', emoji: '🐛' },
          { name: 'Oídio del tomate', scientificName: 'Leveillula taurica', type: 'HONGO', symptoms: 'Polvo blanco amarillento en el envés de hojas con manchas cloróticas por el haz.', treatment: 'Azufre micronizado en horas frescas o Bupirimato.', biologicalControl: 'Ampelomyces quisqualis.', emoji: '🍄' }
        ],
        harvestIndicators: 'Cosecha en estado "pintón" (color naranja-rojizo 50%) para distancias largas o rojo firme para mercado local.',
        postHarvest: 'Cámaras a 12°C con 90% HR. Selección y descarte de frutos con microgrietas o cicatrices apicales.',
        glossary: [
          { term: 'Despunte', definition: 'Corte de la yema apical de la planta 40 días antes de finalizar el ciclo para engordar los últimos racimos.' },
          { term: 'Nesidiocoris tenuis', definition: 'Chinche míride depredador voraz de huevos de Tuta absoluta y mosca blanca.' }
        ],
        references: ['Almería Agrícola - Manual de cultivo intensivo de tomate', 'FAO - Manejo Integrado de Plagas en Tomate']
      },
      AVANZADO: {
        title: 'Manual Avanzado de Nutrición y Clima en Tomate',
        subtitle: 'Cultivo hidropónico, control climático automatizado y fenología digital',
        introduction: 'Manual de alta tecnología: soluciones nutritivas Steiner en sustrato de fibra de coco/lana de roca, curvas de transpiración, control de conductividad eléctrica (CE) y pH en drenaje.',
        climateRequirements: {
          tempOptima: 'Día: 23-25°C / Noche: 17°C / Promedio 24h: 19.5°C; Déficit hídrico de vapor 0.8 kPa',
          precipitacion: 'Transpiración de 1.8 a 2.5 litros/m² por cada 1,000 J/cm² de radiación',
          fotoperiodo: 'Enriquecimiento carbónico con CO2 a 700-900 ppm en invernadero cerrado',
          altitud: 'Invernaderos de alta tecnología en valles templados'
        },
        soilRequirements: {
          ph: 'Solución nutritiva: pH 5.6 - 5.9 constante',
          textura: 'Sustrato inerte (fibra de coco lavada con CE < 0.5 dS/m)',
          materiaOrganica: 'N/A en hidroponía',
          drenaje: 'Porcentaje de drenaje del 25% al 35% medido diariamente'
        },
        plantingSteps: [
          { step: 1, title: 'Transplante a slabs de fibra de coco', description: 'Hidratación previa con solución de enraizamiento al 100% de capacidad.', emoji: '🥥' },
          { step: 2, title: 'Poda de racimo a 5 frutos uniformes', description: 'Raleo de flores secundarias para calibre uniforme tamaño primera.', emoji: '🍅' },
          { step: 3, title: 'Inyección de CO2 e intercambio gaseoso', description: 'Monitoreo de fotosíntesis neta y apertura estomática.', emoji: '💨' },
          { step: 4, title: 'Polinización asistida por abejorros Bombus terrestris', description: 'Colmenas automáticas con apertura programada por fotoperiodo.', emoji: '🐝' }
        ],
        fertilizationNPK: [
          { etapa: 'Fase vegetativa inicial', n: 160, p: 45, k: 220, observaciones: 'Solución en meq/l: NO3- 12, H2PO4- 1.5, K+ 6, Ca2+ 4.5, Mg2+ 2.' },
          { etapa: 'Fructificación plena', n: 180, p: 50, k: 340, observaciones: 'Solución en meq/l: NO3- 14, H2PO4- 1.5, K+ 9, Ca2+ 5.0, Mg2+ 2.5.' },
          { etapa: 'Pico de producción', n: 170, p: 40, k: 380, observaciones: 'CE de entrada 2.6 dS/m, CE de drenaje 3.2 dS/m.' }
        ],
        irrigationPlan: 'Riego comandado por sensor de radiación solar (pyranómetro) activando 100 ml por planta cada 100 Joules acumulados.',
        plagueControl: [
          { name: 'Virus rugoso del tomate (ToBRFV)', scientificName: 'Tomato Brown Rugose Fruit Virus', type: 'VIRUS', symptoms: 'Manchas rugosas pardas en frutos y mosaicos deformantes en hojas. Se transmite mecánicamente.', treatment: 'Desinfección extrema de manos, guantes y tijeras con fosfato trisódico. Cero curación química.', biologicalControl: 'Selección de variedades comerciales con resistencia genética ToBRFV.', emoji: '⚠️' },
          { name: 'Fusariosis vascular', scientificName: 'Fusarium oxysporum f. sp. lycopersici Raza 3', type: 'HONGO', symptoms: 'Clorosis unilateral en hojas y pardeamiento de haces vasculares.', treatment: 'Uso de patrones resistentes (Maxifort, Kaiser).', biologicalControl: 'Trichoderma asperellum aplicado en solución continua.', emoji: '🍄' }
        ],
        harvestIndicators: 'Índice de refracción Brix > 5.5° y firmeza penetrométrica de 6.5 kg/cm².',
        postHarvest: 'Línea automatizada de calibrado óptico por peso, color y defectos superficiales con empaque en atmósfera modificada.',
        glossary: [
          { term: 'Slab', definition: 'Saco alargado relleno de sustrato agrícola prensado donde se plantan los tomates.' },
          { term: 'ToBRFV', definition: 'Tobamovirus emergente altamente contagioso que afecta severamente la rentabilidad del tomate.' }
        ],
        references: ['Wageningen UR - Greenhouse Horticulture Tomato Protocols', 'Steiner - The Universal Nutrient Solution']
      }
    }
  },
  {
    id: 'crop-yuca',
    slug: 'yuca',
    name: 'Yuca',
    scientificName: 'Manihot esculenta',
    family: 'Euphorbiaceae',
    emoji: '🍠',
    category: 'RAIZ',
    categoryLabel: 'Raíz',
    shortDescription: 'Raíz tuberosa rústica y resistente a sequías, base alimentaria tropical con alta concentración de almidón.',
    durationDays: 270,
    difficulty: 'Fácil',
    commonDiseasesCount: 3,
    manuals: {
      PRINCIPIANTE: {
        title: 'Manual Sencillo de Cultivo de Yuca',
        subtitle: 'Siembra por estacas, cuidados mínimos y cosecha',
        introduction: 'La yuca (Manihot esculenta) es un cultivo extraordinariamente noble y resistente a la sequía. Produce abundantes raíces carnosas llenas de energía con poco requerimiento de insumos.',
        climateRequirements: {
          tempOptima: '25°C - 30°C',
          precipitacion: '800 - 1,500 mm anuales (tolera periodos secos prolongados)',
          fotoperiodo: 'Luz solar abierta',
          altitud: '0 a 1,200 msnm'
        },
        soilRequirements: {
          ph: '5.0 - 6.5 (soporta acidez moderada)',
          textura: 'Franco-arenosa suelta para que la raíz crezca recta',
          materiaOrganica: '1.5% a 3%',
          drenaje: 'Fundamental; el encharcamiento pudre las raíces'
        },
        plantingSteps: [
          { step: 1, title: 'Corte de estacas (cangres)', description: 'Cortar estacas de 20 cm de tallos maduros sanos con 5 a 7 nudos o yemas.', emoji: '🪵' },
          { step: 2, title: 'Preparación de camas o caballones', description: 'Formar caballones de 30 cm de altura para facilitar la cosecha posterior.', emoji: '🌱' },
          { step: 3, title: 'Colocación de la estaca', description: 'Enterrar la estaca inclinada (45°) o vertical a 10 cm con las yemas apuntando hacia arriba.', emoji: '🟤' },
          { step: 4, title: 'Limpieza de malezas temprana', description: 'Mantener el lote libre de malezas durante los primeros 90 días hasta que la planta cierre sombra.', emoji: '🌿' }
        ],
        fertilizationNPK: [
          { etapa: 'Siembra', n: 20, p: 40, k: 30, observaciones: 'Abono orgánico o fósforo para arraigamiento.' },
          { etapa: 'Desarrollo (60 días)', n: 40, p: 20, k: 50, observaciones: 'Nitrógeno para follaje inicial.' },
          { etapa: 'Engorde de raíces (120 días)', n: 20, p: 10, k: 80, observaciones: 'El potasio multiplica el grosor de las raíces tuberosas.' }
        ],
        irrigationPlan: 'Riego durante los primeros 2 meses. Después es altamente autosuficiente gracias a su sistema radicular profundo.',
        plagueControl: [
          { name: 'Ácaro verde de la yuca', scientificName: 'Mononychellus tanajoa', type: 'ACARO', symptoms: 'Puntos cloróticos en hojas tiernas y deformación del cogollo.', treatment: 'Riegos por aspersión o aplicaciones de azufre elemental.', biologicalControl: 'Ácaros benéficos fitoseidos.', emoji: '🕷️' },
          { name: 'Pudrición radical', scientificName: 'Phytophthora drechsleri', type: 'HONGO', symptoms: 'Marchitez foliar y raíces blandas con olor fétido bajo tierra.', treatment: 'Siembra en caballones altos y rotación de cultivo.', biologicalControl: 'Trichoderma harzianum en la base de la planta.', emoji: '🍄' }
        ],
        harvestIndicators: 'El suelo se agrieta alrededor del tallo. Las hojas inferiores caen y la planta tiene entre 8 y 10 meses.',
        postHarvest: 'Consumir o procesar en menos de 48-72 horas, o parafinar las raíces para conservar hasta 3 semanas.',
        glossary: [
          { term: 'Cangre', definition: 'Trozo de tallo leñoso utilizado como semilla vegetativa para sembrar yuca.' },
          { term: 'Caballón', definition: 'Lomo o camellón elevado de tierra donde se entierra la estaca.' }
        ],
        references: ['CIAT - Manual de producción de yuca', 'INIAP - Buenas prácticas agrícolas en yuca']
      },
      INTERMEDIO: {
        title: 'Manual Técnico de Yuca para Almidón y Consumo',
        subtitle: 'Densidades, curvas de acumulación de materia seca y mecanización',
        introduction: 'Manejo comercial para mercados industriales: control de mosaico de la yuca, cosecha semimecanizada, calibración de estacas con cortes rectos vs biselados y nutrición potásica.',
        climateRequirements: {
          tempOptima: '26°C - 32°C',
          precipitacion: '1,000 - 1,800 mm anuales',
          fotoperiodo: 'Heliofanía alta',
          altitud: '0 a 900 msnm'
        },
        soilRequirements: {
          ph: '5.5 - 6.5, C.I.C. > 12 meq/100g',
          textura: 'Franco-arenosa profunda sin horizontes arcillosos compactados',
          materiaOrganica: '2% a 4%',
          drenaje: 'Rápido, pendiente suave del 2% para evacuación de excesos'
        },
        plantingSteps: [
          { step: 1, title: 'Selección clonal de tercio medio', description: 'Corte de vástagos con sierra para evitar rajaduras en la corteza.', emoji: '🪵' },
          { step: 2, title: 'Inmersión desinfectante preventiva', description: 'Tratamiento con fungicida e insecticida curasemillas.', emoji: '🧪' },
          { step: 3, title: 'Siembra mecanizada en surcos dobles', description: 'Distribución a 1.0 m entre hileras y 0.8 m entre plantas (12,500 plantas/ha).', emoji: '🚜' },
          { step: 4, title: 'Control químico pre-emergente de malezas', description: 'Aplicación de mezclas de Diuron + Alaclor en suelo húmedo.', emoji: '🛡️' }
        ],
        fertilizationNPK: [
          { etapa: 'Presiembra / 30 días', n: 40, p: 60, k: 50, observaciones: 'Aplicación en corona lateral.' },
          { etapa: 'Engrosamiento radical (90 días)', n: 50, p: 20, k: 110, observaciones: 'Aporte de Sulfato de Potasio y Magnesio.' },
          { etapa: 'Maduración (150 días)', n: 10, p: 0, k: 80, observaciones: 'Incremento del contenido de almidón en pulpa.' }
        ],
        irrigationPlan: 'Riego estratégico suplementario en periodos de sequía crítica en los primeros 120 días.',
        plagueControl: [
          { name: 'Gusano cachón', scientificName: 'Erinnyis ello', type: 'INSECTO', symptoms: 'Defoliación masiva y voraz de las hojas en pocos días.', treatment: 'Aplicación de Bacillus thuringiensis o Baculovirus erinnyis.', biologicalControl: 'Avispas depredadoras Polistes y Trichogramma.', emoji: '🐛' },
          { name: 'Cuero de sapo', scientificName: 'Phytoplasma / Virus', type: 'VIRUS', symptoms: 'Raíces fibrosas alargadas sin almidón con corteza engrosada y rugosa.', treatment: 'Erradicación total de plantas enfermas y uso exclusivo de semilla limpia.', biologicalControl: 'Termoterapia de vástagos.', emoji: '⚠️' }
        ],
        harvestIndicators: 'Prueba de cocción y gravedad específica con contenido de almidón > 30%.',
        postHarvest: 'Parafinado con cera alimentaria a 65°C para exportación en fresco.',
        glossary: [
          { term: 'Parafinado', definition: 'Baño de cera caliente que impermeabiliza la corteza de la yuca frenando la oxidación fisiológica.' },
          { term: 'Deterioro fisiológico poscosecha', definition: 'Estrías azules o negras que aparecen en la pulpa tras 48 horas de arrancada.' }
        ],
        references: ['CIAT - Mejoramiento y producción sostenible de yuca', 'Embrapa Mandioca e Fruticultura']
      },
      AVANZADO: {
        title: 'Manual Avanzado de Yuca Agroindustrial',
        subtitle: 'Biorrefinería, almidones modificados y fisiología de fotoasimilados',
        introduction: 'Para empresas agroindustriales y procesadoras de almidón nativo y modificado: partición de asimilados fuente-vertedero, índices de cosecha > 0.60 y mecanización integral.',
        climateRequirements: {
          tempOptima: '28°C - 34°C diurna',
          precipitacion: 'Régimen hídrico controlado de 1,200 mm',
          fotoperiodo: 'Alta radiación fotosintética diaria',
          altitud: 'Cuencas tropicales cálidas'
        },
        soilRequirements: {
          ph: '5.8 - 6.4, saturación de aluminio < 10%',
          textura: 'Arenoso a franco-arenoso profundo (> 1.5 m)',
          materiaOrganica: '> 2.5%',
          drenaje: 'Drenaje subterráneo continuo'
        },
        plantingSteps: [
          { step: 1, title: 'Multiplicación rápida por miniyemas', description: 'Sistemas hidropónicos de propagación masiva acelerada.', emoji: '🔬' },
          { step: 2, title: 'Siembra en lomos con GPS RTK', description: 'Alineación de alta precisión para arranque mecanizado con cosechadora continua.', emoji: '🛰️' },
          { step: 3, title: 'Monitoreo de índice de área foliar (LAI)', description: 'Mantenimiento del LAI óptimo entre 3.0 y 3.5.', emoji: '📈' },
          { step: 4, title: 'Biofortificación y fertilización foliar', description: 'Adición de microelementos (Zinc, Manganeso, Boro).', emoji: '🧪' }
        ],
        fertilizationNPK: [
          { etapa: 'Basal / Siembra', n: 30, p: 80, k: 60, observaciones: 'Mezcla química protegida de liberación lenta.' },
          { etapa: 'Diferenciación de raíces tuberosas', n: 60, p: 30, k: 140, observaciones: 'Inyección profunda lateral.' },
          { etapa: 'Síntesis de amilopectina', n: 20, p: 10, k: 120, observaciones: 'Balance K/N alto para desviar fotosintatos hacia raíces.' }
        ],
        irrigationPlan: 'Pivot central o goteo de bajo costo con fertirriego programado.',
        plagueControl: [
          { name: 'Bacteriosis vascular de la yuca', scientificName: 'Xanthomonas axonopodis pv. manihotis', type: 'BACTERIA', symptoms: 'Manchas angulares acuosas en hojas, tizón, exudado gomoso en tallos y muerte regresiva.', treatment: 'Cero control químico efectivo; uso estricto de variedades clonales resistentes.', biologicalControl: 'Rotación con maíz y desinfección con hipoclorito de sodio.', emoji: '🦠' },
          { name: 'Mosca del cogollo', scientificName: 'Silba pendula', type: 'INSECTO', symptoms: 'Muerte de la yema terminal y brotación excesiva de ramas secundarias.', treatment: 'Podas de saneamiento y trampas alimenticias con melaza.', biologicalControl: 'Parasitoides de larvas.', emoji: '🪰' }
        ],
        harvestIndicators: 'Medición refractométrica y descarte de tallos con cosechadora hidráulica de tiro frontal.',
        postHarvest: 'Lavado a presión, rallado inmediato, extracción centrífuga de almidón y secado flash.',
        glossary: [
          { term: 'LAI (Leaf Area Index)', definition: 'Metros cuadrados de follaje por metro cuadrado de superficie de suelo.' },
          { term: 'Amilosa vs Amilopectina', definition: 'Componentes moleculares del almidón determinantes de su viscosidad y uso industrial.' }
        ],
        references: ['CIAT - Industrial Processing and Marketing of Cassava', 'IITA - Cassava Weed Management Project']
      }
    }
  },
  {
    id: 'crop-arroz',
    slug: 'arroz',
    name: 'Arroz',
    scientificName: 'Oryza sativa',
    family: 'Poaceae',
    emoji: '🌾',
    category: 'CEREAL',
    categoryLabel: 'Cereal',
    shortDescription: 'Cereal semiacuático básico para la alimentación global, con altos requerimientos de agua y nitrógeno fraccionado.',
    durationDays: 120,
    difficulty: 'Media',
    commonDiseasesCount: 4,
    manuals: {
      PRINCIPIANTE: {
        title: 'Manual Práctico de Cultivo de Arroz',
        subtitle: 'Siembra en secano o pozas pequeñas, manejo y cosecha',
        introduction: 'El arroz es el alimento básico de más de la mitad del planeta. Puede cultivarse en terrenos planos que retienen humedad (secano favorecido) o con lámina de agua controlada.',
        climateRequirements: {
          tempOptima: '24°C - 32°C',
          precipitacion: '1,200 - 1,800 mm o riego constante',
          fotoperiodo: 'Alta radiación solar en maduración',
          altitud: '0 a 1,000 msnm'
        },
        soilRequirements: {
          ph: '5.5 - 6.5',
          textura: 'Arcillosa o franco-arcillosa para retener agua',
          materiaOrganica: '2% a 3.5%',
          drenaje: 'Lento (impermeable en arroz bajo riego)'
        },
        plantingSteps: [
          { step: 1, title: 'Nivelación del suelo', description: 'Emparejar el lote perfectamente para que el agua se distribuya homogénea.', emoji: '🚜' },
          { step: 2, title: 'Preparación de semilla pregerminada', description: 'Remojar semilla en agua 24 horas y dejar abrigada 24 horas hasta que asome el brote blanco.', emoji: '🌱' },
          { step: 3, title: 'Siembra al voleo o trasplante', description: 'Distribuir la semilla uniforme en suelo batido con una película delgada de agua.', emoji: '🌾' },
          { step: 4, title: 'Control oportuno de malezas', description: 'Deshierbar a los 15 y 30 días para evitar competencia por luz y nitrógeno.', emoji: '🌿' }
        ],
        fertilizationNPK: [
          { etapa: 'Siembra (Fondo)', n: 30, p: 50, k: 30, observaciones: 'Fósforo para enraizamiento rápido.' },
          { etapa: 'Macollamiento (25 días)', n: 50, p: 10, k: 20, observaciones: 'Multiplica el número de tallos con espiga.' },
          { etapa: 'Embuche o punto de algodón (55 días)', n: 40, p: 0, k: 40, observaciones: 'Garantiza espigas largas con granos llenos.' }
        ],
        irrigationPlan: 'Mantener lámina de agua de 3 a 5 cm durante el macollamiento y floración. Secar 10 días antes de cortar.',
        plagueControl: [
          { name: 'Piricularia o quemazón', scientificName: 'Magnaporthe oryzae', type: 'HONGO', symptoms: 'Manchas romboidales en hojas con centros grisáceos y ahorcamiento del cuello de la panícula.', treatment: 'Triciclazol o Azoxistrobina al notar primeras manchas.', biologicalControl: 'Evitar exceso de nitrógeno y sembrar semilla certificada.', emoji: '🍄' },
          { name: 'Sogata', scientificName: 'Tagosodes orizicolus', type: 'INSECTO', symptoms: 'Insecto saltador que chupa savia y transmite el virus de la hoja blanca.', treatment: 'Insecticidas específicos selectivos.', biologicalControl: 'Predadores naturales como arañas y chinches lígidas.', emoji: '🦗' }
        ],
        harvestIndicators: 'El 85% de los granos en la panícula están dorados y firmes. Humedad de grano al 20-22%.',
        postHarvest: 'Secar de inmediato al sol o secadora hasta el 13% de humedad para evitar que el grano se quiebre en el molino.',
        glossary: [
          { term: 'Macollamiento', definition: 'Emisión de tallos secundarios desde la base de la planta de arroz.' },
          { term: 'Pregerminación', definition: 'Proceso de remojo para inducir el brote antes de tirar la semilla al campo.' }
        ],
        references: ['IRRI - Guía básica de producción de arroz', 'INIAP - Manual técnico del cultivo de arroz']
      },
      INTERMEDIO: {
        title: 'Manual Técnico de Arroz de Riego y Fangueo',
        subtitle: 'Manejo hídrico, densidad óptima y control integrado de plagas',
        introduction: 'Técnicas de preparación de suelo mediante fangueo con rotovator, control de malezas gramíneas (Echinochloa colona) y calibración de fertilizantes nitrogenados en 3 o 4 fracciones.',
        climateRequirements: {
          tempOptima: '25°C - 33°C',
          precipitacion: 'Riego por gravedad con pozas niveladas',
          fotoperiodo: 'Radiación solar acumulada > 450 cal/cm²/día',
          altitud: 'Cuencas bajas aluviales'
        },
        soilRequirements: {
          ph: '5.8 - 6.8 con capacidad buffer moderada',
          textura: 'Arcillosa con contenido de arcilla > 40%',
          materiaOrganica: '2.5% a 4%',
          drenaje: 'Retención de lámina con compuertas de descarga rápida'
        },
        plantingSteps: [
          { step: 1, title: 'Fangueo y batido de fango', description: 'Pase de tractor con ruedas de jaula para impermeabilizar el fondo.', emoji: '🚜' },
          { step: 2, title: 'Calibración de sembradora de precisión', description: 'Siembra en surcos en seco o pregerminado a 100 kg/ha.', emoji: '📏' },
          { step: 3, title: 'Manejo de lámina de agua escalonada', description: 'Lámina de 2 cm inicial, subiendo a 7 cm en macollamiento.', emoji: '💧' },
          { step: 4, title: 'Monitoreo de umbrales económicos', description: 'Muestreo semanal de Sogata y chinche de la espiga.', emoji: '🔍' }
        ],
        fertilizationNPK: [
          { etapa: 'Siembra / Emergencia', n: 30, p: 60, k: 40, observaciones: 'Fósforo y Potasio basales.' },
          { etapa: 'Macollamiento activo (20-25 dds)', n: 60, p: 0, k: 20, observaciones: 'Urea incorporada antes de meter agua.' },
          { etapa: 'Diferenciación de primordio (50-55 dds)', n: 50, p: 0, k: 40, observaciones: 'Nitrógeno con suelo húmedo para maximizar espiguillas fértiles.' }
        ],
        irrigationPlan: 'Sistema AWD (Alternate Wetting and Drying) para ahorrar hasta un 30% de agua sin mermar cosecha.',
        plagueControl: [
          { name: 'Complejo de manchado de grano', scientificName: 'Curvularia, Bipolaris, Sarocladium', type: 'HONGO', symptoms: 'Puntos oscuros en la cáscara del grano que degradan el arroz pulido.', treatment: 'Fungicida sistémico en inicio de floración y 10 días después.', biologicalControl: 'Evitar excesos de nitrógeno tardío.', emoji: '🌾' },
          { name: 'Chinche de la espiga', scientificName: 'Oebalus insularis', type: 'INSECTO', symptoms: 'Granos vanos, manchados y yesosos por picaduras en estado lechoso.', treatment: 'Aplicación dirigida al atardecer cuando suben a la espiga.', biologicalControl: 'Beauveria bassiana.', emoji: '🪲' }
        ],
        harvestIndicators: 'Cosechadora combinada calibrada con menos del 2% de pérdida por cola.',
        postHarvest: 'Limpieza previa en zaranda y secado continuo en cascada de flujo mixto.',
        glossary: [
          { term: 'AWD', definition: 'Riego intermitente de humedecimiento y secado controlado que ahorra agua y reduce metano.' },
          { term: 'Primordio floral', definition: 'Fase microscópica donde la planta decide el tamaño de la panícula.' }
        ],
        references: ['IRRI - Standard Evaluation System for Rice', 'Fedearroz - Guía para el monitoreo del arroz']
      },
      AVANZADO: {
        title: 'Manual Avanzado de Agrotecnología Arrocera',
        subtitle: 'Nivelación láser, nutrición de precisión y mitigación de huella de carbono',
        introduction: 'Para ingenieros agrícolas y arroceras industriales: nivelación con rayo láser a pendiente cero, sensores SPAD de clorofila, modelos climáticos de floración y calidad molinera.',
        climateRequirements: {
          tempOptima: 'Días soleados con 30°C y noches frescas sin esterilidad por frío (< 16°C)',
          precipitacion: 'Balance hídrico computarizado',
          fotoperiodo: 'Alta radiación solar en los 30 días posteriores a floración',
          altitud: 'Valles arroceros tecnificados'
        },
        soilRequirements: {
          ph: '6.2 - 6.5, C.I.C. > 25 meq/100g, conductividad eléctrica < 2 dS/m',
          textura: 'Vertisoles o Inceptisoles hidromórficos pesados',
          materiaOrganica: '> 3%',
          drenaje: 'Drenaje controlado por gravedad y estaciones de bombeo de gran caudal'
        },
        plantingSteps: [
          { step: 1, title: 'Nivelación de precisión con rayo láser', description: 'Pendiente cero perfecta que garantiza lámina homogénea de 4 cm en todo el cuadro.', emoji: '🎯' },
          { step: 2, title: 'Siembra en línea con siembra directa', description: 'Reducción de semilla a 75 kg/ha con distribución espacial perfecta.', emoji: '🚜' },
          { step: 3, title: 'Nutrición con inhibidores de ureasa', description: 'Mitigación de volatilización de amoníaco y lixiviación de nitratos.', emoji: '🧪' },
          { step: 4, title: 'Detección satelital de biomasa y nitrógeno', description: 'Imágenes multiespectrales para dosis variable en tercera fertilización.', emoji: '🛰️' }
        ],
        fertilizationNPK: [
          { etapa: 'Basal', n: 40, p: 70, k: 50, observaciones: 'Aporte de Zinc soluble (5 kg/ha) para evitar clorosis en suelos alcalinos.' },
          { etapa: 'Macollamiento (V4)', n: 70, p: 0, k: 30, observaciones: 'Medición con SPAD > 38 para validar suficiencia nitrogenada.' },
          { etapa: 'Iniciación panicular', n: 60, p: 0, k: 50, observaciones: 'Adición de Silicio soluble para engrosar epidermis y resistir Piricularia.' }
        ],
        irrigationPlan: 'Automatización con compuertas telemétricas solares comandadas por sensores de nivel de agua ultrasónicos.',
        plagueControl: [
          { name: 'Rizoctonia del arroz', scientificName: 'Rhizoctonia solani', type: 'HONGO', symptoms: 'Manchas serpentinas verdes grisáceas en la vaina que suben hacia la panícula.', treatment: 'Azoxystrobin + Tebuconazole o Validamicina.', biologicalControl: 'Disminuir densidad de siembra para favorecer ventilación.', emoji: '🍄' },
          { name: 'Barrenador del tallo', scientificName: 'Diatraea saccharalis', type: 'INSECTO', symptoms: 'Corazón muerto en macollamiento y panícula blanca vacía en espigado.', treatment: 'Tratamientos selectivos en picos de vuelo de adultos.', biologicalControl: 'Liberación masiva de Trichogramma pretiosum.', emoji: '🐛' }
        ],
        harvestIndicators: 'Humedad uniforme de 19% medida con higrómetro de campo calibrado y rendimiento de grano entero esperado > 58%.',
        postHarvest: 'Recepción en tolva con aspiración de impurezas, secado lento por etapas para evitar fisuras internas del grano.',
        glossary: [
          { term: 'Rendimiento molinero', definition: 'Porcentaje de grano blanco entero que se obtiene tras descascarar y pulir.' },
          { term: 'Panícula blanca', definition: 'Espiga que emerge completamente vacía y blanca debido al daño de un gusano barrenador en el tallo.' }
        ],
        references: ['CIAT / FLAR - Manual de arroz de alta productividad', 'IRRI - Rice Production Manual']
      }
    }
  },
  {
    id: 'crop-cafe',
    slug: 'cafe',
    name: 'Café',
    scientificName: 'Coffea arabica',
    family: 'Rubiaceae',
    emoji: '☕',
    category: 'INDUSTRIAL',
    categoryLabel: 'Industrial',
    shortDescription: 'Cultivo perenne aromático de media y alta montaña, sensible a la broca y roya del café.',
    durationDays: 240,
    difficulty: 'Exigente',
    commonDiseasesCount: 4,
    manuals: {
      PRINCIPIANTE: {
        title: 'Manual Básico de Caficultura',
        subtitle: 'Vivero, siembra bajo sombra, podas básicas y cosecha de cerezas',
        introduction: 'El café arábica es apreciado mundialmente por su sabor fino y floral. Se cultiva tradicionalmente en laderas andinas y zonas montañosas tropicales bajo sombra parcial.',
        climateRequirements: {
          tempOptima: '18°C - 23°C',
          precipitacion: '1,500 - 2,200 mm anuales',
          fotoperiodo: 'Sombra regulada (30-40% de cobertura)',
          altitud: '1,000 a 2,000 msnm para cafés especiales'
        },
        soilRequirements: {
          ph: '5.0 - 6.0 (ácido)',
          textura: 'Franco a franco-arcilloso volcánico, profundo',
          materiaOrganica: 'Mayor a 4%',
          drenaje: 'Excelente; raíces profundas que buscan aireación'
        },
        plantingSteps: [
          { step: 1, title: 'Vivero en bolsas', description: 'Sembrar semillas en chapolas y luego a bolsas de polietileno por 6 meses.', emoji: '🪴' },
          { step: 2, title: 'Trazado y ahoyado', description: 'Hoyos de 30x30x40 cm con distancia de 1.5 a 2 m entre plantas.', emoji: '🕳️' },
          { step: 3, title: 'Siembra definitiva', description: 'Colocar abono orgánico en el fondo y plantar retirando la bolsa plástica con cuidado.', emoji: '🌱' },
          { step: 4, title: 'Establecimiento de sombra', description: 'Plantar árboles fijadores de nitrógeno (guabas/Inga) o plátano para sombra temporal.', emoji: '🌳' }
        ],
        fertilizationNPK: [
          { etapa: 'Siembra y primer año', n: 30, p: 50, k: 30, observaciones: 'Fósforo para desarrollo radicular inicial.' },
          { etapa: 'Segundo año (Crecimiento)', n: 70, p: 20, k: 60, observaciones: 'Repartir en 2 o 3 aplicaciones en época de lluvia.' },
          { etapa: 'Producción (Año 3+)', n: 100, p: 30, k: 140, observaciones: 'El potasio es el motor para el llenado y dulzor del grano de café.' }
        ],
        irrigationPlan: 'Generalmente cultivado bajo régimen de lluvias. Si hay verano severo se requiere riego de auxilio.',
        plagueControl: [
          { name: 'Roya del café', scientificName: 'Hemileia vastatrix', type: 'HONGO', symptoms: 'Polvillo anaranjado por el envés de las hojas que provoca defoliación severa.', treatment: 'Caldo bordelés o fungicidas a base de cobre.', biologicalControl: 'Sembrar variedades resistentes como Catimor, Castillo o Geisha seleccionada.', emoji: '🍄' },
          { name: 'Broca del café', scientificName: 'Hypothenemus hampei', type: 'INSECTO', symptoms: 'Pequeño orificio en la cicatriz o corona de la cereza de café verde o madura.', treatment: 'Recolección rigurosa de granos caídos y maduros (método Re-Re).', biologicalControl: 'Hongo entomopatógeno Beauveria bassiana.', emoji: '🪲' }
        ],
        harvestIndicators: 'Cosecha manual selectiva exclusiva de cerezas rojas maduras o moradas sin verdes ni sobremaduras.',
        postHarvest: 'Despulpado el mismo día, fermentación controlada de 16-24 horas, lavado y secado en marquesinas hasta 10-12% de humedad.',
        glossary: [
          { term: 'Chapola', definition: 'Plántula recién nacida de café con sus dos hojas cotiledonales abiertas antes de pasar a bolsa.' },
          { term: 'Despulpado', definition: 'Remoción mecánica de la cáscara externa de la cereza de café.' }
        ],
        references: ['Cenicafé - Manual del cafetero colombiano', 'IICA - Guía de buenas prácticas en caficultura']
      },
      INTERMEDIO: {
        title: 'Manual Técnico de Cafés Especiales',
        subtitle: 'Poda por ciclos, nutrición balanceada y procesos de beneficio honey y natural',
        introduction: 'Para caficultores orientados a calidad de taza (SCA > 84 puntos): poda sistemática por lotes, control de sombra con luxómetro, curvas de secado lento y perfiles de fermentación anaeróbica.',
        climateRequirements: {
          tempOptima: '19°C - 22°C (amplitud térmica diaria de 10°C acentúa azúcares)',
          precipitacion: '1,800 - 2,400 mm anuales bien distribuidos',
          fotoperiodo: 'Luz difusa regulada con especies maderables y leguminosas',
          altitud: '1,300 a 2,100 msnm'
        },
        soilRequirements: {
          ph: '5.2 - 5.8, relación Ca/Mg de 3:1',
          textura: 'Franco-arcillo-arenoso derivado de cenizas volcánicas',
          materiaOrganica: '5% a 8%',
          drenaje: 'Profundo y poroso'
        },
        plantingSteps: [
          { step: 1, title: 'Selección de variedades exóticas', description: 'Propagación de Bourbon, Pacamara, Geisha o Typica certificada.', emoji: '☕' },
          { step: 2, title: 'Siembra en curvas de nivel', description: 'Prevención de erosión hídrica en laderas de alta pendiente.', emoji: '📐' },
          { step: 3, title: 'Poda sistemática por franjas o zoqueo', description: 'Renovación quinquenal de tejido productivo para mantener altos rendimientos.', emoji: '✂️' },
          { step: 4, title: 'Análisis foliar periódico', description: 'Monitoreo de niveles críticos de Boro, Zinc y Magnesio.', emoji: '📋' }
        ],
        fertilizationNPK: [
          { etapa: 'Pos-cosecha / Poda', n: 60, p: 40, k: 50, observaciones: 'Recuperación vegetativa con incorporación de pulpa compostada.' },
          { etapa: 'Pre-floración / Floración', n: 80, p: 30, k: 90, observaciones: 'Aporte de Boro y Zinc foliar para viabilidad de flores.' },
          { etapa: 'Llenado de grano (Grano lechoso a duro)', n: 100, p: 20, k: 180, observaciones: 'Mayor requerimiento de K2O para densidad y aceites del café.' }
        ],
        irrigationPlan: 'Riego por goteo en sistemas de alta densidad en periodos secos para inducir floración uniforme.',
        plagueControl: [
          { name: 'Ojo de gallo', scientificName: 'Mycena citricolor', type: 'HONGO', symptoms: 'Manchas circulares blanquecinas en hojas que provocan defoliación en zonas de sombra excesiva.', treatment: 'Regulación de sombra (podas del dosel arbóreo) y fungicidas cúpricos.', biologicalControl: 'Favorecer circulación de aire.', emoji: '🍄' },
          { name: 'Nematodos del café', scientificName: 'Meloidogyne spp. / Pratylenchus spp.', type: 'ACARO', symptoms: 'Nódulos en raíces, raquitismo y amarillamiento generalizado de la planta.', treatment: 'Enmiendas orgánicas abundantes y nematicidas biológicos.', biologicalControl: 'Uso de patrones resistentes como Coffea canephora (Robusta).', emoji: '🪱' }
        ],
        harvestIndicators: 'Cosecha estricta con refractómetro midiendo grados Brix en la pulpa (> 20° Brix).',
        postHarvest: 'Procesos diferenciados: Lavado clásico, Honey (con mucílago) o Natural en camas africanas con agitación horaria.',
        glossary: [
          { term: 'Zoqueo', definition: 'Corte del tallo a 30 cm del suelo para regenerar un brote nuevo y vigoroso.' },
          { term: 'Camas africanas', definition: 'Estructuras elevadas de malla que permiten ventilación superior e inferior del café durante el secado.' }
        ],
        references: ['SCA (Specialty Coffee Association) - Protocols and Standards', 'Cenicafé - Avances Técnicos en Nutrición del Café']
      },
      AVANZADO: {
        title: 'Manual Avanzado de Bioquímica y Fisiología del Café',
        subtitle: 'Microbiología de fermentaciones, agrosilvicultura de precisión y perfil sensorial',
        introduction: 'Para directores de fincas cafetaleras y catadores Q-Grader: fermentaciones anaeróbicas inoculadas con levaduras seleccionadas (Saccharomyces cerevisiae), cromatografía de ácidos orgánicos y manejo bioclimático.',
        climateRequirements: {
          tempOptima: 'Termoperiodismo marcado con noches de 14°C y días de 24°C',
          precipitacion: 'Balance hídrico con déficit programado de 4 semanas para sincronización floral',
          fotoperiodo: 'Radiación PAR optimizada por estrato arbóreo calibrado por sensor ceptómetro',
          altitud: 'Terroirs excepcionales entre 1,500 y 2,200 msnm'
        },
        soilRequirements: {
          ph: '5.5, capacidad de intercambio catiónico efectiva (CICE) > 18 meq/100g',
          textura: 'Andisoles con alto contenido de alofana y retención de humedad',
          materiaOrganica: '> 7% con relación C/N 10-12',
          drenaje: 'Drenaje vertical y lateral sin horizontes compactados'
        },
        plantingSteps: [
          { step: 1, title: 'Genotipado molecular y micropropagación', description: 'Clones F1 híbridos con alta productividad y calidad de taza.', emoji: '🧬' },
          { step: 2, title: 'Diseño agroforestal estratificado multiespecie', description: 'Combinación de maderables nobles, leguminosas y frutales de dosel alto.', emoji: '🌲' },
          { step: 3, title: 'Monitoreo de potencial hídrico foliar con bomba de Scholander', description: 'Precisión en el estrés hídrico para floración masiva concentrada.', emoji: '🔬' },
          { step: 4, title: 'Inoculación de bioestimulantes fúngicos micorrícicos', description: 'Ampliación del volumen radicular activo en suelos volcánicos fijadores de fósforo.', emoji: '🍄' }
        ],
        fertilizationNPK: [
          { etapa: 'Inducción de crecimiento vegetativo', n: 110, p: 40, k: 80, observaciones: 'Relación amonio/nitrato 25:75 para optimizar absorción en suelo ácido.' },
          { etapa: 'Diferenciación de yemas y floración', n: 70, p: 50, k: 110, observaciones: 'Zinc, Boro y Molibdeno quelatados con aminoácidos.' },
          { etapa: 'Llenado y síntesis de precursores aromáticos', n: 120, p: 20, k: 220, observaciones: 'Aporte de Azufre y Magnesio para síntesis de lípidos y trigonelina.' }
        ],
        irrigationPlan: 'Sistemas de riego por goteo con compensación de presión en terrenos escarpados.',
        plagueControl: [
          { name: 'Antracnosis de los frutos verdes (CBD)', scientificName: 'Colletotrichum kahawae', type: 'HONGO', symptoms: 'Lesiones necróticas hundidas oscuras en frutos verdes que momifican la cereza.', treatment: 'Fungicidas de contacto y sistémicos en floración y cuajado.', biologicalControl: 'Cepas antagonistas de Bacillus velezensis.', emoji: '🍄' },
          { name: 'Mancha de hierro', scientificName: 'Cercospora coffeicola', type: 'HONGO', symptoms: 'Manchas pardas con halo amarillo en hojas y cerezas, indicativo de deficiencia de nitrógeno.', treatment: 'Corrección inmediata del plan de fertilización nitrogenada y fungicidas triazoles.', biologicalControl: 'Sombreado adecuado y biofertilización con compost de pulpa.', emoji: '🍂' }
        ],
        harvestIndicators: 'Lectura espectral NIR de cerezas en planta midiendo contenido de glucosa y sacarosa.',
        postHarvest: 'Biorreactores de acero inoxidable con control de presión, temperatura (18°C) y pH; monitoreo de ácido láctico y acético; secado mecánico con aire deshumidificado a 35°C.',
        glossary: [
          { term: 'Q-Grader', definition: 'Catador profesional certificado por el Coffee Quality Institute para evaluar cafés según estándares internacionales.' },
          { term: 'Maceración carbónica', definition: 'Técnica de fermentación del café en cereza dentro de tanques sellados saturados con dióxido de carbono.' }
        ],
        references: ['Illy & Viani - Espresso Coffee: The Science of Quality', 'Cenicafé - Manual del Cafetero Colombiano Tomos I, II y III']
      }
    }
  },
  {
    id: 'crop-cacao',
    slug: 'cacao',
    name: 'Cacao',
    scientificName: 'Theobroma cacao',
    family: 'Malvaceae',
    emoji: '🍫',
    category: 'INDUSTRIAL',
    categoryLabel: 'Industrial',
    shortDescription: 'Árbol tropical originario de la cuenca amazónica, famoso por su manteca y notas aromáticas en chocolates finos.',
    durationDays: 160,
    difficulty: 'Exigente',
    commonDiseasesCount: 4,
    manuals: {
      PRINCIPIANTE: {
        title: 'Manual Básico de Cultivo de Cacao',
        subtitle: 'Injertación, siembra bajo dosel, poda y beneficio de mazorcas',
        introduction: 'El cacao es el fruto sagrado de América tropical del cual se obtiene el chocolate. Crece en pisos cálidos y húmedos bajo la protección de árboles de sombra.',
        climateRequirements: {
          tempOptima: '23°C - 28°C',
          precipitacion: '1,500 - 2,500 mm anuales',
          fotoperiodo: 'Sombra del 50% en plantas jóvenes, 30% en adultas',
          altitud: '0 a 800 msnm'
        },
        soilRequirements: {
          ph: '6.0 - 7.0',
          textura: 'Franco-arcillosa aluvial profunda y permeable',
          materiaOrganica: '3.5% a 5%',
          drenaje: 'Excelente; la raíz pivotante necesita profundidad libre de agua estancada'
        },
        plantingSteps: [
          { step: 1, title: 'Patrones e injertación', description: 'Sembrar semilla de patrón vigoroso e injertar a los 3 meses con vástago de clon fino (ej. Cacao Nacional o CCN-51).', emoji: '🌱' },
          { step: 2, title: 'Preparación de hoyos con materia orgánica', description: 'Hoyos de 40x40x40 cm con distancia de 3x3 metros.', emoji: '🕳️' },
          { step: 3, title: 'Siembra en época lluviosa', description: 'Trasplantar al inicio de lluvias protegiendo el cuello de la raíz.', emoji: '🌿' },
          { step: 4, title: 'Poda de formación', description: 'Mantener la horqueta a 1 metro del suelo y formar de 3 a 5 ramas principales.', emoji: '✂️' }
        ],
        fertilizationNPK: [
          { etapa: 'Primer año', n: 30, p: 40, k: 30, observaciones: 'Fósforo y abono orgánico en la base.' },
          { etapa: 'Segundo año', n: 60, p: 30, k: 50, observaciones: 'Aplicar en corona a la proyección de la copa.' },
          { etapa: 'Producción activa (Año 3+)', n: 90, p: 30, k: 130, observaciones: 'El potasio es indispensable para el tamaño y peso de las almendras.' }
        ],
        irrigationPlan: 'Riego auxiliar en temporada seca para evitar aborto de flores y frutos pequeños (pepinillos).',
        plagueControl: [
          { name: 'Moniliasis del cacao', scientificName: 'Moniliophthora roreri', type: 'HONGO', symptoms: 'Manchas marrón oscuro en la mazorca que luego se cubren de un polvo blanco fino muy contagioso.', treatment: 'Retiro semanal riguroso de todas las mazorcas enfermas antes de que esporulen.', biologicalControl: 'Trichoderma viride aplicado en floración.', emoji: '🍄' },
          { name: 'Escoba de bruja', scientificName: 'Moniliophthora perniciosa', type: 'HONGO', symptoms: 'Brotación vegetativa desordenada y engrosada que parece una escoba.', treatment: 'Poda y quema de ramas afectadas 30 cm por debajo de la lesión.', biologicalControl: 'Poda sanitaria regular.', emoji: '🧹' }
        ],
        harvestIndicators: 'Mazorcas con cambio de color claro a amarillo, anaranjado o rojo maduro. El sonido al golpear con los nudillos es hueco.',
        postHarvest: 'Desgrane cuidadoso sin cortar almendras, fermentación en cajones de laurel por 5-7 días con volteos diarios, y secado al sol en marquesinas.',
        glossary: [
          { term: 'Horqueta', definition: 'Punto donde el tallo principal del cacao se ramifica en ramas laterales.' },
          { term: 'Pepinillo', definition: 'Mazorca diminuta en sus primeras semanas de desarrollo tras la fecundación de la flor.' }
        ],
        references: ['INIAP - Manual del cultivo de cacao fino y de aroma', 'CATIE - Manejo agroforestal del cacao']
      },
      INTERMEDIO: {
        title: 'Manual Técnico de Cacao Fino de Aroma',
        subtitle: 'Sistemas agroforestales (SAF), fermentación de precisión y podas de mantenimiento',
        introduction: 'Buenas prácticas comerciales: podas de mantenimiento anuales, arquitectura de copa baja para facilitar cosecha, microclima contra Monilia y protocolos de fermentación controlada.',
        climateRequirements: {
          tempOptima: '24°C - 28°C; HR relativa 80%',
          precipitacion: '2,000 - 3,000 mm anuales',
          fotoperiodo: 'Sombrío dinámico con especies fijadoras de nitrógeno',
          altitud: '0 a 600 msnm'
        },
        soilRequirements: {
          ph: '6.2 - 6.8, C.I.C. > 20 meq/100g',
          textura: 'Franco a franco-arcilloso aluvial con nivel freático > 1.2 m',
          materiaOrganica: '4% a 6%',
          drenaje: 'Drenaje zanjado obligatorio'
        },
        plantingSteps: [
          { step: 1, title: 'Diseño agroforestal con árboles de dosel', description: 'Asociación con maderables (laurel, cedro) y plátano sombra temporal.', emoji: '🌲' },
          { step: 2, title: 'Injertación en púa terminal y parche', description: 'Compatibilidad de clones autocompatibles y de polinización cruzada.', emoji: '🌱' },
          { step: 3, title: 'Poda periódica de ramas chupones', description: 'Deschuponado continuo del tronco principal para concentrar savia en cojinetes florales.', emoji: '✂️' },
          { step: 4, title: 'Manejo de hojarasca y ciclaje de nutrientes', description: 'Dejar hojas y cáscaras fermentadas como cobertura viva.', emoji: '🍂' }
        ],
        fertilizationNPK: [
          { etapa: 'Entrada de lluvias', n: 70, p: 30, k: 80, observaciones: 'Aporte de Magnesio y Calcio para floración.' },
          { etapa: 'Cuajado de mazorcas', n: 50, p: 20, k: 120, observaciones: 'Potasio previene caída fisiológica de pepinillos.' },
          { etapa: 'Engorde de almendras', n: 30, p: 10, k: 140, observaciones: 'Aporte de Boro y Zinc para llenado de granos.' }
        ],
        irrigationPlan: 'Riego por aspersión o microaspersión subfoliar programado en épocas secas.',
        plagueControl: [
          { name: 'Moniliasis', scientificName: 'Moniliophthora roreri', type: 'HONGO', symptoms: 'Manchas marrones con bordes amarillos en mazorcas de todas las edades.', treatment: 'Deshoje y podas para que entre sol y baje humedad en el huerto.', biologicalControl: 'Monitoreo semanal y corte sanitario estricto.', emoji: '🍄' },
          { name: 'Chinche del cacao', scientificName: 'Monalonion dissimulatum', type: 'INSECTO', symptoms: 'Pinchazos en mazorcas y brotes tiernos que se necrosan formando manchas negras.', treatment: 'Fungicidas biorracionales y extractos de neem.', biologicalControl: 'Favorecer presencia de hormigas benéficas como Azteca.', emoji: '🪲' }
        ],
        harvestIndicators: 'Corte con tijera podadora desinfectada dejando el pedúnculo para no romper el cojinete floral que dará las siguientes flores.',
        postHarvest: 'Cajones de madera con orificios de drenaje para escurrir mucílago; temperatura de fermentación debe alcanzar 48-50°C al día 4.',
        glossary: [
          { term: 'Cojinete floral', definition: 'Engrosamiento del tronco o ramas maduras donde brotan las flores y mazorcas año tras año.' },
          { term: 'Almendra', definition: 'Semilla interna del fruto del cacao rodeada de mucílago azucarado.' }
        ],
        references: ['INIAP - Manejo integrado de plagas en cacao', 'ICCO - International Cocoa Organization Guidelines']
      },
      AVANZADO: {
        title: 'Manual Avanzado de Calidad y Genética de Cacao',
        subtitle: 'Cacao fino de aroma de exportación, metabolómica y mitigación de Cadmio',
        introduction: 'Para ingenieros agrónomos y exportadores de chocolate fino: mitigación de absorción de Cadmio (Cd) con biochar y enmiendas de calcio, perfiles de polifenoles y teobromina, y fermentaciones de alta precisión.',
        climateRequirements: {
          tempOptima: '25°C - 30°C diurna sin vientos fuertes desecantes',
          precipitacion: 'Régimen hídrico optimizado de 2,200 mm',
          fotoperiodo: 'Radiación difusa controlada con índice LAI del dosel arbóreo',
          altitud: 'Valles costeros y estribaciones tropicales'
        },
        soilRequirements: {
          ph: '6.5 - 7.0 (el pH alcalino o neutro reduce drásticamente la absorción de Cadmio)',
          textura: 'Suelos aluviales profundos con alta CICE (> 25 meq/100g)',
          materiaOrganica: '> 4.5% rica en ácidos húmicos que inmovilizan metales pesados',
          drenaje: 'Drenaje subterráneo continuo sin capas reductoras'
        },
        plantingSteps: [
          { step: 1, title: 'Selección de clones élite tolerantes a Cadmio', description: 'Selección de patrones que translocan menos Cd a la almendra.', emoji: '🧬' },
          { step: 2, title: 'Incorporación masiva de Biochar y cal dolomítica', description: 'Inmovilización fisicoquímica de iones de cadmio en la solución del suelo.', emoji: '🪨' },
          { step: 3, title: 'Inoculación de microorganismos fijadores y solubilizadores', description: 'Biofertilización con consorcios micorrícicos y bacterias sideróforas.', emoji: '🦠' },
          { step: 4, title: 'Mapeo satelital y dendrómetros de tronco', description: 'Sensores de pulso diario de crecimiento para gestión milimétrica de agua.', emoji: '📡' }
        ],
        fertilizationNPK: [
          { etapa: 'Brotación y floración principal', n: 100, p: 40, k: 90, observaciones: 'Calcio y Silicio solubles para engrosar cáscara de mazorca contra Monilia.' },
          { etapa: 'Crecimiento de mazorcas', n: 60, p: 30, k: 160, observaciones: 'Potasio en forma de sulfato para favorecer biosíntesis de lípidos.' },
          { etapa: 'Maduración y acumulación de aromas', n: 30, p: 10, k: 180, observaciones: 'Microelementos quelatados (Zn, B, Fe) para peso específico.' }
        ],
        irrigationPlan: 'Riego por goteo computarizado con líneas dobles por hilera.',
        plagueControl: [
          { name: 'Mal de machete', scientificName: 'Ceratocystis cacaofunesta', type: 'HONGO', symptoms: 'Marchitamiento súbito de ramas con hojas secas adheridas y estrías oscuras en madera.', treatment: 'Desinfección obligatoria de herramientas de poda con alcohol o cloro al 10%.', biologicalControl: 'Erradicación de árboles infectados y quema inmediata.', emoji: '🪵' },
          { name: 'Fitóftora (Pazote negro)', scientificName: 'Phytophthora palmivora', type: 'HONGO', symptoms: 'Manchas negras circulares de avance rápido en la mazorca con olor a humedad.', treatment: 'Fosfonato de potasio sistémico e incremento de aireación del huerto.', biologicalControl: 'Tratamiento de lodos de drenaje.', emoji: '🍄' }
        ],
        harvestIndicators: 'Lectura de pH de mucílago (3.6 - 3.8) y madurez cromática uniforme; descarte inmediato de almendras parasitadas.',
        postHarvest: 'Cajas de madera noble con termorregulación y curvas de calentamiento monitorizadas por sensores IoT; secado solar indirecto para evitar acidez volátil excesiva.',
        glossary: [
          { term: 'Cadmio (Cd)', definition: 'Metal pesado natural presente en suelos volcánicos regulado estrictamente por la Unión Europea en chocolates (< 0.8 mg/kg).' },
          { term: 'Teobromina', definition: 'Alcalide estimulante característico del cacao que confiere su amargor noble.' }
        ],
        references: ['Bioversity International - Cadmium in Cacao Manual', 'Cocoa Research Centre (UWI) - Fine Cocoa Processing Protocols']
      }
    }
  },
  {
    id: 'crop-frijol',
    slug: 'frijol',
    name: 'Fríjol',
    scientificName: 'Phaseolus vulgaris',
    family: 'Fabaceae',
    emoji: '🫘',
    category: 'LEGUMINOSA',
    categoryLabel: 'Leguminosa',
    shortDescription: 'Leguminosa fijadora de nitrógeno biológico, ciclo corto y alto aporte de proteína para la dieta humana.',
    durationDays: 80,
    difficulty: 'Fácil',
    commonDiseasesCount: 3,
    manuals: {
      PRINCIPIANTE: {
        title: 'Manual Sencillo de Cultivo de Fríjol',
        subtitle: 'Siembra en surcos, cuidados rápidos y cosecha de vainas',
        introduction: 'El fríjol es una leguminosa de ciclo corto (60 a 90 días) que enriquece el suelo tomando nitrógeno del aire y fijándolo en sus raíces mediante nódulos benéficos.',
        climateRequirements: {
          tempOptima: '18°C - 24°C',
          precipitacion: '350 - 500 mm por ciclo',
          fotoperiodo: 'Sensible a heladas y exceso de calor en floración',
          altitud: '800 a 2,500 msnm según variedad'
        },
        soilRequirements: {
          ph: '6.0 - 7.0',
          textura: 'Franco a franco-arenoso, fértil y suelto',
          materiaOrganica: '2% a 4%',
          drenaje: 'Muy bueno; muy sensible al exceso de agua'
        },
        plantingSteps: [
          { step: 1, title: 'Preparación de camas', description: 'Tierra suelta y nivelada libre de terrones grandes.', emoji: '🌱' },
          { step: 2, title: 'Siembra directa en surcos', description: 'Surcos separados a 50 cm y semillas cada 15 cm a 3 cm de profundidad.', emoji: '🟤' },
          { step: 3, title: 'Riego inicial', description: 'Humedecer la tierra para que germine en 4 a 6 días.', emoji: '💧' },
          { step: 4, title: 'Aporque ligero', description: 'A los 20 días amontonar tierra para sostener la mata y controlar malezas.', emoji: '🌿' }
        ],
        fertilizationNPK: [
          { etapa: 'Siembra', n: 15, p: 45, k: 30, observaciones: 'Fósforo prioritario; requiere poco nitrógeno porque lo fija del aire.' },
          { etapa: 'Floración (30 días)', n: 20, p: 20, k: 40, observaciones: 'Aporte de potasio para cuajar vainas.' }
        ],
        irrigationPlan: 'Riego moderado cada 5 a 7 días. Suspender agua durante la maduración de las vainas.',
        plagueControl: [
          { name: 'Mosca blanca', scientificName: 'Bemisia tabaci', type: 'INSECTO', symptoms: 'Amarillamiento y transmisión del mosaico dorado del fríjol.', treatment: 'Jabón potásico y trampas amarillas.', biologicalControl: 'Predadores naturales.', emoji: '🪰' },
          { name: 'Antracnosis', scientificName: 'Colletotrichum lindemuthianum', type: 'HONGO', symptoms: 'Manchas hundidas de color café oscuro en tallos y vainas.', treatment: 'Semilla sana certificada y caldo bordelés.', biologicalControl: 'Rotación con maíz.', emoji: '🍄' }
        ],
        harvestIndicators: 'Vainas secas y quebradizas que suenan al agitarlas. Grano duro que no se marca con la uña.',
        postHarvest: 'Desgranar al sol y guardar con menos de 13% de humedad en frascos herméticos con ceniza o pimienta para evitar gorgojos.',
        glossary: [
          { term: 'Fijación biológica', definition: 'Proceso donde bacterias simbióticas transforman nitrógeno del aire en abono asimilable.' },
          { term: 'Gorgojo del fríjol', definition: 'Insecto que taladra orificios redondos en los granos almacenados.' }
        ],
        references: ['CIAT - Guía de producción de fríjol común', 'INIAP - Buenas prácticas en leguminosas']
      },
      INTERMEDIO: {
        title: 'Manual Técnico de Fríjol Comercial',
        subtitle: 'Inoculación con Rhizobium, manejo fitosanitario y densidades',
        introduction: 'Optimización de rendimiento mediante inoculación con cepas seleccionadas de Rhizobium leguminosarum, manejo del complejo de hongos de suelo y cosecha mecanizada.',
        climateRequirements: {
          tempOptima: '20°C - 25°C',
          precipitacion: '400 - 600 mm',
          fotoperiodo: 'Días intermedios',
          altitud: '1,000 a 2,200 msnm'
        },
        soilRequirements: {
          ph: '6.2 - 6.8',
          textura: 'Franco profundo',
          materiaOrganica: '3%',
          drenaje: 'Drenaje rápido'
        },
        plantingSteps: [
          { step: 1, title: 'Inoculación de semilla con biofertilizante', description: 'Mezcla de semilla con turba portadora de Rhizobium antes de sembrar.', emoji: '🧪' },
          { step: 2, title: 'Densidad calibrada de 200,000 plantas/ha', description: 'Siembra en líneas a 45 cm entre hileras y 10 plantas/metro.', emoji: '📏' },
          { step: 3, title: 'Control selectivo de malezas gramíneas', description: 'Aplicación post-emergente temprana.', emoji: '🛡️' },
          { step: 4, title: 'Monitoreo de nodulación efectiva', description: 'Verificar nódulos rosados internos (leghemoglobina activa).', emoji: '🔍' }
        ],
        fertilizationNPK: [
          { etapa: 'Siembra', n: 20, p: 60, k: 40, observaciones: 'Fósforo para energía celular en nodulación.' },
          { etapa: 'Prefloración', n: 30, p: 20, k: 50, observaciones: 'Aporte de Boro y Molibdeno (clave para nitrogenasa).' }
        ],
        irrigationPlan: 'Riego por aspersión o goteo en fases críticas de floración y llenado.',
        plagueControl: [
          { name: 'Roya del fríjol', scientificName: 'Uromyces appendiculatus', type: 'HONGO', symptoms: 'Pústulas pulverulentas rojizas en el envés de las hojas.', treatment: 'Fungicidas triazoles o estrobirulinas preventivos.', biologicalControl: 'Variedades resistentes.', emoji: '🍄' },
          { name: 'Empoasca (Lorito verde)', scientificName: 'Empoasca kraemeri', type: 'INSECTO', symptoms: 'Bordes foliares quemados amarillos curvados hacia abajo.', treatment: 'Insecticidas biorracionales y extractos botánicos.', biologicalControl: 'Avispas parasitoides de huevos.', emoji: '🦗' }
        ],
        harvestIndicators: 'Corte y emparvado para secado final en campo antes del trille.',
        postHarvest: 'Limpieza con zaranda y tratamiento con tierra de diatomeas contra Zabrotes subfasciatus.',
        glossary: [
          { term: 'Leghemoglobina', definition: 'Proteína vegetal de color rojizo que transporta oxígeno a las bacterias fijadoras en el nódulo.' },
          { term: 'Zabrotes subfasciatus', definition: 'Gorgojo pintado del fríjol que destruye granos secos en almacén.' }
        ],
        references: ['CIAT - Bean Breeding and Management', 'Embrapa Arroz e Feijão']
      },
      AVANZADO: {
        title: 'Manual Avanzado de Agrotecnología en Leguminosas',
        subtitle: 'Genómica de nodulación, biofortificación con hierro y zinc, y agricultura regenerativa',
        introduction: 'Para fitomejoradores y productores de semillas de alto rendimiento: genética de líneas biofortificadas (alta concentración de Fe y Zn), balance nutricional y rotación para captura de carbono.',
        climateRequirements: {
          tempOptima: 'Día: 22-26°C / Noche: 16°C; Ausencia de estrés térmico en floración',
          precipitacion: 'Evapotranspiración total de 300 - 450 mm',
          fotoperiodo: 'Heliofanía alta',
          altitud: 'Valles templados y altiplanos'
        },
        soilRequirements: {
          ph: '6.5 buffer, disponibilidad de calcio y fósforo asimilable',
          textura: 'Franco-limosa rica en microorganismos rizosféricos',
          materiaOrganica: '> 3.5%',
          drenaje: 'Porosidad de aireación > 15%'
        },
        plantingSteps: [
          { step: 1, title: 'Inoculación con cepas élite microencapsuladas', description: 'Co-inoculación con Bradyrhizobium y Bacillus subtilis promotoras de crecimiento.', emoji: '🔬' },
          { step: 2, title: 'Siembra directa sobre rastrojo de maíz', description: 'Sistema de labranza cero para conservación biológica y humedad.', emoji: '🚜' },
          { step: 3, title: 'Fertirriego proporcional con nitrógeno nulo en fase vegetativa', description: 'Forzar la máxima fijación simbiótica sin inhibición por nitratos.', emoji: '💧' },
          { step: 4, title: 'Bioestimulación con fosfito de potasio foliar', description: 'Inducción de fitoalexinas y resistencia sistémica adquirida (SAR).', emoji: '🌱' }
        ],
        fertilizationNPK: [
          { etapa: 'Basal / Siembra', n: 10, p: 80, k: 50, observaciones: 'Cobalto y Molibdeno en dosis micrométricas esenciales para fijación de N2.' },
          { etapa: 'Floración y cuajado de vainas', n: 15, p: 30, k: 80, observaciones: 'Magnesio y Calcio solubles para calidad de grano.' }
        ],
        irrigationPlan: 'Riego de precisión programado por balances hídricos y sensores tensiométricos a 20 cm.',
        plagueControl: [
          { name: 'Mustia hilachosa', scientificName: 'Thanatephorus cucumeris', type: 'HONGO', symptoms: 'Quemazón rápida de hojas unidas por telarañas miceliares en condiciones cálidas y húmedas.', treatment: 'Fungicidas de última generación y coberturas vegetales.', biologicalControl: 'Trichoderma harzianum al suelo.', emoji: '🕸️' },
          { name: 'Mosaico dorado amarillo del fríjol (BGYMV)', scientificName: 'Bean Golden Yellow Mosaic Virus', type: 'VIRUS', symptoms: 'Mosaico amarillo brillante intenso, deformación de hojas y aborto de vainas.', treatment: 'Variedades con genes de resistencia bgm-1 y W12.', biologicalControl: 'Control preventivo del vector Bemisia tabaci.', emoji: '🟡' }
        ],
        references: ['CIAT - Nutrition in Common Bean', 'IPNI - Nutrient Management in Grain Legumes'],
        harvestIndicators: 'Cosechadora automotriz con cabezal flex Draper y sensor de humedad en tiempo real.',
        postHarvest: 'Almacenamiento hermético en silos bolsa bajo atmósfera con nitrógeno para conservación de color comercial sin endurecimiento (hard-to-cook).',
        glossary: [
          { term: 'Nitrogenasa', definition: 'Complejo enzimático bacteriano que rompe el triple enlace del nitrógeno atmosférico.' },
          { term: 'Hard-to-cook', definition: 'Defecto de endurecimiento de la testa del fríjol cuando se almacena con alta temperatura y humedad.' }
        ]
      }
    }
  },
  {
    id: 'crop-pimiento',
    slug: 'pimiento',
    name: 'Pimiento',
    scientificName: 'Capsicum annuum',
    family: 'Solanaceae',
    emoji: '🫑',
    category: 'HORTALIZA',
    categoryLabel: 'Hortaliza',
    shortDescription: 'Hortaliza dulce rica en vitamina C, demandante de temperaturas cálidas y tutorado para evitar volteo de frutos.',
    durationDays: 100,
    difficulty: 'Media',
    commonDiseasesCount: 4,
    manuals: {
      PRINCIPIANTE: {
        title: 'Manual Básico de Cultivo de Pimiento',
        subtitle: 'Siembra en semillero, trasplante, tutorado y cuidados',
        introduction: 'El pimiento es un cultivo hortícola emparentado con el tomate y la papa. Produce frutos gruesos, crujientes y coloridos (verdes, amarillos o rojos) con un sabor dulce delicioso.',
        climateRequirements: {
          tempOptima: '20°C - 26°C',
          precipitacion: '600 - 800 mm por ciclo',
          fotoperiodo: 'Alta luminosidad',
          altitud: '0 a 1,800 msnm'
        },
        soilRequirements: {
          ph: '6.0 - 6.8',
          textura: 'Franco-arenosa rica en materia orgánica',
          materiaOrganica: '3%',
          drenaje: 'Excelente; raíces sensibles a la asfixia'
        },
        plantingSteps: [
          { step: 1, title: 'Almácigo en bandejas', description: 'Sembrar a 0.5 cm en sustrato húmedo. Tarda 8 a 12 días en germinar.', emoji: '🌱' },
          { step: 2, title: 'Trasplante al huerto', description: 'A los 35 días con 5 hojas verdaderas, trasplantar a 40 cm entre plantas y 80 cm entre surcos.', emoji: '🪴' },
          { step: 3, title: 'Tutorado suave', description: 'Colocar estaca al lado del tallo para sostener el peso de los pimientos.', emoji: '🎋' },
          { step: 4, title: 'Poda de la flor del primer nudo', description: 'Retirar la primera flor central para que la planta crezca con más vigor antes de cargar frutos.', emoji: '✂️' }
        ],
        fertilizationNPK: [
          { etapa: 'Trasplante', n: 30, p: 60, k: 30, observaciones: 'Fósforo para raíz inicial.' },
          { etapa: 'Crecimiento vegetativo', n: 50, p: 20, k: 60, observaciones: 'Nitrógeno más calcio para hojas fuertes.' },
          { etapa: 'Fructificación', n: 40, p: 20, k: 100, observaciones: 'Potasio para grosor de pared y peso de pimientos.' }
        ],
        irrigationPlan: 'Riego frecuente pero sin encharcar. Evitar mojar hojas y flores para prevenir hongos.',
        plagueControl: [
          { name: 'Trips', scientificName: 'Frankliniella occidentalis', type: 'INSECTO', symptoms: 'Plateado en hojas y deformación en frutos pequeños.', treatment: 'Jabón potásico y trampas azules.', biologicalControl: 'Ácaros depredadores Amblyseius swirskii.', emoji: '🪲' },
          { name: 'Oídio', scientificName: 'Leveillula taurica', type: 'HONGO', symptoms: 'Manchas amarillas en el haz y vellón blanquecino por el envés.', treatment: 'Azufre micronizado en horas tempranas.', biologicalControl: 'Buena aireación entre plantas.', emoji: '🍄' }
        ],
        harvestIndicators: 'Frutos firmes y brillantes de buen tamaño. Cosechar con tijera dejando 2 cm de pedúnculo.',
        postHarvest: 'Conservar a 8-10°C y 90% de humedad relativa para evitar deshidratación.',
        glossary: [
          { term: 'Pedúnculo', definition: 'Rabito que une el fruto con la rama de la planta.' },
          { term: 'Pared del fruto', definition: 'Carne o pericarpio comestible del pimiento.' }
        ],
        references: ['FAO - Guía de producción hortícola', 'INIAP - Manual de hortalizas']
      },
      INTERMEDIO: {
        title: 'Manual Técnico de Pimiento en Invernadero y Malla',
        subtitle: 'Poda a 2 o 3 tallos, fertirriego balanceado y manejo de plagas',
        introduction: 'Técnicas profesionales para maximizar rendimiento por metro cuadrado: entutorado en espaldera tipo Florida, equilibrio vegetativo/generativo y nutrición con microelementos.',
        climateRequirements: {
          tempOptima: 'Día: 22-28°C / Noche: 16-18°C',
          precipitacion: 'Riego tecnificado por goteo',
          fotoperiodo: 'Luz filtrada en malla sombra (20-30%)',
          altitud: 'Valles costeros y templados'
        },
        soilRequirements: {
          ph: '6.2 - 6.7, CE < 1.5 dS/m',
          textura: 'Franco a franco-arenoso profundo',
          materiaOrganica: '3.5%',
          drenaje: 'Drenaje artificial en camas elevadas'
        },
        plantingSteps: [
          { step: 1, title: 'Desinfección de suelo o solarización', description: 'Eliminación preventiva de patógenos del suelo.', emoji: '☀️' },
          { step: 2, title: 'Instalación de acolchado y riego por goteo', description: 'Líneas con goteros cada 20 cm a 1.5 l/h.', emoji: '💧' },
          { step: 3, title: 'Poda holandesa a dos tallos', description: 'Guiado vertical con hilos y tutores plásticos.', emoji: '🎋' },
          { step: 4, title: 'Raleo de frutos en bifurcaciones', description: 'Dejar un fruto por nudo para tamaño extra grande.', emoji: '✂️' }
        ],
        fertilizationNPK: [
          { etapa: 'Arraigue y vegetativo', n: 60, p: 70, k: 60, observaciones: 'Calcio soluble semanal para evitar podredumbre apical.' },
          { etapa: 'Floración continuada', n: 90, p: 40, k: 140, observaciones: 'Magnesio foliar para fotosíntesis activa.' },
          { etapa: 'Pico de cosecha', n: 110, p: 30, k: 220, observaciones: 'Relación K/N de 2:1 para brillo y grosor de pericarpio.' }
        ],
        irrigationPlan: 'Pulsos de riego calculados según evapotranspiración.',
        plagueControl: [
          { name: 'Picudo del chile', scientificName: 'Anthonomus eugenii', type: 'INSECTO', symptoms: 'Caída masiva de flores y botones florales perforados.', treatment: 'Trampas con feromonas y rotación de insecticidas.', biologicalControl: 'Destrucción de restos de cosecha.', emoji: '🪲' },
          { name: 'Podredumbre gris', scientificName: 'Botrytis cinerea', type: 'HONGO', symptoms: 'Moho gris cenizo en flores senescentes y heridas de poda.', treatment: 'Fungicidas específicos y ventilación.', biologicalControl: 'Trichoderma harzianum.', emoji: '🍄' }
        ],
        harvestIndicators: 'Corte cuando el pimiento alcanza coloración completa uniforme (rojo, amarillo o naranja).',
        postHarvest: 'Clasificación por peso y empaque en cajas con alveolos.',
        glossary: [
          { term: 'Pericarpio', definition: 'Capa carnosa de la pared del pimiento que determina su firmeza y peso.' },
          { term: 'Nudo o bifurcación', definition: 'Punto donde el tallo se divide en dos ramas secundarias.' }
        ],
        references: ['Almería Agrícola - Manual de cultivo de pimiento', 'INTA - Producción de pimiento bajo cubierta']
      },
      AVANZADO: {
        title: 'Manual Avanzado de Agrotecnología en Pimiento',
        subtitle: 'Soluciones nutritivas en hidroponía, control biológico integral y calidad exportable',
        introduction: 'Para directores técnicos de invernaderos de alta tecnología: control biológico inoculativo y aumentativo de trips y ácaros, soluciones nutritivas recirculantes y monitoreo con sensores de savia.',
        climateRequirements: {
          tempOptima: 'Día: 24°C / Noche: 18°C; Déficit de presión de vapor (VPD) 0.7 - 1.1 kPa',
          precipitacion: 'Riego automatizado por sensor de radiación solar',
          fotoperiodo: 'Enriquecimiento carbónico opcional',
          altitud: 'Instalaciones tecnificadas'
        },
        soilRequirements: {
          ph: 'Solución en sustrato inerte: 5.8 constante',
          textura: 'Slabs de perlita o lana de roca',
          materiaOrganica: 'N/A',
          drenaje: 'Recirculación con desinfección UV'
        },
        plantingSteps: [
          { step: 1, title: 'Inoculación masiva de Amblyseius swirskii', description: 'Control biológico preventivo establecido antes del primer vuelo de trips.', emoji: '🕷️' },
          { step: 2, title: 'Manejo de balance generativo con conductividad', description: 'Elevar CE a 3.0 dS/m para frenar vigor y cuajar frutos en verano.', emoji: '⚡' },
          { step: 3, title: 'Deshoje selectivo en ventana', description: 'Iluminación directa a frutos maduros sin riesgo de golpe de sol.', emoji: '✂️' },
          { step: 4, title: 'Monitoreo de flujo de savia en tallo', description: 'Sensores de pulso térmico para detección temprana de estrés hídrico.', emoji: '📡' }
        ],
        fertilizationNPK: [
          { etapa: 'Fase vegetativa', n: 140, p: 50, k: 200, observaciones: 'Solución Steiner estándar.' },
          { etapa: 'Fructificación plena', n: 160, p: 40, k: 320, observaciones: 'Calcio a 5 meq/l y Silicio para dureza de piel.' }
        ],
        irrigationPlan: 'Riego comandado por drenaje y radiación solar acumulada.',
        plagueControl: [
          { name: 'Virus del bronceado del tomate (TSWV)', scientificName: 'Tomato Spotted Wilt Virus', type: 'VIRUS', symptoms: 'Líneas cloróticas circulares concéntricas en hojas y frutos transmitidas por trips.', treatment: 'Variedades con gen de resistencia Tsw.', biologicalControl: 'Erradicación de trips con Orius laevigatus.', emoji: '⚠️' },
          { name: 'Fitóftora de raíz y cuello', scientificName: 'Phytophthora capsici', type: 'HONGO', symptoms: 'Anillo negro estrangulante en la base del tallo y marchitez fulminante.', treatment: 'Patrones resistentes y fungicidas en drench.', biologicalControl: 'Trichoderma asperellum.', emoji: '🍄' }
        ],
        harvestIndicators: 'Grados Brix > 7.0 y firmeza de fruto > 4.5 kg/cm² con penetrómetro de punta roma.',
        postHarvest: 'Cadena de frío continua a 8.5°C con empaque flow-pack microperforado.',
        glossary: [
          { term: 'Orius laevigatus', definition: 'Chinche pirata depredadora sumamente eficaz contra trips en flores de pimiento.' },
          { term: 'VPD (Vapor Pressure Deficit)', definition: 'Medida de la capacidad del aire para extraer agua de las hojas de la planta.' }
        ],
        references: ['Wageningen UR - Sweet Pepper Greenhouse Protocols', 'Koppert - Biological Systems in Sweet Pepper']
      }
    }
  },
  {
    id: 'crop-lechuga',
    slug: 'lechuga',
    name: 'Lechuga',
    scientificName: 'Lactuca sativa',
    family: 'Asteraceae',
    emoji: '🥬',
    category: 'HORTALIZA',
    categoryLabel: 'Hortaliza',
    shortDescription: 'Hortaliza de hoja tierna de ciclo ultrarrápido (45-60 días), ideal para huertos familiares y sistemas hidropónicos.',
    durationDays: 50,
    difficulty: 'Fácil',
    commonDiseasesCount: 3,
    manuals: {
      PRINCIPIANTE: {
        title: 'Manual Sencillo de Cultivo de Lechuga',
        subtitle: 'Siembra en semillero, trasplante, riego y cosecha fresca',
        introduction: 'La lechuga es la reina de las ensaladas. Crece con gran rapidez en suelos frescos y húmedos, siendo perfecta para huertos urbanos y principiantes.',
        climateRequirements: {
          tempOptima: '15°C - 20°C (el calor excesivo > 25°C induce floración prematura amarga)',
          precipitacion: 'Riego constante y suave',
          fotoperiodo: 'Sombra ligera en climas cálidos',
          altitud: '800 a 2,800 msnm'
        },
        soilRequirements: {
          ph: '6.0 - 7.0',
          textura: 'Franco-arenosa rica en compost',
          materiaOrganica: 'Mayor a 3%',
          drenaje: 'Bueno con capacidad de retener humedad superficial'
        },
        plantingSteps: [
          { step: 1, title: 'Almácigo con semilla fina', description: 'Sembrar apenas tapando la semilla con 2 mm de tierra fina. Germina en 3 a 5 días.', emoji: '🌱' },
          { step: 2, title: 'Trasplante temprano', description: 'A los 20 días con 4 hojas trasplantar a 25 cm entre plantas.', emoji: '🪴' },
          { step: 3, title: 'Acolchado o cobertura', description: 'Colocar paja seca alrededor para mantener la tierra fresca y limpia.', emoji: '🌾' },
          { step: 4, title: 'Riego diario ligero', description: 'Regar por la mañana sin encharcar para mantener hojas crujientes.', emoji: '💧' }
        ],
        fertilizationNPK: [
          { etapa: 'Trasplante', n: 30, p: 40, k: 30, observaciones: 'Fósforo para arranque de raíces.' },
          { etapa: 'Crecimiento de cogollo (25 días)', n: 50, p: 10, k: 50, observaciones: 'Nitrógeno para hojas verdes y carnosas.' }
        ],
        irrigationPlan: 'Riegos diarios suaves. El estrés por falta de agua produce hojas duras y amargas.',
        plagueControl: [
          { name: 'Babosas y caracoles', scientificName: 'Deroceras reticulatum', type: 'INSECTO', symptoms: 'Grandes mordeduras en hojas y rastros de baba brillante.', treatment: 'Ceniza perimetral o trampas con cerveza.', biologicalControl: 'Recolección nocturna manual.', emoji: '🐌' },
          { name: 'Mildiu de la lechuga', scientificName: 'Bremia lactucae', type: 'HONGO', symptoms: 'Manchas amarillas delimitadas por las nervaduras con polvo blanco por el envés.', treatment: 'Fungicidas biológicos a base de cobre o cola de caballo.', biologicalControl: 'No mojar el follaje al regar.', emoji: '🍄' }
        ],
        harvestIndicators: 'Cogollo compacto y firme antes de que el tallo empiece a estirarse para florecer.',
        postHarvest: 'Cosechar en la mañana fresca, lavar con agua fría y refrigerar a 2-4°C.',
        glossary: [
          { term: 'Espigado', definition: 'Subida a flor prematura de la lechuga que vuelve sus hojas amargas y no comestibles.' },
          { term: 'Cogollo', definition: 'Corazón apretado de hojas centrales de la lechuga.' }
        ],
        references: ['FAO - Producción de hortalizas de hoja', 'INTA - Manual de huerta agroecológica']
      },
      INTERMEDIO: {
        title: 'Manual Técnico de Lechuga Comercial e Hidroponía',
        subtitle: 'Sistemas NFT, variedades tolerantes al calor y calidad de hoja',
        introduction: 'Cultivo hidropónico en tubos NFT (Nutrient Film Technique), densidad intensiva (25 a 30 plantas/m²), prevención de "tip burn" o quemadura de bordes mediante manejo de calcio y variedades Batavia, Romana y Mantecosa.',
        climateRequirements: {
          tempOptima: 'Día: 18-22°C / Noche: 12-14°C',
          precipitacion: 'Circuito cerrado de recirculación',
          fotoperiodo: 'Malla térmica aluminizada para reducir calor en mediodía',
          altitud: 'Todas las altitudes con climatización pasiva'
        },
        soilRequirements: {
          ph: 'Solución nutritiva: 5.8 - 6.2',
          textura: 'Sustrato esponjoso de germinación en bandejas de foam',
          materiaOrganica: 'N/A en NFT',
          drenaje: 'Pendiente del tubo del 1.5% al 2%'
        },
        plantingSteps: [
          { step: 1, title: 'Germinación en cámaras oscuras a 18°C', description: 'Emergencia sincronizada uniforme en 48 horas.', emoji: '🌱' },
          { step: 2, title: 'Fase de nursery o maternidad (10 días)', description: 'Canales estrechos de baja separación para ahorrar espacio.', emoji: '📏' },
          { step: 3, title: 'Trasplante a canales definitivos', description: 'Espaciamiento a 25 cm con orificios calibrados.', emoji: '⚙️' },
          { step: 4, title: 'Monitoreo de conductividad y oxígeno disuelto', description: 'Mantener oxígeno disuelto > 6 ppm mediante oxigenadores Venturi.', emoji: '🫧' }
        ],
        fertilizationNPK: [
          { etapa: 'Fórmula vegetativa continua', n: 120, p: 35, k: 180, observaciones: 'Calcio soluble a 4.5 meq/l para evitar quemado de bordes (tip burn).' }
        ],
        irrigationPlan: 'Circulación continua con temporizadores diurnos (15 min ON / 5 min OFF).',
        plagueControl: [
          { name: 'Pulgón de la lechuga', scientificName: 'Nasonovia ribisnigri', type: 'INSECTO', symptoms: 'Colonias de insectos en el cogollo interior que desmerecen la calidad comercial.', treatment: 'Jabón potásico y azadiractina.', biologicalControl: 'Depredadores Aphidoletes aphidimyza.', emoji: '🪲' },
          { name: 'Tip Burn (Quemadura de bordes)', scientificName: 'Trastorno fisiológico', type: 'VIRUS', symptoms: 'Bordes necrosados oscuros en hojas tiernas por falta de translocación de calcio.', treatment: 'Ventilación forzada nocturna y aplicaciones foliares de cloruro de calcio.', biologicalControl: 'Manejo de humedad relativa.', emoji: '🍂' }
        ],
        harvestIndicators: 'Peso fresco comercial de 250 a 400 gramos por pieza según variedad.',
        postHarvest: 'Corte limpio de raíz, hidroenfriado y embolsado en polietileno microperforado.',
        glossary: [
          { term: 'NFT', definition: 'Nutrient Film Technique: lámina delgada de solución que corre continuamente por la raíz.' },
          { term: 'Tip Burn', definition: 'Necrosis de las puntas de las hojas causada por deficiencia localizada de calcio en crecimiento rápido.' }
        ],
        references: ['Resh - Hydroponic Food Production', 'CIAT - Producción intensiva de hortalizas']
      },
      AVANZADO: {
        title: 'Manual Avanzado de Fitotecnia en Hortalizas de Hoja',
        subtitle: 'Granjas verticales (Vertical Farming), luces LED espectrales y biosensórica',
        introduction: 'Agricultura en ambiente controlado (CEA): fotoperiodo artificial con espectros azul/rojo lejano para maximizar biomasa sin espigado, soluciones nutritivas de ultraprecisión y control de nitratos en tejido.',
        climateRequirements: {
          tempOptima: 'Día: 21°C / Noche: 16°C; Humedad relativa 65% constante',
          precipitacion: 'Sistemas aeropónicos o DWC automatizados',
          fotoperiodo: 'PPFD de 220 µmol/m²/s con DLI de 14.5 mol/m²/día',
          altitud: 'Independiente de la geografía (planta cerrada indoor)'
        },
        soilRequirements: {
          ph: '5.85 ± 0.15 automatizado con dosificadores peristálticos de ácido nítrico',
          textura: 'Plug de turba estabilizada biodegradable',
          materiaOrganica: 'N/A',
          drenaje: 'Sensores de CE y pH en recirculación cerrada con esterilización por ozono'
        },
        plantingSteps: [
          { step: 1, title: 'Siembra robotizada en bandejas de 288 celdas', description: 'Semillas pildoradas de precisión.', emoji: '🤖' },
          { step: 2, title: 'Iluminación dinámica modulada', description: 'Aumento de espectro azul 48h antes de corte para textura crujiente y acumulación de antocianinas.', emoji: '💡' },
          { step: 3, title: 'Control estricto de acumulación de nitratos', description: 'Reducción de nitrógeno 4 días antes de cosecha para cumplir directiva europea (< 2,500 mg NO3/kg).', emoji: '🧪' },
          { step: 4, title: 'Cosecha mecanizada con raíz viva intacta', description: 'Vida útil en anaquel extendida a más de 18 días.', emoji: '🥗' }
        ],
        fertilizationNPK: [
          { etapa: 'Fase DWC continua', n: 130, p: 30, k: 210, observaciones: 'Hierro quelatado Fe-DTPA/Fe-EDDHA para evitar clorosis en luz continua.' }
        ],
        irrigationPlan: 'Sensores de conductividad y temperatura radicular mantenida a 18°C.',
        plagueControl: [
          { name: 'Pythium sp. (Pudrición radicular)', scientificName: 'Pythium ultimum', type: 'HONGO', symptoms: 'Raíces marrones oscuras y gelatinosas con colapso de la planta.', treatment: 'Ozono en la solución y desinfección total de tuberías.', biologicalControl: 'Inoculación de Bacillus subtilis en la balsa.', emoji: '🦠' }
        ],
        harvestIndicators: 'Masa foliar óptima de 300g con índice SPAD calibrado.',
        postHarvest: 'Atmósfera modificada con 95% N2 y 5% O2 para ensaladas listas para consumir.',
        glossary: [
          { term: 'PPFD', definition: 'Photosynthetic Photon Flux Density: densidad de luz fotosintética útil que incide sobre las hojas.' },
          { term: 'DWC', definition: 'Deep Water Culture: cultivo en balsa flotante con raíces suspendidas en agua oxigenada.' }
        ],
        references: ['Cornell CEA - Controlled Environment Agriculture Leafy Greens', 'Wageningen UR - Vertical Farming Protocols']
      }
    }
  },
  {
    id: 'crop-zanahoria',
    slug: 'zanahoria',
    name: 'Zanahoria',
    scientificName: 'Daucus carota',
    family: 'Apiaceae',
    emoji: '🥕',
    category: 'RAIZ',
    categoryLabel: 'Raíz',
    shortDescription: 'Raíz comestible rica en carotenos, requiere suelos arenosos profundos y deshierbe minucioso.',
    durationDays: 95,
    difficulty: 'Media',
    commonDiseasesCount: 3,
    manuals: {
      PRINCIPIANTE: {
        title: 'Manual Sencillo de Cultivo de Zanahoria',
        subtitle: 'Siembra directa, aclareo o raleo, riego y cosecha',
        introduction: 'La zanahoria es una raíz crujiente y dulce con alto contenido de vitamina A y carotenos. Debe sembrarse directamente en el suelo porque no tolera el trasplante.',
        climateRequirements: {
          tempOptima: '16°C - 21°C',
          precipitacion: '400 - 600 mm regulares',
          fotoperiodo: 'Sol pleno',
          altitud: '1,000 a 2,800 msnm'
        },
        soilRequirements: {
          ph: '6.0 - 6.8',
          textura: 'Arenosa a franco-arenosa, muy profunda y sin piedras',
          materiaOrganica: '2% a 3% (evitar estiércol fresco porque bifurca la raíz)',
          drenaje: 'Excelente; la tierra compacta deforma la zanahoria'
        },
        plantingSteps: [
          { step: 1, title: 'Camas profundas sin piedras', description: 'Remover la tierra a 30 cm de profundidad y desmenuzar todos los terrones.', emoji: '🌱' },
          { step: 2, title: 'Siembra en surcos delgados', description: 'Sembrar en líneas a 25 cm separadas, a 1 cm de profundidad con semilla mezclada con arena.', emoji: '🟤' },
          { step: 3, title: 'Riego delicado continuo', description: 'Mantener húmedo sin encharcar. Tarda 10 a 15 días en asomar.', emoji: '💧' },
          { step: 4, title: 'Raleo o aclareo obligatorio', description: 'A los 25 días, dejar una zanahoria cada 5-7 cm arrancando las más débiles.', emoji: '✂️' }
        ],
        fertilizationNPK: [
          { etapa: 'Siembra', n: 20, p: 50, k: 30, observaciones: 'Fósforo para inducir raíz pivotante recta.' },
          { etapa: 'Engorde (45 días)', n: 30, p: 10, k: 70, observaciones: 'El potasio aporta azúcares, color naranja y dulzura.' }
        ],
        irrigationPlan: 'Riego regular para evitar que la raíz se raje por cambios bruscos de humedad.',
        plagueControl: [
          { name: 'Mosca de la zanahoria', scientificName: 'Psila rosae', type: 'INSECTO', symptoms: 'Túneles de color rojizo oxidado en la raíz.', treatment: 'Mallas anti-insectos y siembra asociada con cebolla o puerro.', biologicalControl: 'Repelencia natural aromática.', emoji: '🪰' },
          { name: 'Alternaria de la hoja', scientificName: 'Alternaria dauci', type: 'HONGO', symptoms: 'Manchas marrones oscuras con bordes amarillos que queman el follaje.', treatment: 'Fungicidas cúpricos preventivos.', biologicalControl: 'Rotación con cereales.', emoji: '🍄' }
        ],
        harvestIndicators: 'El hombro de la raíz asoma en la superficie con 2 a 3 cm de grosor. Cosechar aflojando la tierra con laya.',
        postHarvest: 'Cortar el follaje verde de inmediato para que no extraiga humedad de la raíz. Lavar y guardar en frío.',
        glossary: [
          { term: 'Raleo', definition: 'Eliminación manual de plantitas sobrantes para dejar espacio para que las demás engorden.' },
          { term: 'Bifurcación', definition: 'Deformación donde la raíz se divide en dos o más ramas por encontrar piedras o abono fresco.' }
        ],
        references: ['FAO - Producción de raíces y tubérculos', 'INTA - Manual de horticultura familiar']
      },
      INTERMEDIO: {
        title: 'Manual Técnico de Producción de Zanahoria Comercial',
        subtitle: 'Camellones de siembra, sembradoras neumáticas y nutrición mineral',
        introduction: 'Cultivo a gran escala: confección de camas elevadas con conformador de caballones, siembra en multibandas de alta densidad (1 a 1.2 millones de semillas/ha) y cosecha con arrancadora mecánica de cinta.',
        climateRequirements: {
          tempOptima: '18°C - 22°C',
          precipitacion: 'Riego tecnificado por aspersión o microaspersión',
          fotoperiodo: 'Alta radiación',
          altitud: 'Valles y altiplanos'
        },
        soilRequirements: {
          ph: '6.2 - 6.7',
          textura: 'Franco-arenosa profunda, perfil uniforme > 40 cm sin piedras',
          materiaOrganica: '2.5% bien humificada',
          drenaje: 'Drenaje interno muy rápido'
        },
        plantingSteps: [
          { step: 1, title: 'Conformación de lomos o camas altas', description: 'Camas de 25 cm de altura con suelo finamente desmenuzado.', emoji: '🚜' },
          { step: 2, title: 'Siembra neumática de precisión calibrada', description: 'Semilla pildorada con distribución milimétrica sin necesidad de raleo.', emoji: '⚙️' },
          { step: 3, title: 'Herbicida selectivo temprano', description: 'Control de malezas en primeras semanas para evitar competencia.', emoji: '🛡️' },
          { step: 4, title: 'Aporte de Boro y Calcio foliar', description: 'Prevención de rajado y acorchamiento del corazón de la zanahoria.', emoji: '🧪' }
        ],
        fertilizationNPK: [
          { etapa: 'Presiembra incorporada', n: 40, p: 90, k: 70, observaciones: 'Fósforo profundo para desarrollo inicial.' },
          { etapa: 'Foliación completa (40 dds)', n: 60, p: 20, k: 120, observaciones: 'Aporte de Nitrato de Potasio en fertirriego.' },
          { etapa: 'Maduración final', n: 20, p: 10, k: 110, observaciones: 'Cierre de ciclo para firmeza de pulpa.' }
        ],
        irrigationPlan: 'Riego por aspersión frecuente manteniendo humedad al 70-80% de capacidad de campo.',
        plagueControl: [
          { name: 'Oídio de la zanahoria', scientificName: 'Erysiphe heraclei', type: 'HONGO', symptoms: 'Velo blanco pulverulento en hojas y peciolos que debilita la planta.', treatment: 'Azufre micronizado o fungicidas específicos.', biologicalControl: 'Ventilación y distancias amplias.', emoji: '🍄' },
          { name: 'Nematodos del nudo', scientificName: 'Meloidogyne hapla', type: 'ACARO', symptoms: 'Agallas redondeadas en raicillas secundarias y raíces deformadas con pelos.', treatment: 'Rotación con crucíferas o biofumigación con mostaza.', biologicalControl: 'Inoculación de Pasteuria penetrans.', emoji: '🪱' }
        ],
        harvestIndicators: 'Cosecha con arrancadora que toma las zanahorias por el follaje y corta las hojas mecánicamente.',
        postHarvest: 'Lavado con hidroenfriamiento (hydrocooling) con agua a 1°C para bajar temperatura de campo y empaque.',
        glossary: [
          { term: 'Hydrocooling', definition: 'Enfriamiento ultra rápido con agua helada que prolonga la vida comercial de la zanahoria.' },
          { term: 'Semilla pildorada', definition: 'Semilla recubierta con arcilla inerte para aumentar su tamaño y sembrarla con máquinas de precisión.' }
        ],
        references: ['Vilmorin - Guide de culture carotte', 'Embrapa Hortaliças - Produção de Cenoura']
      },
      AVANZADO: {
        title: 'Manual Avanzado de Agrotecnología y Fisiología de la Zanahoria',
        subtitle: 'Agricultura de precisión, fitonutrientes y poscosecha de exportación',
        introduction: 'Para ingenieros agrónomos y procesadores agroindustriales: acumulación de beta-caroteno y licopeno, regulación de estrés osmótico para prevenir rajado transversal (splitting), y almacenamiento frigorífico a largo plazo.',
        climateRequirements: {
          tempOptima: 'Día: 18-20°C / Noche: 10-14°C (amplitud térmica acentúa azúcares y coloración intensa)',
          precipitacion: 'Control estricto de lámina de agua de 450 a 550 mm',
          fotoperiodo: 'Alta radiación fotosintéticamente activa',
          altitud: 'Altiplanos con noches frescas'
        },
        soilRequirements: {
          ph: '6.5, C.I.C. > 15 meq/100g, conductividad eléctrica < 1.2 dS/m',
          textura: 'Suelos arenosos eólicos o aluviales tamizados sin presencia de piedras ni arcillas masivas',
          materiaOrganica: '> 2.5% con relación C:N equilibrada',
          drenaje: 'Infiltración superior a 25 mm/h'
        },
        plantingSteps: [
          { step: 1, title: 'Subsolado cruzado a 50 cm y conformación GPS', description: 'Eliminación total de resistencia mecánica a la penetración de la cofia radicular.', emoji: '🚜' },
          { step: 2, title: 'Siembra en bandas triples con semilla pre-cebada', description: 'Emergencia acelerada en 5 días con coeficientes de uniformidad > 92%.', emoji: '⚙️' },
          { step: 3, title: 'Monitoreo de firmeza foliar para corte mecánico', description: 'Conservación del peciolo turgente para tiro de cosechadora.', emoji: '🌿' },
          { step: 4, title: 'Fertirriego proporcional con relaciones K/Ca', description: 'Equilibrio catiónico para evitar microfisuras celulares en la corteza de la raíz.', emoji: '💧' }
        ],
        fertilizationNPK: [
          { etapa: 'Iniciación radicular', n: 40, p: 100, k: 70, observaciones: 'Fósforo soluble monopotásico.' },
          { etapa: 'Diferenciación de córtex y médula', n: 80, p: 30, k: 180, observaciones: 'Aporte de Calcio y Magnesio soluble en proporción 4:1.' },
          { etapa: 'Acumulación de carotenoides', n: 20, p: 10, k: 160, observaciones: 'Aporte de Boro y Manganeso quelatados.' }
        ],
        irrigationPlan: 'Riego con sensores FDR continuos manteniendo la matriz del suelo entre -20 y -35 kPa.',
        plagueControl: [
          { name: 'Cercosporiosis de la zanahoria', scientificName: 'Cercospora carotae', type: 'HONGO', symptoms: 'Lesiones circulares necróticas que coalescen en peciolos provocando caída foliar.', treatment: 'Fungicidas estrobirulinas y triazoles rotados.', biologicalControl: 'Biofungicidas con Bacillus subtilis.', emoji: '🍄' },
          { name: 'Pudrición blanda por Sclerotinia', scientificName: 'Sclerotinia sclerotiorum', type: 'HONGO', symptoms: 'Moho blanco algodonoso con esclerocios negros duros en la corona y poscosecha.', treatment: 'Tratamientos de suelo preventivos y ventilación en campo.', biologicalControl: 'Coniothyrium minitans parásito de esclerocios.', emoji: '🦠' }
        ],
        harvestIndicators: 'Lectura con colorímetro HunterLab midiendo valor a* (rojo/naranja) > 35 y brixómetro > 8.5°.',
        postHarvest: 'Cepillado y pulido hidromecánico, túnel de enfriamiento por aire forzado a 0.5°C con 98% HR para almacenamiento por hasta 6 meses sin deshidratación.',
        glossary: [
          { term: 'Splitting', definition: 'Rajado longitudinal o transversal de la zanahoria debido a fluctuaciones bruscas de humedad y turgencia celular.' },
          { term: 'Carotenoides', definition: 'Pigmentos antioxidantes naturales precursores de la vitamina A en la dieta.' }
        ],
        references: ['University of California - Postharvest Technology of Carrot', 'Wageningen UR - Quality and Physiology of Root Crops']
      }
    }
  }
];

export function getCropBySlug(slug: string): Crop | undefined {
  return CROPS_DATA.find((c) => c.slug === slug);
}
