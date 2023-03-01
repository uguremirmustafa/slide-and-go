import 'animate.css';
import { PlayIcon } from 'assets/icons';
import Header from 'components/Header';
import ScoreBoard from 'components/ScoreBoard';
import TileComponent from 'components/TileComponent';
import { AppWrapper, useApp } from 'context/AppContext';
import { useEffect, useState } from 'react';
import { Direction, GameState, Tile } from 'types';
import { getTileKey, getTiles, move, shuffle } from './utils/helpers';

function App() {
  const { difficulty, gameState, setGameState, tileSize } = useApp();

  const numbers = Array.from(Array(difficulty * difficulty).keys()).map((x) => x + 1);

  const [tiles, setTiles] = useState<Tile[]>(getTiles(shuffle(numbers), difficulty));
  const [initialTiles, setInitialTiles] = useState<Tile[]>([]);

  // const [history, setHistory] = useState<Direction[]>([]);

  function startGame() {
    setGameState('STARTED');
  }
  function pauseGame() {
    setGameState('PAUSED');
  }

  function handlePress(event: KeyboardEvent) {
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
      startGame();
      // setHistory((old) => [direction, ...old] as Direction[]);
      move(direction, tiles, setTiles, difficulty);
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handlePress);
    return () => window.removeEventListener('keydown', handlePress);
  }, [tiles.length]);

  function shuffleTiles() {
    const shuffledTiles = getTiles(shuffle(numbers), difficulty);
    setInitialTiles(shuffledTiles);
    setTiles(shuffledTiles);
  }

  return (
    <>
      <div className="app" data-difficulty={difficulty} data-size={tileSize}>
        <Header />
        <ScoreBoard />
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
