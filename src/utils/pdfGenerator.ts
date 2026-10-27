import { jsPDF } from 'jspdf';
import { Crop, ExperienceLevel } from '../data/crops';

export interface ScanReportData {
  id: string;
  timestamp: string;
  especie: string;
  nombreCientifico: string;
  familia?: string;
  confianza: number;
  estado: 'SANO' | 'MARCHITO' | 'ENFERMO' | 'MUERTO';
  sintomas: string[];
  posiblePlaga: string | null;
  npk: {
    n: string | number;
    p: string | number;
    k: string | number;
    unidad?: string;
  };
  dosisSugerida?: string;
  planAccion: string[];
  precauciones?: string;
  imagenUrl?: string;
}

export function generateCropManualPDF(crop: Crop, level: ExperienceLevel = 'PRINCIPIANTE') {
  const manual = crop.manuals[level] || crop.manuals.PRINCIPIANTE;
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;

  // Colores de AgroGuía
  const primaryForest = [15, 61, 46]; // #0F3D2E
  const primaryGreen = [46, 139, 87]; // #2E8B57
  const creamBg = [250, 247, 240]; // #FAF7F0
  const earthBrown = [92, 64, 51]; // #5C4033
  const darkText = [30, 41, 34]; // #1E2922
  const limeColor = [197, 224, 99]; // #C5E063

  // Helper para dibujar pie de página
  const drawFooter = (pageNum: number, totalPages: number) => {
    doc.setDrawColor(200, 220, 210);
    doc.setLineWidth(0.3);
    doc.line(margin, pageHeight - 15, pageWidth - margin, pageHeight - 15);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 115, 105);
    doc.text('AgroGuía · Plataforma para la Comunidad Agrícola', margin, pageHeight - 10);
    doc.text(
      `Página ${pageNum} de ${totalPages} · Manual de ${crop.name} (${level})`,
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' }
    );
    doc.text('Ing. Yeron Pool Cuero Montaño', pageWidth - margin, pageHeight - 10, { align: 'right' });
  };

  // Helper para dibujar encabezado en páginas interiores
  const drawHeader = (title: string) => {
    doc.setFillColor(15, 61, 46);
    doc.rect(0, 0, pageWidth, 12, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text('AGROGUÍA — MANUAL TÉCNICO OFICIAL', margin, 8);
    doc.setTextColor(197, 224, 99);
    doc.text(crop.name.toUpperCase(), pageWidth - margin, 8, { align: 'right' });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(15, 61, 46);
    doc.text(title, margin, 24);

    doc.setDrawColor(197, 224, 99);
    doc.setLineWidth(1);
    doc.line(margin, 27, margin + 40, 27);
  };

  // ==================== PÁGINA 1: PORTADA ====================
  // Fondo superior verde profundo
  doc.setFillColor(15, 61, 46);
  doc.rect(0, 0, pageWidth, 120, 'F');

  // Adorno geométrico sutil
  doc.setFillColor(27, 94, 63);
  doc.circle(pageWidth - 20, 20, 45, 'F');
  doc.setFillColor(197, 224, 99);
  doc.circle(pageWidth - 10, 10, 15, 'F');

  // Logo Isotipo y Nombre
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(255, 255, 255);
  doc.text('AgroGuía', margin, 35);
  doc.setTextColor(197, 224, 99);
  doc.text('•', margin + 46, 35);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(168, 213, 186);
  doc.text('GUÍA TÉCNICA Y AGRONÓMICA PARA EL CAMPO', margin, 42);

  // Título del Cultivo
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.setTextColor(255, 255, 255);
  doc.text(manual.title, margin, 70, { maxWidth: contentWidth });

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(14);
  doc.setTextColor(197, 224, 99);
  doc.text(`${crop.scientificName} · Familia ${crop.family}`, margin, 88);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(230, 240, 235);
  doc.text(manual.subtitle, margin, 96, { maxWidth: contentWidth });

  // Tarjeta de Nivel y Metadatos en mitad de página
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(margin, 135, contentWidth, 50, 4, 4, 'F');
  doc.setDrawColor(200, 220, 210);
  doc.roundedRect(margin, 135, contentWidth, 50, 4, 4, 'S');

  // Badge nivel
  doc.setFillColor(15, 61, 46);
  doc.roundedRect(margin + 8, 143, 40, 8, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(197, 224, 99);
  doc.text(`NIVEL ${level}`, margin + 28, 148.5, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 61, 46);
  doc.text('Ficha Resumen del Cultivo', margin + 55, 149);

  // Columnas de metadatos
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(80, 95, 85);
  doc.text(`Categoría:`, margin + 10, 162);
  doc.text(`Ciclo estimado:`, margin + 10, 172);
  doc.text(`Dificultad de manejo:`, contentWidth / 2 + 10, 162);
  doc.text(`Fecha de emisión:`, contentWidth / 2 + 10, 172);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 61, 46);
  doc.text(`${crop.categoryLabel}`, margin + 35, 162);
  doc.text(`${crop.durationDays} días`, margin + 40, 172);
  doc.text(`${crop.difficulty}`, contentWidth / 2 + 48, 162);
  doc.text(`${new Date().toLocaleDateString('es-EC')}`, contentWidth / 2 + 45, 172);

  // Atribución inalienable al autor
  doc.setFillColor(250, 247, 240);
  doc.roundedRect(margin, 205, contentWidth, 42, 4, 4, 'F');
  doc.setDrawColor(168, 213, 186);
  doc.setLineWidth(0.6);
  doc.roundedRect(margin, 205, contentWidth, 42, 4, 4, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 61, 46);
  doc.text('CRÉDITOS Y ATRIBUCIÓN INSTITUCIONAL', margin + 10, 216);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(40, 50, 45);
  const autorText =
    'Plataforma AgroGuía — Conceptualizado y diseñado por el Ing. Yeron Pool Cuero Montaño, Desarrollador Web Full Stack e Ing. de Software. Prohibida la alteración de la atribución de autoría.';
  doc.text(autorText, margin + 10, 224, { maxWidth: contentWidth - 20 });

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(100, 115, 105);
  doc.text('Documento técnico oficial para productores, estudiantes y técnicos agropecuarios.', margin + 10, 240);

  drawFooter(1, 4);

  // ==================== PÁGINA 2: INTRODUCCIÓN Y REQUERIMIENTOS ====================
  doc.addPage();
  drawHeader('1. Introducción y Requerimientos Edafoclimáticos');

  let curY = 36;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 61, 46);
  doc.text('1.1 Introducción Agronómica', margin, curY);

  curY += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(30, 41, 34);
  const introLines = doc.splitTextToSize(manual.introduction, contentWidth);
  doc.text(introLines, margin, curY);
  curY += introLines.length * 5 + 8;

  // Cuadro de clima
  doc.setFillColor(245, 250, 247);
  doc.roundedRect(margin, curY, contentWidth, 48, 3, 3, 'F');
  doc.setDrawColor(168, 213, 186);
  doc.roundedRect(margin, curY, contentWidth, 48, 3, 3, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 61, 46);
  doc.text('1.2 Requerimientos Climáticos Óptimos', margin + 8, curY + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(40, 55, 45);
  doc.text(`• Temperatura óptima: ${manual.climateRequirements.tempOptima}`, margin + 10, curY + 17);
  doc.text(`• Precipitación anual / ciclo: ${manual.climateRequirements.precipitacion}`, margin + 10, curY + 25);
  doc.text(`• Fotoperiodo / Luminosidad: ${manual.climateRequirements.fotoperiodo}`, margin + 10, curY + 33);
  doc.text(`• Altitud recomendada: ${manual.climateRequirements.altitud}`, margin + 10, curY + 41);

  curY += 56;

  // Cuadro de suelos
  doc.setFillColor(250, 247, 240);
  doc.roundedRect(margin, curY, contentWidth, 48, 3, 3, 'F');
  doc.setDrawColor(200, 190, 175);
  doc.roundedRect(margin, curY, contentWidth, 48, 3, 3, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(92, 64, 51);
  doc.text('1.3 Requerimientos de Suelo y Textura', margin + 8, curY + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(50, 45, 40);
  doc.text(`• Rango de pH: ${manual.soilRequirements.ph}`, margin + 10, curY + 17);
  doc.text(`• Textura edáfica: ${manual.soilRequirements.textura}`, margin + 10, curY + 25);
  doc.text(`• Materia orgánica: ${manual.soilRequirements.materiaOrganica}`, margin + 10, curY + 33);
  doc.text(`• Capacidad de drenaje: ${manual.soilRequirements.drenaje}`, margin + 10, curY + 41);

  curY += 56;

  // Preparación del Terreno
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 61, 46);
  doc.text('1.4 Manejo Hídrico y Riego', margin, curY);

  curY += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(30, 41, 34);
  const riegoLines = doc.splitTextToSize(manual.irrigationPlan, contentWidth);
  doc.text(riegoLines, margin, curY);

  drawFooter(2, 4);

  // ==================== PÁGINA 3: SIEMBRA Y PLAN NPK ====================
  doc.addPage();
  drawHeader('2. Establecimiento y Plan de Fertilización NPK');

  curY = 36;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 61, 46);
  doc.text('2.1 Pasos Críticos de Siembra y Establecimiento', margin, curY);

  curY += 6;
  manual.plantingSteps.forEach((st) => {
    doc.setFillColor(245, 250, 247);
    doc.roundedRect(margin, curY, contentWidth, 16, 2, 2, 'F');
    doc.setDrawColor(200, 225, 215);
    doc.roundedRect(margin, curY, contentWidth, 16, 2, 2, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(15, 61, 46);
    doc.text(`Paso ${st.step}: ${st.title}`, margin + 6, curY + 6);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(45, 55, 50);
    const desc = doc.splitTextToSize(st.description, contentWidth - 12);
    doc.text(desc, margin + 6, curY + 11);

    curY += 20;
  });

  curY += 6;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 61, 46);
  doc.text('2.2 Plan de Fertilización NPK por Etapa Fenológica', margin, curY);

  curY += 7;
  // Tabla NPK
  const colWidths = [50, 22, 22, 22, contentWidth - 116];
  const tableX = margin;

  // Header de la tabla
  doc.setFillColor(15, 61, 46);
  doc.rect(tableX, curY, contentWidth, 8, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text('Etapa Fenológica', tableX + 3, curY + 5.5);
  doc.text('N (kg/ha)', tableX + colWidths[0] + 3, curY + 5.5);
  doc.text('P2O5 (kg/ha)', tableX + colWidths[0] + colWidths[1] + 3, curY + 5.5);
  doc.text('K2O (kg/ha)', tableX + colWidths[0] + colWidths[1] + colWidths[2] + 3, curY + 5.5);
  doc.text('Observaciones Agronómicas', tableX + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3] + 3, curY + 5.5);

  curY += 8;

  manual.fertilizationNPK.forEach((npk, idx) => {
    const isEven = idx % 2 === 0;
    doc.setFillColor(isEven ? 255 : 245, isEven ? 255 : 249, isEven ? 255 : 242);
    const obsLines = doc.splitTextToSize(npk.observaciones, colWidths[4] - 6);
    const rowHeight = Math.max(12, obsLines.length * 4.5 + 4);

    doc.rect(tableX, curY, contentWidth, rowHeight, 'F');
    doc.setDrawColor(210, 225, 218);
    doc.rect(tableX, curY, contentWidth, rowHeight, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(20, 30, 25);
    doc.text(npk.etapa, tableX + 3, curY + 6, { maxWidth: colWidths[0] - 6 });

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(15, 61, 46);
    doc.text(`${npk.n}`, tableX + colWidths[0] + 10, curY + 6, { align: 'center' });
    doc.text(`${npk.p}`, tableX + colWidths[0] + colWidths[1] + 10, curY + 6, { align: 'center' });
    doc.text(`${npk.k}`, tableX + colWidths[0] + colWidths[1] + colWidths[2] + 10, curY + 6, { align: 'center' });

    doc.setTextColor(50, 60, 55);
    doc.text(obsLines, tableX + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3] + 3, curY + 5);

    curY += rowHeight;
  });

  drawFooter(3, 4);

  // ==================== PÁGINA 4: SANIDAD VEGETAL Y COSECHA ====================
  doc.addPage();
  drawHeader('3. Control Integrado de Plagas y Cosecha');

  curY = 36;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 61, 46);
  doc.text('3.1 Plagas y Enfermedades Principales', margin, curY);

  curY += 6;
  manual.plagueControl.forEach((pest) => {
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(margin, curY, contentWidth, 32, 2, 2, 'F');
    doc.setDrawColor(220, 210, 200);
    doc.roundedRect(margin, curY, contentWidth, 32, 2, 2, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(15, 61, 46);
    doc.text(`${pest.name} (${pest.scientificName || pest.type})`, margin + 6, curY + 6);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(40, 50, 45);
    doc.text(`• Síntomas: ${pest.symptoms}`, margin + 6, curY + 13, { maxWidth: contentWidth - 12 });
    doc.text(`• Control preventivo/químico: ${pest.treatment}`, margin + 6, curY + 20, { maxWidth: contentWidth - 12 });
    doc.text(`• Control biológico: ${pest.biologicalControl}`, margin + 6, curY + 27, { maxWidth: contentWidth - 12 });

    curY += 36;
  });

  curY += 4;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 61, 46);
  doc.text('3.2 Cosecha y Manejo Poscosecha', margin, curY);

  curY += 6;
  doc.setFillColor(245, 250, 247);
  doc.roundedRect(margin, curY, contentWidth, 24, 2, 2, 'F');
  doc.setDrawColor(168, 213, 186);
  doc.roundedRect(margin, curY, contentWidth, 24, 2, 2, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(15, 61, 46);
  doc.text('Indicadores de madurez y cosecha:', margin + 6, curY + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(30, 40, 35);
  const indLines = doc.splitTextToSize(manual.harvestIndicators, contentWidth - 12);
  doc.text(indLines, margin + 6, curY + 11);

  curY += 28;

  // Glosario y Referencias
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 61, 46);
  doc.text('3.3 Glosario y Referencias Técnicas', margin, curY);

  curY += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(60, 75, 65);
  manual.glossary.slice(0, 2).forEach((g) => {
    doc.text(`• ${g.term}: ${g.definition}`, margin, curY, { maxWidth: contentWidth });
    curY += 7;
  });

  manual.references.slice(0, 2).forEach((r) => {
    doc.text(`Fuente: ${r}`, margin, curY, { maxWidth: contentWidth });
    curY += 5;
  });

  drawFooter(4, 4);

  // Descarga automática en navegador
  const fileName = `AgroGuia_Manual_${crop.slug}_${level.toLowerCase()}.pdf`;
  doc.save(fileName);
  return doc;
}

export function generateScanReportPDF(scan: ScanReportData) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;

  // Encabezado institucional
  doc.setFillColor(15, 61, 46);
  doc.rect(0, 0, pageWidth, 42, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(255, 255, 255);
  doc.text('AgroGuía', margin, 20);
  doc.setTextColor(197, 224, 99);
  doc.text('•', margin + 38, 20);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(168, 213, 186);
  doc.text('INFORME FITOSANITARIO DE DIAGNÓSTICO IA (GEMINI VISION)', margin, 28);
  doc.setTextColor(230, 240, 235);
  doc.text(`Folio ID: ${scan.id} · Fecha: ${scan.timestamp}`, margin, 35);

  let curY = 52;

  // Tarjeta de Resultado Principal
  const isHealthy = scan.estado === 'SANO';
  const isWilted = scan.estado === 'MARCHITO';
  const isDead = scan.estado === 'MUERTO';

  doc.setFillColor(255, 255, 255);
  doc.roundedRect(margin, curY, contentWidth, 45, 3, 3, 'F');
  doc.setDrawColor(200, 220, 210);
  doc.roundedRect(margin, curY, contentWidth, 45, 3, 3, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(15, 61, 46);
  doc.text(scan.especie, margin + 10, curY + 12);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(11);
  doc.setTextColor(92, 64, 51);
  doc.text(
    `${scan.nombreCientifico}${scan.familia ? ` · Familia ${scan.familia}` : ''} · Confianza ${Math.round(scan.confianza > 1 ? scan.confianza : scan.confianza * 100)}%`,
    margin + 10,
    curY + 20
  );

  // Badge de estado de salud
  let badgeColor = [21, 128, 61]; // Sano: verde
  if (isWilted) badgeColor = [217, 119, 6]; // Marchito: amarillo
  if (scan.estado === 'ENFERMO') badgeColor = [185, 28, 28]; // Enfermo: rojo
  if (isDead) badgeColor = [75, 85, 99]; // Muerto: gris

  doc.setFillColor(badgeColor[0], badgeColor[1], badgeColor[2]);
  doc.roundedRect(contentWidth - 15, curY + 8, 30, 9, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text(scan.estado, contentWidth, curY + 14, { align: 'center' });

  // Plaga / sospecha
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(50, 60, 55);
  doc.text(
    `Posible afección / patógeno: ${scan.posiblePlaga || 'Ninguno detectado (planta en estado óptimo)'}`,
    margin + 10,
    curY + 34
  );

  curY += 54;

  // Cuadro de Nutrientes NPK Recomendados
  doc.setFillColor(245, 250, 247);
  doc.roundedRect(margin, curY, contentWidth, 38, 3, 3, 'F');
  doc.setDrawColor(168, 213, 186);
  doc.roundedRect(margin, curY, contentWidth, 38, 3, 3, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 61, 46);
  doc.text('Evaluación Nutricional y Recomendación NPK', margin + 8, curY + 8);

  const blockWidth = (contentWidth - 24) / 3;
  const npkBlocks = [
    { label: 'NITRÓGENO (N)', val: scan.npk.n, col: [46, 139, 87] },
    { label: 'FÓSFORO (P)', val: scan.npk.p, col: [197, 150, 40] },
    { label: 'POTASIO (K)', val: scan.npk.k, col: [92, 64, 51] }
  ];

  npkBlocks.forEach((item, idx) => {
    const xPos = margin + 8 + idx * (blockWidth + 4);
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(xPos, curY + 13, blockWidth, 18, 2, 2, 'F');
    doc.setDrawColor(210, 225, 218);
    doc.roundedRect(xPos, curY + 13, blockWidth, 18, 2, 2, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 115, 105);
    doc.text(item.label, xPos + blockWidth / 2, curY + 19, { align: 'center' });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(item.col[0], item.col[1], item.col[2]);
    doc.text(String(item.val), xPos + blockWidth / 2, curY + 27, { align: 'center' });
  });

  curY += 46;

  // Síntomas observados
  if (scan.sintomas && scan.sintomas.length > 0) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(15, 61, 46);
    doc.text('Síntomas Fisiológicos Observados:', margin, curY);
    curY += 5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(40, 50, 45);
    scan.sintomas.forEach((sym) => {
      doc.text(`• ${sym}`, margin + 4, curY, { maxWidth: contentWidth - 8 });
      curY += 6;
    });
    curY += 4;
  }

  // Plan de acción
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(15, 61, 46);
  doc.text('Plan de Acción Recomendado:', margin, curY);
  curY += 6;

  scan.planAccion.forEach((act, idx) => {
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(margin, curY, contentWidth, 12, 2, 2, 'F');
    doc.setDrawColor(210, 225, 218);
    doc.roundedRect(margin, curY, contentWidth, 12, 2, 2, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(15, 61, 46);
    doc.text(`${idx + 1}.`, margin + 4, curY + 7);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(30, 40, 35);
    const actLines = doc.splitTextToSize(act, contentWidth - 16);
    doc.text(actLines, margin + 10, curY + 7);

    curY += 15;
  });

  if (scan.precauciones) {
    curY += 2;
    doc.setFillColor(254, 242, 242);
    doc.roundedRect(margin, curY, contentWidth, 16, 2, 2, 'F');
    doc.setDrawColor(252, 165, 165);
    doc.roundedRect(margin, curY, contentWidth, 16, 2, 2, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(185, 28, 28);
    doc.text('PRECAUCIONES:', margin + 6, curY + 6);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 20, 20);
    doc.text(scan.precauciones, margin + 35, curY + 6, { maxWidth: contentWidth - 42 });
    curY += 22;
  }

  // Footer institucional
  doc.setDrawColor(200, 220, 210);
  doc.setLineWidth(0.3);
  doc.line(margin, pageHeight - 15, pageWidth - margin, pageHeight - 15);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 115, 105);
  doc.text('AgroGuía · Informe Fitosanitario de Inteligencia Artificial', margin, pageHeight - 10);
  doc.text('Conceptualizado por Ing. Yeron Pool Cuero Montaño', pageWidth - margin, pageHeight - 10, {
    align: 'right'
  });

  const reportFileName = `AgroGuia_Diagnostico_${scan.especie.replace(/\s+/g, '_')}_${scan.id}.pdf`;
  doc.save(reportFileName);
  return doc;
}
