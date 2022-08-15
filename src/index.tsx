import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RootStoreProvider } from './context/RootStoreProvider';
import { rootStore } from './store/rootStore';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <RootStoreProvider value={rootStore}>
    <App />
  </RootStoreProvider>
);
