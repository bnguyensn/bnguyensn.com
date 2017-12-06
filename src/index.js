import React from 'react';
import ReactDOM from 'react-dom';

import Home from './pages/010_home';

import './css/index.css';

ReactDOM.render(
    <div>
        <Home />
    </div>,
    document.getElementById('root')
);


// const render = Component => {
//     ReactDOM.render(
//             <Component />
//         document.getElementById('root')
//     );
// };

// render(Home);
//
// // Webpack Hot Module Replacement API
// if (module.hot) {
//     module.hot.accept('./pages/010_home', () => {
//         render(Home);
//     });
// }

// To make this React Hot Module Replacement work, you'll need to opt out of
// Babel transpiling ES2015 modules by changing the Babel ES2015 preset to be
// ["es2015", { "modules": false }]
