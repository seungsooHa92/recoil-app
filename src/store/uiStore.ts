import { makeAutoObservable } from 'mobx';
import { IRootStore } from 'src/types';

class UiStore {
  rootStore: IRootStore;

  dateVisible = false;

  editMode = false;

  constructor(rootStore: IRootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }
}
export default UiStore;
