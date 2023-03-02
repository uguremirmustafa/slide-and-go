import { useApp } from 'context/AppContext';
import React, { useState } from 'react';
import { Difficulty, difficultyLevels } from 'types';

function Settings() {
  const { setDifficulty, difficulty, setGameState } = useApp();
  const [diff, setDiff] = useState(difficulty);

  return (
    <div>
      <div>
        <label htmlFor="difficulty">Select difficulty</label>
      </div>
      <br />
      <select
        name="difficulty"
        id="difficulty"
        value={difficulty}
        onChange={(e) => {
          setDifficulty(parseInt(e.target.value) as Difficulty);
        }}
      >
        {difficultyLevels.map((l) => {
          return (
            <option key={l} value={l}>
              {l}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default Settings;
