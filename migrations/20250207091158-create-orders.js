'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('orders', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			user_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'users',
					key: 'id',
				},
				onDelete: 'CASCADE',
			},
			status: {
				type: Sequelize.STRING,
				allowNull: false,
				defaultValue: 'pending', // 訂單狀態（pending, completed, canceled）
			},
			total_price: {
				type: Sequelize.DECIMAL(10, 2), // 訂單總價格
				allowNull: false,
				defaultValue: 0.0,
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.NOW,
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.NOW,
			},
		})
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('orders')
	},
}
