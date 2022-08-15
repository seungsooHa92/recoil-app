import { makeAutoObservable } from 'mobx';
import { TodoModel } from './model/TodoModel';
import { IRootStore } from '../types';

class TodoStore {
  rootStore: IRootStore;

  _todoList: Array<TodoModel> = [];

  // editingTodo: TodoModel = {id:};

  constructor(rootStore: IRootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  setLocalTodo(values: Array<TodoModel>) {
    this._todoList = values;
  }
}

export default TodoStore;
