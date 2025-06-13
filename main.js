// Step 2: Product Details & Responsive Layout

let selectedProductId = null;

function renderProductList(products, singleColumn = false) {
  // If singleColumn is true, use flex-col, else use grid for 3 in a row
  if (singleColumn) {
    return `
      <div class="flex flex-col gap-4">
        ${products.map(product => `
          <button
            class="bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center shadow hover:shadow-lg transition w-full focus:outline-none ${selectedProductId === product.id ? 'ring-2 ring-blue-400' : ''}"
            onclick="showProductDetails(${product.id})"
            aria-label="Zobacz szczegóły produktu ${product.name}"
          >
            <img src="${product.image}" alt="${product.name}" class="w-16 h-16 object-contain rounded mr-4" />
            <div class="flex-1 text-left">
              <h2 class="text-base font-semibold text-gray-700">${product.name}</h2>
              <p class="text-green-600 font-bold text-sm">${product.price.toFixed(2)} PLN</p>
            </div>
          </button>
        `).join('')}
      </div>
    `;
  } else {
    return `
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        ${products.map(product => `
          <button
            class="bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-col items-center shadow hover:shadow-lg transition w-full focus:outline-none"
            onclick="showProductDetails(${product.id})"
            aria-label="Zobacz szczegóły produktu ${product.name}"
          >
            <img src="${product.image}" alt="${product.name}" class="w-24 h-24 object-contain mb-4 rounded" />
            <div class="text-center w-full">
              <h2 class="text-lg font-semibold text-gray-700 mb-2">${product.name}</h2>
              <p class="text-green-600 font-bold text-base">${product.price.toFixed(2)} PLN</p>
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
    <div class="bg-white rounded-lg shadow p-6 flex flex-col items-center md:items-start">
      <img src="${product.image}" alt="${product.name}" class="w-32 h-32 object-contain mb-4 rounded" />
      <h2 class="text-2xl font-bold text-gray-800 mb-2">${product.name}</h2>
      <p class="text-green-700 font-semibold text-lg mb-2">${product.price.toFixed(2)} PLN</p>
      <p class="text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac neque nec urna cursus.</p>
      <button
        class="md:hidden mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        onclick="backToList()"
      >
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
      <div class="grid grid-cols-4 gap-8">
        <div class="col-span-1">${renderProductList(products, true)}</div>
        <div class="col-span-3">${renderProductDetails(product)}</div>
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