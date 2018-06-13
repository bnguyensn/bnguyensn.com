/**
 * ProjectBox
 *
 * This is created for /projects.
 *
 * ProjectBox normally shows the minified content, but can be expanded to show
 * the full content on click / tap.
 * */

// @flow

import * as React from 'react';

import './css/project-box.css';

type Props = {
    href: string,
    content: string,
}

type State = {
    clicked: boolean
}

class ProjectBox extends React.PureComponent<Props, State> {
    constructor(props) {
        super(props);
        this.bkgColorData = {
            0: '#E0E0E0',
            1: '#e57373',
            2: '#F06292',
            3: '#BA68C8',
            4: '#9575CD',
            5: '#7986CB',
            6: '#64B5F6',
            7: '#4FC3F7',
            8: '#4DD0E1',
            9: '#4DB6AC',
            10: '#81C784',
        };
        this.state = {
            clicked: false,
            bkgColor: this.bkgColorData[0],
        }
    }

    handleClick = () => {
        this.setState((prevState, props) => ({
            clicked: !prevState.clicked
        }));
    };

    render() {
        return (
            <div className='project-box-container'>
                <div className='project-box'
                     style={{
                         backgroundColor: {this.state.bkgColor}
                     }}>
                    {this.props.content}
                </div>
            </div>
        )
    }
}

export default ProjectBox