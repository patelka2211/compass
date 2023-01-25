import { Coordinates, coords } from "./direction";
function successHandler(position: GeolocationPosition) {
    ((loc: coords) => {
        (
            document.getElementById("live-loc") as HTMLElement
        ).innerHTML = `${loc.lat}, ${loc.long}`;

        console.log(JSON.stringify(loc));
    })(Coordinates(position.coords.latitude, position.coords.longitude));
}

function errorHandler(errorObj: GeolocationPositionError) {
    console.log(errorObj.message);
}

function getLocation(
    onSuccess: PositionCallback,
    onError: PositionErrorCallback
) {
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

(
    document.getElementById("time-interval") as HTMLElement
).innerHTML = `${interval}s`;

getLocation(successHandler, errorHandler);
