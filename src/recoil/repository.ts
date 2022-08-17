import axios from 'axios';
import WeatherModel from './weatherModel';

const weatherURL = 'https://openweathermap.org';
export const API = axios.create({ baseURL: weatherURL });

export const Repository = {
  async getWeatherList() {
    try {
      const { data, status } = await API.get(
        '/data/2.5/onecall?lat=37.5683&lon=126.9778&units=metric&appid=439d4b804bc8187953eb36d2a8c26a02'
      );
      data.daily.pop();
      return data.daily.map(dayWeather => new WeatherModel(dayWeather));
    } catch (err) {
      throw err;
    }
  }
};
