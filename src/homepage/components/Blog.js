// @flow

import * as React from 'react';

import '../css/blog.css';

type SetCurPgFuncType = (newCurPg: string) => void;

export default class Blog extends React.PureComponent<{setCurPg: SetCurPgFuncType}> {
    componentDidMount() {
        const {setCurPg} = this.props;
        setCurPg('/blog');
    }

    render() {
        return (
            <section id="body-blog">
                BLOG
            </section>
        )
    }
}
