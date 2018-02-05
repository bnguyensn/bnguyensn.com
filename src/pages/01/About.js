import React, {Component} from 'react';

const bio_json = require('../../json/bio');

function dobToAge(dob_str) {
    return 25
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
    return (
        <div>
            <div id='cs-bio-profilepic'>

            </div>
            <div id='cs-bio-profiledesc'>
                <span id='cs-bio-name'>{bio_json.name}</span>
                <span id='cs-bio-class'>{`${dobToAge(bio_json.dob)} - ${bio_json.class}`}</span>
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
    render() {
        return (
            <div id='about-canvas'>
                <div id='about-content-container'>
                    <CharacterSheet />
                </div>
            </div>
        )
    }
}

export default About