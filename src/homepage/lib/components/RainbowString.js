// @flow

import * as React from 'react';

type PropTypes = {
    s: string
}

function RainbowString(props: PropTypes) {
    const {s} = props;

    return (
        <span>
            {s}
        </span>
    )
}

export default RainbowString
