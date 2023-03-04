import { PauseIcon, PlayIcon, RestartIcon, SettingsIcon } from 'assets/icons';
import { useApp } from 'context/AppContext';
import { useModal } from 'context/ModalContext';
import React from 'react';
import { Tile } from 'types';
import { getTiles } from 'utils/helpers';

interface IProps {
  setTiles: React.Dispatch<React.SetStateAction<Tile[]>>;
}

function Controller(props: IProps) {
  const { setTiles } = props;
  const { gameState, setGameState, setTime, setHistory, difficulty } = useApp();
  const { modal, setModal } = useModal();

  function pauseGame() {
    // pause game, timer will stop immediately
    setGameState('PAUSED');
  }

  function continueGame() {
    // continue game, don't touch parameters
    setGameState('STARTED');
  }
  function startGame() {
    // reset all parameters and start game
    setTime(0);
    setHistory([]);
    setTiles(getTiles(difficulty));
    setGameState('IDLE');
  }
  function restartGame() {
    // ask user if he/she is sure to leave current game and run startGame()
    setModal({ title: 'Restart game', type: 'RESTART' });
  }

  function openSettings() {
    setModal({ type: 'SETTINGS', title: 'Settings' });
  }

  const settingsButtonDisabled = gameState === 'STARTED';

  return (
    <div className="flex flex-col w-full bg-gray-700/30 ring-8 rounded ring-gray-700/30">
      <div className="flex w-full justify-center gap-3">
        {gameState === 'PAUSED' && (
          <button className="btn w-full" onClick={continueGame}>
            <PlayIcon />
          </button>
        )}
        {gameState === 'OVER' && (
          <button className="btn w-full" onClick={startGame}>
            <PlayIcon />
          </button>
        )}
        {gameState === 'STARTED' && (
          <button className="btn w-full" onClick={pauseGame}>
            <PauseIcon />
          </button>
        )}
        {gameState === 'STARTED' && (
          <button className="btn w-full" onClick={restartGame}>
            <RestartIcon />
          </button>
        )}
        <button className="btn w-full" onClick={openSettings} disabled={settingsButtonDisabled}>
          <SettingsIcon />
        </button>
      </div>
      {/* {gameState} */}
    </div>
  );
}

export default Controller;
