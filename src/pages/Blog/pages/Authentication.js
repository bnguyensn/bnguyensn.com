'use strict';

import React, {PureComponent} from 'react';
import {post} from "../js/xhr";

const LOGIN_URL = '/blog/api/login';

function SignUpForm(props) {
    return (
        <div className='signup-canvas'>
            // TODO:
        </div>
    )
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

class Authentication extends PureComponent {
    render() {
        return (
            <div className='auth-canvas'>

            </div>
        )
    }
}

export default Authentication