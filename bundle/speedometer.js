function Coordinates(Latitude, Longitude) {
    if (Latitude < -90 || Latitude > 90)
        throw Error(`Latitude must be range from -90 to 90. Not ${Latitude}`);
    else if (Longitude < -180 || Longitude > 180)
        throw Error(
            `Longitude must be range from -180 to 180. Not ${Longitude}`
        );
    return {
        lat: Number(Latitude.toFixed(4)),
        long: Number(Longitude.toFixed(4)),
    };
}

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
let interval = 5;
setInterval(() => {
    getLocation(successHandler, errorHandler);
}, interval * 1000);
document.getElementById("time-interval").innerHTML = `${interval}s`;
getLocation(successHandler, errorHandler);
