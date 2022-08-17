const { MONITOR_CNT, MONITOR_INTERVAL } = require('./constant');
const { TC } = require('./testcase');
const { explicitWait, getParsedStorage } = require('./utils');

const testTodoCreateOnce = async page => {
  const todoEle = await explicitWait(page, '[data-testid="todo-panel"]', MONITOR_CNT, MONITOR_INTERVAL);

  await page.click('[data-testid="addButton"]');
  const todoCreate = await page.evaluate(() => {
    const todoPanel = document.querySelector('[data-testid="todo-panel"]');
    const getLocalStorage = localStorage.getItem('todoRecoil');
    return {
      panel: todoPanel.innerText,
      storage: getLocalStorage
    };
  });

  todoEle && getParsedStorage(todoCreate.storage).length === 1 && TC['todo-create-1'].required === todoCreate.panel
    ? (TC['todo-create-1'].result = 'Pass')
    : (TC['todo-create-1'].result = 'Fail');
};

module.exports = {
  testTodoCreateOnce
};
