// @flow

import * as React from 'react';

import '../css/body.css';

export default class Body extends React.Component<{children: React.Node}> {
    render() {
        const {children} = this.props;
        return (
            <section id="index-body">
                {children}
            </section>
        )

    }
}
