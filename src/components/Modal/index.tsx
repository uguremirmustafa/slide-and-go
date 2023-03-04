import { CloseIcon } from 'assets/icons';
import { useModal } from 'context/ModalContext';
import useOutsideClick from 'hooks/useOutsideClick';
import React, { ReactNode, useEffect, useRef } from 'react';

interface IProps {
  children: ReactNode;
}

function Modal(props: IProps) {
  const { children } = props;
  const { modal, setModal } = useModal();
  function closeModal() {
    setModal(null);
  }
  const ref = useRef(null);

  useOutsideClick([ref], closeModal);

  function handleEsc(event: any) {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeModal();
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div
      className={`w-full h-screen bg-slate-500/20 fixed transition-opacity ${
        !!modal ? 'z-10 opacity-100' : '-z-10 opacity-0'
      }`}
    >
      <div
        ref={ref}
        className={`w-80 min-h-40 absolute top-40 left-1/2 -translate-x-1/2 bg-slate-800 rounded shadow-2xl border border-slate-600 ${
          !!modal ? '' : ''
        }`}
      >
        <div className="p-3 border-b border-b-slate-600 flex justify-between items-center text-purple-100">
          <span>{modal?.title}</span>
          <button onClick={closeModal}>
            <CloseIcon className="hover:fill-slate-200 fill-slate-400" />
          </button>
        </div>
        <div className="p-3 text-purple-100">
          <div className="content">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
