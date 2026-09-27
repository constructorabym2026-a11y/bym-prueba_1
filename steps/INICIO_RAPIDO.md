# ⚡ INICIO RÁPIDO - BYM CONSTRUCTORA

## 🎯 5 Pasos para Tener la Web Funcionando

### PASO 1: Preparar Carpeta
```
Crea una carpeta en tu PC:
C:\mis-proyectos\bym-web\
  ├── index.html
  ├── css/
  │   └── styles.css
  ├── js/
  │   ├── main.js
  │   ├── config.js
  │   └── projects.js
  ├── images/
  │   ├── logo.png
  │   ├── pista_1.jpg
  │   ├── pista_2.jpg
  │   └── pista_3.jpg
  └── docs/
      ├── ISO_CALIDAD_9001_B_M.pdf
      ├── ISO_SEGURIDAD_45001_B_M.pdf
      ├── ISO_ANTISOBORNO_37001_B_M.pdf
      └── ISO_AMBIENTAL_14005_B_M.pdf
```

### PASO 2: Descargar Archivos
Copia los archivos generados:
- `index.html`
- `styles.css` → carpeta `css/`
- `main.js`, `config.js`, `projects.js` → carpeta `js/`

### PASO 3: Agregar Imágenes
Coloca en carpeta `images/`:
- Logo PNG
- 3 fotos de pistas (1920x1080px idealmente)

Coloca PDFs ISO en carpeta `docs/` (ya tiene nombres configurados)

### PASO 4: Probar Localmente

**Opción A - Doble Click:**
```
1. Busca index.html
2. Doble click → abre en navegador
```

**Opción B - Servidor Local (mejor):**
```
1. Abre Terminal/Cmd en la carpeta del proyecto
2. Escribe:
   python3 -m http.server 8000
3. Abre navegador:
   http://localhost:8000
```

### PASO 5: Personalizar Datos
Abre `js/config.js` y actualiza:

```javascript
// ⬇️ BUSCA ESTO Y ACTUALIZA:

empresa: {
    nombre: 'Tu Empresa',
    email: 'tu-email@empresa.com',
    // ... más datos
}

contacto: {
    telefono: '123456789',
    whatsapp: '+51123456789',
    email: 'tu-email@empresa.com',
    // ... más contactos
}
```

---

## ✅ Checklist de Instalación

- [ ] Carpeta de proyecto creada
- [ ] Archivos HTML/CSS/JS descargados
- [ ] Carpetas `css/`, `js/`, `images/`, `docs/` creadas
- [ ] Logo PNG colocado en `/images`
- [ ] 3 fotos de pista en `/images`
- [ ] 4 PDFs ISO en `/docs`
- [ ] Actualizado `config.js` con datos reales
- [ ] Probado en navegador (localhost)
- [ ] ✅ **LISTO PARA MOSTRAR A JEFE**

---

## 🔧 Configuraciones Principales

### 1. Cambiar Título de la Web
Abre `index.html` → Busca `<title>` → Edita:
```html
<title>Constructora y Proyectos B&M | Infraestructura Vial y Urbana</title>
```

### 2. Cambiar Meta Descripción
En `index.html` → Busca `<meta name="description"` → Edita:
```html
<meta name="description" content="Tu descripción aquí">
```

### 3. Actualizar Logo
En `index.html` → Busca `<img src="images/logo.png"` → Asegúrate que el archivo existe

### 4. Cambiar Colores
En `css/styles.css` → Primeras 20 líneas:
```css
:root {
    --primary: #001F3F;      /* Azul principal - CAMBIA AQUÍ */
    --accent: #FF6B35;       /* Naranja botones - CAMBIA AQUÍ */
}
```

### 5. Activar Formulario
En `js/main.js` → Busca `const formspreeEndpoint`:
```javascript
const formspreeEndpoint = 'https://formspree.io/f/CAMBIATE_CON_TU_ID';
// Obtén tu ID en: https://formspree.io
```

---

## 📱 Prueba Responsive

Abre navegador → Presiona `F12` → Click ícono móvil (arriba izq)
- Prueba en: iPhone 12, iPad, Desktop

---

## 🚀 Listo para Producción

Una vez probado localmente:
1. Sube a **Cloudflare Pages** (PASO 3 siguiente)
2. Configura dominio
3. Verifica SEO en Google Search Console
4. ¡LANZAMIENTO!

---

## ❓ Dudas Comunes

**P: ¿Por qué no aparecen las imágenes?**  
R: Revisa que estén en carpeta `images/` y con MISMO nombre en código.

**P: ¿Cómo agrego otro proyecto?**  
R: Abre `config.js` → Sección "projects" → Copia un proyecto y actualiza datos.

**P: ¿Dónde está el formulario?**  
R: Scroll abajo → Sección "Contacto" → Actualiza Formspree ID.

**P: ¿Puedo cambiar colores?**  
R: Sí, edita `css/styles.css` líneas 1-20 (variables CSS).

---

## 📞 Contacto Rápido

Si algo no funciona:
1. Abre DevTools (F12)
2. Ve a pestaña "Console"
3. ¿Hay errores rojos?
4. Comparte el error en Discord/Chat

---

**¡LISTO! Tu web de BYM está funcionando. Ahora a mostrar al jefe 💪**
