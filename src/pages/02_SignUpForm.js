import React, {Component} from 'react';

import Form from './02_Form';
import TextInput from './02_TextInput';

import emValidation from "./02_em-validation";
import pwValidation from "./02_pwValidation";

import {postNewUser} from "./02_login-network";

// Class name for the CSS class(es) that hide(s) elements.
const hidden_clsname = 'hidden-vis-op';
// This object is used for the indicator. The "icons" correspond to Google Font's icon font, while "colours" are found in index.css.
const indicators = {
    ok: 'check_box',
    error: 'error',
    loading: 'hourglass_empty',
    ok_colour: 'green',
    error_colour: 'red',
    loading_colour: 'yellow',
    hidden_colour: hidden_clsname
};

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
            // The states below help show / hide the error tooltips
            error_email_vis: hidden_clsname,
            error_password_vis: hidden_clsname,
            error_password_re_vis: hidden_clsname,
            // The states below manage the indicators
            indicator_email: indicators.ok,
            indicator_email_colour: indicators.hidden_colour,
            indicator_password: indicators.ok,
            indicator_password_colour: indicators.hidden_colour,
            indicator_password_re: indicators.ok,
            indicator_password_re_colour: indicators.hidden_colour,
        };

        this.showIndicator = this.showIndicator.bind(this);
        this.hideIndicator = this.hideIndicator.bind(this);

        this.showErrorTooltip = this.showErrorTooltip.bind(this);
        this.hideErrorTooltip = this.hideErrorTooltip.bind(this);
        this.processErrorTooltip = this.processErrorTooltip.bind(this);

        this.hideError = this.hideError.bind(this);
        this.showError = this.showError.bind(this);
        this.showNoError = this.showNoError.bind(this);
        this.processError = this.processError.bind(this);
        this.checkEmail = this.checkEmail.bind(this);
        this.checkPassword = this.checkPassword.bind(this);
        this.checkPasswordRe = this.checkPasswordRe.bind(this);
        this.checkAll = this.checkAll.bind(this);

        this.inputChangeWaited = this.inputChangeWaited.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /* ********** STATUS INDICATORS ********** */

    showIndicator(name, status, colour) {
        this.setState({
            [`indicator_${name}`]: status,
            [`indicator_${name}_colour`]: colour
        })
    }

    hideIndicator(name) {
        this.setState({ [`indicator_${name}_colour`]: indicators.hidden_colour })
    }

    /* ********** ERROR TOOLTIPS ********** */

    showErrorTooltip(name, error_msg) {
        this.setState({
            [`error_${name}`]: error_msg,
            [`error_${name}_vis`]: ''  // Essentially removing the hidden CSS class for the error tooltip
        });
    }

    hideErrorTooltip(name) {
        this.setState({
            [`error_${name}`]: '',
            [`error_${name}_vis`]: hidden_clsname  // Essentially adding the hidden CSS class for the error tooltip
        });
    }

    processErrorTooltip(name, error_msg) {
        // This function is used when we have an unknown error message
        error_msg === '' ? this.hideErrorTooltip(name) : this.showErrorTooltip(name, error_msg);
    }

    /* ********** FIELD CHECKS ********** */

    hideError(name) {
        this.hideErrorTooltip(name);
        this.hideIndicator(name);
    }

    showError(name, error_msg) {
        this.showErrorTooltip(name, error_msg);
        this.showIndicator(name, indicators.error, indicators.error_colour);
    }

    showNoError(name) {
        this.hideErrorTooltip(name);
        this.showIndicator(name, indicators.ok, indicators.ok_colour);
    }

    processError(name, error_msg) {
        error_msg === '' ? this.showNoError(name) : this.showError(name, error_msg);
    }

    checkEmail(email) {
        return new Promise((resolve, reject) => {
            if (email === '') {
                this.hideError('email');
                resolve();
            } else {
                // Note that emValidation() is a Promise because we need to make a database request to check for email duplication.
                this.showIndicator('email', indicators.loading, indicators.loading_colour);  // This is usable because we have a Promise coming right after.
                emValidation(email).then(
                    (error_msg) => {
                        this.processError('email', error_msg);
                        resolve();
                    },
                    (server_error_msg) => {
                        this.processError('email', server_error_msg);
                        reject();
                    }
                );
            }
        })
    }

    checkPassword(password, password_re) {
        if (password === '') {
            this.hideError('password');

            // Because password is linked to password_re, we should remove password_re errors as well
            this.hideError('password_re');
        } else {
            this.processError('password', pwValidation(password));

            // Because password is linked to password_re, we should match password and password_re as well
            this.checkPasswordRe(password_re, password);
        }
    }

    checkPasswordRe(password_re, password) {
        password_re === '' ? this.hideError('password_re') :
            (password_re !== password && password !== '') ?
                this.showError('password_re', 'Password does not match password re-enter.') :
                this.showNoError('password_re');
    }

    // This checks all input fields.
    // Because checkEmail() is a Promise, this needs to be a Promise too.
    checkAll() {
        return new Promise((resolve, reject) => {
            this.checkPassword(this.state.password, this.state.password_re);
            this.checkPasswordRe(this.state.password_re, this.state.password);
            this.checkEmail(this.state.email).then(
                () => { resolve(); },
                () => { reject(); }
            );
        })
    }

    /* ********** HANDLE INPUT CHANGES ********** */

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
                        () => { this.checkEmail(this.state.email); },
                        () => { /* Promise rejected (user is still typing). Don't really need to do anything */ }
                    );
                    break;
                case 'password':
                    this.inputChangeWaited(value, name).then(
                        () => { this.checkPassword(this.state.password, this.state.password_re); },
                        () => { /* Promise rejected (user is still typing). Don't really need to do anything */ }
                    );
                    break;
                case 'password_re':
                    this.inputChangeWaited(value, name).then(
                        () => { this.checkPasswordRe(this.state.password_re, this.state.password); },
                        () => { /* Promise rejected (user is still typing). Don't really need to do anything */ }
                    );
                    break;
            }
        });
    }

    /* ********** SUBMISSION ********** */

    handleSubmit(e) {
        this.checkAll().then(
            () => {
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
            },
            () => {}
        );

        e.preventDefault();
    }

    /* ********** RENDER ********** */

    componentWillMount() {
        // this.checkAll();  // This is currently not needed as the default field values are '' so there won't be any errors.
    }

    render() {
        return (
            <div className='form-container'>
                <span className="form-title">WELCOME!</span>
                <Form elementID="signup-form" elementOnSubmit={this.handleSubmit}>
                    <TextInput type="text" name="email" title="Email" placeholder="abc@example.com"
                               value={this.state.email}
                               description=""
                               handleChange={this.handleInputChange}
                               i_status={this.state.indicator_email} i_colour={this.state.indicator_email_colour}
                               e_content={this.state.error_email} e_vis={this.state.error_email_vis}

                    />

                    <TextInput type="password" name="password" title="Password" placeholder="Choose a password"
                               value={this.state.password}
                               description="Password should be 7 characters minimum, with at least 1 numeral and 1 non-numeral."
                               handleChange={this.handleInputChange}
                               i_status={this.state.indicator_password} i_colour={this.state.indicator_password_colour}
                               e_content={this.state.error_password} e_vis={this.state.error_password_vis}
                    />

                    <TextInput type="password" name="password_re" title="Password (re-enter)" placeholder="Re-enter your password"
                               value={this.state.password_re}
                               description=""
                               handleChange={this.handleInputChange}
                               i_status={this.state.indicator_password_re} i_colour={this.state.indicator_password_re_colour}
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