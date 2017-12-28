import React, {Component} from 'react';

import Form from './02_Form';
import TextInput from './02_TextInput';

import emValidation from "./02_emValidation";
import pwValidation from "./02_pwValidation";

// 'error-tooltip-hidden' is a CSS class in 'login.css' with where visibility and opacity are set to none"
const hidden_clsname = 'error-tooltip-hidden';

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            password_re: '',
            error_email: '',
            error_password: '',
            error_password_re: '',
            //The states below help show / hide the error tooltips
            error_email_vis: hidden_clsname,
            error_password_vis: hidden_clsname,
            error_password_re_vis: hidden_clsname,
        };

        this.updateIndicator = this.updateIndicator.bind(this);
        this.showError = this.showError.bind(this);
        this.hideError = this.hideError.bind(this);

        this.inputChangeWaited = this.inputChangeWaited.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /* ********** HELPERS ********** */


    updateIndicator(status, colour) {

    }

    showError(name, errors) {
        // Set up contents for the error tooltip
        let error_msg = '';
        for (let i = 0; i < errors.length; i++) {
            error_msg += `${errors[i]} `;
        }

        // Display the error tooltip
        this.setState({
            [`error_${name}`]: error_msg,
            /* By setting the below to '', we essentially remove the 'hidden-vis' class
               which in turn show the error tooltip
             */
            [`error_${name}_vis`]: ''
        });
    }

    hideError(name) {
        // Hide the error tooltip
        this.setState({
            [`error_${name}`]: '',
            [`error_${name}_vis`]: hidden_clsname
        })
    }

    /* ********** HANDLE ALL INPUT CHANGES ********** */

    inputChangeWaited(value, name, data = undefined) {
        // This Promise is used for the purpose of waiting Xs before validating user input
        const waitTime = 750;  // ms

        return new Promise((resolve, reject) => {
            window.setTimeout((value, name, data) => {
                // Check if the current value matches the previous value
                if (value === this.state[name]) {
                    resolve([value, name, data]);
                } else {
                    reject([value, name, data]);
                }
            }, waitTime, value, name, data /* Fuck IE9 */)
        })
    }

    handleInputChange(e) {
        const value = e.target.value;
        const name = e.target.name;

        this.setState({
            [name]: value
        }, () => {
            switch (name) {
                case 'email':
                    this.inputChangeWaited(value, name).then(
                        // Promise fulfilled (it has been Xs since user changed the input)
                        (param_array) => {
                            const value = param_array[0];
                            const name = param_array[1];

                            if (value === '') {
                                // No errors if input field is blank
                                this.hideError(name);
                            } else {
                                /* Check for errors in all other cases
                                   The returned errors should be an array of error message strings
                                 */
                                const errors = emValidation(value);

                                if (errors.length === 0) {
                                    // No errors case
                                    this.hideError(name);
                                } else {
                                    // Some errors case
                                    this.showError(name, errors);
                                }
                            }
                        },
                        // Promise rejected
                        (param_array) => {}
                    );
                    break;
                case 'password':
                    this.inputChangeWaited(value, name, this.state.password_re).then(
                        // Promise fulfilled (it has been Xs since user changed the input)
                        (param_array) => {
                            const value = param_array[0];
                            const name = param_array[1];
                            const data = param_array[2];

                            if (value === '') {
                                this.hideError(name);
                                // Because password is linked to password_re, should remove password_re errors as well
                                this.hideError('password_re');
                            } else {
                                const errors = pwValidation(value);

                                if (errors.length === 0) {
                                    this.hideError(name);
                                } else {
                                    this.showError(name, errors);
                                }

                                // Additionally, match password and password re-enter
                                if (this.state.password_re !== '') {
                                    if (value !== this.state.password_re) {
                                        this.showError('password_re', ['Password does not match password re-enter']);
                                    } else {
                                        this.hideError('password_re');
                                    }
                                }
                            }
                        }
                    );
                    break;
                case 'password_re':
                    if (this.state.password !== '') {
                        if (this.state.password_re === '') {
                            this.hideError('password_re');
                        } else {
                            if (this.state.password_re !== this.state.password) {
                                this.showError('password_re', ['Password does not match password re-enter']);
                            } else {
                                this.hideError('password_re');
                            }
                        }
                    }
                    break;
            }
        });
    }

    /* ********** HANDLE SUBMISSION ********** */

    handleSubmit(e) {
        alert(`email: ${this.state.email}\n
               password: ${this.state.password}`);
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