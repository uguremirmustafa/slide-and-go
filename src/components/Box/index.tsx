import { useApp } from 'context/AppContext';
import { Tile } from 'types';
import { getTileKey } from 'utils/helpers';

interface IProps {
  tile: Tile;
  isEmpty?: boolean;
}

function Box(props: IProps) {
  const { tile, isEmpty } = props;
  const { tileSize } = useApp();
  const key = getTileKey(tile);

  return (
    <div
      key={key}
      className={`
        tile 
        ${tile.swapped ? 'bounceIn' : ''} 
      `}
      style={{ top: tile.y * tileSize, left: tile.x * tileSize }}
    >
      <span
        className={`
       value text-purple-100
       ${isEmpty && 'invisible'} 
       ${tile.isCorrect ? 'bg-lime-600' : 'bg-purple-600'}
       `}
      >
        {tile.val}
      </span>
    </div>
  );
}

export default Box;
