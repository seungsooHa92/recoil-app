const { MONITOR_CNT, MONITOR_INTERVAL } = require('./constant');
const { TC } = require('./testcase');
const { explicitWait } = require('./utils');

const testEditModeOn = async page => {
  const headerEle = await explicitWait(page, '[data-testid="header"]', MONITOR_CNT, MONITOR_INTERVAL);

  const firstTodoItemClick = async () =>
    await page.$$('[data-testid="todo-title"]').then(result => {
      return result[0].click();
    });
  await firstTodoItemClick();
  const editHeaderText = await page.evaluate(() => {
    const header = document.querySelector('[data-testid="header"]');
    return Promise.resolve(header.textContent);
  });

  // 헤더 텍스트가 To-Do ? 성공 : 실패
  !!headerEle && editHeaderText === TC['edit-mode-on'].required
    ? (TC['edit-mode-on'].result = 'Pass')
    : (TC['edit-mode-on'].result = 'Fail');
};

module.exports = {
  testEditModeOn
};
