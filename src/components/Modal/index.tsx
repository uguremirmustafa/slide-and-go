import { CloseIcon } from 'assets/icons';
import { useModal } from 'context/ModalContext';
import React, { ReactNode } from 'react';
import './styles.css';

interface IProps {
  children: ReactNode;
}

function Modal(props: IProps) {
  const { children } = props;
  const { modal, setModal } = useModal();
  function closeModal() {
    setModal(null);
  }
  return (
    <div className={`modal-container ${!!modal ? 'active animate__fadeIn' : 'animate__fadeOut'}`}>
      <div className={`modal ${!!modal ? 'animate__fadeIn' : 'animate__fadeOut'}`}>
        <div className="header">
          <span>{modal?.title}</span>
          <button onClick={closeModal}>
            <CloseIcon />
          </button>
        </div>
        <div className="body">
          <div className="content">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
