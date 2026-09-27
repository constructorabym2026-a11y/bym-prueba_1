# Cambios de la portada — Sección Proyectos y franja ISO

Documento de trabajo para aplicar con Claude Code sobre el proyecto `bym-web`.
Aplicar **después** de `cambios-nosotros.md`.

---

## Resumen

La portada queda con este orden:

1. Hero
2. Especialidades (hexágonos)
3. Nosotros (texto + foto del equipo)
4. **Proyectos** — nueva sección
5. **Certificaciones** — pasa de lista completa a una franja baja con los cuatro sellos

### Sección Proyectos

Una **tira de cuatro fotos** a todo el ancho. Una está expandida y las otras tres
comprimidas. Cada 5 segundos avanza sola a la siguiente.

Debajo de la tira, un **panel con corte diagonal** que sube sobre las fotos y muestra,
de la obra activa: nombre, distrito y año, y la descripción. El texto cambia junto con
la foto, con un fundido corto.

- Al pasar el mouse sobre una foto, esa se expande y el avance automático se pausa.
- Al salir, el avance se reanuda.
- Sin flechas ni contador: las cuatro fotos están a la vista.
- Las fotos **no enlazan** a ninguna página. Son solo muestra.
- En celular la tira se convierte en carrusel: una foto a la vez, avanzando sola.

### Franja de certificaciones

Franja baja de fondo claro con los cuatro sellos centrados, en gris, que pasan a color
al acercar el mouse. Aparecen con la animación de entrada al llegar con el scroll.
Cada sello lleva a `certificaciones.html`.

---

## 1. `js/config.js`

Agregar dentro de `CONFIG`, después de `nosotros`:

```js
  /* ---------- SECCIÓN PROYECTOS DE LA PORTADA ----------
     emblematicas : ids de las obras que se muestran, en este orden.
                    Las fotos, nombres y descripciones salen de 'proyectos',
                    así que no se repite información.
     intervalo    : milisegundos entre una foto y la siguiente.            */
  destacadas: {
    titulo: 'Nuestros',
    acento: 'Proyectos',
    intervalo: 5000,
    emblematicas: [
      'padua-movilidad',
      'tulipanes-jazmines',
      'mercurio-alto',
      'av-17-noviembre'
    ]
  },
```

Para cambiar qué obras aparecen, se editan los ids de esa lista. Deben coincidir con
el campo `id` de alguna obra de `proyectos`, y esa obra debe tener `image`.

---

## 2. `index.html`

Reemplazar la sección de certificaciones (el bloque
`<!-- 4. CERTIFICACIONES -->` completo) por estas dos secciones:

```html
  <!-- 4. PROYECTOS: la arma js/main.js desde CONFIG.destacadas -->
  <section class="strip" id="obrasDestacadas" aria-label="Nuestros proyectos"></section>

  <!-- 5. CERTIFICACIONES: solo los sellos -->
  <section class="isoband">
    <div class="wrap isoband__row reveal" id="isoBand"></div>
  </section>
```

El resto de la portada queda igual.

---

## 3. `js/main.js`

### 3.1 Agregar la sección Proyectos

```js
/* ---------- PROYECTOS DESTACADOS (portada) ---------- */
function renderDestacadas() {
  const host = document.getElementById('obrasDestacadas');
  if (!host || !CONFIG.destacadas) return;

  const { titulo, acento, emblematicas } = CONFIG.destacadas;

  // Se toman las obras en el orden de la lista, y solo las que tienen foto
  const obras = emblematicas
    .map(id => CONFIG.proyectos.find(p => p.id === id))
    .filter(o => o && o.image);

  if (!obras.length) return;

  const fotos = obras.map((o, i) => `
      <button type="button" class="strip__item${i === 0 ? ' is-active' : ''}"
              style="background-image:url('${o.image}')"
              data-indice="${i}" aria-label="${o.nombre}"></button>`).join('');

  host.innerHTML = `
    <div class="wrap strip__head reveal">
      <h2 class="strip__title">${titulo} <span>${acento}</span></h2>
      <div class="roadline"></div>
    </div>

    <div class="strip__row" id="stripRow">${fotos}
    </div>

    <div class="strip__panel">
      <div class="wrap strip__panel-inner">
        <h3 class="strip__name" id="stripName"></h3>
        <p class="strip__meta" id="stripMeta"></p>
        <p class="strip__desc" id="stripDesc"></p>
      </div>
    </div>`;

  initDestacadas(obras);
}

function initDestacadas(obras) {
  const fila = document.getElementById('stripRow');
  const nombre = document.getElementById('stripName');
  const meta = document.getElementById('stripMeta');
  const desc = document.getElementById('stripDesc');
  const fotos = [...fila.querySelectorAll('.strip__item')];

  const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const panel = nombre.closest('.strip__panel-inner');

  let actual = 0;
  let timer = null;

  const nombreDistrito = (id) => {
    const d = CONFIG.cobertura.find(x => x.id === id);
    return d ? d.nombre : '';
  };

  const mostrar = (i) => {
    actual = (i + obras.length) % obras.length;
    fotos.forEach((f, n) => f.classList.toggle('is-active', n === actual));

    const o = obras[actual];
    panel.classList.add('is-changing');

    setTimeout(() => {
      nombre.textContent = o.nombre;
      meta.textContent = `${nombreDistrito(o.distrito)} · ${o.ano}`;
      desc.textContent = o.descripcion;
      panel.classList.remove('is-changing');
    }, sinMovimiento ? 0 : 200);
  };

  const arrancar = () => {
    if (sinMovimiento) return;
    detener();
    timer = setInterval(() => mostrar(actual + 1), CONFIG.destacadas.intervalo || 5000);
  };
  const detener = () => { if (timer) clearInterval(timer); timer = null; };

  fotos.forEach((f, i) => {
    f.addEventListener('click', () => { mostrar(i); arrancar(); });
    f.addEventListener('focus', () => mostrar(i));
    f.addEventListener('mouseenter', () => { mostrar(i); detener(); });
  });

  fila.addEventListener('mouseleave', arrancar);
  document.addEventListener('visibilitychange', () => (document.hidden ? detener() : arrancar()));

  mostrar(0);
  arrancar();
}

/* ---------- FRANJA DE SELLOS ISO (portada) ---------- */
function renderIsoBand() {
  const host = document.getElementById('isoBand');
  if (!host) return;

  host.innerHTML = CONFIG.certificaciones.map(c => {
    const norma = c.titulo.split(':')[0];
    const contenido = c.sello
      ? `<img src="${c.sello}" alt="Sello ${norma}" loading="lazy">`
      : `<span class="seal__fallback"><b>ISO</b>${norma.replace('ISO ', '')}</span>`;
    return `
      <a class="iso" href="certificaciones.html" title="${c.titulo} — ${c.nombre}">
        ${contenido}
      </a>`;
  }).join('');
}
```

### 3.2 En el arranque

Agregar `renderDestacadas();` y `renderIsoBand();` dentro del
`document.addEventListener('DOMContentLoaded', ...)`.

`renderCertificaciones()` se queda como está: ya no encuentra su contenedor en la
portada, pero sigue funcionando en `certificaciones.html`.

---

## 4. `css/styles.css`

Agregar como sección nueva:

```css
/* ---------- PORTADA: TIRA DE PROYECTOS ---------- */
.strip { padding-top: clamp(3.5rem, 8vw, 7rem); background: var(--white); }

.strip__head { margin-bottom: clamp(1.75rem, 3vw, 2.5rem); }

.strip__title {
  font-size: var(--step-3);
  font-weight: 800;
  text-transform: uppercase;
  color: var(--ink-soft);
  line-height: 1.05;
}
.strip__title span { display: block; color: var(--orange); }

/* La tira: la activa ocupa el triple que las demás */
.strip__row {
  display: flex;
  height: clamp(340px, 46vw, 560px);
  gap: 4px;
}

.strip__item {
  flex: 1;
  min-width: 0;
  border: 0;
  padding: 0;
  cursor: pointer;
  background-size: cover;
  background-position: center;
  position: relative;
  filter: grayscale(0.45) brightness(0.8);
  transition: flex 0.7s var(--ease), filter 0.5s var(--ease);
}
.strip__item.is-active { flex: 3.2; filter: none; }

.strip__item::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 55%, rgba(7,24,44,0.45));
  opacity: 0;
  transition: opacity 0.5s var(--ease);
}
.strip__item.is-active::after { opacity: 1; }

.strip__item:focus-visible { outline: 3px solid var(--orange); outline-offset: -3px; }

/* Panel con corte diagonal, montado sobre las fotos */
.strip__panel {
  position: relative;
  margin-top: -46px;
  padding-block: clamp(3.5rem, 6vw, 5rem) clamp(3rem, 6vw, 5rem);
  background: var(--concrete);
  clip-path: polygon(0 46px, 100% 0, 100% 100%, 0 100%);
}

.strip__panel-inner { max-width: 62ch; transition: opacity 0.2s var(--ease); }
.strip__panel-inner.is-changing { opacity: 0; }

.strip__name {
  font-size: var(--step-2);
  color: var(--navy);
  line-height: 1.2;
}
.strip__meta {
  margin-top: 0.5rem;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: var(--step--1);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--orange-ink);
}
.strip__desc { margin-top: 1rem; color: var(--ink-soft); }

/* ---------- PORTADA: FRANJA DE SELLOS ---------- */
.isoband { background: var(--white); padding-block: clamp(2rem, 4vw, 3rem); border-top: 1px solid var(--line); }

.isoband__row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: clamp(1.5rem, 4vw, 3.5rem);
}

.iso {
  width: 76px; height: 92px;
  display: grid;
  place-items: center;
  filter: grayscale(1);
  opacity: 0.6;
  transition: filter 0.3s var(--ease), opacity 0.3s var(--ease), transform 0.3s var(--ease);
}
.iso:hover, .iso:focus-visible {
  filter: none;
  opacity: 1;
  transform: translateY(-3px);
}
.iso img { max-width: 100%; max-height: 100%; object-fit: contain; }

/* ---------- Responsive de la tira ---------- */
@media (max-width: 820px) {
  /* Carrusel: una foto a la vez */
  .strip__row { height: 56vw; min-height: 240px; gap: 0; }
  .strip__item { display: none; }
  .strip__item.is-active { display: block; flex: 1; }

  .strip__panel { margin-top: -28px; clip-path: polygon(0 28px, 100% 0, 100% 100%, 0 100%); }
}

@media (max-width: 560px) {
  .iso { width: 62px; height: 76px; }
}
```

---

## 5. Verificación

Con el sitio corriendo (`python -m http.server 8000`), abrir `http://localhost:8000`:

- [ ] Después de Nosotros viene "NUESTROS PROYECTOS", con la segunda palabra en naranja.
- [ ] Se ven cuatro fotos en fila: una ancha y a color, tres angostas y en gris.
- [ ] Cada 5 segundos se expande la siguiente, y el texto de abajo cambia con ella.
- [ ] El panel de texto tiene el borde superior en diagonal y se monta sobre las fotos.
- [ ] Al pasar el mouse por una foto angosta, esa se expande y el avance se detiene.
- [ ] Al sacar el mouse de la tira, el avance se reanuda.
- [ ] Las fotos no llevan a ninguna página al hacer clic.
- [ ] Con Tab se puede recorrer las cuatro fotos y cada una se expande al recibir el foco.
- [ ] Al final, los cuatro sellos centrados, en gris, que se ven a color al pasar el mouse.
- [ ] Clic en un sello lleva a `certificaciones.html`.
- [ ] En celular: una sola foto a la vez, que va cambiando sola.
- [ ] La lista completa de certificaciones sigue funcionando en `certificaciones.html`.
- [ ] Sin errores en la consola.

---

## 6. Notas

- Si un id de `emblematicas` no existe o la obra no tiene foto, se omite en silencio.
  Con cuatro ids válidos la tira funciona; con menos, también, solo que con menos fotos.
- Los sellos usan el mismo campo `sello` de `CONFIG.certificaciones` que se agregó en
  `cambios-nosotros.md`. Mientras no estén las imágenes, se dibuja el sello genérico.
- La descripción que aparece en el panel es la misma que ya está en cada obra, así que
  si se edita ahí, cambia en los dos lugares.
