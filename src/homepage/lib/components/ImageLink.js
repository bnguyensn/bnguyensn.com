// @flow

import * as React from 'react';
import {Link} from '@reach/router';

import './image-link.css';

type ImageLinkProps = {
    src: string,
    alt: string,
    href: string,
}

function ImageLink(props: ImageLinkProps) {
    const {src, alt, href} = props;
    return (
        <div className='img-link-container'>
            <Link to={href}>
                <img src={src} alt={alt} {...props} />
            </Link>
        </div>
    )
}

export default ImageLink
