const { MONITOR_CNT, MONITOR_INTERVAL } = require('./constant');
const { TC } = require('./testcase');
const { explicitWait } = require('./utils');

const testHeaderText = async page => {
  const headerEle = await explicitWait(page, '[data-testid="header"]', MONITOR_CNT, MONITOR_INTERVAL);
  // 헤더 테스트
  const headerText = await page.evaluate(() => {
    const header = document.querySelector('[data-testid="header"]');
    return Promise.resolve(header.textContent);
  });

  // 헤더 텍스트가 THIS WEEK ? 성공 : 실패
  !!headerEle && headerText === TC['header-text'].required
    ? (TC['header-text'].result = 'Pass')
    : (TC['header-text'].result = 'Fail');
};
module.exports = {
  testHeaderText
};
