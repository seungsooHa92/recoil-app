import styled from 'styled-components';

export const WeatherWrap = styled.div`
  height: 250px;
  width: 100%;
`;

export const LoaderWrap = styled.div`
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

export const WeatherCardWrap = styled.div`
  display: flex;
  flex-wrap: no-wrap;
  overflow-x: scroll;
  overflow-y: hidden;
  .card-today {
    background: #13bd7e33;
  }
`;

export const WeatherCard = styled.div`
  text-align: center;
  padding-top: 10px;
  width: 120px;
  height: 170px;
  flex: 0 0 auto;
  margin-left: 15px;
  z-index: 3;
`;

export const TempWrap = styled.div`
  font-weight: bold;
  font-size: 17px;
`;

export const WeatherImg = styled.img`
  width: 100px;
  height: 100px;
`;

export const WeatherDate = styled.div``;
