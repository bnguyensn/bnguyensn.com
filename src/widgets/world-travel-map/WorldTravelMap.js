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
    mapScale: number,
    mapW: number,
    mapH: number,
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
        scaleAmt: number, scaleAmtMin: number, scaleAmtMax: number,
        amtX: number, amtY: number, maxAmtX: number, maxAmtY: number, minAmtX: number, minAmtY: number,
    };

    constructor() {
        super();
        this.countryIds = Object.keys(worldMapData);
        this.countryPathElements = this.countryIds.map((countryId) =>
            <path key={countryId} d={worldMapData[countryId].d} fill={'#81C784'} />
        );
        this.zoomData = {
            scaleAmt: .1,
            scaleAmtMax: 13,
            scaleAmtMin: 1,

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
            mapScale: 3,
            mapW: 2000,
            mapH: 1000,
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
            // Pan the map, but only within limit
            const newMapPosX = this.state.mapPosX + (e.clientX - this.state.mouseX);
            const newMapPosY = this.state.mapPosY + (e.clientY - this.state.mouseY);
            if (isInRange(newMapPosX, -this.state.panMaxX, this.state.panMaxX)
                && isInRange(newMapPosY, -this.state.panMaxY, this.state.panMaxY)) {
                this.setState({
                    mouseX: e.clientX,
                    mouseY: e.clientY,
                    mapPosX: newMapPosX,
                    mapPosY: newMapPosY
                });
            }
        }
    };

    handleUserWheel = (e: SyntheticWheelEvent<HTMLElement>) => {
        e.preventDefault();
        e.persist();  // Needed for React's Synthetic Events to fire continuously

        // Zoom the map using width / height
        const d = Math.sign(e.deltaY);  // Direction: negative = scrolled up (i.e. zooming in)
        const newMapScale = this.state.mapScale - d;
        if (isInRange(newMapScale, this.zoomData.scaleAmtMin, this.zoomData.scaleAmtMax)) {
            this.setState((prevState: WorldTravelMapState, props: {}): {} => {
                // TODO: Snap the map back to new limit if necessary
                return {
                    mapW: prevState.mapW - (prevState.mapW * this.zoomData.scaleAmt * d),
                    mapH: prevState.mapH - (prevState.mapH * this.zoomData.scaleAmt * d),
                    mapScale: newMapScale,

                    // TODO: this adjustment should be pro-rated with user's cursor to expand map from current center
                    mapPosY: prevState.mapPosY + (prevState.mapH * this.zoomData.scaleAmt * d) / 2  // This makes the map expand from its center
                }
            });
        }
    };

    /** MAP MOVEMENT METHODS **/

    panMap = (startPoint: {}, endPoint: {}) => {

    };

    zoomMap = () => {

    };

    render() {
        return (
            <div id='world-travel-map'>
                <svg role="img" xmlns="http://www.w3.org/2000/svg"
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