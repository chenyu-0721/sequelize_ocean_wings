'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Products', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			productId: {
				type: Sequelize.STRING,
			},
			name: {
				type: Sequelize.STRING,
			},
			type: {
				type: Sequelize.STRING,
			},
			grade: {
				type: Sequelize.STRING,
			},
			price: {
				type: Sequelize.INTEGER,
			},
			quantity: {
				type: Sequelize.INTEGER,
				defaultValue: 0,
			},
			status: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},
			hasDiscount: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},
			imageUrl: {
				type: Sequelize.STRING,
			},
			description: {
				type: Sequelize.STRING,
			},
			length: {
				type: Sequelize.INTEGER,
			},
			width: {
				type: Sequelize.INTEGER,
			},
			thickness: {
				type: Sequelize.INTEGER,
			},
			buoyancy: {
				type: Sequelize.INTEGER,
			},
			createdAt: {
				type: Sequelize.DATE,
				defaultValue: new Date(),
			},
			updatedAt: {
				type: Sequelize.DATE,
				defaultValue: new Date(),
			},
		})
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Products')
	},
}
