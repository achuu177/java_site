const productContainer = document.getElementById('productsContainer');
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');

// Fetch products from the Fake Store API
async function fetchProducts() {
    const response = await fetch('https://fakestoreapi.com/products');
    const products = await response.json();
    displayProducts(products);
    return products; // Return the fetched products for later use
}

// Display products in the product container
function displayProducts(products) {
    productContainer.innerHTML = ''; // Clear existing products
    products.forEach(product => {
        const col = document.createElement('div');
        col.classList.add('col-lg-3');
        col.innerHTML = `
            <div class="card product-card">
                <img src="${product.image}" alt="Product Image" class="product-image">
                <h5 class="product-title">${product.title}</h5>
                 <p class="card-text">${product.description.substring(0, 100)}...</p>
              <p class="product-price">$${product.price}</p>
               <button type="button" class="btn btn-warning">View Product</button>
               <button type="button" class="btn btn-primary">Add to Cart</button>
            </div>
        `;
        productContainer.appendChild(col);
    });
}

// Implement search functionality
searchForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.title.toLowerCase().includes(searchTerm)
    );
    displayProducts(filteredProducts);
});

// Initial fetch of products
let products = [];
fetchProducts().then(fetchedProducts => {
    products = fetchedProducts; // Store fetched products for search functionality
});