function Coordinates(Latitude, Longitude) {
    if (Latitude < -90 || Latitude > 90)
        throw Error(`Latitude must be range from -90 to 90. Not ${Latitude}`);
    else if (Longitude < -180 || Longitude > 180)
        throw Error(`Longitude must be range from -180 to 180. Not ${Longitude}`);
    return {
        lat: Number(Latitude.toFixed(4)),
        long: Number(Longitude.toFixed(4)),
    };
}
function geoDistance(currentLocation, previousLocation) {
    return Number((6371 *
        Math.acos(Math.sin(currentLocation.lat) * Math.sin(previousLocation.lat) +
            Math.cos(currentLocation.lat) *
                Math.cos(previousLocation.lat) *
                Math.cos(previousLocation.long - currentLocation.long))).toFixed(3));
}

let currentLoc;
function successHandler(position) {
    ((loc) => {
        document.getElementById("live-loc").innerHTML = `${loc.lat}, ${loc.long}`;
        console.log(JSON.stringify(loc));
        if (currentLoc === undefined)
            currentLoc = loc;
        ((distance) => {
            document.getElementById("geo-distance").innerHTML = `${isNaN(distance) == true ? 0 : distance}m`;
        })(geoDistance(loc, currentLoc) * 1000);
        currentLoc = loc;
    })(Coordinates(position.coords.latitude, position.coords.longitude));
}
function errorHandler(errorObj) {
    console.log(errorObj.message);
}
function getLocation(onSuccess, onError) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
    else {
        alert("Geolocation is not supported by this browser.");
    }
}
let interval = 5, intervalid = setInterval(() => {
    getLocation(successHandler, errorHandler);
}, interval * 1000);
document.getElementById("time-interval").innerHTML = `${interval}s`;
getLocation(successHandler, errorHandler);
function stopUpdate() {
    let btn = document.getElementById("stop-btn");
    btn.id = "start-btn";
    btn.innerHTML = "Start update";
    btn.onclick = startUpdate;
    clearInterval(intervalid);
}
function startUpdate() {
    let btn = document.getElementById("start-btn");
    btn.id = "stop-btn";
    btn.innerHTML = "Stop update";
    btn.onclick = stopUpdate;
    getLocation(successHandler, errorHandler);
    intervalid = setInterval(() => {
        getLocation(successHandler, errorHandler);
    }, interval * 1000);
}
document.getElementById("stop-btn").onclick = function () {
    stopUpdate();
};
