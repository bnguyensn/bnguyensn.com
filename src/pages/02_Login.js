import React, {Component} from 'react';

import LoginForm from './02_LoginForm';
import SignUpForm from './02_SignUpForm';


class Login extends Component {
    render() {
        return(
            <div id='login-container'>
                <span id="login-title">Please log in or sign up</span>
                <SignUpForm />
            </div>
        )
    }
}

export default Login