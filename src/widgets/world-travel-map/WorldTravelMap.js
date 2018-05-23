// @flow
'use strict';

import React, {PureComponent} from 'react';
import type {Node} from 'react';

import worldMapData from './img/world2';

import './world-travel-map.css';

type WorldTravelMapState = {
    mouseDown: boolean,
    mouseX: number,
    mouseY: number
}

class WorldTravelMap extends PureComponent<{}, WorldTravelMapState> {
    countryIds: string[];
    countryPathElements: Node;

    constructor() {
        super();
        this.countryIds = Object.keys(worldMapData);
        this.countryPathElements = this.countryIds.map((countryId) =>
            <path key={countryId} d={worldMapData[countryId].d} fill={'#81C784'} />
        );
        this.state = {
            mouseDown: false,
            mouseX: 0,
            mouseY: 0
        }
    }

    /** REACT LIFECYCLE METHODS **/

    shouldComponentUpdate = (nextProps: {}, nextState: WorldTravelMapState): boolean => {
        // Only re-render if the mouse is held down
        return this.state.mouseDown
    };

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

    handleUserMouseDown = () => {
        this.setState({
            mouseDown: true
        });
    };

    handleUserMouseUp = () => {
        this.setState({
            mouseDown: false
        });
    };

    handleUserMouseMove = (e: SyntheticMouseEvent<HTMLElement>) => {
        this.setState({
            mouseX: e.clientX,
            mouseY: e.clientY
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
                <span id='world-travel-map-test'>
                    {`${this.state.mouseX} | ${this.state.mouseY}`}
                </span>
                <svg role="img" viewBox="0 0 1000 500" xmlns="http://www.w3.org/2000/svg"
                     onDragStart={this.handleUserDragStart}
                     onMouseEnter={this.handleUserMouseEnter} onMouseLeave={this.handleUserMouseLeave}
                     onMouseDown={this.handleUserMouseDown} onMouseUp={this.handleUserMouseUp}
                     onMouseMove={this.handleUserMouseMove}
                     onClick={this.handleUserClick}>
                    {this.countryPathElements}
                </svg>
            </div>
        )
    }
}

export default WorldTravelMap