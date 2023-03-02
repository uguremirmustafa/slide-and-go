import { useApp } from 'context/AppContext';
import { Tile } from 'types';
import { getTileKey } from 'utils/helpers';

interface IProps {
  tile: Tile;
  isEmpty?: boolean;
}
function TileComponent(props: IProps) {
  const { tile, isEmpty } = props;
  const { tileSize, difficulty } = useApp();
  const key = getTileKey(tile);

  const isInCorrectPlace = tile.val === tile.y * difficulty + tile.x + 1;

  return (
    <div
      key={key}
      className={`
        tile 
        ${tile.swapped ? 'animate__animated animate__bounceIn' : ''} 
        ${isInCorrectPlace ? 'correct' : ''}
      `}
      style={{ top: tile.y * tileSize, left: tile.x * tileSize }}
    >
      <span className="cd">{`${tile.x}_${tile.y}`}</span>
      <span className={`value ${isEmpty ? 'empty' : ''}`}>{tile.val}</span>
    </div>
  );
}

export default TileComponent;
