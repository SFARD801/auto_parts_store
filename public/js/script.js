//declaring global variables
const searchForm = document.getElementById('search-form');
const yearSelect = document.getElementById('year');
const makeSelect = document.getElementById('make');
const modelSelect = document.getElementById('model');
const resultsSection = document.getElementById('search-results');
const API_URL = 'http://localhost:3000/api/products';

//event listner for form submit
searchForm.addEventListener('submit', (event) => {
    event.preventDefault(); //Preventign the reload

    //getting the values
    const year = yearSelect.value;
    const make = makeSelect.value;
    const model = modelSelect.value;

    //check if all fields are selected
    if (!year || !make || !model) {
        resultsSection.innerHTML = `<p class="error">Please select all fields!</p>`;
        alert('Please select all fields!');
        return;
    }

    //showing results
    displayResults(year, make, model);
});

//how it displays form results
function displayResults(year, make, model) {
    resultsSection.innerHTML = `
        <h3>Search Results for: ${year} ${make} ${model}</h3>
        <p>Sorry, no parts found for this selection. (Placeholder message)</p>
    `;
}

//category items
const categoryItems = document.querySelectorAll('.category-item');

//add click listner for each category item
categoryItems.forEach((item) => {
    item.addEventListener('click', () => {
        highlightCategory(item);
        const category = item.getAttribute('data-category');

        //show results
        displayCategoryResults(category);
        displayProducts(category);
    });
});

//how to display categories and results
function displayCategoryResults(category) {
    let categoryName = "";

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

//highlight clicked category
function highlightCategory(selectedItem) {
    //remove active classes from all items
    categoryItems.forEach((item) => {item.classList.remove('active')});

    //add active class for selected item
    selectedItem.classList.add('active');
}

//fetch products from backend
async function fetchProducts() {
    try {
        const response = await fetch(API_URL);
        const products = await response.json();
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

//display fetched products
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