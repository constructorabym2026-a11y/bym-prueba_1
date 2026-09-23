/* ============================================================
   MOVIMIENTO
   Todo con APIs nativas del navegador: IntersectionObserver y
   requestAnimationFrame. Sin AOS, sin GSAP, sin jQuery.
   Si el usuario pidió menos movimiento en su sistema, se apaga.
   ============================================================ */

const SIN_MOVIMIENTO = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- 1. Entrada al aparecer en pantalla ---------- */
function initReveal() {
  const elementos = document.querySelectorAll('.reveal');
  if (!elementos.length) return;

  if (SIN_MOVIMIENTO || !('IntersectionObserver' in window)) {
    elementos.forEach(el => el.classList.add('is-in'));
    return;
  }

  const observer = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
      if (!entrada.isIntersecting) return;
      entrada.target.classList.add('is-in');
      observer.unobserve(entrada.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  elementos.forEach(el => observer.observe(el));
}

/** Escalona la entrada de los hijos de un contenedor.
 *  Úsalo después de renderizar tarjetas por JavaScript. */
function escalonar(contenedor, paso = 80) {
  if (!contenedor || SIN_MOVIMIENTO) return;
  [...contenedor.children].forEach((hijo, i) => {
    hijo.style.transitionDelay = `${Math.min(i, 8) * paso}ms`;
  });
}

/* ---------- 2. Contadores ---------- */
function initContadores() {
  const nodos = document.querySelectorAll('[data-contador]');
  if (!nodos.length) return;

  const animar = (nodo) => {
    const destino = Number(nodo.dataset.contador);
    const sufijo = nodo.dataset.sufijo || '';

    if (SIN_MOVIMIENTO) { nodo.textContent = destino + sufijo; return; }

    const duracion = 1400;
    const inicio = performance.now();

    const paso = (ahora) => {
      const avance = Math.min((ahora - inicio) / duracion, 1);
      // Desaceleración suave al final
      const suave = 1 - Math.pow(1 - avance, 3);
      nodo.textContent = Math.round(destino * suave) + sufijo;
      if (avance < 1) requestAnimationFrame(paso);
    };
    requestAnimationFrame(paso);
  };

  if (!('IntersectionObserver' in window)) { nodos.forEach(animar); return; }

  const observer = new IntersectionObserver((entradas) => {
    entradas.forEach(e => {
      if (!e.isIntersecting) return;
      animar(e.target);
      observer.unobserve(e.target);
    });
  }, { threshold: 0.5 });

  nodos.forEach(n => observer.observe(n));
}

/* ---------- 3. Cabecera compacta al bajar ---------- */
function initHeaderScroll() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  // Centinela de 1px: mientras se ve, estamos arriba del todo
  const centinela = document.createElement('div');
  centinela.setAttribute('aria-hidden', 'true');
  centinela.style.cssText = 'position:absolute;top:0;height:1px;width:1px;';
  document.body.prepend(centinela);

  if (!('IntersectionObserver' in window)) return;

  new IntersectionObserver(([entrada]) => {
    header.classList.toggle('is-stuck', !entrada.isIntersecting);
  }).observe(centinela);
}

/* ---------- 4. Parallax de banners ---------- */
function initParallax() {
  const capas = document.querySelectorAll('[data-parallax]');
  if (!capas.length || SIN_MOVIMIENTO || window.innerWidth < 820) return;

  let pendiente = false;

  const pintar = () => {
    capas.forEach(capa => {
      const caja = capa.getBoundingClientRect();
      if (caja.bottom < 0 || caja.top > window.innerHeight) return;
      const factor = Number(capa.dataset.parallax) || 0.25;
      const desplazamiento = (window.innerHeight - caja.top) * factor * 0.1;
      capa.style.backgroundPosition = `center calc(50% + ${desplazamiento.toFixed(1)}px)`;
    });
    pendiente = false;
  };

  window.addEventListener('scroll', () => {
    if (pendiente) return;
    pendiente = true;
    requestAnimationFrame(pintar);
  }, { passive: true });

  pintar();
}

/* ---------- 5. Botón volver arriba ---------- */
function initVolverArriba() {
  const boton = document.getElementById('toTop');
  if (!boton) return;

  let pendiente = false;
  const revisar = () => {
    boton.classList.toggle('is-visible', window.scrollY > 600);
    pendiente = false;
  };

  window.addEventListener('scroll', () => {
    if (pendiente) return;
    pendiente = true;
    requestAnimationFrame(revisar);
  }, { passive: true });
}

/* ---------- Arranque ---------- */
document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initContadores();
  initHeaderScroll();
  initParallax();
  initVolverArriba();
});
