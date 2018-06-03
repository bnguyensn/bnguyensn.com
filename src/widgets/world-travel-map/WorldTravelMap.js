// @flow
'use strict';

import React, {Component, PureComponent} from 'react';
import type {Node} from 'react';

import worldMapData from './img/world2';

import './world-travel-map.css';

/** UTILITIES **/

function isInRange(n: number, min: number, max: number): boolean {
    return n >= min && n <= max
}

function forceInRange(n: number, min: number, max: number): number {
    return n < min ? min : n > max ? max : n
}

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
}


/**
 * Subtract obj2 from obj1.
 * Return a copy of obj1 but with subtracted number properties
 * @param {Object} obj1 - Any object
 * @param {Object} obj2 - Any object
 * @return {Object}
 */
function objSubtract(obj1: {}, obj2: {}): {} {
    let objR = {};
    for (const key in obj1) {
        if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
            isNumber(obj1[key]) && isNumber(obj2[key]) ?
                objR[key] = parseFloat(obj1[key]) - parseFloat(obj2[key]) :
                objR[key] = obj1[key];
        }
    }
    return objR
}

/** DOM UTILITIES **/

/**
 * @param {HTMLElement | DOMRect | ClientRect} element - If HTMLElement is passed, a getBoundingClientRect() is performed first
 * @return {Array} - [x, y] array that represents the passed element's center coordinates relative to the viewport
 * */
function getCenterCoords(element: HTMLElement | DOMRect | ClientRect): {x: number, y: number} {
    if (element instanceof HTMLElement) {
        const elRect = element.getBoundingClientRect();
        return {x: elRect.left + elRect.width / 2, y: elRect.top + elRect.height / 2}
    } else if (element instanceof DOMRect || element instanceof ClientRect) {
        return {x: element.left + element.width / 2, y: element.top + element.height / 2}
    }
    throw new TypeError('Passed variable is not an HTMLElement or a DOMRect');
}

/** REACT COMPONENT **/

type WorldTravelMapState = {
    mouseDown: boolean,
    mouseX: number,
    mouseY: number,
    mapPosX: number,
    mapPosY: number,
    scaleAmtCur: number,
    mapW: number,
    mapH: number,
    mapViewBoxX: number,
    mapViewBoxY: number,
    mapXYAspectRatio: number,
    boundaryRect: DOMRect | ClientRect,
    mapRect: DOMRect | ClientRect
}

class WorldTravelMap extends Component<{}, WorldTravelMapState> {
    countryIds: string[];
    countryPathElements: Node;
    containerElId: string;
    mapElId: string;
    zoomData: {
        scaleAmt: number, scaleAmtMin: number, scaleAmtMax: number,
        amtX: number, amtY: number, maxAmtX: number, maxAmtY: number, minAmtX: number, minAmtY: number,
    };

    constructor() {
        super();
        this.countryIds = Object.keys(worldMapData);
        this.countryPathElements = this.countryIds.map((countryId) =>
            <path key={countryId} d={worldMapData[countryId].d} fill={'#81C784'} />
        );
        this.containerElId = 'world-travel-map';
        this.mapElId = 'world-travel-map-map';
        this.zoomData = {
            scaleAmt: .1,
            scaleAmtMax: 3,  // Max zoom = 3x
            scaleAmtMin: 1,  // Min zoom = 1x

            // TODO: delete the below (and change type definition)
            amtX: 100,
            amtY: 50,
            // A bit counter intuitive here, but the larger the number, the smaller the svg image
            maxAmtX: 2000,
            maxAmtY: 1000,
            minAmtX: 800,
            minAmtY: 400
        };
        this.state = {
            mouseDown: false,
            scrollUpdate: false,
            mouseX: 0,
            mouseY: 0,
            mapPosX: 0,
            mapPosY: 0,
            scaleAmtCur: 1,
            mapW: 0,
            mapH: 0,
            mapViewBoxX: 2000,
            mapViewBoxY: 1000,
            mapXYAspectRatio: 2,  // X:Y
            boundaryRect: new DOMRect(0, 0, 0, 0),
            mapRect: new DOMRect(0, 0, 0, 0)
        };

        // Window events
        window.onresize = this.handleWindowResize;
    }

    /** REACT LIFECYCLE METHODS **/

    componentDidMount = () => {
        // Record the initial boundary rect. This triggers an extra render. No other alternatives for now.
        const boundaryRect = this.getBoundaryRect();
        if (boundaryRect) {
            const newMapW = boundaryRect.width;
            const newMapH = newMapW / this.state.mapXYAspectRatio;
            const newMapPosY = (boundaryRect.height - newMapH) / 2;
            this.setState((prevState: WorldTravelMapState, props: {}) => {
                return {
                    mapW: newMapW,
                    mapH: newMapH,
                    mapPosY: newMapPosY,
                    boundaryRect: boundaryRect
                }
            });
        }
    };

    /** BOUNDING AREA METHODS **/

    getBoundaryRect = (): ?DOMRect | ?ClientRect => {
        const containerEl = document.getElementById(this.containerElId);
        if (containerEl) {
            return containerEl.getBoundingClientRect();
        }
        return null
    };

    getMapRect = (): ?DOMRect | ?ClientRect => {
        const mapEL = document.getElementById(this.mapElId);
        if (mapEL) {
            return mapEL.getBoundingClientRect();
        }
        return null
    };

/*
    checkBoundingArea = (container: ?HTMLElement, child: ?HTMLElement): boolean => {
        if (container && child) {
            const containerR = container.getBoundingClientRect();
            const childR = child.getBoundingClientRect();
            const limit = window.getComputedStyle(container, 'padding-top');  // Assuming container has equal padding

            // Inner distance between container rect and child rect must not be higher than 0 for all sides
            console.log(`containerR.top: ${containerR.top}; childR.top: ${childR.top}`);
            return containerR.top - childR.top >= -limit &&
                containerR.left - childR.left >= -limit &&
                containerR.right - childR.right >= -limit &&
                containerR.bottom - childR.bottom >= -limit
        }
        console.log('neither container nor child exists');
        return false
    };

    snapToBoundary = (containerEl: HTMLElement, childEl: HTMLElement): ElementRect => {
        if (containerEl && childEl) {
            const containerRect = containerEl.getBoundingClientRect();
            const childRect = childEl.getBoundingClientRect();
            const offsetRect = objSubtract(containerRect, childRect);
            let newMapPosX = 0;
            let newMapPosY = 0;

            // Snap X axis
            if (offsetRect.right > 0) {
                newMapPosX = this.state.mapPosX + offsetRect.right;
            } else if (offsetRect.left < 0) {
                newMapPosX = this.state.mapPosX + offsetRect.left;
            }

            // Snap Y axis
            if (offsetRect.top < 0) {
                newMapPosY = this.state.mapPosY + offsetRect.top;
            } else if (offsetRect.bottom > 0) {
                newMapPosY = this.state.mapPosY + offsetRect.bottom;
            }

            this.setState({
                mapPosX: newMapPosX,
                mapPosY: newMapPosY
            });
        }
    };
*/

    /** MOUSE EVENT METHODS **/

    handleUserClick = (e: SyntheticMouseEvent<HTMLElement>) => {

    };

    handleUserDragStart = (e: SyntheticMouseEvent<HTMLElement>): boolean => {
        // Prevent default dragging behaviour.
        // Note that setting the draggable attribute to false does not work in older browsers.
        e.preventDefault();
        return false
    };

    handleUserMouseEnter = () => {

    };

    handleUserMouseLeave = () => {
        this.setState({
            mouseDown: false
        });
    };

    handleUserMouseDown = (e: SyntheticMouseEvent<HTMLElement>) => {
        this.setState({
            mouseDown: true,
            mouseX: e.clientX,
            mouseY: e.clientY,
        });

    };

    handleUserMouseUp = (e: SyntheticMouseEvent<HTMLElement>) => {
        this.setState({
            mouseDown: false,
            mouseX: e.clientX,
            mouseY: e.clientY,
        });
    };

    // TODO: Fix pan
    handleUserMouseMove = (e: SyntheticMouseEvent<HTMLElement>) => {
        e.persist();  // Needed for React's Synthetic Events to fire continuously

        const newState = {};
        newState.mouseX = e.clientX;
        newState.mouseY = e.clientY;
        if (this.state.mouseDown) {
            // Pan the map, but only within limit
            // const newMapPosX = this.state.mapPosX + (e.clientX - this.state.mouseX);
            // const newMapPosY = this.state.mapPosY + (e.clientY - this.state.mouseY);
        }
        this.setState(newState);
    };

    /**
     * Zoom in / zoom out on scroll via changing the map's width & height
     * */
    handleUserWheel = (e: SyntheticWheelEvent<HTMLElement>) => {
        e.preventDefault();
        e.persist();  // Needed for React's Synthetic Events to fire continuously

        const currentMapRect = this.getMapRect();
        if (currentMapRect) {
            const d = Math.sign(e.deltaY);  // Direction: negative = scrolled up (i.e. zooming in)
            const newMapW = forceInRange(this.state.mapW * (1 - this.zoomData.scaleAmt * d), this.state.boundaryRect.width * this.zoomData.scaleAmtMin, this.state.boundaryRect.width * this.zoomData.scaleAmtMax);
            const mapGrowthW = newMapW - this.state.mapW;
            if (mapGrowthW !== 0) {
                // New dimensions are within limit
                const newMapH = newMapW / this.state.mapXYAspectRatio;
                const newScaleAmtCur = this.state.scaleAmtCur - d * this.zoomData.scaleAmt;

                // Adjustment so that the map expands from user's mouse position
                // If left as default, width will grow from center, while height will grow from bottom
                const mapCenter = getCenterCoords(currentMapRect);
                const mDistFromCenter = this.state.mouseX - mapCenter.x;

                // Adjust the x-axis
                const offsetAdjX = - (mapGrowthW / 2) * (mDistFromCenter / (this.state.mapW / 2));
                const newMapPosX = (mDistFromCenter) >= 0 ?
                    forceInRange(this.state.mapPosX + offsetAdjX, this.state.boundaryRect.width - newMapW, 0) :
                    forceInRange(this.state.mapPosX + offsetAdjX, 0, newMapW - this.state.boundaryRect.width);

                // TODO: Adjust the y-axis
                // const dFromCenterY = (this.state.mouseY - mapCenter[1]) / (this.state.mapH / 2);  // As %
                // const offsetAdjXLimit = this.state.boundaryRect.width
                // const offsetAdjY = (mapGrowthH / 2) * (dFromCenterY + .5);

                this.setState((prevState: WorldTravelMapState, props: {}): {} => {
                    return {
                        scaleAmtCur: newScaleAmtCur,
                        mapW: newMapW,
                        mapH: newMapH,
                        mapPosX: newMapPosX,
                        // mapPosY: prevState.mapPosY + offsetAdjY
                    }
                });
            }
        }

        // console.log(`newMapW: ${newMapW}; newMapH: ${newMapH}`);
        // console.log(`boundaryRect width: ${this.state.boundaryRect.width}; boundaryRect height: ${this.state.boundaryRect.height}`);
    };

    /** WINDOW EVENTS METHODS **/

    /**
     * A window resize will change the boundary size, as well as the map size
     * */
    handleWindowResize = (e: Event) => {
        // Change map size with boundary. Map growth is dependant on boundary's width because the map is wide
        const boundaryRect = this.getBoundaryRect();
        if (boundaryRect) {
            const newMapW = boundaryRect.width * this.state.scaleAmtCur;
            const newMapH = newMapW / this.state.mapXYAspectRatio;
            this.setState((prevState: WorldTravelMapState, props: {}) => {
                return {
                    mapW: newMapW,
                    mapH: newMapH,
                    mapPosY: prevState.mapPosY - ((newMapH - prevState.mapH) / 2) + ((boundaryRect.height - prevState.boundaryRect.height) / 2),  // Re-center
                    boundaryRect: boundaryRect
                }
            });
        }
    };

    /** RENDER **/

    render() {
        const testStr = this.state.mapRect ? `T: ${this.state.mapRect.top}; R: ${this.state.mapRect.right}; B: ${this.state.mapRect.bottom}; L: ${this.state.mapRect.left};
         mouseX: ${this.state.mouseX}; mouseY: ${this.state.mouseY}` : ``;

        return (
            <div style={{backgroundColor: '#552122'}}>
                <div id='world-travel-map'>
                    <div id='world-travel-map-test'>
                        {testStr}
                    </div>
                    <svg id='world-travel-map-map'
                         role="img" xmlns="http://www.w3.org/2000/svg"
                         viewBox={`0 0 ${this.state.mapViewBoxX} ${this.state.mapViewBoxY}`}
                         style={{
                             width: `${this.state.mapW}px`, height: `${this.state.mapH}px`,
                             transform: `translate(${this.state.mapPosX}px, ${this.state.mapPosY}px)`
                         }}
                         onDragStart={this.handleUserDragStart}
                         onMouseEnter={this.handleUserMouseEnter} onMouseLeave={this.handleUserMouseLeave}
                         onMouseDown={this.handleUserMouseDown} onMouseUp={this.handleUserMouseUp}
                         onMouseMove={this.handleUserMouseMove}
                         onWheel={this.handleUserWheel}
                         onClick={this.handleUserClick}>
                        {this.countryPathElements}
                    </svg>
                </div>
            </div>

        )
    }
}

export default WorldTravelMap