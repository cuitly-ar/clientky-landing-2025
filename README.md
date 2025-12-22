# Clientky Landing Page

Landing page corporativa de Clientky, consultora de Data & AI. Construida con Astro y Tailwind CSS.

## 🚀 Tech Stack

- **[Astro](https://astro.build/)** v4 - Framework de sitios estáticos
- **[Tailwind CSS](https://tailwindcss.com/)** v3 - Framework de utilidades CSS
- **TypeScript** - Tipado estático
- **Netlify** - Hosting y despliegue

## 📁 Estructura del Proyecto

```
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

Si tienes un dominio personalizado (ej: `clientky.com`):

1. Ve a **Site settings** → **Domain management**
2. Click en **Add custom domain**
3. Sigue las instrucciones para configurar DNS

## 🔧 Variables de Entorno

Actualmente el proyecto no requiere variables de entorno. Si necesitas agregar alguna:

1. Crea un archivo `.env` localmente (ya está en `.gitignore`)
2. En Netlify: **Site settings** → **Environment variables**

Ejemplo de `.env`:
```
PUBLIC_API_URL=https://api.example.com
```

## 📝 Notas para Desarrollo

### Formularios

Los formularios de contacto y aplicación a empleos actualmente solo tienen lógica de frontend. Para activar el envío real:

**Opción A - Netlify Forms:**
Agrega `data-netlify="true"` al formulario:
```html
<form data-netlify="true" name="contact">
```

**Opción B - API externa:**
Modifica el script del formulario para enviar a tu backend/API.

### Imágenes y Assets

- Los logos de partners y clientes están en `public/logos/`
- El favicon está en `public/favicon.svg`
- Todas las imágenes son servidas como archivos estáticos

## 📄 Licencia

Proyecto privado de Clientky. Todos los derechos reservados.

