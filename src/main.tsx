import { AppWrapper } from 'context/AppContext';
import { ModalContext } from 'context/ModalContext';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppWrapper>
      <ModalContext>
        <App />
      </ModalContext>
    </AppWrapper>
  </React.StrictMode>
);
