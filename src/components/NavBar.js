// @flow

import React from 'react';
import NavBarButton from './NavBarButton';
import '../styles/navbar.css';

export default function NavBar() {
  return (
    <nav className="navbar-main">
      <ul className="navbar-main-ul">
        <NavBarButton>About</NavBarButton>
        <NavBarButton>Blog</NavBarButton>
        <NavBarButton>Projects</NavBarButton>
        <NavBarButton>Contact</NavBarButton>
      </ul>
    </nav>
  );
}
