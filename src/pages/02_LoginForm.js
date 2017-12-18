import React, {Component} from 'react';

class FieldText extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.handleChange(e);
    }

    render() {
        return (
            <div>
                <label>
                    <span>{this.props.name}</span>
                    <input  type="text"
                            name={this.props.name}
                            placeholder={this.props.placeholder}
                            value={this.props.value}
                            onChange={this.handleChange} />
                    <span><i className="material-icons green">check_box</i></span>
                </label>
            </div>
        )
    }
}


class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const value = e.target.value;
        const name = e.target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(e) {
        alert(`email: ${this.state.email}\n
               password: ${this.state.password}`);
        e.preventDefault();
    }

    render() {
        return (
            <form id="login-form" onSubmit={this.handleSubmit}>
                <FieldText name="email" placeholder="Enter your email" value={this.state.email} handleChange={this.handleChange} />
                <FieldText name="password" placeholder="Enter your password" value={this.state.password} handleChange={this.handleChange} />
                <input type="submit" value="Log In" />

            </form>
        );
    }
}

class LoginForm extends Component {
    render() {
        return(
            <div id='login-container'>
                <span>Please log in or sign up</span>
                <Form />
            </div>
        )
    }
}

export default LoginForm