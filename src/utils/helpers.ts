import { Difficulty, Direction, Tile } from 'types';

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

export const getTiles = (difficulty: Difficulty, ordered?: true) => {
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
      };
      tiles.push(tile);
    }
  }

  return tiles;
};

export const move = (
  direction: Direction,
  tiles: Tile[],
  setTiles: (value: React.SetStateAction<Tile[]>) => void,
  difficulty: Difficulty,
  setHistory: React.Dispatch<React.SetStateAction<Direction[]>>
): void => {
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
    setTiles((old) =>
      old.map((t) => {
        if (t.val === tileToBeUpdated?.val) {
          return { ...tileToBeUpdated, swapped: true } as Tile;
        } else if (t.val === difficulty * difficulty) {
          return { ...et, swapped: false };
        } else {
          return { ...t, swapped: false };
        }
      })
    );
    setHistory((old) => [direction, ...old]);
  }
};

export const getTileKey = (tile: Tile) => {
  return `${tile.x}_${tile.y}_${tile.val}`;
};

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
