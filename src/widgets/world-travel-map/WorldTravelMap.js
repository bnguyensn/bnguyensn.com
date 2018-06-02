// @flow
'use strict';

import React, {Component, PureComponent} from 'react';
import type {Node} from 'react';

import worldMapData from './img/world2';

import './world-travel-map.css';

/** UTILITIES **/

function isInRange(n: number, min: number, max: number): boolean {
    return (n >= min && n <= max)
}

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
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

function getCenterCoords(element: HTMLElement): number[] {
    const elRect = element.getBoundingClientRect();
    return [elRect.left + elRect.width, elRect.top + elRect.height]
}

/** REACT COMPONENT **/

type WorldTravelMapState = {
    mouseDown: boolean,
    mouseX: number,
    mouseY: number,
    mapPosX: number,
    mapPosY: number,
    mapScale: number,
    mapW: number,
    mapH: number,
    mapViewBoxX: number,
    mapViewBoxY: number,
    boundaryRect: DOMRect
    mapRect: DOMRect
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
            mapW: 2000,
            mapH: 1000,
            mapViewBoxX: this.zoomData.maxAmtX,
            mapViewBoxY: this.zoomData.maxAmtY,
            boundaryRect: { top: 0, right: 0, bottom: 0, left: 0, x: 0, y: 0, width: 0, height: 0 },
            mapRect: { top: 0, right: 0, bottom: 0, left: 0, x: 0, y: 0, width: 0, height: 0 }
        };

        // Window events
        window.onresize = this.handleWindowResize;
    }

    /** REACT LIFECYCLE METHODS **/

    componentDidMount = () => {
        // Record the initial boundary rect. This triggers an extra render. No other alternatives for now.
        this.setState({
            boundaryRect: this.getBoundaryRect()
        })
    };

    /** BOUNDING AREA METHODS **/

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

    getBoundaryRect = (): ?{} => {
        return document.getElementById(this.containerElId).getBoundingClientRect();
    };

    getMapRect = (): ?{} => {
        return document.getElementById(this.mapElId).getBoundingClientRect();
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

        if (this.state.mouseDown) {
            // Pan the map, but only within limit
            const newMapPosX = this.state.mapPosX + (e.clientX - this.state.mouseX);
            const newMapPosY = this.state.mapPosY + (e.clientY - this.state.mouseY);
            if (true) {
                this.setState({
                    mouseX: e.clientX,
                    mouseY: e.clientY,
                    mapPosX: newMapPosX,
                    mapPosY: newMapPosY,
                    mapRect: this.getRect()
                });
            }
        }
    };

    /**
     * Zoom in / zoom out on scroll via changing the map's width & height
     * */
    handleUserWheel = (e: SyntheticWheelEvent<HTMLElement>) => {
        e.preventDefault();
        e.persist();  // Needed for React's Synthetic Events to fire continuously

        const d = Math.sign(e.deltaY);  // Direction: negative = scrolled up (i.e. zooming in)

        const newScaleAmtCur = this.state.scaleAmtCur - d * this.zoomData.scaleAmt;
        if (isInRange(newScaleAmtCur, this.zoomData.scaleAmtMin, this.zoomData.scaleAmtMax)) {
            // New scale is within allowed range
            const newMapW = this.state.mapW - (this.state.mapW * this.zoomData.scaleAmt * d);
            const newMapH = this.state.mapH - (this.state.mapH * this.zoomData.scaleAmt * d);

            this.setState((prevState: WorldTravelMapState, props: {}): {} => {


                // Snap map to boundary
                this.snapToBoundary(document.getElementById(this.containerElId), document.getElementById(this.mapElId));

                return {
                    mapW: prevState.mapW - (prevState.mapW * this.zoomData.scaleAmt * d),
                    mapH: prevState.mapH - (prevState.mapH * this.zoomData.scaleAmt * d),
                    scaleAmtCur: newScaleAmtCur,

                    mapRect: this.getRect(),

                    // TODO: this adjustment should be pro-rated with user's cursor to expand map from current center
                    mapPosY: prevState.mapPosY + (prevState.mapH * this.zoomData.scaleAmt * d) / 2  // This makes the map expand from its center
                }
            });
        }
    };

    /** WINDOW EVENTS METHODS **/

    /**
     * A window resize will change the boundary size
     * */
    handleWindowResize = (e: Event) => {
        e.persist();  // Needed for React's Synthetic Events to fire continuously

        // Change map size with boundary. Map growth is dependant on boundary's width because the map is wide
        const boundaryRect = this.getBoundaryRect();
        if (boundaryRect) {
            const mapGrowth = boundaryRect.width / this.state.boundaryRect.width;
            this.setState((prevState: WorldTravelMapState, props: {}) => {
                return {
                    mapW: prevState.mapW * mapGrowth,
                    mapH: prevState.mapH * mapGrowth,
                    mapPosY: prevState.mapPosY - prevState.mapH * (mapGrowth - 1) / 2,  // Re-center
                    boundaryRect: boundaryRect
                }
            });
        }
    };

    /** RENDER **/

    render() {
        const testStr = this.state.mapRect ? `T: ${this.state.mapRect.top}; R: ${this.state.mapRect.right}; B: ${this.state.mapRect.bottom}; L: ${this.state.mapRect.left}` : ``;

        return (
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
        )
    }
}

export default WorldTravelMap