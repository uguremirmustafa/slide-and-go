import { useApp } from 'context/AppContext';
import React, { useState } from 'react';
import { Tile } from 'types';
import { getTiles } from 'utils/helpers';

function useTiles() {
  const { difficulty } = useApp();
  const [tiles, setTiles] = useState<Tile[]>(getTiles(difficulty));

  return {
    tiles,
    setTiles,
  };
}

export default useTiles;
