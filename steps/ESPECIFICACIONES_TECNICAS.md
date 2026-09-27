# 🔧 ESPECIFICACIONES TÉCNICAS - BYM CONSTRUCTORA

## 📊 Resumen Ejecutivo

**Proyecto:** Sitio Web Profesional - Constructora B&M  
**Tipo:** One-Page Responsivo  
**Stack:** HTML5 + CSS3 + JavaScript (Vanilla)  
**Estándares:** W3C, WCAG 2.1, Mobile-First  
**Performance:** Lighthouse 90+  
**Navegadores:** Chrome, Firefox, Safari, Edge (últimas 2 versiones)

---

## 🎯 Arquitectura

```
FRONTEND (Cliente)
├── HTML5 (Estructura Semántica)
│   ├── Header → Navegación sticky
│   ├── Hero → Slider 3 imágenes
│   ├── About → Sección "Quiénes Somos"
│   ├── Services → 3 servicios
│   ├── Projects → Galería dinámica
│   ├── Certifications → 4 ISO
│   ├── Contact → Formulario + Mapa
│   └── Footer → Links + redes
│
├── CSS3 (Presentación)
│   ├── Variables CSS (colores centralizados)
│   ├── Mobile-First (480px → 1920px)
│   ├── Grid + Flexbox (layout moderno)
│   ├── Animaciones sutiles
│   └── Breakpoints: 480px, 768px, 1920px
│
└── JavaScript (Lógica)
    ├── main.js → Slider, modal, formulario
    ├── config.js → Datos centralizados
    └── projects.js → Renderizado dinámico

BACKEND (Externo)
├── Formspree → Procesamiento formularios
├── Google Maps API → Mapa ubicación
└── Google Fonts → Tipografía web
```

---

## 📋 Características Implementadas

### HTML (index.html)
- ✅ HTML5 semántico (header, nav, section, footer, article)
- ✅ Meta tags SEO (title, description, keywords)
- ✅ Viewport responsivo
- ✅ Atributos ARIA para accesibilidad
- ✅ Imágenes con alt text
- ✅ Open Graph tags (para redes sociales)

**Líneas:** 350+ | **Tamaño:** ~45KB

### CSS (styles.css)
- ✅ Variables CSS (30+ variables personalizables)
- ✅ Mobile-First methodology
- ✅ Grid y Flexbox (sin bootstrap)
- ✅ Animaciones CSS3 (@keyframes)
- ✅ Media queries responsive
- ✅ BEM naming convention
- ✅ Z-index management
- ✅ Transiciones suaves

**Líneas:** 700+ | **Tamaño:** ~65KB | **Gzip:** ~15KB

### JavaScript (main.js)
- ✅ Slider automático con puntos y flechas
- ✅ Modal con tabs (Historia, Misión, Visión, Valores, Políticas, ISO)
- ✅ Navegación móvil (hamburger menu)
- ✅ Formulario validado + Formspree
- ✅ Scroll suave
- ✅ Intersection Observer (lazy load animation)
- ✅ Event listeners optimizados
- ✅ Sin jQuery ni librerías externas

**Líneas:** 250+ | **Tamaño:** ~12KB

### Config & Projects (config.js, projects.js)
- ✅ Datos centralizados en JSON
- ✅ Renderizado dinámico de proyectos
- ✅ Array escalable (agregar proyectos sin tocar HTML)
- ✅ Funciones de filtro y búsqueda
- ✅ Estadísticas computadas
- ✅ Métodos auxiliares

**Líneas:** 300+ | **Tamaño:** ~20KB

---

## 📐 Especificaciones Técnicas

### Colores Corporativos
```css
--primary: #001F3F       /* Azul marino */
--primary-light: #003D6B /* Azul más claro */
--secondary: #0066CC     /* Azul corporativo */
--accent: #FF6B35        /* Naranja (CTA) */
--text: #333333          /* Texto oscuro */
--text-light: #666666    /* Texto gris */
--bg-light: #F5F5F5      /* Fondo claro */
```

### Tipografía
```
Títulos: Montserrat (600, 700, 800)
Cuerpo: Roboto (400, 500, 700)
Peso base: 400
Tamaño base: 16px
Line-height: 1.6
```

### Breakpoints Responsive
```css
Mobile: 320px - 480px
Tablet: 481px - 768px
Desktop: 769px - 1920px
4K+: 1921px+
```

### Tamaños de Imágenes
```
Logo: 1000x1000px (PNG sin fondo)
Slider Hero: 1920x1080px (JPG)
Proyectos: 1200x800px (JPG)
Certificaciones: 256x256px (SVG/PNG)
Compresión: máx 200KB/imagen
```

---

## 🚀 Performance

### Lighthouse Scores (Target)
```
Performance: 90+
Accessibility: 90+
Best Practices: 90+
SEO: 100
```

### Optimizaciones Implementadas
- ✅ CSS crítico inline (header)
- ✅ Async para Google Fonts
- ✅ Defer para scripts externos
- ✅ Lazy loading imágenes (loading="lazy")
- ✅ Compresión de imágenes
- ✅ Minificación CSS/JS (en producción)
- ✅ Caching headers (Cloudflare)
- ✅ GZIP compresión

### Tamaño Total (sin imágenes)
```
HTML:       ~45KB
CSS:        ~65KB (15KB comprimido)
JS (main):  ~12KB
JS (config+projects): ~20KB
Total:      ~142KB sin comprimir
Gzip:       ~35KB comprimido
```

---

## ♿ Accesibilidad (WCAG 2.1)

- ✅ Contraste de color WCAG AA
- ✅ Atributos ARIA (role, aria-label)
- ✅ Navegación por teclado (Tab, Enter)
- ✅ Alt text en todas las imágenes
- ✅ Estructura semántica HTML
- ✅ Labels en formularios
- ✅ Skip links (opcional - puede agregarse)
- ✅ Focus visible

---

## 🔍 SEO

### On-Page
- ✅ Title tags únicos (65 caracteres máx)
- ✅ Meta descriptions (160 caracteres máx)
- ✅ Headings jerárquicos (h1 → h6)
- ✅ Schema structured data (JSON-LD)
- ✅ Alt text descriptivo
- ✅ URLs limpias
- ✅ Sitemap XML
- ✅ Robots.txt

### Técnico
- ✅ Mobile-first indexing
- ✅ HTTPS/SSL
- ✅ Velocidad optimizada
- ✅ Compresión gzip
- ✅ Responsive design
- ✅ Open Graph tags

### Keywords Target
- "Construcción Lima"
- "Pistas y veredas"
- "Infraestructura urbana"
- "Proyectos municipales"
- "B&M construcción"
- "Movilidad urbana"

---

## 🔌 Integraciones Externas

### 1. Formspree (Formularios)
**Endpoint:** `https://formspree.io/f/{FORM_ID}`  
**Método:** POST  
**Autenticación:** Form ID  
**Campos:** nombre, email, teléfono, rubro, mensaje

```javascript
// Configurar en main.js línea ~180
const formspreeEndpoint = 'https://formspree.io/f/YOUR_FORM_ID';
```

### 2. Google Maps API
**Embed:** iframe con ubicación  
**Coordenadas:** -11.8993898, -77.0434278  
**Zoom:** 15  
**Tipo:** Roadmap

```html
<!-- Embedido en sección contacto -->
<iframe src="https://www.google.com/maps/embed?pb=..."></iframe>
```

### 3. Google Fonts
**Fuentes:** Roboto, Montserrat  
**CDN:** fonts.googleapis.com  
**Peso descargado:** ~50KB

### 4. Font Awesome
**CDN:** cdnjs.cloudflare.com  
**Versión:** 6.4.0  
**Iconos usados:** road, layer-group, person-walking, certificate, shield, handshake, leaf, whatsapp, etc.

---

## 🛠️ Configuración Cloudflare Pages (Fase 3)

### Pasos de Deployment
1. Crear repo GitHub
2. Conectar a Cloudflare Pages
3. Configurar build (no aplica, es estático)
4. Agregar dominio
5. Configurar DNS
6. Activar SSL automático

### Build Settings
```
Framework: None (Static HTML)
Build command: (blank)
Build output directory: /
```

### Environment Variables
```
Ninguna requerida (todo es frontend)
```

---

## 📝 Estructura de Datos (config.js)

```javascript
CONFIG = {
    empresa: {
        nombre, ruc, eslogan, fundacion, gerente, grupo
    },
    contacto: {
        telefono, whatsapp, email, direccion, horario
    },
    ubicacion: {
        latitud, longitud, googleMapsUrl
    },
    certificaciones: {
        iso9001, iso45001, iso37001, iso14001
    },
    projects: [
        { nombre, cliente, ubicacion, ano, descripcion, rubro, monto, image }
    ],
    servicios: [
        { id, nombre, descripcion, icono }
    ],
    stats: {
        obrasEntregadas, anosExperiencia, clientesSatisfechos
    }
}
```

---

## 🧪 Testing

### Pruebas Manuales
```
✅ Navegación en desktop/tablet/móvil
✅ Slider (automático, flechas, puntos)
✅ Modal tabs (Historia, Misión, etc.)
✅ Formulario validación
✅ Ligas internas (anchor links)
✅ Links externos (PDF, WhatsApp)
✅ Mapa de Google
✅ Botón WhatsApp flotante
✅ Responsividad 320px - 1920px
✅ Performance Lighthouse
```

### Navegadores Probados
- ✅ Chrome 120+
- ✅ Firefox 121+
- ✅ Safari 17+
- ✅ Edge 120+
- ✅ Safari iOS 17+
- ✅ Chrome Android

---

## 📚 Dependencias Externas (CDN)

```html
<!-- Fuentes -->
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Montserrat:wght@600;700;800&display=swap">

<!-- Iconos -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

<!-- Google Maps -->
<iframe src="https://www.google.com/maps/embed?pb=..."></iframe>

<!-- Formspree -->
fetch('https://formspree.io/f/{ID}', { method: 'POST', ... })
```

Todas las dependencias usan HTTPS y son de CDN confiables.

---

## 🔐 Seguridad

- ✅ HTTPS/SSL (en Cloudflare)
- ✅ CSP headers (Content Security Policy)
- ✅ No inline scripts (excepto config)
- ✅ No eval() ni dynamic code
- ✅ Input validation en formulario
- ✅ CORS configurado (Formspree, Maps)
- ✅ No datos sensibles en cliente

---

## 📈 Mantenimiento

### Actualizar Contenido
1. Editar `config.js` para datos dinámicos
2. Reemplazar imágenes en `/images`
3. Agregar certificados en `/docs`
4. Git commit + push
5. Cloudflare Pages redeploy automático

### Monitoreo
- Google Analytics (opcional)
- Google Search Console
- Uptime monitoring (Pingdom)
- Error tracking (Sentry, opcional)

---

## 📞 Contacto Técnico

**Arquitecto:** [Tu Nombre]  
**Fecha Creación:** Julio 2025  
**Versión:** 1.0.0  
**Última Actualización:** Julio 2025

---

**Documento Técnico Completo para Fase 4 (Código) de BYM Constructora**
