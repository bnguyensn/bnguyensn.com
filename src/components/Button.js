/** ******** NAVIGATION BUTTONS OF THE HOMEPAGE ********** **/

import React, {Component} from 'react';

class Button extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const colour_class = `hbt-${this.props.colour}`;

        return (
            <a href={this.props.link}>
                <div className={`hbt-container ${colour_class}`}>
                    <span>
                        {this.props.text}
                    </span>
                </div>
            </a>
        )
    }
}

export default Button