/**
 * A letter that changes colour randomly
 * */

// @flow

import * as React from 'react';
import styled, {keyframes} from 'styled-components';

import shuffleKFY from '../utils/shuffleKFY';
import rearrangeArray from '../utils/rearrangeArray';

/** ********** HELPERS ********** **/

const defaultColourRange = [
    '#E91E63',
    '#f44336',
    '#FF5722',
    '#FF9800',
    '#FFC107',
    '#FFEB3B',
    '#CDDC39',
    '#8BC34A',
    '#4CAF50',
    '#009688',
    '#00BCD4',
    '#2196F3',
    '#3F51B5',
    '#673AB7',
    '#9C27B0',
];

function keyframeGenerator(colourRange: string[], randomise: string) {
    if (colourRange.length < 1) {
        return keyframeGenerator(defaultColourRange, randomise)
    }

    if (colourRange.length === 1) {
        return `100% {color: ${colourRange[0]}}`
    }

    let adjColourRange;
    
    // Randomise colour range, if specified
    if (randomise === 'random') {
        // Mode random = randomly shuffle the colour range
        adjColourRange = shuffleKFY(colourRange.slice());
    } else if (randomise === 'rearrange') {
        // Mode rearrange = randomly select a first colour, but keep the ordering of colours
        adjColourRange = rearrangeArray(colourRange.slice());
    } else {
        adjColourRange = colourRange.slice();
    }
    
    // To smooth out the animation, add an entry to make last colour === first colour
    adjColourRange.push(adjColourRange[0]);

    if (adjColourRange.length === 2) {
        return `
        0% {color: ${adjColourRange[0]}}
        100% {color: ${adjColourRange[1]}}
        `
    }

    const kfStringStorage = [];
    for (let i = 1; i < adjColourRange.length - 1; i++) {
        const p = parseFloat((100 / (adjColourRange.length - 1)).toPrecision(2));
        kfStringStorage[i] = `${p * i}% {color: ${adjColourRange[i]}}`
    }
    kfStringStorage[0] = `0% {color: ${adjColourRange[0]}}`;
    kfStringStorage[adjColourRange.length - 1] = `100% {color: ${adjColourRange[adjColourRange.length - 1]}}`;
    return kfStringStorage.join(' ');

}

/** ********** REACT COMPONENT ********** **/

type PropTypes = {
    s: string,
    d: number,
    r: string,
    colourRange?: string[]
}

function RainbowLetter(props: PropTypes) {
    const {s, d, r, colourRange} = props;
    const letter = s[0];  // Will only return a letter if passed a long string

    const keyframeString = colourRange ? keyframeGenerator(colourRange, r) : '';
    const changeColourAnim = keyframes`
      ${keyframeString}
    `;

    const totalAnimLength = colourRange ? colourRange.length * d : 0;

    const Letter = styled.span`
      animation: ${changeColourAnim} ${totalAnimLength}s linear infinite;
    `;

    return (
        <Letter>{letter}</Letter>
    )
}

RainbowLetter.defaultProps = {
    colourRange: defaultColourRange,
};

export default RainbowLetter
