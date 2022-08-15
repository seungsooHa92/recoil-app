import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppHeader from './components/AppHeader';
import { RootStoreProvider } from './context/RootStoreProvider';
import { AppSize } from './types';
import { rootStore } from './store/rootStore';
import Home from './components/Home/Home';
import { PATH } from './constant/routePath';
import TodoDetail from './components/TodoEdit/TodoDetail';

const App: React.FC = () => {
  const { innerHeight: height, innerWidth: width } = window;
  console.log(height, width);
  return (
    <RootStoreProvider value={rootStore}>
      <AppWrap height={height}>
        <AppContentWrap>
          <AppHeader />
          <ContentBodyWrap>
            <Router basename={PATH.HOME}>
              <Routes>
                <Route path={PATH.HOME} element={<Home />} />
                <Route path={PATH.TODO} element={<TodoDetail />} />
              </Routes>
            </Router>
          </ContentBodyWrap>
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
