import { makeAutoObservable } from 'mobx';
import { TodoModel } from './model/TodoModel';
import { IRootStore } from '../types';

class TodoStore {
  rootStore: IRootStore;

  todoList: Array<TodoModel> = [];

  // editingTodo: TodoModel = {id:};

  constructor(rootStore: IRootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }
}

export default TodoStore;
