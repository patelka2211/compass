import elements from "./gui/elements";
import { startLocationWatcher, } from "./locationWatcher";
let toggle_updates = elements.toggle_updates();
let Developed_by_KP_btn = elements.Developed_by_KP();
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
