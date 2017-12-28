import React, {Component} from 'react';

function ErrorTooltip(props) {
    return (
        <div className={`error-tooltip ${props.vis}`}>
            {props.content}
        </div>
    )
}

function Indicator(props) {
    /* This is the little icon next to the input field
       Available statuses (Google Icon): check_box, error
       Available colour (index.css): green, red
    */

    return (
        <span>
            <i className={`text-input-check material-icons ${props.colour}`}>
                {props.status}
            </i>
        </span>
    )
}

class TextInput extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.handleChange(e);
    }

    render() {
        return (
            <div className="text-input-container">
                <label className="text-input-label">
                    <span className="input-label-title">{this.props.title}</span>
                    <span className="error-tooltip-container">
                        <input className="input-label-input"
                               type={this.props.type}
                               name={this.props.name}
                               placeholder={this.props.placeholder}
                               value={this.props.value}
                               onChange={this.handleChange}/>
                        <ErrorTooltip content={this.props.e_content} vis={this.props.e_vis}/>
                    </span>
                </label>
                <Indicator colour={this.props.i_colour} status={this.props.i_status}/>
            </div>
        )
    }
}

export default TextInput