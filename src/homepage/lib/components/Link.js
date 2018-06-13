'use strict';

import React from 'react';

function Link(props) {
    return (
        <a href={props.href} target='_blank'>
            {props.text}
        </a>
    )
}

export default Link