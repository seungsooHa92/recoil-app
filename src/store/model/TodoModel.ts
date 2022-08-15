import { makeAutoObservable } from 'mobx';

export class TodoModel {
  id: string = '';

  isComplete: boolean = false;

  title: string = '';

  dueDate: Date = new Date();

  constructor() {
    makeAutoObservable(this);
  }
}
