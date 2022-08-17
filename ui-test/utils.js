const path = require('path');

const getSafetyElement = async (page, selector, time) => {
  try {
    let _ele = await page.$(selector);
    if (!_ele) {
      throw new Error('Element is NULL');
    }
    return _ele;
  } catch (e) {
    await page.waitForTimeout(time);
    return false;
  }
};
const explicitWait = async (page, selector, count, time) => {
  let isSuccess = false;
  let _time = time || 2000;
  let _cnt = count || 3;
  let isCondition = 0;

  while (!isSuccess && isCondition < _cnt) {
    isSuccess = await getSafetyElement(page, selector, _time);
    if (isSuccess !== false) {
      isCondition = _cnt + 1;
    }
    ++isCondition;
  }

  return isSuccess;
};

const getParsedStorage = storageItem => {
  return JSON.parse(storageItem);
};

module.exports = {
  explicitWait,
  getParsedStorage
};
