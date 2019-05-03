// @flow

import React, { useState } from 'react';
import '../styles/input-text.css';

type TextInputTypes = {
  labelText: string,
};

export default function TextInputAMA({
  labelText,
  action,
  ...rest
}: TextInputTypes) {
  const [inputValue, setInputValue] = useState('');
  const [inputBoxBkgColor, setInputBoxBkgColor] = useState('');

  const INPUT_BOX_BKG_COLORS = {
    good: '#a5d6a7', // Green 200
    bad: '#ef9a9a', // Red 200
  };

  const handleAction = () => {
    // ***** BACkEND ***** //

    // Submit to database
    // API calls here...

    // ***** FRONTEND ***** //

    // Clear input text
    setInputValue('');

    // Flash the input box
  };

  const handleKeyDown = (e: SyntheticKeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAction();
    }
  };

  const handleInput = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const target = e.target;
    const value = target.value;

    setInputValue(value);
  };

  return (
    <div className="input-text" {...rest}>
      <label>
        {labelText}
        <br />
        <input
          type="text"
          value={inputValue}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
        />
      </label>
    </div>
  );
}
