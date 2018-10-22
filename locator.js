//IMPORTANT: this needs to be called after the container div
/*
 * if google maps is used and the advanced SKU:
 * https://developers.google.com/maps/documentation/embed/usage-and-billing
 * Note: for the basic map and marking spots on a map there is no need for the advanced SKU
 *
 * here i use the leaflet library: https://leafletjs.com/
 * with the tiles from Map box: https://www.mapbox.com/
 *
 * Limitations:
 * - When the device does not have GPS, the position can be inaccurate.
 * - Needs permission
 * -
 */


let lat, long, accuracy;

//the callback method is called asynchronously
navigator.geolocation.getCurrentPosition(showPosition);

/**
 * Needs permission to work.
 * As far as i know there is not a way to customize the permission request.
 * @param position
 */
function showPosition(position) {

    long = position.coords.longitude;
    lat = +position.coords.latitude;
    accuracy = position.coords.accuracy;

    drawMap();

    document.getElementById("long").innerText = "" + long;
    document.getElementById("lat").innerText = "" + lat;
    document.getElementById("accuracy").innerText = "" + accuracy;
}

/**
 * Here i use the leaflet library with map box, with the open map tiles, because for the google map i would need access to the google
 * cloud platform platform. This requires a master card, even if you use the free services, but i have my card in at home :).
 * The google map will probably be better quality.
 */
function drawMap() {

    //sets the position of the map
    let myMap = L.map('mapId').setView([lat, long], 13);

    //sets the map tile provider
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.outdoors',
        accessToken: 'pk.eyJ1IjoidGhlYnJvbW8iLCJhIjoiY2puazdvZTVrMGNwaTNwcGtya2pnamNxeCJ9.uqohf1YKCWFmba-2iE_67Q' /*this is my personal access token, you can get your own under: https://www.mapbox.com/*/
    }).addTo(myMap);

    //the pin on the map
    let marker = L.marker([lat, long]).addTo(myMap);

    //the circle on the map
    let circle = L.circle([lat, long], {
        color: 'blue',
        fillColor: '#6f75ff',
        fillOpacity: 0.5,
        radius: accuracy
    }).addTo(myMap);

    marker.bindPopup("<p>Hi i'm your estimated Position.</p>").openPopup();
    circle.bindPopup("I'm the radius of accuracy");

}


