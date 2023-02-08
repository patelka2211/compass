import elements from "./elements";
import j2h from "./j2h";
export const set_feedback_frame_content = () => {
    let frame_content = j2h.setRoot(elements.frame_content());
    frame_content.append(j2h.element("iframe", {
        id: "feedback-frame",
        src: "https://forms.gle/zccmjUY2tjzoaVRr5",
        frameborder: 0,
        marginheight: 0,
        marginwidth: 0,
    }, "Loading..."));
    frame_content.render();
};
