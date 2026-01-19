// PURE JAVASCRIPT - À METTRE SUR GITHUB
function renderCollectionSuggestions() {
  // Vérifier si les données existent
  if (!window.collectionSuggestionsData) {
    console.error('⚠️ Données Liquid non disponibles');
    return;
  }

  const { allCollections, currentCollectionType, titleColor, titleFontSize, sectionId } =
    window.collectionSuggestionsData;

  // Filtrer les collections du même type
  const sameTypeCollections = allCollections.filter((c) => c.type === currentCollectionType);

  if (sameTypeCollections.length === 0) {
    console.warn('⚠️ AUCUNE COLLECTION DU MÊME TYPE TROUVÉE');
    const sectionElement = document.getElementById(`shopify-section-${sectionId}`);
    if (sectionElement) {
      sectionElement.style.display = 'none';
    }
    return;
  }

  // Mélanger et prendre 4 collections
  const shuffled = [...sameTypeCollections].sort(() => Math.random() - 0.5);
  const collectionsToShow = shuffled.slice(0, 4);

  const container = document.getElementById(`collection-suggestions-${sectionId}`);

  if (!container) {
    console.error('⚠️ CONTAINER NON TROUVÉ');
    return;
  }

  // Vider le conteneur
  container.innerHTML = '';

  // Générer le HTML pour chaque collection
  collectionsToShow.forEach((coll, index) => {
    const imageHtml = coll.image
      ? `
      <picture class="card-media__media media-wrapper loaded" style="--aspect-ratio: 1/1;">
        <img 
          src="${coll.image}" 
          alt="${coll.alt}" 
          width="1100" 
          height="1100" 
          loading="lazy" 
          class="motion-reduce absolute inset-0 w-full h-full hover-scale-up loaded"
          style="object-fit: cover;"
        >
        <div class="bg-overlay" style="--color-overlay-alpha: 10;"></div>
      </picture>
    `
      : `
      <div class="card-media__media media-wrapper" style="--aspect-ratio: 1/1; background-color: #f5f5f5;">
        <div class="absolute inset-0 w-full h-full flex items-center justify-center">
          <span class="text-gray-400">${coll.title}</span>
        </div>
        <div class="bg-overlay" style="--color-overlay-alpha: 10;"></div>
      </div>
    `;

    const cardHtml = `
      <div id="block-image_card_${index}" class="f-column relative custom-content-block--image_card md:flex items-center w-full md:w-1/2 lg:w-2/12" data-block-type="image_card">
        <div class="custom__block custom__block--image_card w-full text-center">
          <a href="${coll.url}" class="card-media--link focus-inset" aria-label="${coll.title}">
            <div class="card-media card-media--content-middle-center card-media--small blocks-radius relative overflow-hidden color-scheme-7 mobile-color-scheme-7 hover-wrapper">
              <div class="overflow-hidden block w-full h-full">
                <motion-element class="block h-full" data-motion="zoom-out-sm" style="transform: scale(1);">
                  ${imageHtml}
                </motion-element>
              </div>
              <div class="card-media__content card-media__content--center content-overlay content-overlay--middle-center">
                <div class="card-media__content-wrapper rich-text rich-text--medium text-center md:text-center">
                  <div class="card-media__text rich-text rich-text--medium">
                    <div class="block card-media__heading rich-text__heading h4" style="color: ${titleColor}; font-size: ${titleFontSize}px;">
                      <span>${coll.title}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    `;

    container.insertAdjacentHTML('beforeend', cardHtml);
  });

  console.log(`✅ ${collectionsToShow.length} collections affichées`);
}

// Attendre le chargement du DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderCollectionSuggestions);
} else {
  renderCollectionSuggestions();
}