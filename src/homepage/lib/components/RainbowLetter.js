/**
 * A letter that changes colour randomly
 * */

// @flow

import * as React from 'react';
import styled, {keyframes} from 'styled-components';

import shuffleKFY from '../utils/shuffleKFY';

/** ********** HELPERS ********** **/

const defaultColourRange = [
    '#f44336',
    '#FF9800',
    '#FFEB3B',
    '#4CAF50',
    '#03A9F4',
    '#3F51B5',
    '#673AB7',
];

function keyframeGenerator(colourRange: string[], randomise: boolean) {
    if (colourRange.length < 1) {
        return keyframeGenerator(defaultColourRange)
    }

    if (colourRange.length === 1) {
        return `100% {color: ${colourRange[0]}}`
    }

    let adjColourRange = colourRange.slice();
    
    // Randomise colour range, if needed
    if (randomise) {
        adjColourRange = shuffleKFY(adjColourRange);
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
    r: boolean,
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
