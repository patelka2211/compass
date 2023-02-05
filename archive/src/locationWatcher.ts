import { Coordinates, coords } from "./coordinates";
import { calculateDirection } from "./direction";
import { set_compass_frame_content } from "./gui/compassFrameContent";
import elements from "./gui/elements";
import { set_root_frame_content } from "./gui/rootFrameContent";
import { Angle, rotateCompass } from "./gui/rotateCompass";

let watcher: number;
let watching: boolean = false;

let previousLocation: { lat: number | null; long: number | null } = {
    lat: null,
    long: null,
};

let lock: boolean = false;

let previousAngle = 0;

export const startLocationWatcher = () => {
    if (navigator.geolocation) {
        watcher = navigator.geolocation.watchPosition(
            (position) => {
                if (lock) return;

                if (!watching) {
                    watching = true;
                    compassState();
                }

                if (
                    previousLocation.lat === null ||
                    previousLocation.long === null
                ) {
                    previousLocation.lat = position.coords.latitude;
                    previousLocation.long = position.coords.longitude;

                    setTimeout(() => {
                        lock = true;
                    }, 2000);
                }

                let currentLocation = Coordinates(
                    position.coords.latitude,
                    position.coords.longitude
                );

                const direction = calculateDirection(
                    currentLocation,
                    previousLocation as coords
                );

                // Update UI
                rotateCompass(Angle(direction.angle), Angle(previousAngle));
                // console.log(position.coords);

                // Update current location
                previousLocation = currentLocation;

                // Update current angle
                previousAngle = direction.angle;

                setTimeout(() => {
                    lock = true;
                }, 2000);
            },
            (error) => {
                stopLocationWatcher();

                ((element) => {
                    element.classList.add("disable");
                    element.innerText = "You denied Geolocation";
                    element.onclick = () => {
                        alert("You denied Geolocation");
                    };
                })(elements.toggle_updates());
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0,
            }
        );

        console.log(watcher);
    } else {
        ((element) => {
            element.classList.add("disable");
            element.innerText = "Location access is prohibited";
            element.onclick = () => {
                alert("Your browser does not support location services.");
            };
        })(elements.toggle_updates());
    }
};

export const stopLocationWatcher = () => {
    console.log("Stopped watching");

    navigator.geolocation.clearWatch(watcher);
    watching = false;
};

const rootState = () => {
    elements.toggle_updates().innerHTML = "Start again";
    elements.toggle_updates().onclick = startLocationWatcher;
    elements.Developed_by_KP().classList.remove("show");
    set_root_frame_content();
    stopLocationWatcher();
};
export const compassState = () => {
    elements.toggle_updates().innerHTML = "Stop";
    elements.toggle_updates().onclick = rootState;
    elements.Developed_by_KP().classList.add("show");
    set_compass_frame_content();
};
