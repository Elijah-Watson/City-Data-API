const { DataSource } = require('apollo-datasource');
const { UserInputError } = require('apollo-server');
const Op = require('Sequelize').Op;

class CityAPI extends DataSource {
	constructor({ store }) {
		super();
		this.store = store;
	}

	/**
	 * This is a function that gets called by ApolloServer when being setup.
	 * This function gets called with the datasource config including things
	 * like caches and context. We'll assign this.context to the request context
	 * here, so we can know about the user making requests
	 */
	initialize(config) {
		this.context = config.context;
	}

	async getStates() {
		const found = await this.store.states.findAll();
		return found && found.length
			? found
			: [];
	}

	async getStateByCityId({ cityId }) {
		const city = await this.store.cities.findOne({
			where: { id: cityId },
		});
		const stateId = city.state;
		const found = await this.store.states.findOne({
			where: { id: stateId },
		});
		return found
			? found
			: {};
	}

	async getStateByName({ stateName }) {
		const found = await this.store.states.findOne({
			where: { name: stateName },
		});
		return found
			? found
			: {};
	}

	async getStateByCode({ stateCode }) {
		const found = await this.store.states.findOne({
			where: { code: stateCode },
		});
		return found
			? found
			: {};
	}

	async getCity({ input }) {
		if (input.id && input.location) {
			throw new UserInputError('Enter either city id or city and state name, not both.');
		}
		else if (input.id) {
			return await this.getCityById({ cityId: input.id });
		} else if (input.location) {
			return await this.getCityByNameAndState({ cityName: input.location.cityName, stateName: input.location.stateName });
		}
	}

	async getCityById({ cityId }) {
		const found = await this.store.cities.findOne({
			where: { id: cityId },
		});
		return found
			? found
			: {};
	}

	async getCityByNameAndState({ cityName, stateName }) {
		const state = await this.getStateByName({ stateName });
		const found = await this.store.cities.findOne({
			where: { name: cityName, state: state.id },
		});
		return found
			? found
			: {};
	}

	async getCities({ stateName, ids }) {
		if (stateName && ids) {
			return await this.getCitiesByStateNameAndIds({ stateName, ids });
		} else if (stateName) {
			return await this.getCitiesByStateName({ stateName });
		} else if (ids) {
			return await this.getCitiesByIds({ ids });
		} else {
			return await this.getAllCities();
		}
	}

	async getAllCities() {
		const found = await this.store.cities.findAll();
		return found && found.length
			? found
			: [];
	}

	async getCitiesByStateNameAndIds({ stateName, ids }) {
		if (ids.length <= 0) return [];
		const state = await this.getStateByName({ stateName });
		const found = await this.store.cities.findAll({
			where: {
				id: {
					[Op.or]: ids
				},
				state: state.id
			},
		});
		return found && found.length
			? found
			: [];
	}

	async getCitiesByIds({ ids }) {
		if (ids.length <= 0) return [];
		const found = await this.store.cities.findAll({
			where: {
				id: {
					[Op.or]: ids
				}
			},
		});
		return found && found.length
			? found
			: [];
	}

	async getCitiesByStateName({ stateName }) {
		const state = await this.getStateByName({ stateName });
		return await this.getCitiesByStateId({ stateId: state.id });
	}

	async getCitiesByStateId({ stateId }) {
		const found = await this.store.cities.findAll({
			where: { state: stateId },
		});
		return found && found.length
			? found
			: [];
	}

	async getCityById({ cityId }) {
		const found = await this.store.cities.findOne({
			where: { id: cityId },
		});
		return found
			? found
			: {};
	}

	async getCityByJobId({ jobId }) {
		const job = await this.store.jobs.findOne({
			where: { id: jobId || null },
		});
		return job
			? await this.getCityById({ cityId: job.location })
			: {};
	}

	async getJobs({ cityName, stateName }) {
		let jobs = [];
		if (cityName && stateName) {
			jobs = await this.getJobsByCityAndStateName({ cityName, stateName });
		} else if (!cityName && stateName) {
			jobs = await this.getJobsByStateName({ stateName });
		} else if (cityName && !stateName) {
			jobs = [];
			throw new UserInputError('Failed to get jobs because cityName must be accompanied by stateName.');
		} else {
			jobs = await this.getAllJobs();
		}
		return jobs;
	}

	async getAllJobs() {
		const found = await this.store.jobs.findAll();
		return found && found.length
			? found
			: [];
	}

	async getJobsByStateName({ stateName }) {
		const cities = await this.getCitiesByStateName({ stateName });
		const locations = cities.map(city => city.dataValues.id);
		const found = await this.store.jobs.findAll({
			where: {
				location: {
					[Op.or]: locations
				}
			},
		});
		return found && found.length
			? found
			: [];
	}

	async getJobsByStateId({ stateId }) {
		const cities = await this.getCitiesByStateId({ stateId });
		const locations = cities.map(city => city.dataValues.id);
		const found = await this.store.jobs.findAll({
			where: {
				location: {
					[Op.or]: locations
				}
			},
		});
		return found && found.length
			? found
			: [];
	}

	async getJobsByCityAndStateName({ cityName, stateName }) {
		const city = await this.getCityByNameAndState({ cityName, stateName });
		return await this.getJobsByCityId({ cityId: city.id });
	}

	async getJobsByCityId({ cityId }) {
		const found = await this.store.jobs.findAll({
			where: { location: cityId },
		});
		return found && found.length
			? found
			: [];
	}

	async getJobByCityIdAndTitle({ cityId, title }) {
		const found = await this.store.jobs.findOne({
			where: { location: cityId, title },
		});
		return found
			? found
			: {};
	}

	async getJobByTitleAndLocation({ jobTitle, cityName, stateName }) {
		const city = await this.getCityByNameAndState({ cityName, stateName });
		const found = await this.store.jobs.findOne({
			where: { title: jobTitle, location: city.id },
		});
		return found
			? found
			: {};
	}
}

module.exports = CityAPI;