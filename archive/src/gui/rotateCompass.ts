import { determineDirectionName } from "../direction";
import elements from "./elements";

export const Angle = (angle: number): number => {
    if (0 <= angle && angle < 360) return Number(angle.toFixed(0));
    throw Error(`Angle should be in range [0, 359], not ${angle}`);
};

const rotateGraphics = (angle: number | string) => {
    (
        [
            elements.direction_n(),
            elements.direction_s(),
            elements.direction_e(),
            elements.direction_w(),
        ] as HTMLElement[]
    ).forEach((element) => {
        element.style.transform = `rotate(-${angle}deg)`;
    });

    (
        [elements.compass_direction(), elements.compass_arcs()] as HTMLElement[]
    ).forEach((element) => {
        element.style.transform = `rotate(${angle}deg)`;
    });
};

export const rotateCompass = (
    newAngle: number,
    previousAngle: number,
    duration = 1
) => {
    if (newAngle == previousAngle) return;
    let multiplier = 0,
        difference = Math.abs(newAngle - previousAngle);
    const fps = 60,
        frames = Number((duration * fps).toFixed(0));

    if (newAngle > previousAngle) multiplier = 1;
    else if (newAngle < previousAngle) multiplier = -1;

    if (difference > 180) {
        difference = 360 - difference;
        multiplier *= -1;
    }

    const d_f = (difference / frames) * multiplier;
    for (let index = 0; index < frames; index++)
        setTimeout(() => {
            previousAngle += d_f;
            if (previousAngle < 0) previousAngle += 360;
            else if (previousAngle >= 360) previousAngle %= 360;

            // console.log(previousAngle.toFixed(1), index);

            elements.direction_angle().innerHTML = ((angle) => {
                return `${angle}<sup>o</sup> ${
                    determineDirectionName(Number(angle)).direction
                }`;
            })(previousAngle.toFixed(0));

            rotateGraphics(previousAngle.toFixed(1));
        }, index * (1000 / fps));

    setTimeout(() => {
        previousAngle = Number(previousAngle.toFixed(0));
        if (previousAngle < 0) previousAngle += 360;
        else if (previousAngle >= 360) previousAngle %= 360;

        elements.direction_angle().innerHTML = ((angle) => {
            return `${angle}<sup>o</sup> ${
                determineDirectionName(angle).direction
            }`;
        })(previousAngle);

        rotateGraphics(previousAngle);
        // console.log(previousAngle);
    }, duration * 1000 + 1);
};

// let newAngle = Angle(10),
//     previousAngle = Angle(340);

// rotateCompass(newAngle, previousAngle);
