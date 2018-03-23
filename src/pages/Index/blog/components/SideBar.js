'use strict';

import React, {PureComponent} from 'react';

function Layer(props) {
    return (
        <section>
            {props.children}
        </section>
    )
}

class SideBar extends PureComponent {
    

    render() {
        return (
            <div className='blog-sidebar'>

            </div>
        )
    }
}

export default SideBar