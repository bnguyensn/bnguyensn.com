'use strict';

import React, {PureComponent} from 'react';
import {post} from "../js/xhr";

const LOGIN_URL = '/blog/api/login';
const SIGNUP_URL = '/blog/api/signup';

class SignUpForm extends PureComponent {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitSignUp = this.submitSignUp.bind(this);
        this.state = {
            username: '',
            pwd: '',
            status: ''
        };
    }

    handleInputChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });
    }

    async submitSignUp() {
        try {
            await post(SIGNUP_URL, `username=${this.state.username}&pwd=${this.state.pwd}`);

            this.setState({
                res: `Success! Inserted user at ID ${insertedUserId}.`
            });
        }
        catch (e) {
            console.log(`Some error happened! Error message: ${e}`);
            this.setState({
                res: `Some error happened! Error message: ${e}`
            });
        }
    }

    render() {
        return (
            <div className='signup-canvas'>
                <label className='auth-label'>
                    <span>Username</span>
                    <input name='username' type='text'
                           value={this.state.username}
                           onChange={this.handleInputChange} />
                </label>
                <label className='auth-label'>
                    <span>Password</span>
                    <input name='pwd' type='password'
                           value={this.state.pwd}
                           onChange={this.handleInputChange} />
                </label>
                <br/>
                <div className='auth-btn' onClick={this.submitSignUp}>SIGN UP</div>
            </div>
        )
    }
}

class LoginForm extends PureComponent {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
        this.state = {
            username: '',
            pwd: '',
            status: ''
        };
    }

    handleInputChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });
    }

    /**
     * This is used only when the cookie token does not exist / is invalid
     * The login form (and to a larger extent, this whole <Authentication /> compoent
     * should not appear if the cookie token exists and is valid
     * */
    async submitLogin() {
        try {
            await post(LOGIN_URL, `username=${this.state.username}&pwd=${this.state.pwd}`);

            // If successful, the above will send a login token within a cookie
            // This cookie is then used for future logins to skip this manual login step
            // until the user signs out, or the cookie is cleared

            // Show user's dashboard on successful login
            this.props.showDashboard();
        }
        catch (e) {
            this.setState({
                status: `Login failed: ${e}`
            });
        }
    }

    render() {
        return (
            <div className='login-canvas'>
                <label className='auth-label'>
                    <span>Username</span>
                    <input name='username' type='text'
                           value={this.state.username}
                           onChange={this.handleInputChange} />
                </label>
                <label className='auth-label'>
                    <span>Password</span>
                    <input name='pwd' type='password'
                           value={this.state.pwd}
                           onChange={this.handleInputChange} />
                </label>
                <br/>
                <div className='auth-btn' onClick={this.submitLogin}>LOGIN</div>
            </div>
        )
    }
}

function AuthFormSelectionHeader(props) {
    return (
        <div className='auth-form-sel-header' onClick={props.handleSwitchAuthForm}>
            {props.label}
        </div>
    )
}

class Authentication extends PureComponent {
    constructor(props) {
        super(props);
        this.switchAuthForm = this.switchAuthForm.bind(this);
        this.authFormIndex = {
            login: <LoginForm />,
            signup: <SignUpForm />
        };
        this.state = {
            authForm: 'login',
            statusText: ''
        };
    }

    switchAuthForm(authForm) {
        this.setState({
            authForm: authForm
        });
    }

    render() {
        return (
            <div className='auth-canvas'>
                <AuthFormSelectionHeader label='LOGIN' handleSwitchAuthForm={this.switchAuthForm} />
                <AuthFormSelectionHeader label='SIGN UP' handleSwitchAuthForm={this.switchAuthForm} />
                <div className='auth-form'>
                    {this.authFormIndex[this.state.authForm]}
                </div>
                <div className='auth-status-txt'>
                    {this.state.statusText}
                </div>
            </div>
        )
    }
}

export default Authentication