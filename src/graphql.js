const { ApolloServer } = require('apollo-server-lambda');
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
	}),
	playground: { 
		endpoint: "/dev/graphql" 
	}
});

exports.graphqlHandler = server.createHandler({
	cors: {
		origin: '*',
		credentials: true,
	},
});