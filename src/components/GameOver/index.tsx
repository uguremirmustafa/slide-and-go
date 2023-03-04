import { useApp } from 'context/AppContext';
import { useModal } from 'context/ModalContext';
import React, { useEffect } from 'react';
import { Tile } from 'types';
import { getTiles } from 'utils/helpers';

interface IProps {
  setTiles: React.Dispatch<React.SetStateAction<Tile[]>>;
}

function GameOver(props: IProps) {
  const { setTiles } = props;
  const { time, difficulty, history, setTime, setHistory, setGameState, gameState } = useApp();
  const { setModal, modal } = useModal();
  const moveCount = history.length;

  function startGame() {
    // reset all parameters, close modal and start game
    setModal(null);
    setTime(0);
    setHistory([]);
    setTiles(getTiles(difficulty));
    setGameState('IDLE');
  }

  // useEffect(() => {
  //   if (!modal && gameState === 'OVER') {
  //     setGameState('IDLE');
  //   }
  // }, [!!modal]);

  return (
    <div>
      <div>
        Finished in <span className="text-purple-600">{time}</span> seconds
      </div>
      <div>
        and moved <span className="text-purple-600">{moveCount}</span> times.
      </div>
      <button className="btn w-full mt-4" onClick={startGame}>
        restart
      </button>
    </div>
  );
}

export default GameOver;
