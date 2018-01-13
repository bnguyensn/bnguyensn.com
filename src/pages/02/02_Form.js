import React from 'react';

function Form(props) {
    return (
        <form id={props.elementID} onSubmit={props.elementOnSubmit}>
            {props.children}
        </form>
    )
}

export default Form