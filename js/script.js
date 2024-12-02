//Selecting form and dropdown elements
const searchForm = document.getElementById('search-form');
const yearSelect = document.getElementById('year');
const makeSelect = document.getElementById('make');
const modelSelect = document.getElementById('model');
const resultsSection = document.getElementById('search-results');

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
    });
});

//Function for Displaying
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