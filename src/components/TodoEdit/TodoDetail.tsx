import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ITodo } from 'src/types';
import { useRecoilState } from 'recoil';
import { editState, todoState, viewingTodo } from '../../recoil/todo';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import
import moment from 'moment';

const TodoDetail: React.FC = () => {
  const [todoList, setTodoList] = useRecoilState<ITodo[]>(todoState);
  const [viewingTodoItem, setViewingTodoItem] = useRecoilState<ITodo>(viewingTodo);

  const [title, setTitle] = useState(viewingTodoItem?.title);
  const [content, setContent] = useState(viewingTodoItem?.content);
  const [date, setDate] = useState<Date>(viewingTodoItem.dueDate === null ? new Date() : viewingTodoItem.dueDate);
  const [eitMode, setEditMode] = useRecoilState(editState);

  useEffect(() => {
    console.log('디테일 화면 .....');
    console.log(' 보고있는  todo 아이템:', viewingTodoItem);
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  const handleDateChange = (date: Date) => {
    setDate(date);
  };

  const handleSaveClick = () => {
    const updatedTodo = {
      id: viewingTodoItem.id,
      title: title,
      content: content,
      dueDate: date
    };
    const updatedList = todoList.map(todo => (todo.id === viewingTodoItem.id ? { ...todo, ...updatedTodo } : todo));
    setTodoList(updatedList);
    setEditMode(false);
  };
  return (
    <div>
      <h3>제목</h3>
      <TodoTitleInput value={title} onChange={handleTitleChange} />
      <h3>내용</h3>
      <TodoContent value={content} onChange={handleContentChange} />
      <h3 style={{ marginBottom: '0px' }}>Due Date</h3>
      <StyledCalendar value={date} onChange={handleDateChange} />
      <DateContent>{moment(date).format('YYYY년 MM월 DD일')}</DateContent>
      <SaveButton onClick={handleSaveClick}>저장 버튼</SaveButton>
    </div>
  );
};
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
const StyledCalendar = styled(Calendar)`
  width: 100%;
  border: 0;
  height: 100%;
  .react-calendar__tile {
    max-width: 100%;
    padding: 10px 6.6667px;
    background: none;
    text-align: center;
    line-height: 16px;
    font-weight: bold;
  }
  .react-calendar__tile--now {
    background: #13bd7e66;
  }
`;

const DateContent = styled.div`
  width: 100%;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 13px;
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
