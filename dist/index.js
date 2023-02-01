import { onFailure, onSuccess } from "./locationServices";
let watcher;
if (navigator.geolocation) {
    watcher = navigator.geolocation.watchPosition(onSuccess, onFailure, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    });
    // navigator.geolocation.getCurrentPosition(onSuccess, onFailure);
    // navigator.geolocation.getCurrentPosition(onSuccess, onFailure);
    // setInterval(() => {
    //     navigator.geolocation.getCurrentPosition(onSuccess, onFailure);
    // }, 10 * 1000);
}
else {
    alert("Your browser does not support geolocation.");
}
