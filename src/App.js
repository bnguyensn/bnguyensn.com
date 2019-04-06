// @flow

import {hot} from 'react-hot-loader';
import * as React from 'react';
import { Router, Link } from '@reach/router';
import Loadable from 'react-loadable';
import './styles/app.css';
import './styles/global.css';
import Landing from './components/Landing';
import FourOhFour from './components/404';
import Loading from './components/Loading';
import { MIcon } from './lib/components/MIcon';
import getRandNumBtw from './lib/utils/getRandNumBtw';

/** ********** REACT LOADABLE ********** **/

const Projects = Loadable({
  loader: () => import('./components/Projects'),
  loading: Loading,
});

const Contact = Loadable({
  loader: () => import('./components/Contact'),
  loading: Loading,
});

/** ********** BACKGROUND ********** **/

type BackgroundProps = {
  children?: React.Node,
};

type BackgroundStates = {
  hueDeg: number,
};

class Background extends React.PureComponent<
  BackgroundProps,
  BackgroundStates
> {
  timerId: IntervalID;

  constructor(props: BackgroundProps) {
    super(props);
    this.state = {
      hueDeg: Math.round(getRandNumBtw(0, 359)),
    };
  }

  /** ********** LIFECYCLE ********** **/

  componentDidMount() {
    this.timerId = setInterval(this.tick, 1000);
  }

  /** ********** FUNCTIONALITY ********** **/

  tick = () => {
    this.setState(prevState => ({
      hueDeg: prevState.hueDeg === 359 ? 0 : prevState.hueDeg + 1,
    }));
  };

  /** ********** RENDER ********** **/

  render() {
    const { children } = this.props;
    const { hueDeg } = this.state;
    const appStyle = {
      backgroundColor: `hsl(${hueDeg}, 50%, 80%`,
    };
    return (
      <div id="app-bkg" style={appStyle}>
        {children}
      </div>
    );
  }
}

/** ********** NAV LINKS ********** **/

function NavLink(props) {
  return (
    <Link
      {...props}
      getProps={({ isCurrent }) => ({
        className: isCurrent ? 'active' : '',
      })}
    />
  );
}

/** ********** NAV BAR ********** **/

type NavBarStates = {
  windowWidth: number,
};

class NavBar extends React.PureComponent<{}, NavBarStates> {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: 0,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.windowResized);
    this.setState({
      windowWidth: window.innerWidth,
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.windowResized);
  }

  windowResized = () => {
    this.setState({
      windowWidth: window.innerWidth,
    });
  };

  render() {
    const { windowWidth } = this.state;
    const smallWindow = windowWidth < 400;

    return (
      <nav id="navbar" className="app-section">
        <NavLink to="/">{smallWindow ? <MIcon icon="home" /> : 'HOME'}</NavLink>
        <NavLink to="/projects">
          {smallWindow ? <MIcon icon="weekend" /> : 'PROJECTS'}
        </NavLink>
        <NavLink to="/contact">
          {smallWindow ? <MIcon icon="email" /> : 'CONTACT'}
        </NavLink>
      </nav>
    );
  }
}

/** ********** MAIN COMPONENT ********** **/

function App() {
  return (
    <div className="app-section">
      <NavBar path="/" />
      <Router>
        <Landing path="/" />
        <Projects path="/projects" />
        <Contact path="/contact" />
        <FourOhFour default />
      </Router>
    </div>
  );
}

export default hot(module)(App)
