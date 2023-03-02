import { SettingsIcon } from 'assets/icons';
import { useApp } from 'context/AppContext';
import { useModal } from 'context/ModalContext';
import React, { useRef } from 'react';
import { Tile } from 'types';
import { getTiles } from 'utils/helpers';
import Timer from './Timer';

interface IProps {
  setTiles: React.Dispatch<React.SetStateAction<Tile[]>>;
  moveCount: number;
}

function ScoreBoard(props: IProps) {
  const { setTiles, moveCount } = props;
  const { setGameState, gameState, difficulty } = useApp();
  const { setModal } = useModal();
  const ref = useRef<HTMLButtonElement>(null);

  function restartGame() {
    setGameState('IDLE');
  }

  function startNewGame() {
    const tiles = getTiles(difficulty);
    setTiles(tiles);
    setGameState('STARTED');
    if (ref.current) {
      ref.current?.blur();
    }
  }
  function pauseGame() {
    setGameState('PAUSED');
  }

  function openSettings() {
    setModal({ type: 'SETTINGS', title: 'Settings' });
  }

  return (
    <div className="scoreboard">
      {(gameState === 'STARTED' || gameState === 'IDLE') && (
        <button className="btn btn-lg" onClick={startNewGame} ref={ref}>
          New Game
        </button>
      )}
      {/* {gameState === 'PAUSED' && <button className="btn btn-lg" onClick={restartGame}></button>} */}
      <div className="flex">
        <Timer />
        <div className="badge">{moveCount}</div>
        <button className="icon-btn" onClick={openSettings}>
          <SettingsIcon />
        </button>
      </div>
    </div>
  );
}

export default ScoreBoard;
