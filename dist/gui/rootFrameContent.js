import directionIcon from "./assets/directionIcon";
import elements from "./elements";
import j2h from "./j2h";
export const set_root_frame_content = () => {
    let frame_content = j2h.setRoot(elements.frame_content());
    frame_content
        .append(
            j2h.element("img", {
                id: "compass-logo",
                src: "./assets/compass-logo.png",
                alt: "Compass Logo",
            })
        )
        .append(j2h.element("p", { id: "greetings" }, "Compass by KP"))
        .append(
            j2h.element("div", { class: "feature" }, [
                j2h.element("div", { class: "feature-icon" }, directionIcon),
                j2h.element("div", { class: "feature-content" }, [
                    j2h.element("div", { class: "feature-title" }, "Navigate"),
                    j2h.element(
                        "div",
                        { class: "feature-description" },
                        "GPS-based compass for navigation and direction finding."
                    ),
                ]),
            ])
        )
        .append(
            j2h.element("div", { class: "feature" }, [
                j2h.element(
                    "div",
                    { class: "feature-icon" },
                    j2h.element("img", {
                        src: "https://avatars.githubusercontent.com/u/82671701",
                        alt: "KP",
                    })
                ),
                j2h.element("div", { class: "feature-content" }, [
                    j2h.element(
                        "div",
                        { class: "feature-title" },
                        `<a href="https://github.com/patelka2211">Developer</a>`
                    ),
                    j2h.element(
                        "div",
                        { class: "feature-description" },
                        `<a href="https://github.com/patelka2211">Developed in India with ❤️ by <strong>KP</strong></a>`
                    ),
                ]),
            ])
        )
        .append(
            j2h.element(
                "div",
                {
                    id: "share-n-feedback",
                },
                [
                    j2h.element(
                        "div",
                        {
                            id: "sharer-btn",
                            onclick:
                                "try { Sharer.open(); } catch { alert('It appears that the Sharer module has not been fully loaded at this time.'); }",
                        },
                        "Share this page"
                    ),
                    j2h.element("div", { class: "separator" }, "•"),
                    j2h.element(
                        "div",
                        {
                            id: "feedback-btn",
                        },
                        "Give feedback"
                    ),
                ]
            )
        );
    frame_content.render();
};
