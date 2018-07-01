// @flow

import React, {PureComponent} from 'react';

import './image-link.css';

/**
 * Things to define:
 * <img>: src, alt
 * <a>: href
 * */
type Props = {
    src: string,
    alt: string,
    href: string,
}

class ImageLink extends PureComponent<Props> {
    render() {
        return (
            <div className='img-link-container'>
                <a href={this.props.href}>
                    <img src={this.props.src} alt={this.props.alt} {...this.props} />
                </a>
            </div>
        )
    }
}

export default ImageLink