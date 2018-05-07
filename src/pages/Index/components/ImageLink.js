// @flow
'use strict';

import React, {PureComponent} from 'react';

import './image-link.css';

/**
 * Things to define:
 * <img>: src, alt, shape, size
 * <a>: href
 * */
type Props = {
    src: string,
    alt?: string,
    shape?: string,
    size?: string,
    href: string,
}

class ImageLink extends PureComponent<Props> {
    render() {
        const altText = this.props.alt ? this.props.alt : 'An image';
        const imgShape = this.props.shape ? this.props.shape : '';
        const imgSize = this.props.size ? this.props.size : 'medium';
        const imgClass = `${imgSize} ${imgShape}`.trim();

        return (
            <div className='img-link-container'>
                <a href={this.props.href}>
                    <img className={imgClass} src={this.props.src} alt={altText} />
                </a>
            </div>
        )
    }
}

export default ImageLink