// @flow

import React from 'react';
import '../styles/input-text.css';

type TextInputTypes = {
  labelText: string,
};

export default function TextInput({ labelText, ...rest }: TextInputTypes) {
  return (
    <div className="input-text" {...rest}>
      <label>
        {labelText}
        <br />
        <input type="text" />
      </label>
    </div>
  );
}
