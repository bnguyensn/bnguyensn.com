import React, {Component} from 'react';

import Form from './02_Form';
import TextInput from './02_TextInput';

import emValidation from "./02_em-validation";
import pwValidation from "./02_pwValidation";

import {postNewUser} from "./02_login-network";

// 'error-tooltip-hidden' is a CSS class in 'login.css' with where visibility and opacity are set to none"
const hidden_clsname = 'error-tooltip-hidden';

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'test@example.com',
            password: '1234567!',
            password_re: '1234567!',
            error_email: '',
            error_password: '',
            error_password_re: '',
            //The states below help show / hide the error tooltips
            error_email_vis: hidden_clsname,
            error_password_vis: hidden_clsname,
            error_password_re_vis: hidden_clsname,
        };

        this.updateIndicator = this.updateIndicator.bind(this);
        this.processErrors = this.processErrors.bind(this);
        this.showErrors = this.showErrors.bind(this);
        this.hideErrors = this.hideErrors.bind(this);
        this.checkPasswordRe = this.checkPasswordRe.bind(this);

        this.inputChangeWaited = this.inputChangeWaited.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /* ********** HELPERS ********** */

    updateIndicator(status, colour) {

    }

    processErrors(name, error_msg) {
        error_msg === '' ? this.hideErrors(name) : this.showErrors(name, error_msg);
    }

    showErrors(name, error_msg) {
        this.setState({
            [`error_${name}`]: error_msg,
            [`error_${name}_vis`]: ''  // Essentially removing the hidden CSS class for the error tooltip
        });
    }

    hideErrors(name) {
        this.setState({
            [`error_${name}`]: '',
            [`error_${name}_vis`]: hidden_clsname  // Essentially adding the hidden CSS class for the error tooltip
        })
    }

    // This is a helper function to match password and password_re
    checkPasswordRe() {
        this.state.password_re === '' ? this.hideErrors('password_re') :
            this.state.password_re !== this.state.password ?
                this.showErrors('password_re', 'Password does not match password re-enter.') :
                this.hideErrors('password_re');
    }

    /* ********** HANDLE ALL INPUT CHANGES ********** */

    inputChangeWaited(value, name) {
        // Wait Xs before validating user input
        const waitTime = 500;  // ms

        return new Promise((resolve, reject) => {
            window.setTimeout((value, name) => {
                // After Xs, check if field value has changed
                if (value === this.state[name]) {
                    // Field value has not changed, let's validate input
                    resolve();
                } else {
                    // Field value has changed, let's not do anything for now
                    reject();
                }
            }, waitTime, value, name  /* Fuck IE9 */)
        })
    }

    handleInputChange(e) {
        const value = e.target.value;
        const name = e.target.name;

        this.setState({
            [name]: value
        }, () => {
            // Since the input validation for each field is slightly different, we will use switch / case
            switch (name) {
                case 'email':
                    this.inputChangeWaited(value, name).then(
                        () => {
                            if (this.state.email === '') {
                                // Don't display any errors if field is blank
                                this.hideErrors('email');
                            } else {
                                // Check for errors in all other cases.
                                // Note that emValidation() is a Promise because we need to make a database request
                                // to check for email duplication.
                                emValidation(this.state.email).then(
                                    (error_msg) => {
                                        this.processErrors('email', error_msg);
                                    },
                                    (error_msg) => {
                                        this.processErrors('email', error_msg);
                                    }
                                );
                            }
                        },
                        () => { /* Promise rejected. Don't really need to do anything */ }
                    );
                    break;
                case 'password':
                    this.inputChangeWaited(value, name).then(
                        () => {
                            if (this.state.password === '') {
                                this.hideErrors('password');

                                // Because password is linked to password_re, we should remove password_re errors as well
                                this.hideErrors('password_re');
                            } else {
                                this.processErrors('password', pwValidation(this.state.password));

                                // Because password is linked to password_re, we should match password and password_re as well
                                this.checkPasswordRe();
                            }
                        },
                        () => { /* Promise rejected. Don't really need to do anything */ }
                    );
                    break;
                case 'password_re':
                    this.inputChangeWaited(value, name).then(
                        () => {
                            if (this.state.password !== '') {
                                this.checkPasswordRe();
                            }
                        },
                        () => { /* Promise rejected. Don't really need to do anything */ }
                    );
                    break;
            }
        });
    }

    /* ********** HANDLE SUBMISSION ********** */

    handleSubmit(e) {
        if ((this.state.email !== '' && this.state.password !== '' && this.state.password_re !== '') &&
            (this.state.error_email === '' && this.state.error_password === '' && this.state.error_password_re === '')) {
            // Everything is filled in correctly, submission logic below

            // Make a POST request with email & password data. It'll be Promises all the way down from here.
            postNewUser(this.state.email, this.state.password).then(
                // Promise fulfilled (new user successfully created)
                (status) => {
                    console.log(`Submission successful. Status: ${status}`);
                },
                // Promise rejected (something went wrong)
                (status) => {
                    console.log(`Submission failed. Status: ${status}`);
                }
            );
        } else {
            alert('Please ensure the form is filled in correctly.')
        }

        e.preventDefault();
    }

    /* ********** RENDER ********** */

    render() {
        return (
            <div className='form-container'>
                <span className="form-title">WELCOME!</span>
                <Form elementID="signup-form" elementOnSubmit={this.handleSubmit}>
                    <TextInput type="text" name="email" title="Email" placeholder="abc@example.com"
                               value={this.state.email}
                               handleChange={this.handleInputChange}
                               i_colour="green" i_status="check_box"
                               e_content={this.state.error_email} e_vis={this.state.error_email_vis}

                    />

                    <TextInput type="password" name="password" title="Password" placeholder="Choose a password"
                               value={this.state.password}
                               handleChange={this.handleInputChange}
                               i_colour="green" i_status="check_box"
                               e_content={this.state.error_password} e_vis={this.state.error_password_vis}
                    />

                    <TextInput type="password" name="password_re" title="Password (re-enter)" placeholder="Re-enter your password"
                               value={this.state.password_re}
                               handleChange={this.handleInputChange}
                               i_colour="green" i_status="check_box"
                               e_content={this.state.error_password_re} e_vis={this.state.error_password_re_vis}
                    />

                    <div className="input-submit-btn-container">
                        <input className="input-submit-btn" type="submit" value="Sign Up" />
                    </div>
                </Form>
            </div>
        )
    }
}

export default SignUpForm