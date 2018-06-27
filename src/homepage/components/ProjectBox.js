/**
 * ProjectBox
 *
 * This is created for /projects.
 *
 * Each <ProjectBox /> is a rectangle that represents an available project in
 * the portfolio.
 *
 * By default, <ProjectBox /> shows a minified content in the form of a single,
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

import getRandNumBtw from '../lib/utils/getRandNumBtw';

import '../css/project-box.css';

type Props = {
    letter: string,  // This is the alphabet character that identifies the
                     // ProjectBox

    content?: {  // The content object defaults to undefined
                 // On render, this will be a grey-out box that which user
                 // can't interact with

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

type State = {
    clicked: boolean,  // To control collapsed / expanded state

    bkgColor: string,  // Styling purpose - Change the background colour on
                       // expansion
}

class ProjectBox extends React.PureComponent<Props, State> {
    bkgColorData: {
        init: string,
        range: string[],
    };

    static defaultProps = {
        content: undefined,
    };

    constructor(props: Props) {
        super(props);
        this.bkgColorData = {
            init: '#E0E0E0',
            range: [
                '#e57373',
                '#F06292',
                '#BA68C8',
                '#9575CD',
                '#7986CB',
                '#64B5F6',
                '#4FC3F7',
                '#4DD0E1',
                '#4DB6AC',
                '#81C784',
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
        e.stopPropagation();
        if (this.props.content !== undefined) {
            this.expandBox();
        }
    };

    handleKeyPress = (e: SyntheticKeyboardEvent<HTMLElement>) => {
        if (e.keyCode === 13 && this.props.content !== undefined) {
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
        return (
            <div className="pb">
                <div className={`pb-container ${this.props.content !== undefined ? '' : 'no-content'}`}
                     style={{
                         backgroundColor: this.state.bkgColor
                     }}
                     onClick={this.handleClick}
                     onKeyPress={this.handleKeyPress}
                     role="button"
                     tabIndex={0}>

                    <div className="pb-content-min">
                        <span className="pb-content-min-letter">{this.props.letter}</span>
                    </div>

                    {this.props.content !== undefined &&
                    <div className={`pb-lightbox-container ${this.state.clicked ? '' : 'hidden'}`}
                         onClick={this.handleClick}
                         role="presentation">

                        <div className="pb-lightbox"
                             style={{
                                 backgroundColor: this.state.bkgColor,
                             }}
                             onClick={this.stopPropagationOnClick}
                             role="presentation">
                            <span className="pb-lightbox-title"><span className="pb-lightbox-title-text">{this.props.content.title}</span></span>
                            <img className="pb-lightbox-logo" src={this.props.content.logo.src} alt={this.props.content.logo.alt} />
                            <p className="pb-lightbox-description">{this.props.content.description}</p>
                            <span className="pb-lightbox-link">{this.props.content.link}</span>
                        </div>

                    </div>
                    }

                </div>
            </div>
        )
    }
}

export default ProjectBox
