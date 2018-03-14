import React, {Component} from 'react';
import '../../css/about.css';
const age = require('../../js/01/age');
const my_age = age.getAge(age.strToDate('02/09/1992'));

function Attribute(props) {
    return (
        <div className='cas-attr-container'>
            <div className='cas-attr-ico'>{props.icon}</div>
            <div className='cas-attr-name'>{props.name}</div>
            <div className='cas-attr-pts'>{props.points}</div>
            <div className='cas-attr-tt'>{props.tooltip}</div>
        </div>
    )
}

function AttributeList(props) {
    const attrs_arr = Object.values(props.attrs);  // The passed props.attrs should be an object of attribute objects

    const attrs_list = attrs_arr.map((attr) =>
        <Attribute key={attr.name}
                   icon={attr.icon} name={attr.name} points={attr.points} tooltip={attr.tooltip} />);

    return (
        <ul className='cs-attrs-list'>
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
                <div className='cs-profile-desc'>

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
                <section id='s-intro'>
                    <p>
                        Hi, I'm a {my_age[0]} years old dude living in London. This website was created as a place to document my thoughts and works.
                        <br/><br/>
                        The site is powered by <a href='https://nodejs.org/en/' target="_blank">Nodejs</a> and <a href='https://facebook.github.io/react/' target="_blank">React</a>.
                    </p>
                </section>
                <section id='s-fav'>
                    <h1>Favourites</h1>
                    <p>
                        I wander around mainly in JavaScript and Python. Getting comfortable with C++ is currently my next target.
                        <br/><br/>
                        Outside of computer-related things, I like the the cinema, good food (not cooking good food), and nicely constructed LEGO sets.
                    </p>
                </section>
                <section id='s-projects'>
                    <h1>Things I've Created</h1>
                    <p>
                        I like toying around with computers in my pastime. Below is a list of my completed projects:
                        <ul>
                            <li>An <a href='#' target="_blank">anagram solver</a> [<a href='#' target="_blank">github</a>]</li>
                        </ul>
                    </p>
                </section>
                <section id='s-edu'>
                    <h1>Education</h1>
                    <p>
                        I got my Economics degree from the <a href='https://www.southampton.ac.uk' target="_blank">University of Southampton</a> in 2013.
                        <br/><br/>
                        I obtained my <a href='https://www.icaew.com/' target="_blank">Chartered Accountant</a> certification in 2017 after 3 years of working for <a href='https://www.pwc.co.uk' target="_blank">PwC</a>.
                    </p>
                </section>
                <section id='s-corporate'>
                    <h1>Corporate</h1>
                    <p>
                        I have been working as an auditor for <a href='https://www.pwc.co.uk' target="_blank">PwC</a> London since 2014.
                    </p>
                </section>
            </div>
        )
    }
}

export default About