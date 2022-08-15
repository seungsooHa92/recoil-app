export const TodoRepository = {
  getTodo() {
    return JSON.parse(localStorage.getItem('todo') || '{}');
  }
};
