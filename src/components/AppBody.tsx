import React from 'react';
import styled from 'styled-components';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { editState } from 'src/recoil/todo';
import TodoDetail from './TodoEdit/TodoDetail';
import Weather from './Home/Weather';
import TodoList from './Home/TodoList';

const AppBody = () => {
  const editMode = useRecoilValue(editState);
  return (
    <BodyWrap>
      {editMode ? (
        <TodoDetail />
      ) : (
        <>
          <Weather />
          <TodoList />
        </>
      )}
    </BodyWrap>
  );
};

const BodyWrap = styled.div`
  padding-left: 24px;
  padding-right: 24px;
`;

export default AppBody;
