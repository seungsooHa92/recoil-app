import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppHeader from './components/AppHeader';
import { RootStoreProvider, useStores } from './context/RootStoreProvider';
import { AppSize } from './types';
import { rootStore } from './store/rootStore';
import Home from './components/Home/Home';
import { PATH } from './constant/routePath';
import TodoDetail from './components/TodoEdit/TodoDetail';
import { observer } from 'mobx-react-lite';
import { useLocalStorage } from './hook/useLocalStorage';
import { TodoModel } from './store/model/TodoModel';
import Weather from './components/Home/Weather';
import TodoList from './components/Home/TodoList';

const App: React.FC = observer(() => {
  const { innerHeight: height, innerWidth: width } = window;
  const [storageState, setStorageState] = useLocalStorage('todoStore', []);
  const [todoList, setTodoList] = useState<Array<TodoModel>>(storageState);
  const [viewingTodoId, setViewingTodoId] = useState<string>('');
  const [viewingTodoItem, setViewingTodoItem] = useState<TodoModel>();
  const [page, setPage] = useState('Home');
  useEffect(() => {
    console.log('APP컴포넌트 ########', storageState);
    setTodoList(storageState);
  }, []);
  useEffect(() => {
    setStorageState(todoList);
  }, [todoList]);

  return (
    <AppWrap height={height}>
      <AppContentWrap>
        <AppHeader />
        <ContentBodyWrap>
          {page !== 'Home' ? (
            <TodoDetail
              todoList={todoList}
              setTodoList={setTodoList}
              viewingTodoId={viewingTodoId}
              viewingTodoItem={viewingTodoItem}
              setPage={setPage}
            />
          ) : (
            <>
              <Weather />
              <TodoList
                todoList={todoList}
                setTodoList={setTodoList}
                setViewingTodoId={setViewingTodoId}
                setViewingTodoItem={setViewingTodoItem}
                setPage={setPage}
              />
            </>
          )}
        </ContentBodyWrap>
      </AppContentWrap>
    </AppWrap>
  );
});

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
