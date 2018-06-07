/**
 * WorldTravelMap.js
 * @bnguyensn
 * reserved DOM Element id: world-travel-map
 * */

// @flow
'use strict';

import React, {Component, PureComponent} from 'react';
import type {Node} from 'react';

import worldMapData from './img/world2';

import './world-travel-map.css';

/** UTILITIES **/

function forceInRange(n: number, min: number, max: number): number {
    return n < min ? min : n > max ? max : n
}

/** DOM UTILITIES **/

/**
 * Return an object with properties x and y corresponding to an Element's center coordinates relative to the viewport
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
    mapW: number,
    mapH: number,
    zoomLvl: number,
    mapXYAspectRatio: number,
    boundaryRect: DOMRect | ClientRect
}

class WorldTravelMap extends Component<{}, WorldTravelMapState> {
    // Map drawing properties
    countryIds: string[];
    countryPathElements: Node;

    // DOM properties
    containerElId: string;

    // Action properties
    zoomData: {
        zoomAmt: number,
        zoomAmtMin: number,
        zoomAmtMax: number,
    };

    constructor() {
        super();

        // This won't be needed if there is a way to resize the container and the map on window resize without calling getBoundingClientRect()
        this.containerElId = 'world-travel-map';

        // Create the map
        this.countryIds = Object.keys(worldMapData);
        this.countryPathElements = this.countryIds.map((countryId) =>
            <path key={countryId} d={worldMapData[countryId].d}
                  fill={'#E0E0E0'} stroke={'#212121'} />
        );

        // Set up zoom data
        this.zoomData = {
            zoomAmt: .2,
            zoomAmtMax: 3,  // Max zoom = 3x
            zoomAmtMin: 1,  // Min zoom = 1x
        };

        // Set up states
        this.state = {
            mouseDown: false,
            mouseX: 0,
            mouseY: 0,
            mapPosX: 0,
            mapPosY: 0,
            mapW: 0,
            mapH: 0,
            zoomLvl: 1,
            mapXYAspectRatio: 2,  // X:Y
            boundaryRect: new DOMRect(0, 0, 0, 0)
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

    /** MOUSE EVENT METHODS **/

    handleUserClick = (e: SyntheticMouseEvent<HTMLElement>) => {

    };

    handleUserDragStart = (e: SyntheticMouseEvent<HTMLElement>): boolean => {
        e.stopPropagation();

        // Prevent default dragging behaviour.
        // Note that setting the draggable attribute to false does not work in older browsers.
        e.preventDefault();
        return false
    };

    handleUserMouseEnter = () => {
        // Not yet needed
    };

    handleUserMouseLeave = () => {
        this.setState({
            mouseDown: false
        });
    };

    handleUserMouseDown = (e: SyntheticMouseEvent<HTMLElement>) => {
        e.stopPropagation();
        e.preventDefault();  // Needed else handleUserMouseLeave won't trigger

        this.setState({
            mouseDown: true,
            mouseX: e.clientX,
            mouseY: e.clientY,
        });

    };

    handleUserMouseUp = (e: SyntheticMouseEvent<HTMLElement>) => {
        e.stopPropagation();

        this.setState({
            mouseDown: false,
            mouseX: e.clientX,
            mouseY: e.clientY,
        });
    };

    handleUserMouseMove = (e: SyntheticMouseEvent<HTMLElement>) => {
        e.stopPropagation();
        e.persist();  // Needed for React's Synthetic Events to fire continuously

        const newState = {};

        // Always update mouseX and mouseY
        newState.mouseX = e.clientX;
        newState.mouseY = e.clientY;

        // Pan the map on mouseDown
        if (this.state.mouseDown) {
           newState.mapPosX = this.state.mapPosX + (e.clientX - this.state.mouseX);
           newState.mapPosY = this.state.mapPosY + (e.clientY - this.state.mouseY);
        }
        this.setState(newState);
    };

    handleUserWheel = (e: SyntheticWheelEvent<HTMLElement>) => {
        e.stopPropagation();
        e.preventDefault();
        e.persist();  // Needed for React's Synthetic Events to fire continuously

        const currentMapRect = e.currentTarget.getBoundingClientRect();
        if (currentMapRect) {
            // Save the current mouse position. May not be needed?
            const mX = this.state.mouseX;
            const mY = this.state.mouseY;

            // Check the scroll direction. Negative = scrolled up (i.e. zooming in)
            const d = Math.sign(e.deltaY);

            // Zoom the map. Try to increase map size via first adjusting its width
            const newMapW = forceInRange(this.state.mapW * (1 - this.zoomData.zoomAmt * d), this.state.boundaryRect.width * this.zoomData.zoomAmtMin, this.state.boundaryRect.width * this.zoomData.zoomAmtMax);
            const mapGrowthW = newMapW - this.state.mapW;
            if (mapGrowthW !== 0) {
                // New dimensions are within limit. Let's adjust its height as well
                const newMapH = newMapW / this.state.mapXYAspectRatio;
                const mapGrowthH = newMapH - this.state.mapH;

                // Update zoom level
                const newZoomLvl = this.state.zoomLvl - this.zoomData.zoomAmt * d;

                // We also need adjustments so that the map expands from user's mouse position
                // If left as default, width will grow from center, while height will grow from bottom
                const mapCenter = getCenterCoords(currentMapRect);
                const mXDistFromCenter = mX - mapCenter.x;

                // Adjust the x-axis
                const offsetAdjX = - (mapGrowthW / 2) * (mXDistFromCenter / (this.state.mapW / 2));
                const newMapPosX = this.state.mapPosX + offsetAdjX;

                // Adjust the y-axis
                const offsetAdjY = - mapGrowthH * ((mY - currentMapRect.top) / this.state.mapH);
                const newMapPosY = this.state.mapPosY + offsetAdjY;

                // Finally, update the states
                this.setState({
                    zoomLvl: newZoomLvl,
                    mapPosX: newMapPosX,
                    mapPosY: newMapPosY,
                    mapW: newMapW,
                    mapH: newMapH
                });
            }
        }
    };

    /** WINDOW EVENT METHODS **/

    /**
     * A window resize will change the boundary size, as well as the map size
     * */
    handleWindowResize = (e: Event) => {
        // Change map size with boundary. Map growth is dependant on boundary's width because the map is wide
        const boundaryRect = this.getBoundaryRect();
        if (boundaryRect) {
            const newMapW = boundaryRect.width * this.state.zoomLvl;
            const newMapH = newMapW / this.state.mapXYAspectRatio;
            this.setState((prevState: WorldTravelMapState, props: {}) => {
                return {
                    mapW: newMapW,
                    mapH: newMapH,

                    // Adjust the y-axis so that the map grows from center, both horizontally and vertically
                    mapPosY: prevState.mapPosY - ((newMapH - prevState.mapH) / 2) + ((boundaryRect.height - prevState.boundaryRect.height) / 2),  // Re-center

                    boundaryRect: boundaryRect
                }
            });
        }
    };

    /** RENDER **/

    render() {
        return (
            <div>
                <div id='world-travel-map'
                     onMouseEnter={this.handleUserMouseEnter} onMouseLeave={this.handleUserMouseLeave}
                     onDragStart={this.handleUserDragStart}
                     onMouseDown={this.handleUserMouseDown} onMouseUp={this.handleUserMouseUp}
                     onMouseMove={this.handleUserMouseMove}>
                    <svg role="img" xmlns="http://www.w3.org/2000/svg"
                         viewBox={`0 0 2000 1000`}
                         style={{
                             width: `${this.state.mapW}px`, height: `${this.state.mapH}px`,
                             transform: `translate(${this.state.mapPosX}px, ${this.state.mapPosY}px)`
                         }}
                         onDragStart={this.handleUserDragStart}
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