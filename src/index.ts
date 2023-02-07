import { calculateDirection } from "./calculateDirection";
import { set_compass_frame_content } from "./gui/compassFrameContent";
import elements from "./gui/elements";
import { set_root_frame_content } from "./gui/rootFrameContent";
import {
    isWatching,
    rotateCompass,
    startWatching,
    stopWatching,
} from "./gui/rotateCompass";

let watcher: number,
    previousPosition: { lat: number; long: number },
    previousAngle: number = 0,
    lock = false;

const onSuccess = (position: GeolocationPosition) => {
    if (lock) return;

    lock = true;
    setTimeout(() => {
        lock = false;
    }, 1600);

    if (!isWatching()) {
        startWatching();
        set_compass_frame_content();

        ((element) => {
            element.innerHTML = "Stop";
            element.onclick = stopWatcher;
        })(elements.toggle_updates());

        elements.credits_btn().classList.add("show");
    }

    const currentPosition = {
        lat: position.coords.latitude,
        long: position.coords.longitude,
    };

    if (previousPosition === undefined) {
        previousPosition = currentPosition;
        return;
    }

    const direction = calculateDirection(currentPosition, previousPosition);

    if (direction === null) return;

    rotateCompass(direction.angle, previousAngle);

    previousPosition = currentPosition;
    previousAngle = direction.angle;
};

const onFailure = (error: GeolocationPositionError) => {
    navigator.geolocation.clearWatch(watcher);
    ((element) => {
        element.classList.add("disable");
        element.innerText = "No access to the location";
        element.onclick = () => {
            alert(error.message);
        };
    })(elements.toggle_updates());
    stopWatching();
};

const stopWatcher = () => {
    navigator.geolocation.clearWatch(watcher);
    elements.credits_btn().classList.remove("show");
    ((element) => {
        element.onclick = startWatcher;
        element.innerText = "Start again";
    })(elements.toggle_updates());
    set_root_frame_content();
    stopWatching();
};

const startWatcher = () => {
    watcher = navigator.geolocation.watchPosition(onSuccess, onFailure, {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
    });
};

if (navigator.geolocation) {
    elements.toggle_updates().onclick = startWatcher;
} else {
    elements.toggle_updates().classList.add("disable");
    elements.toggle_updates().innerText = "Browser not supported";
    elements.toggle_updates().onclick = () => {
        alert("Location access is not supported by your browser.");
    };
}
