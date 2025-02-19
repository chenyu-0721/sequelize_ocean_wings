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
			order: [['id', 'ASC']],
		})

		const totalPages = Math.ceil(count / limit)

		// 進行資料過濾和結構整理
		const simplifiedStations = stations.map(station => ({
			id: station.id,
			StationID: station.StationID,
			StationName: station.StationName,
			StationNameEN: station.StationNameEN,
			weatherData: station.weatherData.map(data => ({
				id: data.id,
				StationID: data.StationID,
				DataTime: data.DataTime,
				WaveHeight: data.WaveHeight,
				WaveDirection: data.WaveDirection,
				WavePeriod: data.WavePeriod,
				SeaTemperature: data.SeaTemperature,
				WindSpeed: data.WindSpeed,
				WindDirection: data.WindDirection,
				WindScale: data.WindScale,
			})),
		}))

		return res.status(200).json({
			success: true,
			data: {
				stations: simplifiedStations,
			},
			pagination: {
				totalPages,
				currentPage: page,
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

exports.getOneStation = async (req, res) => {
	// #swagger.tags = ['wave']
	try {
		const id = req.params.id

		const wave = await Station.findOne({
			include: [
				{
					model: WeatherData,
					as: 'weatherData',
					required: false,
				},
			],
			where: { id: id },
			distinct: true,
			order: [['StationID', 'ASC']],
		})

		res.status(200).json({ data: wave })
	} catch (error) {
		console.error('Error in getOneStation:', error)
		return res.status(500).json({
			success: false,
			error: 'Internal Server Error',
			message: error.message,
		})
	}
}
