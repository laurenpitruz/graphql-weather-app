//import the class ApolloServer to create a new server instance
const { ApolloServer } = require('apollo-server')

//these are the exports from the schema and resolvers files we made earlier
const typeDefs = require('./schema');
const resolvers = require('./resolvers')
const WeatherAPI = require('./datasource')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    weatherAPI: new WeatherAPI()
  }),
  engine: {
    reportSchema: true,
    variant: "current"
  }
})


server.listen().then(({ url }) => {
  console.log(`🐕 doggo says let's go to ${url}`);
});
