function updatePrice() {
    const priceRange = document.getElementById('priceRange');
    const minPrice = document.getElementById('minPrice');
    const maxPrice = document.getElementById('maxPrice');

    minPrice.innerText = '0';
    maxPrice.innerText = priceRange.value;
}

function filterBedrooms(bedroomType) {
    console.log('Filter by bedrooms:', bedroomType);
    // Implement the logic to filter listings based on the number of bedrooms
}

function filteramenities(amenities) {
    console.log('Filter amenities:', amenities);
    // Implement the logic to filter listings based on amenties
}
