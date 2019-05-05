// @flow

import * as React from 'react';

type ButtonProps = {
  action: () => any,
  actionParams?: any[],
  children?: React.Node,
};

export default function Button({
  action,
  actionParams,
  children,
  ...rest
}: ButtonProps) {
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
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      {...rest}
    >
      {children}
    </div>
  );
}
