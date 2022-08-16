import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AppHeader from './components/AppHeader';
import { AppSize } from './types';
import TodoDetail from './components/TodoEdit/TodoDetail';
import Weather from './components/Home/Weather';
import TodoList from './components/Home/TodoList';
import { useRecoilValue } from 'recoil';
import { editState } from './recoil/todo';

const App: React.FC = () => {
  const { innerHeight: height, innerWidth: width } = window;
  const editMode = useRecoilValue(editState);

  return (
    <AppWrap height={height}>
      <AppContentWrap>
        <AppHeader />
        <ContentBodyWrap>
          {editMode ? (
            <TodoDetail />
          ) : (
            <>
              <Weather />
              <TodoList />
            </>
          )}
        </ContentBodyWrap>
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
const ContentBodyWrap = styled.div`
  padding-left: 24px;
  padding-right: 24px;
`;

export default App;
