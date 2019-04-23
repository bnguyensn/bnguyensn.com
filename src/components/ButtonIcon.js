// @flow

import React from 'react';
import '../styles/button.css';
import '../styles/colors.css';
import type { COLORS } from '../types/colors';

type ButtonType = {
  icon: string,

  // Recommended for accessibility purpose.
  // Default to icon text (which might not be descriptive at times).
  title?: string,

  // Button's background color. Default to transparent.
  color?: COLORS,

  className?: string,
  action: any => any,
  actionParams?: [],
};

export default function ButtonIcon({
  icon,
  title,
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
      title={title || icon}
      aria-label={title || icon}
      {...rest}
    >
      <i className="material-icons" aria-hidden>
        {icon}
      </i>
    </div>
  );
}
