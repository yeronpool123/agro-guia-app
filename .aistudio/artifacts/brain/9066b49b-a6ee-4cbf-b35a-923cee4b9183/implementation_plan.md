# AgroGuía — Plataforma Web para la Comunidad Agrícola (v3.0)

Plataforma agronómica moderna diseñada para pequeños productores, estudiantes y técnicos agropecuarios, que integra manuales técnicos especializados descargables en PDF, diagnóstico fitosanitario y recomendación NPK mediante Cámara con IA (Gemini Vision), y control de acceso seguro sin alertas del navegador, con diseño visual institucional en tonos verde, crema y tierra.

## User Review & Critical Decisions

> [!IMPORTANT]
> Se han incorporado las decisiones clave confirmadas en la fase de clarificación interactiva:

- **Confirmed Decision 1 (Backend & Persistencia)**: Servidor Express integrado con persistencia de datos (usuarios, perfiles, sesiones, auditoría, historial de escaneos y descargas), rate limiting y tokens seguros.
- **Confirmed Decision 2 (Cámara IA)**: Soporte dual para transmisión en vivo mediante cámara web (`getUserMedia`) y carga de imágenes fotográficas de alta resolución, procesadas mediante Gemini 2.5/3.8 Flash Vision con esquema JSON estricto para diagnóstico de especies, estados de salud (Sano, Marchito, Enfermo, Muerto), dosificación NPK y plan de acción.
- **Confirmed Decision 3 (Reglas Innegociables de Experiencia)**:
  1. **Cero `window.alert`**: retroalimentación visual 100% con Toasts modernos (Sonner) y mensajes de validación inline.
  2. **Separación de vistas**: portal público de marketing y captación; catálogo completo, manuales, NPK y cámara IA tras autenticación.
  3. **Generación dinámica de PDFs**: documentos PDF generados al vuelo con contenido botánico real de cada cultivo y nivel (Principiante 🌱, Intermedio 🌿, Avanzado 🌾), con carátula de marca y atribución permanente al **Ing. Yeron Pool Cuero Montaño**.

---

## 1. Overview & Core Concept

- **What It Does**: AgroGuía ofrece a agricultores y técnicos herramientas agronómicas de precisión:
  - Catálogo de 12+ cultivos clave (Papa, Yuca, Maíz, Arroz, Tomate, Café, Cacao, Banano, Fríjol, Pimiento, Lechuga, Zanahoria).
  - 36+ manuales técnicos con requerimientos edafoclimáticos, fenología, planes NPK por etapa y control integrado de plagas.
  - Módulo de Cámara IA que detecta enfermedades foliares y deficiencias nutricionales en segundos con recomendaciones de fertilización.
  - Descargas de manuales e informes fitosanitarios en PDF vectoriales de alta calidad para consulta sin conexión en campo.
- **Target Audience**: Pequeños agricultores, técnicos extensionistas, ingenieros agrónomos, cooperativas agrícolas y estudiantes.
- **Key Value**: Accesibilidad técnica sin jerga innecesaria, operatividad en dispositivos móviles en campo, cero alertas molestas y conocimiento agronómico estructurado y accionable.

---

## 2. User Experience & Visual Design

### Key User Flows

1. **Flujo de Bienvenida & Marketing (Público)**:
   - Topbar limpio de 3 zonas: Isotipo `G` con brote + AgroGuía | Enlaces (Cultivos, Módulos, Cámara IA, Manuales) | Selector de nivel inicial + Botón "Entrar".
   - Hero impactante: *"Cultiva con conocimiento. Cosecha con éxito"* con preview interactiva del escaneo de Maíz y CTAs rápidos.
   - Grid de cultivos destacados con cards limpias (Maíz, Papa, Plátano, Tomate) con indicación de dificultad y botón "Ver manual" que solicita registro o acceso guiado.
   - Resumen de niveles (Principiante 🌱, Intermedio 🌿, Avanzado 🌾), explicación de módulos de plagas (Insecticidas 🐛, Fungicidas 🍄, Herbicidas 🌿, Control biológico 🐞), y muestra de manual PDF.
   - Footer con atribución de autoría al Ing. Yeron Pool Cuero Montaño.

2. **Flujo de Autenticación & Seguridad**:
   - Modales/pantallas de Login y Registro con validación de contraseña en vivo, feedback mediante Toasts elegantes de Sonner y prevención de ataques de fuerza bruta (bloqueo tras 5 intentos).
   - Sin alertas nativas del navegador; interfaz reactiva, fluida y accesible.

3. **Flujo Privado (Dashboard, Catálogo & Fichas)**:
   - Panel de control con métricas de actividad (escaneos realizados, manuales descargados, alertas de suelo).
   - Catálogo interactivo con buscador por nombre científico/común y filtros por familia botánica (Solanaceae, Poaceae, etc.).
   - Ficha detallada con pestañas: Resumen agronómico, Calendario de siembra, Requerimientos de suelo/clima, Plan de fertilización NPK por etapa fenológica, Control de plagas y Descarga de manual en PDF.

4. **Flujo de Cámara IA (Diagnóstico Fitosanitario)**:
   - Interfaz mobile-first basada en la referencia `Módulo Cámara IA`:
     1. Pantalla principal con botón "Abrir cámara" y consejos de encuadre.
     2. Marco de enfoque con mira y botón "Escanear planta".
     3. Animación de análisis ("Analizando planta..." con barra de progreso).
     4. Resultados: Especie + Familia botánica + Confianza (%) + Badge de estado (Sana 🟢, Marchita 🟡, Enferma 🔴, Muerta ⚫) + Recomendación NPK (N, P, K) + Dosis sugerida + Acciones y precauciones + Botones "Guardar escaneo" y "Descargar informe PDF".
   - Historial de escaneos anteriores sincronizado.

### Visual Identity & Theme

- **Palette**:
  - Dominante: `#0F3D2E` (Verde profundo bosque para headers y acentos institucionales)
  - Primario interactivo: `#1B5E3F` y `#2E8B57` (Verde hoja para acciones y estados)
  - Acentos frescos: `#A8D5BA` (Verde menta suave) y `#C5E063` (Verde lima vibrante para CTAs)
  - Lienzo neutral: `#FAF7F0` (Crema cálido orgánico) y `#FFFFFF`
  - Tierra y detalles: `#5C4033` (Marrón tierra)
  - Estados: `#15803D` (Sana/Éxito), `#D97706` (Marchita/Alerta), `#B91C1C` (Enferma/Peligro), `#4B5563` (Muerta)
  - *Prohibición estricta de azules/índigos como colores de marca*.
- **Tipografía**:
  - Títulos & Hero: Plus Jakarta Sans / Playfair Display con jerarquía visual robusta (`font-extrabold`).
  - Cuerpo & Formularios: Inter con legibilidad AA.
  - Tablas & Métricas: Números tabulares monospaciados (`tabular-nums`).
- **Emojis & Iconografía**:
  - Emojis botánicos/naturales forzados a estilo Apple Color Emoji (🌽, 🥔, 🍌, 🍅, ☕, 🍫, 🌾, 🫘, 🫑, 🥬, 🥕, 🐛, 🍄, 🐞, 💧, ☀️).
  - Iconos de navegación e interfaz exclusivamente SVG con Lucide React (Camera, FileText, Download, Shield, Sparkles, User, LogOut, CheckCircle, etc.).

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Full-Stack Express con Vite Middleware**:
  - *Approach*: Servidor Node.js Express montando Vite en desarrollo y sirviendo endpoints API REST para autenticación, gestión de cultivos, generación de PDFs y proxy para Gemini Vision.
  - *Why*: Brinda autenticación real con cookies/sesiones protegidas, seguridad de claves de API (Gemini API Key en backend), auditoría, rate limiting y compatibilidad con el contenedor de desarrollo.
- **Decision 2: Motor de PDFs Autónomo y Renderizado de Documentos Vectoriales**:
  - *Approach*: Generación de PDFs con maquetación estructurada por secciones (portada con branding e isotipo, índice, tablas botánicas NPK, fichas de plagas, glosario y firma de autoría).
  - *Why*: Descargas instantáneas tanto en móviles como en computadoras, sin depender de librerías nativas que puedan fallar en entornos web.
- **Decision 3: Gemini Vision API Integrada en el Servidor**:
  - *Approach*: Endpoint `/api/scan` que recibe la imagen, valida su formato/tamaño, llama a `@google/genai` con modelo multimodal y extrae respuesta estructurada tipada.
  - *Why*: Cumple con las guías de seguridad (cero exposición de claves en cliente) y entrega resultados precisos con fallback controlado.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Cliente Web AgroGuía                            │
│  (React 19 + Tailwind v4 + Lucide React + Sonner Toasts + Apple Emojis)│
└───────────────┬────────────────────────────────────────┬───────────────┘
                │                                        │
        HTTP / Fetch API                         Media Capture API
       (Auth, Crops, PDF)                     (getUserMedia / File Upload)
                │                                        │
┌───────────────▼────────────────────────────────────────▼───────────────┐
│                      Servidor Full-Stack Express                        │
│                           (server.ts :3000)                             │
├────────────────────┬────────────────────┬──────────────────────────────┤
│  Módulo de Auth    │  Módulo Cultivos   │  Módulo Cámara & Diagnóstico │
│  - Hashing Argon2/ │  - 12+ Fichas      │  - Proxy seguro Gemini API   │
│    SHA256          │  - 36 Manuales     │  - Parsing de Diagnóstico,   │
│  - Rate Limiting   │  - Requerimientos  │    NPK y Plan de Acción      │
│  - Audit Logs      │  - Tablas NPK      │  - Historial de Escaneos     │
├────────────────────┴────────────────────┴──────────────────────────────┤
│  Motor de Generación Dinámica de PDFs (Manuales & Informes de Salud)    │
│  - Portada con Isotipo, Atribución, Índice, Tablas NPK, Formato A4     │
├────────────────────────────────────────────────────────────────────────┤
│  Base de Datos y Almacén Persistente                                   │
│  - Usuarios, Sesiones, Preferencias, Descargas, Auditoría, Escaneos   │
└────────────────────────────────────────────────────────────────────────┘
```

### Component & Entity Mapping

- **Auth System**:
  - `/api/auth/register`: Creación de cuenta, validación Zod, hash seguro, prevención de duplicados.
  - `/api/auth/login`: Autenticación, control de 5 intentos fallidos con bloqueo de 15 minutos, generación de sesión.
  - `/api/auth/me` & `/api/auth/logout`: Gestión de estado de sesión.
- **Catálogo & Manuales**:
  - `/api/cultivos`: Listado de los 12 cultivos con metadatos, categoría y niveles.
  - `/api/cultivos/:slug`: Detalle botánico completo y niveles (Principiante, Intermedio, Avanzado).
  - `/api/pdf/manual?cultivo=:slug&nivel=:level`: Generación dinámica del manual PDF por cultivo y nivel.
- **Cámara & Diagnóstico**:
  - `/api/scan`: Procesamiento multimodal con Gemini Vision (`gemini-3.8-flash`), estructura JSON normalizada, almacenamiento en historial.
  - `/api/pdf/informe-escaneo?id=:scanId`: Descarga de informe fitosanitario en PDF con el diagnóstico detallado.

---

## 5. Acceptance Checklist

- [x] Landing page fiel al diseño adjunto con navbar de 3 zonas y hero section con preview de maíz.
- [x] Cero `window.alert()`, `window.confirm()` o `window.prompt()`; Sonner toasts implementados en toda la app.
- [x] Acceso protegido a manuales, módulos técnicos y cámara tras autenticación real con rate limiting.
- [x] Catálogo de 12+ cultivos con fichas completas y 3 niveles técnicos por cultivo.
- [x] Generador de PDFs dinámico específico por cultivo/nivel y para informes de diagnóstico IA con atribución obligatoria al Ing. Yeron Pool Cuero Montaño.
- [x] Módulo de Cámara IA interactivo con captura en vivo, subida de fotos, diagnóstico de salud, plan NPK e historial.
- [x] Emojis estilo Apple Color Emoji e iconos SVG de Lucide React con paleta institucional verde/crema/tierra.
