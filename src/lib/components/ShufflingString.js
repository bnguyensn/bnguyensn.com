// @flow

import React, {PureComponent} from 'react';

/** ********** CONSTANTS ********** **/

const SHUFFLE_CHAR_CODE_START = 65;
const SHUFFLE_CHAR_CODE_END = 122;

/** ********** UTILITY FUNCTIONS ********** **/

function getRandomInt(min: number, max: number) {
    //The maximum is exclusive and the minimum is inclusive
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) + Math.ceil(min);
}

/** ********** SHUFFLE FUNCTIONS ********** **/

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

/**
 * Shuffle a given string until all characters become the original string
 * This function directly mutate the parameter arrays
 * @param {Array} charListOG - An array depicting the original string, with each element being a character in the original string
 * @param {Array} charListCurr - An array starting out as depicting the original string, but will be modified to show the shuffled string
 * @param {Array} charToBeModIndices - An array of character indices that will be modified
 * */
function shuffleString2(charListOG: string[], charListCurr: string[], charToBeModIndices: number[]) {
    for (let i = 0; i < charToBeModIndices.length; i++) {
        // Modify the current character list
        charListCurr[charToBeModIndices[i]] = String.fromCharCode(getRandomInt(SHUFFLE_CHAR_CODE_START, SHUFFLE_CHAR_CODE_END));

        // If the new character is the same as the original character
        // -> remove the index of this character from the char-to-be-modified list
        if (charListCurr[charToBeModIndices[i]] === charListOG[charToBeModIndices[i]]) {
            charToBeModIndices.splice(i, 1);
        }
    }
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
    charListOG: string[];
    charListCurr: string[];
    charToBeModIndices: number[];

    constructor(props: ShufflingStringProps) {
        super(props);
        this.ignoredChars = this.props.ignoredChars ? this.props.ignoredChars : [' '];
        this.maxShuffleTime = this.props.maxShuffleTime >= this.props.shuffleInterval ? this.props.maxShuffleTime : this.props.shuffleInterval;
        this.charListOG = this.props.resultStr.split('');
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
        this.charListCurr = this.charListOG.slice();
        this.charToBeModIndices = [];
        for (let i = 0; i < this.charListOG.length; i++) {
            if (this.ignoredChars.indexOf(this.charListOG[i]) === -1) {
                this.charToBeModIndices.push(i);
            }
        }

        this.intervalId = setInterval(
            () => this.shuffle(),
            this.props.shuffleInterval
        );
        this.timeoutId = setTimeout(
            () => {
                this.stop();
            },
            this.maxShuffleTime
        );
    };

    shuffle = () => {
        if (this.charToBeModIndices.length > 0) {
            shuffleString2(this.charListOG, this.charListCurr, this.charToBeModIndices);
            this.setState((prevState, props) => {
                return {currentStr: this.charListCurr.join('')}
            });
        } else {
            this.stop();
        }
    };

    stop = () => {
        clearInterval(this.intervalId);
        clearTimeout(this.timeoutId);
        this.intervalId = null;
        this.timeoutId = null;
        this.setState({
            currentStr: this.props.resultStr
        });
    };

    handleClick = () => {
        if (!this.intervalId && !this.timeoutId) {
            this.start();
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