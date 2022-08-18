const { MONITOR_CNT, MONITOR_INTERVAL } = require('./constant');
const { TC } = require('./testcase');
const { explicitWait, getParsedStorage } = require('./utils');

const testTodoDelete = async page => {
  const deleteIconEle = await explicitWait(page, '[data-testid="delete-icon"]', MONITOR_CNT, MONITOR_INTERVAL);

  // 삭제 아이콘 버튼의 클릭 이벤트를 발생시킨 후 localStorage의 값과 todoList에 렌더링 된 값을 비교
  const lastTodoItemDelete = async () =>
    await page.$$('[data-testid="delete-icon"]').then(result => {
      return result[result.length - 1].click();
    });
  await lastTodoItemDelete();
  const todoDelete = await page.evaluate(() => {
    const todoPanel = document.querySelector('[data-testid="todo-panel"]');
    const getLocalStorage = localStorage.getItem('todoRecoil');
    return {
      panel: todoPanel.innerText,
      storage: getLocalStorage
    };
  });

  getParsedStorage(todoDelete.storage).length === 1 && todoDelete.panel === TC['todo-delete'].required
    ? (TC['todo-delete'].result = 'Pass')
    : (TC['todo-delete'].result = 'Fail');
};

module.exports = {
  testTodoDelete
};
