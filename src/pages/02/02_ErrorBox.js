import React from 'react';

function ErrorBox(props) {
    return (
        <div id={props.elementID} className="error-box">
            {props.content}
        </div>
    )
}

export default ErrorBox