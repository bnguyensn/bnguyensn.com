// @flow

import * as React from 'react';
import './nav-rect-btn.css';

type Props = {
    title: string,
    color: string,
    bkgColor: string,
    handleClick: Function,
}

class NavRectButton extends React.Component<Props> {
    handleClick = (e: SyntheticMouseEvent<HTMLDivElement>) => {
        this.props.handleClick(e);
    };

    render() {
        return (
            <div className='nav-rect-btn' role='button' tabIndex={0}
                 style={{
                     color: this.props.color,
                     backgroundColor: this.props.bkgColor,
                 }}>
                {this.props.title}
            </div>
        );
    }
}

export default NavRectButton;
