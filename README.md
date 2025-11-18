# Clientky Landing Page

Landing page moderna y responsive construida con Astro y Tailwind CSS para Clientky, la plataforma de crecimiento en Instagram y TikTok impulsada por IA.

## 🚀 Características

- ⚡ **Astro** - Framework moderno y ultra-rápido
- 🎨 **Tailwind CSS** - Diseño responsive y moderno
- 📱 **Mobile-First** - Optimizado para todos los dispositivos
- ♿ **Accesible** - Buenas prácticas de accesibilidad (ARIA)
- 🔍 **SEO Optimizado** - Meta tags y estructura semántica
- 🎯 **Performance** - Optimizado para Lighthouse

## 📦 Estructura del Proyecto

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   ├── Features.astro
│   │   ├── Pricing.astro
│   │   ├── Testimonials.astro
│   │   ├── CTA.astro
│   │   └── Footer.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
├── astro.config.mjs
├── tailwind.config.cjs
├── postcss.config.cjs
└── package.json
```

## 🛠️ Comandos

Todos los comandos se ejecutan desde la raíz del proyecto en la terminal:

| Comando                   | Acción                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Instala las dependencias                          |
| `npm run dev`             | Inicia el servidor de desarrollo en `localhost:4321` |
| `npm run build`           | Construye el sitio para producción en `./dist/`   |
| `npm run preview`         | Previsualiza la construcción localmente           |

## 🚀 Inicio Rápido

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar servidor de desarrollo:**
   ```bash
   npm run dev
   ```

3. **Abrir en el navegador:**
   - Español: `http://localhost:4321/?lang=es`
   - English: `http://localhost:4321/?lang=en`

## 🎯 Flujo de Usuario

### Landing Page
1. Usuario visita la página principal
2. Puede cambiar idioma (ES/EN) en cualquier momento
3. Navega por secciones: Inicio, Instagram, TikTok, Precios, Recursos
4. Click en "Comenzar" en cualquier CTA

### Onboarding (3 Pasos)
1. **Paso 1**: Selección de plan (Basic, Pro, Experts)
   - Si viene de la landing con plan seleccionado, salta este paso
2. **Paso 2**: Configuración de usuario
   - Seleccionar plataforma (Instagram/TikTok)
   - Ingresar username
   - Ingresar email
3. **Paso 3**: Pago simulado
   - Ver resumen del plan
   - Completar datos de pago
   - Confirmación de éxito

## 🎨 Personalización

### Colores

Los colores principales se configuran en `tailwind.config.cjs`:

- **Primary:** `#7C3AED` (Púrpura)
- **Secondary:** `#10B981` (Verde)
- **Accent:** `#F59E0B` (Ámbar)

### Fuentes

La fuente principal es **Poppins** de Google Fonts, cargada en el Layout principal.

## 📱 Responsive

El diseño está optimizado para:
- 📱 Mobile: < 640px
- 📱 Tablet: 640px - 1024px
- 💻 Desktop: > 1024px

Usando breakpoints de Tailwind: `sm`, `md`, `lg`, `xl`

## ♿ Accesibilidad

- Etiquetas ARIA apropiadas
- Navegación por teclado
- Contraste de colores WCAG AA
- Textos alternativos en imágenes
- Estructura semántica HTML5

## 📊 Performance

- Lazy loading de imágenes
- Optimización de fuentes
- CSS optimizado
- JavaScript mínimo
- Código estático pre-renderizado

## 🌐 Deploy

El proyecto está listo para desplegarse en:
- Vercel
- Netlify
- GitHub Pages
- Cualquier hosting de archivos estáticos

```bash
npm run build
```

El contenido estático se generará en la carpeta `./dist/`.

## 📄 Licencia

© 2023 Clientky. Todos los derechos reservados.

