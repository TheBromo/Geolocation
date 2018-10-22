

navigator.geolocation.getCurrentPosition(showPosition);

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
 * if
 * https://developers.google.com/maps/documentation/embed/usage-and-billing
 */
/