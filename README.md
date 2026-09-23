# Sitio web — Constructora y Proyectos B&M S.A.C.

Sitio estático de 7 páginas. HTML, CSS y JavaScript escritos para este proyecto,
sin Bootstrap, sin Tailwind, sin jQuery y sin librerías de animación.
Las únicas dependencias externas son Google Fonts y Font Awesome (licencia MIT,
no obliga a mostrar créditos en la página).

## Estructura

```
bym-web/
├── index.html            Portada
├── nosotros.html
├── servicios.html
├── proyectos.html        Menú lateral por rubro + mapa
├── certificaciones.html
├── novedades.html
├── contacto.html
├── css/styles.css        Todo el diseño
├── js/
│   ├── config.js         ← el único archivo que editas normalmente
│   ├── components.js     Cabecera, pie, flotantes, visor de fotos
│   ├── animations.js     Movimiento (IntersectionObserver, rAF)
│   ├── main.js           Slider, formulario, secciones desde CONFIG
│   └── proyectos.js      Obras, filtro por rubro, mapa de cobertura
├── images/               ← copia aquí tu carpeta actual de imágenes
└── docs/                 ← PDFs de las certificaciones ISO
```

## Instalación

1. Copia tu carpeta `images/` actual dentro de `bym-web/images/`.
2. **Renombra `presentación_1.jpg` a `presentacion_1.jpg`** (sin tilde). Las tildes
   en nombres de archivo fallan en algunos servidores y al generar URLs.
3. Copia los 4 PDFs ISO dentro de `docs/`. El de ambiental debe llamarse
   `ISO_AMBIENTAL_14001_B_M.pdf` (antes decía 14005).
4. Ábrelo con un servidor local, no con doble clic:
   ```
   python3 -m http.server 8000
   ```
   y entra a `http://localhost:8000`.

## Qué falta completar

En `js/config.js`, todo lo marcado `[COMPLETAR]`:

- teléfono y WhatsApp (el botón flotante y la barra superior solo aparecen si el
  WhatsApp está puesto)
- enlace de Google Maps y coordenadas exactas de la oficina
- redes sociales (si se quedan vacías, los íconos no se muestran)
- verificar RUC y dirección

## Cómo editar el contenido

Todo sale de `js/config.js`. No se toca el HTML para:

- **Agregar una obra**: copia un bloque dentro de `proyectos` y cámbialo.
  `estado: 'ejecucion'` muestra el distintivo azul y el marcador de obra sin foto;
  `estado: 'ejecutada'` muestra el distintivo naranja.
- **Agregar fotos a una obra**: pon los archivos en `images/` y añade sus nombres
  al arreglo `galeria`. La tarjeta pasa a ser clicable y abre el visor.
- **Publicar una novedad**: agrega un bloque en `novedades` con fecha `AAAA-MM-DD`.
- **Cambiar un servicio o una certificación**: mismos arreglos, mismo formato.

## Diseño

Colores, tipografías y espaciados están en las variables del inicio de
`css/styles.css`. Cambiando `--navy` y `--orange` cambia todo el sitio.

`--orange` (#FF6B35) se usa para gráficos y `--orange-ink` (#C8430F) para texto y
botones: el naranja claro con texto blanco no alcanza el contraste mínimo
accesible, el oscuro sí.

## Movimiento

Sin librerías:

- entradas al hacer scroll con `IntersectionObserver`
- contadores con `requestAnimationFrame`
- parallax de banners con `requestAnimationFrame`, desactivado en móvil
- cabecera compacta con un centinela de 1px
- todo se apaga si el sistema del usuario pide menos movimiento

## Publicación

Sitio estático: funciona en GitHub Pages o Cloudflare Pages sin configuración de
build. Directorio de salida: la raíz del proyecto.

## Formulario

Usa Formspree. El endpoint está en `CONFIG.contacto.formspree`. Verifica que el
formulario esté activo en tu cuenta de formspree.io y que el correo de destino sea
el correcto.
