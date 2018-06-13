// @flow

import * as React from 'react';

type Props = {
    href: string,
    content: string,
}

type State = {
    clicked: boolean
}

class BoxLink extends React.PureComponent<Props, State> {
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
            10: '#4DB6AC',
        };
        this.state = {
            clicked: false,
            bkgColor:
        }
    }

    handleClick = () => {
        this.setState((prevState, props) => ({
            clicked: !prevState.clicked
        }));
    };

    render() {
        return (
            <a className='box-link' href={this.props.href}>
                <div className='box-link-box'>
                    {this.props.content}
                </div>
            </a>
        )
    }
}

export default BoxLink