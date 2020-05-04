const { gql } = require('apollo-server-lambda');

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
	jobTitles: [String]
}

type IntRange {
	min: Int
	max: Int
}

type FloatRange {
	min: Float
	max: Float
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
	populationRange: IntRange
	costOfLiving: Float
	costOfLivingRange: FloatRange
	violentCrime: Int
	violentCrimeRange: IntRange
	propertyCrime: Int
	propertyCrimeRange: IntRange
	happiness: Float
	happinessRange: FloatRange
	jobs: [Job]
	job(title: String!): Job
}

type Job {
	id: ID
	title: String
	city: City
	totalJobs: Int
	totalJobsRange: IntRange
	jobsPerThousand: Float
	jobsPerThousandRange: FloatRange
	locationQuotient: Float
	locationQuotientRange: FloatRange
	averageAnnualSalary: Int
	averageAnnualSalaryRange: IntRange
	medianAnnualSalary: Int
	medianAnnualSalaryRange: IntRange
}
`;

module.exports = typeDefs;