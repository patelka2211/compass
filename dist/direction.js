export function Coordinates(Latitude, Longitude) {
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
