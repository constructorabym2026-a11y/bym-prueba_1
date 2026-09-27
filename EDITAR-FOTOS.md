# Análisis comparativo: Drive vs config.js (fotos por obra)

Comparación entre las notas del análisis de Drive y el estado real de `js/config.js` y la carpeta `images/`.

## Coincide con la nota (sin acción)

- **Calles 54/55/58** (`sector-multiple`) — galería completa (9 fotos). No estaba marcada como pendiente, y en efecto no hay nada que agregar.
- **Venus** (`pasaje-venus`) — galería completa (11 fotos).
- **Virgen del Carmen** (`parque-virgen-carmen`) — galería completa (9 fotos).
- **Patria Nueva** (`patria-nueva-movilidad`) — galería completa (7 fotos).
- **Av. 17 de Noviembre** (`av-17-noviembre`) — confirmado, `image` y `galeria` vacíos en config, igual que indica la nota ("no hay fotos").
- **Nueva Amistad** (`nueva-amistad`) — confirmado, vacío en config, coherente con "en obra sin información".
- **Calle 17** (`calle-17`) — galería con 6 fotos, coincide con "Drive = config".
- **Mercurio-Alto** (`mercurio-alto`) — galería con 6 fotos (con nombre de archivo `rosa_*.jpg`, no `mercurio_*`). Nota: el bloque de datos aparecía dos veces ("MERCURIO" y "MERCURIO-ALTO") con la misma info — parecen ser la misma obra duplicada en Drive; en config solo existe una vez, que es lo correcto.

## Pendientes de fotos (confirmado, para cuando se agreguen)

- **Perú Japón** (`parque-peru-japon`) — hoy `image: ''` y `galeria: []`, totalmente vacío. Confirmado: falta agregar todo.
- **Beta** (`av-betancourt`) — ya tiene 8 fotos; agregar las adicionales del Drive.
- **Chillón** (`chillon`) — ya tiene 6 fotos (`chillon_1..6`); agregar más.
- **Justicia** (`parque-justicia`) — ya tiene 7 fotos; agregar más.
- **Central** (`av-central`) — hoy está **totalmente vacío** (`image:''`, `galeria: []`); no son "unas pocas fotos más", falta la galería completa.
- **Jazmines** — ⚠️ ambigüedad: en config existen **dos** proyectos con "Jazmines": `calle-jazmines` (Renovación de pavimento — Calle Los Jazmines, ya tiene 5 fotos) y `tulipanes-jazmines` (Los Tulipanes y Los Jazmines, vacío). Al agregar fotos, confirmar a cuál de los dos corresponde la carpeta de Drive para no mezclarlas.

## Discrepancias encontradas (no mencionadas en la nota original)

- **Padua**: la nota decía "sí hay fotos en Drive y en config, se puede mejorar". Pero en el config actual, **ambos** proyectos de Padua están vacíos: `escalera-padua` (coincide con el CUI 2654742, "Renovación de escalera de acceso") tiene `image:''` y `galeria: []`, y `padua-movilidad` también. No hay ninguna foto de Padua en config hoy — revisar si la comparación fue contra una versión anterior del archivo.
- **Rosales 2**: la nota dice "completo en Drive y completo en config", pero **no existe ningún proyecto de Rosales 2ª etapa en config.js**. Solo existe `rosales-pro-3era-etapa` (3ª etapa, contrato N°0014-2026, coincide con el bloque "ROSALES 3"). El de 2ª etapa (contrato N°0013-2026) falta por completo, no solo las fotos.
- **Geriátrico**: confirmado que falta en config — no aparece ningún proyecto de Geriátrico/AA.HH. Santa Rosa de Naranjal. Es una obra entera por crear (no solo fotos).
- **Consorcio Ruwaykuna**: "sin datos" — no aparece ningún id relacionado en config, no hay nada que comparar.

## Otras observaciones (fuera del alcance de fotos, sin tocar config.js)

- **Nueva Amistad** y **Av. 17 de Noviembre** están marcados `estado: 'ejecutada'` en config, pero los datos contractuales indican que Av. 17 de Noviembre recién termina en junio 2026 y Nueva Amistad está "en propuesta". Si en efecto no han terminado, el stat de portada "16 obras ejecutadas" quedaría inflado.
- El campo `ano` de **Perú Japón** está en 2025 en config, pero el contrato pegado tiene entrega de terreno en febrero 2026.
