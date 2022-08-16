import React from 'react';
import styled from 'styled-components';

const Weather = () => {
  return (
    <WeatherWrap>
      <h3>이번주 날씨 </h3>
      <WeatherCardWrap>
        <WeatherCard className="card">카드1</WeatherCard>
        <WeatherCard className="card">카드2</WeatherCard>
        <WeatherCard className="card">카드3</WeatherCard>
        <WeatherCard className="card">카드4</WeatherCard>
        <WeatherCard className="card">카드5</WeatherCard>
        <WeatherCard className="card">카드6</WeatherCard>
        <WeatherCard className="card">카드7</WeatherCard>
      </WeatherCardWrap>
    </WeatherWrap>
  );
};

const WeatherWrap = styled.div`
  height: 250px;
  width: 100%;
  padding-left: 0;
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
export default Weather;
