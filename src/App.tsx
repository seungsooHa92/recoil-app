import React from 'react';
import styled from 'styled-components';
import AppHeader from './components/AppHeader';
import { AppSize } from './types';
import AppBody from './components/AppBody';

const App: React.FC = () => {
  const { innerHeight: height, innerWidth: width } = window;
  return (
    <AppWrap height={height}>
      <AppContentWrap>
        <AppHeader />
        <AppBody />
      </AppContentWrap>
    </AppWrap>
  );
};

const AppWrap = styled.div<AppSize>`
  width: 100%;
  height: ${props => props.height}px;
  min-width: 375px;
  max-width: 640px;
`;
const AppContentWrap = styled.div`
  width: 100%;
  height: 100%;
`;

export default App;
