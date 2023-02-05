import directionIcon from "./assets/directionIcon";
import elements from "./elements";
import j2h from "./j2h";
export const set_root_frame_content = () => {
    let frame_content = j2h.setRoot(elements.frame_content());
    frame_content
        .append(j2h.element("img", {
        id: "compass-logo",
        src: "./assets/compass-logo.png",
        alt: "Compass Logo",
    }))
        .append(j2h.element("p", { id: "greetings" }, "Welcome to Compass"))
        .append(j2h.element("div", { class: "feature" }, [
        j2h.element("div", { class: "feature-icon" }, directionIcon),
        j2h.element("div", { class: "feature-content" }, [
            j2h.element("div", { class: "feature-title" }, "Direction"),
            j2h.element("div", { class: "feature-description" }, "Measure direction using GPS."),
        ]),
    ]))
        .append(j2h.element("div", { class: "feature" }, [
        j2h.element("div", { class: "feature-icon" }, j2h.element("img", {
            src: "https://avatars.githubusercontent.com/u/82671701",
            alt: "KP",
        })),
        j2h.element("div", { class: "feature-content" }, [
            j2h.element("div", { class: "feature-title" }, `<a href="https://github.com/patelka2211">Developer</a>`),
            j2h.element("div", { class: "feature-description" }, `<a href="https://github.com/patelka2211">Developed in India with ❤️ by <strong>KP</strong></a>`),
        ]),
    ]));
    frame_content.render();
};
