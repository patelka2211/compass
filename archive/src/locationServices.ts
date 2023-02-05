import { Coordinates, coords } from "./coordinates";
import { calculateDirection } from "./direction";
import elements from "./gui/elements";
import { set_root_frame_content } from "./gui/rootFrameContent";

let previousLocation: { lat: number | null; long: number | null } = {
    lat: null,
    long: null,
};

let lock: boolean = false;

export const onSuccess = (position: GeolocationPosition) => {
    if (lock) return;

    if (previousLocation.lat == null || previousLocation.long == null) {
        previousLocation.lat = position.coords.latitude;
        previousLocation.long = position.coords.longitude;

        // Update UI
        console.log(position.coords);

        // Lock for 2 seconds
        setTimeout(() => {
            lock = true;
        }, 2000);
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

    // Update current loction.
    previousLocation = currentLocation;

    // Update UI
    console.log(position.coords, direction);

    // Lock for 2 seconds
    setTimeout(() => {
        lock = true;
    }, 2000);
};

export const onFailure = (error: GeolocationPositionError) => {
    ((element) => {
        element.classList.add("disable");
        element.innerText = "Location access is prohibited";
        element.style.cursor = "help";
        element.onclick = () => {
            alert(error.message);
        };
    })(elements.toggle_updates());

    ((element) => {
        element.innerHTML = "<strong>Back</strong>";
        element.onclick = set_root_frame_content;
    })(elements.Developed_by_KP());
};
