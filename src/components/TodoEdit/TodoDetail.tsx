import React, { useState } from 'react';
import { ITodo } from 'src/types';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { editState, todoState, viewingTodo } from '../../recoil/todo';
import 'react-calendar/dist/Calendar.css'; // css import
import moment from 'moment';
import { TodoTitleInput, TodoContent, StyledCalendar, DateContent, SaveButton } from './todoDetailStyles';

const TodoDetail: React.FC = () => {
  const [todoList, setTodoList] = useRecoilState<ITodo[]>(todoState);
  const viewingTodoItem = useRecoilValue<ITodo>(viewingTodo);

  const [title, setTitle] = useState(viewingTodoItem?.title);
  const [content, setContent] = useState(viewingTodoItem?.content);

  const [date, setDate] = useState<Date>(viewingTodoItem.dueDate);

  const [calendarDate, setCalendarDate] = useState<Date>(new Date());
  const [dateChanged, setDateChanged] = useState(false);

  const setEditMode = useSetRecoilState(editState);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  const handleDateChange = (date: Date) => {
    setDate(date);
    setDateChanged(true);
    setCalendarDate(date);
  };

  const handleSaveClick = () => {
    const updatedTodo = {
      id: viewingTodoItem.id,
      title: title,
      content: content,
      dueDate: dateChanged || date !== null ? date : null
    };
    const updatedList = todoList.map(todo => (todo.id === viewingTodoItem.id ? { ...todo, ...updatedTodo } : todo));
    setTodoList(updatedList);
    setEditMode(false);
  };
  return (
    <div>
      <h3>제목</h3>
      <TodoTitleInput data-testid="title-input" value={title} onChange={handleTitleChange} />
      <h3>내용</h3>
      <TodoContent data-testid="content-input" value={content} onChange={handleContentChange} />
      <h3 style={{ marginBottom: '0px' }}>Due Date</h3>
      <StyledCalendar data-testid="due-calendar" value={calendarDate} onChange={handleDateChange} />
      <DateContent>
        {/* 오늘 날짜는 기본으로 보여주고 , due date의 유무에따라 due date영역 렌더 */}
        {'(today)' +
          moment(new Date()).format('YYYY.MM.DD') +
          ' / Due Date :' +
          (date === null ? 'No due Date' : moment(date).format('YYYY년 MM월 DD일'))}
      </DateContent>
      <SaveButton data-testid="save-button" onClick={handleSaveClick}>
        저장 버튼
      </SaveButton>
    </div>
  );
};

export default TodoDetail;
