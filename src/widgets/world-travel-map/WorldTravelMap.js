// @flow
'use strict';

import React, {PureComponent} from 'react';
import type {Node} from 'react';

import worldMapData from './img/world2';

import './world-travel-map.css';

class WorldTravelMap extends PureComponent<{}> {
    countryIds: string[];
    countryPathElements: Node;

    constructor() {
        super();
        this.countryIds = Object.keys(worldMapData);
        this.countryPathElements = this.countryIds.map((countryId) =>
            <path key={countryId} d={worldMapData[countryId].d} fill={'#81C784'} />
        );
    }

    panMap = () => {

    };

    zoomMap = () => {

    };

    render() {
        return (
            <div id='world-travel-map'>
                <svg role="img" viewBox="0 0 1000 500" xmlns="http://www.w3.org/2000/svg">
                    {this.countryPathElements}
                </svg>
            </div>
        )
    }
}

export default WorldTravelMap