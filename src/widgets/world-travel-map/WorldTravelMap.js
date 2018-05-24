// @flow
'use strict';

import React, {Component, PureComponent} from 'react';
import type {Node} from 'react';

import worldMapData from './img/world2';

import './world-travel-map.css';

type WorldTravelMapState = {
    mouseDown: boolean,
    mouseX: number,
    mouseY: number,
    mapViewBoxMinX: number,
    mapViewBoxMinY: number
}

class WorldTravelMap extends Component<{}, WorldTravelMapState> {
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
            mouseY: 0,
            mapViewBoxMinX: 0,
            mapViewBoxMinY: 0
        }
    }

    /** REACT LIFECYCLE METHODS **/

    shouldComponentUpdate = (nextProps: {}, nextState: WorldTravelMapState): boolean => {
        // Only re-render if the mouse is held down and the cursor is within the map
        return this.state.mouseDown && this.state.mouseDown === nextState.mouseDown
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
        this.setState((prevState: WorldTravelMapState, props: {}): {} => {
            let xMvmt = 0;
            let yMvmt = 0;
            if (prevState.mouseDown) {
                xMvmt = e.clientX - prevState.mouseX;
                yMvmt = e.clientY - prevState.mouseY;
            }

            return {
                mouseX: e.clientX,
                mouseY: e.clientY,
                mapViewBoxMinX: prevState.mapViewBoxMinX - xMvmt,
                mapViewBoxMinY: prevState.mapViewBoxMinY - yMvmt,
            }
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
                <svg role="img" xmlns="http://www.w3.org/2000/svg"
                     viewBox={`${this.state.mapViewBoxMinX} ${this.state.mapViewBoxMinY} 1000 500`}
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