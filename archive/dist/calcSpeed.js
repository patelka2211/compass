const geoDistance = (currentLocation, previousLocation) => {
    return Number((6371 *
        Math.acos(Math.sin(currentLocation.lat) * Math.sin(previousLocation.lat) +
            Math.cos(currentLocation.lat) *
                Math.cos(previousLocation.lat) *
                Math.cos(previousLocation.long - currentLocation.long))).toFixed(5));
};
const calcSpeed = (currentLocation, previousLocation, time) => {
    let distance = geoDistance(currentLocation, previousLocation);
    let speed = Number(((distance / time) * 3600).toFixed(5));
    console.log(speed);
};
export {};
