class WeatherModel {
  response;
  constructor(weatherMeta) {
    this.response = weatherMeta;
  }
  get imageURL(): string {
    return `https://openweathermap.org/img/wn/${this.response.weather[0].icon}@2x.png`;
  }
  get key(): string {
    return new Date(this.response.dt).toISOString();
  }
  get temp(): number {
    return this.response.temp.max;
  }

  get krtime(): Date {
    return new Date(this.response.dt * 1000);
  }
}

export default WeatherModel;
