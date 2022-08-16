import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { editState, todoState, viewingId } from 'src/recoil/todo';
import styled from 'styled-components';
import { TitleProps, ITodo } from '../../types';
import { viewingTodo } from '../../recoil/todo';
import moment from 'moment';

const TodoList: React.FC = () => {
  const [todoList, setTodoList] = useRecoilState<ITodo[]>(todoState);
  const setEditMode = useSetRecoilState(editState);
  const setViewingTodoId = useSetRecoilState(viewingId);
  const setViewingTodoItem = useSetRecoilState(viewingTodo);

  const todayTime = new Date().getTime();
  const isExpired = (todo: ITodo) => {
    if (todo.isComplete === false && todo.dueDate !== null) {
      return new Date(todo.dueDate).getTime() <= todayTime;
    }
    return false;
  };
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
    event.stopPropagation();
    console.log('####################   ', event, todoId);
    setEditMode(true);
    setViewingTodoId(todoId);
    const view = todoList.find(todo => todo.id === todoId);
    setViewingTodoItem(view);
  };
  return (
    <TodoLayout>
      <h3>To-do</h3>
      <AddButton onClick={handleAddTodo}>추가 버튼</AddButton>
      <TodoListWrap>
        {todoList.map(todo => (
          <TodoItem key={todo.id}>
            <TodoItemInner>
              <CheckBoxWrap>
                <CheckBox type="checkbox" checked={todo.isComplete} onChange={e => handleChange(e, todo.id)} />
              </CheckBoxWrap>
              <Title
                isExpired={isExpired(todo)}
                onClick={e => handleTodoClick(e, todo.id)}
                isComplete={todo.isComplete}
              >
                {todo.title}
              </Title>
              <DeleteIcon onClick={e => handleDeleteClick(e, todo.id)}>
                <img src="/images/x.svg" alt="" style={{ width: '10px', height: '10px' }} />
              </DeleteIcon>
            </TodoItemInner>
            {todo.dueDate !== null ? (
              <TodoItemInner>
                <CheckBoxWrap />
                <Due onClick={e => handleTodoClick(e, todo.id)} isExpired={isExpired(todo)}>
                  due date: {moment(todo.dueDate).format('YYYY.MM.DD')}
                </Due>
              </TodoItemInner>
            ) : (
              <></>
            )}
          </TodoItem>
        ))}
      </TodoListWrap>
    </TodoLayout>
  );
};
const TodoLayout = styled.div`
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

const TodoListWrap = styled.div`
  margin-top: 15px;
  height: 320px;
  overflow-y: scroll;
  background: #eeefef;
`;

const TodoItem = styled.div`
  width: 100%;
  font-size: 14px;
`;

const TodoItemInner = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  hieght: 24px;
`;
const CheckBoxWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10%;
  height: 100%;
`;

const CheckBox = styled.input`
  width: 16px;
  height: 16px;
  background: #13bd7e;
  border: 0px;
  border-radius: 9px;
  margin-right: 10px;
`;

const Title = styled.span<TitleProps>`
  text-decoration: ${props => (props.isComplete ? 'line-through' : 'none')};
  display: flex;
  color: ${props => (props.isExpired ? 'red' : 'black')};
  align-items: center;
  width: 85%;
`;

const Due = styled.div<Partial<TitleProps>>`
  color: ${props => (props.isExpired ? 'red' : 'black')};
  width: 85%;
`;

const DeleteIcon = styled.div`
  width: 10%;
  height: 40px;
  display: flex;
  align-items: center;
  cursor: grab;
  justify-content: center;
  padding-right: 10px;
`;

export default TodoList;
