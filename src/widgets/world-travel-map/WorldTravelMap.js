// @flow
'use strict';

import React, {Component, PureComponent} from 'react';
import type {Node} from 'react';

import worldMapData from './img/world2';

import './world-travel-map.css';

function isInRange(n: number, min: number, max: number): boolean {
    return (n >= min && n <= max)
}

type WorldTravelMapState = {
    mouseDown: boolean,
    mouseX: number,
    mouseY: number,
    mapPosX: number,
    mapPosY: number,
    mapViewBoxMinX: number,
    mapViewBoxMinY: number,
    mapViewBoxX: number,
    mapViewBoxY: number,
    panMaxX: number,
    panMaxY: number
}

class WorldTravelMap extends Component<{}, WorldTravelMapState> {
    countryIds: string[];
    countryPathElements: Node;
    zoomData: {
        amtX: number, amtY: number, maxAmtX: number, maxAmtY: number, minAmtX: number, minAmtY: number,
    };

    constructor() {
        super();
        this.countryIds = Object.keys(worldMapData);
        this.countryPathElements = this.countryIds.map((countryId) =>
            <path key={countryId} d={worldMapData[countryId].d} fill={'#81C784'} />
        );
        this.zoomData = {
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
            mapViewBoxMinX: 0,
            mapViewBoxMinY: 0,
            mapViewBoxX: this.zoomData.maxAmtX,
            mapViewBoxY: this.zoomData.maxAmtY,
            panMaxX: this.zoomData.maxAmtX / 2,
            panMaxY: this.zoomData.maxAmtY / 2
        }
    }

    /** REACT LIFECYCLE METHODS **/

    // Not yet needed

    /** MOUSE EVENT METHODS **/

    handleUserClick = (e: SyntheticMouseEvent<HTMLElement>) => {
        // console.log(`clientX: ${e.clientX}; clientY: ${e.clientY}`);
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

    handleUserMouseMove = (e: SyntheticMouseEvent<HTMLElement>) => {
        e.persist();  // Needed for React's Synthetic Events to fire continuously

        if (this.state.mouseDown) {
            // Pan the map
            this.setState((prevState: WorldTravelMapState, props: {}): {} => {
                /*const newMapViewBoxMinX = prevState.mapViewBoxMinX - (e.clientX - prevState.mouseX);
                const newMapViewBoxMinY = prevState.mapViewBoxMinY - (e.clientY - prevState.mouseY);
                if (isInRange(newMapViewBoxMinX, -prevState.panMaxX, prevState.panMaxX)
                    && isInRange(newMapViewBoxMinY, -prevState.panMaxY, prevState.panMaxY)) {
                    return {
                        mouseX: e.clientX,
                        mouseY: e.clientY,
                        mapViewBoxMinX: newMapViewBoxMinX,
                        mapViewBoxMinY: newMapViewBoxMinY
                    }
                }*/
                const newMapPosX = prevState.mapPosX + (e.clientX - prevState.mouseX);
                const newMapPosY = prevState.mapPosY + (e.clientY - prevState.mouseY);

                if (isInRange(newMapPosX, -prevState.panMaxX, prevState.panMaxX)
                    && isInRange(newMapPosY, -prevState.panMaxY, prevState.panMaxY)) {
                    return {
                        mouseX: e.clientX,
                        mouseY: e.clientY,
                        mapPosX: newMapPosX,
                        mapPosY: newMapPosY
                    }
                }

                return {
                    mouseX: e.clientX,
                    mouseY: e.clientY
                }
            });
        }
    };

    handleUserWheel = (e: SyntheticWheelEvent<HTMLElement>) => {
        e.preventDefault();
        e.persist();  // Needed for React's Synthetic Events to fire continuously

        // Zoom the map
        // Scroll up = negative Y
        // The smaller mapViewBox is, the larger the size of the svg
        this.setState((prevState: WorldTravelMapState, props: {}): {} => {
            const d = Math.sign(e.deltaY);  // Direction: negative = scrolled up (to zoom in)

            const newMapViewBoxX = prevState.mapViewBoxX + (this.zoomData.amtX * d);
            if (isInRange(newMapViewBoxX, this.zoomData.minAmtX, this.zoomData.maxAmtX)) {
                const newMapViewBoxY = prevState.mapViewBoxY + (this.zoomData.amtY * d);

                // Snap the map back to new limit if necessary
                const newPanMaxX = newMapViewBoxX / 2;
                const newPanMaxY = newMapViewBoxY / 2;
                const newMapViewBoxMinX = (isInRange(prevState.mapViewBoxMinX, -newPanMaxX, newPanMaxX)) ? prevState.mapViewBoxMinX : newPanMaxX * Math.sign(prevState.mapViewBoxMinX);
                const newMapViewBoxMinY = (isInRange(prevState.mapViewBoxMinY, -newPanMaxY, newPanMaxY)) ? prevState.mapViewBoxMinY : newPanMaxY * Math.sign(prevState.mapViewBoxMinY);

                return {
                    mapViewBoxX: newMapViewBoxX,
                    mapViewBoxY: newMapViewBoxY,
                    panMaxX: newPanMaxX,
                    panMaxY: newPanMaxY,
                    mapViewBoxMinX: newMapViewBoxMinX,
                    mapViewBoxMinY: newMapViewBoxMinY
                }
            }

            return {}
        });
    };

    /** MAP MOVEMENT METHODS **/

    panMap = (startPoint: {}, endPoint: {}) => {

    };

    zoomMap = () => {

    };

    render() {
        return (
            <div id='world-travel-map'>
                {/*<span id='world-travel-map-test'>*/}
                    {/*{`${this.state.mouseX} | ${this.state.mouseY}`}*/}
                {/*</span>*/}
                <svg role="img" xmlns="http://www.w3.org/2000/svg"
                     viewBox={`0 0 ${this.state.mapViewBoxX} ${this.state.mapViewBoxY}`}
                     style={{transform: `translate(${this.state.mapPosX}px, ${this.state.mapPosY}px)`}}
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