import { determineDirectionName } from "../calculateDirection";
import elements from "./elements";
let watching = false;
export const startWatching = () => (watching = true);
export const stopWatching = () => (watching = false);
export const isWatching = () => {
    return watching;
};
export const Angle = (angle) => {
    if (0 <= angle && angle < 360)
        return Number(angle.toFixed(0));
    throw Error(`Angle should be in range [0, 359], not ${angle}`);
};
const toggleColors = () => {
    [
        elements.direction_angle(),
        elements.compass_direction(),
        elements.compass_graphics(),
    ].forEach((element) => {
        element.classList.toggle("updating");
    });
};
const rotateGraphics = (angle) => {
    [
        elements.direction_n(),
        elements.direction_s(),
        elements.direction_e(),
        elements.direction_w(),
    ].forEach((element) => {
        element.style.transform = `rotate(${angle}deg)`;
    });
    [elements.compass_direction(), elements.compass_arcs()].forEach((element) => {
        element.style.transform = `rotate(-${angle}deg)`;
    });
};
export const rotateCompass = (newAngle, previousAngle, duration = 1) => {
    if (newAngle == previousAngle || !watching)
        return;
    toggleColors();
    let multiplier = 0, difference = Math.abs(newAngle - previousAngle);
    const fps = 60, frames = Number((duration * fps).toFixed(0)), miliseconds = duration * 1000;
    if (newAngle > previousAngle)
        multiplier = 1;
    else if (newAngle < previousAngle)
        multiplier = -1;
    if (difference > 180) {
        difference = 360 - difference;
        multiplier *= -1;
    }
    const d_f = (difference / frames) * multiplier;
    for (let index = 0; index < frames; index++)
        setTimeout(() => {
            if (!watching)
                return;
            previousAngle += d_f;
            if (previousAngle < 0)
                previousAngle += 360;
            else if (previousAngle >= 360)
                previousAngle %= 360;
            elements.direction_angle().innerHTML = ((angle) => {
                return `${angle}<sup>o</sup> ${determineDirectionName(Number(angle)).direction}`;
            })(previousAngle.toFixed(1));
            rotateGraphics(previousAngle.toFixed(1));
        }, index * (1000 / fps));
    setTimeout(() => {
        if (!watching)
            return;
        toggleColors();
    }, miliseconds - 200);
    setTimeout(() => {
        if (!watching)
            return;
        previousAngle = Number(previousAngle.toFixed(0));
        if (previousAngle < 0)
            previousAngle += 360;
        else if (previousAngle >= 360)
            previousAngle %= 360;
        elements.direction_angle().innerHTML = ((angle) => {
            return `${angle}<sup>o</sup> ${determineDirectionName(angle).direction}`;
        })(previousAngle);
        rotateGraphics(previousAngle);
    }, miliseconds);
};
