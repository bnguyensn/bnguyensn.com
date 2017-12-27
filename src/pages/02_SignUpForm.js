import React, {Component} from 'react';

import Form from './02_Form';
import TextInput from './02_TextInput';
import ErrorBox from './02_ErrorBox';

import emValidation from "./02_emValidation";
import pwValidation from "./02_pwValidation";
import pwReValidation from "./02_pwReValidation";

// Map each field in the Sign Up form to a validation function
const validation_mapping = {
    email: emValidation,
    password: pwValidation,
    password_re: pwReValidation
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
            error_password_re: ''
        };

        this.validateEmPw = this.validateEmPw.bind(this);
        this.handleEmPwChange = this.handleEmPwChange.bind(this);

        this.inputChangeWaited = this.inputChangeWaited.bind(this);
        //this.isInputEmpty = this.isInputEmpty.bind(this);
        //this.handlePwReChange = this.handlePwReChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /* ********** HANDLE EMAIL / PASSWORD INPUT ********** */

    validateEmPw(value, name, data = undefined) {
        /* This should only be called after all states have finished updating
           Need to wait a bit before validating inputs
           This is where Promises come in
           First, create a new Promise instance
         */
        const inputChangeWaited = new Promise((resolve, reject) => {
            window.setTimeout((value, name, data) => {
                // Check if the current value matches the previous value
                if (value === this.state[name]) {
                    resolve([value, name, data]);
                } else {
                    reject([value, name, data]);
                }
            }, 750, value, name, data /* Fuck IE9 */);
        });

        // Handle the Promise instance above
        inputChangeWaited.then(
            // Promise fulfilled (it has been Xs since user changed the input)
            (param_array) => {
                const value = param_array[0];

                if (value === '') {
                    // No need to check for errors if field is blank
                    this.setState({[`error_${name}`]: ''});
                } else {
                    const name = param_array[1];
                    const data = param_array[2];

                    /* Check for errors in all other cases
                       The returned errors should be an array of error message strings
                     */
                    let errors;
                    data ?
                        errors = validation_mapping[name](value, data) :
                        errors = validation_mapping[name](value);

                    if (errors.length === 0) {
                        this.setState({[`error_${name}`]: 'no errors!'});
                    } else {
                        let error_msg = '';
                        for (let i = 0; i < errors.length; i++) {
                            error_msg += errors[i];
                        }
                        this.setState({[`error_${name}`]: error_msg});
                    }
                }
            },
            // Promise rejected
            (param_array) => {

            }
        );
    }

    /* ********** HANDLE ALL INPUT CHANGES ********** */

    inputChangeWaited(value, name, data = undefined) {
        return new Promise((resolve, reject) => {
            window.setTimeout((value, name, data) => {
                // Check if the current value matches the previous value
                if (value === this.state[name]) {
                    resolve([value, name, data]);
                } else {
                    reject([value, name, data]);
                }
            }, 750, value, name, data /* Fuck IE9 */)
        })
    }

    handleEmPwChange(e) {
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

                            if (value === '') {
                                // No need to check for errors if field is blank
                                this.setState({[`error_${name}`]: ''});
                            } else {
                                const name = param_array[1];

                                /* Check for errors in all other cases
                                   The returned errors should be an array of error message strings
                                 */
                                const errors = emValidation(value);

                                if (errors.length === 0) {
                                    this.setState({[`error_${name}`]: 'no errors!'});
                                } else {
                                    let error_msg = '';
                                    for (let i = 0; i < errors.length; i++) {
                                        error_msg += errors[i];
                                    }
                                    this.setState({[`error_${name}`]: error_msg});
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

                            if (value === '') {
                                // No need to check for errors if field is blank
                                this.setState({[`error_${name}`]: ''});
                                this.setState({error_password_re: ''});
                            } else {
                                const name = param_array[1];
                                const data = param_array[2];

                                /* Check for errors in all other cases
                                   The returned errors should be an array of error message strings
                                 */
                                const errors = pwValidation(value);

                                if (errors.length === 0) {
                                    this.setState({[`error_${name}`]: 'no errors!'});
                                } else {
                                    let error_msg = '';
                                    for (let i = 0; i < errors.length; i++) {
                                        error_msg += errors[i];
                                    }
                                    this.setState({[`error_${name}`]: error_msg});
                                }

                                // Additionally, match password and password re-enter
                                if (data !== '') {
                                    if (value !== data) {
                                        this.setState({error_password_re: 'Password does not match password re-enter'});
                                    } else {
                                        this.setState({error_password_re: 'no errors!'});
                                    }
                                }
                            }
                        }
                    );
                    break;
                case 'password_re':
                    if (this.state.password_re === '') {
                        this.setState({error_password_re: ''});
                    } else {
                        if (this.state.password_re !== this.state.password) {
                            this.setState({error_password_re: 'Password does not match password re-enter'});
                        } else {
                            this.setState({error_password_re: 'no errors!'});
                        }
                    }
                    break;
            }
        });
    }


    /* ********** VALIDATE EMAIL ********** */

    validateEmail(em) {
        /* Validate email is an async function

         */
        emValidation(em).then(

        )
    }

    /* ********** HANDLE PASSWORD RE-ENTER ********** */

    handlePwReChange(e) {
        /* The validation process for re-typing password is different from inputting email or password,
           hence we need a different handling function
         */

        this.setState({
            password_re: e.target.value
        }, () => {
            if (this.state.password_re === this.state.password) {
                console.log('no errors');
                this.setState({password_re_error: 'no errors!'});
            } else {
                console.log('The re-typed password does not match the password.');
                this.setState({password_re_error: 'The re-typed password does not match the password.'});
            }
        });
    }

    /* ********** HANDLE SUBMISSION ********** */

    handleSubmit(e) {
        alert(`email: ${this.state.email}\n
               password: ${this.state.password}`);
        e.preventDefault();
    }

    render() {
        return (
            <Form elementID="signup-form" elementOnSubmit={this.handleSubmit}>
                <TextInput name="email" title="Email" placeholder="Enter your email" value={this.state.email} handleChange={this.handleEmPwChange} />
                <ErrorBox elementID="error-box-signup-email" content={this.state.error_email} />

                <TextInput name="password" title="Password" placeholder="Enter your password" value={this.state.password} handleChange={this.handleEmPwChange} />
                <ErrorBox elementID="error-box-signup-password" content={this.state.error_password} />

                <TextInput name="password_re" title="Password (re-enter)" placeholder="Re-enter your password" value={this.state.password_re} handleChange={this.handleEmPwChange} />
                <ErrorBox elementID="error-box-signup-password-re" content={this.state.error_password_re} />

                <input className="input-submit-btn" type="submit" value="Sign Up" />
            </Form>
        )
    }
}

export default SignUpForm