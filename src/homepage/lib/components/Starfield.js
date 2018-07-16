/**
 * STARFIELD
 * ---------
 * https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/
  * */

// @flow

import * as React from 'react';

import getRandNumBtw from '../utils/getRandNumBtw';

type StarType = {
    context: CanvasRenderingContext2D,
    posX: number,
    posY: number,
    radius: number,
    colour?: string,
};

function drawStar(starInfo: StarType) {
    const {context, posX, posY, radius, colour} = starInfo;

    // Draw the star
    context.beginPath();
    context.arc(posX, posY, radius, 0, 6.28319, true);

    // Fill the star with custom colour if provided, else use context's colour
    // Also should reset back to the original context's colour after using the custom colour
    const ogContextColour = context.fillStyle;
    if (colour) { context.fillStyle = colour; }
    context.fill();
    if (colour) { context.fillStyle = ogContextColour; }
}

function createStarLayer(width: number, height: number,
                         starShadowBlur: number, starShadowColour: string, starColour: string,
                         starCount: number, starRadiusMin: number, starRadiusMax: number): HTMLCanvasElement {
    // Initialise the star layer
    const starCanvas = document.createElement('canvas');
    starCanvas.width = width;
    starCanvas.height = height;
    const starCanvasCtx = starCanvas.getContext('2d');

    starCanvasCtx.shadowBlur = starShadowBlur;
    starCanvasCtx.shadowColor = starShadowColour;
    starCanvasCtx.fillStyle = starColour;

    // Draw stars
    let i = starCount;
    while (i > 0) {
        drawStar({
            context: starCanvasCtx,
            posX: Math.floor(getRandNumBtw(0, width)),
            posY: Math.floor(getRandNumBtw(0, height)),
            radius: Math.floor(getRandNumBtw(starRadiusMin, starRadiusMax))
        });
        i -= 1;
    }

    return starCanvas
}

function createStarField() {
    const starLayer1 = createStarLayer(2000, 2000, 2, '#BDBDBD', '#9E9E9E', 100, 3, 5);

}

export default function Starfield() {
    return (
        <div>
            A
        </div>
    )
}
