# Cambios de Certificaciones — `certificaciones.html`

Documento de trabajo para aplicar con Claude Code sobre el proyecto `bym-web`.
Aplicar **después** de `cambios-proyectos-portada.md`.

---

## Resumen

La página pasa a tener dos vistas dentro del mismo archivo, sin recargar y sin abrir
ventanas nuevas:

**Vista lista.** Las cuatro certificaciones como tarjetas anchas: sello a la izquierda,
título y descripción a la derecha. Al acercar el puntero a cualquier parte del
rectángulo, el sello crece, el fondo se aclara, aparece una sombra y el borde izquierdo
naranja se extiende. Todo el rectángulo es clicable.

**Vista detalle.** A la izquierda, una flecha para volver, el título y la descripción
completa. A la derecha, la imagen del certificado con flechas a los lados para pasar al
siguiente. La dirección cambia a `certificaciones.html#iso9001`, así el enlace se puede
compartir y el botón "atrás" del navegador funciona.

Sin botón de PDF, sin rotación automática y sin ficha de datos: solo la imagen, como
en la referencia. Al hacer clic sobre la imagen, se abre a pantalla completa en el visor
que ya tiene el sitio, para poder leer el alcance.

---

## 1. Imágenes

Crear la carpeta `images/certificados/` y colocar dentro los cuatro archivos, con
estos nombres exactos:

```
images/certificados/ISO9001.jpg
images/certificados/ISO45001.jpg
images/certificados/ISO37001.jpg
images/certificados/ISO14001.jpg
```

---

## 2. `js/config.js`

### 2.1 Agregar el campo `imagen` a cada certificación

```js
    {
      id: 'iso9001',
      titulo: 'ISO 9001:2015',
      …
      imagen: 'images/certificados/ISO9001.jpg'
    },
```

Repetir con `ISO45001.jpg`, `ISO37001.jpg` e `ISO14001.jpg` en las otras tres.

### 2.2 Corregir el número de la ISO 14001

Dice `SCC/INT/2512CR/2512CR/22140`, con un tramo repetido. Debe decir:

```js
      numero: 'SCC/INT/2512CR/22140',
```

El campo `pdf` puede quedarse: ya no se usa en la página, pero no estorba.

---

## 3. `certificaciones.html`

Reemplazar las **dos secciones** que hay después de las migas de pan (la de la lista
de certificaciones y la de "Por qué importan en obra pública") por esta sola:

```html
  <section class="block">
    <div class="wrap" id="certApp"></div>
  </section>
```

El banner y las migas de pan se quedan igual.

---

## 4. `js/main.js`

Reemplazar la función `renderCertificaciones()` completa por este bloque:

```js
/* ---------- CERTIFICACIONES: lista y detalle ---------- */
function renderCertificaciones() {
  const host = document.getElementById('certApp');
  if (!host) return;

  const certs = CONFIG.certificaciones;

  /* ----- Vista de lista ----- */
  const verLista = () => {
    host.innerHTML = `
      <div class="block__head reveal">
        <h2 class="block__title">Certificaciones vigentes</h2>
        <div class="roadline"></div>
        <p class="block__intro">Toca una certificación para ver el documento.</p>
      </div>

      <div class="certlist">
        ${certs.map(c => `
        <button type="button" class="certcard reveal" data-id="${c.id}">
          <span class="certcard__seal">
            ${c.sello
              ? `<img src="${c.sello}" alt="" loading="lazy">`
              : `<span class="seal__fallback"><b>ISO</b>${c.titulo.split(':')[0].replace('ISO ', '')}</span>`}
          </span>
          <span class="certcard__body">
            <span class="certcard__title">Certificado ${c.titulo.split(':')[0]}</span>
            <span class="certcard__name">${c.nombre}</span>
            <span class="certcard__text">${c.descripcion}</span>
          </span>
          <span class="certcard__go" aria-hidden="true"><i class="fas fa-arrow-right"></i></span>
        </button>`).join('')}
      </div>`;

    host.querySelectorAll('.certcard').forEach(t => {
      t.addEventListener('click', () => { location.hash = t.dataset.id; });
    });

    if (typeof initReveal === 'function') initReveal();
  };

  /* ----- Vista de detalle ----- */
  const verDetalle = (id) => {
    const i = certs.findIndex(c => c.id === id);
    if (i < 0) { verLista(); return; }
    const c = certs[i];

    host.innerHTML = `
      <div class="certdetail">
        <div class="certdetail__text">
          <button type="button" class="certdetail__back" id="certBack">
            <i class="fas fa-arrow-left" aria-hidden="true"></i> Todas las certificaciones
          </button>

          <h2 class="certdetail__title">Certificado ${c.titulo.split(':')[0]}</h2>
          <p class="certdetail__name">${c.nombre}</p>
          <div class="roadline"></div>
          <p class="certdetail__desc">${c.descripcion}</p>
          <p class="certdetail__hint"><i class="fas fa-magnifying-glass-plus" aria-hidden="true"></i> Toca el certificado para verlo en grande</p>
        </div>

        <div class="certdetail__doc">
          <button type="button" class="certdetail__arrow certdetail__arrow--prev" id="certPrev" aria-label="Certificación anterior">
            <i class="fas fa-chevron-left" aria-hidden="true"></i>
          </button>

          <img class="certdetail__img" id="certImg" src="${c.imagen}" alt="Certificado ${c.titulo} de ${CONFIG.empresa.nombre}">

          <button type="button" class="certdetail__arrow certdetail__arrow--next" id="certNext" aria-label="Certificación siguiente">
            <i class="fas fa-chevron-right" aria-hidden="true"></i>
          </button>

          <p class="certdetail__counter">${i + 1} / ${certs.length}</p>
        </div>
      </div>`;

    const ir = (paso) => {
      location.hash = certs[(i + paso + certs.length) % certs.length].id;
    };

    document.getElementById('certBack').addEventListener('click', () => {
      history.pushState('', '', location.pathname);   // quita el # sin recargar
      verLista();
      host.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    document.getElementById('certPrev').addEventListener('click', () => ir(-1));
    document.getElementById('certNext').addEventListener('click', () => ir(1));

    // La imagen se abre a pantalla completa en el visor del sitio
    document.getElementById('certImg').addEventListener('click', () => {
      Visor.abrir([c.imagen.replace('images/', '')], `Certificado ${c.titulo}`);
    });
  };

  /* ----- Qué mostrar según la dirección ----- */
  const resolver = () => {
    const id = location.hash.replace('#', '');
    certs.some(c => c.id === id) ? verDetalle(id) : verLista();
  };

  window.addEventListener('hashchange', resolver);

  document.addEventListener('keydown', e => {
    if (!location.hash) return;
    const id = location.hash.replace('#', '');
    const i = certs.findIndex(c => c.id === id);
    if (i < 0) return;
    if (e.key === 'ArrowLeft')  location.hash = certs[(i - 1 + certs.length) % certs.length].id;
    if (e.key === 'ArrowRight') location.hash = certs[(i + 1) % certs.length].id;
    if (e.key === 'Escape')     { history.pushState('', '', location.pathname); verLista(); }
  });

  resolver();
}
```

La llamada a `renderCertificaciones()` en el arranque se queda como está.

---

## 5. `css/styles.css`

Borrar las reglas antiguas `.cert-list`, `.cert`, `.cert__seal`, `.cert__title`,
`.cert__name`, `.cert__text`, `.cert__data` y la regla de `.cert` dentro de la media
query de 820 px. Agregar en su lugar:

```css
/* ---------- CERTIFICACIONES: LISTA ---------- */
.certlist { display: grid; gap: 1.25rem; }

.certcard {
  display: grid;
  grid-template-columns: 110px 1fr auto;
  gap: 1.75rem;
  align-items: center;
  width: 100%;
  text-align: left;
  background: var(--concrete);
  border: 0;
  border-left: 4px solid transparent;
  padding: 1.75rem;
  cursor: pointer;
  font: inherit;
  transition: background 0.3s var(--ease), box-shadow 0.3s var(--ease),
              border-color 0.3s var(--ease), transform 0.3s var(--ease);
}
.certcard:hover,
.certcard:focus-visible {
  background: var(--white);
  border-left-color: var(--orange);
  box-shadow: var(--shadow);
  transform: translateY(-2px);
}

.certcard__seal {
  display: grid;
  place-items: center;
  height: 110px;
  transition: transform 0.35s var(--ease);
}
.certcard:hover .certcard__seal,
.certcard:focus-visible .certcard__seal { transform: scale(1.12); }
.certcard__seal img { max-width: 100%; max-height: 100%; object-fit: contain; }

.certcard__body { display: block; }
.certcard__title {
  display: block;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: var(--step-1);
  color: var(--navy);
  text-transform: uppercase;
}
.certcard__name { display: block; color: var(--orange-ink); font-weight: 600; font-size: var(--step--1); margin-top: 0.15rem; }
.certcard__text { display: block; color: var(--ink-soft); font-size: var(--step--1); margin-top: 0.7rem; max-width: 70ch; }

.certcard__go {
  width: 44px; height: 44px;
  display: grid; place-items: center;
  border-radius: 50%;
  background: var(--white);
  color: var(--orange-ink);
  transition: background 0.3s var(--ease), color 0.3s var(--ease), transform 0.3s var(--ease);
}
.certcard:hover .certcard__go {
  background: var(--orange);
  color: var(--white);
  transform: translateX(4px);
}

/* ---------- CERTIFICACIONES: DETALLE ---------- */
.certdetail {
  display: grid;
  grid-template-columns: 1fr 1.15fr;
  gap: clamp(2rem, 5vw, 4rem);
  align-items: start;
}

.certdetail__back {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: none;
  border: 0;
  padding: 0;
  margin-bottom: 1.75rem;
  cursor: pointer;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: var(--step--1);
  color: var(--ink-soft);
  transition: color 0.25s var(--ease);
}
.certdetail__back:hover { color: var(--orange-ink); }

.certdetail__title { font-size: var(--step-2); text-transform: uppercase; }
.certdetail__name { color: var(--orange-ink); font-weight: 600; margin-top: 0.2rem; }
.certdetail__desc { margin-top: 1.5rem; color: var(--ink-soft); }
.certdetail__hint { margin-top: 1.5rem; font-size: var(--step--1); color: var(--navy-300); }
.certdetail__hint i { margin-right: 0.4rem; }

.certdetail__doc { position: relative; }

.certdetail__img {
  width: 100%;
  border: 1px solid var(--line);
  box-shadow: var(--shadow);
  cursor: zoom-in;
  transition: box-shadow 0.3s var(--ease);
}
.certdetail__img:hover { box-shadow: var(--shadow-lg); }

.certdetail__arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  width: 46px; height: 46px;
  display: grid; place-items: center;
  background: var(--white);
  border: 1px solid var(--line);
  color: var(--navy);
  font-size: 1.15rem;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  transition: background 0.25s var(--ease), color 0.25s var(--ease);
}
.certdetail__arrow:hover { background: var(--orange); color: var(--white); border-color: var(--orange); }
.certdetail__arrow--prev { left: -23px; }
.certdetail__arrow--next { right: -23px; }

.certdetail__counter {
  margin-top: 0.9rem;
  text-align: center;
  font-family: var(--font-display);
  font-size: var(--step--1);
  color: var(--ink-soft);
}

@media (max-width: 820px) {
  .certcard { grid-template-columns: 76px 1fr; gap: 1rem; padding: 1.25rem; }
  .certcard__seal { height: 76px; }
  .certcard__go { display: none; }

  .certdetail { grid-template-columns: 1fr; }
  .certdetail__arrow--prev { left: 6px; }
  .certdetail__arrow--next { right: 6px; }
}
```

---

## 6. Verificación

Con el sitio corriendo (`python -m http.server 8000`), abrir
`http://localhost:8000/certificaciones.html`:

- [ ] Se ven cuatro tarjetas anchas con sello, título y descripción.
- [ ] Al acercar el puntero a cualquier parte de la tarjeta: el sello crece, el fondo se
      aclara, aparece sombra y el borde izquierdo naranja.
- [ ] Al hacer clic se abre el detalle en la misma página, sin ventana nueva.
- [ ] La dirección pasa a `certificaciones.html#iso9001`.
- [ ] Las flechas a los lados de la imagen pasan a la siguiente certificación.
- [ ] Las teclas ← y → también cambian de certificado; Escape vuelve a la lista.
- [ ] El botón "Todas las certificaciones" vuelve a la lista.
- [ ] El botón "atrás" del navegador funciona entre certificados y lista.
- [ ] Al hacer clic en la imagen, se abre a pantalla completa y se cierra con Escape.
- [ ] Entrando directo a `certificaciones.html#iso37001`, abre ese certificado.
- [ ] En celular: tarjetas en dos columnas (sello y texto), detalle en una sola columna
      con las flechas sobre la imagen.
- [ ] Sin errores en la consola.

---

## 7. Notas

- Se eliminó de esta página el bloque "Por qué importan en obra pública". Si se quiere
  recuperar, va después de la sección nueva, pero solo tiene sentido en la vista lista.
- El contador "1 / 4" debajo de la imagen es opcional: si se prefiere sin él, se borra
  el párrafo `certdetail__counter` del HTML y su regla de CSS.
- El alcance del certificado es texto muy pequeño en la imagen. El visor a pantalla
  completa ayuda, pero en celular seguirá costando leerlo. Si más adelante alguna
  entidad lo pide, la salida es publicar el alcance como texto en la página.
