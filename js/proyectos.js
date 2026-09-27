/* ============================================================
   OBRAS Y COBERTURA
   Tarjetas de obra, menú lateral por rubro y mapa esquemático
   de Lima Norte. Todo sale de js/config.js
   ============================================================ */

/* ---------- 1. TARJETA DE OBRA ---------- */
function tarjetaObra(obra) {
  const tieneFotos = obra.galeria && obra.galeria.length > 0;
  const enEjecucion = obra.estado === 'ejecucion';

  const medio = obra.image && tieneFotos
    ? `<img src="${obra.image}" alt="${obra.nombre}" loading="lazy">`
    : `<div class="card-project__placeholder">
         <i class="fas fa-helmet-safety" aria-hidden="true"></i>
         <span>Obra en ejecución<br>Fotografías al término de los trabajos</span>
       </div>`;

  return `
    <article class="card-project reveal${tieneFotos ? ' card-project--clickable' : ''}" data-rubro="${obra.rubro}" data-distrito="${obra.distrito}">
      <div class="card-project__media"${tieneFotos ? ` onclick="abrirGaleria('${obra.id}')"` : ''}>
        <span class="card-project__badge${enEjecucion ? ' card-project__badge--ejecucion' : ''}">
          ${enEjecucion ? 'En ejecución' : 'Ejecutada'}
        </span>
        <span class="card-project__year">${obra.ano}</span>
        ${medio}
      </div>

      <div class="card-project__body">
        <h3 class="card-project__title">${obra.nombre}</h3>

        <dl class="card-project__meta">
          <div><dt>Entidad:</dt><dd>${obra.cliente}</dd></div>
          <div><dt>Ubicación:</dt><dd>${obra.ubicacion}</dd></div>
          ${obra.empresa ? `<div><dt>Ejecución:</dt><dd>${obra.empresa}</dd></div>` : ''}
        </dl>

        <p class="card-project__desc">${obra.descripcion}</p>

        <div class="card-project__foot">
          <span class="tag">${nombreRubro(obra.rubro)}</span>
          ${tieneFotos
            ? `<button type="button" class="card-project__link" onclick="abrirGaleria('${obra.id}')">
                 Ver ${obra.galeria.length} ${obra.galeria.length === 1 ? 'foto' : 'fotos'}
               </button>`
            : ''}
        </div>
      </div>
    </article>`;
}

/* ---------- 2. LISTADO ----------
   Orden de las tarjetas: cada obra puede traer un campo `orden` en
   config.js, ej. { todos: 1, pistas: 3 }. La clave es la vista
   ('todos' o el id de un rubro) y el valor es la posición dentro de
   esa vista (1 = primera, de izquierda a derecha). Una obra sin
   `orden` (o sin la clave de esa vista) sale al final, en el orden
   en que aparece en el array.                                      */
function ordenEnVista(obra, vista) {
  const n = obra.orden && obra.orden[vista];
  return typeof n === 'number' ? n : Infinity;
}

function renderObras(rubro = 'todos', distrito = null) {
  const host = document.getElementById('projectsGrid');
  if (!host) return;

  const limite = Number(host.dataset.limite) || 0;

  let lista = CONFIG.proyectos.map((p, i) => ({ p, i }));
  if (rubro !== 'todos') lista = lista.filter(({ p }) => p.rubro === rubro || p.rubroSecundario === rubro);
  if (distrito) lista = lista.filter(({ p }) => p.distrito === distrito);

  lista.sort((a, b) => (ordenEnVista(a.p, rubro) - ordenEnVista(b.p, rubro)) || (a.i - b.i));
  lista = lista.map(({ p }) => p);

  if (limite) lista = lista.slice(0, limite);

  host.innerHTML = lista.length
    ? lista.map(tarjetaObra).join('')
    : `<p class="empty-state">No hay obras registradas en este rubro todavía.</p>`;

  escalonar(host);
  // Las tarjetas se crearon después del observer inicial: se revelan aquí
  if (typeof initReveal === 'function') initReveal();
}

/* ---------- 3. MENÚ LATERAL POR RUBRO ---------- */
function initSidenav() {
  const host = document.getElementById('sidenavList');
  if (!host) return;

  const cuenta = (id) => id === 'todos'
    ? CONFIG.proyectos.length
    : CONFIG.proyectos.filter(p => p.rubro === id || p.rubroSecundario === id).length;

  const ICONO = { pistas: 'fas fa-road', espacios: 'fas fa-tree-city', contencion: 'fas fa-stairs' };

  const opciones = [{ id: 'todos', nombre: 'Todas las obras', icono: 'fas fa-border-all' }]
    .concat(CONFIG.rubros.map(r => ({ id: r.id, nombre: r.nombre, icono: ICONO[r.id] || 'fas fa-helmet-safety' })));

  host.innerHTML = opciones.map((r, i) => `
    <button type="button" class="sidenav__btn${i === 0 ? ' is-active' : ''}" data-rubro="${r.id}">
      <i class="${r.icono}" aria-hidden="true"></i>
      <span>${r.nombre}</span>
      <span class="sidenav__count">${cuenta(r.id)}</span>
    </button>`).join('');

  host.addEventListener('click', e => {
    const boton = e.target.closest('.sidenav__btn');
    if (!boton) return;

    host.querySelectorAll('.sidenav__btn').forEach(b => b.classList.remove('is-active'));
    boton.classList.add('is-active');
    renderObras(boton.dataset.rubro);

    // Refleja el filtro en la URL, para poder compartir el enlace
    const url = new URL(window.location);
    boton.dataset.rubro === 'todos'
      ? url.searchParams.delete('rubro')
      : url.searchParams.set('rubro', boton.dataset.rubro);
    history.replaceState(null, '', url);
  });

  // Filtro inicial desde la URL: proyectos.html?rubro=vial
  const inicial = new URL(window.location).searchParams.get('rubro');
  const botonInicial = inicial && host.querySelector(`[data-rubro="${inicial}"]`);
  if (botonInicial) botonInicial.click();
}

/* ---------- 4. MAPA DE COBERTURA ----------
   Esquema, no cartografía exacta: sirve para mostrar en qué
   distritos de Lima Norte trabaja la empresa.                */
const FORMAS = {
  'puente-piedra': { poly: '30,40 170,22 190,150 62,170',    x: 108, y: 100 },
  'carabayllo':    { poly: '192,20 392,52 372,190 202,152',  x: 290, y: 108 },
  'comas':         { poly: '204,162 370,202 342,320 216,292', x: 288, y: 240 },
  'los-olivos':    { poly: '62,180 196,162 212,296 96,320',  x: 136, y: 240 },
  'independencia': { poly: '218,302 342,332 316,432 238,412', x: 280, y: 372 },
  'san-martin':    { poly: '96,332 212,306 232,416 122,440', x: 166, y: 378 }
};

function renderMapa() {
  const host = document.getElementById('mapaCobertura');
  if (!host) return;

  const claro = host.dataset.tema === 'claro';
  const detalle = document.getElementById('coverageDetail');
  const modoFlotante = !detalle;

  const obrasDe = (id) => CONFIG.proyectos.filter(p => p.distrito === id);

  const zonas = CONFIG.cobertura.map(d => {
    const forma = FORMAS[d.id];
    if (!forma) return '';
    const n = obrasDe(d.id).length;
    const clase = n > 0 ? 'activo' : d.estado;
    const corto = d.nombre.replace('San Martín de Porres', 'S.M. Porres');

    return `
      <g class="map__group" role="button" tabindex="0"
         data-distrito="${d.id}" aria-label="${d.nombre}, ${n} obras">
        <title>${d.nombre}</title>
        <polygon class="map__zone map__zone--${clase}" points="${forma.poly}"></polygon>
        ${n ? `<text class="map__count" x="${forma.x}" y="${forma.y - 6}" text-anchor="middle">${n}</text>` : ''}
        <text class="map__label" x="${forma.x}" y="${forma.y + (n ? 14 : 4)}" text-anchor="middle">${corto}</text>
      </g>`;
  }).join('');

  host.classList.toggle('map-wrap--claro', claro);
  host.innerHTML = `
    <svg class="map${claro ? ' map--claro' : ''}" viewBox="0 0 420 470" role="img"
         aria-label="Distritos de Lima Norte donde trabaja la empresa">
      ${zonas}
    </svg>
    ${modoFlotante ? '<div class="map-tip" id="mapTip" role="dialog" aria-live="polite" hidden></div>' : ''}
    <div class="map__legend">
      <span><i class="map__key map__key--activo"></i> Obras ejecutadas</span>
      <span><i class="map__key map__key--sede"></i> Oficina</span>
      <span><i class="map__key map__key--cobertura"></i> Zona de cobertura</span>
    </div>`;

  /* ----- Contenido común: qué se dice de cada distrito ----- */
  const contenido = (id) => {
    const d = CONFIG.cobertura.find(x => x.id === id);
    const obras = obrasDe(id);
    const lista = obras.slice(0, 4)
      .map(o => `<li>${o.nombre.split(' — ')[1] || o.nombre} · ${o.ano}</li>`).join('');
    const resto = obras.length > 4 ? `<li class="map-tip__more">y ${obras.length - 4} más</li>` : '';

    const vacio = d.estado === 'sede'
      ? 'Aquí está nuestra oficina. Atendemos convocatorias de este distrito.'
      : 'Distrito dentro de nuestra zona de trabajo. Aún sin obra ejecutada.';

    return { d, obras, lista, resto, vacio };
  };

  /* ----- Modo panel (proyectos.html): igual que antes ----- */
  const mostrarPanel = (id) => {
    const { d, obras, vacio } = contenido(id);
    detalle.innerHTML = `
      <h3 class="coverage__district">${d.nombre}</h3>
      ${obras.length
        ? `<ul class="coverage__list">
             ${obras.map(o => `<li><i class="fas fa-location-dot" aria-hidden="true"></i><span>${o.nombre} · ${o.ano}</span></li>`).join('')}
           </ul>
           <a class="btn btn--primary" style="margin-top:1.5rem" href="proyectos.html">Ver las obras</a>`
        : `<p style="margin-top:1rem;color:rgba(255,255,255,0.75)">${vacio}</p>`}`;
  };

  /* ----- Modo flotante (nosotros.html) ----- */
  const tip = host.querySelector('#mapTip');
  const svg = host.querySelector('svg');

  const mostrarTip = (id) => {
    const { d, obras, lista, resto, vacio } = contenido(id);
    const forma = FORMAS[id];

    tip.innerHTML = `
      <button type="button" class="map-tip__close" aria-label="Cerrar">&times;</button>
      <p class="map-tip__name">${d.nombre}</p>
      ${obras.length
        ? `<p class="map-tip__count">${obras.length} ${obras.length === 1 ? 'obra' : 'obras'}</p>
           <ul class="map-tip__list">${lista}${resto}</ul>
           <a class="map-tip__link" href="proyectos.html">Ver obras <i class="fas fa-arrow-right" aria-hidden="true"></i></a>`
        : `<p class="map-tip__empty">${vacio}</p>`}`;

    // Ubica la ventana sobre el centro del distrito, a la escala real del SVG
    const caja = svg.getBoundingClientRect();
    const base = host.getBoundingClientRect();
    const x = caja.left - base.left + forma.x * (caja.width / 420);
    const y = caja.top  - base.top  + forma.y * (caja.height / 470);

    tip.style.left = `${Math.max(120, Math.min(x, base.width - 120))}px`;
    tip.style.top  = `${y}px`;
    tip.hidden = false;

    tip.querySelector('.map-tip__close').addEventListener('click', ocultarTip);
    host.querySelectorAll('.map__group').forEach(g =>
      g.classList.toggle('is-selected', g.dataset.distrito === id));
  };

  const ocultarTip = () => {
    if (!tip) return;
    tip.hidden = true;
    host.querySelectorAll('.map__group').forEach(g => g.classList.remove('is-selected'));
  };

  const mostrar = modoFlotante ? mostrarTip : mostrarPanel;
  const conMouse = window.matchMedia('(hover: hover)').matches;

  host.querySelectorAll('.map__group').forEach(g => {
    const id = g.dataset.distrito;
    g.addEventListener('click', () => mostrar(id));
    g.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); mostrar(id); }
    });
    // En escritorio, la ventanita también aparece al pasar el mouse
    if (modoFlotante && conMouse) g.addEventListener('mouseenter', () => mostrar(id));
  });

  if (modoFlotante) {
    document.addEventListener('keydown', e => { if (e.key === 'Escape') ocultarTip(); });
    document.addEventListener('click', e => {
      if (!host.contains(e.target)) ocultarTip();
    });
  } else {
    // Modo panel: arranca con el distrito que tiene más obras
    const principal = [...CONFIG.cobertura].sort((a, b) => obrasDe(b.id).length - obrasDe(a.id).length)[0];
    if (principal) mostrarPanel(principal.id);
  }
}

/* ---------- Arranque ---------- */
document.addEventListener('DOMContentLoaded', () => {
  renderObras();
  initSidenav();
  renderMapa();
});
