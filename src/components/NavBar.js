// @flow

import React from 'react';
import NavBarButton from './NavBarButton';
import '../styles/navbar.css';
import ButtonIcon from './ButtonIcon';

export default function NavBar() {
  return (
    <nav className="navbar-main">
      <ul className="navbar-main-ul">
        <NavBarButton>About</NavBarButton>
        <NavBarButton>Blog</NavBarButton>
        <NavBarButton>Projects</NavBarButton>
        <NavBarButton>Contact</NavBarButton>
      </ul>
      <ButtonIcon className="navbar-main-menubtn" icon="menu" action={() => {}} />
    </nav>
  );
}
