'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class Station extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Station.hasMany(models.WeatherData, {
				foreignKey: 'StationID',
				sourceKey: 'StationID', // Added to match your primary key
				as: 'weatherData',
			})
		}
	}
	Station.init(
		{
			StationID: DataTypes.STRING,
			StationName: DataTypes.STRING,
			StationNameEN: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Station',
		},
	)
	return Station
}
