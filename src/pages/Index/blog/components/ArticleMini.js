'use strict';

import React, {PureComponent} from 'react';
import '../blog.css';

function ShowMoreButton(props) {
    return (
        <button type='button'>...</button>
    )
}

class Article extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='article-mini-canvas'>
                <div className='article-mini-content'>
                    <h2 className='article-mini-title'>{this.props.data.title}</h2>
                    <section className='article-mini-timestamp'>{this.props.data.timestamp}</section>
                    <section className='article-mini-body'>
                        {this.props.data.body}
                        <ShowMoreButton />
                    </section>
                </div>
            </div>
        )
    }
}

export default Article