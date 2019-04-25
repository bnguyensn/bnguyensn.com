// @flow

import * as React from 'react';

type NavBarButtonType = {
  children?: React.Node,
};

export default function NavBarButton({ children }: NavBarButtonType) {
  return (
    <li className="navbar-li">
      <a className="navbar-li-a" href="#">
        {children}
      </a>
    </li>
  );
}
