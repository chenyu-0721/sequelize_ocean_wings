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
				productId: 'P123476',
				name: 'Electric Mountain Bike',
				type: 'Bike',
				grade: 'A',
				price: 15999,
				quantity: 10,
				status: true,
				hasDiscount: false,
				imageUrl: 'https://example.com/images/electric_mountain_bike.jpg',
				description: 'An electric mountain bike designed for tough terrains.',
				length: 160,
				width: 75,
				thickness: 6,
				buoyancy: 85,
			},
			{
				productId: 'P123477',
				name: 'Beach Volleyball',
				type: 'Sports',
				grade: 'A',
				price: 1499,
				quantity: 40,
				status: true,
				hasDiscount: true,
				imageUrl: 'https://example.com/images/beach_volleyball.jpg',
				description: 'A high-quality volleyball designed for beach games.',
				length: 25,
				width: 25,
				thickness: 2,
				buoyancy: 70,
			},
			{
				productId: 'P123478',
				name: 'Snowshoes',
				type: 'Winter Gear',
				grade: 'B',
				price: 3999,
				quantity: 15,
				status: true,
				hasDiscount: false,
				imageUrl: 'https://example.com/images/snowshoes.jpg',
				description: 'Perfect snowshoes for hiking through deep snow.',
				length: 100,
				width: 40,
				thickness: 5,
				buoyancy: 90,
			},
			{
				productId: 'P123479',
				name: 'Fire Pit',
				type: 'Outdoor Gear',
				grade: 'A',
				price: 3999,
				quantity: 25,
				status: true,
				hasDiscount: true,
				imageUrl: 'https://example.com/images/fire_pit.jpg',
				description: 'Portable fire pit perfect for camping and outdoor activities.',
				length: 60,
				width: 60,
				thickness: 5,
				buoyancy: 50,
			},
			{
				productId: 'P123480',
				name: 'Camping Stove',
				type: 'Camping Gear',
				grade: 'A',
				price: 2999,
				quantity: 30,
				status: true,
				hasDiscount: false,
				imageUrl: 'https://example.com/images/camping_stove.jpg',
				description: 'Compact camping stove ideal for outdoor cooking.',
				length: 40,
				width: 30,
				thickness: 4,
				buoyancy: 60,
			},
			{
				productId: 'P123481',
				name: 'Hiking Backpack',
				type: 'Outdoor Gear',
				grade: 'A',
				price: 1999,
				quantity: 50,
				status: true,
				hasDiscount: true,
				imageUrl: 'https://example.com/images/hiking_backpack.jpg',
				description: 'A durable backpack for long hiking trips.',
				length: 60,
				width: 40,
				thickness: 10,
				buoyancy: 80,
			},
			{
				productId: 'P123482',
				name: 'Rock Climbing Harness',
				type: 'Climbing Gear',
				grade: 'A',
				price: 4499,
				quantity: 12,
				status: true,
				hasDiscount: false,
				imageUrl: 'https://example.com/images/climbing_harness.jpg',
				description: 'A high-quality harness for rock climbing.',
				length: 30,
				width: 20,
				thickness: 2,
				buoyancy: 70,
			},
			{
				productId: 'P123483',
				name: 'Climbing Chalk',
				type: 'Climbing Gear',
				grade: 'B',
				price: 899,
				quantity: 80,
				status: true,
				hasDiscount: false,
				imageUrl: 'https://example.com/images/climbing_chalk.jpg',
				description: 'Chalk for a better grip during rock climbing.',
				length: 10,
				width: 10,
				thickness: 2,
				buoyancy: 40,
			},
			{
				productId: 'P123484',
				name: 'Trekking Poles',
				type: 'Outdoor Gear',
				grade: 'A',
				price: 1999,
				quantity: 20,
				status: true,
				hasDiscount: true,
				imageUrl: 'https://example.com/images/trekking_poles.jpg',
				description: 'Adjustable trekking poles for a smooth hiking experience.',
				length: 120,
				width: 5,
				thickness: 1,
				buoyancy: 60,
			},
			{
				productId: 'P123485',
				name: 'Ultra-Light Tent',
				type: 'Camping Gear',
				grade: 'A',
				price: 6999,
				quantity: 10,
				status: true,
				hasDiscount: false,
				imageUrl: 'https://example.com/images/ultra_light_tent.jpg',
				description: 'A lightweight and durable tent perfect for backpackers.',
				length: 220,
				width: 180,
				thickness: 3,
				buoyancy: 75,
			},
			{
				productId: 'P123486',
				name: 'Solar-Powered Lantern',
				type: 'Camping Gear',
				grade: 'A',
				price: 1299,
				quantity: 45,
				status: true,
				hasDiscount: false,
				imageUrl: 'https://example.com/images/solar_lantern.jpg',
				description: 'A solar-powered lantern for your camping adventures.',
				length: 30,
				width: 15,
				thickness: 10,
				buoyancy: 40,
			},
			{
				productId: 'P123487',
				name: 'Fishing Tackle Box',
				type: 'Fishing Gear',
				grade: 'A',
				price: 799,
				quantity: 100,
				status: true,
				hasDiscount: true,
				imageUrl: 'https://example.com/images/tackle_box.jpg',
				description: 'A compact and durable tackle box for all your fishing gear.',
				length: 40,
				width: 25,
				thickness: 10,
				buoyancy: 50,
			},
			{
				productId: 'P123488',
				name: 'Kayak Paddle',
				type: 'Kayak Gear',
				grade: 'A',
				price: 1999,
				quantity: 35,
				status: true,
				hasDiscount: false,
				imageUrl: 'https://example.com/images/kayak_paddle.jpg',
				description: 'A lightweight and durable kayak paddle for smooth paddling.',
				length: 220,
				width: 20,
				thickness: 2,
				buoyancy: 60,
			},
			{
				productId: 'P123489',
				name: 'Swimming Goggles',
				type: 'Swimming Gear',
				grade: 'A',
				price: 799,
				quantity: 200,
				status: true,
				hasDiscount: true,
				imageUrl: 'https://example.com/images/swimming_goggles.jpg',
				description: 'Anti-fog swimming goggles for a clearer view underwater.',
				length: 10,
				width: 5,
				thickness: 1,
				buoyancy: 30,
			},
			{
				productId: 'P123490',
				name: 'Snorkel Set',
				type: 'Swimming Gear',
				grade: 'B',
				price: 1599,
				quantity: 60,
				status: true,
				hasDiscount: false,
				imageUrl: 'https://example.com/images/snorkel_set.jpg',
				description: 'A complete snorkel set for underwater exploration.',
				length: 40,
				width: 25,
				thickness: 3,
				buoyancy: 70,
			},
			{
				productId: 'P123491',
				name: 'Diving Mask',
				type: 'Swimming Gear',
				grade: 'A',
				price: 2299,
				quantity: 50,
				status: true,
				hasDiscount: false,
				imageUrl: 'https://example.com/images/diving_mask.jpg',
				description: 'A professional diving mask for underwater visibility.',
				length: 30,
				width: 15,
				thickness: 5,
				buoyancy: 60,
			},
			{
				productId: 'P123492',
				name: 'Paddleboard Pump',
				type: 'Paddleboard Gear',
				grade: 'A',
				price: 999,
				quantity: 70,
				status: true,
				hasDiscount: true,
				imageUrl: 'https://example.com/images/paddleboard_pump.jpg',
				description: 'A high-pressure pump for inflatable paddleboards.',
				length: 50,
				width: 20,
				thickness: 5,
				buoyancy: 30,
			},
			{
				productId: 'P123493',
				name: 'Inflatable Kayak',
				type: 'Kayak',
				grade: 'B',
				price: 4999,
				quantity: 15,
				status: true,
				hasDiscount: false,
				imageUrl: 'https://example.com/images/inflatable_kayak.jpg',
				description: 'An inflatable kayak that is easy to transport and store.',
				length: 250,
				width: 80,
				thickness: 10,
				buoyancy: 95,
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
