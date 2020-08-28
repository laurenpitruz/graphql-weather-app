module.exports = {
  Query: {
    weather: (_, { zip }, { dataSources }) =>
    dataSources.weatherAPI.getWeather({ zip })
  }
}
