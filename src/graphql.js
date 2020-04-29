const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const { createStore } = require('./utils');
const resolvers = require('./resolvers');

const CityAPI = require('./datasources/cities');

const store = createStore();

const server = new ApolloServer({
	typeDefs,
	resolvers,
	dataSources: () => ({
		cityAPI: new CityAPI({ store })
	})
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`);
});