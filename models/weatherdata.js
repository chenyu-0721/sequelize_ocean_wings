'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class WeatherData extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// WeatherData 和 Stations 的關聯
			WeatherData.belongsTo(models.Station, {
				foreignKey: 'StationID',
				targetKey: 'StationID',
				as: 'station',
			})
		}
	}

	WeatherData.init(
		{
			StationID: DataTypes.STRING, // 站點識別碼
			DataTime: DataTypes.DATE, // 資料時間
			TideHeight: DataTypes.STRING, // 潮高
			TideLevel: DataTypes.STRING, // 潮位
			WaveHeight: DataTypes.STRING, // 波高
			WaveDirection: DataTypes.STRING, // 波浪方向
			WaveDirectionDescription: DataTypes.STRING, // 波浪方向描述
			WavePeriod: DataTypes.STRING, // 波浪周期
			SeaTemperature: DataTypes.STRING, // 海水溫度
			StationPressure: DataTypes.STRING, // 站點氣壓
			WindSpeed: DataTypes.STRING, // 風速
			WindScale: DataTypes.STRING, // 風力等級
			WindDirection: DataTypes.STRING, // 風向
			WindDirectionDescription: DataTypes.STRING, // 風向描述
			MaximumWindSpeed: DataTypes.STRING, // 最大風速
			MaximumWindScale: DataTypes.STRING, // 最大風力等級
			LayerNumber: DataTypes.INTEGER, // 層數
			CurrentDirection: DataTypes.STRING, // 流向
			CurrentDirectionDescription: DataTypes.STRING, // 流向描述
			CurrentSpeed: DataTypes.STRING, // 流速
			CurrentSpeedInKnots: DataTypes.STRING, // 流速（節）
		},
		{
			sequelize,
			modelName: 'WeatherData',
		},
	)
	return WeatherData
}
