//to make the GraphQL wrapper of the REST API, we need to work with the RESTDataSource class
const { RESTDataSource } = require('apollo-datasource-rest')

//assuming we're in a dev environment, we're going to require secrets to keep from pasting our API key in our code
if (process.env.NODE_ENV !== 'production') require('../secrets')

class WeatherAPI extends RESTDataSource {
  constructor() {
    super()
    //this is the base url for our API call, if you had more than one async query below this base would be the point where the queries diverge
    this.baseURL = 'http://api.openweathermap.org/data/2.5/weather'
  }
  //this is our main fetch call for our weather query
  async getWeather({ zip }) {
    //use template literals so you can change the zip code with each query - our client side application will provide the zip
    const response = await this.get(`?zip=${zip},us&units=imperial&appid=${process.env.OPENWEATHER_API_KEY}`)
    return this.weatherReducer(response, zip)
  }
  // our async call will pass data to this reducer, which will return the data mapped to our GraphQL schema
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
