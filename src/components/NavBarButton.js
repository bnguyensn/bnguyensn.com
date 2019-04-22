// @flow

import * as React from 'react';

type NavBarButtonType = {
  children?: React.Node,
};

export default function NavBarButton({ children }: NavBarButtonType) {
  return (
    <li className="navbar-main-li">
      <a className="navbar-main-li-a" href="#">
        {children}
      </a>
    </li>
  );
}
