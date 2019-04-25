// @flow

import React, { useState } from 'react';
import NavBarButton from './NavBarButton';
import ButtonIcon from './ButtonIcon';
import '../styles/navbar.css';

export default function NavBar() {
  const [sideNavBarExpanded, toggleSideNavBarExpanded] = useState(false);

  const toggleSideNavBar = () => {
    toggleSideNavBarExpanded(!sideNavBarExpanded);
  };

  return (
    <nav className="navbar">
      <ul className="navbar-ul-top">
        <NavBarButton>About</NavBarButton>
        <NavBarButton>Blog</NavBarButton>
        <NavBarButton>Projects</NavBarButton>
        <NavBarButton>Contact</NavBarButton>
      </ul>
      <ul
        className={`navbar-ul-side ${
          sideNavBarExpanded ? 'expanded' : 'collapsed'
        }`.trim()}
      >
        <NavBarButton>About</NavBarButton>
        <NavBarButton>Blog</NavBarButton>
        <NavBarButton>Projects</NavBarButton>
        <NavBarButton>Contact</NavBarButton>
      </ul>
      <ButtonIcon
        className="navbar-menubtn"
        icon={sideNavBarExpanded ? 'close' : 'menu'}
        title={
          sideNavBarExpanded ? 'Hide navigation menu' : 'Show navigation menu'
        }
        action={toggleSideNavBar}
      />
    </nav>
  );
}
