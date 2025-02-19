'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('WeatherData', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			StationID: {
				type: Sequelize.STRING,
				allowNull: false,
				references: {
					model: 'Stations', // 參照 Stations 表
					key: 'StationID', // 參照 Stations 的 StationID 欄位
				},
				onUpdate: 'CASCADE', // 若 Stations 的 StationID 更新，這裡也會更新
				onDelete: 'CASCADE', // 若 Stations 的資料被刪除，對應的 WeatherData 也會刪除
			},
			DataTime: {
				type: Sequelize.DATE,
			},
			TideHeight: {
				type: Sequelize.STRING,
			},
			TideLevel: {
				type: Sequelize.STRING,
			},
			WaveHeight: {
				type: Sequelize.STRING,
			},
			WaveDirection: {
				type: Sequelize.STRING,
			},
			WaveDirectionDescription: {
				type: Sequelize.STRING,
			},
			WavePeriod: {
				type: Sequelize.STRING,
			},
			SeaTemperature: {
				type: Sequelize.STRING,
			},
			StationPressure: {
				type: Sequelize.STRING,
			},
			WindSpeed: {
				type: Sequelize.STRING,
			},
			WindScale: {
				type: Sequelize.STRING,
			},
			WindDirection: {
				type: Sequelize.STRING,
			},
			WindDirectionDescription: {
				type: Sequelize.STRING,
			},
			MaximumWindSpeed: {
				type: Sequelize.STRING,
			},
			MaximumWindScale: {
				type: Sequelize.STRING,
			},
			LayerNumber: {
				type: Sequelize.INTEGER,
			},
			CurrentDirection: {
				type: Sequelize.STRING,
			},
			CurrentDirectionDescription: {
				type: Sequelize.STRING,
			},
			CurrentSpeed: {
				type: Sequelize.STRING,
			},
			CurrentSpeedInKnots: {
				type: Sequelize.STRING,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		})
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('WeatherData')
	},
}
