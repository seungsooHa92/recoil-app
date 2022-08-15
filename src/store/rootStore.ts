import TodoStore from './todoStore';
import UiStore from './uiStore';
import { IRootStore } from '../types';

export class RootStore {
  uiStore: UiStore;

  todoStore: TodoStore;

  constructor() {
    this.uiStore = new UiStore(this);
    this.todoStore = new TodoStore(this);
  }
}

export const rootStore: IRootStore = new RootStore();
