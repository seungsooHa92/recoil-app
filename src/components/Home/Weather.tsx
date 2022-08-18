import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useRecoilValueLoadable, useRecoilValue } from 'recoil';
import { weatherList, todayWeather } from '../../recoil/todo';
import moment from 'moment';
import {
  WeatherCardWrap,
  WeatherCard,
  TempWrap,
  WeatherImg,
  WeatherDate,
  LoaderWrap,
  WeatherWrap
} from './weatherStyles';
import WeatherModel from 'src/recoil/weatherModel';

const Loading = () => {
  return <div className="lds-dual-ring"></div>;
};

const Weather: React.FC = () => {
  const weathers = useRecoilValueLoadable(weatherList);
  const today = useRecoilValueLoadable(todayWeather);
  const [focusedDay, setFocusedDay] = useState<Date>(null);
  const cardRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (today.state === 'hasValue') {
      setFocusedDay(today.contents.krtime);
    }
  }, [today]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>, index, weather: WeatherModel) => {
    cardRef.current[index].scrollIntoView();
    setFocusedDay(weather.krtime);
  };
  const isToday = (date: Date): boolean => {
    return new Date().getDate() === date.getDate();
  };
  const isFocusedDay = (date: Date): boolean => {
    return focusedDay?.getTime() === date.getTime();
  };

  const renderWeatherCard = () => {
    switch (weathers.state) {
      case 'hasValue':
        return (
          <WeatherCardWrap data-testid="weather-panel">
            {weathers.contents.map((weather, index) => (
              <WeatherCard
                key={weather.key}
                ref={el => (cardRef.current[index] = el)}
                onClick={e => handleClick(e, index, weather)}
                className={isFocusedDay(weather.krtime) ? 'card-today' : 'card'}
              >
                <TempWrap>{weather.temp}℃</TempWrap>
                <WeatherImg src={weather.imageURL} />
                <WeatherDate>
                  {isToday(weather.krtime) ? '오늘 ' : ''}
                  {moment(weather.krtime).format('MM.DD')}
                </WeatherDate>
              </WeatherCard>
            ))}
          </WeatherCardWrap>
        );
      case 'loading':
        return (
          <LoaderWrap>
            <Loading />
          </LoaderWrap>
        );
      case 'hasError':
        throw weathers.contents;
    }
  };

  return (
    <WeatherWrap>
      <h3>이번주 날씨 </h3>
      {renderWeatherCard()}
    </WeatherWrap>
  );
};

export default Weather;
