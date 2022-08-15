import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../context/RootStoreProvider';
import styled from 'styled-components';
import { useLocalStorage } from 'src/hook/useLocalStorage';
import { useNavigate } from 'react-router-dom';
import { PATH } from 'src/constant/routePath';
import { TodoModel } from 'src/store/model/TodoModel';

const TodoDetail = observer(() => {
  const { todoStore } = useStores();
  const [state, setState] = useLocalStorage('tsodo', []);
  const [editingId, setEditingId] = useState<string>();
  const [title, setTitle] = useState<string>(todoStore.viewingTodo.title);
  const [content, setContent] = useState<string>(todoStore.viewingTodo.content);

  useEffect(() => {
    console.log('첫 로드시 Storage state >>>>', state);
    setEditingId(todoStore.viewingId);
  }, []);
  const navigate = useNavigate();
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    todoStore.viewingTodo.title = e.target.value;
  };
  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    todoStore.viewingTodo.content = e.target.value;
  };
  //TODO 날짜로 변경
  const handleDueChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

  const handleSaveClick = () => {
    const updatedTodo = new TodoModel();
    updatedTodo.title = todoStore.viewingTodo.title;
    updatedTodo.content = todoStore.viewingTodo.content;
    updatedTodo.id = todoStore.viewingTodo.id;
    const updatedState = state.map(todo => (todo.id === editingId ? { ...todo, ...updatedTodo } : todo));
    console.log('************', updatedState);
    setState(updatedState);
    navigate(PATH.HOME);
  };
  return (
    <div>
      <h3>제목</h3>
      <TodoTitleInput value={todoStore.viewingTodo.title} onChange={handleTitleChange} />
      <h3>내용</h3>
      <TodoContent value={todoStore.viewingTodo.content} />
      <h3>Due Date</h3>
      <TodoDueDateInput value={todoStore.viewingTodo.title} />
      <SaveButton onClick={handleSaveClick}>저장 버튼</SaveButton>
    </div>
  );
});

const TodoTitleInput = styled.input`
  width: 100%;
  border: 0;
  height: 40px;
  background: #13bd7e66;
`;

const TodoContent = styled.textarea`
  width: 100%;
  border: 0;
  background: #13bd7e66;
  height: 160px;
  resize: none;
`;
const TodoDueDateInput = styled.input`
  width: 100%;
  border: 0;
  height: 40px;
  background: #13bd7e66;
`;

const SaveButton = styled.button`
  background: #13bd7e;
  color: white;
  border: 0;
  width: 100%;
  height: 48px;
  border-radius: 8px;
  margin-
`;
export default TodoDetail;
