import React from 'react';
import { useRecoilValue } from 'recoil';
import { editState } from 'src/recoil/todo';
import TodoDetail from './TodoEdit/TodoDetail';
import Weather from './Home/Weather';
import TodoList from './Home/TodoList';
import { BodyWrap } from 'src/globalStyles';

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

export default AppBody;
