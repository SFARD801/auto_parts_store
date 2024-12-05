//Selecting form and dropdown elements
const searchForm = document.getElementById('search-form');
const yearSelect = document.getElementById('year');
const makeSelect = document.getElementById('make');
const modelSelect = document.getElementById('model');
const resultsSection = document.getElementById('search-results');
const API_URL = 'http://localhost:3000/api/products';

//Adding event listner for form submission
searchForm.addEventListener('submit', (event) => {
    event.preventDefault(); //Preventign the reload

    //Getting the values
    const year = yearSelect.value;
    const make = makeSelect.value;
    const model = modelSelect.value;

    //Check if all fields are selected
    if (!year || !make || !model) {
        resultsSection.innerHTML = `<p class="error">Please select all fields!</p>`;
        alert('Please select all fields!');
        return;
    }

    //Simulating results
    displayResults(year, make, model);
});

//Displaying results
function displayResults(year, make, model) {
    resultsSection.innerHTML = `
        <h3>Search Results for: ${year} ${make} ${model}</h3>
        <p>Sorry, no parts found for this selection. (Placeholder message)</p>
    `;
}

//Selecting category items
const categoryItems = document.querySelectorAll('.category-item');

//Adding click event listner to each category item
categoryItems.forEach((item) => {
    item.addEventListener('click', () => {
        highlightCategory(item);
        const category = item.getAttribute('data-category');

        //Displaying results based on the category
        displayCategoryResults(category);
        displayProducts(category);
    });
});

//Function for displaying categories and the results
function displayCategoryResults(category) {
    let categoryName = "";

    //Mapping category
    switch (category) {
        case "engine":
            categoryName = "Engine Parts";
            break;
        case "brake":
            categoryName = "Brake System";
            break;
        case "clutch kit":
            categoryName = "Clutch Kit";
            break;
        default:
            categoryName = "Unknown Category";
    }

    resultsSection.innerHTML = `
        <h3>${categoryName}</h3>
        <p>Displaying results for ${categoryName}. (Placeholder message)</p>
    `;
}

//Highlighting clicked category
function highlightCategory(selectedItem) {
    //Removing active classes from all items
    categoryItems.forEach((item) => {item.classList.remove('active')});

    //Adding active class for clicked item
    selectedItem.classList.add('active');
}

//Fetching products from the backend
async function fetchProducts() {
    try {
        const response = await fetch(API_URL);
        const products = await response.json();
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

//Displaying products in the results section
async function displayProducts(category) {
    const products = await fetchProducts();
    const filteredProducts = products.filter((products) => products.category === category);

    resultsSection.innerHTML = filteredProducts.length
        ? filteredProducts.map((product) => `
            <div class="product">
                <h4>${product.name}</h4>
                <p>Price: ${product.price} تومان</p>
                <p>Compatible with: ${product.compatibility.make.join(', ')}</p>
            </div>
        `).join('')
        : `<p>No products found in this category</p>`;
}