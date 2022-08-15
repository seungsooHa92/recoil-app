import { makeAutoObservable } from 'mobx';

export class TodoModel {
  id = '';

  isComplete = false;

  title = '';

  dueDate: Date;

  constructor() {
    makeAutoObservable(this);
  }
}
