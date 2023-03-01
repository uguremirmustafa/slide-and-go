import { useWindowSize } from 'hooks/useWindowSize';
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { Difficulty, GameState, TileSize } from 'types';

interface ContextInterface {
  difficulty: Difficulty;
  setDifficulty: React.Dispatch<React.SetStateAction<Difficulty>>;
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  tileSize: TileSize;
  setTileSize: React.Dispatch<React.SetStateAction<TileSize>>;
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
}

const initialValues: ContextInterface = {
  difficulty: 4,
  setDifficulty: () => {},
  gameState: 'IDLE',
  setGameState: () => {},
  setTileSize: () => {},
  tileSize: 120,
  time: 0,
  setTime: () => {},
};

const Context = createContext<ContextInterface>(initialValues);

export const AppWrapper = ({ children }: { children: ReactNode }) => {
  const [time, setTime] = useState(0);
  const [tileSize, setTileSize] = useState<TileSize>(120);
  const [difficulty, setDifficulty] = useState<3 | 4 | 5 | 6>(5);
  const [gameState, setGameState] = useState<GameState>('IDLE');
  const { width } = useWindowSize();

  const contextValue = useMemo(
    () => ({
      difficulty,
      setDifficulty,
      gameState,
      setGameState,
      tileSize,
      setTileSize,
      time,
      setTime,
    }),
    [difficulty, setDifficulty, gameState, setGameState, tileSize, setTileSize, time, setTime]
  );

  useEffect(() => {
    console.log(width);
    if (width < 600) {
      setTileSize(60);
    } else if (width >= 600 && width < 900) {
      setTileSize(90);
    } else {
      setTileSize(120);
    }
  }, [width]);

  if (width === 0) {
    return <>...</>;
  }

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
export const useApp = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useApp must be used in a component within a AppWrapper.');
  }
  return context;
};
