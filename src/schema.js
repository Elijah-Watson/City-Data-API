const { gql } = require('apollo-server');

const typeDefs = gql`
input LocationInput {
	cityName: String,
	stateName: String
}

input CityInput {
	id: ID,
	location: LocationInput
}

type Query {
	states: [State]
	city(input: CityInput!): City
	cities(stateName: String, ids: [ID]): [City]
	job(title: String!, cityName: String!, stateName: String!): Job
	jobs(cityName: String, stateName: String): [Job]
}

type State {
	id: ID
	name: String
	code: String
	cities: [City]
}

type City {
	id: ID
	name: String
	state: State
	population: Int
	costOfLiving: Float
	violentCrime: Int
	propertyCrime: Int
	happiness: Float
	jobs: [Job]
	job(title: String!): Job
}

type Job {
	id: ID
	title: String
	city: City
	totalJobs: Int
	jobsPerThousand: Float
	locationQuotient: Float
	averageAnnualSalary: Int
	medianAnnualSalary: Int
}
`;

module.exports = typeDefs;