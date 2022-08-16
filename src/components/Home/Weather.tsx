import React from 'react';
import styled from 'styled-components';

const Weather = () => {
  return (
    <WeatherWrap>
      <h3>이번주 날씨 임시로 atom 써서 todo 리스트 </h3>
    </WeatherWrap>
  );
};

const WeatherWrap = styled.div`
  background: yellow;
  height: 250px;
`;

export default Weather;
