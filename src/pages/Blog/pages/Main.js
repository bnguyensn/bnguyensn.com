'use strict';

import React, {Component} from 'react';

import {get, post} from '../js/xhr';

const CREATE_USER_URL = '/blog/api/createuser';
const LOGIN_URL = '/blog/api/login';
const LOGIN_URL_TOKEN = '/blog/api/logintoken';
const LOGIN_URL_CLEARCOOKIES = '/blog/api/clearlogincookies';

class Main extends Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitCreateUser = this.submitCreateUser.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
        this.clearCookies = this.clearCookies.bind(this);
        this.state = {
            logged_in: false,
            username: '',
            pwd: '',
            res: '',
        };
    }

    async componentDidMount() {
        try {

            // Login token is stored in a cookie, and is thus sent by the client by default
            // The cookie's path is specified such that the cookie is only sent for requests to LOGIN_URL_TOKEN

            if (await post(LOGIN_URL_TOKEN, 'empty')) {

                console.log('Automatic log in successful');
                console.log(`Available cookies: ${document.cookie}`);

                // Render logged in page
                this.setState({
                    logged_in: true
                });
            } else {

                // Render login page, which is the default
                console.log(`Token invalid.`);
            }
        }
        catch (e) {
            console.log(`Could not automatically log in because: ${e}`)
        }
    }

    handleInputChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });
    }

    async submitCreateUser() {
        try {
            const inserted_user_id = await post(CREATE_USER_URL, `username=${this.state.username}&pwd=${this.state.pwd}`);

            // Remove existing token
            localStorage.removeItem('loginid');

            this.setState({
                res: `Success! Inserted user at ID ${inserted_user_id}.`
            });
        }
        catch (e) {
            console.log(`Some error happened! Error message: ${e}`);
            this.setState({
                res: `Some error happened! Error message: ${e}`
            });
        }
    }

    async submitLogin() {
        try {
            const token = await post(LOGIN_URL, `username=${this.state.username}&pwd=${this.state.pwd}`);

            this.setState({
                res: `Success! Token: ${token}; Cookies: ${document.cookie}`
            });
        }
        catch (e) {
            this.setState({
                res: `Some error happened! Error message: ${e}`
            });
        }
    }

    async clearCookies() {
        try {
            const r = await get(LOGIN_URL_CLEARCOOKIES);

            this.setState({
                res: `Cookies successfully cleared. r = ${r}`
            });
        }
        catch (e) {
            this.setState({
                res: `Some error happened! Error message: ${e}`
            });
        }
    }

    render() {
        return (
            <div className='main-canvas'>
                <label>
                    <span>Username: </span>
                    <input name='username' type='text' value={this.state.username} onChange={this.handleInputChange} />
                </label>
                <br/>
                <label>
                    <span>Password: </span>
                    <input name='pwd' type='password' value={this.state.pwd} onChange={this.handleInputChange} />
                </label>
                <br/>
                <button onClick={this.submitCreateUser}>Create User!</button>
                <br/>
                <button onClick={this.submitLogin}>Login!</button>
                <br/>
                <button onClick={this.clearCookies}>Clear Cookies!</button>
                <br/>
                <span>{this.state.res}</span>
                <br/>
                <span>{`Logged in state: ${this.state.logged_in}`}</span>
            </div>
        )
    }
}

export default Main