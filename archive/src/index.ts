import { set_compass_frame_content } from "./gui/compassFrameContent";
import elements from "./gui/elements";
import { set_root_frame_content } from "./gui/rootFrameContent";
import {
    compassState,
    startLocationWatcher,
    stopLocationWatcher,
} from "./locationWatcher";

let toggle_updates = elements.toggle_updates() as HTMLButtonElement;
let Developed_by_KP_btn = elements.Developed_by_KP() as HTMLButtonElement;

// toggle_updates.onclick = () => {
//     if (Developed_by_KP_btn.classList.contains("show")) {
//         toggle_updates.innerText = "Start again";

//         Developed_by_KP_btn.classList.toggle("show");

//         set_root_frame_content();

//         stopLocationWatcher();
//     } else {
//         toggle_updates.innerText = "Stop";

//         Developed_by_KP_btn.classList.toggle("show");

//         set_compass_frame_content();
//     }
// };

toggle_updates.onclick = startLocationWatcher;
