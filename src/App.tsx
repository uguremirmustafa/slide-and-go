import 'animate.css';
import { PlayIcon } from 'assets/icons';
import Header from 'components/Header';
import Modal from 'components/Modal';
import ScoreBoard from 'components/ScoreBoard';
import Settings from 'components/Settings';
import TileComponent from 'components/TileComponent';
import { useApp } from 'context/AppContext';
import { useModal } from 'context/ModalContext';
import { useEffect, useState } from 'react';
import { Direction, Tile } from 'types';
import { getTileKey, getTiles, move, shuffle } from './utils/helpers';

function App() {
  const { difficulty, gameState, setGameState, tileSize } = useApp();
  const { modal } = useModal();

  const [tiles, setTiles] = useState<Tile[]>(getTiles(difficulty));
  const [history, setHistory] = useState<Direction[]>([]);
  function startGame() {
    setGameState('STARTED');
  }

  function pauseGame() {
    setGameState('PAUSED');
  }

  function handlePress(event: KeyboardEvent) {
    if (gameState === 'STARTED') {
      let direction: undefined | Direction;
      switch (event.key) {
        case 'ArrowUp':
          direction = 'UP';
          break;
        case 'ArrowDown':
          direction = 'DOWN';
          break;
        case 'ArrowLeft':
          direction = 'LEFT';
          break;
        case 'ArrowRight':
          direction = 'RIGHT';
          break;
        default:
          console.error('wrong key');
          break;
      }
      if (direction) {
        move(direction, tiles, setTiles, difficulty, setHistory);
      }
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handlePress);
    return () => window.removeEventListener('keydown', handlePress);
  }, [handlePress]);

  useEffect(() => {
    setTiles(getTiles(difficulty, true));
  }, [difficulty]);

  return (
    <>
      <Modal>{modal?.type === 'SETTINGS' && <Settings />}</Modal>
      <div className="app" data-difficulty={difficulty} data-size={tileSize}>
        <Header />
        <ScoreBoard setTiles={setTiles} moveCount={history.length} />
        <div className="container">
          {tiles.map((t) => {
            if (t.val === difficulty * difficulty) {
              return <TileComponent tile={t} key={getTileKey(t)} isEmpty />;
            }
            return <TileComponent tile={t} key={getTileKey(t)} />;
          })}
          {gameState === 'PAUSED' && (
            <div className="pause-container" onClick={startGame}>
              <PlayIcon size={144} />
              continue
            </div>
          )}
          {gameState === 'IDLE' && (
            <div className="pause-container" onClick={startGame}>
              <PlayIcon size={144} />
              start
            </div>
          )}
        </div>
        <br />
        {gameState === 'STARTED' && (
          <button onClick={pauseGame} className="flex btn btn-xl btn-block">
            pause
          </button>
        )}
      </div>
    </>
  );
}

export default App;
