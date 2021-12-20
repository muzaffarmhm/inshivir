mapboxgl.accessToken = 'pk.eyJ1IjoibXV6YWZmYXI4NyIsImEiOiJja3hhZ2VoMzEzd3JnMnhsYW9jZnk2dDVyIn0.I2LXyK4Cbjvgn13_xRYoUA';
const map = new mapboxgl.Map({
container: 'map', // container ID
style: 'mapbox://styles/muzaffar87/ckxakjhycbrb515o5xs5xugc8', 
center: campground.geometry.coordinates, 
zoom: 7
});

map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');


new mapboxgl.Marker()
.setLngLat(campground.geometry.coordinates)
.setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
.setHTML('<h4>' + campground.title + '</h4><p>' + campground.location + '</p>'))
.addTo(map);

