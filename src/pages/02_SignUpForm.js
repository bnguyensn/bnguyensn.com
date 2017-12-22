import React, {Component} from 'react';

import Form from './02_Form';
import TextInput from './02_TextInput';
import ErrorBox from './02_ErrorBox';

import pwValidation from "./02_pwValidation";

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            password_re: '',
            errorEmail: 'test error email',
            error_password: 'test error password',
            error_password_re: 'test error re-typed password'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const value = e.target.value;
        const name = e.target.name;

        this.setState({
            [name]: value
        });
    }

    handleChangePassword(e) {
        const pw = e.target.value;

        this.setState({password: pw});

        const inputChangeWaited = new Promise((resolve, reject) => {
            window.setTimeout((pw) => {
                if (pw === this.state.password) {
                    resolve(pw);
                } else {
                    reject(pw);
                }
            }, 1000, pw /* Fuck IE9 */);
        });

        inputChangeWaited.then(
            // Promise fulfilled (it has been Xs since user changed the input)
            (pw) => {
                const errors = pwValidation(pw);
                if (errors.length === 0) {
                    this.setState({error_password: 'no errors!'})
                } else {
                    let error_msg = '';
                    for (let i = 0; i < errors.length; i++) {
                        error_msg += errors[i];
                    }
                    this.setState({error_password: error_msg});
                }

            },
            // Promise rejected
            (pw) => {

            }
        );
    }

    handleSubmit(e) {
        alert(`email: ${this.state.email}\n
               password: ${this.state.password}`);
        e.preventDefault();
    }

    render() {
        return (
            <Form elementID="signup-form" elementOnSubmit={this.handleSubmit}>
                <TextInput name="email" title="Email" placeholder="Enter your email" value={this.state.email} handleChange={this.handleChange} />
                <ErrorBox elementID="error-box-signup-email" content={this.state.error_email} />

                <TextInput name="password" title="Password" placeholder="Enter your password" value={this.state.password} handleChange={this.handleChangePassword} />
                <ErrorBox elementID="error-box-signup-password" content={this.state.error_password} />

                <TextInput name="password-re" title="Password (re-enter)" placeholder="Re-enter your password" value={this.state.password_re} handleChange={this.handleChange} />
                <ErrorBox elementID="error-box-signup-password-re" content={this.state.error_password_re} />

                <input className="input-submit-btn" type="submit" value="Sign Up" />
            </Form>
        )
    }
}

export default SignUpForm