import { useApp } from 'context/AppContext';
import { useModal } from 'context/ModalContext';
import React from 'react';
import { Tile } from 'types';
import { getTiles } from 'utils/helpers';

interface IProps {
  setTiles: React.Dispatch<React.SetStateAction<Tile[]>>;
}

function Confirm(props: IProps) {
  const { setTiles } = props;
  const { setGameState, setTime, setHistory, difficulty } = useApp();
  const { setModal } = useModal();

  function cancelRestartProcess() {
    setModal(null);
    setGameState('STARTED');
  }

  function restartGame() {
    setTiles(getTiles(difficulty));
    setHistory([]);
    setTime(0);
    setModal(null);
    setGameState('IDLE');
  }

  return (
    <div>
      <div>
        <p className="text-purple-600">Your progress will be lost!</p>
        <p>Do you want to restart the game?</p>
      </div>
      <div className="flex gap-2 mt-4">
        <button className="btn-outline w-full" onClick={cancelRestartProcess}>
          no
        </button>
        <button className="btn w-full" onClick={restartGame}>
          yes
        </button>
      </div>
    </div>
  );
}

export default Confirm;
