import { Coordinates } from "./direction";
function successHandler(position) {
    ((loc) => {
        document.getElementById(
            "live-loc"
        ).innerHTML = `${loc.lat}, ${loc.long}`;
        console.log(JSON.stringify(loc));
    })(Coordinates(position.coords.latitude, position.coords.longitude));
}
function errorHandler(errorObj) {
    console.log(errorObj.message);
}
function getLocation(onSuccess, onError) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}
let interval = 5,
    intervalid = setInterval(() => {
        getLocation(successHandler, errorHandler);
    }, interval * 1000);
document.getElementById("time-interval").innerHTML = `${interval}s`;
getLocation(successHandler, errorHandler);
