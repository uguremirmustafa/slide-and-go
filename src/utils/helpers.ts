import { Difficulty, Direction, GameState, Tile } from 'types';

export function shuffle(array_elements: number[]) {
  let i = array_elements.length,
    randomNumIndex,
    randomNum;
  while (--i > 0) {
    randomNumIndex = Math.floor(Math.random() * (i + 1));
    randomNum = array_elements[randomNumIndex];
    array_elements[randomNumIndex] = array_elements[i];
    array_elements[i] = randomNum;
  }
  return array_elements;
}

export const getTiles = (difficulty: Difficulty, ordered?: true, dummy?: true) => {
  const orderedNumbers = Array.from(Array(difficulty * difficulty).keys()).map((x) => x + 1);
  const numbers = ordered ? orderedNumbers : shuffle(orderedNumbers);

  const tiles: Tile[] = [];

  for (let i = 0; i < difficulty; i++) {
    for (let j = 0; j < difficulty; j++) {
      const tile: Tile = {
        x: j,
        y: i,
        val: numbers[i * difficulty + j],
        swapped: false,
        isCorrect: i * difficulty + j + 1 === numbers[i * difficulty + j],
      };
      tiles.push(tile);
    }
  }

  if (dummy) {
    const copy = [...tiles];
    const lastItem = copy.pop() as Tile;
    const lastItem2 = copy.pop() as Tile;
    const newList: Tile[] = [
      ...copy,
      { ...lastItem, x: lastItem.x - 1, isCorrect: false, val: lastItem.val },
      { ...lastItem2, x: lastItem2.x + 1, isCorrect: false, val: lastItem2.val },
    ];
    return newList;
  }

  return tiles;
};

export const move = (
  direction: Direction,
  tiles: Tile[],
  setTiles: (value: React.SetStateAction<Tile[]>) => void,
  difficulty: Difficulty,
  setHistory: React.Dispatch<React.SetStateAction<Direction[]>>,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
): void => {
  let correctCount = 0;

  const et = tiles.find((x) => x.val === difficulty * difficulty) as Tile;
  let tileToBeUpdated: Tile | undefined = undefined;
  if (direction === 'UP') {
    tileToBeUpdated = tiles.find((t) => t.x === et.x && t.y === et.y + 1);
    if (tileToBeUpdated) {
      tileToBeUpdated.y = et.y;
      et.y = et.y + 1;
    }
  } else if (direction === 'DOWN') {
    tileToBeUpdated = tiles.find((t) => t.x === et.x && t.y === et.y - 1);
    if (tileToBeUpdated) {
      tileToBeUpdated.y = et.y;
      et.y = et.y - 1;
    }
  } else if (direction === 'LEFT') {
    tileToBeUpdated = tiles.find((t) => t.x === et.x + 1 && t.y === et.y);
    if (tileToBeUpdated) {
      tileToBeUpdated.x = et.x;
      et.x = et.x + 1;
    }
  } else if (direction === 'RIGHT') {
    tileToBeUpdated = tiles.find((t) => t.x === et.x - 1 && t.y === et.y);
    if (tileToBeUpdated) {
      tileToBeUpdated.x = et.x;
      et.x = et.x - 1;
    }
  } else {
    console.log('error, unknown direction!');
    return;
  }

  if (tileToBeUpdated) {
    setTiles((old) => {
      const newTiles = old.map((t) => {
        const isCorrect = t.y * difficulty + t.x + 1 === t.val;
        if (t.val === tileToBeUpdated?.val) {
          return {
            ...tileToBeUpdated,
            swapped: true,
            isCorrect,
          } as Tile;
        } else if (t.val === difficulty * difficulty) {
          return {
            ...et,
            swapped: false,
            isCorrect,
          };
        } else {
          return { ...t, swapped: false, isCorrect };
        }
      });

      newTiles.forEach((x) => {
        if (x.isCorrect) {
          correctCount = correctCount + 1;
        }
      });
      if (correctCount === difficulty * difficulty) {
        setGameState('OVER');
      }

      setHistory((old) => [direction, ...old]);
      return newTiles;
    });
  }
};

export const getTileKey = (tile: Tile) => {
  return `${tile.x}_${tile.y}_${tile.val}`;
};

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const getDirection = (event: KeyboardEvent) => {
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
      direction = undefined;
      break;
  }
  return direction;
};
