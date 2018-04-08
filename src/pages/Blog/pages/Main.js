'use strict';

import React, {Component} from 'react';
import {get} from '../js/xhr';

const LOGIN_URL_TOKEN = '/blog/api/logintoken';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'Loading...',
        }
    }

    async componentDidMount() {
        try {

            // Login token is stored in a cookie, and is thus sent by the client by default
            // The cookie's path is specified such that the cookie is only sent for requests to LOGIN_URL_TOKEN

            await get(LOGIN_URL_TOKEN);

            const dashboardModule = await import(/* webpackChunkName: "dashboard" */ './Dashboard');
            const DashboardComponent = dashboardModule.default;

            this.setState({
                page: <DashboardComponent />
            });
        }
        catch (e) {
            // If any error occurs - show login

            const loginModule = await import(/* webpackChunkName: "authentication" */ './Authentication');
            const LoginComponent = loginModule.default;

            this.setState({
                page: <LoginComponent />
            });
        }
    }

    render() {
        return (
            <div className='main-canvas'>
                {this.state.page}
            </div>
        )
    }
}

export default Main