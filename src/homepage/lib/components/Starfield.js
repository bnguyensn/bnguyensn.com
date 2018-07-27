/**
 * STARFIELD
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
import shallowCompareObj from '../utils/shallowCompareObj';

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

function createStarfield(layerCount: number, parentInfo: ParentType): StarfieldType {
    // A starfield is essentially an array of star layer objects
    // Each star layer object contains an image-converted star layer canvas and
    // information on its speed and offset
    const starfield = [];

    for (let i = 0; i < layerCount; i++) {
        const brightness = 120 + 40 * i;
        const radiusMin = 0.5 + i;
        const radiusMax = 1.5 + i;
        const speed = 0.1 + 0.2 * i;

        const starLayerCanvas = createStarLayerCanvas({
            width: parentInfo.width,
            height: parentInfo.height,
            starColour: `rgb(${brightness}, ${brightness}, ${brightness})`,

            // Density of stars depends on the window area
            starCount: Math.floor(((parentInfo.width / 100) * (parentInfo.height / 100)) / 2.0736),

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

/** ********** ANIMATION ********** **/

type CanvasType = {
    canvasEl: ?HTMLCanvasElement,
    canvasCtx: ?CanvasRenderingContext2D,
};

function animStep(canvasInfo: CanvasType, parentInfo: ParentType, parentInfoCopy: ParentType,
                  starfield: StarfieldType, resizeCheckItv: number) {




    // Check if parentEl had been resized every X frames
    let newStarfield, newResizeCheckInt, newParentInfoCopy;
    if (resizeCheckItv === 60 && !shallowCompareObj(parentInfo, parentInfoCopy)) {

        // parentEl had been resized - create new fitting starfield
        newStarfield = createStarfield(3, parentInfo);

        newResizeCheckInt = 0;
        newParentInfoCopy = Object.assign({}, parentInfo);
    } else {

        // Nothing changed
        newStarfield = starfield;
        newParentInfoCopy = parentInfoCopy;
        newResizeCheckInt = resizeCheckItv + 1;
    }

    // Clear and redraw the canvas with position-updated, viewport size-adjusted starfield images
    canvasInfo.canvasCtx.clearRect(0, 0, canvasInfo.canvasEl.width, canvasInfo.canvasEl.height);
    for (let i = 0; i < newStarfield.length; i++) {
        newStarfield[i].starLayerOffset = newStarfield[i].starLayerOffset + newStarfield[i].starLayerSpd >
                                          canvasInfo.canvasEl.width ?
                                          0 :
                                          newStarfield[i].starLayerOffset + newStarfield[i].starLayerSpd;
        canvasInfo.canvasCtx.drawImage(newStarfield[i].starLayer,
                                       newStarfield[i].starLayerOffset, 0);
        canvasInfo.canvasCtx.drawImage(newStarfield[i].starLayer,
                                       newStarfield[i].starLayerOffset - canvasInfo.canvasEl.width, 0);
    }

    // Call next frame
    window.requestAnimationFrame(() => {
        animStep(canvasInfo, parentInfo, newParentInfoCopy, newStarfield, newResizeCheckInt);
    });
}

/** ********** REACT COMPONENT ********** **/

type StarfieldPropTypes = {
    fullscreen: boolean,
};

type StarfieldStateTypes = {
    parentInfo: ParentType,
};

export default class Starfield extends React.PureComponent<StarfieldPropTypes, StarfieldStateTypes> {
    mainCanvas: ?HTMLCanvasElement;

    constructor(props: StarfieldPropTypes) {
        super(props);

        // If <Starfield /> is fullscreen, can save an extra setState() call in componentDidMount()
        // by determining the parentEl of <Starfield /> to be window right here
        const parentNode = props.fullscreen ? window : null;

        this.state = {
            parentInfo: {
                el: parentNode,

                // Our canvas needs parentEl's width and height information so it can resize itself when window resizes.
                // Can determine this here only if <Starfield /> is fullscreen
                width: parentNode ? parentNode.innerWidth : 0,
                height: parentNode ? parentNode.innerWidth : 0,
            },
        };
    }

    /** ***** LIFECYCLE METHODS ***** **/

    componentDidMount = () => {
        const {fullscreen} = this.props;

        if (this.mainCanvas) {

            // Determine canvas information
            const canvasInfo = {
                canvasEl: this.mainCanvas,
                canvasCtx: this.this.mainCanvas.getContext('2d'),
            };

            // Determine <Starfield />'s parentEl's dimensions
            let parentInfo;
            if (!fullscreen) {
                // If <Starfield /> is not fullscreen, we have to determine the parentEl of <Starfield />
                // and its dimensions here after the DOM tree finished initialising
                const el = this.mainCanvas.parentNode ? this.mainCanvas.parentNode : window;
                const width = el === window ? el.innerWidth : el.scrollWidth;
                const height = el === window ? el.innerHeight : el.scrollHeight;
                parentInfo = {
                    el,
                    width,
                    height
                };

                // Update state. Note that this action is async
                this.setState({
                    parentInfo,
                });
            } else {
                // If <Starfield /> is fullscreen, we don't need to do anything because <Starfield />'s parentEl's
                // dimensions have already been determined in the constructor
                ({parentInfo} = this.state);
            }

            // Canvas is mounted. Parent dimensions are known.
            // Let's create the starfield and start the animation.
            const starfield = createStarfield(3, parentInfo);

            // Need a copy of parentInfo to check for resizing
            const parentInfoCopy = Object.assign({}, parentInfo);
            window.requestAnimationFrame(() => {
                animStep(canvasInfo, parentInfo, parentInfoCopy, starfield, 0);
            });

            // Register resize events
            window.onresize = this.handleParentElResize;
            // TODO: Add event listener for when parentEl resize
        }
    };

    componentWillUnmount = () => {
        window.removeEventListener('resize', this.handleParentElResize);
        // TODO: Add event listener remover for when parentEl resize
    };

    /** ***** REACT REFS ***** **/

    setRef = (el: ?HTMLCanvasElement): string  => {
        this.mainCanvas = el;
    };

    /** ***** EVENT HANDLERS ***** **/

    handleParentElResize = () => {
        const {parentInfo} = this.state;

        // Check in case in the early stage of the component, parentEl might be null
        if (parentInfo.el) {
            // Update canvas dimension information.
            this.setState((prevState: StarfieldStateTypes, props: StarfieldPropTypes): {} => ({
                parentInfo: {
                    width: prevState.parentInfo.el === window ? prevState.parentInfo.el.innerWidth : prevState.parentInfo.el.scrollWidth,
                    height: prevState.parentInfo.el === window ? prevState.parentInfo.el.innerHeight : prevState.parentInfo.el.scrollHeight,
                },
            }));
        }
    };

    handleParentElChange = () => {
        // TODO: Update parentEl and its dimensions when parentEl changes here
    };

    /** ***** RENDER ***** **/

    render() {
        const {parentInfo} = this.state;

        return (
            <canvas ref={this.setRef}
                    width={parentInfo.width} height={parentInfo.height}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                    }} />
        )
    }
}
