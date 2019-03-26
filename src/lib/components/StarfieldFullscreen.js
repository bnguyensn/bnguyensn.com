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

/** ********** CONFIG ********** **/

const LAYER_COUNT = 2;  // Number of star layers. Each layer gives larger and faster stars than the last.

/** ********** STAR ********** **/

type StarType = {
    context: CanvasRenderingContext2D,
    posX: number,
    posY: number,
    radius: number,
};

function drawStar(starInfo: StarType) {
    const {context, posX, posY, radius} = starInfo;

    // Draw the star
    context.beginPath();
    context.arc(posX, posY, radius, 0, 6.28319, true);
    context.fill();
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

type StarfieldListType = {
    curStarfield: StarfieldType,
    termStarfield: ?StarfieldType,
}

type CanvasInfoType = {
    canvasW: number,
    canvasH: number,
    canvasCtx: ?CanvasRenderingContext2D,
};

type StarfieldStateTypes = {
    canvasInfo: {
        canvasW: number,
        canvasH: number,
    },
};

export default class StarfieldFullscreen extends React.PureComponent<{}, StarfieldStateTypes> {
    mainCanvas: ?HTMLCanvasElement;
    resizing: boolean;  // This is true if window is still being resized during the resize throttle duration
    resizeThrottleTimer: number;  // A countdown that starts / resets when window is resized

    constructor(props: {}) {
        super(props);
        this.resizeThrottleTimer = 6;
        this.resizing = false;
        this.state = {
            canvasInfo: {
                canvasW: window.innerWidth,
                canvasH: window.innerHeight,
            },
        };
    }

    /** ***** LIFECYCLE METHODS ***** **/

    componentDidMount = () => {
        const canvasInfo = this.getCanvasInfo();

        if (this.canvasHasSize(canvasInfo)) {
            const {canvasW, canvasH, canvasCtx} = canvasInfo;

            // Create the starfield for the first time
            const starfieldList = {};
            starfieldList.curStarfield = createStarfield(LAYER_COUNT, canvasW, canvasH);
            for (let i = 0; i < starfieldList.curStarfield.length; i++) {
                if (canvasCtx) {
                    canvasCtx.drawImage(starfieldList.curStarfield[i].starLayer, starfieldList.curStarfield[i].starLayerOffset, 0);
                }
            }
            starfieldList.termStarfield = null;

            // Start the animation
            window.requestAnimationFrame(() => {this.animStep({canvasW, canvasH, canvasCtx}, starfieldList, -1);});
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
        this.resizing = true;
        this.resizeThrottleTimer = 6;
        this.setState({
            canvasInfo: {
                canvasW: window.innerWidth,
                canvasH: window.innerHeight,
            },
        });
    };

    /** ***** ANIMATION ***** **/

    getCanvasInfo = (): CanvasInfoType => ({
            canvasW: this.mainCanvas ? this.mainCanvas.width : 0,
            canvasH: this.mainCanvas ? this.mainCanvas.height : 0,
            canvasCtx: this.mainCanvas ? this.mainCanvas.getContext('2d') : null,
    });

    canvasHasSize = (canvasInfo: CanvasInfoType): boolean => (
        canvasInfo.canvasW !== 0 && canvasInfo.canvasH !== 0 && !!canvasInfo.canvasCtx
    );

    canvasSizeEqual = (canvasInfoA: CanvasInfoType, canvasInfoB: CanvasInfoType): boolean => (
        canvasInfoA.canvasW === canvasInfoB.canvasW &&
        canvasInfoA.canvasH === canvasInfoB.canvasH
    );

    moveStarfield = (canvasInfo: CanvasInfoType, starfield: StarfieldType, opacity?: number = -1) => {
        const {canvasW, canvasCtx} = canvasInfo;

        // Set opacity, if specified
        if (opacity < 0 && opacity > 1 && canvasCtx) {
            canvasCtx.globalAlpha = opacity;
        }

        // Move the starfield via modifying its properties and re-drawing it on the canvas
        // NOTE: currently moving left to right only
        for (let i = 0; i < starfield.length; i++) {
            starfield[i].starLayerOffset = starfield[i].starLayerOffset + starfield[i].starLayerSpd > canvasW ?
                                           0 : starfield[i].starLayerOffset + starfield[i].starLayerSpd;
            if (canvasCtx) {
                canvasCtx.drawImage(starfield[i].starLayer, starfield[i].starLayerOffset, 0);
            }
            if (canvasCtx) {
                canvasCtx.drawImage(starfield[i].starLayer, starfield[i].starLayerOffset - canvasW, 0);
            }
        }

        // Reset opacity, if needed
        if (opacity < 0 && opacity > 1 && canvasCtx) {
            canvasCtx.globalAlpha = 1;
        }
    };

    animStep = (canvasInfo: CanvasInfoType, starfieldList: StarfieldListType, termCountdown: number) => {
        const curCanvasInfo = this.getCanvasInfo();

        if (this.canvasHasSize(curCanvasInfo)) {
            const {canvasW: curCanvasW, canvasH: curCanvasH, canvasCtx: curCanvasCtx} = curCanvasInfo;
            let newCanvasInfo, newTermCountdown;

            if (curCanvasCtx) {
                curCanvasCtx.clearRect(0, 0, curCanvasW, curCanvasH);
            }

            if (termCountdown > 0) {

                // Canvas resize transition is still going on
                newCanvasInfo = canvasInfo;
                newTermCountdown = termCountdown - 1;
            } else if (termCountdown === 0) {

                // Last canvas resize transition frame
                starfieldList.termStarfield = null;
                newCanvasInfo = canvasInfo;
                newTermCountdown = -1;
                this.resizeThrottleTimer = 6;
            } else if (this.resizeThrottleTimer === 0) {
                if (!this.canvasSizeEqual(canvasInfo, curCanvasInfo)) {

                    // First canvas resize transition frame
                    starfieldList.termStarfield = starfieldList.curStarfield;
                    starfieldList.curStarfield = createStarfield(LAYER_COUNT, curCanvasW, curCanvasH);
                    newCanvasInfo = curCanvasInfo;
                    newTermCountdown = 3;
                } else {

                    // Normal animation
                    newCanvasInfo = canvasInfo;
                    newTermCountdown = termCountdown;
                }
                this.resizing = false;
            } else {

                // Normal animation
                newCanvasInfo = canvasInfo;
                newTermCountdown = termCountdown;
            }

            // Move starfields
            this.moveStarfield(newCanvasInfo, starfieldList.curStarfield);
            if (starfieldList.termStarfield) {
                this.moveStarfield(newCanvasInfo, starfieldList.termStarfield, termCountdown * .2);
            }

            // Call next frame
            if (this.resizing) {
                this.resizeThrottleTimer -= 1;
            }
            window.requestAnimationFrame(() => {this.animStep(newCanvasInfo, starfieldList, newTermCountdown)});
        }
    };

    /** ***** RENDER ***** **/

    render() {
        const {canvasInfo} = this.state;

        return (
            <canvas ref={this.setRef}
                    width={canvasInfo.canvasW} height={canvasInfo.canvasH}
                    style={{
                        position: 'fixed',
                        top: 0, left: 0,
                    }}
            />
        )
    }
}
