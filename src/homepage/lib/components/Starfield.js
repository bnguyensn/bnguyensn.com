/**
 * STARFIELD
 * ---------
 * https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/
  * */

// @flow

import * as React from 'react';

import getRandNumBtw from '../utils/getRandNumBtw';

/** ********** STAR ********** **/

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

type StarLayerType = {
    width: number,
    height: number,
    starShadowBlur: number,
    starShadowColour: string,
    starColour: string,
    starCount: number,
    starRadiusMin: number,
    starRadiusMax: number,
};

/** ********** STAR LAYER ********** **/

function createStarLayer(starLayerInfo: StarLayerType): HTMLCanvasElement {
    const {width, height, starShadowBlur, starShadowColour, starColour,
        starCount, starRadiusMin, starRadiusMax} = starLayerInfo;

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

/** ********** ANIMATION ********** **/

function animStep(mainCanvas: HTMLCanvasElement, mainCtx: CanvasRenderingContext2D,
                  starFields: HTMLImageElement[],
                  curOffset: number, offsetStep: number) {
    const newOffset = curOffset + offsetStep > mainCanvas.width ? 0 : curOffset + offsetStep;

    // Clear and redraw the canvas with position-updated starfield images
    mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
    for (let i = 0; i < starFields.length; i++) {
        mainCtx.drawImage(starFields[0], newOffset, 0);
        mainCtx.drawImage(starFields[0], newOffset - mainCanvas.width, 0);
    }

    // Call next frame
    window.requestAnimationFrame(() => {
        animStep(mainCanvas, mainCtx, starFields, newOffset, offsetStep);
    });
}

/** ********** REACT COMPONENT ********** **/

export default class Starfield extends React.PureComponent<{}> {
    starLayers: HTMLImageElement[];  // Contain image-converted star layers
    mainCanvas: ?HTMLCanvasElement;

    constructor(props: {}) {
        super(props);

        // Create a few star layers and convert them (as canvas elements) to image elements
        const starLayer1 = createStarLayer({
            width: 500,
            height: 500,
            starShadowBlur: 2,
            starShadowColour:'#BDBDBD',
            starColour: '#9E9E9E',
            starCount: 100,
            starRadiusMin: 1,
            starRadiusMax: 3,
        });
        this.starLayers = [];
        this.starLayers[0] = document.createElement('img');
        this.starLayers[0].src = starLayer1.toDataURL();
    }

    componentDidMount = () => {
        window.requestAnimationFrame(() => {
            if (this.mainCanvas) {
                animStep(this.mainCanvas, this.mainCanvas.getContext('2d'), this.starLayers, 0, 1);
            }
        });
    };

    render() {
        return (
            <canvas ref={canvas => {this.mainCanvas = canvas}}
                    width={500} height={500}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                    }}/>
        )
    }

}
