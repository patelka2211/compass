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
