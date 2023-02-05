import { coords } from "./coordinates";

const geoDistance = (currentLocation: coords, previousLocation: coords) => {
    return Number(
        (
            6371 *
            Math.acos(
                Math.sin(currentLocation.lat) * Math.sin(previousLocation.lat) +
                    Math.cos(currentLocation.lat) *
                        Math.cos(previousLocation.lat) *
                        Math.cos(previousLocation.long - currentLocation.long)
            )
        ).toFixed(5)
    );
};

const calcSpeed = (
    currentLocation: coords,
    previousLocation: coords,
    time: number
) => {
    let distance = geoDistance(currentLocation, previousLocation);
    let speed = Number(((distance / time) * 3600).toFixed(5));

    console.log(speed);
};
