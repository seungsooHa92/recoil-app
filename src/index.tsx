import React from 'react';
import { RecoilRoot } from 'recoil';
import App from './App';
import { render } from 'react-dom';

const container = document.getElementById('root');

render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  container
);
