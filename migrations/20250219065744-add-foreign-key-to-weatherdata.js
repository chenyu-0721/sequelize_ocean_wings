'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		// 為現有的 StationID 欄位新增外鍵約束
		await queryInterface.addConstraint('WeatherData', {
			fields: ['StationID'], // 指定要設置外鍵的欄位
			type: 'foreign key',
			name: 'fk_stationid_weatherdata', // 自訂外鍵名稱
			references: {
				model: 'Stations', // 參照的表格名稱
				key: 'StationID', // 參照的欄位
			},
			onUpdate: 'CASCADE', // 當 StationID 更新時，WeatherData 會跟著更新
			onDelete: 'SET NULL', // 當 StationID 被刪除時，WeatherData 中的 StationID 設為 null
		})
	},

	async down(queryInterface, Sequelize) {
		// 如果需要回滾這個外鍵約束，則刪除外鍵
		await queryInterface.removeConstraint('WeatherData', 'fk_stationid_weatherdata')
	},
}
