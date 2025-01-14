// Declaring global variables
const searchForm = document.getElementById('search-form');
const yearSelect = document.getElementById('year');
const makeSelect = document.getElementById('make');
const modelSelect = document.getElementById('model');
const resultsSection = document.getElementById('search-results');
const categoryItems = document.querySelectorAll('.category-item');
const PRODUCTS_JSON_URL = 'http://localhost:3000/api/products'; // Path to your local JSON file

let products = []; // To store products from products.json

// Load products from products.json
async function loadProducts() {
    try {
        const response = await fetch(PRODUCTS_JSON_URL);
        products = await response.json();
    } catch (error) {
        console.error('Error loading products:', error);
        resultsSection.innerHTML = `<p class="text-danger">Failed to load products.</p>`;
    }
}

// Initialize by loading products
loadProducts();

// Event listener for form submission
searchForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent page reload

    // Get the values from the form
    const year = yearSelect.value;
    const make = makeSelect.value;
    const model = modelSelect.value;

    // Check if all fields are selected
    if (!year || !make || !model) {
        resultsSection.innerHTML = `<p class="text-danger">Please select all fields!</p>`;
        alert('Please select all fields!');
        return;
    }

    // Filter and display search results
    displaySearchResults(year, make, model);
});

// Display search results
function displaySearchResults(year, make, model) {
    const filteredProducts = products.filter(
        (product) =>
            product.year === year &&
            product.compatibility.make.includes(make) &&
            product.compatibility.model.includes(model)
    );

    resultsSection.innerHTML = `
    <h3>${year} ${make} ${model} :نتایج جستجو</h3>
    <div class="row">
        ${
            filteredProducts.length
                ? filteredProducts.map(createProductCardHTML).join('')
                : '<p class="col-12">هیچ محصولی یافت نشد</p>'
        }
    </div>
    `;
}

// Event listener for category clicks
categoryItems.forEach((item) => {
    item.addEventListener('click', () => {
        highlightCategory(item);
        const category = item.getAttribute('data-category');

        // Display products by category
        displayCategoryResults(category);

        // Scroll to the results section
        resultsSection.scrollIntoView({ behavior:'smooth' });
    });
});

// Highlight selected category
function highlightCategory(selectedItem) {
    categoryItems.forEach((item) => item.classList.remove('active')); // Remove active from all
    selectedItem.classList.add('active'); // Add active to clicked item
}

// Display results for a selected category
function displayCategoryResults(category) {
    const filteredProducts = products.filter((product) => product.category === category);

    resultsSection.innerHTML = `
    <h3>${category} Products</h3>
    <div class="row">
        ${
            filteredProducts.length
                ? filteredProducts.map(createProductCardHTML).join('')
                : `<p class="col-12">هیچ محصولی یافت نشد</p>`
        }
    </div>
    `;
}

// Create HTML for a single product card
function createProductCardHTML(product) {
    return `
    <div class="col-6 col-md-4 col-lg-3 product-item">
        <div class="card">
            <img src="${product.image}" class="card-img-top img-fluid" alt="${product.name}">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.price}تومان</p>
                <button class="btn btn-success">افزودن به سبد</button>
                <a href="product.html?id=${product.id}" target="_blank" class="btn btn-primary">اطلاعات محصول</a>
            </div>
        </div>
    </div>
    `;
}
