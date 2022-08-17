import React from 'react';
import AppHeader from './components/AppHeader';
import AppBody from './components/AppBody';
import { AppContentWrap, AppWrap } from './globalStyles';

const App: React.FC = () => {
  const { innerHeight: height } = window;
  return (
    <AppWrap height={height}>
      <AppContentWrap>
        <AppHeader />
        <AppBody />
      </AppContentWrap>
    </AppWrap>
  );
};

export default App;
