// @flow
'use strict';

import React, {PureComponent} from 'react';

const SHUFFLE_CHAR_CODE_START = 33;
const SHUFFLE_CHAR_CODE_END = 126;

function getRandomInt(min, max) {
    //The maximum is exclusive and the minimum is inclusive
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Shuffle a given string
 * @param {string} string - The string to be shuffled
 * @param {Array} ignoredChars - An array of characters that will be ignored when shuffling
 * @return {string} - The shuffled string
 * */
function shuffleString(string: string, ignoredChars?: string[] = [' ']): string {
    const tempStrArr = string.split('');
    for (let i = 0; i < tempStrArr.length; i++) {
        if (ignoredChars.indexOf(tempStrArr[i]) === -1) {
            tempStrArr[i] = String.fromCharCode(getRandomInt(SHUFFLE_CHAR_CODE_START, SHUFFLE_CHAR_CODE_END));
        }
    }
    return tempStrArr.join('')
}

/** ********** REACT COMPONENT ********** **/

type ShufflingStringProps = {
    resultStr: string,
    shuffleInterval: number,  // ms
    maxShuffleTime: number,  // ms
    ignoredChars?: string[],  // Default to [' ']
}

type ShufflingStringState = {
    currentStr: string
}

type TimerId = TimerId;

class ShufflingString extends PureComponent<ShufflingStringProps, ShufflingStringState> {
    ignoredChars: string[];
    maxShuffleTime: number;
    intervalId: TimerId;
    timeoutId: TimerId;

    constructor(props: ShufflingStringProps) {
        super(props);
        this.ignoredChars = this.props.ignoredChars ? this.props.ignoredChars : [' '];
        this.maxShuffleTime = this.props.maxShuffleTime >= this.props.shuffleInterval ? this.props.maxShuffleTime : this.props.shuffleInterval;
        this.state = {
            currentStr: shuffleString(this.props.resultStr, this.ignoredChars)
        };
    }

    componentDidMount() {
        this.start();
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
        clearTimeout(this.timeoutId);
    }

    start = () => {
        this.intervalId = setInterval(
            () => this.shuffle(),
            this.props.shuffleInterval
        );
        this.timeoutId = setTimeout(
            () => this.stop(),
            this.maxShuffleTime
        );
    };

    shuffle = () => {
        this.setState((prevState, props) => {
            return {currentStr: shuffleString(prevState.currentStr, this.ignoredChars)}
        });
    };

    stop = () => {
        clearInterval(this.intervalId);
        this.intervalId = null;
        this.timeoutId = null;
        this.setState({
            currentStr: this.props.resultStr
        });
    };

    handleClick = () => {
        if (!this.intervalId && !this.timeoutId) {
            this.start();
        } else {
            console.log('Timer is still running!');
        }
    };

    render() {
        return (
            <span className='shuffling-string' onClick={this.handleClick}>
                {this.state.currentStr}
            </span>
        )
    }
}

export default ShufflingString