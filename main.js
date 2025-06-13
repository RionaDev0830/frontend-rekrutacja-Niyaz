// Render the product list for Step 1 with 3 items per row, justified
function renderProductList(products) {
  const listContainer = document.getElementById('product-list');
  listContainer.innerHTML = `
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      ${products.map(product => `
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-col items-center shadow hover:shadow-lg transition w-full">
          <img src="${product.image}" alt="${product.name}" class="w-24 h-24 object-contain mb-4 rounded" />
          <div class="text-center w-full">
            <h2 class="text-lg font-semibold text-gray-700 mb-2">${product.name}</h2>
            <p class="text-green-600 font-bold text-base">${product.price.toFixed(2)} PLN</p>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  renderProductList(products);
});