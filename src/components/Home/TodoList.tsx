import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { editState, todoState, viewingId } from 'src/recoil/todo';
import { ITodo } from '../../types';
import { viewingTodo } from '../../recoil/todo';
import moment from 'moment';
import {
  AddButton,
  CheckBox,
  CheckBoxWrap,
  DeleteIcon,
  Due,
  Title,
  TodoItem,
  TodoItemInner,
  TodoLayout,
  TodoListWrap
} from './todoListStyles';

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
    setEditMode(true);
    setViewingTodoId(todoId);
    const view = todoList.find(todo => todo.id === todoId);
    setViewingTodoItem(view);
  };
  return (
    <TodoLayout>
      <h3>To-do</h3>
      <AddButton data-testid="addButton" onClick={handleAddTodo}>
        추가 버튼
      </AddButton>
      <TodoListWrap data-testid="todo-panel">
        {todoList.map(todo => (
          <TodoItem key={todo.id}>
            <TodoItemInner>
              <CheckBoxWrap>
                <CheckBox type="checkbox" checked={todo.isComplete} onChange={e => handleChange(e, todo.id)} />
              </CheckBoxWrap>
              <Title
                data-testid="todo-title"
                isExpired={isExpired(todo)}
                onClick={e => handleTodoClick(e, todo.id)}
                isComplete={todo.isComplete}
              >
                {todo.title}
              </Title>
              <DeleteIcon data-testid="delete-icon" onClick={e => handleDeleteClick(e, todo.id)}>
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

export default TodoList;
