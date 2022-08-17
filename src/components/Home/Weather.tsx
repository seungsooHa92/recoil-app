import React from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { weatherList } from '../../recoil/todo';
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

const Loading = () => {
  return <div className="lds-dual-ring"></div>;
};

const Weather: React.FC = () => {
  const weathers = useRecoilValueLoadable(weatherList);
  const isToday = (date: Date): boolean => {
    return new Date().getDate() === date.getDate();
  };
  const renderWeatherCard = () => {
    switch (weathers.state) {
      case 'hasValue':
        return (
          <WeatherCardWrap data-testid="weather-panel" onScroll={e => handleScroll(e)}>
            {weathers.contents.map(weather => (
              <WeatherCard key={weather.key} className={isToday(weather.krtime) ? 'card-today' : 'card'}>
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

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    //TODO
    console.log('스크롤 ....');
    console.log(e.target);
  };
  return (
    <WeatherWrap>
      <h3>이번주 날씨 </h3>
      {renderWeatherCard()}
    </WeatherWrap>
  );
};

export default Weather;
