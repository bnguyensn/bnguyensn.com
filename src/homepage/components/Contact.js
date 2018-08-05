// @flow

import * as React from 'react';

import '../css/contact.css';

type SetCurPgFuncType = (newCurPg: string) => void;

export default class Contact extends React.PureComponent<{setCurPg: SetCurPgFuncType}> {
    componentDidMount() {
        const {setCurPg} = this.props;
        setCurPg('/contact');
    }

    render() {
        return (
            <section id="body-contact">
                CONTACT
            </section>
        )
    }
}
