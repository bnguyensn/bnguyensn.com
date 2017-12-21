import React, {Component} from 'react';

import Form from './02_Form';
import TextInput from './02_TextInput';
import ErrorBox from './02_ErrorBox';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorEmail: 'test error email',
            errorPassword: 'test error password'
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
            <Form elementID="login-form" elementOnSubmit={this.handleSubmit}>
                <TextInput name="email" title="Email" placeholder="Enter your email" value={this.state.email} handleChange={this.handleChange} />
                <ErrorBox elementID="error-box-login-email" content={this.state.errorEmail} />
                <TextInput name="password" title="Password" placeholder="Enter your password" value={this.state.password} handleChange={this.handleChange} />
                <ErrorBox elementID="error-box-login-password" content={this.state.errorPassword} />
                <input className="input-submit-btn" type="submit" value="Log In" />
            </Form>
        )
    }
}

export default LoginForm