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
            passwordRe: '',
            errorEmail: 'test error email',
            errorPassword: 'test error password',
            errorPasswordRe: 'test error re-typed password'
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
                    this.setState({errorPassword: 'no errors!'})
                } else {
                    let errorMsg = '';
                    for (let i = 0; i < errors.length; i++) {
                        errorMsg += errors[i];
                    }
                    this.setState({errorPassword: errorMsg});
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
                <ErrorBox elementID="error-box-signup-email" content={this.state.errorEmail} />

                <TextInput name="password" title="Password" placeholder="Enter your password" value={this.state.password} handleChange={this.handleChangePassword} />
                <ErrorBox elementID="error-box-signup-password" content={this.state.errorPassword} />

                <TextInput name="passwordRe" title="Password (re-enter)" placeholder="Re-enter your password" value={this.state.passwordRe} handleChange={this.handleChange} />
                <ErrorBox elementID="error-box-signup-passwordRe" content={this.state.errorPasswordRe} />

                <input className="input-submit-btn" type="submit" value="Sign Up" />
            </Form>
        )
    }
}

export default SignUpForm