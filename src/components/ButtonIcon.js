// @flow

import React from 'react';
import '../styles/button.css';
import '../styles/colors.css';
import type {COLORS} from '../types/colors';

type ButtonType = {
  icon: string,
  color?: COLORS,
  className?: string,
  action: any => any,
  actionParams?: [],
};

export default function ButtonIcon({
  icon,
  color,
  className,
  action,
  actionParams,
  ...rest
}: ButtonType) {
  const handleAction = () => {
    if (actionParams && Array.isArray(actionParams)) {
      action([...actionParams]);
    }

    action();
  };

  const handleClick = () => {
    handleAction();
  };

  const handleKeyDown = (e: SyntheticKeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleAction();
    }
  };

  return (
    <div
      className={`button ${color || ''} ${className || ''}`.trim()}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      {...rest}
    >
      <i className="material-icons">{icon}</i>
    </div>
  );
}
