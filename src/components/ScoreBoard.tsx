import { SettingsIcon } from 'assets/icons';
import { useApp } from 'context/AppContext';
import React from 'react';
import Timer from './Timer';

function ScoreBoard() {
  const { setGameState, gameState } = useApp();
  function restartGame() {
    setGameState('IDLE');
  }
  function startGame() {
    setGameState('STARTED');
  }
  function pauseGame() {
    setGameState('PAUSED');
  }

  return (
    <div className="scoreboard">
      {(gameState === 'STARTED' || gameState === 'IDLE') && (
        <button className="btn btn-lg" onClick={restartGame}>
          New Game
        </button>
      )}
      {/* {gameState === 'PAUSED' && <button className="btn btn-lg" onClick={restartGame}></button>} */}
      <div className="flex">
        <Timer />
        <button className="icon-btn">
          <SettingsIcon />
        </button>
      </div>
    </div>
  );
}

export default ScoreBoard;
