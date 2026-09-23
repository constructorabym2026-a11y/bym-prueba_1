/* ============================================================
   COMPONENTES COMUNES
   Cabecera (con el panel de Especialidades), pie de página,
   botón de volver arriba y visor de fotos.
   ============================================================ */

const NAV = [
  { href: 'nosotros.html',        texto: 'Nosotros' },
  { tipo: 'mega',                 texto: 'Especialidades' },
  { href: 'proyectos.html',       texto: 'Proyectos' },
  { href: 'certificaciones.html', texto: 'Certificaciones' }
];

/** Nombre del archivo actual, para marcar el enlace activo */
function paginaActual() {
  const archivo = window.location.pathname.split('/').pop();
  return archivo === '' ? 'index.html' : archivo;
}

/** true si el dato de CONFIG está realmente completado */
function tieneValor(v) {
  return typeof v === 'string' && v.trim() !== '' && v.trim() !== '.' && !v.includes('[COMPLETAR]');
}

function enlaceWhatsapp(texto) {
  const num = CONFIG.contacto.whatsapp;
  if (!tieneValor(num)) return '';
  const msg = encodeURIComponent(texto || 'Hola, quisiera una cotización para una obra.');
  return `https://wa.me/${num.replace(/\D/g, '')}?text=${msg}`;
}

/* ============================================================
   1. CABECERA
   ============================================================ */
function montarHeader() {
  const host = document.getElementById('siteHeader');
  if (!host) return;

  const actual = paginaActual();
  const wa = enlaceWhatsapp();

  const items = NAV.map(item => {
    if (item.tipo === 'mega') {
      return `
        <li class="nav__item nav__item--sub">
          <a class="nav__link" href="servicios.html"${actual === 'servicios.html' ? ' aria-current="page"' : ''}>${item.texto}</a>
          <button type="button" class="nav__subtoggle" id="subToggle"
                  aria-expanded="false" aria-controls="submenuEspecialidades"
                  aria-label="Ver especialidades">
            <i class="fas fa-chevron-down" aria-hidden="true"></i>
          </button>
          ${submenuEspecialidades()}
        </li>`;
    }
    return `
        <li class="nav__item">
          <a class="nav__link" href="${item.href}"${item.href === actual ? ' aria-current="page"' : ''}>${item.texto}</a>
        </li>`;
  }).join('');

  host.className = 'site-header';
  host.innerHTML = `
    <div class="utilbar">
      <div class="wrap utilbar__inner">
        <a href="contacto.html"><i class="fas fa-headset" aria-hidden="true"></i> Contactos</a>
        <a href="mailto:${CONFIG.contacto.email}"><i class="fas fa-envelope" aria-hidden="true"></i> ${CONFIG.contacto.email}</a>
        ${wa ? `<a href="${wa}" target="_blank" rel="noopener"><i class="fab fa-whatsapp" aria-hidden="true"></i> WhatsApp</a>` : ''}
      </div>
    </div>

    <div class="navbar">
      <div class="wrap navbar__inner">
        <a class="brand" href="index.html" aria-label="Inicio — ${CONFIG.empresa.nombre}">
          <img class="brand__img" src="images/logo-fondo-blanco.png" alt="${CONFIG.empresa.nombre}">
        </a>

        <nav aria-label="Navegación principal">
          <button class="nav__toggle" id="navToggle" aria-expanded="false" aria-controls="navList" aria-label="Abrir menú">
            <span></span><span></span><span></span>
          </button>
          <ul class="nav__list" id="navList">${items}
          </ul>
        </nav>
      </div>
    </div>`;

  initMenuMovil(host);
  initSubmenu(host);
}

/* ---------- Desplegable de Especialidades ---------- */
function submenuEspecialidades() {
  // Si ya estamos viendo un filtro, se marca ese rubro
  const rubroActivo = new URL(window.location).searchParams.get('rubro');

  const enlaces = CONFIG.rubros.map(rubro => {
    const activo = rubro.id === rubroActivo;
    return `
        <li>
          <a class="submenu__link${activo ? ' is-current' : ''}"
             href="proyectos.html?rubro=${rubro.id}"${activo ? ' aria-current="true"' : ''}>
            ${rubro.nombre}
          </a>
        </li>`;
  }).join('');

  return `
      <ul class="submenu" id="submenuEspecialidades" hidden>${enlaces}
      </ul>`;
}

/* ---------- Menú móvil ---------- */
function initMenuMovil(host) {
  const toggle = host.querySelector('#navToggle');
  const lista = host.querySelector('#navList');

  toggle.addEventListener('click', () => {
    const abierto = lista.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(abierto));
    toggle.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
  });

  // Al tocar un enlace, se cierra el menú
  lista.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      lista.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---------- Especialidades: hover en escritorio, acordeón en móvil ---------- */
function initSubmenu(host) {
  const item = host.querySelector('.nav__item--sub');
  const toggle = host.querySelector('#subToggle');
  const panel = host.querySelector('#submenuEspecialidades');
  if (!item || !toggle || !panel) return;

  const esEscritorio = () => window.matchMedia('(min-width: 821px)').matches;
  let cierre = null;

  const abrir = () => {
    clearTimeout(cierre);
    panel.hidden = false;
    requestAnimationFrame(() => panel.classList.add('is-open'));
    item.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
  };

  const cerrar = () => {
    panel.classList.remove('is-open');
    item.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    if (esEscritorio()) {
      cierre = setTimeout(() => { panel.hidden = true; }, 220);
    } else {
      panel.hidden = true;
    }
  };

  const alternar = () => (toggle.getAttribute('aria-expanded') === 'true' ? cerrar() : abrir());

  // Escritorio: se abre al pasar el mouse
  item.addEventListener('mouseenter', () => { if (esEscritorio()) abrir(); });
  item.addEventListener('mouseleave', () => {
    if (!esEscritorio()) return;
    clearTimeout(cierre);
    cierre = setTimeout(cerrar, 180);   // margen para llegar al panel
  });

  // Clic y teclado: funciona en ambos tamaños
  toggle.addEventListener('click', alternar);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      cerrar();
      toggle.focus();
    }
  });

  // Si el foco sale del panel con Tab, se cierra
  item.addEventListener('focusout', e => {
    if (!item.contains(e.relatedTarget)) cerrar();
  });

  window.addEventListener('resize', cerrar);
}

/* ============================================================
   2. PIE DE PÁGINA
   ============================================================ */
const ICONOS_RED = {
  youtube:   { clase: 'fab fa-youtube',     nombre: 'YouTube' },
  linkedin:  { clase: 'fab fa-linkedin-in', nombre: 'LinkedIn' },
  instagram: { clase: 'fab fa-instagram',   nombre: 'Instagram' }
};

function montarFooter() {
  const host = document.getElementById('siteFooter');
  if (!host) return;

  const redes = Object.entries(CONFIG.redes)
    .filter(([red, url]) => ICONOS_RED[red] && tieneValor(url))
    .map(([red, url]) => {
      const { clase, nombre } = ICONOS_RED[red];
      return `<a href="${url}" target="_blank" rel="noopener" aria-label="${nombre}"><i class="${clase}" aria-hidden="true"></i></a>`;
    }).join('');

  const enlaces = [
    { href: 'nosotros.html',        texto: 'Nosotros' },
    { href: 'servicios.html',       texto: 'Especialidades' },
    { href: 'proyectos.html',       texto: 'Proyectos' },
    { href: 'certificaciones.html', texto: 'Certificaciones' },
    { href: 'contacto.html',        texto: 'Contacto' }
  ].map(i => `<li><a href="${i.href}">${i.texto}</a></li>`).join('');

  host.className = 'site-footer';
  host.innerHTML = `
    <div class="wrap">
      <div class="footer__grid">
        <div>
          <h3>${CONFIG.empresa.nombre}</h3>
          <p class="footer__text">${CONFIG.empresa.descripcionCorta}</p>
          ${tieneValor(CONFIG.empresa.ruc) ? `<p class="footer__text" style="margin-top:0.75rem">RUC ${CONFIG.empresa.ruc}</p>` : ''}
          ${redes ? `<div class="footer__social">${redes}</div>` : ''}
        </div>

        <div>
          <h3>Secciones</h3>
          <ul class="footer__links">${enlaces}</ul>
        </div>

        <div>
          <h3>Contacto</h3>
          <ul class="footer__links">
            ${tieneValor(CONFIG.contacto.telefono) ? `<li><i class="fas fa-phone" aria-hidden="true"></i> ${CONFIG.contacto.telefono}</li>` : ''}
            <li><a href="mailto:${CONFIG.contacto.email}"><i class="fas fa-envelope" aria-hidden="true"></i> ${CONFIG.contacto.email}</a></li>
            ${tieneValor(CONFIG.contacto.direccion) ? `<li><i class="fas fa-location-dot" aria-hidden="true"></i> ${CONFIG.contacto.direccion}</li>` : ''}
            <li><i class="fas fa-clock" aria-hidden="true"></i> ${CONFIG.contacto.horario}</li>
          </ul>
        </div>
      </div>

      <div class="footer__bottom">
        <span>© ${new Date().getFullYear()} ${CONFIG.empresa.nombre}. Todos los derechos reservados.</span>
        <span>Obras públicas y privadas en Lima Norte</span>
      </div>
    </div>`;
}

/* ============================================================
   3. VOLVER ARRIBA Y VISOR DE FOTOS
   (sin botón flotante de WhatsApp)
   ============================================================ */
function montarFlotantes() {
  const arriba = document.createElement('button');
  arriba.className = 'to-top';
  arriba.id = 'toTop';
  arriba.type = 'button';
  arriba.setAttribute('aria-label', 'Volver arriba');
  arriba.innerHTML = '<i class="fas fa-arrow-up" aria-hidden="true"></i>';
  arriba.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  document.body.appendChild(arriba);

  const visor = document.createElement('div');
  visor.className = 'viewer';
  visor.id = 'viewer';
  visor.setAttribute('role', 'dialog');
  visor.setAttribute('aria-modal', 'true');
  visor.setAttribute('aria-label', 'Fotos de la obra');
  visor.innerHTML = `
    <button class="viewer__btn viewer__btn--close" id="viewerClose" aria-label="Cerrar">&times;</button>
    <button class="viewer__btn viewer__btn--prev" id="viewerPrev" aria-label="Foto anterior">&#10094;</button>
    <button class="viewer__btn viewer__btn--next" id="viewerNext" aria-label="Foto siguiente">&#10095;</button>
    <figure class="viewer__figure">
      <img class="viewer__img" id="viewerImg" src="" alt="">
      <figcaption>
        <div class="viewer__caption" id="viewerCaption"></div>
        <div class="viewer__counter" id="viewerCounter"></div>
      </figcaption>
    </figure>`;
  document.body.appendChild(visor);
}

document.addEventListener('DOMContentLoaded', () => {
  montarHeader();
  montarFooter();
  montarFlotantes();
});
