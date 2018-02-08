import React, {Component} from 'react';

const bio_json = require('../../json/bio');

/**
 * Get the number of days in a given month & year
 * JavaScript's Date's day is 1-indexed i.e. passing a '0' day will result in the last day of last month
 * @param {int} year - The year in question
 * @param {int} month - The month in question
 * */
function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate()
}

/**
 * Get the number of days between two dates
 * UTC conversion ignored
 * @param {Date} date1 - First comparison date
 * @param {Date} date2 - Second comparison date
 * */
function getDaysDiff(date1, date2) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;  // Number of ms per day
    return Math.floor((date2 - date1) / _MS_PER_DAY)  // date2 - date1 will return a date difference in ms, we then convert this to number of days
}

/**
 * Get a person's age in terms of X years and Y days
 * @param {Date} dob_date - A Date object representing the date of birth
 * @return {Array} - An array containing the person's age, in the format [X years, Y days]
 * */
function getAge(dob_date) {
    let age = [0, 0];

    const today_date = new Date();

    if (today_date <= dob_date) {
        return age
    }

    const days_diff = getDaysDiff(dob_date, today_date);

    age[0] = Math.floor(days_diff / 365);
    age[1] = days_diff % 365;

    return age
}

/**
 * Convert a date string in the format of "DD/MM/YYYY" to a Date object
 * @param {string} dob_str - A string in the format of "DD/MM/YYYY"
 * */
function dobToAge(dob_str) {
    const dob_arr = dob_str.split('/');

    const dob_d = parseInt(dob_arr[0], 10);
    const dob_m = parseInt(dob_arr[1], 10);
    const dob_y = parseInt(dob_arr[2], 10);
    return new Date(dob_y, dob_m, dob_d);
}

function Atrribute(props) {
    return (
        <div className='cs-bio-attribute'>
            <div className='cs-bio-attr-ico'>{props.icon}</div>
            <div className='cs-bio-attr-name'>{props.name}</div>
            <div className='cs-bio-attr-pts'>{props.points}</div>
            <div className='cs-bio-attr-tt'>{props.tooltip}</div>
        </div>
    )
}

function Bio(props) {
    const dob_D = dobToAge(bio_json.dob);

    return (
        <div>
            <div id='cs-bio-profilepic'>

            </div>
            <div id='cs-bio-profiledesc'>
                <span id='cs-bio-name'>{bio_json.name}</span>
                <span id='cs-bio-class'>{`${getAge(dob_D)} - ${bio_json.class}`}</span>
                <span id='cs-bio-bkg'>{bio_json.bkg}</span>
            </div>
            <div id='cs-bio-attributes'>

            </div>
        </div>
    )
}

class CharacterSheet extends Component {
    render() {
        return (
            <div id='cs-canvas'>
                <Bio />
            </div>
        )
    }
}

class About extends Component {
    constructor(props) {
        super(props);
        this.handleDateInputChange = this.handleDateInputChange.bind(this);

        const default_dob = new Date(1992, 8, 2);
        const default_age = getAge(default_dob);

        this.state = {
            dob_d: 2,
            dob_m: 9,
            dob_y: 1992,
            age: `${default_age[0]} year(s) ${default_age[1]} day(s)`
        }
    }

    handleDateInputChange(e) {
        let age = [0, 0];
        if (e.target.name === 'dob_y') {
            age = getAge(new Date(e.target.value, this.state.dob_m - 1, this.state.dob_d))
        } else if ((e.target.name === 'dob_m')) {
            age = getAge(new Date(this.state.dob_y, e.target.value - 1, this.state.dob_d))
        } else {
            age = getAge(new Date(this.state.dob_y, this.state.dob_m - 1, e.target.value))
        }

        this.setState({
            [e.target.name]: e.target.value,
            age: `${age[0]} year(s) ${age[1]} day(s)`
        });
    }

    render() {
        return (
            <div id='about-canvas'>
                <div id='about-content-container'>
                    <label>
                        DOB Year:
                        <input name="dob_y" type="number" value={this.state.dob_y} onChange={this.handleDateInputChange} />
                    </label>
                    <br />
                    <label>
                        DOB Month:
                        <input name="dob_m" type="number" value={this.state.dob_m} onChange={this.handleDateInputChange} />
                    </label>
                    <br />
                    <label>
                        DOB Day:
                        <input name="dob_d" type="number" value={this.state.dob_d} onChange={this.handleDateInputChange} />
                    </label>
                    <br />
                    <br />
                    <span>Calculated age: {this.state.age}</span>
                </div>
            </div>
        )
    }
}

export default About