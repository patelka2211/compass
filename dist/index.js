import { calculateDirection } from "./calculateDirection";
import { set_compass_frame_content } from "./gui/compassFrameContent";
import elements from "./gui/elements";
import { set_feedback_frame_content } from "./gui/feedbackFrameContent";
import { set_root_frame_content } from "./gui/rootFrameContent";
import { isWatching, rotateCompass, startWatching, stopWatching, } from "./gui/rotateCompass";
let watcher, previousPosition, previousAngle = 0, lock = false;
const onSuccess = (position) => {
    if (lock)
        return;
    lock = true;
    setTimeout(() => {
        lock = false;
    }, 1600);
    const currentPosition = {
        lat: Number(position.coords.latitude.toFixed(5)),
        long: Number(position.coords.longitude.toFixed(5)),
    };
    if (!isWatching()) {
        startWatching();
        set_compass_frame_content();
        ((element) => {
            element.innerHTML = "Stop";
            element.onclick = stopWatcher;
        })(elements.toggle_updates());
        elements.credits_btn().classList.add("show");
        previousPosition = currentPosition;
        return;
    }
    const direction = calculateDirection(currentPosition, previousPosition);
    if (direction === null)
        return;
    rotateCompass(direction.angle, previousAngle);
    previousPosition = currentPosition;
    previousAngle = direction.angle;
};
const onFailure = (error) => {
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
    elements.feedback_btn().onclick = openFeedbackForm;
    stopWatching();
};
const startWatcher = () => {
    watcher = navigator.geolocation.watchPosition(onSuccess, onFailure, {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
    });
};
const openFeedbackForm = () => {
    elements.toggle_updates().onclick = closeFeedbackForm;
    elements.toggle_updates().innerText = "Done";
    set_feedback_frame_content();
};
const closeFeedbackForm = () => {
    elements.toggle_updates().onclick = startWatcher;
    elements.toggle_updates().innerText = "Start again";
    set_root_frame_content();
    elements.feedback_btn().onclick = openFeedbackForm;
};
if (navigator.geolocation) {
    elements.toggle_updates().onclick = startWatcher;
}
else {
    elements.toggle_updates().classList.add("disable");
    elements.toggle_updates().innerText = "Browser not supported";
    elements.toggle_updates().onclick = () => {
        alert("Location access is not supported by your browser.");
    };
}
