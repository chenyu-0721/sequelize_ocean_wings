'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */

		await queryInterface.bulkInsert('Products', [
			{
				productId: 'P123456',
				name: 'Premium Surfboard',
				type: 'Surfboard',
				grade: 'A',
				price: 8999,
				quantity: 20,
				status: true,
				hasDiscount: false,
				imageUrl: 'https://example.com/images/surfboard.jpg',
				description: 'A high-quality surfboard designed for professionals.',
				length: 200,
				width: 50,
				thickness: 5,
				buoyancy: 85,
			},
		])
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},
}
