import useLocalState from 'hooks/useLocalState';
import { useWindowSize } from 'hooks/useWindowSize';
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { Difficulty, Direction, GameState, TileSize } from 'types';

interface ContextInterface {
  difficulty: Difficulty;
  setDifficulty: React.Dispatch<React.SetStateAction<Difficulty>>;
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  tileSize: TileSize;
  setTileSize: React.Dispatch<React.SetStateAction<TileSize>>;
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  history: Direction[];
  setHistory: React.Dispatch<React.SetStateAction<Direction[]>>;
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
  history: [],
  setHistory: () => {},
};

const Context = createContext<ContextInterface>(initialValues);

export const AppWrapper = ({ children }: { children: ReactNode }) => {
  const [time, setTime] = useState(0);
  const [history, setHistory] = useState<Direction[]>([]);
  const [tileSize, setTileSize] = useState<TileSize>(120);
  const [difficulty, setDifficulty] = useLocalState<3 | 4 | 5 | 6>('slidgo_difficulty', 4);
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
      history,
      setHistory,
    }),
    [
      difficulty,
      setDifficulty,
      gameState,
      setGameState,
      tileSize,
      setTileSize,
      time,
      setTime,
      history,
      setHistory,
    ]
  );

  useEffect(() => {
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
