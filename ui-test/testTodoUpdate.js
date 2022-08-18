const { TC } = require('./testcase');
const { getParsedStorage } = require('./utils');

const testTodoUpdate = async page => {
  // 기존 title 필드 값을 비워준다.
  await page.evaluate(() => {
    const textField = document.querySelector('[data-testid="title-input"]');
    textField.value = '';
  });
  // 비교대상이 될 값을 입력한다.
  await page.type('[data-testid="title-input"]', TC['todo-update'].required.title);

  // 컨텐트 입력
  await page.type('[data-testid="content-input"]', TC['todo-update'].required.content);

  //저장 버튼 클릭후 localStorage에 반영된 값과 todoList에 렌더링 된 값을 비교
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
