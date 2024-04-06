mapboxgl.accessToken = 'pk.eyJ1Ijoic3VtLW1pc2hyYSIsImEiOiJjbHVtdzI1YTQxZWpkMmpuemVrc3R6aGt1In0.0J-pUXtcBRrg3hbOG1UDSQ';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-74.5, 40], // Default center coordinates
    zoom: 9 // Default zoom level
});


var searchInput = document.getElementById('searchInput');
searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        // Perform geocoding request
        geocode(searchInput.value);
    }
});


function geocode(query) {
    // Send request to Mapbox Geocoding API
    fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(query) + '.json?access_token=' + mapboxgl.accessToken)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // Extract coordinates from response
            var coordinates = data.features[0].geometry.coordinates;
            // Center map at the coordinates
            map.flyTo({
                center: coordinates,
                zoom: 12 // Adjust zoom level as needed
            });
            // Optionally, add a marker at the coordinates
            new mapboxgl.Marker()
                .setLngLat(coordinates)
                .addTo(map);
        })
        .catch(function(error) {
            console.log('Error:', error);
        });
}



