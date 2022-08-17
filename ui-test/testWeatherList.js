const { MONITOR_CNT, MONITOR_INTERVAL } = require('./constant');

const { TC } = require('./testcase');
const { explicitWait } = require('./utils');

const testWeatherList = async page => {
  const weatherEle = await explicitWait(page, '[data-testid="weather-panel"]', MONITOR_CNT, MONITOR_INTERVAL);

  const weatherList = await page.evaluate(() => {
    const weather_arr = Array.from(document.querySelector('[data-testid="weather-panel"]').childNodes);
    const weatherTextList = weather_arr.map(item => item.innerText);
    return weatherTextList;
  });
  // 날씨 DOM객체와 날씨 텍스트 리스트중 오늘을 포함 ?  성공 : 실패
  !!weatherEle && weatherList.filter(item => item.includes(TC['get-weather'].required)).length > 0
    ? (TC['get-weather'].result = 'Pass')
    : (TC['get-weather'].result = 'Fail');
};

module.exports = {
  testWeatherList
};
