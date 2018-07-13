/**
 * A letter that changes colour randomly
 * */

// @flow

import * as React from 'react';
import styled, {keyframes} from 'styled-components';

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

function keyframeGenerator(colourRange: string[]) {
    if (colourRange.length === 1) {
        return `100% {color: ${colourRange[0]}}`
    }

    if (colourRange.length === 2) {
        return `
        0% {color: ${colourRange[0]}}
        100% {color: ${colourRange[1]}}
        `
    }

    if (colourRange.length > 2) {
        const kfStringStorage = [];
        for (let i = 1; i < colourRange.length - 1; i++) {
            const p = parseFloat((100 / (colourRange.length - 1)).toPrecision(2));
            kfStringStorage[i] = `${p * i}% {color: ${colourRange[i]}}`
        }
        kfStringStorage[0] = `0% {color: ${colourRange[0]}}`;
        kfStringStorage[colourRange.length - 1] = `100% {color: ${colourRange[colourRange.length - 1]}}`;
        console.log(kfStringStorage.join(' '));
        return kfStringStorage.join(' ');
    }

    return keyframeGenerator(defaultColourRange)
}

/** ********** REACT COMPONENT ********** **/

type PropTypes = {
    s: string,
    d: number,
    colourRange?: string[]
}

function RainbowLetter(props: PropTypes) {
    const {s, d, colourRange} = props;
    const letter = s[0];  // Will only return a letter if passed a long string

    const keyframeString = colourRange ? keyframeGenerator(colourRange) : '';
    const changeColourAnim = keyframes`
      ${keyframeString}
    `;

    const totalAnimLength = colourRange ? colourRange.length * d : 0;

    const Letter = styled.span`
      font-size: 5em;
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
