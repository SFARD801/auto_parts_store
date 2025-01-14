// Get product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Fetch product details and display them
async function fetchProductDetails() {
    try {
        const response = await fetch('/api/products');
        const products = await response.json();
        const product = products.find((p) => p.id == productId);

        if (product) {
            displayProductDetails(product);
        } else {
            document.getElementById('product-details').innerHTML = `
                <p class="text-danger">Product not found.</p>
            `;
        }
    } catch (error) {
        console.error('Error fetching product details:', error);
    }
}

// Display product details on the page
function displayProductDetails(product) {
    document.getElementById('product-details').innerHTML = `
        <div class="col-md-6">
            <img src="${product.image}" class="img-fluid" alt="${product.name}">
        </div>
        <div class="col-md-6">
            <h1>${product.name}</h1>
            <p>${product.description}</p>
            <h3>قیمت: ${product.price} تومان</h3>
            <button class="btn btn-success">افزودن به سبد</button>
        </div>
    `;
}

// Fetch and display the product details when the page loads
fetchProductDetails();
