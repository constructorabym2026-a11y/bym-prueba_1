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
        imagen: 'images/venus.jpg',
        obra: 'Pasaje Venus, Los Olivos · 2025'
      },
      {
        palabra: 'EXPERIENCIA',
        imagen: 'images/calles54.jpg',
        obra: 'Calles 54, 55 y 58, Los Olivos · 2025'
      },
      {
        palabra: 'CALIDAD',
        imagen: 'images/patria.jpg',
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
      reverso: 'images/calles54_2.jpg',
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
      reverso: 'images/rosa_3.jpg',
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
    fondo: 'images/justicia_4.jpg'
  },

  /* ---------- PÁGINA NOSOTROS ----------
     mosaico : cuatro fotos para los hexágonos junto al texto.
               Se recortan en hexágono: el motivo debe ir al centro. */
  nosotros: {
    mosaico: [
      'images/equipo_1.jpg',
      'images/justicia_5.jpg',
      'images/venus_4.jpg',
      'images/rosa_4.jpg'
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
      sello: ''
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
      sello: ''
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
      sello: ''
    },
    {
      id: 'iso14001',
      titulo: 'ISO 14001:2015',
      nombre: 'Sistema de Gestión Ambiental',
      descripcion: 'Ordena el manejo de residuos, emisiones y afectaciones al entorno durante la ejecución.',
      numero: 'SCC/INT/2512CR/22140',
      vigencia: '04.12.2026',
      pdf: 'docs/ISO_AMBIENTAL_14005_B_M.pdf',
      icono: 'fas fa-leaf',
      sello: ''
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
     ============================================================ */
  proyectos: [

    /* ---------- B&M ---------- */
    {
      id: 'padua-movilidad',
      nombre: 'Creación del servicio de movilidad urbana — San Antonio de Padua',
      cliente: 'Municipalidad Distrital de Los Olivos',
      distrito: 'los-olivos',
      ubicacion: 'Asoc. de Vivienda San Antonio de Padua, Los Olivos',
      ano: 2024,
      estado: 'ejecutada',
      empresa: '',
      rubro: 'pistas',
      rubroSecundario: 'espacios',
      descripcion: 'Creación del servicio de movilidad urbana con infraestructura vial y peatonal en los pasajes de la asociación de vivienda.',
      image: '',
      galeria: []
    },
    {
      id: 'chasquitambo',
      nombre: 'Mejoramiento de movilidad urbana — Jirón Chasquitambo',
      cliente: 'Municipalidad Distrital de Los Olivos',
      distrito: 'los-olivos',
      ubicacion: 'Jr. Chasquitambo, cuadras 5 y 6, Los Olivos',
      ano: 2024,
      estado: 'ejecutada',
      empresa: '',
      rubro: 'pistas',
      rubroSecundario: 'espacios',
      descripcion: 'Pistas, veredas accesibles, sardineles y áreas verdes ejecutados como un solo proyecto de movilidad.',
      image: '',
      galeria: []
    },
    {
      id: 'tulipanes-jazmines',
      nombre: 'Veredas, sardinel y área verde — Los Tulipanes y Los Jazmines',
      cliente: 'Municipalidad Distrital de Los Olivos',
      distrito: 'los-olivos',
      ubicacion: 'AA.HH. Los Olivos de Pro, Los Olivos',
      ano: 2024,
      estado: 'ejecutada',
      empresa: '',
      rubro: 'espacios',
      rubroSecundario: '',
      descripcion: 'Construcción de veredas, sardineles y áreas verdes en las calles Los Tulipanes y Los Jazmines.',
      image: '',
      galeria: []
    },
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
      rubroSecundario: 'espacios',
      descripcion: 'Renovación de pavimento, vereda y sardinel, con construcción de rampas de acceso.',
      image: 'images/calle_17.jpg',
      galeria: ['calle_17.jpg', 'calle_17_1.jpg', 'calle_17_2.jpg', 'calle_17_3.jpg', 'calle_17_4.jpg', 'calle_17_5.jpg']
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
      galeria: ['justicia_1.jpg', 'justicia_2.jpg', 'justicia_3.jpg', 'justicia_4.jpg', 'justicia_5.jpg', 'justicia_6.jpg', 'justicia_7.jpg']
    },
    {
      id: 'chillon',
      nombre: 'Mejoramiento de movilidad urbana — AA.HH. Municipal Chillón',
      cliente: 'Municipalidad Distrital de Los Olivos',
      distrito: 'los-olivos',
      ubicacion: 'Calles internas del AA.HH. Municipal Chillón, Los Olivos',
      ano: 2026,
      estado: 'ejecucion',
      empresa: '',
      rubro: 'pistas',
      rubroSecundario: '',
      descripcion: 'Mejoramiento de la movilidad urbana en calles internas, con pavimentación y señalización.',
      image: 'images/chillon_1.jpg',
      galeria: ['chillon_1.jpg', 'chillon_2.jpg', 'chillon_3.jpg', 'chillon_4.jpg', 'chillon_5.jpg', 'chillon_6.jpg']
    },
    {
      id: 'calle-jazmines',
      nombre: 'Renovación de pavimento y señales de tráfico — Calle Los Jazmines',
      cliente: 'Municipalidad Distrital de Los Olivos',
      distrito: 'los-olivos',
      ubicacion: 'Calle Los Jazmines, desde Calle Aquia hasta Av. Universitaria, Los Olivos',
      ano: 2026,
      estado: 'ejecucion',
      empresa: '',
      rubro: 'pistas',
      rubroSecundario: '',
      descripcion: 'Renovación de pavimento y señalización para mejorar la seguridad vial del sector.',
      image: 'images/jazmines.jpg',
      galeria: ['jazmines.jpg', 'jazmines_1.jpg', 'jazmines_2.jpg', 'jazmines_3.jpg', 'jazmines_4.jpg', 'jazmines_5.jpg']
    },
    {
      id: 'av-central',
      nombre: 'Renovación de calzada y señales de tráfico — Av. Central',
      cliente: 'Municipalidad Distrital de Los Olivos',
      distrito: 'los-olivos',
      ubicacion: 'Av. Central, desde Av. Canta Callao hasta Av. Alfredo Mendiola, Los Olivos',
      ano: 2026,
      estado: 'ejecucion',
      empresa: '',
      rubro: 'pistas',
      rubroSecundario: '',
      descripcion: 'Renovación integral de calzada y señalización en una de las vías principales del distrito.',
      image: '',
      galeria: []
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
      galeria: ['calles54.jpg', 'calles54_1.jpg', 'calles54_2.jpg', 'calles54_3.jpg', 'calles54_4.jpg', 'calles54_5.jpg', 'calles54_6.jpg', 'calles54_7.jpg', 'calles54_8.jpg']
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
      rubroSecundario: 'espacios',
      descripcion: 'Ejecución de obras de infraestructura urbana orientadas a habilitar y mejorar la circulación peatonal mediante escaleras y/o rampas, complementadas con la construcción de un muro de contención para garantizar la estabilidad del terreno.',
      image: 'images/rosa.jpg',
      galeria: ['rosa.jpg', 'rosa_1.jpg', 'rosa_2.jpg', 'rosa_3.jpg', 'rosa_4.jpg', 'rosa_5.jpg']
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
      galeria: ['venus.jpg', 'venus_1.jpg', 'venus_2-1.jpg', 'venus_2.jpg', 'venus_3.jpg', 'venus_4.jpg', 'venus_5.jpg', 'venus_6.jpg', 'venus_7.jpg', 'venus_8.jpg', 'venus_9.jpg']
    },
    {
      id: 'escalera-padua',
      nombre: 'Renovación de escalera de acceso — San Antonio de Padua',
      cliente: 'Municipalidad Distrital de Los Olivos',
      distrito: 'los-olivos',
      ubicacion: 'Pasajes A, D y H, Asoc. de Vivienda San Antonio de Padua, Los Olivos',
      ano: 2025,
      estado: 'ejecutada',
      empresa: 'Obra del Grupo Zaragoza',
      rubro: 'contencion',
      rubroSecundario: '',
      descripcion: 'Renovación de escalera de acceso y circulación peatonal vertical, mejorando la seguridad.',
      image: '',
      galeria: []
    },
    {
      id: 'av-17-noviembre',
      nombre: 'Mejoramiento de movilidad urbana — Av. 17 de Noviembre',
      cliente: 'Municipalidad Distrital de Independencia',
      distrito: 'independencia',
      ubicacion: 'Av. 17 de Noviembre, Eje Zonal Independencia',
      ano: 2025,
      estado: 'ejecutada',
      empresa: 'Obra del Grupo Zaragoza',
      rubro: 'pistas',
      rubroSecundario: 'espacios',
      descripcion: 'Proyecto integral de movilidad urbana con infraestructura vial, peatonal y servicios complementarios.',
      image: '',
      galeria: []
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
      image: '',
      galeria: []
    },
    {
      id: 'nueva-amistad',
      nombre: 'Renovación de pavimento y vereda — Nueva Amistad (Etapa 1)',
      cliente: 'Municipalidad Distrital de Los Olivos',
      distrito: 'los-olivos',
      ubicacion: 'Manzanas A, B, B1, C y D, AA.HH. Nueva Amistad, Los Olivos',
      ano: 2025,
      estado: 'ejecutada',
      empresa: 'Obra del Grupo Zaragoza',
      rubro: 'pistas',
      rubroSecundario: 'espacios',
      descripcion: 'Renovación de pavimento y vereda con obras exteriores en múltiples manzanas residenciales.',
      image: '',
      galeria: []
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
      rubroSecundario: 'espacios',
      descripcion: 'Mejoramiento del servicio de movilidad urbana en la Av. Rómulo Betancourt, entre la Av. Canta Callao y la Av. Central.',
      image: 'images/beta.jpg',
      galeria: ['beta.jpg', 'beta_1.jpg', 'beta_2.jpg', 'beta_3.jpg', 'beta_4.jpg', 'beta_5.jpg', 'beta_6.jpg', 'beta_7.jpg']
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
      galeria: ['virgen.jpg', 'virgen_1.jpg', 'virgen_2.jpg', 'virgen_3.jpg', 'virgen_4.jpg', 'virgen_5.jpg', 'virgen_6.jpg', 'virgen_7.jpg', 'virgen_8.jpg']
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
      rubro: 'pistas',
      rubroSecundario: '',
      descripcion: 'Ejecución de obras de infraestructura vial y urbana orientadas a implementar y mejorar el servicio de movilidad en las vías internas del ámbito de intervención, optimizando las condiciones de transitabilidad.',
      image: 'images/patria.jpg',
      galeria: ['patria.jpg', 'patria_1.jpg', 'patria_2.jpg', 'patria_3.jpg', 'patria_4.jpg', 'patria_5.jpg', 'patria_6.jpg']
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
      galeria: ['rosales3.jpg', 'rosales3_1.jpg', 'rosales3_2.jpg', 'rosales3_3.jpg', 'rosales3_4.jpg', 'rosales3_5.jpg', 'rosales3_6.jpg', 'rosales3_7.jpg']
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
