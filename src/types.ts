import TodoStore from './store/todoStore';
import UiStore from './store/uiStore';

export interface AppSize {
  height: number;
}
export interface IRootStore {
  todoStore: TodoStore;
  uiStore: UiStore;
}
