/**
 * STARFIELD
 * ---------
 * https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/
 *
 * Things to improve:
 * - Window resize: currently a check is performed every 60 frames (~1s). If
 * the check shows that window is resized, a new starfield image is drawn. This
 * creates stuttering on window resize.
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

/** ********** STARFIELD ********** **/

function createStarfield(): HTMLImageElement[] {
    // A starfield is essentially an array of image-converted star layer canvases.
    const starfield = [];
    
    // TODO: create multiple star layers
    const starLayer1 = createStarLayer({
        width: window.innerWidth,
        height: window.innerHeight,
        starShadowBlur: 2,
        starShadowColour:'#BDBDBD',
        starColour: '#9E9E9E',

        // Density of stars depends on the window area
        starCount: Math.floor(((window.innerWidth / 100) * (window.innerHeight / 100)) / 2.0736),

        starRadiusMin: 1,
        starRadiusMax: 3,
    });
    starfield[0] = document.createElement('img');
    starfield[0].src = starLayer1.toDataURL();

    return starfield
}

/** ********** ANIMATION ********** **/

function animStep(mainCanvas: HTMLCanvasElement, mainCtx: CanvasRenderingContext2D,
                  starfield: HTMLImageElement[],
                  curOffset: number, offsetStep: number,
                  vpSizeCheckInterval: number,
                  viewportSize: {
                      width: number,
                      height: number
                  }) {
    const newOffset = curOffset + offsetStep > mainCanvas.width ? 0 : curOffset + offsetStep;

    // Need to create a new starfield if window is resized
    // Check viewport size every X frames
    let newVpSizeInterval, newStarfield, newViewportSize;
    if (vpSizeCheckInterval === 60) {
        newViewportSize = {
            width: window.innerWidth,
            height: window.innerHeight,
        };

        // If viewport size changed, draw a new starfield
        newStarfield = viewportSize.width !== newViewportSize.width || viewportSize.height !== newViewportSize.height ?
                       createStarfield() :
                       starfield;

        newVpSizeInterval = 0;
    } else {
        newViewportSize = viewportSize;
        newStarfield = starfield;
        newVpSizeInterval = vpSizeCheckInterval + 1;
    }

    // Clear and redraw the canvas with position-updated, viewport size-adjusted starfield images
    mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
    for (let i = 0; i < newStarfield.length; i++) {
        mainCtx.drawImage(newStarfield[0], newOffset, 0);
        mainCtx.drawImage(newStarfield[0], newOffset - mainCanvas.width, 0);
    }

    // Call next frame
    window.requestAnimationFrame(() => {
        animStep(mainCanvas, mainCtx, newStarfield, newOffset, offsetStep,
                 newVpSizeInterval, newViewportSize);
    });
}

/** ********** REACT COMPONENT ********** **/

type StarfieldStateTypes = {
    viewportSize: {
        width: number,
        height: number,
    };
}

export default class Starfield extends React.PureComponent<{}, StarfieldStateTypes> {
    mainCanvas: ?HTMLCanvasElement;

    constructor(props: {}) {
        super(props);

        this.state = {
            // Our canvas needs window's width and height information so it can resize itself when window resizes.
            viewportSize: {
                width: window.innerWidth,
                height: window.innerHeight,
            },
        };

        window.onresize = this.handleWindowResize;
    }

    /** ***** LIFECYCLE METHODS ***** **/

    componentDidMount = () => {
        const {viewportSize} = this.state;

        // Canvas is mounted. Start the animation.
        const starfield = createStarfield();
        window.requestAnimationFrame(() => {
            if (this.mainCanvas) {
                animStep(this.mainCanvas, this.mainCanvas.getContext('2d'), starfield, 0, 3,
                         0, viewportSize);
            }
        });
    };

    componentWillUnmount = () => {
        window.removeEventListener('resize', this.handleWindowResize);
    };

    /** ***** EVENT HANDLERS ***** **/

    handleWindowResize = () => {
        // Update window's width and height information so the canvas can resize along.
        this.setState({
            viewportSize: {
                width: window.innerWidth,
                height: window.innerHeight,
            },
        });
    };

    /** ***** RENDER ***** **/

    render() {
        const {viewportSize} = this.state;

        return (
            <canvas ref={canvas => {this.mainCanvas = canvas}}
                    width={viewportSize.width} height={viewportSize.height}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                    }}/>
        )
    }
}
