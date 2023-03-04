import Modal from 'components/Modal';
import Settings from 'components/Settings';
import GameOver from 'components/GameOver';
import Box from 'components/Box';
import { useApp } from 'context/AppContext';
import { useModal } from 'context/ModalContext';
import { useEffect } from 'react';
import { getDirection, getTileKey, getTiles, move } from './utils/helpers';
import useTiles from 'hooks/useTiles';
import Controller from 'components/Controller';
import Confirm from 'components/Confirm';
import ScoreBoard from 'components/ScoreBoard';
import Keyboard from 'components/Keyboard';

function App() {
  const { difficulty, gameState, setGameState, tileSize, setTime, setHistory } = useApp();
  const { modal, setModal } = useModal();

  const { tiles, setTiles } = useTiles();

  function handlePress(event: KeyboardEvent) {
    event.preventDefault();
    const direction = getDirection(event);
    if (direction && !modal) {
      setGameState('STARTED');
      move(direction, tiles, setTiles, difficulty, setHistory, setGameState);
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handlePress);
    return () => window.removeEventListener('keydown', handlePress);
  }, [handlePress]);

  useEffect(() => {
    setTime(0);
    setHistory([]);
    setGameState('IDLE');
    const correctLayout = getTiles(difficulty);
    setTiles(correctLayout);
  }, [difficulty]);

  useEffect(() => {
    if (gameState === 'OVER') {
      setModal({ type: 'GAMEOVER', title: 'Game over' });
    }
  }, [gameState]);

  return (
    <>
      <Modal>
        {modal?.type === 'INFO' && <Keyboard />}
        {modal?.type === 'RESTART' && <Confirm setTiles={setTiles} />}
        {modal?.type === 'SETTINGS' && <Settings />}
        {modal?.type === 'GAMEOVER' && <GameOver setTiles={setTiles} />}
      </Modal>
      <div
        className="app flex flex-col gap-6 p-2 !pt-5"
        data-difficulty={difficulty}
        data-size={tileSize}
      >
        <ScoreBoard />
        <div className="container bg-gray-700/30 ring-4 ring-gray-700/30">
          {tiles.map((t) => {
            if (t.val === difficulty * difficulty) {
              return <Box tile={t} key={getTileKey(t)} isEmpty />;
            }
            return <Box tile={t} key={getTileKey(t)} />;
          })}
        </div>
        <Controller setTiles={setTiles} />
      </div>
    </>
  );
}

export default App;
