const directions = {
    N: { name: "N", range: [337.5, 22.5] },
    NE: { name: "NE", range: [22.5, 67.5] },
    E: { name: "E", range: [67.5, 112.5] },
    SE: { name: "SE", range: [112.5, 157.5] },
    S: { name: "S", range: [157.5, 202.5] },
    SW: { name: "SW", range: [202.5, 247.5] },
    W: { name: "W", range: [247.5, 292.5] },
    NW: { name: "NW", range: [292.5, 337.5] },
};
const Coordinates = (Latitude, Longitude) => {
    if (Latitude < -90 || Latitude > 90)
        throw Error(`Latitude must be range from -90 to 90. Not ${Latitude}`);
    else if (Longitude < -180 || Longitude > 180)
        throw Error(`Longitude must be range from -180 to 180. Not ${Longitude}`);
    return {
        lat: Number(Latitude.toFixed(8)),
        long: Number(Longitude.toFixed(8)),
    };
};
const calculateDirection = (currentLocation, previousLocation) => {
    let deltaLat = currentLocation.lat - previousLocation.lat, deltaLong = currentLocation.long - previousLocation.long, return_value = {
        direction: "",
        angle: 0,
    }, angle = 0;
    const determineDirectionName = () => {
        return_value.angle = angle;
        if (angle > directions.N.range[0] || angle < directions.N.range[1]) {
            return_value.angle = return_value.angle % 360;
            return_value.direction = directions.N.name;
            return return_value;
        }
        for (const key in directions) {
            if (Object.prototype.hasOwnProperty.call(directions, key)) {
                const direction = directions[key];
                if (direction.range[0] < angle && angle < direction.range[1]) {
                    return_value.direction = direction.name;
                    break;
                }
            }
        }
        return return_value;
    };
    if (deltaLat == 0 || (deltaLong == 0 && deltaLat != 0)) {
        if (deltaLat == 0) {
            if (deltaLong > 0)
                angle = 90;
            else
                angle = 270;
        }
        if (deltaLong == 0) {
            if (deltaLat > 0)
                angle = 0;
            else
                angle = 180;
        }
        return determineDirectionName();
    }
    angle =
        90 -
            Math.abs(Number(((Math.atan(deltaLat / deltaLong) / Math.PI) * 180).toFixed(0)));
    if (deltaLat < 0) {
        if (deltaLong > 0)
            angle += 90;
        else if (deltaLong < 0)
            angle += 180;
    }
    else if (deltaLat > 0 && deltaLong < 0)
        angle += 270;
    return determineDirectionName();
};
// console.log(
//     calculateDirection(
//         Coordinates(41.40399, 2.17601),
//         Coordinates(41.40338, 2.17403)
//     )
// );

let previousLocation = {
    lat: null,
    long: null,
};
const onSuccess = (position) => {
    if (previousLocation.lat == null || previousLocation.long == null) {
        previousLocation.lat = position.coords.latitude;
        previousLocation.long = position.coords.longitude;
        document.getElementById("latitude").innerHTML =
            position.coords.latitude.toFixed(6);
        document.getElementById("longitude").innerHTML =
            position.coords.longitude.toFixed(6);
        return;
    }
    let currentLocation = Coordinates(position.coords.latitude, position.coords.longitude);
    const direction = calculateDirection(currentLocation, previousLocation);
    console.log(`Direction: ${direction.direction}, Angle: ${direction.angle}.`);
    previousLocation = currentLocation;
    // console.log(position);
    document.getElementById("latitude").innerHTML =
        position.coords.latitude.toFixed(6);
    document.getElementById("longitude").innerHTML =
        position.coords.longitude.toFixed(6);
    document.getElementById("direction").innerHTML =
        direction.direction;
    document.getElementById("angle").innerHTML =
        direction.angle.toString();
    const time_now = new Date();
    document.getElementById("fetch-time").innerHTML = `${time_now.getHours()}:${time_now.getMinutes()}:${time_now.getSeconds()}`;
};
const onFailure = (error) => {
    alert(error.message);
};
// interface transport_speed_type {
//     foot: number;
//     bus: number;
//     train: number;
//     car: number;
// }
// const avg_speeds: transport_speed_type = {
//     foot: 6,
//     bus: 22,
//     train: 55,
//     car: 60,
// };
// const setSpeedRanges = <transport_type extends keyof transport_speed_type>(
//     transport_type: transport_type
// ) => {
//     let speed_ranges: { [seconds: number]: number } = {};
//     for (let index = 0; index < 5; index++) {
//         speed_ranges[index + 1] = Number(
//             ((5 / 18) * (index + 1) * avg_speeds[transport_type]).toFixed(2)
//         );
//     }
//     return speed_ranges;
// };
// let speed_ranges = setSpeedRanges("car");
// console.log(speed_ranges);

if (navigator.geolocation) {
    navigator.geolocation.watchPosition(onSuccess, onFailure, {
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
