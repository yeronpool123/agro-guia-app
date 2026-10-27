# 🚀 PROMPT MAESTRO DEFINITIVO v3.0 — AGROGUÍA

## Especificación Técnica Enterprise para IA de Desarrollo Full-Stack

**Producto:** AgroGuía — Plataforma Web para la Comunidad Agrícola  
**Autor Original y Conceptualizador:** Ing. Yeron Pool Cuero Montaño — Desarrollador Web Full Stack e Ing. de Software  
**Versión del Prompt:** 3.0 (Perfeccionada, Ampliada y Blindada)  
**Fecha de Liberación:** 2026-10-27  
**Stack Obligatorio:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Prisma · PostgreSQL · NextAuth.js v5  
**Tipo de Documento:** Especificación técnica maestra lista para entregar a una IA de desarrollo (Google AntiGravity, Claude, Cursor, v0, etc.)

---

## 📌 INSTRUCCIONES GENERALES PARA LA IA DE DESARROLLO

Estimado agente IA de desarrollo: vas a construir **desde cero** la aplicación web **AgroGuía**, ideada y conceptualizada por el **Ing. Yeron Pool Cuero Montaño**. Esta especificación reemplaza, perfecciona y corrige cualquier versión anterior (incluida la v2.0 generada por Gemini). Debes cumplir **estricta y literalmente** cada uno de los requerimientos aquí descritos.

**Tres reglas innegociables que rompieron versiones anteriores y que debes eliminar de raíz:**

1. **PROHIBIDO usar `window.alert()`, `window.confirm()` o `window.prompt()` en cualquier parte del código.** El login/registro anterior simulaba la autenticación mostrando un molesto `alert` del navegador. Esto es inaceptable. Toda retroalimentación al usuario debe hacerse con **Toasts modernos de Sonner** y **mensajes inline en los formularios**.
2. **PROHIBIDO mostrar el contenido técnico (manuales, catálogo completo de cultivos, módulos avanzados) en la vista pública.** Toda la información valiosa debe estar **detrás de autenticación real con base de datos**. La vista pública (`/`) es únicamente de marketing y captación de usuarios.
3. **PROHIBIDO usar PDFs genéricos o estáticos.** Cada PDF debe generarse **dinámicamente en el backend** con `@react-pdf/renderer`, con contenido **específico por cultivo y por nivel de experiencia**. Si el usuario descarga el manual de **papa 🥔**, el contenido debe ser 100% sobre papa — no un manual genérico.

**Estándar de emojis (CRÍTICO):**

- Todos los emojis de cultivos, frutas, vegetales, plantas, elementos naturales (🥔🍠🌽🌾🍅☕🍫🍌🫘🌿🌱🍂💧☀️🌧️🪴 etc.) deben renderizarse **exclusivamente en formato Apple (Apple Color Emoji)**, siguiendo el estándar visual de https://emojipedia.org/apple.
- Para garantizar la renderización Apple en todos los dispositivos (incluido Android y Windows), el CSS debe forzar la font-family: `'Apple Color Emoji', 'Segoe UI Emoji', 'Noto Color Emoji', sans-serif;` y, en PDFs generados con `@react-pdf/renderer`, debe registrarse la fuente Apple Color Emoji descargada o embeberse los glyphs correspondientes.
- Los **iconos generales de la app** (navegación, botones, UI, breadcrumbs, acciones) deben ser **iconos SVG** (Lucide React preferido), NO emojis. Esta distinción es obligatoria: **emoji = Apple · icono UI = SVG**.

---

## 📑 ÍNDICE DE CONTENIDO

1. Visión General del Producto
2. Stack Tecnológico Estricto
3. Arquitectura del Sistema y Estructura de Carpetas
4. Sistema de Autenticación Real (Cero Alertas Simuladas)
5. Esquema de Base de Datos (Prisma Schema completo)
6. Separación Estratégica de Vistas (Público vs Privado)
7. Vistas Públicas (Marketing y Adquisición)
8. Vistas Privadas (Protegidas tras Autenticación)
9. Motor Dinámico de Generación de PDFs
10. Catálogo Maestro de Cultivos (12+ cultivos)
11. Módulo de Cámara con IA (VLM + WebSocket)
12. Estándar de Emojis Apple vs Iconos SVG
13. Sistema de Diseño Visual
14. Ciberseguridad y Hardening (OWASP Top 10 2021)
15. Performance, SEO, Accesibilidad y PWA
16. Variables de Entorno
17. Estrategia de Testing
18. Despliegue, Monitoreo y DevOps
19. Criterios de Aceptación (Definition of Done)
20. Entregables Finales por Archivo

---

## 1. 🎯 VISIÓN GENERAL DEL PRODUCTO

### 1.1 Propósito

AgroGuía es una plataforma web full-stack diseñada para **empoderar a la comunidad agrícola** (pequeños productores, técnicos agropecuarios, estudiantes de agronomía, extensionistas rurales y público interesado en agricultura) mediante:

- **Manuales técnicos descargables en PDF** específicos por cultivo y nivel de experiencia (Principiante 🌱, Intermedio 🌿, Avanzado 🌾).
- **Diagnóstico con IA** a través de la cámara del dispositivo para identificar especies, evaluar el estado de salud (sana/marchita/enferma/muerta) y recomendar un plan de fertilización NPK.
- **Base de conocimiento estructurada** sobre plagas, enfermedades, herbicidas, fungicidas, insecticidas y control biológico.
- **Historial personalizado** de escaneos y descargas para cada usuario autenticado.

### 1.2 Principios de Diseño

- **Mobile-first y responsive:** la mayoría de los usuarios accederán desde smartphones Android/iPhone en campo.
- **Offline-tolerant:** la app debe ser instalable como PWA y cachear el catálogo de cultivos descargado para consulta sin conexión.
- **Accesible:** cumplimiento WCAG 2.1 nivel AA.
- **Internacionalizable:** arquitectura preparada para i18n (es-EC como idioma por defecto, con ganchos para es-MX, es-CO, es-PE futuros).
- **Segura por diseño:** aplicación del OWASP Top 10 2021 desde el primer commit.

### 1.3 Atribución de Autoría

Toda la documentación, los PDFs generados, el footer de la aplicación y los metadatos deben incluir la atribución permanente:

> **AgroGuía** — Conceptualizado y diseñado por el **Ing. Yeron Pool Cuero Montaño**, Desarrollador Web Full Stack e Ing. de Software.

Esta atribución no puede ser removida, ocultada ni alterada por configuración del usuario.

---

## 2. 🧱 STACK TECNOLÓGICO ESTRICTO

### 2.1 Frontend

| Componente | Tecnología | Versión mínima |
|---|---|---|
| Framework | Next.js | 16.x (App Router) |
| Lenguaje | TypeScript | 5.x (Strict Mode) |
| Estilos | Tailwind CSS | v4 |
| Componentes UI | shadcn/ui (New York) | última |
| Primitivas | Radix UI | última |
| Iconos SVG | Lucide React | última |
| Formularios | React Hook Form + Zod | última |
| Notificaciones | Sonner | última |
| Tablas de datos | TanStack Table v8 | última |
| Gráficas | Recharts | última |
| Fuentes | next/font (Inter + Playfair Display) | — |

### 2.2 Backend

| Componente | Tecnología |
|---|---|
| Runtime | Node.js 20 LTS |
| ORM | Prisma ORM 5.x |
| Base de datos | PostgreSQL 16 (producción) · SQLite (desarrollo local) |
| Autenticación | NextAuth.js v5 (Auth.js) |
| Hashing de contraseñas | argon2id (preferido) o bcrypt con cost factor ≥ 12 |
| Validación | Zod (compartido cliente/servidor) |
| Rate limiting | rate-limiter-flexible |
| Sanitización HTML | DOMPurify + isomorphic-dompurify |
| Generación de PDFs | @react-pdf/renderer (server-side) |
| WebSocket IA | ws + z-ai-web-dev-sdk (VLM) |
| Logs estructurados | pino + pino-pretty |
| Métricas | @vercel/otel |

### 2.3 DevOps y Testing

| Componente | Tecnología |
|---|---|
| Container | Docker + docker-compose |
| CI/CD | GitHub Actions |
| Tests unitarios | Vitest |
| Tests e2e | Playwright |
| Linting | ESLint + Prettier + eslint-plugin-security |
| Análisis estático | TypeScript Strict + @typescript-eslint |
| Calidad de código | SonarQube Scanner (opcional) |
| Monitoreo de errores | Sentry |

### 2.4 Restricciones de Color (NO negociable)

**Paleta oficial de AgroGuía:**

```css
--color-primary-900: #0F3D2E; /* Verde bosque profundo (headers, footer) */
--color-primary-700: #1B5E3F; /* Verde institucional (botones primarios) */
--color-primary-500: #2E8B57; /* Verde hoja (acentos, links) */
--color-primary-300: #A8D5BA; /* Verde menta (fondos suaves) */
--color-neutral-cream: #FAF7F0; /* Crema (fondos de tarjetas) */
--color-accent-earth: #5C4033; /* Marrón tierra (detalles) */
--color-danger: #B91C1C; /* Alertas críticas */
--color-warning: #D97706; /* Advertencias */
--color-success: #15803D; /* Confirmaciones */
```

**Prohibido absolutamente: usar tonos azul (#2563EB) o índigo (#4F46E5) como colores primarios o de marca.** La paleta debe respetar exclusivamente el espectro verde-tierra-crema. Esto refuerza la identidad agronómica del producto.

---

## 3. 🗂️ ARQUITECTURA DEL SISTEMA Y ESTRUCTURA DE CARPETAS

### 3.1 Estructura de Carpetas (App Router)

```
agroguia/
├── app/
│   ├── (public)/                     # Route group público (sin auth)
│   │   ├── layout.tsx                # Layout público (nav + footer marketing)
│   │   ├── page.tsx                  # Landing page
│   │   ├── about/page.tsx            # ¿Qué es AgroGuía?
│   │   ├── login/page.tsx            # Inicio de sesión
│   │   ├── registro/page.tsx         # Crear cuenta
│   │   ├── verificar-email/page.tsx  # Confirmación de email
│   │   ├── forgot-password/page.tsx  # Solicitar reseteo
│   │   └── reset-password/page.tsx   # Definir nueva contraseña
│   │
│   ├── (protected)/                  # Route group privado (requiere auth)
│   │   ├── layout.tsx                # Layout privado (sidebar + topbar)
│   │   ├── dashboard/page.tsx        # Panel principal tras login
│   │   ├── cultivos/
│   │   │   ├── page.tsx              # Catálogo de cultivos
│   │   │   └── [slug]/
│   │   │       ├── page.tsx          # Ficha del cultivo
│   │   │       └── pdf/page.tsx      # Vista previa del PDF
│   │   ├── camara-ia/page.tsx        # Módulo de cámara con VLM
│   │   ├── plagas/page.tsx           # Control de plagas y enfermedades
│   │   ├── fertilizacion/page.tsx    # Planes NPK
│   │   ├── historial/page.tsx        # Historial de escaneos y descargas
│   │   ├── perfil/page.tsx           # Edición de perfil
│   │   └── ajustes/page.tsx          # Configuración de cuenta
│   │
│   ├── api/
│   │   ├── auth/
│   │   │   ├── [...nextauth]/route.ts
│   │   │   ├── register/route.ts
│   │   │   ├── verify-email/route.ts
│   │   │   ├── forgot-password/route.ts
│   │   │   └── reset-password/route.ts
│   │   ├── cultivos/
│   │   │   ├── route.ts              # GET /api/cultivos
│   │   │   └── [slug]/route.ts       # GET /api/cultivos/[slug]
│   │   ├── pdf/
│   │   │   └── [recurso]/route.ts    # GET /api/pdf/[recurso]?cultivo=slug&nivel=...
│   │   ├── scan/
│   │   │   ├── route.ts              # POST /api/scan (subida de imagen)
│   │   │   └── ws/route.ts           # WebSocket upgrade para VLM
│   │   ├── historial/
│   │   │   ├── route.ts              # GET /api/historial
│   │   │   └── [id]/route.ts         # DELETE /api/historial/[id]
│   │   ├── perfil/route.ts           # GET/PUT /api/perfil
│   │   └── health/route.ts           # GET /api/health (status check)
│   │
│   ├── layout.tsx                   # Root layout (fonts, ThemeProvider, Toaster)
│   ├── globals.css                  # Tailwind v4 + design tokens
│   ├── not-found.tsx                # 404 personalizado
│   ├── error.tsx                    # Error boundary
│   └── loading.tsx                  # Skeleton global
│
├── components/
│   ├── ui/                          # shadcn/ui (button, card, dialog, etc.)
│   ├── auth/
│   │   ├── login-form.tsx
│   │   ├── register-form.tsx
│   │   ├── forgot-password-form.tsx
│   │   ├── reset-password-form.tsx
│   │   └── social-buttons.tsx
│   ├── cultivos/
│   │   ├── crop-card.tsx
│   │   ├── crop-grid.tsx
│   │   ├── crop-detail.tsx
│   │   ├── level-selector.tsx
│   │   └── download-pdf-button.tsx
│   ├── pdf/
│   │   ├── pdf-document.tsx         # Componente base de @react-pdf/renderer
│   │   ├── pdf-cover.tsx
│   │   ├── pdf-header.tsx
│   │   ├── pdf-footer.tsx
│   │   ├── pdf-section.tsx
│   │   ├── pdf-npk-table.tsx
│   │   └── pdf-pest-table.tsx
│   ├── camera/
│   │   ├── camera-capture.tsx
│   │   ├── diagnosis-result.tsx
│   │   └── npk-recommendation.tsx
│   ├── shared/
│   │   ├── brand-logo.tsx
│   │   ├── brand-footer.tsx
│   │   ├── sonner-toaster.tsx
│   │   └── apple-emoji.tsx          # Wrapper que fuerza font-family Apple
│   └── marketing/
│       ├── hero-section.tsx
│       ├── features-grid.tsx
│       ├── crops-preview.tsx
│       └── cta-register.tsx
│
├── lib/
│   ├── auth.ts                      # Configuración de NextAuth
│   ├── auth-options.ts
│   ├── prisma.ts                     # Cliente Prisma singleton
│   ├── pdf-engine.ts                # Lógica de generación de PDFs
│   ├── pdf-content/                 # Contenido editorial por cultivo
│   │   ├── papa.ts
│   │   ├── yuca.ts
│   │   ├── maiz.ts
│   │   ├── arroz.ts
│   │   ├── tomate.ts
│   │   ├── cafe.ts
│   │   ├── cacao.ts
│   │   ├── banano.ts
│   │   ├── frijol.ts
│   │   ├── pimiento.ts
│   │   ├── lechuga.ts
│   │   └── zanahoria.ts
│   ├── rate-limit.ts
│   ├── validators/
│   │   ├── auth.ts                  # Esquemas Zod de auth
│   │   ├── cultivos.ts
│   │   └── scan.ts
│   ├── security/
│   │   ├── csp.ts                   # Content Security Policy
│   │   ├── headers.ts               # Helmet-like headers
│   │   ├── sanitize.ts              # DOMPurify wrappers
│   │   └── csrf.ts
│   ├── email/
│   │   ├── templates/
│   │   └── sender.ts                # Resend/Nodemailer
│   ├── vlm-client.ts                # Cliente de z-ai-web-dev-sdk (VLM)
│   ├── logger.ts                    # Pino logger
│   └── utils.ts                     # cn() y helpers
│
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts                      # Seed con catálogo de cultivos
│   └── migrations/
│
├── public/
│   ├── logo.svg                      # Logotipo oficial
│   ├── logo-isotipo.svg             # Isotipo para PDFs
│   ├── icons/                       # SVG icons (no emojis)
│   ├── apple-color-emoji.ttf        # Fuente Apple Color Emoji (para PDFs)
│   ├── og-image.png
│   ├── manifest.webmanifest
│   └── robots.txt
│
├── types/
│   ├── next-auth.d.ts               # Extiende Session con campos personalizados
│   ├── pdf.d.ts
│   └── index.ts
│
├── middleware.ts                    # Protección de rutas (auth + rate limit)
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── .env.example
├── .env.local                       # (gitignored)
├── Dockerfile
├── docker-compose.yml
└── README.md
```

### 3.2 Patrones Arquitectónicos Obligatorios

- **Server Components por defecto:** todas las páginas deben ser Server Components. Solo se marcan como `"use client"` los componentes con interactividad (formularios, captura de cámara, sliders).
- **Colocación de datos:** la obtención de datos debe hacerse en Server Components o Server Actions, nunca en `useEffect`.
- **Server Actions:** para formularios de mutación (registro, login, edición de perfil) usar Server Actions con `revalidatePath`.
- **Route Groups:** los grupos `(public)` y `(protected)` permiten layouts distintos sin afectar la URL.
- **Carga diferida:** todos los módulos pesados (cámara, visor de PDF) deben cargarse con `next/dynamic` y `ssr: false` cuando aplique.

---

## 4. 🔐 SISTEMA DE AUTENTICACIÓN REAL (CERO ALERTAS SIMULADAS)

### 4.1 Diagnóstico del Problema Anterior

La versión generada por Google AntiGravity 2.0 presentaba un defecto crítico: el formulario de login no autenticaba realmente al usuario. En su lugar, ejecutaba un `window.alert("Bienvenido")` simulando un inicio de sesión exitoso. Esto:

- No persiste ninguna sesión.
- No valida credenciales contra base de datos.
- Bloquea el acceso a funcionalidades protegidas reales.
- Genera una UX arcaica e informal (alerts nativos del navegador ya no se usan en producción).

### 4.2 Solución Definitiva

Implementar **NextAuth.js v5 (Auth.js)** con **Credentials Provider** conectado a **Prisma + PostgreSQL/SQLite**, con sesiones **JWT firmadas**, cookies **httpOnly + secure + sameSite=lax**, y feedback visual con **Sonner**.

#### 4.2.1 Configuración de NextAuth (`lib/auth.ts`)

```typescript
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import argon2 from "argon2";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/validators/auth";
import { rateLimit } from "@/lib/rate-limit";

const MAX_ATTEMPTS = 5;
const LOCK_MINUTES = 15;

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 7 }, // 7 días
  pages: {
    signIn: "/login",
    error: "/login",
    verifyUser: "/verificar-email",
  },
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(raw) {
        const parsed = loginSchema.safeParse(raw);
        if (!parsed.success) return null;
        const { email, password } = parsed.data;

        // 1. Rate limit por IP + email (previene brute force)
        const rl = await rateLimit(`login:${email}`, MAX_ATTEMPTS, LOCK_MINUTES * 60);
        if (!rl.ok) {
          throw new Error("Demasiados intentos. Cuenta bloqueada 15 min.");
        }

        // 2. Buscar usuario
        const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
        if (!user || !user.passwordHash) return null;

        // 3. Verificar bloqueo por intentos fallidos
        if (user.lockedUntil && user.lockedUntil > new Date()) {
          throw new Error("Cuenta temporalmente bloqueada.");
        }

        // 4. Verificar email confirmado
        if (!user.emailVerified) {
          throw new Error("Debes verificar tu correo antes de iniciar sesión.");
        }

        // 5. Verificar contraseña con argon2id
        const valid = await argon2.verify(user.passwordHash, password);
        if (!valid) {
          await prisma.user.update({
            where: { id: user.id },
            data: {
              failedLoginCount: { increment: 1 },
              lockedUntil: user.failedLoginCount + 1 >= MAX_ATTEMPTS
                ? new Date(Date.now() + LOCK_MINUTES * 60 * 1000)
                : null,
            },
          });
          return null;
        }

        // 6. Resetear contadores y registrar login
        await prisma.user.update({
          where: { id: user.id },
          data: { failedLoginCount: 0, lockedUntil: null, lastLoginAt: new Date() },
        });
        await prisma.auditLog.create({
          data: { userId: user.id, action: "LOGIN_SUCCESS", ip: rl.ip ?? "unknown" },
        });

        return { id: user.id, email: user.email, name: user.name, role: user.role };
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  cookies: {
    sessionToken: {
      name: "__Secure-authjs.session-token",
      options: { httpOnly: true, sameSite: "lax", secure: true, path: "/" },
    },
  },
});
```

#### 4.2.2 Endpoint de Registro (`app/api/auth/register/route.ts`)

Debe implementar:

1. Validación con esquema Zod `registerSchema` (email válido, password ≥ 8 chars con al menos 1 mayúscula, 1 número, 1 símbolo).
2. Verificación de email único en base de datos.
3. Hashing con `argon2.hash(password, { type: argon2.argon2id })`.
4. Creación del usuario con `emailVerified: null`.
5. Generación de token de verificación (crypto.randomUUID hasheado).
6. Envío de email de verificación con enlace firmado.
7. Respuesta JSON `{ ok: true, message: "Revisa tu correo para verificar tu cuenta" }`.
8. Toast de éxito en el cliente (`toast.success("Cuenta creada. Revisa tu email.")`).

#### 4.2.3 Middleware de Protección de Rutas (`middleware.ts`)

```typescript
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

const PUBLIC_PATHS = ["/", "/about", "/login", "/registro", "/forgot-password",
  "/reset-password", "/verificar-email", "/api/auth"];

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isPublic = PUBLIC_PATHS.some(p => pathname.startsWith(p));

  if (!isPublic && !req.auth) {
    const url = new URL("/login", req.nextUrl.origin);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};
```

#### 4.2.4 Componente de Formulario de Login (Cliente)

Requisitos visuales y funcionales:

- Construido con `react-hook-form` + `zodResolver`.
- Inputs con labels visibles, iconos SVG (Lucide) a la izquierda, y toggle de mostrar/ocultar contraseña.
- Validación inline en blur: si el email es inválido, mostrar mensaje rojo bajo el input.
- Botón de submit con estado `loading` (spinner SVG, NO alert).
- En caso de error, mostrar `toast.error()` de Sonner con el mensaje específico (credenciales incorrectas, cuenta bloqueada, email no verificado).
- En caso de éxito, redirigir a `/dashboard` con `router.push()` y mostrar `toast.success("Sesión iniciada. ¡Bienvenido a AgroGuía!")`.
- Opción de login social con Google (botón con icono SVG de Google).
- Link a "¿Olvidaste tu contraseña?" y "¿No tienes cuenta? Regístrate".

**PROHIBIDO en este y todos los formularios:** cualquier llamada a `window.alert`, `window.confirm`, `window.prompt`, o uso de `alert()` suelto. Toda retroalimentación debe ser Sonner o inline.

#### 4.2.5 Flujos Adicionales Obligatorios

- **Verificación de email:** tras registro, el usuario recibe email con enlace `/verificar-email?token=xxx`. Al visitar, el backend valida el token, marca `emailVerified = new Date()`, y muestra vista de éxito con CTA a login.
- **Recuperación de contraseña:** `/forgot-password` envía email con token de un solo uso (válido 1 hora). `/reset-password?token=xxx` permite definir nueva contraseña (con confirmación).
- **Bloqueo por fuerza bruta:** tras 5 intentos fallidos consecutivos, la cuenta se bloquea 15 minutos (`lockedUntil` en la BD).
- **Cerrar sesión:** botón en el sidebar privado que ejecuta `signOut()` y redirige a `/`.
- **Auditoría:** toda acción sensible (login, logout, reset password, descarga de PDF) se registra en la tabla `AuditLog` con IP y user-agent.

---

## 5. 🗄️ ESQUEMA DE BASE DE DATOS (PRISMA SCHEMA COMPLETO)

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = ["postgresql", "sqlite"]
  url      = env("DATABASE_URL")
}

enum UserRole {
  USER
  EDITOR
  ADMIN
}

enum ExperienceLevel {
  PRINCIPIANTE
  INTERMEDIO
  AVANZADO
}

enum CropCategory {
  TUBERCULO
  CEREAL
  LEGUMINOSA
  FRUTAL
  HORTALIZA
  INDUSTRIAL
  RAIZ
}

enum ScanStatus {
  SANO
  MARCHITO
  ENFERMO
  MUERTO
  DESCONOCIDO
}

model User {
  id                  String    @id @default(cuid())
  name                String
  email               String    @unique
  passwordHash        String?
  emailVerified       DateTime?
  image               String?
  role                UserRole  @default(USER)
  failedLoginCount    Int       @default(0)
  lockedUntil         DateTime?
  lastLoginAt         DateTime?
  createdAt           DateTime  @default(now())
  updatedAt           DateTime  @updatedAt
  scans               Scan[]
  downloads           Download[]
  auditLogs           AuditLog[]
  preferences         UserPreference?
  
  @@index([email])
}

model UserPreference {
  id              String   @id @default(cuid())
  userId          String   @unique
  preferredLevel  ExperienceLevel @default(PRINCIPIANTE)
  notifications   Boolean  @default(true)
  language        String   @default("es-EC")
  darkMode        Boolean  @default(false)
  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Crop {
  id              String   @id @default(cuid())
  slug            String   @unique   // "papa", "yuca", "maiz"
  name            String              // "Papa"
  scientificName String              // "Solanum tuberosum"
  emoji           String              // "🥔"
  category        CropCategory
  icon            String?             // path a imagen adicional
  shortDescription String
  durationDays   Int                 // ciclo de cultivo en días
  createdAt       DateTime @default(now())
  updatedAt      DateTime @updatedAt
  manuals         Manual[]
  scans           Scan[]
  
  @@index([slug])
}

model Manual {
  id              String   @id @default(cuid())
  cropId          String
  level           ExperienceLevel
  title           String
  subtitle        String
  introduction    String
  climateRequirements String
  soilRequirements   String
  plantingSteps      Json    // Array de { step, description, emoji }
  fertilizationNPK   Json    // Tabla NPK por etapa fenológica
  irrigationPlan     String
  plagueControl      Json    // Array de plagues { name, symptoms, treatment, emoji }
  harvestIndicators  String
  postHarvest        String
  glossary           Json
  references         Json
  createdAt          DateTime @default(now())
  updatedAt          DateTime @updatedAt
  crop               Crop     @relation(fields: [cropId], references: [id], onDelete: Cascade)
  downloads          Download[]
  
  @@unique([cropId, level])
}

model Scan {
  id              String     @id @default(cuid())
  userId          String
  cropId          String?
  imageData       String       // URL o base64
  detectedSpecies String?
  confidence       Float?
  status          ScanStatus
  npkRecommendation Json?
  planAction      String?
  notes           String?
  createdAt       DateTime   @default(now())
  user            User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  crop            Crop?      @relation(fields: [cropId], references: [id])
  
  @@index([userId, createdAt])
}

model Download {
  id          String   @id @default(cuid())
  userId      String
  manualId    String
  format      String   @default("pdf")
  createdAt   DateTime @default(now())
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  manual      Manual   @relation(fields: [manualId], references: [id], onDelete: Cascade)
  
  @@index([userId])
  @@unique([userId, manualId])
}

model AuditLog {
  id        String   @id @default(cuid())
  userId    String?
  action    String   // LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT, DOWNLOAD_PDF, ...
  ip        String?
  userAgent String?
  metadata  Json?
  createdAt DateTime @default(now())
  user      User?    @relation(fields: [userId], references: [id])
  
  @@index([userId, createdAt])
}

model PasswordResetToken {
  id        String   @id @default(cuid())
  email     String
  token     String   @unique
  expires   DateTime
  used      Boolean  @default(false)
  createdAt DateTime @default(now())
  
  @@index([email])
}

model EmailVerificationToken {
  id        String   @id @default(cuid())
  email     String
  token     String   @unique
  expires   DateTime
  used      Boolean  @default(false)
  createdAt DateTime @default(now())
  
  @@index([email])
}
```

### 5.1 Seed Obligatorio

El archivo `prisma/seed.ts` debe poblar **al menos 12 cultivos** con sus 3 niveles de manuales cada uno (36 manuales mínimo) usando los datos definidos en `lib/pdf-content/*.ts`. Cada manual debe contener datos botánicos reales y verificables (no placeholders tipo "Lorem ipsum").

---

## 6. 🚪 SEPARACIÓN ESTRATÉGICA DE VISTAS (PÚBLICO VS PRIVADO)

### 6.1 Principio Fundamental

La vista pública (`/` y rutas del route group `(public)`) es **exclusivamente de marketing y captación**. Toda la información técnica valiosa (catálogo completo de cultivos, manuales, módulos avanzados, historial, IA de cámara) debe estar **detrás de autenticación**.

### 6.2 Lo Permitido en Vista Pública

- Hero section con propuesta de valor de AgroGuía.
- Sección "¿Qué es AgroGuía?" con 3-4 beneficios clave.
- Vista previa limitada de 3-4 cultivos (solo nombre, emoji, categoría, descripción corta — **sin acceso al manual**).
- Mención superficial de nutrientes (N, P, K) y su importancia, **sin entrar en tablas técnicas completas**.
- Sección "Cómo funciona" con 3 pasos ilustrados.
- Testimonios (placeholder).
- CTA imperativo: "Crea tu cuenta gratuita" / "Inicia sesión".
- Footer con atribución de autoría.

### 6.3 Lo Prohibido en Vista Pública

- Catálogo completo de cultivos.
- Manuales descargables.
- Módulo de cámara con IA.
- Planes NPK detallados.
- Tablas de plagas y enfermedades.
- Historial de escaneos.
- Cualquier contenido técnico profundo.

### 6.4 Vista Privada (Tras Login)

Accesible solo con sesión válida, incluye:

- **Dashboard:** resumen personalizado (cultivos favoritos, último escaneo, descargas recientes, accesos rápidos).
- **Catálogo de Cultivos:** grid completo con buscador y filtros por categoría y nivel.
- **Detalle del Cultivo:** ficha completa + selector de nivel + botón "Descargar Manual PDF".
- **Cámara IA:** interfaz de captura + diagnóstico + recomendación NPK.
- **Plagas:** base de conocimiento navegable.
- **Fertilización:** planes NPK por cultivo.
- **Historial:** lista cronológica de escaneos y descargas del usuario.
- **Perfil:** edición de datos, cambio de contraseña, preferencias (nivel preferido, idioma, dark mode).
- **Ajustes:** gestión de sesión, eliminación de cuenta (RGPD-friendly).

---

## 7. 🌐 VISTAS PÚBLICAS (MARKETING Y ADQUISICIÓN)

### 7.1 Landing Page (`app/(public)/page.tsx`)

Estructura (top to bottom):

1. **Navbar público** — Logo SVG + links "Inicio", "¿Qué es?", "Cultivos" (ancla a preview), "Iniciar sesión" (outline button), "Crear cuenta" (primary button).
2. **Hero section** — Headline grande: *"AgroGuía — Conocimiento agrícola al alcance de tu mano"*. Subheadline. Botones CTA: "Crear cuenta gratuita" + "Ver demo". Imagen/illustración de fondo (campo agrícola).
3. **Trust badges** — "+12 cultivos · +36 manuales técnicos · IA de diagnóstico · 100% gratis".
4. **Sección "¿Qué es AgroGuía?"** — 3 tarjetas con iconos SVG (Book, Camera, Sprout) y descripción breve.
5. **Preview de cultivos** — 4 tarjetas con emoji Apple grande, nombre, categoría y descripción de 1 línea. Card con overlay "Disponible tras registro" y botón "Crear cuenta para ver el manual".
6. **Sección "Cómo funciona"** — 3 pasos: 1) Crea tu cuenta, 2) Explora los cultivos, 3) Descarga manuales o usa la IA.
7. **Sección NPK superficial** — 3 tarjetas: N (Nitrógeno) 🌿, P (Fósforo) 🌱, K (Potasio) 🍂 — descripción breve de cada uno. CTA: "Conoce los planes NPK completos por cultivo — regístrate".
8. **Testimonios** — 3 cards con avatar, nombre, rol (Productor, Estudiante, Técnico), cita.
9. **CTA final** — Banner verde con "Únete a la comunidad agrícola de AgroGuía" y botón "Crear cuenta gratuita".
10. **Footer público** — Logo + atribución de autoría + links legales (Términos, Privacidad) + año.

### 7.2 Página "¿Qué es?" (`/about`)

- Historia del proyecto, misión, visión.
- Atribución destacada del Ing. Yeron Pool Cuero Montaño.
- Stack tecnológico usado (transparencia).
- Compromiso con la comunidad agrícola.

### 7.3 Páginas de Auth (`/login`, `/registro`, etc.)

- Layout minimalista centrado, sin navbar completo.
- Card con logo, título, formulario, link de alt.
- Toasts para feedback.

---

## 8. 🔒 VISTAS PRIVADAS (PROTEGIDAS TRAS AUTENTICACIÓN)

### 8.1 Layout Privado (`app/(protected)/layout.tsx`)

- **Sidebar fijo** (desktop) / **Drawer** (mobile) con: 
  - Logo (clicable a dashboard)
  - Nav items (iconos SVG Lucide + label): Dashboard 🏠, Cultivos 🌱, Cámara IA 📷, Plagas 🐛, Fertilización 💧, Historial 📚, Perfil 👤, Ajustes ⚙️, Cerrar sesión 🚪
  - Footer del sidebar con nombre del usuario y avatar.
- **Topbar** con: breadcrumb actual, buscador global (cmd+k), notificaciones, toggle dark mode, avatar menu.
- **Main content** con padding y max-width.
- **Toaster** Sonner montado.

### 8.2 Dashboard (`/dashboard`)

- Saludo personalizado: "Hola, {name} 👋".
- 4 KPI cards: Cultivos disponibles, Manuales descargados, Último escaneo, Plan NPK recomendado.
- Sección "Continúa donde lo dejaste" (últimos 3 cultivos visitados).
- Sección "Recomendado para ti" (basado en nivel preferido).
- Accesos rápidos: "Escanear cultivo", "Descargar manual", "Ver historial".

### 8.3 Catálogo de Cultivos (`/cultivos`)

- Header con título + descripción.
- Buscador por nombre.
- Filtros: categoría (tubérculo, cereal, frutal, etc.), nivel (principiante/intermedio/avanzado).
- Grid responsivo de tarjetas (`CropCard`):
  - Emoji Apple grande arriba (🥔🌽🍠...)
  - Nombre del cultivo
  - Nombre científico (itálico)
  - Categoría badge
  - Descripción corta
  - Ciclo de cultivo (días)
  - Botón "Ver ficha"
- Paginación o infinite scroll.

### 8.4 Ficha del Cultivo (`/cultivos/[slug]`)

- Header con emoji grande, nombre, científico, categoría, badge de ciclo.
- Tabs: Resumen · Manual · Plagas · Fertilización · Galería.
- Selector de nivel: 3 pills (Principiante 🌱 · Intermedio 🌿 · Avanzado 🌾) — cambia el contenido dinámicamente.
- Botón destacado "⬇️ Descargar Manual PDF" que llama a `/api/pdf/[recurso]?cultivo={slug}&nivel={level}` y dispara la descarga.
- Sección de "Manuales relacionados".

### 8.5 Módulo Cámara IA (`/camara-ia`)

- Vista de cámara full-screen en mobile, panel lateral en desktop.
- Botón grande "Iniciar cámara" → pide permiso `getUserMedia`.
- Frame de captura con overlay de guía (cuadrado con esquinas).
- Botón "📸 Capturar" o "📤 Subir imagen" (alternativa).
- Loader con spinner durante el análisis VLM (3-8 segundos).
- Resultado estructurado:
  - Especie detectada: "Papa (Solanum tuberosum)" + emoji 🥔
  - Confianza: 92% con barra de progreso
  - Estado de salud: badge coloreado (Sana=verde / Marchita=amarillo / Enferma=rojo / Muerta=gris)
  - Recomendación NPK: 3 mini-cards (N, P, K) con dosis sugerida
  - Plan de acción: lista numerada de pasos
  - Botones: "Guardar en historial", "Descargar informe PDF", "Escanear otra"

### 8.6 Historial (`/historial`)

- Tabs: Escaneos · Descargas.
- Lista cronológica con filtros por cultivo y fecha.
- Cada item: thumbnail, cultivo, fecha, acción, botones (ver, descargar, eliminar).
- Vacío state: ilustración + CTA "Realiza tu primer escaneo".

### 8.7 Perfil (`/perfil`)

- Formulario de edición de datos (nombre, email, avatar).
- Sección "Cambiar contraseña".
- Sección "Preferencias" (nivel preferido, idioma, dark mode, notificaciones).
- Sección "Eliminar cuenta" (con confirmación por email).

---

## 9. 📄 MOTOR DINÁMICO DE GENERACIÓN DE PDFs

### 9.1 Requisito Crítico

Cada PDF debe generarse **al vuelo en el backend** cuando el usuario hace clic en "Descargar Manual PDF". No existen PDFs precompilados ni genéricos. Cada PDF es **específico al cultivo y al nivel seleccionado**.

### 9.2 Endpoint de Generación

```typescript
// app/api/pdf/[recurso]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { renderToBuffer } from "@react-pdf/renderer";
import { PDFDocument } from "@/components/pdf/pdf-document";
import { getCropManualContent } from "@/lib/pdf-engine";
import { rateLimit } from "@/lib/rate-limit";

export async function GET(
  req: NextRequest,
  { params }: { params: { recurso: string } }
) {
  // 1. Auth requerida
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  // 2. Rate limit: 10 PDFs por minuto por usuario
  const rl = await rateLimit(`pdf:${session.user.id}`, 10, 60);
  if (!rl.ok) {
    return NextResponse.json({ error: "Demasiadas descargas. Intenta más tarde." }, { status: 429 });
  }

  // 3. Parsear query params
  const cultivo = req.nextUrl.searchParams.get("cultivo");
  const nivel = req.nextUrl.searchParams.get("nivel") ?? "principiante";
  
  if (!cultivo) {
    return NextResponse.json({ error: "Parámetro 'cultivo' requerido" }, { status: 400 });
  }

  // 4. Validar cultivo existe
  const crop = await prisma.crop.findUnique({ where: { slug: cultivo } });
  if (!crop) {
    return NextResponse.json({ error: "Cultivo no encontrado" }, { status: 404 });
  }

  // 5. Obtener manual específico
  const manual = await prisma.manual.findUnique({
    where: { cropId_level: { cropId: crop.id, level: nivel.toUpperCase() } },
  });
  if (!manual) {
    return NextResponse.json({ error: "Manual no disponible" }, { status: 404 });
  }

  // 6. Renderizar PDF
  const content = getCropManualContent(crop, manual);
  const pdfBuffer = await renderToBuffer(<PDFDocument content={content} />);

  // 7. Registrar descarga (AuditLog + Download)
  await prisma.$transaction([
    prisma.download.upsert({
      where: { userId_manualId: { userId: session.user.id, manualId: manual.id } },
      create: { userId: session.user.id, manualId: manual.id },
      update: { createdAt: new Date() },
    }),
    prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: "DOWNLOAD_PDF",
        ip: req.headers.get("x-forwarded-for") ?? "unknown",
        metadata: { crop: cultivo, level: nivel },
      },
    }),
  ]);

  // 8. Devolver PDF con headers correctos
  const filename = `AgroGuia-Manual-${crop.name}-${nivel}.pdf`;
  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "private, no-cache",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
```

### 9.3 Componente PDF (`components/pdf/pdf-document.tsx`)

Usa `@react-pdf/renderer` con la siguiente estructura de páginas:

**Página 1 — Portada:**
- Logo de AgroGuía (SVG embebido) centrado arriba.
- Título grande: `Manual Técnico de {cultivo.name}`.
- Subtítulo: `{cultivo.scientificName}` (itálico).
- Emoji Apple grande del cultivo debajo (centrado).
- Badge del nivel de experiencia.
- Atribución: "Conceptualizado por Ing. Yeron Pool Cuero Montaño".
- Fecha de generación.
- Versión del manual.

**Página 2 — Índice:**
- Tabla de contenidos numerada con números de página.

**Páginas 3+ — Contenido:**

1. **Introducción** — qué es el cultivo, importancia económica, origen.
2. **Requerimientos climáticos** — temperatura óptima, humedad, precipitación, fotoperiodo. Tabla con rangos.
3. **Requerimientos edáficos** — pH, tipo de suelo, materia orgánica, drenaje. Tabla con rangos.
4. **Proceso de siembra** — pasos numerados con emojis Apple: 1️⃣ Preparación del terreno 🌱, 2️⃣ Selección de semilla 🟤, 3️⃣ Siembra 🌿, etc.
5. **Plan de fertilización NPK** — tabla con dosis por etapa fenológica:
   | Etapa | N (kg/ha) | P (kg/ha) | K (kg/ha) | Observaciones |
   |---|---|---|---|---|
   | Pre-siembra | 40 | 60 | 30 | Aplicación basal |
   | Emergencia | 20 | 0 | 0 | Fertirrigación |
   | ... | ... | ... | ... | ... |
6. **Plan de riego** — frecuencia, lámina, métodos.
7. **Control de plagas y enfermedades** — tabla con: plaga, síntomas, tratamiento, prevención, emoji Apple.
8. **Indicadores de cosecha** — días, signos visuales, contenido de humedad.
9. **Post-cosecha** — almacenamiento, transporte, vida útil.
10. **Glosario** — términos técnicos con definiciones.
11. **Referencias** — bibliografía y fuentes consultadas.

**Pie de página (en todas las páginas excepto portada):**
- Izquierda: Logo isotipo + "AgroGuía".
- Centro: "Manual de {cultivo.name} — Nivel {nivel}".
- Derecha: "Página X de Y · Generado el {fecha}".

### 9.4 Estilo Visual del PDF

- Fuente: **Noto Sans SC** para texto latino y Apple Color Emoji para emojis.
- Colores: usar la paleta oficial (verde/tierra/crema).
- Tablas con headers en verde oscuro y filas alternadas crema.
- Iconos de secciones como emojis Apple grandes.
- Márgenes: 2cm superior/inferior, 2.5cm laterales.
- Numeración de páginas en pie.

### 9.5 Contenido Editorial por Cultivo (`lib/pdf-content/*.ts`)

Cada cultivo debe tener un archivo `.ts` con **datos botánicos reales y verificables**. Por ejemplo, para papa (`papa.ts`):

```typescript
export const papaContent = {
  introduction: "La papa (Solanum tuberosum) es el cuarto cultivo alimentario más importante del mundo...",
  climate: {
    tempOptima: "15-20°C",
    precipitacion: "500-800 mm distribuidos en el ciclo",
    fotoperiodo: "Días cortos a intermedios",
    altitud: "2,500-3,500 msnm en zonas tropicales"
  },
  soil: {
    ph: "5.0-6.5 (ligeramente ácido)",
    textura: "Franco-arenosa a franco-limosa",
    materiaOrganica: "> 2%",
    drenaje: "Excelente (sensible a encharcamiento)"
  },
  planting: [
    { step: 1, title: "Preparación del terreno", description: "Arado a 30cm de profundidad...", emoji: "🌱" },
    { step: 2, title: "Selección de semilla", description: "Tubérculos-semilla certificados de 40-60g...", emoji: "🥔" },
    { step: 3, title: "Siembra", description: "Distancia 0.9m entre surcos y 0.3m entre plantas...", emoji: "🌿" },
    // ... etc
  ],
  npk: [
    { etapa: "Pre-siembra", n: 40, p: 60, k: 30, obs: "Aplicación basal con fósforo" },
    { etapa: "Emergencia (30 días)", n: 20, p: 0, k: 0, obs: "Fertirrigación nitrogenada" },
    // ... etc
  ],
  // ... etc
};
```

**Cada cultivo debe tener contenido único y verificable.** Prohibido usar placeholders genéricos. La IA debe investigar datos reales de cada cultivo (ciclo, requerimientos, plagas comunes, dosis NPK estándar) y documentar las fuentes.

### 9.6 Otros Apartados con Descarga de PDF

Además del manual principal por cultivo, los siguientes apartados también deben generar PDFs dinámicos:

1. **Informe de diagnóstico IA** (`/api/pdf/informe-escaneo?id={scanId}`): PDF con el resultado del escaneo de cámara, especie detectada, estado de salud, recomendación NPK, plan de acción, fecha, ubicación (si se compartió).
2. **Plan NPK personalizado** (`/api/pdf/plan-npk?cultivo={slug}&nivel={level}`): PDF solo con la tabla NPK detallada del cultivo.
3. **Guía de plagas** (`/api/pdf/plagas?cultivo={slug}`): PDF con todas las plagas y enfermedades del cultivo específico, con síntomas y tratamientos.
4. **Historial completo** (`/api/pdf/historial`): PDF con todos los escaneos y descargas del usuario (a modo de reporte).

Todos deben seguir el mismo estándar visual: portada con branding, índice, contenido, pie de página.

---

## 10. 🌿 CATÁLOGO MAESTRO DE CULTIVOS (12+ CULTIVOS)

Cada cultivo debe tener su archivo en `lib/pdf-content/` con datos completos. Lista obligatoria mínima:

| # | Slug | Nombre | Nombre científico | Emoji Apple | Categoría |
|---|---|---|---|---|---|
| 1 | `papa` | Papa | Solanum tuberosum | 🥔 | TUBÉRCULO |
| 2 | `yuca` | Yuca | Manihot esculenta | 🍠 | RAÍZ |
| 3 | `maiz` | Maíz | Zea mays | 🌽 | CEREAL |
| 4 | `arroz` | Arroz | Oryza sativa | 🌾 | CEREAL |
| 5 | `tomate` | Tomate | Solanum lycopersicum | 🍅 | HORTALIZA |
| 6 | `cafe` | Café | Coffea arabica | ☕ | INDUSTRIAL |
| 7 | `cacao` | Cacao | Theobroma cacao | 🍫 | INDUSTRIAL |
| 8 | `banano` | Banano | Musa × paradisiaca | 🍌 | FRUTAL |
| 9 | `frijol` | Fríjol | Phaseolus vulgaris | 🫘 | LEGUMINOSA |
| 10 | `pimiento` | Pimiento | Capsicum annuum | 🫑 | HORTALIZA |
| 11 | `lechuga` | Lechuga | Lactuca sativa | 🥬 | HORTALIZA |
| 12 | `zanahoria` | Zanahoria | Daucus carota | 🥕 | RAÍZ |

Cada cultivo debe tener 3 niveles de manuales (Principiante, Intermedio, Avanzado) con profundidad creciente. Total mínimo: **36 manuales** con contenido único.

---

## 11. 📷 MÓDULO DE CÁMARA CON IA (VLM + WEBSOCKET)

### 11.1 Arquitectura

- Frontend: React component que pide `navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })`.
- Captura: `canvas.drawImage(video, 0, 0)` + `canvas.toBlob("image/jpeg")`.
- Subida: POST a `/api/scan` con FormData.
- Backend: convierte imagen a base64, llama a VLM via `z-ai-web-dev-sdk` o WebSocket (`ws://localhost:3003` o `/api/scan/ws`).
- Resultado: JSON estructurado con especie, confianza, estado, NPK, plan de acción.
- Persistencia: guardar en `Scan` table con userId.
- PDF: botón "Descargar informe" llama a `/api/pdf/informe-escaneo?id={scanId}`.

### 11.2 Prompt del VLM

El backend debe enviar al VLM un prompt tipo:

```
Analiza esta imagen de un cultivo agrícola. Identifica:
1. Especie de planta (nombre común y científico)
2. Estado de salud: sano | marchito | enfermo | muerto
3. Síntomas visibles (manchas, coloración, deformaciones)
4. Posible plaga o enfermedad
5. Recomendación NPK (cantidades en kg/ha para N, P, K)
6. Plan de acción numerado (3-5 pasos)

Devuelve un JSON estricto con esta estructura:
{
  "especie": string,
  "nombreCientifico": string,
  "confianza": number (0-1),
  "estado": "SANO" | "MARCHITO" | "ENFERMO" | "MUERTO",
  "sintomas": string[],
  "posiblePlaga": string | null,
  "npk": { "n": number, "p": number, "k": number, "unidad": "kg/ha" },
  "planAccion": string[]
}
```

### 11.3 Manejo de Errores

- Sin cámara: toast "Tu dispositivo no tiene cámara o no diste permiso".
- Imagen no reconocible: toast "No pudimos identificar el cultivo. Intenta con mejor iluminación".
- Timeout VLM (>10s): toast "El análisis tardó demasiado. Reintenta".

---

## 12. 🍎 ESTÁNDAR DE EMOJIS APPLE VS ICONOS SVG

### 12.1 Regla de Oro

- **Emojis** (cultivos, frutas, vegetales, plantas, elementos naturales, estados): **siempre Apple Color Emoji**, referenciando https://emojipedia.org/apple.
- **Iconos UI** (navegación, botones, acciones, breadcrumbs): **siempre SVG con Lucide React**.

### 12.2 Implementación CSS

```css
/* app/globals.css */
.emoji-apple {
  font-family: 'Apple Color Emoji', 'Segoe UI Emoji', 'Noto Color Emoji', sans-serif;
  font-variant-emoji: emoji;
  -webkit-font-smoothing: antialiased;
  /* Fuerza renderización del glyph de color */
  font-feature-settings: "emoji";
}

/* En PDFs con @react-pdf/renderer, registrar la fuente Apple Color Emoji */
```

### 12.3 Componente Wrapper

```tsx
// components/shared/apple-emoji.tsx
import { cn } from "@/lib/utils";

interface AppleEmojiProps {
  symbol: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
}

const sizeMap = {
  sm: "text-base",
  md: "text-2xl",
  lg: "text-4xl",
  xl: "text-6xl",
  "2xl": "text-8xl",
};

export function AppleEmoji({ symbol, className, size = "md" }: AppleEmojiProps) {
  return (
    <span
      className={cn("emoji-apple inline-block leading-none", sizeMap[size], className)}
      role="img"
      aria-label={symbol}
    >
      {symbol}
    </span>
  );
}
```

### 12.4 Lista de Emojis Apple Obligatorios por Cultivo

Ya tabulados en la sección 10. Adicionalmente, en secciones técnicas usar:

- Nitrógeno: 🌿 (hoja verde)
- Fósforo: 🌱 (brote)
- Potasio: 🍂 (hoja otoñal)
- Agua/riego: 💧
- Sol/luz: ☀️
- Lluvia: 🌧️
- Tierra/suelo: 🟤
- Plaga/insecto: 🐛
- Enfermedad/hongo: 🍄
- Cosecha: 🧺
- Semilla: 🟫

### 12.5 Emojis Apple en PDFs

`@react-pdf/renderer` requiere registrar fuentes explícitamente. Para emojis Apple:

```typescript
import { Font } from "@react-pdf/renderer";

Font.register({
  family: "AppleEmoji",
  fonts: [
    {
      src: "/public/apple-color-emoji.ttf",
    },
  ],
});

// En el componente Text del PDF:
<Text style={{ fontFamily: "AppleEmoji" }}>🥔</Text>
```

Si la fuente Apple Color Emoji no está disponible para uso comercial, se puede usar `Noto Color Emoji` como fallback (también con estilo colorido y compatible con el estándar visual).

---

## 13. 🎨 SISTEMA DE DISEÑO VISUAL

### 13.1 Tipografía

- Headings: **Playfair Display** (serif, para títulos editoriales y portadas de PDF).
- Body: **Inter** (sans-serif, lectura optimizada).
- Mono: **JetBrains Mono** (tablas, datos técnicos).
- Emojis: **Apple Color Emoji** (con fallbacks).

### 13.2 Componentes shadcn/ui Obligatorios

Instalar y configurar: `button`, `card`, `input`, `label`, `form`, `dialog`, `sheet`, `dropdown-menu`, `select`, `tabs`, `table`, `badge`, `avatar`, `separator`, `skeleton`, `sonner`, `tooltip`, `breadcrumb`, `command`, `popover`, `checkbox`, `switch`, `textarea`, `toast`.

### 13.3 Layout Responsivo

- Mobile-first: breakpoints `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`.
- Sidebar: fijo en `lg+`, drawer en mobile.
- Grid de cultivos: 1 col mobile, 2 cols tablet, 3-4 cols desktop.
- PDF: optimizado para A4 vertical.

### 13.4 Modo Oscuro

- Implementar con `next-themes`.
- Variables CSS para los tokens de color.
- Toggle en topbar y en preferencias de usuario.
- Persistencia en `localStorage` + preferencia de usuario en BD.

### 13.5 Animaciones

- Transiciones suaves con Tailwind `transition-*`.
- Animaciones de entrada con `framer-motion` para modales y páginas.
- Skeletons durante cargas.
- Micro-interacciones en botones (hover, focus, active).

---

## 14. 🛡️ CIBERSEGURIDAD Y HARDENING (OWASP TOP 10 2021)

### 14.1 Cobertura Completa

La aplicación debe ser resistente a las 10 categorías del OWASP Top 10 2021:

#### A01 — Pérdida de Control de Acceso
- Middleware que protege todas las rutas privadas.
- Server-side authorization checks en cada API route.
- Negación por defecto (default-deny) en acciones sensibles.
- IDs opacos (cuid) en lugar de enteros secuenciales para evitar enumeración.

#### A02 — Fallas Criptográficas
- Contraseñas hasheadas con **argon2id** (mínimo 64MB de memoria, 3 iteraciones).
- Tokens de reset/verificación con `crypto.randomUUID()` hasheados antes de guardar.
- HTTPS obligatorio en producción (HSTS con `max-age=31536000; includeSubDomains; preload`).
- Cookies `httpOnly + secure + sameSite=lax`.
- No almacenar datos sensibles en localStorage (solo preferencias no sensibles).
- Backup de base de datos cifrado en reposo.

#### A03 — Inyección
- **SQL Injection:** uso exclusivo de Prisma ORM con consultas parametrizadas. Prohibido `prisma.$queryRawUnsafe`. Si se necesita SQL crudo, usar `prisma.$queryRaw` con tagged templates.
- **NoSQL Injection:** validación con Zod antes de toda query.
- **Command Injection:** no usar `child_process.exec` con inputs del usuario. Si se necesita, `execFile` con argumentos en array.
- **LDAP/XPath Injection:** no aplica en este stack.

#### A04 — Diseño Inseguro
- Threat modeling básico documentado.
- Rate limiting en endpoints sensibles (auth, IA, descargas).
- Separación de privilegios (rol USER vs EDITOR vs ADMIN).
- Auditoría de acciones críticas (tabla `AuditLog`).

#### A05 — Mala Configuración de Seguridad
- Headers HTTP de seguridad obligatorios:

```typescript
// next.config.ts
const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(self), geolocation=(self)" },
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
  { key: "Content-Security-Policy", value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:; connect-src 'self' wss: https:; frame-ancestors 'self';" },
];

export default {
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};
```

- `.env.local` gitignored.
- No exponer `DATABASE_URL` al cliente.
- Producción: ocultar mensajes de error detallados (log interno, no response).

#### A06 — Componentes Vulnerables
- `npm audit` en CI, falla build si hay críticos.
- Dependabot habilitado en el repositorio.
- Renovación periódica de dependencias.

#### A07 — Fallas de Identificación y Autenticación
- argon2id para passwords (ver A02).
- Bloqueo tras 5 intentos fallidos (15 min).
- Rate limiting en `/api/auth/login` (10 intentos / minuto / IP).
- Session timeout (7 días).
- Refresh token rotation (opcional).
- Logout invalida el JWT en cliente.
- 2FA opcional (TOTP con `otplib`) — fase 2.

#### A08 — Fallas de Software e Integridad de Datos
- Subresource Integrity (SRI) en scripts de terceros.
- Validación de integridad de imágenes subidas (mime type real, no solo extensión).
- Pip npm con `npm ci` y `package-lock.json` versionado.

#### A09 — Fallas de Registro y Monitoreo
- Logs estructurados con Pino (JSON).
- AuditLog en BD para acciones sensibles.
- Sentry para errores en producción.
- Alertas de uso anómalo (intentos de login masivos, descargas masivas).

#### A10 — Falsificación de Petición en Sitios Cruzados (CSRF)
- Tokens anti-CSRF en formularios de mutación.
- SameSite=lax en cookies de sesión.
- Verificación de `Origin` header en peticiones POST/PUT/DELETE.

### 14.2 Protecciones Adicionales

- **XSS Prevention:**
  - React escapa automáticamente, pero para contenido HTML dinámico usar `DOMPurify.sanitize()`.
  - CSP estricta con nonces para scripts inline.
- **File Upload:**
  - Validación de mime type real con `file-type` (no confiar en el header).
  - Límite de tamaño (5MB máximo).
  - Almacenamiento fuera del webroot o en S3-compatible.
  - No ejecutar archivos subidos.
- **Rate Limiting Detallado:**
  - Login: 10 intentos/minuto/IP, 5 intentos/cuenta.
  - Registro: 3 cuentas/hora/IP.
  - Reset password: 3 solicitudes/hora/email.
  - PDF: 10 descargas/minuto/usuario.
  - IA scan: 5 escaneos/hora/usuario (los VLMs son costosos).
- **Bot Protection (opcional fase 2):**
  - hCaptcha o Turnstile en registro y reset password.
- **Information Disclosure:**
  - Errores 404/500 genéricos al cliente, detallados solo en logs.
  - Stack traces nunca en responses.
  - `NODE_ENV=production` en prod.

### 14.3 Compliance

- **RGPD-ready:** funcionalidad de exportar y eliminar datos del usuario.
- **Política de privacidad** y **términos de servicio** como páginas públicas.

---

## 15. ⚡ PERFORMANCE, SEO, ACCESIBILIDAD Y PWA

### 15.1 Performance

- **Lighthouse Performance ≥ 90** (mobile).
- LCP < 2.5s, FID < 100ms, CLS < 0.1.
- Imágenes optimizadas con `next/image` (WebP/AVIF).
- Code splitting con `next/dynamic` para módulos pesados.
- Prefetch de rutas probables (dashboard tras login).
- Cache de Prisma con `prisma.$use` (middleware de cache) opcional.

### 15.2 SEO

- Metadata API de Next.js 16 en cada página.
- `sitemap.xml` dinámico con todos los cultivos.
- `robots.txt` permitiendo indexación de páginas públicas, bloqueando `/dashboard`, `/cultivos`, etc.
- Open Graph + Twitter Cards.
- Schema.org JSON-LD para artículos y FAQs.
- Canonical URLs.

### 15.3 Accesibilidad (WCAG 2.1 AA)

- HTML semántico (`<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`).
- ARIA labels en componentes interactivos.
- Contraste mínimo 4.5:1 en texto normal, 3:1 en texto grande.
- Navegación por teclado funcional (focus visible, traps en modales).
- Skip-to-main-content link.
- `alt` en imágenes informativas, `alt=""` en decorativas.
- Emojis con `aria-hidden="true"` cuando son decorativos, o `aria-label` cuando comunican información.

### 15.4 PWA

- `manifest.webmanifest` con iconos, nombre, colores.
- Service worker con `next-pwa` o `serwist` para:
  - Cache de assets estáticos.
  - Cache del catálogo de cultivos descargado.
  - Modo offline para navegación básica.
- Instalable en Android/iOS.

---

## 16. 🔧 VARIABLES DE ENTORNO

Archivo `.env.example`:

```env
# Base de datos
DATABASE_URL="postgresql://user:pass@localhost:5432/agroguia?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="genera-un-secreto-largo-y-aleatorio"  # openssl rand -base64 32

# Google OAuth (opcional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Email (Resend recomendado)
RESEND_API_KEY=""
EMAIL_FROM="AgroGuía <no-reply@agroguia.com>"

# VLM / IA
VLM_API_KEY=""              # z-ai-web-dev-sdk API key
VLM_WS_URL="ws://localhost:3003"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="AgroGuía"

# Sentry
SENTRY_DSN=""

# Rate limiting (Redis en prod)
REDIS_URL=""
```

---

## 17. 🧪 ESTRATEGIA DE TESTING

### 17.1 Unit Testing (Vitest)

- Cobertura ≥ 70% en `lib/`.
- Tests para: validators, pdf-engine, rate-limit, sanitize, auth callbacks.

### 17.2 Integration Testing (Vitest + Prisma test DB)

- Tests de API routes: register, login, cultivos, pdf generation.
- Mock de VLM en tests.

### 17.3 E2E Testing (Playwright)

- Flujos críticos:
  - Registro completo + verificación de email.
  - Login exitoso + redirección a dashboard.
  - Navegación a cultivos + descarga de PDF.
  - Escaneo de cámara (mock de imagen).
  - Logout.
- Tests en Chrome (desktop) y Pixel 5 (mobile emulation).

### 17.4 Accessibility Testing

- `@axe-core/playwright` en cada E2E.
- Lighthouse a11y audit en CI.

---

## 18. 🚀 DESPLIEGUE, MONITOREO Y DEVOPS

### 18.1 Docker

`Dockerfile` multi-stage:

```dockerfile
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
EXPOSE 3000
CMD ["sh", "-c", "npx prisma migrate deploy && node server.js"]
```

`docker-compose.yml` con servicios: `app`, `postgres`, `redis`.

### 18.2 CI/CD (GitHub Actions)

Workflow en `.github/workflows/ci.yml`:

1. Checkout.
2. Setup Node 20 + npm ci.
3. Lint (ESLint + Prettier check).
4. Type check (tsc --noEmit).
5. Prisma generate + migrate dev (en SQLite test).
6. Unit + integration tests (Vitest).
7. Build.
8. E2E tests (Playwright).
9. Security audit (npm audit + Trivy scan).
10. Deploy a Vercel o Docker registry.

### 18.3 Monitoreo

- **Sentry** para errores en producción (frontend + backend).
- **Vercel Analytics** o **Plausible** para métricas de uso.
- **Pino logs** enviados a Betterstack o Grafana Loki.
- **Uptime monitoring** con UptimeRobot o Betterstack.
- **Alertas** en Slack/email para:
  - Errores 5xx sostenidos.
  - Picos de intentos de login fallidos.
  - Caída del servicio VLM.

---

## 19. ✅ CRITERIOS DE ACEPTACIÓN (DEFINITION OF DONE)

La aplicación se considera completa cuando **todos** los siguientes criterios están verificados:

### 19.1 Autenticación y Vistas

- [ ] El registro crea un usuario real en la base de datos con contraseña hasheada (argon2id).
- [ ] El login valida credenciales contra la base de datos y establece sesión JWT persistente.
- [ ] **NO EXISTE NINGÚN `window.alert()`, `window.confirm()` o `window.prompt()` en el código** (verificable con `grep`).
- [ ] El feedback de login (éxito/error) se muestra con Sonner toasts modernos.
- [ ] La validación de formularios es inline (mensajes bajo cada input, no alerts).
- [ ] La vista pública `/` muestra únicamente contenido de marketing; **ningún manual, catálogo completo o módulo avanzado es accesible sin sesión**.
- [ ] Al intentar acceder a `/dashboard` sin sesión, el middleware redirige a `/login?callbackUrl=...`.
- [ ] Tras login exitoso, el usuario es redirigido a `/dashboard` con toast de bienvenida.
- [ ] El flujo de verificación de email funciona end-to-end.
- [ ] El flujo de recuperación de contraseña funciona end-to-end.
- [ ] Tras 5 intentos fallidos, la cuenta se bloquea 15 minutos.
- [ ] El logout invalida la sesión y redirige a `/`.

### 19.2 PDFs Dinámicos

- [ ] El endpoint `GET /api/pdf/[recurso]?cultivo={slug}&nivel={level}` genera un PDF en tiempo real.
- [ ] El PDF de `papa` contiene **exclusivamente** información de papa (no contenido genérico).
- [ ] El PDF de `maíz` contiene exclusivamente información de maíz.
- [ ] El PDF de `yuca` contiene exclusivamente información de yuca.
- [ ] (Igual para los 12+ cultivos del catálogo.)
- [ ] Cada PDF tiene: portada con logo, índice, secciones completas (intro, clima, suelo, siembra, NPK, riego, plagas, cosecha, post-cosecha, glosario, referencias), pie de página con paginación y fecha.
- [ ] Cada PDF incluye emojis Apple renderizados correctamente.
- [ ] Cada PDF muestra el atribución del Ing. Yeron Pool Cuero Montaño en la portada.
- [ ] Los demás apartados con descarga de PDF (informe de escaneo, plan NPK, guía de plagas, historial) también funcionan.
- [ ] Las descargas se registran en la tabla `Download` y `AuditLog`.

### 19.3 Emojis Apple

- [ ] Todos los emojis de cultivos, frutas, vegetales, elementos naturales se renderizan en Apple Color Emoji (con fallback).
- [ ] Los iconos de UI (navegación, botones) son SVG (Lucide).
- [ ] En PDFs, los emojis Apple se renderizan correctamente (fuente registrada).

### 19.4 Cámara IA

- [ ] El botón "Iniciar cámara" pide permiso `getUserMedia` y muestra el feed.
- [ ] La captura sube la imagen a `/api/scan` y devuelve un diagnóstico estructurado.
- [ ] El diagnóstico muestra especie, confianza, estado, NPK y plan de acción.
- [ ] El escaneo se guarda en el historial del usuario.
- [ ] El botón "Descargar informe PDF" genera el PDF del escaneo.

### 19.5 Seguridad

- [ ] No hay SQL Injection (verificable con tests de penetración básicos).
- [ ] Todos los inputs se validan con Zod.
- [ ] Rate limiting activo en auth, PDF y scan.
- [ ] Headers de seguridad configurados (HSTS, CSP, X-Frame-Options, etc.).
- [ ] Cookies con `httpOnly + secure + sameSite=lax`.
- [ ] No hay información sensible en respuestas de error.
- [ ] `npm audit` sin vulnerabilidades críticas.

### 19.6 Diseño y UX

- [ ] Paleta verde/tierra/crema exclusiva (sin azul/índigo).
- [ ] Mobile-first responsivo.
- [ ] Modo oscuro funcional.
- [ ] Toaster Sonner configurado.
- [ ] Loading skeletons en todas las cargas.
- [ ] Empty states ilustrados.
- [ ] Footer con atribución de autoría en todas las páginas.

### 19.7 Performance y Calidad

- [ ] Lighthouse Performance ≥ 90 (mobile).
- [ ] Lighthouse Accessibility ≥ 95.
- [ ] Lighthouse SEO ≥ 95.
- [ ] TypeScript strict mode sin errores.
- [ ] ESLint sin warnings.
- [ ] Cobertura de tests ≥ 70%.
- [ ] Build de producción exitoso sin errores.

---

## 20. 📦 ENTREGABLES FINALES POR ARCHIVO

La IA de desarrollo debe entregar, como mínimo, los siguientes archivos funcionales:

### 20.1 Configuración

- `package.json` con todas las dependencias listadas.
- `tsconfig.json` en strict mode.
- `tailwind.config.ts` con design tokens.
- `next.config.ts` con headers de seguridad.
- `.env.example` documentado.
- `Dockerfile` + `docker-compose.yml`.
- `.github/workflows/ci.yml`.

### 20.2 Esquema y Seed

- `prisma/schema.prisma` (completo, según sección 5).
- `prisma/seed.ts` con 12+ cultivos × 3 niveles = 36+ manuales.

### 20.3 Librería (`lib/`)

- `auth.ts` — configuración NextAuth.
- `prisma.ts` — cliente singleton.
- `pdf-engine.ts` — motor de generación.
- `pdf-content/*.ts` — 12+ archivos de contenido por cultivo.
- `rate-limit.ts` — rate limiter.
- `validators/*.ts` — esquemas Zod.
- `security/*.ts` — CSP, headers, sanitize, csrf.
- `vlm-client.ts` — cliente IA.
- `logger.ts` — Pino logger.
- `email/*.ts` — templates y sender.

### 20.4 API Routes (`app/api/`)

Todas las rutas especificadas en la sección 3.1, cada una con:
- Validación Zod de inputs.
- Auth check.
- Rate limiting.
- Try/catch con logs.
- Respuestas JSON tipadas.

### 20.5 Páginas

Todas las páginas en `app/(public)/` y `app/(protected)/` según sección 3.1.

### 20.6 Componentes

Todos los componentes en `components/` según sección 3.1.

### 20.7 Tests

- `tests/unit/` — al menos 20 archivos.
- `tests/integration/` — al menos 10 archivos.
- `tests/e2e/` — al menos 5 flujos completos.

### 20.8 Documentación

- `README.md` con instrucciones de setup, env vars, seed, deploy.
- `LICENSE` (MIT o Creative Commons con atribución al Ing. Yeron Pool Cuero Montaño).
- `SECURITY.md` con política de divulgación de vulnerabilidades.
- `CONTRIBUTING.md` (opcional).

---

## 🎯 NOTA FINAL PARA LA IA DE DESARROLLO

Este prompt es **la especificación maestra**. Cualquier desviación debe ser justificada y documentada. La aplicación debe ser **production-ready** al finalizar, no un prototipo.

Recuerda los tres principios innegociables:

1. **Cero `window.alert()`** — feedback moderno con Sonner.
2. **Cero contenido técnico en vista pública** — todo tras login real.
3. **Cero PDFs genéricos** — cada PDF dinámico y específico al cultivo.

Y la regla de emojis:

- **Emojis = Apple Color Emoji** (Emojipedia Apple style).
- **Iconos UI = SVG (Lucide)**.

**Autoría y concepto:** Ing. Yeron Pool Cuero Montaño — Desarrollador Web Full Stack e Ing. de Software. Esta atribución debe aparecer en el footer de la aplicación, en la portada de todos los PDFs generados, y en los metadatos del README y LICENSE.

Al finalizar, ejecuta `npm run build && npm run test && npm run e2e` y entrega el repositorio completo con todos los checks en verde.

---

**Fin del Prompt Maestro AgroGuía v3.0**

*Documento elaborado como especificación técnica para IA de desarrollo full-stack. Versión 3.0 — perfeccionada, ampliada y blindada con todos los requerimientos de seguridad, autenticación real, separación de vistas, generación dinámica de PDFs por cultivo y estándar de emojis Apple.*
