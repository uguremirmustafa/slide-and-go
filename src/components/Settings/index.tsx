import { useApp } from 'context/AppContext';
import React, { useState } from 'react';
import { Difficulty, difficultyLevels } from 'types';

function Settings() {
  const { setDifficulty, difficulty, setGameState } = useApp();

  function changeDifficulty() {
    // warn user before changing the difficulty
  }

  return (
    <div>
      <label className="block mb-1 font-normal" htmlFor="difficulty">
        Difficulty
      </label>
      <select
        name="difficulty"
        className="w-60 p-1 rounded"
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
      <caption className="text-xs font-normal text-purple-600 flex w-full mt-1">
        Changing difficulty will end current game!
      </caption>
    </div>
  );
}

export default Settings;
