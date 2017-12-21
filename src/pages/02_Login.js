import React, {Component} from 'react';

import pwValidation from './02_pwValidation';

function ErrorBox(props) {
    return (
        <div id={props.elementID} className="error-box">
            {props.content}
        </div>
    )
}

class TextInput extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.handleChange(e);
    }

    render() {
        return (
            <div className="input-text-container">
                <label className="input-label">
                    <span className="input-label-title">{this.props.title}</span>
                    <input  className="input-label-input"
                            type="text"
                            name={this.props.name}
                            placeholder={this.props.placeholder}
                            value={this.props.value}
                            onChange={this.handleChange} />
                </label>
                <i className="input-check material-icons green">check_box</i>
            </div>
        )
    }
}

function Form(props) {
    return (
        <form id={props.elementID} onSubmit={props.elementOnSubmit}>
            {props.children}
        </form>
    )
}

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorEmail: 'test error email',
            errorPassword: 'test error password'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const value = e.target.value;
        const name = e.target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(e) {
        alert(`email: ${this.state.email}\n
               password: ${this.state.password}`);
        e.preventDefault();
    }

    render() {
        return (
            <Form elementID="login-form" elementOnSubmit={this.handleSubmit}>
                <TextInput name="email" title="Email" placeholder="Enter your email" value={this.state.email} handleChange={this.handleChange} />
                <ErrorBox elementID="error-box-login-email" content={this.state.errorEmail} />
                <TextInput name="password" title="Password" placeholder="Enter your password" value={this.state.password} handleChange={this.handleChange} />
                <ErrorBox elementID="error-box-login-password" content={this.state.errorPassword} />
                <input className="input-submit-btn" type="submit" value="Log In" />
            </Form>
        )
    }
}

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