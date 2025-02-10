const { Station, WeatherData } = require('../models')
const { Op } = require('sequelize')

exports.getStation = async (req, res) => {
	// #swagger.tags = ['wave']
	try {
		const page = parseInt(req.query.page) || 1
		const limit = Math.min(parseInt(req.query.limit) || 10, 100)
		const offset = (page - 1) * limit

		const { count, rows: stations } = await Station.findAndCountAll({
			include: [
				{
					model: WeatherData,
					as: 'weatherData',
					required: false,
				},
			],
			distinct: true,
			limit,
			offset,
			order: [
				['StationID', 'ASC'], // Optional: add default sorting
			],
		})

		const totalPages = Math.ceil(count / limit)

		return res.status(200).json({
			success: true,
			data: {
				stations,
				pagination: {
					totalCount: count,
					totalPages,
					currentPage: page,
					limit,
				},
			},
		})
	} catch (error) {
		console.error('Error in getStation:', error)
		return res.status(500).json({
			success: false,
			error: 'Internal Server Error',
			message: error.message,
		})
	}
}
