const SQL = require('sequelize');
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const Op = SQL.Op;
module.exports.createStore = () => {
	const db = new SQL({
		dialect: 'mysql',
		database: process.env.DB_NAME,
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000
		},
		define: {
			timestamps: false
		},
		logging: false,
	});

	const states = db.define('States', {
		id: {
			field: 'state_id',
			type: SQL.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		code: {
			field: 'state_code',
			type: SQL.STRING(2)
		},
		name: {
			field: 'state_name',
			type: SQL.STRING
		}
	});

	const cities = db.define('Cities', {
		id: {
			field: 'city_id',
			type: SQL.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			field: 'city_name',
			type: SQL.STRING
		},
		state: {
			field: 'state_id',
			type: SQL.INTEGER,
			references: {
				model: states,
				key: 'state_id',
			}
		},
		population: {
			field: 'population',
			type: SQL.INTEGER
		},
		costOfLiving: {
			field: 'cost_of_living',
			type: SQL.DECIMAL(3,2)
		},
		violentCrime: {
			field: 'violent_crime',
			type: SQL.INTEGER
		},
		propertyCrime: {
			field: 'property_crime',
			type: SQL.INTEGER
		},
		happiness: {
			field: 'happiness',
			type: SQL.DECIMAL(5, 2)
		}
	});

	const jobs = db.define('Jobs', {
		id: {
			field: 'job_id',
			type: SQL.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		title: {
			field: 'job_title',
			type: SQL.STRING
		},
		location: {
			field: 'city_id',
			type: SQL.INTEGER,
			references: {
				model: cities,
				key: 'city_id',
			}
		},
		totalJobs: {
			field: 'total_jobs',
			type: SQL.INTEGER
		},
		jobsPerThousand: {
			field: 'jobs_per_thousand',
			type: SQL.DECIMAL(7, 3)
		},
		locationQuotient: {
			field: 'location_quotient',
			type: SQL.DECIMAL(5, 2)
		},
		averageAnnualSalary: {
			field: 'average_annual_salary',
			type: SQL.INTEGER
		},
		medianAnnualSalary: {
			field: 'median_annual_salary',
			type: SQL.INTEGER
		}
	});

	return { states, cities, jobs };
}