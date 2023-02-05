import { startLocationWatcher } from "../locationWatcher";
import compassDirections from "./assets/compassDirections";
import compassGraphics from "./assets/compassGraphics";
import elements from "./elements";
import j2h from "./j2h";

export const set_compass_frame_content = () => {
    let frame_content = j2h.setRoot(elements.frame_content());

    frame_content
        .append(j2h.element("p", { id: "direction-angle" }, `0<sup>o</sup> N`))
        .append(
            j2h.element(
                "div",
                { id: "compass-element" },
                `${compassGraphics}${compassDirections}`
            )
        );

    frame_content.render();
};
