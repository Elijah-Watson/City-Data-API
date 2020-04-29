module.exports = {
	Query: {
		states: (_, __, { dataSources }) =>
			dataSources.cityAPI.getStates(),
		city: (_, { input }, { dataSources }) =>
			dataSources.cityAPI.getCity({ input }),
		cities: (_, { stateName, ids }, { dataSources }) =>
			dataSources.cityAPI.getCities({ stateName, ids }),
		job: (_, { title, cityName, stateName }, { dataSources }) =>
			dataSources.cityAPI.getJobByTitleAndLocation({ jobTitle: title, cityName, stateName }),
		jobs: (_, { cityName, stateName }, { dataSources }) =>
			dataSources.cityAPI.getJobs({ cityName, stateName })
	},
	State: {
		cities: (state, __, { dataSources }) =>
			dataSources.cityAPI.getCitiesByStateId({ stateId: state.id })
	},
	City: {
		state: (city, __, { dataSources }) =>
			dataSources.cityAPI.getStateByCityId({ cityId: city.id }),
		populationRange: (_, __, { dataSources }) =>
			dataSources.cityAPI.getCityRangeByField({ field: 'population' }),
		costOfLivingRange: (_, __, { dataSources }) =>
			dataSources.cityAPI.getCityRangeByField({ field: 'costOfLiving' }),
		violentCrimeRange: (_, __, { dataSources }) =>
			dataSources.cityAPI.getCityRangeByField({ field: 'violentCrime' }),
		propertyCrimeRange: (_, __, { dataSources }) =>
			dataSources.cityAPI.getCityRangeByField({ field: 'propertyCrime' }),
		happinessRange: (_, __, { dataSources }) =>
			dataSources.cityAPI.getCityRangeByField({ field: 'happiness' }),
		jobs: (city, __, { dataSources }) =>
			dataSources.cityAPI.getJobsByCityId({ cityId: city.id }),
		job: (city, { title }, { dataSources }) =>
			dataSources.cityAPI.getJobByCityIdAndTitle({ cityId: city.id, title })
	},
	Job: {
		city: (job, __, { dataSources }) =>
			dataSources.cityAPI.getCityByJobId({ jobId: job.id }),
		totalJobsRange: (job, __, { dataSources }) =>
			dataSources.cityAPI.getJobRangeByField({ field: 'totalJobs', jobTitle: job.title }),
		jobsPerThousandRange: (job, __, { dataSources }) =>
			dataSources.cityAPI.getJobRangeByField({ field: 'jobsPerThousand', jobTitle: job.title }),
		locationQuotientRange: (job, __, { dataSources }) =>
			dataSources.cityAPI.getJobRangeByField({ field: 'locationQuotient', jobTitle: job.title }),
		averageAnnualSalaryRange: (job, __, { dataSources }) =>
			dataSources.cityAPI.getJobRangeByField({ field: 'averageAnnualSalary', jobTitle: job.title }),
		medianAnnualSalaryRange: (job, __, { dataSources }) =>
			dataSources.cityAPI.getJobRangeByField({ field: 'medianAnnualSalary', jobTitle: job.title }),
	}
}