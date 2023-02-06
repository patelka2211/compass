type coords = {
    lat: number;
    long: number;
};

const calculateDirection = (
    currentLocation: coords,
    previousLocation: coords
) => {
    const deltaLat = currentLocation.lat - previousLocation.lat,
        deltaLong = currentLocation.long - previousLocation.long;
    let angle = Math.abs((Math.atan(deltaLong / deltaLat) / Math.PI) * 180);

    if (deltaLong === 0) {
        if (deltaLat > 0) return 0;
        else if (deltaLat < 0) return 180;
        else return null;
    }

    if (deltaLat < 0) angle += 90;
    if (deltaLong < 0 && angle !== 180) angle *= -1;

    return angle;
};

console.log(calculateDirection({ lat: 1, long: -6 }, { lat: 1, long: 0 }));
