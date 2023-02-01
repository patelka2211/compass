import { Coordinates, calculateDirection, coords } from "./direction";

let previousLocation: { lat: number | null; long: number | null } = {
    lat: null,
    long: null,
};

export const onSuccess = (position: GeolocationPosition) => {
    if (previousLocation.lat == null || previousLocation.long == null) {
        previousLocation.lat = position.coords.latitude;
        previousLocation.long = position.coords.longitude;

        (document.getElementById("latitude") as HTMLDivElement).innerHTML =
            position.coords.latitude.toFixed(6);
        (document.getElementById("longitude") as HTMLDivElement).innerHTML =
            position.coords.longitude.toFixed(6);
        return;
    }

    let currentLocation = Coordinates(
        position.coords.latitude,
        position.coords.longitude
    );

    const direction = calculateDirection(
        currentLocation,
        previousLocation as coords
    );

    console.log(
        `Direction: ${direction.direction}, Angle: ${direction.angle}.`
    );

    previousLocation = currentLocation;

    // console.log(position);
    (document.getElementById("latitude") as HTMLDivElement).innerHTML =
        position.coords.latitude.toFixed(6);
    (document.getElementById("longitude") as HTMLDivElement).innerHTML =
        position.coords.longitude.toFixed(6);

    (document.getElementById("direction") as HTMLDivElement).innerHTML =
        direction.direction;
    (document.getElementById("angle") as HTMLDivElement).innerHTML =
        direction.angle.toString();

    const time_now = new Date();

    (
        document.getElementById("fetch-time") as HTMLDivElement
    ).innerHTML = `${time_now.getHours()}:${time_now.getMinutes()}:${time_now.getSeconds()}`;
};

export const onFailure = (error: GeolocationPositionError) => {
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
