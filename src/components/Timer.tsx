import { useApp } from 'context/AppContext';
import React, { useEffect, useState } from 'react';

function Timer() {
  const { time, setTime, gameState } = useApp();
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (gameState === 'STARTED') {
  //       setTime((old) => old + 1);
  //     }
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [gameState]);
  return <div className="badge">{time}s</div>;
}

export default Timer;
