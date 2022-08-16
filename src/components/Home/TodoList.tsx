import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { editState, todoState, viewingId } from 'src/recoil/todo';
import styled from 'styled-components';
import { CompleteProps, ITodo } from '../../types';
import { viewingTodo } from '../../recoil/todo';
import moment from 'moment';

const TodoList: React.FC = () => {
  const [todoList, setTodoList] = useRecoilState<ITodo[]>(todoState);
  const setEditMode = useSetRecoilState(editState);
  const setViewingTodoId = useSetRecoilState(viewingId);
  const setViewingTodoItem = useSetRecoilState(viewingTodo);

  const handleAddTodo = () => {
    const newTodo = {
      id: new Date().toISOString(),
      isComplete: false,
      title: `이번주 할일 ${todoList.length + 1}`,
      content: '',
      dueDate: null
    };
    setTodoList(todoList.concat(newTodo));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
    const updatedList = todoList.map(todo => (todo.id === todoId ? { ...todo, isComplete: !todo.isComplete } : todo));
    setTodoList(updatedList);
  };

  const handleDeleteClick = (event: React.MouseEvent<HTMLSpanElement>, todoId: string) => {
    const updatedList = todoList.filter(todo => todo.id !== todoId);
    setTodoList(updatedList);
  };

  const handleTodoClick = (event: React.MouseEvent<HTMLSpanElement>, todoId: string) => {
    setEditMode(true);
    setViewingTodoId(todoId);
    const view = todoList.find(todo => todo.id === todoId);
    setViewingTodoItem(view);
  };
  return (
    <TodoListWrap>
      <h3>To-do</h3>
      <AddButton onClick={handleAddTodo}>추가 버튼</AddButton>
      {todoList.map(todo => (
        <TodoItem key={todo.id}>
          <input type="checkbox" checked={todo.isComplete} onChange={e => handleChange(e, todo.id)} />
          <TitleDue onClick={e => handleTodoClick(e, todo.id)}>
            <Title isComplete={todo.isComplete}>{todo.title}</Title>
            {todo.dueDate ? <Due>due date:{moment(todo.dueDate).format('YYYY.MM.DD')}</Due> : <></>}
          </TitleDue>
          <DeleteIcon onClick={e => handleDeleteClick(e, todo.id)}>
            <img src="/images/x.svg" alt="" style={{ width: '10px', height: '10px' }} />
          </DeleteIcon>
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
  margin-bottom: 5px;
`;

const TodoItem = styled.div`
  margin-top: 5px;
  display: flex;
  align-items: center;
  height: 45px;
  width: 100%;
  font-size: 14px;
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
  width: 10%;
  height: 40px;
  display: flex;
  align-items: center;
  cursor: grab;
  justify-content: right;
  padding-right: 10px;
`;

export default TodoList;
