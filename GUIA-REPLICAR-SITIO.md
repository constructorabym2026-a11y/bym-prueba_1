# Cómo replicar este sitio para otra constructora

Guía técnica + de aprendizaje, escrita a partir del código real de este proyecto
(`bym-prueba_1`). Está pensada para alguien de **1er ciclo de Ingeniería
Informática**: no asume que ya sabes frameworks, solo HTML/CSS/JS básicos.
El objetivo no es que copies y pegues sin entender — es que entiendas *por qué*
está construido así, para que puedas reconstruirlo desde cero para otra empresa.

---

## 0. La idea central (léela dos veces, es la clave de todo)

Este sitio **no tiene backend, ni base de datos, ni framework** (nada de React,
Vue, WordPress). Es HTML + CSS + JavaScript "de toda la vida", cargado
directo por el navegador. Pero no está escrito como una página estática
cualquiera. Sigue una idea simple y muy poderosa:

> **El HTML no tiene casi contenido. El contenido vive en UN SOLO objeto de
> JavaScript (`CONFIG`, en `js/config.js`). El resto del JavaScript lee ese
> objeto y "dibuja" el HTML con código.**

¿Por qué esto es tan importante que lo primero que debes aprender?

- **Evita repetir información.** El nombre de la empresa, el teléfono o una
  obra aparecen en el menú, el pie de página, una tarjeta y quizá el mapa. Si
  estuviera escrito a mano en cada `.html`, cambiarlo significaría editar 6
  archivos y seguro te olvidas de uno. Con `CONFIG`, lo cambias en un solo
  lugar y se actualiza en todo el sitio.
- **Separa "qué se muestra" de "cómo se muestra".** `config.js` es datos
  puros (texto, números, rutas de imagen). Los demás `.js` son la lógica que
  convierte esos datos en HTML. Esto es el mismo principio que usan React,
  Vue o Angular (datos → función que renderiza → interfaz), solo que aquí lo
  hacemos a mano, sin librería. Entender esto primero hace que aprender un
  framework después te resulte mucho más fácil, porque ya entiendes la idea,
  solo cambia la sintaxis.
- **Es lo que te permite "duplicar" el sitio.** Para otra constructora, en
  teoría, **el 90% del trabajo es reescribir `config.js`** con los datos de la
  otra empresa. El HTML, el CSS y casi todo el JS se quedan igual.

---

## 1. Mapa del proyecto

```
bym-prueba_1/
├── index.html            ← Portada
├── nosotros.html         ← Quiénes somos
├── servicios.html        ← Especialidades (rubros de trabajo)
├── proyectos.html        ← Listado de obras, con filtros
├── certificaciones.html  ← ISO de la empresa
├── contacto.html         ← Formulario + mapa
│
├── css/
│   └── styles.css        ← TODO el diseño visual (1 solo archivo)
│
├── js/
│   ├── config.js         ← LOS DATOS. El único archivo "de contenido".
│   ├── components.js     ← Cabecera y pie de página (se repiten en todas las páginas)
│   ├── main.js            ← Hero, contadores, especialidades, certificaciones, contacto…
│   ├── proyectos.js       ← Tarjetas de obra, filtro por rubro, mapa de cobertura
│   └── animations.js      ← Animaciones al hacer scroll (sin librerías)
│
├── images/                ← Fotos (obras, logo, etc.)
└── docs/                  ← PDFs de las certificaciones
```

Cada página `.html` es casi un cascarón vacío: un `<div id="hero">`, un
`<header id="siteHeader">`, etc. Los scripts, en orden, rellenan esos huecos.

---

## 2. El ciclo de vida de una página (paso a paso)

Toma `index.html` como ejemplo y sigue este orden exacto, porque **el orden
de los `<script>` importa**:

```html
<script src="js/config.js"></script>      <!-- 1. Se cargan los datos -->
<script src="js/components.js"></script>  <!-- 2. Funciones para header/footer -->
<script src="js/main.js"></script>        <!-- 3. Funciones para el resto de secciones -->
<script src="js/proyectos.js"></script>   <!-- 4. Funciones de la sección de obras -->
<script src="js/animations.js"></script>  <!-- 5. Funciones de animación -->
```

1. El navegador lee `config.js` primero: crea la variable global `CONFIG`
   con todos los datos. Si este archivo tuviera un error de sintaxis, **nada
   más funcionaría**, porque los otros scripts asumen que `CONFIG` existe.
2. Se cargan las funciones (`components.js`, `main.js`, etc.), pero **no se
   ejecutan solas todavía** — solo quedan definidas.
3. Cada archivo termina con algo como:
   ```js
   document.addEventListener('DOMContentLoaded', () => {
     montarHeader();
     montarFooter();
     montarFlotantes();
   });
   ```
   Esto le dice al navegador: "cuando el HTML ya esté listo, ejecuta estas
   funciones". Ahí es cuando realmente se construye la página.
4. Cada función busca un contenedor vacío por su `id` (`document.getElementById('siteHeader')`),
   arma un string de HTML usando *template literals* y datos de `CONFIG`, y lo
   mete con `.innerHTML = ...`.
5. Al final, `animations.js` revisa qué elementos tienen la clase `.reveal` y
   los anima cuando entran en pantalla.

**Lección clave:** en este proyecto "programar el frontend" significa
escribir funciones que devuelven strings de HTML armados con los datos de
`CONFIG`. No hay nada mágico — es JavaScript puro.

---

## 3. `config.js`: la única fuente de verdad

Ábrelo y notarás que es **un solo objeto gigante** (`const CONFIG = {...}`)
con bloques bien separados y comentados. Estos son los que vas a tener que
adaptar para otra empresa:

```js
const CONFIG = {
  empresa: { nombre: '...', ruc: '...', eslogan: '...', ... },
  hero: { titulo: '...', slides: [ {palabra, imagen, obra}, ... ] },
  contacto: { telefono, whatsapp, email, direccion, horario },
  redes: { youtube, linkedin, instagram },
  stats: [ { valor: 16, etiqueta: 'obras ejecutadas' }, ... ],
  rubros: [ { id, nombre, descripcion, imagenes: [...] }, ... ],
  destacadas: { emblematicas: ['id-obra-1', 'id-obra-2', ...] },
  certificaciones: [ { id, titulo, imagen, numero, ... }, ... ],
  proyectos: [ { id, nombre, cliente, rubro, galeria: [...], orden: {...} }, ... ],
  institucional: { historia, mision, vision }
};
```

Ideas importantes de este diseño:

- **Cada obra es un objeto con un `id` único** (`'pasaje-venus'`,
  `'calle-17'`...). Ese `id` se usa para relacionar datos entre secciones sin
  copiar texto: por ejemplo, `destacadas.emblematicas` solo guarda el `id`, y
  el nombre/foto/descripción se buscan en `proyectos` cuando se necesitan.
  Esto es exactamente cómo funciona una **llave primaria** en una base de
  datos — aquí la "base de datos" es simplemente un array de objetos.
- **Los campos `rubro` / `rubroSecundario`** conectan una obra con una
  categoría (`pistas`, `espacios`, `contencion`). Así, un mismo dato
  (`proyectos`) alimenta tres vistas distintas (todas las obras, filtradas
  por categoría, o el menú de especialidades) sin repetirse.
- **El campo `orden`** (que construimos juntos en este proyecto) es un buen
  ejemplo de "diseñar el dato para el problema real": en vez de que la
  posición de una tarjeta dependa del orden en el array (algo rígido, difícil
  de cambiar), cada obra dice explícitamente en qué lugar va, por cada vista:
  ```js
  orden: { todos: 3, pistas: 1 }
  ```
  Esto se lee así: "en la vista sin filtrar soy la 3ª obra; en el filtro
  'pistas' soy la 1ª". El JavaScript que ordena (en `proyectos.js`) simplemente
  busca ese número y ordena de menor a mayor.

**Regla de oro cuando dupliques el sitio:** solo necesitas reescribir este
archivo con los datos de la nueva empresa. Si respetas la misma forma
(mismos nombres de campos, mismo tipo de dato), el resto del sitio funciona
sin tocarlo.

---

## 4. Los archivos JS: una responsabilidad por archivo

Este es un principio de ingeniería de software real llamado **separación de
responsabilidades** (*separation of concerns*). Cada archivo hace una sola
cosa:

| Archivo | Responsabilidad | Funciones clave |
|---|---|---|
| `config.js` | Guardar datos | (ninguna función, solo el objeto `CONFIG`) |
| `components.js` | Cabecera y pie, iguales en todas las páginas | `montarHeader()`, `montarFooter()`, `montarFlotantes()` |
| `main.js` | Todo lo demás: hero, contadores, especialidades, certificaciones, formulario | `renderHero()`, `initHero()`, `renderStats()`, `Visor` (galería a pantalla completa) |
| `proyectos.js` | Tarjetas de obra, filtro lateral, mapa de cobertura | `renderObras()`, `initSidenav()`, `renderMapa()` |
| `animations.js` | Animar cuando algo entra en pantalla | `initReveal()`, `escalonar()`, `initContadores()` |

Cuando dupliques el sitio, en principio **no necesitas tocar estos 5
archivos** salvo que quieras agregar una sección nueva que no existía (por
ejemplo, un blog). El trabajo de "programar" ya está hecho; lo que cambia es
el contenido en `config.js`.

---

## 5. Patrones de JavaScript que tienes que dominar

Estos son los conceptos reales que usa el código, con ejemplos sacados tal
cual del proyecto. Si entiendes estos 6 puntos, puedes leer y modificar
cualquier parte del sitio.

### 5.1 Template literals para "renderizar" HTML

```js
// js/proyectos.js
function tarjetaObra(obra) {
  return `
    <article class="card-project" data-rubro="${obra.rubro}">
      <h3>${obra.nombre}</h3>
      <p>${obra.descripcion}</p>
    </article>`;
}
```

Un *template literal* (comillas invertidas `` ` ``) permite meter variables
dentro de un string con `${...}`. Aquí es como se "arma" cada tarjeta: se le
pasa un objeto `obra` (uno de los elementos de `CONFIG.proyectos`) y devuelve
el HTML ya armado como texto.

### 5.2 `map`, `filter`, `sort` sobre arrays de objetos

Todo `CONFIG.proyectos`, `CONFIG.rubros`, `CONFIG.certificaciones`, etc. son
**arrays de objetos**. El código casi nunca usa `for`; usa los métodos de
array:

```js
// "Traducir" cada objeto obra en un string de HTML, y unir todo:
lista.map(tarjetaObra).join('')

// Quedarme solo con las obras de un rubro:
CONFIG.proyectos.filter(p => p.rubro === 'pistas')

// Ordenar por el campo `orden`:
lista.sort((a, b) => ordenEnVista(a.p, rubro) - ordenEnVista(b.p, rubro))
```

Si todavía no dominas `map`/`filter`/`sort`/`find`/`reduce`, es la prioridad
número uno antes de tocar este código. Son la base de casi todo JavaScript
moderno.

### 5.3 Buscar y modificar el DOM

```js
const host = document.getElementById('projectsGrid');
host.innerHTML = lista.map(tarjetaObra).join('');
```

El patrón siempre es: **buscar el contenedor vacío por `id`** → **generar el
HTML como string** → **inyectarlo con `innerHTML`**.

### 5.4 Eventos y "escuchar" acciones del usuario

```js
hero.querySelector('.hero__arrow--next').addEventListener('click', () => {
  mostrar(actual + 1);
});
```

`addEventListener` conecta una función a un evento (clic, tecla, scroll...).
Casi toda interactividad del sitio (flechas del hero, abrir galería, filtro
de obras, menú móvil) es esto.

### 5.5 `IntersectionObserver`: animar al hacer scroll, sin librerías

```js
// js/animations.js
const observer = new IntersectionObserver((entradas) => {
  entradas.forEach(entrada => {
    if (entrada.isIntersecting) entrada.target.classList.add('is-in');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
```

Es una API nativa del navegador que avisa cuándo un elemento entra en la
pantalla. Aquí se usa para poner una clase CSS (`is-in`) que dispara una
transición. No hace falta ninguna librería de animaciones para esto.

### 5.6 Estado guardado en la URL

```js
// js/proyectos.js
const url = new URL(window.location);
url.searchParams.set('rubro', 'pistas');
history.replaceState(null, '', url);
```

Cuando filtras por "Pistas y pavimentación", la URL cambia a
`proyectos.html?rubro=pistas` sin recargar la página. Así el filtro se puede
compartir por link. Lo mismo pasa en `certificaciones.html`, pero usando el
"hash" (`certificaciones.html#iso9001`) en vez de un parámetro.

---

## 6. CSS: tokens + secciones (para poder "re-marcar" el sitio)

Todo el diseño vive en **un solo archivo**, `css/styles.css`, organizado en
capas numeradas (tokens, base, layout, header, hero, componentes, páginas,
footer, responsive...). Lo primero del archivo es esto:

```css
:root {
  --navy: #0B2545;
  --orange: #FF6B35;
  --font-display: 'Montserrat', system-ui, sans-serif;
  --font-body: 'Roboto', system-ui, sans-serif;
  --wrap: 1200px;
  --radius: 4px;
  ...
}
```

Esto son **variables CSS (custom properties)**, llamadas aquí "tokens": son
los "botones maestros" del diseño. Todo el resto del CSS usa `var(--navy)`,
`var(--orange)`, etc. en vez de escribir el color directo.

**Esto es la razón por la que puedes "recolorear" todo el sitio para otra
empresa cambiando ~10 líneas**, sin tocar el resto de las 1600 líneas de CSS.
Si la nueva constructora usa verde y gris en vez de azul y naranja, cambias
`--navy` y `--orange` aquí y se actualiza en todos los botones, títulos,
bordes, etc.

---

## 7. Cómo correr el proyecto en tu computadora

Como no hay backend ni build (no hay `npm install`, ni Webpack, ni Vite), no
necesitas instalar nada de Node.js para *ver* el sitio. Pero **no basta con
hacer doble clic al `.html`** — algunas cosas (rutas relativas, fetch, el
caché del navegador) funcionan mejor con un servidor local mínimo:

```bash
# Si tienes Python instalado (viene en la mayoría de sistemas):
python -m http.server 8000

# Luego abre en el navegador:
http://localhost:8000/index.html
```

Alternativa sin terminal: la extensión **Live Server** de VS Code (clic
derecho en `index.html` → "Open with Live Server").

**Gotcha real que nos pasó en este proyecto:** el navegador cachea
agresivamente los `.js` cuando los sirves con `python -m http.server`. Si
editas `config.js` o `proyectos.js` y el cambio "no se ve", antes de asumir
que hay un bug, haz un *hard refresh* (`Ctrl+Shift+R` en Windows/Linux). Es
uno de los primeros hábitos de depuración que vale la pena automatizar.

---

## 8. Validar antes de mostrar (evita romper todo el sitio)

`config.js` es JavaScript de verdad, no un archivo de datos "seguro" como
JSON. Un simple error de sintaxis —una coma faltante entre dos strings, una
comilla sin cerrar— **rompe absolutamente todo el sitio**, porque ningún
otro script puede leer `CONFIG`. Nos pasó exactamente esto en este proyecto:

```js
// ❌ Error real que tuvimos: falta una coma entre estos dos strings
galeria: ['beta_2.jpg','beta_9.jpg''beta_3.jpg', 'beta_4.jpg']
```

Antes de abrir el navegador, valida la sintaxis desde la terminal (si tienes
Node.js instalado):

```bash
node --check js/config.js
```

Si no marca nada, la sintaxis es válida. Esto no revisa que los *datos* sean
correctos (por ejemplo, que una imagen exista), solo que el archivo sea
JavaScript válido. Es un hábito barato que ahorra mucho tiempo de
depuración.

---

## 9. Receta paso a paso: duplicar el sitio para otra constructora

1. **Copia la carpeta completa** del proyecto con otro nombre.
2. **Vacía `images/` y `docs/`** y pon las fotos y PDFs de la nueva empresa
   (respeta que sean los mismos *tipos* de contenido: logo, fotos de hero,
   fotos por obra, certificados si aplica).
3. **Reescribe `js/config.js` de arriba a abajo**, bloque por bloque:
   - `empresa`: nombre, RUC, eslogan.
   - `hero`: título y las 3-4 fotos del carrusel de portada.
   - `contacto` y `redes`.
   - `stats`: los números que quieren mostrar como logros.
   - `rubros`: las categorías de servicio de la nueva empresa (pueden ser
     2, 3 o más — no tienen que ser las mismas 3 de este proyecto).
   - `certificaciones`: bórralo o vacíalo si la empresa no tiene ISO (revisa
     entonces `certificaciones.html` para quitar el enlace del menú).
   - `proyectos`: la lista de obras/proyectos, cada uno con su `id` único,
     su `rubro`, su `galeria` y su `orden`.
   - `destacadas.emblematicas`: qué 3-4 `id` de `proyectos` van en la tira
     de la portada.
4. **Cambia los "tokens" de `css/styles.css`** (sección 1, `:root`): colores
   de marca, tipografías (Google Fonts), y ya tienes el "re-branding" hecho.
5. **Revisa cada `.html`** por textos que estén escritos a mano (no todo sale
   de `CONFIG` — por ejemplo, el bloque "Quiénes somos" en `index.html` tiene
   párrafos fijos). Búscalos y reescríbelos.
6. **Corre `node --check js/config.js`**, abre con un servidor local, y
   navega TODAS las páginas revisando la consola del navegador (F12 →
   Console) buscando errores en rojo.
7. **Verifica que cada imagen referenciada en `config.js` exista de verdad**
   en `images/`. Un typo en el nombre de archivo no rompe el sitio, solo deja
   un espacio en blanco (a diferencia del error de sintaxis, que sí rompe
   todo) — así que hay que revisarlo a ojo o con un script.

---

## 10. Errores que ya nos pasaron en este proyecto (aprende de ellos)

- **Coma faltante entre dos strings de un array** → rompe TODO el sitio
  (sección 8). Siempre corre `node --check`.
- **Copiar y pegar un objeto de obra para crear uno nuevo, y olvidar cambiar
  el texto** (nombre, descripción, ubicación quedaron iguales a la obra
  original). Repasa cada campo, no solo el `id`.
- **Dos obras con exactamente el mismo `id`** → como el `id` se usa para
  buscar la obra (por ejemplo al abrir su galería), un duplicado hace que
  siempre se encuentre la primera y nunca la segunda.
- **Caché del navegador** mostrando la versión vieja del JS después de
  editar (sección 7) — parece un bug, pero es solo el navegador sirviendo una
  copia guardada.

---

## 11. Glosario rápido (para lo que aún no hayas visto en clase)

| Término | En una frase |
|---|---|
| **DOM** | La representación del HTML en memoria que JavaScript puede leer y modificar. |
| **`document.getElementById` / `querySelector`** | Formas de "buscar" un elemento del HTML desde JS. |
| **Template literal** | String con comillas invertidas `` ` `` que permite insertar variables con `${...}`. |
| **`addEventListener`** | Conectar una función a que se ejecute cuando pasa un evento (clic, scroll, tecla). |
| **`map` / `filter` / `sort` / `find`** | Métodos de array que transforman/filtran/ordenan/buscan sin escribir un `for`. |
| **CSS custom property (variable / token)** | `--nombre: valor;` en CSS, reutilizable con `var(--nombre)`. |
| **`IntersectionObserver`** | API del navegador que avisa cuándo un elemento entra o sale de la pantalla. |
| **`URLSearchParams` / `location.hash`** | Formas de guardar un "estado" (como un filtro activo) directamente en la URL. |
| **Separación de responsabilidades** | Principio de diseño: cada archivo/función hace una sola cosa bien definida. |
| **Fuente única de verdad (*single source of truth*)** | Que un dato exista en un solo lugar (aquí, `CONFIG`) y todo lo demás lo lea de ahí, en vez de copiarlo. |

---

## 12. Próximos pasos, si quieres seguir creciendo esto

Este patrón (HTML vacío + JS que renderiza desde un objeto de datos) es,
literalmente, la idea que hay detrás de frameworks como React o Vue — solo
que ellos lo hacen de forma más potente y con más herramientas (JSX,
componentes reutilizables, actualización automática cuando cambian los
datos). Una vez que domines completamente **este** proyecto (poder editarlo,
duplicarlo, depurarlo sin ayuda), vas a estar en muy buena posición para
aprender:

1. **Un framework de componentes** (React o Vue) — vas a reconocer
   inmediatamente el patrón "datos → render".
2. **Un formulario de contacto real con backend** (hoy usa Formspree, un
   servicio externo gratuito) — para aprender Node.js/Express más adelante.
3. **Convertir `config.js` en datos que vienen de un panel de administración**
   (con una base de datos real) en vez de estar escritos a mano — el
   siguiente paso natural de este proyecto.

Pero no te apures: entender a fondo *este* proyecto, sin frameworks, es la
base más sólida que puedes tener antes de saltar a lo siguiente.
