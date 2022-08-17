const { MONITOR_CNT, MONITOR_INTERVAL } = require('./constant');
const { TC } = require('./testcase');
const { explicitWait, getParsedStorage } = require('./utils');

const testTodoCreateTwice = async page => {
  const todoEle = await explicitWait(page, '[data-testid="todo-panel"]', MONITOR_CNT, MONITOR_INTERVAL);

  await page.click('[data-testid="addButton"]');
  const todoCreateTwice = await page.evaluate(() => {
    const todoPanel = document.querySelector('[data-testid="todo-panel"]');
    const getLocalStorage = localStorage.getItem('todoRecoil');
    return {
      panel: todoPanel.innerText,
      storage: getLocalStorage
    };
  });

  todoEle &&
  getParsedStorage(todoCreateTwice.storage).length === 2 &&
  todoCreateTwice.panel.includes(TC['todo-create-2'].required)
    ? (TC['todo-create-2'].result = 'Pass')
    : (TC['todo-create-2'].result = 'Fail');
};

module.exports = {
  testTodoCreateTwice
};
