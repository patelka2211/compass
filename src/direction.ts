type direction_id_and_range = {
    name: string;
    range: [number, number];
};

const directions: { [direction_name: string]: direction_id_and_range } = {
    N: { name: "N", range: [337.5, 22.5] },
    NE: { name: "NE", range: [22.5, 67.5] },
    E: { name: "E", range: [67.5, 112.5] },
    SE: { name: "SE", range: [112.5, 157.5] },
    S: { name: "S", range: [157.5, 202.5] },
    SW: { name: "SW", range: [202.5, 247.5] },
    W: { name: "W", range: [247.5, 292.5] },
    NW: { name: "NW", range: [292.5, 337.5] },
};

export type coords = {
    lat: number;
    long: number;
};

export const Coordinates = (Latitude: number, Longitude: number): coords => {
    if (Latitude < -90 || Latitude > 90)
        throw Error(`Latitude must be range from -90 to 90. Not ${Latitude}`);
    else if (Longitude < -180 || Longitude > 180)
        throw Error(
            `Longitude must be range from -180 to 180. Not ${Longitude}`
        );
    return {
        lat: Number(Latitude.toFixed(8)),
        long: Number(Longitude.toFixed(8)),
    };
};

export const calculateDirection = (
    currentLocation: coords,
    previousLocation: coords
): { direction: string; angle: number } => {
    let deltaLat = currentLocation.lat - previousLocation.lat,
        deltaLong = currentLocation.long - previousLocation.long,
        return_value: { direction: string; angle: number } = {
            direction: "",
            angle: 0,
        },
        angle: number = 0;

    const determineDirectionName = () => {
        return_value.angle = angle;
        if (angle > directions.N.range[0] || angle < directions.N.range[1]) {
            return_value.angle = return_value.angle % 360;
            return_value.direction = directions.N.name;
            return return_value;
        }
        for (const key in directions) {
            if (Object.prototype.hasOwnProperty.call(directions, key)) {
                const direction: direction_id_and_range = directions[key];

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
            if (deltaLong > 0) angle = 90;
            else angle = 270;
        }

        if (deltaLong == 0) {
            if (deltaLat > 0) angle = 0;
            else angle = 180;
        }
        return determineDirectionName();
    }

    angle =
        90 -
        Math.abs(
            Number(
                ((Math.atan(deltaLat / deltaLong) / Math.PI) * 180).toFixed(0)
            )
        );
    if (deltaLat < 0) {
        if (deltaLong > 0) angle += 90;
        else if (deltaLong < 0) angle += 180;
    } else if (deltaLat > 0 && deltaLong < 0) angle += 270;

    return determineDirectionName();
};

// console.log(
//     calculateDirection(
//         Coordinates(41.40399, 2.17601),
//         Coordinates(41.40338, 2.17403)
//     )
// );
