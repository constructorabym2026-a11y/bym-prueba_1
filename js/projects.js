/* ============================================
   BYM CONSTRUCTORA - PROYECTOS DINÁMICOS
   Renderiza todos los proyectos (12)
   ============================================ */

document.addEventListener('DOMContentLoaded', renderProjects);

/**
 * Renderizar todos los proyectos
 */
function renderProjects() {
    const projectsGrid = document.getElementById('projectsGrid');

    if (!projectsGrid || !CONFIG || !CONFIG.projects) {
        console.warn('Error: No se encontró projectsGrid o CONFIG');
        return;
    }

    // Limpiar
    projectsGrid.innerHTML = '';

    // Renderizar cada proyecto
    CONFIG.projects.forEach((project, index) => {
        const projectCard = createProjectCard(project, index);
        projectsGrid.appendChild(projectCard);
    });

    console.log(`✅ ${CONFIG.projects.length} proyectos cargados correctamente`);
}

/**
 * Crear tarjeta de proyecto
 */
function createProjectCard(project, index) {
    const card = document.createElement('div');
    card.className = 'project__card' + (project.galeria && project.galeria.length > 0 ? ' project__card--galeria' : '');
    card.style.animationDelay = `${index * 0.1}s`;

    const tieneGaleria = project.galeria && project.galeria.length > 0;
    const onclickGaleria = tieneGaleria 
        ? `onclick="abrirGaleria('${project.id}', '${project.nombre.replace(/'/g, "\\'")}')" style="cursor: pointer;"` 
        : '';

    const imageHtml = project.image && !project.image.includes('AGREGAR')
        ? `<img src="${project.image}" alt="${project.nombre}" loading="lazy" ${onclickGaleria}>`
        : `<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #999; font-style: italic;">${project.image || '[AGREGAR FOTO]'}</div>`;

    card.innerHTML = `
        <div class="project__image">
            ${imageHtml}
        </div>
        <div class="project__content">
            <div class="project__title" ${project.galeria && project.galeria.length > 0 ? `onclick="abrirGaleria('${project.id}', '${project.nombre.replace(/'/g, "\\'")}')"` : ''}>${project.nombre}</div>
            <div class="project__meta">
                <strong>Cliente:</strong> ${project.cliente}<br>
                <strong>Ubicación:</strong> ${project.ubicacion}<br>
                <strong>Año:</strong> ${project.ano}
            </div>
            <div class="project__description">
                ${project.descripcion}
            </div>
            <div style="margin-top: 15px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                <span class="project__tag">${project.rubro}</span>
                ${project.cui ? `<span style="font-size: 12px; color: #999;">CUI: ${project.cui}</span>` : ''}
            </div>
        </div>
    `;

    return card;
}
