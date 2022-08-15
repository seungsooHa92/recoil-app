import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH } from 'src/constant/routePath';
import { TodoModel } from 'src/store/model/TodoModel';
import styled from 'styled-components';
import { useStores } from '../../context/RootStoreProvider';
import { useLocalStorage } from '../../hook/useLocalStorage';
import { CompleteProps } from '../../types';

const TodoList = observer(() => {
  const { todoStore } = useStores();
  const [state, setState] = useLocalStorage('tsodo', []);
  const [todoList, setTodoList] = useState<Array<TodoModel>>(state);
  const navigate = useNavigate();
  useEffect(() => {
    console.log('TodoList에서 ########', state);
    setTodoList(state);
  }, []);

  useEffect(() => {
    setState(todoList);
    todoStore._todoList = todoList;
  }, [todoList]);

  const handleAddTodo = () => {
    const newTodo = new TodoModel();
    newTodo.id = new Date().toISOString();
    newTodo.isComplete = false;
    newTodo.title = `이번주 할일 ${todoList.length + 1}`;
    setTodoList(todoList.concat(newTodo));
    setState(todoList);
  };

  const handleTodoClick = (event: React.MouseEvent<HTMLSpanElement>, todoId: string) => {
    console.log('투두 클ㄹ릭!!');

    console.log(todoId);
    todoStore.viewingId = todoId;
    navigate(PATH.TODO);
  };
  const handleDeleteClick = (event: React.MouseEvent<HTMLSpanElement>, todoId: string) => {
    const updatedList = todoList.filter(todo => todo.id !== todoId);
    setTodoList(updatedList);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
    console.log(e.target.checked);
    const updatedList = todoList.map(todo => (todo.id === todoId ? { ...todo, isComplete: !todo.isComplete } : todo));
    setTodoList(updatedList);
  };
  return (
    <TodoListWrap>
      <h3>이번주 To-Do</h3>
      <AddButton onClick={handleAddTodo}>추가 버튼</AddButton>
      {todoList?.map(todo => (
        <TodoItem key={todo.id}>
          <input type="checkbox" checked={todo.isComplete} onChange={e => handleChange(e, todo.id)} />
          <TitleDue onClick={e => handleTodoClick(e, todo.id)}>
            <Title isComplete={todo.isComplete}>{todo.title}</Title>
            <Due>due date : 2020.09.01</Due>
          </TitleDue>
          <DeleteIcon onClick={e => handleDeleteClick(e, todo.id)}>
            <img src="/images/x.svg" />
          </DeleteIcon>
        </TodoItem>
      ))}
    </TodoListWrap>
  );
});

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
  margin-bottom: 5px;
`;

const TodoItem = styled.div`
  margin-top: 5px;
  display: flex;
  align-items: center;
  height: 45px;
  width: 100%;
  font-size: 15px;
  font-style: strike;
`;

const TitleDue = styled.div`
  width: 90%;
  cursor: grab;
`;
const Title = styled.span<CompleteProps>`
  text-decoration: ${props => (props.isComplete ? 'line-through' : 'none')};
`;
const Due = styled.div``;
const DeleteIcon = styled.div`
  width: 10px;
  height: 10px;
  display: flex;
  align-items: center;
  cursor: grab;
`;

export default TodoList;
