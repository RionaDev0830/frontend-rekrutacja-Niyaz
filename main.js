// Step 2: Product Details & Responsive Layout

let selectedProductId = null;

function renderProductList(products, singleColumn = false) {
  // Custom color palette: blue-700, blue-500, slate-800, slate-500, green-500
  // Typography: font-medium, tracking-wide, text-opacity-90, text-opacity-70
  if (singleColumn) {
    return `
      <div class="flex flex-col gap-4">
        ${products.map(product => `
          <button
            class="bg-blue-50 border border-blue-200 rounded-xl p-5 flex items-center shadow hover:shadow-lg hover:scale-105 transition w-full focus:outline-none ${selectedProductId === product.id ? 'ring-2 ring-blue-500' : ''}"
            onclick="showProductDetails(${product.id})"
            aria-label="Zobacz szczegóły produktu ${product.name}"
          >
            <img src="${product.image}" alt="${product.name}" class="w-16 h-16 object-contain rounded mr-5" />
            <div class="flex-1 text-left">
              <h2 class="text-base font-medium tracking-wide text-slate-800 text-opacity-90 mb-1">${product.name}</h2>
              <p class="text-green-500 font-semibold text-sm tracking-wide text-opacity-90">${product.price.toFixed(2)} PLN</p>
            </div>
          </button>
        `).join('')}
      </div>
    `;
  } else {
    return `
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        ${products.map(product => `
          <button
            class="bg-blue-50 border border-blue-200 rounded-xl p-5 flex flex-col items-center shadow hover:shadow-lg hover:scale-105 transition w-full focus:outline-none"
            onclick="showProductDetails(${product.id})"
            aria-label="Zobacz szczegóły produktu ${product.name}"
          >
            <img src="${product.image}" alt="${product.name}" class="w-24 h-24 object-contain mb-4 rounded" />
            <div class="text-center w-full">
              <h2 class="text-lg font-medium tracking-wide text-slate-800 text-opacity-90 mb-2">${product.name}</h2>
              <p class="text-green-500 font-semibold text-base tracking-wide text-opacity-90">${product.price.toFixed(2)} PLN</p>
            </div>
          </button>
        `).join('')}
      </div>
    `;
  }
}

function renderProductDetails(product) {
  if (!product) return '';
  return `
    <div class="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center transition">
      <div class="w-full flex justify-center mb-6">
        <img src="${product.image}" alt="${product.name}" class="w-48 h-48 object-cover rounded-lg shadow" />
      </div>
      <h2 class="text-3xl font-bold text-gray-800 mb-3 text-center">${product.name}</h2>
      <p class="text-green-700 font-extrabold text-2xl mb-4 text-center">${product.price.toFixed(2)} PLN</p>
      <p class="text-gray-600 mb-6 text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac neque nec urna cursus. Pellentesque habitant morbi tristique senectus et netus.</p>
      <button
        class="hidden md:inline-block mt-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:scale-105 shadow transition text-lg font-semibold"
        style="min-width: 180px;"
        onclick="backToList()"
      >
        Dodaj do koszyka
      </button>
      <button
        class="md:hidden mt-6 px-4 py-2 bg-blue-100 text-blue-700 rounded flex items-center gap-2 hover:bg-blue-200 transition font-medium"
        onclick="backToList()"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Wróć do listy
      </button>
    </div>
  `;
}

function showProductDetails(productId) {
  selectedProductId = productId;
  renderApp();
}

function backToList() {
  selectedProductId = null;
  renderApp();
}

function renderApp() {
  const app = document.getElementById('product-list');
  const isLargeScreen = window.innerWidth >= 768;
  if (selectedProductId && isLargeScreen) {
    // Two columns: left (single column list, 3/4 width), right (details, 1/4 width)
    const product = products.find(p => p.id === selectedProductId);
    app.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="md:col-span-1">${renderProductList(products, true)}</div>
        <div class="md:col-span-3">${renderProductDetails(product)}</div>
      </div>
    `;
  } else if (selectedProductId && !isLargeScreen) {
    // Only details with back button
    const product = products.find(p => p.id === selectedProductId);
    app.innerHTML = renderProductDetails(product);
  } else {
    // Only list, 3 in a row
    app.innerHTML = renderProductList(products, false);
  }
}

// Re-render on resize for responsiveness
window.addEventListener('resize', renderApp);

// Initial render
document.addEventListener('DOMContentLoaded', () => {
  renderApp();
});

// Expose functions for inline onclick handlers
window.showProductDetails = showProductDetails;
window.backToList = backToList;