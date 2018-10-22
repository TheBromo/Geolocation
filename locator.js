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
 * - Cant get the ip in local javascript, if the ip would be available the approximate
 * position(very inaccurate because it's the providers position) could be found out. This would work with a link
 * like this:http://www.geoplugin.net/json.gp?ip=62.30.218.130.
 *
 * With this code:
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://www.geoplugin.net/json.gp?ip=62.30.218.130",
  "method": "GET",
  "headers": {
    "cache-control": "no-cache",
    "Postman-Token": "f4365f1a-1b64-4258-a199-59b693e83a85"
  }
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

 *This will return a json file with the geodata
 */

let lat, long, accuracy;

//the callback method is called asynchronously
navigator.geolocation.getCurrentPosition(showPosition, showError);

/**
 * Needs permission to work.
 * As far as i know there is not a way to customize the permission request.
 * @param position
 */
function showPosition(position) {

    long = position.coords.longitude;
    lat = position.coords.latitude;
    accuracy = position.coords.accuracy;
    drawMap();


}

/**
 * If the Geolocation is unavailable or blocked there is no possibility to get the ip via javascript. There are
 * websites that give back the ip, but all of them seem to be blocked when they get called by javascript.
 * @param error
 */

function showError(error) {
    let x = document.getElementById("mapId");
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        default:
            alert("An unknown error occurred.");
            break;
    }
    lat = 0;
    long = 0;
    accuracy = 0;
    drawMap();
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

    document.getElementById("long").innerText = "" + long;
    document.getElementById("lat").innerText = "" + lat;
    document.getElementById("accuracy").innerText = "" + accuracy;
}


