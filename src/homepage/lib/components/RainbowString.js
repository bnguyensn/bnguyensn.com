// @flow

import * as React from 'react';

import RainbowLetter from './RainbowLetter';

type PropTypes = {
    s: string,
    d: number
}

function RainbowString(props: PropTypes) {
    const {s, d} = props;
    const letters = s.split('');
    const rainbowLetters = letters.map((letter, i) =>
        <RainbowLetter key={i} s={letter} d={d} />,  // eslint-disable-line react/no-array-index-key
    );

    return (
        <span>
            {rainbowLetters}
        </span>
    )
}

export default RainbowString
