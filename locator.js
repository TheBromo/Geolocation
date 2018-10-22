
//IMPORTANT: this needs to be called after the container div
navigator.geolocation.getCurrentPosition(showPosition);
let mymap = L.map('mapId').setView([51.505, -0.09], 13);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.outdoors',
    accessToken: 'pk.eyJ1IjoidGhlYnJvbW8iLCJhIjoiY2puazdvZTVrMGNwaTNwcGtya2pnamNxeCJ9.uqohf1YKCWFmba-2iE_67Q'
}).addTo(mymap);

/**
 * Needs permission to work.
 * As far as i know there is not a way to customize the permission request.
 * @param position
 */
function showPosition(position){
    console.log(position);
    document.getElementById("lat").innerHTML =""+ position.coords.longitude;
    document.getElementById("long").innerHTML =""+ position.coords.latitude;
    document.getElementById("accuracy").innerHTML =""+ position.coords.accuracy;
}

/**
 * if the advanced SKU is used:
 * https://developers.google.com/maps/documentation/embed/usage-and-billing
 */
