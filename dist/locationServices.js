import { Coordinates, calculateDirection } from "./direction";
let previousLocation = {
    lat: null,
    long: null,
};
export const onSuccess = (position) => {
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
export const onFailure = (error) => {
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