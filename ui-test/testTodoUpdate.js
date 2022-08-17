const { TC } = require('./testcase');
const { getParsedStorage } = require('./utils');

const testTodoUpdate = async page => {
  await page.type('[data-testid="title-input"]', TC['todo-update'].required.title);

  await page.type('[data-testid="content-input"]', TC['todo-update'].required.content);

  const saveButtonClick = async () =>
    await page.$('[data-testid="save-button"]').then(result => {
      return result.click();
    });
  await saveButtonClick();
  const todoUpdated = await page.evaluate(() => {
    const todoPanel = document.querySelector('[data-testid="todo-panel"]');
    const getLocalStorage = localStorage.getItem('todoRecoil');
    return {
      panel: todoPanel.innerText,
      storage: getLocalStorage
    };
  });

  getParsedStorage(todoUpdated.storage)[0].content === TC['todo-update'].required.content &&
  todoUpdated.panel === TC['todo-update'].required.title
    ? (TC['todo-update'].result = 'Pass')
    : (TC['todo-update'].result = 'Fail');
};
module.exports = {
  testTodoUpdate
};
