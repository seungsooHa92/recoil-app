const puppeteer = require('puppeteer');
const { TC } = require('./testcase');
const { explicitWait, getParsedStorage } = require('./utils');
const MONITOR_CNT = 5;
const path = require('path');
const MONITOR_INTERVAL = 500;

const main = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--window-size=1920,1080']
  });
  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:3000');

  const headerEle = await explicitWait(page, '[data-testid="header"]', MONITOR_CNT, MONITOR_INTERVAL);
  const weatherEle = await explicitWait(page, '[data-testid="weather-panel"]', MONITOR_CNT, MONITOR_INTERVAL);
  const todoEle = await explicitWait(page, '[data-testid="todo-panel"]', MONITOR_CNT, MONITOR_INTERVAL);
  const deleteIconEle = await explicitWait(page, '[data-testid="delete-icon"]', MONITOR_CNT, MONITOR_INTERVAL);

  // 헤더 테스트
  const headerText = await page.evaluate(() => {
    const header = document.querySelector('[data-testid="header"]');
    return Promise.resolve(header.textContent);
  });

  // 헤더 텍스트가 THIS WEEK ? 성공 : 실패
  !!headerEle && headerText === TC['header-text'].required
    ? (TC['header-text'].result = 'Pass')
    : (TC['header-text'].result = 'Fail');

  // 날씨 테스트
  const weatherList = await page.evaluate(() => {
    const weather_arr = Array.from(document.querySelector('[data-testid="weather-panel"]').childNodes);
    const weatherTextList = weather_arr.map(item => item.innerText);
    return weatherTextList;
  });
  // 날씨 DOM객체와 날씨 텍스트 리스트중 오늘을 포함 ?  성공 : 실패
  !!weatherEle && weatherList.filter(item => item.includes(TC['get-weather'].required)).length > 0
    ? (TC['get-weather'].result = 'Pass')
    : (TC['get-weather'].result = 'Fail');

  await page.screenshot({
    path: path.join(__dirname, `/images/${TC['get-weather'].scenario}.png`)
  });

  // To-do 생성 테스트 케이스 1
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
  await page.screenshot({
    path: path.join(__dirname, `/images/${TC['todo-create-1'].scenario}.png`)
  });

  // To-do 생성 테스트 케이스 2
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

  await page.screenshot({
    path: path.join(__dirname, `/images/${TC['todo-create-2'].scenario}.png`)
  });

  //To-do 삭제 테스트 케이스

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

  !!deleteIconEle && console.log(getParsedStorage(todoDelete.storage).length);

  getParsedStorage(todoDelete.storage).length === 1 && todoDelete.panel === TC['todo-delete'].required
    ? (TC['todo-delete'].result = 'Pass')
    : (TC['todo-delete'].result = 'Fail');

  await page.screenshot({
    path: path.join(__dirname, `/images/${TC['todo-delete'].scenario}.png`)
  });

  // 일정 클릭 후 편집모드 헤더 테스트 (이번주 할일 1)
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

  await page.screenshot({
    path: path.join(__dirname, `/images/${TC['edit-mode-on'].scenario}.png`)
  });

  // 일정 내용 편집 테스트

  await page.type('[data-testid="title-input"]', TC['todo-update'].required.title);
  await page.screenshot({
    path: path.join(__dirname, `/images/${TC['todo-update'].required.title}.png`)
  });

  await page.type('[data-testid="content-input"]', TC['todo-update'].required.content);
  await page.screenshot({
    path: path.join(__dirname, `/images/${TC['todo-update'].required.content}.png`)
  });

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

  todoUpdated.storage[0].content === TC['todo-update'].required.content &&
  todoUpdated.panel === TC['todo-update'].required.title
    ? (TC['todo-update'].result = 'Pass')
    : (TC['todo-update'].result = 'Fail');

  await page.screenshot({
    path: path.join(__dirname, `/images/${TC['todo-update'].scenario}.png`)
  });

  // console.log(TC);
};

main();
