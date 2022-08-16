import React, { Suspense } from 'react';
import styled from 'styled-components';
import { useRecoilValueLoadable } from 'recoil';
import { weatherList } from '../../recoil/todo';

const Loading = () => {
  return <div className="lds-dual-ring"></div>;
};

const Weather: React.FC = () => {
  const weathers = useRecoilValueLoadable(weatherList);

  const renderWeatherCard = () => {
    switch (weathers.state) {
      case 'hasValue':
        return (
          <>
            {weathers.contents.map(weather => (
              <WeatherCard key={weather.key} className="card">
                <TempWrap>{weather.temp}℃</TempWrap>
                <WeatherImg src={weather.imageURL} />
              </WeatherCard>
            ))}
          </>
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
      <WeatherCardWrap>{renderWeatherCard()}</WeatherCardWrap>
    </WeatherWrap>
  );
};

const WeatherWrap = styled.div`
  height: 250px;
  width: 100%;
`;

const LoaderWrap = styled.div`
  width: 100%;
  height: 170px;
  align-items: center;
  background: #13bd7e22;
  display: flex;
  align-items: center;
  justify-content: center;
  .lds-dual-ring {
    display: inline-block;
    width: 80px;
    height: 80px;
  }
  .lds-dual-ring:after {
    content: ' ';
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #13bd7e;
    border-color: #13bd7e transparent #13bd7e transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const WeatherCardWrap = styled.div`
  display: flex;
  flex-wrap: no-wrap;
  overflow-x: scroll;
  overflow-y: hidden;
`;

const WeatherCard = styled.div`
  background: beige;
  width: 120px;
  height: 170px;
  flex: 0 0 auto;
  margin-left: 15px;
  z-index: 3;
`;

const TempWrap = styled.div`
  font-weight: bold;
  font-size: 17px;
`;

const WeatherImg = styled.img`
  width: 100px;
  height: 100px;
`;
export default Weather;
