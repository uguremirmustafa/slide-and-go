import { SettingsIcon } from 'assets/icons';
import React, { ReactNode } from 'react';

function Keyboard() {
  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-center">
        Use your arrow keys and move the tiles until they are ordered correctly.
      </p>
      <div className="flex flex-col items-center gap-1">
        <div className="flex">
          <Key>&#x2191;</Key>
        </div>
        <div className="flex gap-1">
          <Key>&#x2190;</Key>
          <Key>&#x2193;</Key>
          <Key>&#x2192;</Key>
        </div>
      </div>{' '}
      <div className="h-px w-full bg-purple-100" />
      <p className="text-center">
        Click onto <SettingsIcon size={22} className="inline mb-1 bg-purple-600 p-1 rounded" /> icon
        to change difficulty level!
      </p>
    </div>
  );
}

export default Keyboard;

interface IProps {
  children: ReactNode;
}
const Key = (props: IProps) => {
  const { children } = props;
  return (
    <div
      className="p-2 rounded border-2 border-purple-100/40 text-purple-100/40 
    w-10 h-10 flex justify-center items-center"
    >
      {children}
    </div>
  );
};
