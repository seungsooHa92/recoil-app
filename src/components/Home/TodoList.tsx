import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { TodoModel } from 'src/store/model/TodoModel';
import styled from 'styled-components';
import { useStores } from '../../context/RootStoreProvider';
import { useLocalStorage } from '../../hook/useLocalStorage';

const TodoList = () => {
  const { todoStore } = useStores();
  const [state, setState] = useLocalStorage('tsodo', []);
  const [todoList, setTodoList] = useState<Array<TodoModel>>(state);

  useEffect(() => {
    setTodoList(state);
  }, []);

  useEffect(() => {
    setState(todoList);
  }, [todoList]);

  const handleAddTodo = () => {
    const newTodo = new TodoModel();
    newTodo.id = new Date().toISOString();
    newTodo.isComplete = false;
    newTodo.title = `이번주 할일 ${todoList.length + 1}`;
    setTodoList(todoList.concat(newTodo));
    setState(todoList);
  };

  return (
    <TodoListWrap>
      <h3>이번주 To-Do</h3>
      <AddButton onClick={handleAddTodo}>추가 버튼</AddButton>
      {todoList?.map(todo => (
        <TodoItem key={todo.id}>
          {/* <CheckBox checked={todo.isComplete} /> */}
          {todo.title}
        </TodoItem>
      ))}
    </TodoListWrap>
  );
};
const TodoListWrap = styled.div`
  background: white;
  height: 400px;
`;
const AddButton = styled.button`
  background: #13bd7e;
  color: white;
  border: 0;
  width: 100%;
  height: 48px;
  border-radius: 8px;
`;

const TodoItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const CheckBox = styled.input``;
export default TodoList;
