// Filtrer uniquement les collections de type 'brand'
const brandCollections = allCollections.filter(collection => collection.type === 'brand');
// Fonction pour afficher les marques
function renderBrands(collections) {
    const container = document.getElementById('brands-container');
    if (!container) return;

    if (collections.length === 0) {
        container.innerHTML = `
      <div class="col-12 text-center py-5">
        <p class="text-muted">Aucune marque trouvée.</p>
      </div>
    `;
        return;
    }

    let html = '';
    collections.forEach(collection => {
        html += `
      <div class="col text-center border-right border-bottom hov-scale-img has-transition hov-shadow-out z-1">
        <a href="${collection.url}" class="d-block p-sm-3">
    `;

        if (collection.image) {
            html += `
          <img 
            src="${collection.image}" 
            class="h-md-100px mx-auto has-transition p-2 p-sm-4 mw-100"
            alt="${collection.alt}"
            loading="lazy"
          >
      `;
        } else {
            html += `
          <div class="h-md-100px mx-auto has-transition p-2 p-sm-4 mw-100 d-flex align-items-center justify-content-center bg-light">
            <span class="text-dark fs-14 fw-700">${collection.title.substring(0, 20)}${collection.title.length > 20 ? '...' : ''}</span>
          </div>
      `;
        }

        html += `
          <p class="text-center text-dark fs-14 fw-700 mt-2 mb-0">${collection.title}</p>
        </a>
      </div>
    `;
    });

    container.innerHTML = html;
}

// Exécuter quand la page est chargée
document.addEventListener('DOMContentLoaded', function () {
    renderBrands(brandCollections);
});