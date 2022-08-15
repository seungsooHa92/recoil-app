import { TodoModel } from './store/model/TodoModel';
import TodoStore from './store/todoStore';
import UiStore from './store/uiStore';

export interface AppSize {
  height: number;
}
export interface IRootStore {
  todoStore: TodoStore;
  uiStore: UiStore;
}

export interface CompleteProps {
  isComplete: boolean;
}

export interface TodoListProps {
  todoList: Array<TodoModel>;
  setTodoList: (todoList: Array<TodoModel>) => void;
  setViewingTodoId: (id: string) => void;
  setViewingTodoItem: (todo: TodoModel) => void;
  viewingTodoId: string;
  viewingTodoItem: TodoModel;
  setPage: (page: string) => void;
}
