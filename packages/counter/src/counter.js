// @flow

import React, { useState, useEffect } from 'react';
import useInterval from './useInterval';
import Button from '../../ui/button/Button';

type CounterProps = {
  initialCount?: number,
  initialDelay?: number,
  initialPlaying?: boolean,
};

export default function Counter({
  initialCount = 0,
  initialDelay = 1000,
  initialPlaying = true,
}: CounterProps) {
  const [count, setCount] = useState(initialCount);
  const [delay, setDelay] = useState(initialDelay);
  const [playing, setPlaying] = useState(initialPlaying);

  /** ********** LOGIC ********** **/

  useInterval(() => {
    setCount(count + 1);
  }, playing ? delay : null);

  /** ********** INTERACTION ********** **/

  const handleDelayChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    if (Number.isInteger(e.target.value)) {
      setDelay(e.target.value);
    }
  };

  const handlePlayingChange = () => {
    setPlaying(!playing);
  };

  /** ********** RENDER ********** **/

  return (
    <div>
      <div>{count}</div>
      <div>
        <label>
          Delay:
          <br />
          <input type="number" value={delay} onInput={handleDelayChange} />
        </label>
        <Button action={handlePlayingChange}>
          Play / Pause
        </Button>
      </div>
    </div>
  );
}
