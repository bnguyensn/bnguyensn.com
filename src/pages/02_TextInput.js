import React, {Component} from 'react';

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
                    <input  className="input-label-input"
                            type={this.props.type}
                            name={this.props.name}
                            placeholder={this.props.placeholder}
                            value={this.props.value}
                            onChange={this.handleChange} />
                </label>
                <i className="text-input-check material-icons green">check_box</i>
            </div>
        )
    }
}

export default TextInput