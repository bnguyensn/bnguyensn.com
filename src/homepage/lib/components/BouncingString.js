// @flow

import * as React from 'react';

type BouncingStringProps = {
    str: string,
    bMag: number,  // Magnitude of the bounce
};

type BouncingStringStates = {
    letterData: {[key: string]: {letter: string, posY: number}},
}

export default class BouncingString extends React.PureComponent<BouncingStringProps, BouncingStringStates> {
    letterIds: string[];

    constructor(props) {
        super(props);

        // Assign an id to each letter
        this.letterIds = [];
        props.str.forEach((letter, index) => {
            if (letter !== '') {
                this.letterIds.push(`${index}-${letter}`);
            }
        });

        // Initialise letter data
        const letterData = {};
        this.letterIds.forEach((letterId, index) => {
            letterData[letterId] = {};
            letterData[letterId].letter = props.str[index];
            letterData[letterId].posY = 0;
        });

        this.state = {
            letterData,
        };
    }

    bounce = () => {
        const {letterData} = this.state;

        const newLetterData = Object.assign({}, letterData);
    }
}
