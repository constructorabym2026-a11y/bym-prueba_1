/* ============================================================
   LÓGICA PRINCIPAL
   Slider de portada, visor de fotos, formulario y las secciones
   que se arman solas a partir de js/config.js
   ============================================================ */

/* ---------- PORTADA ---------- */
function renderHero() {
  const hero = document.getElementById('hero');
  if (!hero || !CONFIG.hero) return;

  const { titulo, tituloMovil, slides } = CONFIG.hero;

  // Variante de jerarquía: la de config, o ?hero=v2 en la URL para comparar
  const enUrl = new URL(window.location).searchParams.get('hero');
  const variante = enUrl || CONFIG.hero.jerarquia || 'v1';
  hero.classList.add(`hero--${variante}`);

  const capas = slides.map((s, i) => `
    <div class="hero__slide${i === 0 ? ' is-active' : ''}" style="background-image:url('${s.imagen}')"></div>`).join('');

  hero.innerHTML = `
    ${capas}

    <div class="wrap hero__content">
      <p class="hero__word" id="heroWord" aria-hidden="true">${slides[0].palabra}</p>
      <h1 class="hero__title">
        <span class="hero__title-full">${titulo}</span>
        <span class="hero__title-short">${tituloMovil || titulo}</span>
      </h1>
    </div>

    <button type="button" class="hero__arrow hero__arrow--prev" aria-label="Imagen anterior">
      <i class="fas fa-chevron-left" aria-hidden="true"></i>
    </button>
    <button type="button" class="hero__arrow hero__arrow--next" aria-label="Imagen siguiente">
      <i class="fas fa-chevron-right" aria-hidden="true"></i>
    </button>

    <p class="hero__caption" id="heroCaption">${slides[0].obra || ''}</p>`;

  initHero();
}

function initHero() {
  const hero = document.getElementById('hero');
  if (!hero) return;

  const slides = [...hero.querySelectorAll('.hero__slide')];
  const palabra = hero.querySelector('#heroWord');
  const pie = hero.querySelector('#heroCaption');
  const datos = CONFIG.hero.slides;
  if (slides.length < 2) return;

  const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let actual = 0;
  let timer = null;

  const mostrar = (i) => {
    actual = (i + slides.length) % slides.length;

    slides.forEach((s, n) => s.classList.toggle('is-active', n === actual));

    // La palabra y el pie funden; el h1 se queda quieto
    palabra.classList.add('is-changing');
    pie.classList.add('is-changing');

    setTimeout(() => {
      palabra.textContent = datos[actual].palabra;
      pie.textContent = datos[actual].obra || '';
      palabra.classList.remove('is-changing');
      pie.classList.remove('is-changing');
    }, sinMovimiento ? 0 : 220);
  };

  const arrancar = () => {
    if (sinMovimiento) return;          // sin autoplay si el sistema pide menos movimiento
    detener();
    timer = setInterval(() => mostrar(actual + 1), CONFIG.hero.intervalo || 6000);
  };
  const detener = () => { if (timer) clearInterval(timer); timer = null; };

  hero.querySelector('.hero__arrow--prev').addEventListener('click', () => { mostrar(actual - 1); arrancar(); });
  hero.querySelector('.hero__arrow--next').addEventListener('click', () => { mostrar(actual + 1); arrancar(); });

  hero.addEventListener('mouseenter', detener);
  hero.addEventListener('mouseleave', arrancar);
  document.addEventListener('visibilitychange', () => (document.hidden ? detener() : arrancar()));

  arrancar();
}

/* ---------- 2. VISOR DE FOTOS ---------- */
const Visor = {
  fotos: [],
  indice: 0,
  titulo: '',
  ultimoFoco: null,

  abrir(fotos, titulo) {
    if (!fotos || !fotos.length) return;
    this.fotos = fotos;
    this.indice = 0;
    this.titulo = titulo || '';
    this.ultimoFoco = document.activeElement;

    const caja = document.getElementById('viewer');
    if (!caja) return;
    caja.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    this.pintar();
    document.getElementById('viewerClose').focus();
  },

  cerrar() {
    const caja = document.getElementById('viewer');
    if (!caja) return;
    caja.classList.remove('is-open');
    document.body.style.overflow = '';
    if (this.ultimoFoco) this.ultimoFoco.focus();
  },

  mover(paso) {
    this.indice = (this.indice + paso + this.fotos.length) % this.fotos.length;
    this.pintar();
  },

  pintar() {
    const img = document.getElementById('viewerImg');
    img.src = 'images/' + this.fotos[this.indice];
    img.alt = `${this.titulo} — foto ${this.indice + 1}`;
    document.getElementById('viewerCaption').textContent = this.titulo;
    document.getElementById('viewerCounter').textContent = `${this.indice + 1} de ${this.fotos.length}`;

    const unaSola = this.fotos.length < 2;
    document.getElementById('viewerPrev').hidden = unaSola;
    document.getElementById('viewerNext').hidden = unaSola;
  },

  get abierto() {
    const caja = document.getElementById('viewer');
    return caja && caja.classList.contains('is-open');
  }
};

function initVisor() {
  const caja = document.getElementById('viewer');
  if (!caja) return;

  document.getElementById('viewerClose').addEventListener('click', () => Visor.cerrar());
  document.getElementById('viewerPrev').addEventListener('click', () => Visor.mover(-1));
  document.getElementById('viewerNext').addEventListener('click', () => Visor.mover(1));

  caja.addEventListener('click', e => { if (e.target === caja) Visor.cerrar(); });

  document.addEventListener('keydown', e => {
    if (!Visor.abierto) return;
    if (e.key === 'Escape') Visor.cerrar();
    if (e.key === 'ArrowLeft') Visor.mover(-1);
    if (e.key === 'ArrowRight') Visor.mover(1);
  });
}

/* Abre la galería de una obra por su id */
function abrirGaleria(idProyecto) {
  const obra = CONFIG.proyectos.find(p => p.id === idProyecto);
  if (!obra) return;
  Visor.abrir(obra.galeria, obra.nombre);
}
window.abrirGaleria = abrirGaleria;

/* ---------- 3. INDICADORES ---------- */
function renderStats() {
  const host = document.getElementById('statsGrid');
  if (!host) return;

  host.innerHTML = CONFIG.stats.map(s => `
    <div class="stat">
      <div class="stat__value">${s.crudo
        ? s.valor
        : `<span data-contador="${s.valor}" data-sufijo="${s.sufijo || ''}">0</span>`}</div>
      <div class="stat__label">${s.etiqueta}</div>
    </div>`).join('');
}

/* ---------- PORTADA DE ESPECIALIDADES ---------- */
function renderEspecialidades() {
  const host = document.getElementById('especialidades');
  if (!host || !CONFIG.especialidades) return;

  const { titulo, acento, fondo } = CONFIG.especialidades;

  // En servicios.html es el h1 de la página; en la portada baja a h2
  const nivel = host.dataset.encabezado === 'h2' ? 'h2' : 'h1';

  const hexagonos = CONFIG.rubros.map(r => {
    const foto = r.reverso || (r.imagenes && r.imagenes[0]) || '';
    return `
      <a class="hex hex--${r.tono || 'navy'}" href="proyectos.html?rubro=${r.id}"
         aria-label="${r.nombre}: ver proyectos">
        <span class="hex__inner">
          <span class="hex__face hex__face--front">
            <span class="hex__name">${r.nombre}</span>
          </span>
          <span class="hex__face hex__face--back" style="background-image:url('${foto}')">
            <span class="hex__name">${r.nombre}</span>
            <span class="hex__go" aria-hidden="true"><i class="fas fa-arrow-right"></i></span>
          </span>
        </span>
      </a>`;
  }).join('');

  host.innerHTML = `
    <div class="especialidades__bg" style="background-image:url('${fondo}')" aria-hidden="true"></div>
    <div class="wrap especialidades__inner">
      <${nivel} class="especialidades__title">${titulo} <span>${acento}</span></${nivel}>
      <div class="hexes">${hexagonos}</div>
    </div>`;
}

/* ---------- MOSAICO DE NOSOTROS ---------- */
function renderMosaico() {
  const host = document.getElementById('mosaico');
  if (!host || !CONFIG.nosotros) return;

  host.innerHTML = CONFIG.nosotros.mosaico.slice(0, 4).map(src => `
    <div class="mosaic__tile" style="background-image:url('${src}')"></div>`).join('');
}

/* ---------- SELLOS DE CERTIFICACIÓN ---------- */
function renderSellos() {
  const host = document.getElementById('sealsRow');
  if (!host) return;

  host.innerHTML = CONFIG.certificaciones.map(c => {
    const norma = c.titulo.split(':')[0];            // 'ISO 9001:2015' → 'ISO 9001'
    const imagen = c.sello
      ? `<img src="${c.sello}" alt="Sello ${norma}" loading="lazy">`
      : `<span class="seal__fallback"><b>ISO</b>${norma.replace('ISO ', '')}</span>`;
    return `
      <a class="seal" href="certificaciones.html" title="${c.titulo} — ${c.nombre}">
        ${imagen}
      </a>`;
  }).join('');
}

/* ---------- 4. SERVICIOS ---------- */
function renderServicios() {
  const host = document.getElementById('serviciosGrid');
  if (!host) return;

  const conDetalle = host.dataset.detalle === 'true';

  host.innerHTML = CONFIG.servicios.map(s => `
    <article class="card-service reveal">
      <div class="card-service__icon"><i class="${s.icono}" aria-hidden="true"></i></div>
      <h3 class="card-service__title">${s.nombre}</h3>
      <p class="card-service__text">${s.resumen}</p>
      ${conDetalle ? `<ul class="card-service__list">${s.detalle.map(d => `<li>${d}</li>`).join('')}</ul>` : ''}
    </article>`).join('');
}

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

  // En captura, para correr antes que el visor: si está abierto, las teclas son suyas
  window.addEventListener('keydown', e => {
    if (Visor.abierto || !location.hash) return;
    const id = location.hash.replace('#', '');
    const i = certs.findIndex(c => c.id === id);
    if (i < 0) return;
    if (e.key === 'ArrowLeft')  location.hash = certs[(i - 1 + certs.length) % certs.length].id;
    if (e.key === 'ArrowRight') location.hash = certs[(i + 1) % certs.length].id;
    if (e.key === 'Escape')     { history.pushState('', '', location.pathname); verLista(); }
  }, true);

  resolver();
}

/* ---------- 6. NOVEDADES ---------- */
const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'set', 'oct', 'nov', 'dic'];

function renderNovedades() {
  const host = document.getElementById('newsGrid');
  if (!host || !Array.isArray(CONFIG.novedades)) return;

  const limite = Number(host.dataset.limite) || CONFIG.novedades.length;

  host.innerHTML = CONFIG.novedades.slice(0, limite).map(n => {
    const f = new Date(n.fecha + 'T00:00:00');
    return `
    <article class="news-item reveal">
      <div class="news-item__media">
        ${n.image ? `<img src="${n.image}" alt="" loading="lazy">` : ''}
        <div class="news-item__date"><b>${f.getDate()}</b>${MESES[f.getMonth()]} ${f.getFullYear()}</div>
      </div>
      <div class="news-item__body">
        <h3 class="news-item__title">${n.titulo}</h3>
        <p class="news-item__text">${n.resumen}</p>
      </div>
    </article>`;
  }).join('');

  escalonar(host);
}

/* ---------- 7. DATOS DE CONTACTO ---------- */
function renderContacto() {
  const host = document.getElementById('contactData');
  if (!host) return;

  const c = CONFIG.contacto;
  const filas = [
    { icono: 'fas fa-phone',        etiqueta: 'Teléfono',  valor: c.telefono, href: `tel:${String(c.telefono).replace(/\s/g, '')}` },
    { icono: 'fab fa-whatsapp',     etiqueta: 'WhatsApp',  valor: c.whatsapp, href: enlaceWhatsapp() },
    { icono: 'fas fa-envelope',     etiqueta: 'Correo',    valor: c.email,    href: `mailto:${c.email}` },
    { icono: 'fas fa-location-dot', etiqueta: 'Oficina',   valor: c.direccion },
    { icono: 'fas fa-clock',        etiqueta: 'Horario',   valor: c.horario }
  ].filter(f => tieneValor(f.valor));

  host.innerHTML = filas.map(f => `
    <div class="contact-data__item">
      <div class="contact-data__icon"><i class="${f.icono}" aria-hidden="true"></i></div>
      <div>
        <div class="contact-data__label">${f.etiqueta}</div>
        <div class="contact-data__value">${f.href ? `<a href="${f.href}">${f.valor}</a>` : f.valor}</div>
      </div>
    </div>`).join('');

  // Mapa de la oficina
  const mapa = document.getElementById('mapEmbed');
  if (mapa && CONFIG.ubicacion.latitud) {
    const { latitud, longitud } = CONFIG.ubicacion;
    const bbox = `${longitud - 0.006},${latitud - 0.004},${longitud + 0.006},${latitud + 0.004}`;
    mapa.innerHTML = `<iframe title="Ubicación de la oficina" loading="lazy"
      src="https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${latitud},${longitud}"></iframe>`;
  }
}

/* ---------- 8. FORMULARIO ---------- */
function aviso(mensaje, tipo) {
  const caja = document.createElement('div');
  caja.className = `toast toast--${tipo}`;
  caja.setAttribute('role', 'status');
  caja.textContent = mensaje;
  document.body.appendChild(caja);

  requestAnimationFrame(() => caja.classList.add('is-open'));
  setTimeout(() => {
    caja.classList.remove('is-open');
    setTimeout(() => caja.remove(), 300);
  }, 4500);
}

function initFormulario() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const datos = Object.fromEntries(new FormData(form));
    if (!datos.nombre || !datos.email || !datos.mensaje) {
      aviso('Falta tu nombre, tu correo o el mensaje.', 'error');
      return;
    }

    const boton = form.querySelector('[type="submit"]');
    const textoOriginal = boton.innerHTML;
    boton.disabled = true;
    boton.innerHTML = 'Enviando…';

    try {
      const respuesta = await fetch(CONFIG.contacto.formspree, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(datos)
      });

      if (respuesta.ok) {
        aviso('Mensaje enviado. Te respondemos en horario de oficina.', 'ok');
        form.reset();
      } else {
        aviso('No se pudo enviar. Escríbenos a ' + CONFIG.contacto.email, 'error');
      }
    } catch (error) {
      aviso('Sin conexión. Escríbenos a ' + CONFIG.contacto.email, 'error');
    } finally {
      boton.disabled = false;
      boton.innerHTML = textoOriginal;
    }
  });
}

/* ---------- Arranque ---------- */
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

document.addEventListener('DOMContentLoaded', () => {
  renderHero();
  initVisor();
  renderStats();
  renderEspecialidades();
  renderMosaico();
  renderSellos();
  renderServicios();
  renderCertificaciones();
  renderDestacadas();
  renderIsoBand();
  renderNovedades();
  renderContacto();
  initFormulario();
});
