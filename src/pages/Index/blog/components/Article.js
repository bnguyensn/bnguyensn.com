'use strict';

import React, {PureComponent} from 'react';
import '../blog.css';


class Article extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='article-canvas'>
                <div className='article-content'>
                    <h2 className='article-title'>{this.props.data.title}</h2>
                    <section className='article-timestamp'>{this.props.data.timestamp}</section>
                    <section className='article-body'>{this.props.data.body}</section>
                </div>
            </div>
        )
    }
}

export default Article