import React, {Component} from 'react';

class SignInForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const t = e.target;
        const v = t.value;
        const n = t.name;

        this.setState({
            [n]: v
        });
    }

    handleSubmit(e) {
        alert(`email: ${this.state.email}\n
               password: ${this.state.password}`);
        e.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    email:
                    <input name="email" type="text" value={this.state.email} onChange={this.handleChange} />
                </label>
                <br/>
                <label>
                    password:
                    <input name="password" type="text" value={this.state.password} onChange={this.handleChange} />
                </label>
                <br/>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

class Login extends Component {
    render() {
        return(
            <div id='login-container'>
                <SignInForm />
            </div>
        )
    }
}

export default Login