const { gql } = require('apollo-server')

const typeDefs = gql`
  # weather schema
  type Weather {
    id: ID!
    zip: String!
    cityName: String!
    longitude: Float!
    latitude: Float!
    currentWeather: CurrentWeather!
    sunrise: String!
    sunset: String!
  }
  type CurrentWeather {
    status: String!
    description: String!
    icon: String!
    temp: Float!
    feels_like: Float!
    tempHigh: Float!
    tempLow: Float!
    pressure: Int!
    humidity: Int!
    windSpeed: Float!
  }
  # queries
  type Query {
    weather(zip: String!): Weather
  }
`

module.exports = typeDefs
