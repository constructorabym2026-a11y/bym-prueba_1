/* ============================================================
   CONSTRUCTORA Y PROYECTOS B&M S.A.C.
   Configuración central del sitio.
   Este es el ÚNICO archivo que debes editar para cambiar
   datos, obras, contacto o certificaciones.
   Los campos marcados con [COMPLETAR] deben llenarse.
   ============================================================ */

const CONFIG = {

  empresa: {
    nombre: 'Constructora y Proyectos B&M S.A.C.',
    nombreCorto: 'B&M',
    ruc: '20604736421',                 // verificar antes de publicar
    eslogan: 'Proyectos sólidos, resultados reales',
    fundacion: 2022,
    descripcionCorta: 'Ejecutamos obras de pistas, veredas y movilidad urbana para municipalidades de Lima Norte.'
  },

  /* ---------- PORTADA ----------
     titulo      : h1 real, visible. No rota. Es lo que Google lee.
     tituloMovil : versión corta, se usa por debajo de 820 px.
     jerarquia   : 'v1' | 'v2' | 'v3' — ver cambios-hero.md.
     slides      : palabras decorativas + imagen + pie de foto.
     obra        : identifica la obra de la imagen. Vacío = no se muestra. */
  hero: {
    titulo: 'Pistas, veredas y espacio público para Lima Norte',
    tituloMovil: 'Obras viales y urbanas en Lima Norte',
    jerarquia: 'v1',
    intervalo: 6000,

    slides: [
      {
        palabra: 'CUMPLIMIENTO',
        imagen: 'images/virgen.jpg',
        obra: 'Parque Virgen del Carmen, Los Olivos · 2025'
      },
      {
        palabra: 'SEGURIDAD',
        imagen: 'images/calles54_5.jpg',
        obra: 'Pasaje Venus, Los Olivos · 2025'
      },
      {
        palabra: 'EXPERIENCIA',
        imagen: 'images/calles54.jpg',
        obra: 'Calles 54, 55 y 58, Los Olivos · 2025'
      },
      {
        palabra: 'CALIDAD',
        imagen: 'images/justicia_1.jpg',
        obra: 'A.H. Patria Nueva, Los Olivos · 2025'
      }
    ]
  },

  contacto: {
    telefono: '[COMPLETAR]',            // ej: '(01) 555 1234'
    whatsapp: '[COMPLETAR]',            // solo dígitos con código país, ej: '51987654321'
    email: 'bymconstructorasac@gmail.com',
    direccion: 'Av. San Felipe 1006, Comas, Lima',   // verificar
    horario: 'Lunes a viernes, 9:00 a 18:00',
    formspree: 'https://formspree.io/f/xjgnagnp'
  },

  // Botones del pie de página. Deja vacío lo que no uses y el ícono no aparece.
  redes: {
    youtube:   '',
    linkedin:  '',
    instagram: ''
  },

  ubicacion: {
    latitud: -11.9398,
    longitud: -77.0553,
    googleMapsUrl: ''   // [COMPLETAR] enlace "Compartir" de Google Maps
  },

  /* ---------- Indicadores de la portada ---------- */
  stats: [
    { valor: 16, sufijo: '', etiqueta: 'obras ejecutadas' },
    { valor: 3,  sufijo: '', etiqueta: 'obras en ejecución' },
    { valor: 4,  sufijo: '', etiqueta: 'certificaciones ISO' },
    { valor: 2,  sufijo: '', etiqueta: 'distritos atendidos' }
  ],

  /* ---------- Cobertura: distritos de Lima Norte ---------- */
  cobertura: [
    { id: 'los-olivos',    nombre: 'Los Olivos',    estado: 'activo' },
    { id: 'independencia', nombre: 'Independencia', estado: 'activo' },
    { id: 'comas',         nombre: 'Comas',         estado: 'sede' },
    { id: 'san-martin',    nombre: 'San Martín de Porres', estado: 'cobertura' },
    { id: 'puente-piedra', nombre: 'Puente Piedra', estado: 'cobertura' },
    { id: 'carabayllo',    nombre: 'Carabayllo',    estado: 'cobertura' }
  ],

  /* ============================================================
     RUBROS — alimentan el menú "Especialidades" y el filtro de
     la página de proyectos.
     imagenes: agrega los archivos que quieras; el panel muestra
     flechas para pasarlas cuando hay más de una.
     ============================================================ */
  rubros: [
    {
      id: 'pistas',
      nombre: 'Pistas y pavimentación',
      tono: 'navy',
      reverso: 'images/beta_6.jpg',
      descripcion: 'Pavimento de concreto y asfalto sobre base compactada, con señalización y control de calidad en cada capa.',
      imagenes: [
        'images/calles54.jpg',
        'images/calle_17.jpg',
        'images/patria.jpg'
      ]
    },
    {
      id: 'espacios',
      nombre: 'Parques y veredas',
      tono: 'orange',
      reverso: 'images/justicia_1.jpg',
      descripcion: 'Veredas, sardineles, rampas normadas, áreas verdes y mobiliario urbano para el espacio público del barrio.',
      imagenes: [
        'images/justicia_1.jpg',
        'images/jazmines.jpg',
        'images/rosales3.jpg'
      ]
    },
    {
      id: 'contencion',
      nombre: 'Muros y escaleras',
      tono: 'steel',
      reverso: 'images/padua_cartel.jpg',
      descripcion: 'Muros de contención y escaleras de acceso en laderas y asentamientos humanos, donde el terreno exige solución estructural.',
      imagenes: [
        'images/rosa.jpg',
        'images/venus_3.jpg'
      ]
    }
  ],

  /* ---------- PORTADA DE ESPECIALIDADES (servicios.html) ----------
     titulo + acento : el h1 se arma como "titulo acento", con el acento en naranja.
     fondo           : foto que se muestra desenfocada detrás de los hexágonos. */
  especialidades: {
    titulo: 'Nuestras',
    acento: 'Especialidades',
    fondo: 'images/virgen.jpg'
  },

  /* ---------- PÁGINA NOSOTROS ----------
     mosaico : cuatro fotos para los hexágonos junto al texto.
               Se recortan en hexágono: el motivo debe ir al centro. */
  nosotros: {
    mosaico: [
      'images/equipo_1.jpg',
      'images/beta.jpg',
      'images/justicia_8.jpg',
      'images/virgen.jpg'
    ]
  },

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
      'av-betancourt',
      'parque-justicia',
      'mercurio-alto',
      'pasaje-venus'
    ]
  },

  /* ---------- Servicios (páginas Inicio y Servicios) ---------- */
  servicios: [
    {
      id: 'pistas',
      nombre: 'Pistas y pavimentación',
      resumen: 'Pavimento flexible y rígido sobre base compactada, con control de calidad en cada capa.',
      detalle: [
        'Movimiento de tierras y conformación de subrasante',
        'Base granular compactada con control de densidad',
        'Pavimento de concreto y asfalto',
        'Señalización horizontal y vertical'
      ],
      icono: 'fas fa-road'
    },
    {
      id: 'espacios',
      nombre: 'Parques y veredas',
      resumen: 'Espacio público terminado: veredas, sardineles, áreas verdes y accesibilidad resuelta.',
      detalle: [
        'Veredas de concreto con acabado antideslizante',
        'Sardineles y sardineles peraltados',
        'Rampas normadas en esquinas y accesos',
        'Áreas verdes, mobiliario e iluminación'
      ],
      icono: 'fas fa-tree-city'
    },
    {
      id: 'contencion',
      nombre: 'Muros y escaleras',
      resumen: 'Obras en pendiente, donde primero hay que estabilizar el terreno para poder circular.',
      detalle: [
        'Muros de contención de concreto armado',
        'Escaleras de acceso en pendiente',
        'Pasamanos y elementos de seguridad',
        'Drenaje y obras complementarias'
      ],
      icono: 'fas fa-stairs'
    }
  ],

  /* ---------- Certificaciones ---------- */
  certificaciones: [
    {
      id: 'iso9001',
      titulo: 'ISO 9001:2015',
      nombre: 'Sistema de Gestión de Calidad',
      descripcion: 'Acredita que nuestros procesos de obra siguen un orden verificable, desde la planificación hasta la entrega.',
      numero: 'SCC/INT/2512CR/22139',
      vigencia: '04.12.2026',
      pdf: 'docs/ISO_CALIDAD_9001_B_M.pdf',
      icono: 'fas fa-certificate',
      sello: '',
      imagen: 'images/certificados/ISO9001.jpg'
    },
    {
      id: 'iso45001',
      titulo: 'ISO 45001:2018',
      nombre: 'Seguridad y Salud en el Trabajo',
      descripcion: 'Reemplaza a OHSAS 18001. Respalda el control de riesgos y la protección del personal en campo.',
      numero: 'SCC/INT/2512CR/22141',
      vigencia: '04.12.2026',
      pdf: 'docs/ISO_SEGURIDAD_45001_B_M.pdf',
      icono: 'fas fa-helmet-safety',
      sello: '',
      imagen: 'images/certificados/ISO45001.jpg'
    },
    {
      id: 'iso37001',
      titulo: 'ISO 37001:2016',
      nombre: 'Sistema de Gestión Antisoborno',
      descripcion: 'Exigida cada vez más en contratación pública. Documenta nuestros controles frente al soborno.',
      numero: 'SCC/INT/2512CR/22142',
      vigencia: '04.12.2026',
      pdf: 'docs/ISO_ANTISOBORNO_37001_B_M.pdf',
      icono: 'fas fa-scale-balanced',
      sello: '',
      imagen: 'images/certificados/ISO37001.jpg'
    },
    {
      id: 'iso14001',
      titulo: 'ISO 14001:2015',
      nombre: 'Sistema de Gestión Ambiental',
      descripcion: 'Ordena el manejo de residuos, emisiones y afectaciones al entorno durante la ejecución.',
      numero: 'SCC/INT/2512CR/22140',
      vigencia: '04.12.2026',
      pdf: 'docs/ISO_AMBIENTAL_14001_B_M.pdf',
      icono: 'fas fa-leaf',
      sello: '',
      imagen: 'images/certificados/ISO14001.jpg'
    }
  ],

  /* ============================================================
     OBRAS
     estado           : 'ejecutada' | 'ejecucion'
     rubro            : rubro principal — es la etiqueta que se ve
     rubroSecundario  : opcional; la obra también sale en ese filtro
     empresa          : '' si la ejecutó B&M; si no, el texto que
                        quieras mostrar en la tarjeta
     galeria          : archivos dentro de /images
     orden            : posición de la tarjeta en cada vista (1 = la
                        primera, de izquierda a derecha / arriba).
                        Una clave por vista donde aparece la obra:
                        'todos' (proyectos.html sin filtro) y el id
                        de cada rubro en el que entra (el de 'rubro'
                        y, si tiene, el de 'rubroSecundario').
                        No hace falta reordenar el array ni tocar
                        otras obras: dos obras pueden repetir número,
                        y una obra sin 'orden' (o sin esa clave) sale
                        al final, en el orden en que aparece aquí.
                        Ej.: orden: { todos: 3, pistas: 1 }
     ============================================================ */
  proyectos: [

    /* ---------- B&M ---------- */
    {
      id: 'calle-17',
      nombre: 'Renovación de pavimento, vereda y sardinel — Calle 17',
      cliente: 'Municipalidad Distrital de Los Olivos',
      distrito: 'los-olivos',
      ubicacion: 'A.H. Chillón y Urb. Prolima, Los Olivos',
      ano: 2026,
      estado: 'ejecutada',
      empresa: '',
      rubro: 'pistas',
      rubroSecundario: '',
      descripcion: 'Renovación de pavimento, vereda y sardinel, con construcción de rampas de acceso.',
      image: 'images/calle_17.jpg',
      galeria: ['calle_17.jpg', 'calle_17_2.jpg',"calle_17_1.jpg", 'calle_17_5.jpg'],
      orden: { todos: 7, pistas: 4 }
    },
    {
      id: 'parque-justicia',
      nombre: 'Mejoramiento de espacios públicos urbanos — Parque Justicia',
      cliente: 'Municipalidad Distrital de Los Olivos',
      distrito: 'los-olivos',
      ubicacion: 'Parque N.º 2 Justicia, AA.HH. Los Jazmines del Naranjal, Los Olivos',
      ano: 2026,
      estado: 'ejecutada',
      empresa: '',
      rubro: 'espacios',
      rubroSecundario: '',
      descripcion: 'Mejoramiento integral del parque: áreas verdes, mobiliario urbano, iluminación y accesibilidad.',
      image: 'images/justicia_1.jpg',
      galeria: ['justicia_1.jpg', 'justicia_2.jpg', 'justicia_3.jpg', 'justicia_4.jpg', 'justicia_6.jpg', 'justicia_8.jpg', 'justicia_9.jpg','justicia_11.jpg','justicia_10.jpg'],
      orden: { todos: 5, espacios: 2 }
    },
    {
      id: 'chillon',
      nombre: 'Mejoramiento de movilidad urbana — AA.HH. Municipal Chillón',
      cliente: 'Municipalidad Distrital de Los Olivos',
      distrito: 'los-olivos',
      ubicacion: 'Calles internas del AA.HH. Municipal Chillón, Los Olivos',
      ano: 2026,
      estado: 'ejecutada',
      empresa: '',
      rubro: 'espacios',
      rubroSecundario: '',
      descripcion: 'Mejoramiento de la movilidad urbana en calles internas, con pavimentación y señalización.',
      image: 'images/chillon_8.jpg',
      galeria: ['chillon_1.jpg', 'chillon_2.jpg', 'chillon_3.jpg', 'chillon_4.jpg', 'chillon_5.jpg', 'chillon_6.jpg','chillon_8.jpg','chillon_7.jpg'],
      orden: { todos: 8, espacios: 5 }
    },
    {
      id: 'calle-jazmines',
      nombre: 'Renovación de pavimento y señales de tráfico — Calle Los Jazmines',
      cliente: 'Municipalidad Distrital de Los Olivos',
      distrito: 'los-olivos',
      ubicacion: 'Calle Los Jazmines, desde Calle Aquia hasta Av. Universitaria, Los Olivos',
      ano: 2026,
      estado: 'ejecutado',
      empresa: '',
      rubro: 'pistas',
      rubroSecundario: '',
      descripcion: 'Renovación de pavimento y señalización para mejorar la seguridad vial del sector.',
      image: 'images/jazmines_2.jpg',
      galeria: ['jazmines.jpg', 'jazmines_1.jpg', 'jazmines_2.jpg', 'jazmines_3.jpg', 'jazmines_4.jpg', 'jazmines_5.jpg'],
      orden: { todos: 4, pistas: 3 }
    },

    /* ---------- Obras del grupo (Grupo Zaragoza) ----------
       Ajusta el texto de 'empresa' o borra las que no quieras
       mostrar. Aparecen con esa nota en la tarjeta.            */
    {
      id: 'sector-multiple',
      nombre: 'Renovación de pavimento y señales de tráfico — Sector Múltiple',
      cliente: 'Municipalidad Distrital de Los Olivos',
      distrito: 'los-olivos',
      ubicacion: 'Calles 54, 55, 58 y jirones La Amistad, Veracidad, Los Olivos',
      ano: 2025,
      estado: 'ejecutada',
      empresa: 'Obra del Grupo Zaragoza',
      rubro: 'pistas',
      rubroSecundario: '',
      descripcion: 'Renovación integral de pavimento y señalización de tránsito, orientada a optimizar las condiciones de la infraestructura vial.',
      image: 'images/calles54.jpg',
      galeria: ['calles54.jpg', 'calles54_1.jpg', 'calles54_2.jpg', 'calles54_3.jpg', 'calles54_4.jpg', 'calles54_5.jpg', 'calles54_6.jpg', 'calles54_7.jpg', 'calles54_8.jpg'],
      orden: { todos: 6, pistas: 2 }
    },
    {
      id: 'mercurio-alto',
      nombre: 'Espacio peatonal y muro de contención — Mercurio Alto',
      cliente: 'Municipalidad Distrital de Los Olivos',
      distrito: 'los-olivos',
      ubicacion: 'Calle Los Rosales y Los Girasoles, AA.HH. Mercurio Alto, Los Olivos',
      ano: 2025,
      estado: 'ejecutada',
      empresa: 'Obra del Grupo Zaragoza',
      rubro: 'contencion',
      rubroSecundario: '',
      descripcion: 'Ejecución de obras de infraestructura urbana orientadas a habilitar y mejorar la circulación peatonal mediante escaleras y/o rampas, complementadas con la construcción de un muro de contención para garantizar la estabilidad del terreno.',
      image: 'images/rosa.jpg',
      galeria: ['rosa.jpg', 'rosa_1.jpg', 'rosa_2.jpg', 'rosa_3.jpg', 'rosa_4.jpg', 'rosa_5.jpg'],
      orden: { todos: 9, contencion: 3 }
    },
    {
      id: 'pasaje-venus',
      nombre: 'Pavimento, vereda y muro de contención — Pasaje Venus',
      cliente: 'Municipalidad Distrital de Los Olivos',
      distrito: 'los-olivos',
      ubicacion: 'AA.HH. Moradores del Pasaje Venus, C.P. Las Palmeras, Los Olivos',
      ano: 2025,
      estado: 'ejecutada',
      empresa: 'Obra del Grupo Zaragoza',
      rubro: 'contencion',
      rubroSecundario: 'pistas',
      descripcion: 'Ejecución de obras de infraestructura urbana destinadas a habilitar y mejorar la circulación peatonal mediante la construcción de pavimento, veredas, escaleras y/o rampas, complementadas con la edificación de un muro de contención y otros activos.',
      image: 'images/venus.jpg',
      galeria: ['venus.jpg', 'venus_1.jpg', 'venus_2-1.jpg', 'venus_2.jpg', 'venus_3.jpg', 'venus_4.jpg', 'venus_5.jpg', 'venus_6.jpg', 'venus_7.jpg', 'venus_8.jpg', 'venus_9.jpg'],
      orden: { todos: 10, contencion: 4, pistas: 5 }
    },
    {
      id: 'escalera-padua',
      nombre: 'Renovación de escalera de acceso — San Antonio de Padua',
      cliente: 'Municipalidad Distrital de Los Olivos',
      distrito: 'los-olivos',
      ubicacion: 'Pasajes A, D y H, Asoc. de Vivienda San Antonio de Padua, Los Olivos',
      ano: 2026,
      estado: 'ejecutada',
      empresa: 'Obra del Grupo Zaragoza',
      rubro: 'contencion',
      rubroSecundario: 'espacios',
      descripcion: 'Renovación de escalera de acceso y circulación peatonal vertical, mejorando la seguridad.',
      image: 'images/padua_cartel.jpg',
      galeria: ['padua_1.jpg','padua_2.jpg','padua_4.jpg','padua_6.jpg','padua_7.jpg','padua_8.jpg','padua_9.jpg','padua_cartel.jpg','padua_v_1.jpg','padua_v_3.jpg','padua_v_4.jpg','padua_v_5.jpg','padua_v_6.jpg','padua_v_7.jpg','padua_v_8.jpg','padua_v_9.jpg'],
      orden: { todos: 3, contencion: 1 }
    },

    {
      id: 'parque-peru-japon',
      nombre: 'Infraestructura de almacenamiento — Parque Perú Japón',
      cliente: 'Municipalidad Distrital de Los Olivos',
      distrito: 'los-olivos',
      ubicacion: 'Parque Perú Japón, Urb. Parque Naranjal I Etapa, Los Olivos',
      ano: 2025,
      estado: 'ejecutada',
      empresa: 'Obra del Grupo Zaragoza',
      rubro: 'espacios',
      rubroSecundario: '',
      descripcion: 'Construcción de infraestructura de almacenamiento como equipamiento del parque.',
      image: 'images/peru-japon_7.jpg',
      galeria: ["peru-japon_1.jpg","peru-japon_2.jpg","peru-japon_3.jpg","peru_japon_4.jpg","peru-japon_5.jpg","peru-japon_6.jpg","peru-japon_7.jpg"],
      orden: { todos: 2, espacios: 3 }
    },
    {
      id: 'geriatrico',
      nombre: 'Creación del servicio de atención y cuidado para personas con discapacidad — Santa Rosa de Naranjal',
      cliente: 'Municipalidad Distrital de Los Olivos',
      distrito: 'los-olivos',
      ubicacion: 'AA.HH. Santa Rosa de Naranjal, Los Olivos',
      ano: 2026,
      estado: 'ejecutada',
      empresa: 'Obra del Consorcio Viñac',
      rubro: 'espacios',
      rubroSecundario: '',
      descripcion: 'Creación del servicio de atención y cuidado para personas en condición de discapacidad en el local geriátrico y de discapacidad del AA.HH. Santa Rosa de Naranjal, con infraestructura de segundo nivel para su funcionamiento.',
      image: 'images/geri_11.jpg',
      galeria: ['geri_1.jpg','geri_2.jpg','geri_3.jpg','geri_4.jpg','geri_5.jpg','geri_6.jpg','geri_7.jpg','geri_8.png','geri_9.jpg','geri_10.jpg','geri_11.jpg'],
      orden: { todos: 11, espacios: 4 }
    },
    {
      id: 'av-betancourt',
      nombre: 'Mejoramiento del servicio de movilidad urbana — Av. Rómulo Betancourt',
      cliente: 'Municipalidad Distrital de Los Olivos',
      distrito: 'los-olivos',
      ubicacion: 'Av. Rómulo Betancourt, desde Av. Canta Callao hasta Av. Central, Los Olivos',
      ano: 2026,
      estado: 'ejecutada',
      empresa: 'Obra del Grupo Zaragoza',
      rubro: 'pistas',
      rubroSecundario: '',
      descripcion: 'Mejoramiento del servicio de movilidad urbana en la Av. Rómulo Betancourt, entre la Av. Canta Callao y la Av. Central.',
      image: 'images/beta.jpg',
      galeria: ['beta.jpg', 'beta_1.jpg', 'beta_2.jpg','beta_9.jpg','beta_3.jpg', 'beta_4.jpg', 'beta_5.jpg', 'beta_6.jpg','beta_8.jpg', 'beta_7.jpg'],
      orden: { todos: 12, pistas: 1 }
    },
    {
      id: 'parque-virgen-carmen',
      nombre: 'Mejoramiento de espacio público — Parque Virgen del Carmen',
      cliente: 'Municipalidad Distrital de Los Olivos',
      distrito: 'los-olivos',
      ubicacion: 'A.H. San Alberto, Los Olivos',
      ano: 2025,
      estado: 'ejecutada',
      empresa: 'Obra del Grupo Zaragoza',
      rubro: 'espacios',
      rubroSecundario: '',
      descripcion: 'Ejecución de obras de infraestructura urbana destinadas a habilitar y mejorar la circulación peatonal mediante escaleras, rampas y sardineles, complementadas con la instalación de mobiliario urbano y obras exteriores.',
      image: 'images/virgen.jpg',
      galeria: ['virgen.jpg', 'virgen_1.jpg', 'virgen_2.jpg', 'virgen_3.jpg', 'virgen_4.jpg', 'virgen_5.jpg', 'virgen_6.jpg', 'virgen_7.jpg', 'virgen_8.jpg'],
      orden: { todos: 1, espacios: 1 }
    },
    {
      id: 'patria-nueva-movilidad',
      nombre: 'Creación del servicio de movilidad urbana — A.H. Patria Nueva',
      cliente: 'Municipalidad Distrital de Los Olivos',
      distrito: 'los-olivos',
      ubicacion: 'Calles internas del A.H. Patria Nueva, Los Olivos',
      ano: 2025,
      estado: 'ejecutada',
      empresa: 'Obra del Grupo Zaragoza',
      rubro: 'contencion',
      rubroSecundario: '',
      descripcion: 'Ejecución de obras de infraestructura vial y urbana orientadas a implementar y mejorar el servicio de movilidad en las vías internas del ámbito de intervención, optimizando las condiciones de transitabilidad.',
      image: 'images/patria.jpg',
      galeria: ['patria.jpg', 'patria_1.jpg', 'patria_2.jpg', 'patria_3.jpg', 'patria_4.jpg', 'patria_5.jpg', 'patria_6.jpg'],
      orden: { todos: 13, contencion: 2 }
    },
    {
      id: 'rosales-pro-3era-etapa',
      nombre: 'Construcción de vereda — A.H. Rosales de Pro (3.ª etapa)',
      cliente: 'Municipalidad Distrital de Los Olivos',
      distrito: 'los-olivos',
      ubicacion: 'Calles internas del A.H. Rosales de Pro, Los Olivos',
      ano: 2026,
      estado: 'ejecutada',
      empresa: 'Obra del Grupo Zaragoza',
      rubro: 'espacios',
      rubroSecundario: '',
      descripcion: 'Construcción de vereda en las calles internas del A.H. Rosales de Pro, tercera etapa.',
      image: 'images/rosales3.jpg',
      galeria: ['rosales3.jpg', 'rosales3_1.jpg', 'rosales3_2.jpg', 'rosales3_3.jpg', 'rosales3_4.jpg', 'rosales3_5.jpg', 'rosales3_6.jpg', 'rosales3_7.jpg'],
      orden: { todos: 14, espacios: 6 }
    }
  ],

  /* ---------- Textos institucionales ---------- */
  institucional: {
    historia: 'Constructora y Proyectos B&M S.A.C. es una empresa especializada en la ejecución de obras civiles, instalaciones eléctricas e hidráulicas, supervisión de construcciones y servicios de ingeniería. Desde 2022 trabajamos con entidades públicas y privadas de Lima Norte.',
    mision: 'Ejecutar obras de infraestructura vial, peatonal y de saneamiento con cumplimiento de plazos y estándares técnicos, contribuyendo al desarrollo urbano de Lima Norte y generando empleo local.',
    vision: 'Ser una constructora reconocida en Lima Norte por la calidad de sus obras públicas, ampliando su participación en proyectos de mayor envergadura a nivel nacional.'
  }
};

/* Deja CONFIG disponible globalmente */
window.CONFIG = CONFIG;

/** Nombre visible de un rubro, a partir de su id */
function nombreRubro(id) {
  const r = CONFIG.rubros.find(x => x.id === id);
  return r ? r.nombre : '';
}
