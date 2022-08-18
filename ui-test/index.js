const puppeteer = require('puppeteer');
const { TC } = require('./testcase');
const { testEditModeOn } = require('./testEditModeOn');
const { testHeaderText } = require('./testHeaderText');
const { testTodoCreateOnce } = require('./testTodoCreateOnce');
const { testTodoCreateTwice } = require('./testTodoCreateTwice');
const { testTodoDelete } = require('./testTodoDelete');
const { testTodoUpdate } = require('./testTodoUpdate');
const { testWeatherList } = require('./testWeatherList');
const path = require('path');

const main = async () => {
  // headless : true -> 크로미움 브라우저가 열리지 않는 headless로 동작
  // headless : false -> 크로미움 브라우저가 열림
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--window-size=1920,1080']
  });
  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:3000');

  //헤더 테스트
  await testHeaderText(page);

  // 날씨 리스트  테스트
  await testWeatherList(page);
  await page.screenshot({
    path: path.join(__dirname, `/images/TESTCASE_${TC['get-weather'].scenario}.png`)
  });

  // To-do 생성 테스트 케이스 1
  await testTodoCreateOnce(page);
  await page.screenshot({
    path: path.join(__dirname, `/images/TESTCASE_${TC['todo-create-1'].scenario}.png`)
  });

  // To-do 생성 테스트 케이스 2
  await testTodoCreateTwice(page);
  await page.screenshot({
    path: path.join(__dirname, `/images/TESTCASE_${TC['todo-create-2'].scenario}.png`)
  });

  //To-do 삭제 테스트 케이스
  await testTodoDelete(page);
  await page.screenshot({
    path: path.join(__dirname, `/images/TESTCASE_${TC['todo-delete'].scenario}.png`)
  });

  // 일정 (이번주 할일 1)클릭 후 편집모드 헤더 테스트
  await testEditModeOn(page);
  await page.screenshot({
    path: path.join(__dirname, `/images/TESTCASE_${TC['edit-mode-on'].scenario}.png`)
  });

  // 일정 내용 편집 테스트
  await testTodoUpdate(page);
  await page.screenshot({
    path: path.join(__dirname, `/images/TESTCASE_${TC['todo-update'].scenario}.png`)
  });

  console.log('결과  :', TC);
};

main();
