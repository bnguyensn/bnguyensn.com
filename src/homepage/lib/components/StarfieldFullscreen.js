/**
 * STARFIELD (FULLSCREEN)
 * ---------
 * https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/
 *
 * Things to improve:
 * - Window / parentEl resize: currently a check is performed every X frames. If
 * the check shows that window / parentEL has been resized, a new starfield
 * is drawn. An opacity animation is done to prevent stuttering.
 * */

// @flow

import * as React from 'react';

import getRandNumBtw from '../utils/getRandNumBtw';
import roundFloat from '../utils/roundFloat';

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
    if (colour) {
        context.fillStyle = colour;
    }
    context.fill();
    if (colour) {
        context.fillStyle = ogContextColour;
    }
}

/** ********** STAR LAYER CANVAS ********** **/

type StarLayerCanvasType = {
    width: number,
    height: number,
    starColour: string,
    starCount: number,
    starRadiusMin: number,
    starRadiusMax: number,
};

function createStarLayerCanvas(starLayerCanvasInfo: StarLayerCanvasType): HTMLCanvasElement {
    const {width, height, starColour, starCount, starRadiusMin, starRadiusMax}
        = starLayerCanvasInfo;

    // Initialise the star layer canvas
    const starLayerCanvas = document.createElement('canvas');
    starLayerCanvas.width = width;
    starLayerCanvas.height = height;
    const starCanvasCtx = starLayerCanvas.getContext('2d');

    starCanvasCtx.fillStyle = starColour;

    // Draw stars
    let i = starCount;
    while (i > 0) {
        drawStar({
            context: starCanvasCtx,
            posX: roundFloat(getRandNumBtw(0, width), 1),
            posY: roundFloat(getRandNumBtw(0, height), 1),
            radius: Math.floor(getRandNumBtw(starRadiusMin, starRadiusMax)),
        });
        i -= 1;
    }

    return starLayerCanvas
}

/** ********** STARFIELD ********** **/

type StarLayerType = {
    starLayer: HTMLImageElement,
    starLayerSpd: number,
    starLayerOffset: number,
};

type ParentType = {
    el: ?HTMLElement,
    width: number,
    height: number,
};

type StarfieldType = StarLayerType[];

function createStarfield(layerCount: number, canvasW: number, canvasH: number): StarfieldType {
    // A starfield is an array of star layer objects
    // Each star layer object contains an image-converted star layer canvas and
    // information on its speed and offset
    const starfield = [];

    for (let i = 0; i < layerCount; i++) {
        const brightness = 120 + 40 * i;
        const radiusMin = 0.5 + i;
        const radiusMax = 1.5 + i;
        const speed = 0.1 + 0.1 * i;

        const starLayerCanvas = createStarLayerCanvas({
            width: canvasW,
            height: canvasH,
            starColour: `rgb(${brightness}, ${brightness}, ${brightness})`,

            // Density of stars depends on the window area
            starCount: Math.floor(((canvasW / 100) * (canvasH / 100)) / 2.0736),

            starRadiusMin: radiusMin,
            starRadiusMax: radiusMax,
        });

        starfield[i] = {};

        starfield[i].starLayer = document.createElement('img');
        starfield[i].starLayer.src = starLayerCanvas.toDataURL();

        starfield[i].starLayerSpd = speed;

        starfield[i].starLayerOffset = 0;
    }

    return starfield
}

/** ********** REACT COMPONENT ********** **/

type CanvasType = {
    canvasW: number,
    canvasH: number,
};

type StarfieldStateTypes = {
    canvasInfo: CanvasType,
};

export default class StarfieldFullscreen extends React.PureComponent<{}, StarfieldStateTypes> {
    mainCanvas: ?HTMLCanvasElement;

    constructor(props: {}) {
        super(props);
        this.state = {
            canvasInfo: {
                canvasW: window.innerWidth,
                canvasH: window.innerHeight,
            },
        };
    }

    /** ***** LIFECYCLE METHODS ***** **/

    componentDidMount = () => {
        const canvasW = this.mainCanvas ? this.mainCanvas.width : 0;
        const canvasH = this.mainCanvas ? this.mainCanvas.height : 0;
        const canvasCtx = this.mainCanvas ? this.mainCanvas.getContext('2d') : null;

        if (canvasCtx && canvasW && canvasH) {
            console.log(`canvasW: ${canvasW}`);
            console.log(`canvasW: ${canvasH}`);

            const starfield = createStarfield(3, canvasW, canvasH);
            for (let i = 0; i < starfield.length; i++) {
                canvasCtx.drawImage(starfield[i].starLayer, starfield[i].starLayerOffset, 0);
            }
            window.requestAnimationFrame(() => {
                this.animStep({canvasW, canvasH}, starfield, 0);
            });
        }

        window.addEventListener('resize', this.handleCanvasResize);
    };

    componentWillUnmount = () => {
        window.removeEventListener('resize', this.handleCanvasResize);
    };

    /** ***** REACT REFS ***** **/

    setRef = (el: ?HTMLCanvasElement) => {
        this.mainCanvas = el;
    };

    /** ***** CANVAS RESIZE ***** **/

    handleCanvasResize = () => {
        this.setState({
            canvasInfo: {
                canvasW: window.innerWidth,
                canvasH: window.innerHeight,
            },
        });
    };

    /** ***** ANIMATION ***** **/

    animStep = (canvasInfo: CanvasType, starfield: StarfieldType, resizeCheckItv: number) => {
        const canvasW = this.mainCanvas ? this.mainCanvas.width : 0;
        const canvasH = this.mainCanvas ? this.mainCanvas.height : 0;
        const canvasCtx = this.mainCanvas ? this.mainCanvas.getContext('2d') : null;
        const parentNode = this.mainCanvas ? this.mainCanvas.parentNode : null;

        if (canvasCtx && canvasW && canvasH && parentNode) {
            if (resizeCheckItv === 1 && (canvasInfo.canvasW !== canvasW || canvasInfo.canvasH !== canvasH)) {

                console.log('Window resized, creating new starfield');

                // Create new starfield if canvas size changed every X frame
                const newStarfield = createStarfield(3, canvasW, canvasH);

                // Draw the new starfield. Only one needed because there is no movement yet
                for (let i = 0; i < newStarfield.length; i++) {
                    canvasCtx.drawImage(newStarfield[i].starLayer, newStarfield[i].starLayerOffset, 0);
                }

                // Reset the cycle
                window.requestAnimationFrame(() => {
                    this.animStep({canvasW, canvasH}, newStarfield, 0);
                });
            } else {

                // Move the starfield
                canvasCtx.clearRect(0, 0, canvasW, canvasH);
                for (let i = 0; i < starfield.length; i++) {
                    starfield[i].starLayerOffset = starfield[i].starLayerOffset + starfield[i].starLayerSpd > canvasW ?
                                                   0 : starfield[i].starLayerOffset + starfield[i].starLayerSpd;
                    canvasCtx.drawImage(starfield[i].starLayer,
                        starfield[i].starLayerOffset, 0);
                    canvasCtx.drawImage(starfield[i].starLayer,
                        starfield[i].starLayerOffset - canvasW, 0);
                }

                // Reset the cycle
                window.requestAnimationFrame(() => {
                    this.animStep({canvasW, canvasH}, starfield, resizeCheckItv + 1);
                });
            }
        }
    };

    /** ***** RENDER ***** **/

    render() {
        const {canvasInfo} = this.state;

        return (
            <canvas ref={this.setRef}
                    width={canvasInfo.canvasW} height={canvasInfo.canvasH}
                    style={{
                        position: 'absolute',
                        top: 0, left: 0,
                    }}
            />
        )
    }
}
