/**
 * ProjectBox
 *
 * This is created for /projects.
 *
 * Each <ProjectBox /> is a rectangle that represents an available project in
 * the portfolio.
 *
 * By default, <ProjectBox /> shows minified content in the form of a single,
 * large letter.
 *
 * <ProjectBox /> can be expanded to show the full content via user interaction
 * (mouse click). An expanded <ProjectBox /> shows details of the project in
 * question.
 *
 * Contents are pulled from an object, which could be a JSON file, or from a
 * database.
 * */

// @flow

import * as React from 'react';

import getRandNumBtw from '../../lib/utils/getRandNumBtw';

import '../../css/v2.0.0/project-box.css';
import {MIcon} from '../lib/components/MIcon';

type ProjectBoxPropTypes = {
    letter: string,  // This is the alphabet character that identifies the
                     // ProjectBox

    content?: {  // The content object defaults to undefined
                 // On render, this will be a grey-out box that which user
                 // can't interact with.
                 // However, if there're contents, the box will be in colour and
                 // can be interacted with.

        title: string,  // Title of the project

        emCharPos: number,  // This is the character position of the letter that
                            // represents the ProjectBox. This is needed for the
                            // <ExpandableString /> that accompanies each
                            // <ProjectBox />.

        logo: {  // Information for the <img /> element that displays the
                 // project's logo
            src: string,
            alt: string,
        },

        description: string,  // Should not be too long - use Twitter's 140 rule

        link: string  // Please have https
    },
}

type ProjectBoxStateTypes = {
    clicked: boolean,  // To control collapsed / expanded state

    bkgColor: string,  // Styling purpose - Change the background colour on
                       // expansion
}

class ProjectBox extends React.PureComponent<ProjectBoxPropTypes, ProjectBoxStateTypes> {
    bkgColorData: {
        init: string,
        range: string[],
    };

    static defaultProps = {
        content: undefined,
    };

    constructor(props: ProjectBoxPropTypes) {
        super(props);
        this.bkgColorData = {
            init: '#E0E0E0',
            range: [
                '#ef9a9a',
                '#F48FB1',
                '#CE93D8',
                '#B39DDB',
                '#9FA8DA',
                '#90CAF9',
                '#81D4FA',
                '#80DEEA',
                '#80CBC4',
                '#A5D6A7',
                '#C5E1A5',
                '#E6EE9C',
                '#FFE082',
                '#FFCC80',
                '#FFAB91',
                '#B0BEC5',
            ],
        };
        this.state = {
            clicked: false,
            bkgColor: this.bkgColorData.init,
        };
    }

    stopPropagationOnClick = (e: SyntheticMouseEvent<HTMLElement>) => {
        e.stopPropagation();
    };

    handleClick = (e: SyntheticMouseEvent<HTMLElement>) => {
        const {content} = this.props;

        e.stopPropagation();
        if (content !== undefined) {
            this.expandBox();
        }
    };

    handleKeyPress = (e: SyntheticKeyboardEvent<HTMLElement>) => {
        const {content} = this.props;

        if (e.keyCode === 13 && content !== undefined) {
            this.expandBox();
        }
    };

    expandBox = () => {
        this.setState((prevState, props) => ({
            clicked: !prevState.clicked,
            bkgColor: prevState.clicked ?
                      this.bkgColorData.init :
                      this.bkgColorData.range[Math.floor(getRandNumBtw(0, this.bkgColorData.range.length))],
        }));
    };

    render() {
        const {letter, content} = this.props;
        const {clicked, bkgColor} = this.state;

        return (
            <div className="pb">
                <div className={`pb-container ${content !== undefined ? '' : 'no-content'}`}
                     style={{
                         backgroundColor: bkgColor
                     }}
                     onClick={this.handleClick}
                     onKeyPress={this.handleKeyPress}
                     role="button"
                     tabIndex={0}>

                    <div className="pb-content-min">
                        <span className="pb-content-min-letter">{letter}</span>
                    </div>

                </div>

                {content !== undefined &&
                <div className={`${clicked ? '' : 'hidden'} pb-lightbox-container `}
                     onClick={this.handleClick}
                     role="presentation">
                    <div className="pb-lightbox"
                         style={{
                             backgroundColor: bkgColor,
                         }}
                         onClick={this.stopPropagationOnClick}
                         role="presentation">
                        <div className="pb-lightbox-close-btn"
                             onClick={this.expandBox}
                             onKeyPress={this.handleKeyPress}
                             role="button"
                             tabIndex={0}>
                            <MIcon icon="clear" />
                        </div>
                        <span className="pb-lightbox-title"><span className="pb-lightbox-title-text">{content.title}</span></span>
                        <img className="pb-lightbox-logo" src={content.logo.src} alt={content.logo.alt} />
                        <p className="pb-lightbox-description">{content.description}</p>
                        <a className="pb-lightbox-link" href={content.link} target="_blank" rel="noopener noreferrer">
                            <div>{content.link}</div>
                        </a>
                    </div>
                </div>
                }
            </div>
        )
    }
}

export default ProjectBox
