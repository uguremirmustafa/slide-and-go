import { useWindowSize } from 'hooks/useWindowSize';
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { Difficulty, GameState, TileSize } from 'types';

interface ModalProps {
  type: 'SETTINGS' | 'GAMEOVER' | 'RESTART' | 'INFO';
  title: string;
}

interface ContextInterface {
  modal: ModalProps | null;
  setModal: React.Dispatch<React.SetStateAction<ModalProps | null>>;
}

const initialValues: ContextInterface = {
  modal: { title: 'Welcome', type: 'INFO' },
  setModal: () => {},
};

const Context = createContext<ContextInterface>(initialValues);

export const ModalContext = ({ children }: { children: ReactNode }) => {
  const [modal, setModal] = useState<ModalProps | null>(initialValues.modal);
  return <Context.Provider value={{ modal, setModal }}>{children}</Context.Provider>;
};
export const useModal = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useModal must be used in a component within a ModalContext.');
  }
  return context;
};
