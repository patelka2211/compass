import { set_compass_frame_content } from "./gui/compassFrameContent";
import elements from "./gui/elements";
import { set_root_frame_content } from "./gui/rootFrameContent";
let watcher, watching = false, previousPosition, previousAngle = 0, lock = false;
const onSuccess = (position) => {
    if (lock)
        return;
    lock = true;
    setTimeout(() => {
        lock = false;
    }, 2000);
    if (!watching) {
        watching = true;
        set_compass_frame_content();
        ((element) => {
            element.innerHTML = "Stop";
            element.onclick = stopWatcher;
        })(elements.toggle_updates());
        elements.credits_btn().classList.add("show");
    }
    console.log(previousPosition);
    let currentPosition = {
        lat: position.coords.latitude,
        long: position.coords.longitude,
    };
    if (previousPosition === undefined) {
        previousPosition = currentPosition;
        return;
    }
    previousPosition = currentPosition;
    // console.log("update");
    // console.log(position.coords);
};
const onFailure = (error) => {
    ((element) => {
        element.classList.add("disable");
        element.innerText = error.message;
        element.onclick = () => {
            alert(error.message);
        };
    })(elements.toggle_updates());
    watching = false;
};
const stopWatcher = () => {
    navigator.geolocation.clearWatch(watcher);
    elements.credits_btn().classList.remove("show");
    ((element) => {
        element.onclick = startWatcher;
        element.innerText = "Start again";
    })(elements.toggle_updates());
    set_root_frame_content();
    watching = false;
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
}
else {
    elements.toggle_updates().classList.add("disable");
    elements.toggle_updates().innerText = "Browser not supported";
    elements.toggle_updates().onclick = () => {
        alert("Your browser does not support location access.");
    };
}
