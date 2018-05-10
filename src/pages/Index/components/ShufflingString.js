// @flow
'use strict';

const SHUFFLE_CHAR_CODE_START = 33;
const SHUFFLE_CHAR_CODE_END = 126;

function getRandomInt(min, max) {
    //The maximum is exclusive and the minimum is inclusive
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * @param {string} resultChr - Final result character
 * @param {number} shuffleInterval - ms Interval between each shuffle
 * @param {number} maxShuffle - s Maximum time the shuffles will play out
 * @param {number} [minShuffle=0] - s Minimum time the shuffles will play out
 * */
function shuffleChar(resultChr: string, shuffleInterval: number, maxShuffle: number, minShuffle?: number = 0) {
    const startingChar = getRandomInt(SHUFFLE_CHAR_CODE_START, SHUFFLE_CHAR_CODE_END);
}

function breakDownString(Str: string) {

}



type ShufflingStringProps = {
    resultStr: string,
    shuffleInterval: number,
    maxShuffleTime: number,
    minShuffleTime: number,
    ignoredChars?: string[]
}

class ShufflingString extends PureComponent<ShufflingStringProps> {
    constructor(props) {
        super(props);
        this.ignoredChars = this.props.ignoredChars ? this.props.ignoredChars : [' '];
        this.state = {
            currentStr: this.props.resultStr
        };
    }

    shuffleString() {
        const tempStrArr = this.props.resultStr.split('');
        for (let i = 0; i < tempStrArr.length; i++) {
            if (this.ignoredChars.indexOf(tempStrArr[i]) === -1) {
                tempStrArr[i] = String.fromCharCode(getRandomInt(SHUFFLE_CHAR_CODE_START, SHUFFLE_CHAR_CODE_END));
            }
        }
        this.setState({
            currentStr: tempStrArr.join('')
        });
    }

    render() {
        return (
            <div className='shuffling-string'>
                {this.state.currentStr}
            </div>
        )
    }
}