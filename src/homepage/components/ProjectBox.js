/**
 * ProjectBox
 *
 * This is created for /projects.
 *
 * ProjectBox normally shows the minified content, but can be expanded to show
 * the full content on click / tap.
 *
 * Contents are saved in JSON schema
 * */

// @flow

import * as React from 'react';

import getRandNumBtw from '../lib/utils/getRandNumBtw';

import '../css/project-box.css';

type Props = {
    letter: string,  // This is the alphabet character that identifies the
                     // ProjectBox
    content: {
        title: string,
        emCharPos: number,  // This is the character position of the letter that
                            // represents the ProjectBox
        logo: {
            src: string,
            alt?: string
        },
        description: string,
        link: string
    },
}

type State = {
    clicked: boolean,
    bkgColor: string
}

class ProjectBox extends React.PureComponent<Props, State> {
    bkgColorData: {
        init: string,
        range: string[]
    };

    static defaultProps = {
        content: {
            logo: {
                alt: ''
            }
        }
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
            bkgColor: this.bkgColorData[0],
        };
    }

    handleClick = () => {
        this.setState((prevState, props) => ({
            clicked: !prevState.clicked,
            bkgColor: !prevState.clicked ?
                      this.bkgColorData.init :
                      this.bkgColorData.range[Math.floor(getRandNumBtw(0, this.bkgColorData.range.length))]
        }));
    };

    handleKeyPress = (e: SyntheticKeyboardEvent<HTMLElement>) => {
        if (e.keyCode === 13) {
            this.handleClick();
        }
    };

    render() {
        return (
            <div className="pb">
                <div className="pb-container"
                     style={{
                         backgroundColor: this.state.bkgColor
                     }}
                     onClick={this.handleClick}
                     onKeyPress={this.handleKeyPress}
                     role="button"
                     tabIndex={0}>

                    <div className="pb-content-min">
                        <span className="pb-min-letter">{this.props.letter}</span>
                    </div>

                    <div className="pb-content">
                        <span className="pb-title">{this.props.content.title}</span>
                        <img className="pb-logo" src={this.props.content.logo.src} alt={this.props.content.logo.alt} />
                        <p className="pb-description">{this.props.content.description}</p>
                        <span className="pb-link">{this.props.content.link}</span>
                    </div>

                </div>
            </div>
        )
    }
}

export default ProjectBox