import React from 'react';
import styled from 'styled-components';
import AppHeader from './components/AppHeader';
import { RootStoreProvider } from './context/RootStoreProvider';
import { AppSize } from './types';
import { rootStore } from './store/rootStore';

const App: React.FC = () => {
  const { innerHeight: height, innerWidth: width } = window;
  console.log(height, width);
  return (
    <RootStoreProvider value={rootStore}>
      <AppWrap height={height}>
        <AppContentWrap>
          <AppHeader />
          <ContentBodyWrap>d</ContentBodyWrap>
        </AppContentWrap>
      </AppWrap>
    </RootStoreProvider>
  );
};

const AppWrap = styled.div<AppSize>`
  width: 100%;
  height: ${props => props.height}px;
  background: orange;
  min-width: 375px;
  max-width: 640px;
`;
const AppContentWrap = styled.div`
  width: 100%;
  height: 100%;
  background: beige;
`;
const ContentBodyWrap = styled.div`
  background: salmon;
  padding-left: 24px;
  padding-right: 24px;
`;

export default App;
