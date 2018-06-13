import * as React from 'react';

type Props = {
    children: React.Node
}

function Button(props: Props) {
    return (
        <div role='button' tabIndex={0}>
            {props.children}
        </div>
    )
}

export default Button