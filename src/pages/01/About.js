import React, {Component} from 'react';
const age = require('../../js/01/age');
const bio_json = require('../../json/bio');

function Atrribute(props) {
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
    const attrsKeys = Object.keys(props.attrs);  // The passed props.attrs should be an object of attribute objects
    const attrsLen = attrsKeys.length;

    const attrs_list = props.attrs.map((attr) =>
        <Attribute key={attr.name}
                   icon={attr.icon} name={attr.name} points={attr.points} tooltip={attr.tooltip} />);

    return (
        <div className='bio-attrs-list'>
            {attrs_list}
        </div>
    )
}

function Bio(props) {
    return (
        <div>
            <div className='bio-profile-pic'>
                <img src={props.my_pic} alt="Character art" />
            </div>
            <div className='bio-profile-desc'>
                <span className='bio-name'>{props.bio.name}</span>
                <span className='bio-class'>{`${props.myAge} - ${props.bio.class}`}</span>
                <span className='bio-bkg'>{props.bio.bkg}</span>
            </div>
            <div className='bio-attrs'>
                <AttributeList attrs={props.bio.attributesPrimary} />
            </div>
        </div>
    )
}

class CharacterSheet extends Component {
    constructor(props) {
        super(props);
        this.myAge = age.getAge(age.strToDate(this.props.bio.dob));
        this.myPic = this.props.profilePic;
    }

    render() {
        return (
            <div id='cs-canvas'>
                <Bio myAge={this.myAge}
                     myPic={this.myPic}
                     bio={this.props.bio} />
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