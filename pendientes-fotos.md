# Pendientes — Fotos del sitio B&M

Documento de trabajo para revisar y mejorar las imágenes de `bym-prueba_1`.
Estado al 23-09-2026 (commit `807207a`).

---

## Tamaños mínimos recomendados

| Dónde se muestra | Ancho mínimo | Formato | Peso máx. |
|---|---|---|---|
| Hero de portada y banners de páginas | **1920 px** | horizontal (16:9 o más ancho) | ~400 KB |
| Tira "Nuestros Proyectos" (foto activa) | **1400 px** | horizontal | ~300 KB |
| Fondo de Especialidades / reverso de hexágonos | 1400 px | horizontal, motivo al centro | ~300 KB |
| Mosaico de Nosotros (hexágonos) | 800 px | cuadrado o vertical, motivo al centro | ~200 KB |
| Tarjetas de proyectos | 1000 px | horizontal | ~200 KB |
| Galería (visor a pantalla completa) | 1600 px | cualquiera | ~350 KB |

**Hoy casi todas las fotos miden entre 400 y 1100 px de ancho**; parecen capturas
o fotos reenviadas por WhatsApp. Lo ideal es conseguir el **archivo original del
celular o del informe de obra** (normalmente 3000–4000 px).

---

## 1. Prioridad ALTA — fotos grandes y visibles

### 1.1 Hero de portada (`CONFIG.hero.slides`)

- [ ] **`venus.jpg`** — 410×526, **vertical**. Slide "SEGURIDAD". Es la peor del sitio.
      Reemplazar por una horizontal de Pasaje Venus (candidatas: `venus_7.jpg` 1266×777,
      `venus_8.jpg` 1227×807) o conseguir original.
- [ ] **`calles54.jpg`** — 851×492. Slide "EXPERIENCIA".
- [ ] **`patria.jpg`** — 722×846, **vertical**. Slide "CALIDAD".
      Alternativa: `patria_1.jpg` 1347×857 (horizontal).
- [ ] `virgen.jpg` — 1112×736. Slide "CUMPLIMIENTO". Aceptable, pero corta.

### 1.2 Banners de páginas internas

| Página | Imagen | Tamaño | Peso | Nota |
|---|---|---|---|---|
| proyectos.html | `calles54.jpg` | 851×492 | 144 KB | [ ] muy chica para banner |
| certificaciones.html | `chillon_2.jpg` | **595×415** | 71 KB | [ ] muy chica |
| nosotros.html | `presentacion_1.jpg` | 1587×647 | 176 KB | [ ] aceptable, mejorar |
| contacto.html | `presentacion_2.jpg` | 1382×610 | **1472 KB** | [ ] chica **y** pesada: optimizar |
| servicios.html (fondo) | `justicia_4.jpg` | 862×397 | 102 KB | [ ] va desenfocada, tolera algo menos |

### 1.3 Tira "Nuestros Proyectos" (`CONFIG.destacadas`)

| Obra | Imagen | Tamaño | Nota |
|---|---|---|---|
| av-betancourt | `beta.jpg` | 967×402 | [ ] chica, muy apaisada |
| parque-justicia | `justicia_1.jpg` | 972×572 | [ ] chica |
| mercurio-alto | `rosa.jpg` | 1025×566 | [ ] chica |
| pasaje-venus | `venus.jpg` | **410×526** | [ ] crítica — cambiar `image` de la obra a `venus_7.jpg` u original |

- [ ] **Decidir las 4 obras definitivas.** El documento original pedía
      `padua-movilidad`, `tulipanes-jazmines`, `mercurio-alto`, `av-17-noviembre`,
      pero tres de ellas no tienen foto (ver sección 2).

### 1.4 Otras de la portada / Nosotros

- [ ] `equipo_1.jpg` — 1022×555. Foto del equipo en portada y mosaico de Nosotros.
      Idealmente una foto nueva del equipo en obra, bien iluminada.
- [ ] `rosa_4.jpg` — 572×875 (mosaico Nosotros).
- [ ] `logo_Ing._Edwin.png` — 399×399 (portada).
- [ ] `logo-fondo-blanco.png` — 861×477, 215 KB. Logo del encabezado: **pedir versión
      vectorial (SVG)** o PNG a 2× con fondo transparente.

---

## 2. Obras SIN ninguna foto (8)

No aparecen con imagen en `proyectos.html` ni pueden ir en la tira de portada.

| id | Obra | Año | Buscar en |
|---|---|---|---|
| [ ] `padua-movilidad` | Movilidad urbana — San Antonio de Padua | 2024 | celular / informe de obra |
| [ ] `chasquitambo` | Movilidad urbana — Jirón Chasquitambo | 2024 | celular / informe de obra |
| [ ] `tulipanes-jazmines` | Veredas y área verde — Los Tulipanes y Los Jazmines | 2024 | celular / informe de obra |
| [ ] `av-central` | Calzada y señales — Av. Central | 2026 | celular / informe de obra |
| [ ] `escalera-padua` | Escalera de acceso — San Antonio de Padua | 2025 | celular / informe de obra |
| [ ] `av-17-noviembre` | Movilidad urbana — Av. 17 de Noviembre (Independencia) | 2025 | celular / informe de obra |
| [ ] `parque-peru-japon` | Almacén — Parque Perú Japón | 2025 | celular / informe de obra |
| [ ] `nueva-amistad` | Pavimento y vereda — Nueva Amistad (Etapa 1) | 2025 | celular / informe de obra |

Otras fuentes posibles: Facebook / web de la Municipalidad de Los Olivos o
Independencia, notas de prensa. **Ojo:** esas fotos son de quien las publicó;
usarlas solo con permiso o citando la fuente. No usar imágenes generadas con IA
para representar obras reales.

Al conseguirlas: nombrarlas como el resto (`chasquitambo.jpg`, `chasquitambo_1.jpg`, …),
dejarlas en `images/` y llenar `image` y `galeria` de la obra en `js/config.js`.

---

## 3. Galerías — fotos chicas (prioridad MEDIA)

Se ven en el visor a pantalla completa. Por debajo de ~700 px de ancho se notan
pixeladas. Las más chicas de cada obra:

| Obra | Peores fotos |
|---|---|
| calle-17 | `calle_17_4` 620×672, `calle_17_5` 585×560 |
| sector-multiple | `calles54_3` **447×452**, `calles54_4` 490×500 |
| chillon | `chillon_1` 595×437, `chillon_2` 595×415, `chillon_6` 552×517 |
| calle-jazmines | `jazmines_5` 582×547 |
| mercurio-alto | `rosa_1` 601×381, `rosa_4` 572×875 |
| pasaje-venus | `venus` **410×526**, `venus_9` 591×772, `venus_2-1` 632×787 |
| rosales-pro-3era-etapa | `rosales3_7` 497×580, `rosales3_3` 633×501, `rosales3_2` 638×407 |
| parque-virgen-carmen | `virgen_5` 602×537 |
| patria-nueva-movilidad | `patria_6` 627×747 |

Obras con mejores fotos (usar primero como referencia): **pasaje-venus**
(`venus_2`, `_6`, `_7`, `_8`), **patria-nueva-movilidad** (`patria_1`, `_5`),
**parque-virgen-carmen** (`virgen`, `virgen_3`).

---

## 4. Limpieza

- [ ] Imágenes sin uso en el sitio: `logo.png`, `logo_1.jpg`, `presentacion_3.jpg`,
      `presentacion_5.jpg`, `virge_8.jpg` (parece duplicado mal escrito de `virgen_8.jpg`).
      Decidir si se usan o se borran.
- [ ] `docs/ISO9001.jpg`, `ISO14001.jpg`, `ISO37001.jpg`, `ISO45001.jpg`: copias de
      `images/certificados/`, sin commitear. Borrar si no se necesitan.
- [ ] Sellos ISO (`CONFIG.certificaciones[].sello`) vacíos: hoy se dibuja el sello
      genérico azul. Conseguir los logos oficiales del certificador (PNG transparente o SVG).

---

## 5. Opciones de mejora

| Opción | Sirve para | Límite |
|---|---|---|
| **Foto original** (celular, informe, fotógrafo) | Todo | Hay que pedirla al equipo |
| **Mejora con IA local** (Real-ESRGAN, gratis, sin internet) | Ampliar 2×–4× las fotos chicas de la sección 1 y 3 | No inventa detalle real; consume bastante memoria de la PC |
| **Recorte / encuadre** | Convertir verticales en horizontales para hero/tira | Pierde resolución |
| **Optimización de peso** (JPG calidad ~80, WebP) | `presentacion_2.jpg` y todas las >300 KB | — |
| **Corrección de color / luz** | Fotos oscuras o lavadas | — |

### Orden sugerido

1. Conseguir originales de las fotos de la sección 1 y de las 8 obras sin foto.
2. Lo que no se consiga: mejorar con IA las de la sección 1.
3. Cambiar `venus.jpg` en hero y tira por una horizontal ya existente (arreglo inmediato).
4. Optimizar peso de todo al final.
