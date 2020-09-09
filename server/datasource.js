const { RESTDataSource } = require('apollo-datasource-rest')

//assuming we're in a dev environment, we're going to require secrets to keep from pasting our API key in our code
if (process.env.NODE_ENV !== 'production') require('../secrets')

class WeatherAPI extends RESTDataSource {
  constructor() {
    super()
    //this is the base url for our API call
    this.baseURL = 'http://api.openweathermap.org/data/2.5/weather'
  }
  //
  async getWeather({ zip }) {
    const response = await this.get(`?zip=${zip},us&units=imperial&appid=${process.env.OPENWEATHER_API_KEY}`)
    return this.weatherReducer(response, zip)
  }
  weatherReducer(weather, zip) {
    const sunrise = new Date(weather.sys.sunrise * 1000).toLocaleTimeString()
    const sunset = new Date(weather.sys.sunset * 1000).toLocaleTimeString()
    return {
      id: weather.id || 0,
      zip: zip,
      cityName: weather.name,
      longitude: weather.coord.lon,
      latitude: weather.coord.lat,
      currentWeather: {
        status: weather.weather[0].main,
        description: weather.weather[0].description,
        temp: weather.main.temp,
        tempHigh: weather.main.temp_max,
        tempLow: weather.main.temp_min,
        pressure: weather.main.pressure,
        humidity: weather.main.humidity,
        windSpeed: weather.wind.speed
      },
      sunrise,
      sunset
    }
  }
}

module.exports = WeatherAPI
