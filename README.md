# Clientky Landing Page

Landing page corporativa de Clientky, consultora de Data & AI. Construida con Astro y Tailwind CSS.

## 🚀 Tech Stack

- **[Astro](https://astro.build/)** v4 - Framework de sitios estáticos
- **[Tailwind CSS](https://tailwindcss.com/)** v3 - Framework de utilidades CSS
- **TypeScript** - Tipado estático
- **Netlify** - Hosting y despliegue

## 📁 Estructura del Proyecto

```
├── netlify/
│   └── functions/        # Netlify Functions (serverless)
│       ├── send-contact.js      # Envío de formulario de contacto
│       └── send-application.js  # Envío de aplicaciones a empleos
├── public/               # Archivos estáticos (logos, favicon)
├── src/
│   ├── components/       # Componentes Astro reutilizables
│   ├── i18n/             # Traducciones y utilidades de internacionalización
│   ├── layouts/          # Layouts de página (Layout, LegalLayout)
│   └── pages/            # Páginas (rutas automáticas)
│       ├── es/           # Páginas en español
│       ├── careers/      # Páginas de carreras (EN)
│       └── *.astro       # Páginas en inglés (raíz)
├── astro.config.mjs      # Configuración de Astro
├── netlify.toml          # Configuración de Netlify
├── tailwind.config.cjs   # Configuración de Tailwind CSS
└── tsconfig.json         # Configuración de TypeScript
```

## 🛠️ Desarrollo Local

### Requisitos Previos

- Node.js 18+ 
- npm o pnpm

### Instalación

```bash
# Clonar el repositorio
git clone <tu-repo-url>
cd Landing-Clientky-2026

# Instalar dependencias
npm install
```

### Comandos

| Comando           | Descripción                                     |
|-------------------|-------------------------------------------------|
| `npm run dev`     | Inicia servidor de desarrollo en `localhost:4321` |
| `npm run build`   | Genera el sitio estático en `./dist`            |
| `npm run preview` | Vista previa del build de producción            |

## 🌐 Internacionalización (i18n)

El sitio soporta dos idiomas:
- **Inglés (EN)** - Ruta raíz (`/`, `/careers`, `/privacy`, etc.)
- **Español (ES)** - Prefijo `/es/` (`/es/`, `/es/carreras`, `/es/privacidad`, etc.)

Las traducciones están en `src/i18n/translations.ts`.

## 🚀 Despliegue en Netlify

### Opción 1: Desde GitHub (Recomendado)

1. Sube el repositorio a GitHub
2. En Netlify, selecciona "Add new site" → "Import an existing project"
3. Conecta tu repositorio de GitHub
4. Netlify detectará automáticamente la configuración de `netlify.toml`
5. Click en "Deploy site"

### Opción 2: Netlify CLI

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login en Netlify
netlify login

# Inicializar proyecto (solo la primera vez)
netlify init

# Desplegar a producción
netlify deploy --prod
```

### Configuración de Dominio

Si tienes un dominio personalizado (ej: `clientky.app`):

1. Ve a **Site settings** → **Domain management**
2. Click en **Add custom domain**
3. Sigue las instrucciones para configurar DNS

## 🔧 Variables de Entorno (REQUERIDO)

El proyecto utiliza Netlify Functions para enviar emails. Debes configurar las siguientes variables de entorno:

### Variables Requeridas

| Variable | Descripción |
|----------|-------------|
| `SMTP_HOST` | Servidor SMTP (`mail.clientky.app`) |
| `SMTP_PORT` | Puerto SMTP (`465` para SSL) |
| `SMTP_USER_RECRUITING` | Email de recruiting (`recruiting@clientky.app`) |
| `SMTP_PASS_RECRUITING` | Contraseña del email de recruiting |
| `SMTP_USER_SALES` | Email de ventas EN (`sales@clientky.app`) |
| `SMTP_PASS_SALES` | Contraseña del email de sales |
| `SMTP_USER_COMERCIAL` | Email de ventas ES (`comercial@clientky.app`) |
| `SMTP_PASS_COMERCIAL` | Contraseña del email comercial |

### Configuración Local

1. Crea un archivo `.env` en la raíz del proyecto (está en `.gitignore`)
2. Copia el contenido del archivo `.env.example` (ver abajo)
3. Reemplaza los valores con las credenciales reales

### Configuración en Netlify

1. Ve a **Site settings** → **Environment variables**
2. Agrega cada variable con su valor correspondiente
3. Las variables se aplicarán automáticamente en el próximo deploy

### Ejemplo de `.env`

```env
# SMTP Configuration
SMTP_HOST=mail.clientky.app
SMTP_PORT=465

# Recruiting (job applications)
SMTP_USER_RECRUITING=recruiting@clientky.app
SMTP_PASS_RECRUITING=TuContraseñaAquí

# Sales (English contact form)
SMTP_USER_SALES=sales@clientky.app
SMTP_PASS_SALES=TuContraseñaAquí

# Commercial (Spanish contact form)
SMTP_USER_COMERCIAL=comercial@clientky.app
SMTP_PASS_COMERCIAL=TuContraseñaAquí
```

## 📝 Notas para Desarrollo

### Formularios

Los formularios de contacto y aplicación a empleos envían datos a Netlify Functions que procesan y envían emails:

- **Formulario de Contacto**: Envía a `sales@clientky.app` (EN) o `comercial@clientky.app` (ES)
- **Aplicaciones a Empleos**: Envía a `recruiting@clientky.app` con CV y foto adjuntos

### Imágenes y Assets

- Los logos de partners y clientes están en `public/logos/`
- El favicon está en `public/favicon.svg`
- Todas las imágenes son servidas como archivos estáticos

## 📄 Licencia

Proyecto privado de Clientky. Todos los derechos reservados.


