import React, {Component} from 'react';

function ErrorBox(props) {
    return (
        <div id={props.elementID} className="error-box">
            {props.content}
        </div>
    )
}

class InputText extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.handleChange(e);
    }

    render() {
        return (
            <div>
                <label>
                    <span>{this.props.name}</span>
                    <input  type="text"
                            name={this.props.name}
                            placeholder={this.props.placeholder}
                            value={this.props.value}
                            onChange={this.handleChange} />
                </label>
                <span><i className="material-icons green">check_box</i></span>
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

class FormLogin extends Component {
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
            <Form elementID="form-login" elementOnSubmit={this.handleSubmit}>
                <InputText name="email" placeholder="Enter your email" value={this.state.email} handleChange={this.handleChange} />
                <ErrorBox elementID="error-box-email" content={this.state.errorEmail} />
                <InputText name="password" placeholder="Enter your password" value={this.state.password} handleChange={this.handleChange} />
                <ErrorBox elementID="error-box-password" content={this.state.errorPassword} />
                <input type="submit" value="Log In" />
            </Form>
        )
    }
}

class Login extends Component {
    render() {
        return(
            <div id='login-container'>
                <span>Please log in or sign up</span>
                <FormLogin />
            </div>
        )
    }
}

export default Login