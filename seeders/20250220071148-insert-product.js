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
			{
				productId: 'P123457',
				name: 'Advanced Wakeboard',
				type: 'Wakeboard',
				grade: 'B',
				price: 6999,
				quantity: 15,
				status: true,
				hasDiscount: true,
				imageUrl: 'https://example.com/images/wakeboard.jpg',
				description: 'An advanced wakeboard for experienced riders.',
				length: 180,
				width: 45,
				thickness: 4,
				buoyancy: 75,
			},
			{
				productId: 'P123458',
				name: 'Classic Paddleboard',
				type: 'Paddleboard',
				grade: 'A',
				price: 4999,
				quantity: 30,
				status: true,
				hasDiscount: false,
				imageUrl: 'https://example.com/images/paddleboard.jpg',
				description: 'A sturdy paddleboard for both beginners and experts.',
				length: 220,
				width: 60,
				thickness: 6,
				buoyancy: 90,
			},
			{
				productId: 'P123459',
				name: 'Luxury Kayak',
				type: 'Kayak',
				grade: 'A',
				price: 12999,
				quantity: 12,
				status: true,
				hasDiscount: false,
				imageUrl: 'https://example.com/images/kayak.jpg',
				description: 'A high-end kayak built for comfort and speed.',
				length: 250,
				width: 80,
				thickness: 10,
				buoyancy: 95,
			},
			{
				productId: 'P123460',
				name: 'Mountain Bike',
				type: 'Bike',
				grade: 'B',
				price: 5999,
				quantity: 25,
				status: true,
				hasDiscount: true,
				imageUrl: 'https://example.com/images/mountain_bike.jpg',
				description: 'A durable mountain bike for rough terrain.',
				length: 150,
				width: 70,
				thickness: 5,
				buoyancy: 80,
			},
			{
				productId: 'P123461',
				name: 'City Bike',
				type: 'Bike',
				grade: 'A',
				price: 3999,
				quantity: 40,
				status: true,
				hasDiscount: false,
				imageUrl: 'https://example.com/images/city_bike.jpg',
				description: 'A comfortable bike perfect for city commuting.',
				length: 160,
				width: 60,
				thickness: 4,
				buoyancy: 70,
			},
			{
				productId: 'P123462',
				name: 'Trail Running Shoes',
				type: 'Shoes',
				grade: 'A',
				price: 2999,
				quantity: 50,
				status: true,
				hasDiscount: true,
				imageUrl: 'https://example.com/images/running_shoes.jpg',
				description: 'Lightweight running shoes designed for trail runners.',
				length: 30,
				width: 20,
				thickness: 2,
				buoyancy: 60,
			},
			{
				productId: 'P123463',
				name: 'Casual Sneakers',
				type: 'Shoes',
				grade: 'B',
				price: 1999,
				quantity: 100,
				status: true,
				hasDiscount: true,
				imageUrl: 'https://example.com/images/sneakers.jpg',
				description: 'Comfortable sneakers for everyday wear.',
				length: 28,
				width: 18,
				thickness: 3,
				buoyancy: 50,
			},
			{
				productId: 'P123464',
				name: 'Fishing Rod',
				type: 'Fishing Gear',
				grade: 'A',
				price: 4999,
				quantity: 10,
				status: true,
				hasDiscount: false,
				imageUrl: 'https://example.com/images/fishing_rod.jpg',
				description: 'A high-quality rod for both beginners and pros.',
				length: 200,
				width: 10,
				thickness: 2,
				buoyancy: 70,
			},
			{
				productId: 'P123465',
				name: 'Camping Tent',
				type: 'Camping Gear',
				grade: 'A',
				price: 7999,
				quantity: 15,
				status: true,
				hasDiscount: true,
				imageUrl: 'https://example.com/images/camping_tent.jpg',
				description: 'A spacious and durable tent for camping trips.',
				length: 300,
				width: 200,
				thickness: 5,
				buoyancy: 80,
			},
			{
				productId: 'P123466',
				name: 'Electric Skateboard',
				type: 'Skateboard',
				grade: 'B',
				price: 8999,
				quantity: 20,
				status: true,
				hasDiscount: false,
				imageUrl: 'https://example.com/images/electric_skateboard.jpg',
				description: 'A fast and efficient electric skateboard for urban commutes.',
				length: 100,
				width: 25,
				thickness: 5,
				buoyancy: 60,
			},
			{
				productId: 'P123467',
				name: 'Standard Skateboard',
				type: 'Skateboard',
				grade: 'A',
				price: 1999,
				quantity: 40,
				status: true,
				hasDiscount: false,
				imageUrl: 'https://example.com/images/skateboard.jpg',
				description: 'A classic skateboard for all levels of riders.',
				length: 90,
				width: 22,
				thickness: 4,
				buoyancy: 50,
			},
			{
				productId: 'P123468',
				name: 'Stand-up Paddleboard',
				type: 'Paddleboard',
				grade: 'A',
				price: 6999,
				quantity: 30,
				status: true,
				hasDiscount: true,
				imageUrl: 'https://example.com/images/standup_paddleboard.jpg',
				description: 'A versatile paddleboard for both beginners and experienced paddlers.',
				length: 250,
				width: 70,
				thickness: 7,
				buoyancy: 85,
			},
			{
				productId: 'P123469',
				name: 'Portable Barbecue Grill',
				type: 'Camping Gear',
				grade: 'B',
				price: 1499,
				quantity: 25,
				status: true,
				hasDiscount: false,
				imageUrl: 'https://example.com/images/barbecue_grill.jpg',
				description: 'Compact and easy-to-use portable grill for outdoor cooking.',
				length: 60,
				width: 40,
				thickness: 5,
				buoyancy: 30,
			},
			{
				productId: 'P123470',
				name: 'Snowboard',
				type: 'Snowboard',
				grade: 'A',
				price: 7999,
				quantity: 18,
				status: true,
				hasDiscount: true,
				imageUrl: 'https://example.com/images/snowboard.jpg',
				description: 'A premium snowboard designed for winter sports enthusiasts.',
				length: 170,
				width: 40,
				thickness: 6,
				buoyancy: 90,
			},
			{
				productId: 'P123471',
				name: 'Ski Poles',
				type: 'Skiing Gear',
				grade: 'A',
				price: 2499,
				quantity: 22,
				status: true,
				hasDiscount: false,
				imageUrl: 'https://example.com/images/ski_poles.jpg',
				description: 'Durable ski poles built for precision and performance.',
				length: 130,
				width: 5,
				thickness: 1,
				buoyancy: 40,
			},
			{
				productId: 'P123472',
				name: 'Snow Boots',
				type: 'Winter Gear',
				grade: 'A',
				price: 3999,
				quantity: 30,
				status: true,
				hasDiscount: false,
				imageUrl: 'https://example.com/images/snow_boots.jpg',
				description: 'Insulated snow boots for maximum warmth in cold conditions.',
				length: 35,
				width: 30,
				thickness: 10,
				buoyancy: 80,
			},
			{
				productId: 'P123473',
				name: 'Winter Jacket',
				type: 'Outerwear',
				grade: 'A',
				price: 5999,
				quantity: 40,
				status: true,
				hasDiscount: true,
				imageUrl: 'https://example.com/images/winter_jacket.jpg',
				description: 'A warm, insulated jacket perfect for extreme cold weather.',
				length: 120,
				width: 60,
				thickness: 12,
				buoyancy: 90,
			},
			{
				productId: 'P123474',
				name: 'Leather Gloves',
				type: 'Winter Gear',
				grade: 'B',
				price: 1299,
				quantity: 50,
				status: true,
				hasDiscount: true,
				imageUrl: 'https://example.com/images/leather_gloves.jpg',
				description: 'Stylish leather gloves with thermal lining.',
				length: 25,
				width: 15,
				thickness: 2,
				buoyancy: 60,
			},
			{
				productId: 'P123475',
				name: 'Winter Hat',
				type: 'Winter Gear',
				grade: 'B',
				price: 799,
				quantity: 80,
				status: true,
				hasDiscount: false,
				imageUrl: 'https://example.com/images/winter_hat.jpg',
				description: 'Warm and cozy winter hat for cold days.',
				length: 20,
				width: 20,
				thickness: 3,
				buoyancy: 70,
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
		await queryInterface.bulkDelete('Products', null, {})
	},
}
