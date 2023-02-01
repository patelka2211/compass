"use strict";
const Angle = (angle) => {
    if (-1 < angle && angle < 360)
        return Number(angle.toFixed(0));
    throw Error(`Angle should be in range [0, 359], not ${angle}`);
};
const rotateCompass = (newAngle, previousAngle, duration = 0.5) => {
    if (newAngle == previousAngle)
        return;
    let multiplier = 0, difference = Math.abs(newAngle - previousAngle);
    const fps = 60, frames = Number((duration * fps).toFixed(0));
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
            previousAngle += d_f;
            if (previousAngle < 0)
                previousAngle += 360;
            else if (previousAngle >= 360)
                previousAngle %= 360;
            console.log(previousAngle.toFixed(1), index);
        }, index * (1000 / fps));
    setTimeout(() => {
        previousAngle = Number(previousAngle.toFixed(0));
        if (previousAngle < 0)
            previousAngle += 360;
        else if (previousAngle >= 360)
            previousAngle %= 360;
        console.log(previousAngle);
    }, duration * 1000 + 1);
};
let newAngle = Angle(10), previousAngle = Angle(340);
rotateCompass(newAngle, previousAngle);
