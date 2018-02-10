import React, {Component} from 'react';
import '../../css/about.css';
const age = require('../../js/01/age');
const bio_json = require('../../json/bio');

function Attribute(props) {
    return (
        <div className='bio-attr'>
            <div className='bio-attr-ico'>{props.icon}</div>
            <div className='bio-attr-name'>{props.name}</div>
            <div className='bio-attr-pts'>{props.points}</div>
            <div className='bio-attr-tt'>{props.tooltip}</div>
        </div>
    )
}

function AttributeList(props) {
    const attrs_arr = Object.values(props.attrs);  // The passed props.attrs should be an object of attribute objects

    const attrs_list = attrs_arr.map((attr) =>
        <Attribute key={attr.name}
                   icon={attr.icon} name={attr.name} points={attr.points} tooltip={attr.tooltip} />);

    return (
        <ul className='bio-attrs-list'>
            {attrs_list}
        </ul>
    )
}

class CharacterSheet extends Component {
    constructor(props) {
        super(props);
        this.my_age = age.getAge(age.strToDate(this.props.bio.dob));
        this.my_pic = this.props.profilePic;
    }

    render() {
        return (
            <div className='cs-canvas'>
                <div className='cs-profile-pic'>
                    <img src={this.my_pic} alt="Character art" />
                </div>
                <div className='cs-profile-desc'>
                    <span className='cs-name'>{this.props.bio.name}</span>
                    <span className='cs-class'>{`${this.my_age} - ${this.props.bio.class}`}</span>
                    <span className='cs-bkg'>{this.props.bio.bkg}</span>
                </div>
                <div className='cs-skills-prim'>
                    <AttributeList attrs={this.props.bio.skillsPrimary} />
                </div>
                <div className='cs-skills-sec'>
                    <AttributeList attrs={this.props.bio.skillsSecondary} />
                </div>
            </div>
        )
    }
}

class About extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id='about-canvas'>
                <div id='about-content-container'>
                    <CharacterSheet bio={bio_json} profilePic='../../img/profile_pic.png' />
                </div>
            </div>
        )
    }
}

export default About