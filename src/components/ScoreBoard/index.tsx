import { useApp } from 'context/AppContext';
import Timer from '../Timer';

function ScoreBoard() {
  const { history, difficulty, tileSize } = useApp();
  const moveCount = history.length;

  const stacked = difficulty === 3 && tileSize === 120;

  return (
    <div className="flex flex-col w-full gap-6">
      {stacked && (
        <h1 className="font-bold text-3xl md:text-5xl  text-purple-200 text-center">Slide&Go</h1>
      )}
      <div className="flex w-full items-center justify-between ring-8 ring-gray-700/30 rounded bg-gray-700/30 p-1 md:px-2">
        {!stacked && (
          <h1 className="font-bold text-3xl md:text-5xl  text-purple-200 text-center">Slide&Go</h1>
        )}
        <div className={`flex gap-2 ${stacked && 'justify-between w-full'}`}>
          <span className="p-1 md:p-2 rounded  text-blue-50">
            <Timer />
          </span>
          <span className="p-1 md:p-2 rounded  text-blue-50">
            {moveCount} {moveCount > 1 ? 'moves' : 'move'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ScoreBoard;
