export const difficultyLevels = [3, 4, 5, 6] as const;
export type Difficulty = typeof difficultyLevels[number];
export type TileSize = 60 | 90 | 120;

export interface Tile {
  x: number;
  y: number;
  val: number;
  swapped: boolean;
}

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export type GameState = 'IDLE' | 'STARTED' | 'PAUSED' | 'OVER';
