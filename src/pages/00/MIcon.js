import React from 'react';

function MIcon(props) {
    return (
        <span className='micon-container'>
            <i className='material-icons'>{props.icon}</i>
        </span>
    )
}

export default MIcon