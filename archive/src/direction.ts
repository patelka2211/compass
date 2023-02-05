import { coords } from "./coordinates";

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

export const determineDirectionName = (angle: number) => {
    let direction_n_angle: { direction: string; angle: number } = {
        direction: "",
        angle: 0,
    };
    direction_n_angle.angle = angle;
    if (angle > directions.N.range[0] || angle < directions.N.range[1]) {
        direction_n_angle.angle = direction_n_angle.angle % 360;
        direction_n_angle.direction = directions.N.name;
        return direction_n_angle;
    }
    for (const key in directions) {
        if (Object.prototype.hasOwnProperty.call(directions, key)) {
            const direction: direction_id_and_range = directions[key];

            if (direction.range[0] < angle && angle < direction.range[1]) {
                direction_n_angle.direction = direction.name;
                break;
            }
        }
    }
    return direction_n_angle;
};

export const calculateDirection = (
    currentLocation: coords,
    previousLocation: coords
): { direction: string; angle: number } => {
    let deltaLat = currentLocation.lat - previousLocation.lat,
        deltaLong = currentLocation.long - previousLocation.long,
        // direction_n_angle: { direction: string; angle: number } = {
        //     direction: "",
        //     angle: 0,
        // },
        angle: number = 0;

    if (deltaLat == 0 || (deltaLong == 0 && deltaLat != 0)) {
        if (deltaLat == 0) {
            if (deltaLong > 0) angle = 90;
            else angle = 270;
        }

        if (deltaLong == 0) {
            if (deltaLat > 0) angle = 0;
            else angle = 180;
        }
        return determineDirectionName(angle);
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

    return determineDirectionName(angle);
};
