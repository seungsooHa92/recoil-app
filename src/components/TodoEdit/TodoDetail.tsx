import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../context/RootStoreProvider';
import styled from 'styled-components';
import { useLocalStorage } from 'src/hook/useLocalStorage';
import { useNavigate } from 'react-router-dom';
import { PATH } from 'src/constant/routePath';
import { TodoModel } from 'src/store/model/TodoModel';
import { TodoListProps } from 'src/types';

const TodoDetail: React.FC<Partial<TodoListProps>> = observer(
  ({ todoList, setTodoList, viewingTodoItem, viewingTodoId, setPage }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
      setTitle(viewingTodoItem?.title);
    }, [viewingTodoItem]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    };
    const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {};
    //TODO 날짜로 변경
    const handleDueChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

    const handleSaveClick = () => {
      const updatedTodo = new TodoModel();
      updatedTodo.id = viewingTodoId;
      updatedTodo.title = title;
      const updatedList = todoList.map(todo => (todo.id === viewingTodoId ? { ...todo, title: title } : todo));
      setTodoList(updatedList);
      setPage('Home');
    };
    return (
      <div>
        <h3>제목</h3>
        <TodoTitleInput value={title} onChange={handleTitleChange} />
        <h3>내용</h3>
        {/* <TodoContent value={todoStore.viewingTodo.content} />
      <h3>Due Date</h3>
      <TodoDueDateInput value={todoStore.viewingTodo.title} /> */}
        <SaveButton onClick={handleSaveClick}>저장 버튼</SaveButton>
      </div>
    );
  }
);

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
