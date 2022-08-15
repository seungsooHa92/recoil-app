import { makeAutoObservable } from 'mobx';

export class TodoModel {
  id = '';

  isComplete = false;

  title = '';

  content = 'content default값 테스트';

  dueDate: Date;

  constructor() {
    makeAutoObservable(this);
  }
}
