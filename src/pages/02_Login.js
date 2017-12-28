import React, {Component} from 'react';

import LoginForm from './02_LoginForm';
import SignUpForm from './02_SignUpForm';


class Login extends Component {
    render() {
        return(
            <div>
                <SignUpForm />
            </div>
        )
    }
}

export default Login