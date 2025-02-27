const { Station, WeatherData } = require('../models')
const { Op } = require('sequelize')

exports.getStation = async (req, res) => {
	try {
		/*
			#swagger.tags = ['Waves']
				#swagger.description = '取得浪況分析資訊'

			#swagger.summary = '取得浪況分析資訊'
		
			#swagger.responses[200] = {
				schema: {
					data: {
						stations: [
							{
								id: 1,
								StationID: '',
								StationName: '',
								StationNameEN: '',
								weatherData: [
									{
										id: 1,
										StationID: '',
										TideHeight: '',
										TideLevel: '',
										WaveHeight: '',
										WaveDirection: '',
										WaveDirectionDescription: '',
										WavePeriod: '',
										SeaTemperature: '',
										StationPressure: '',
										WindSpeed: '',
										WindScale: '',
										WindDirection: '',
										WindDirectionDescription: '',
										MaximumWindSpeed: '',
										MaximumWindScale: '',
										LayerNumber: null,  
										CurrentDirection: '',
										CurrentDirectionDescription: '',
										CurrentSpeed: '',
										CurrentSpeedInKnots: ''
									}
								]
							}
						],
						pagination: {  
							totalPages: '',
							currentPage: ''
						}
					}
				}
			}
		*/

		const page = parseInt(req.query.page) || 1
		const limit = Math.min(parseInt(req.query.limit) || 10, 100)
		const offset = (page - 1) * limit

		const { count, rows: stations } = await Station.findAndCountAll({
			include: [
				{
					model: WeatherData,
					as: 'weatherData',
					required: false,
					attributes: { exclude: ['StationID', 'createdAt', 'updatedAt'] },
				},
			],
			attributes: ['id', 'StationID', 'StationName', 'StationNameEN'],
			distinct: true,
			limit,
			offset,
			order: [['id', 'ASC']],
		})

		const totalPages = Math.ceil(count / limit)

		return res.status(200).json({
			data: {
				stations,
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
	try {
		/*
			#swagger.tags = ['Waves']
				#swagger.description = '取得浪況分析資訊(一筆)'

			#swagger.summary = '取得浪況分析資訊(一筆)'

			#swagger.parameters['id'] = {
				in: 'path',
				description: '站點 ID',
				required: true,
				type: 'integer'
			}
		
			#swagger.responses[200] = {
				schema: {
					data: {
						stations: [
							{
								id: 1,
								StationID: '',
								StationName: '',
								StationNameEN: '',
								weatherData: [
									{
										id: 1,
										StationID: '',
										TideHeight: '',
										TideLevel: '',
										WaveHeight: '',
										WaveDirection: '',
										WaveDirectionDescription: '',
										WavePeriod: '',
										SeaTemperature: '',
										StationPressure: '',
										WindSpeed: '',
										WindScale: '',
										WindDirection: '',
										WindDirectionDescription: '',
										MaximumWindSpeed: '',
										MaximumWindScale: '',
										LayerNumber: null,  
										CurrentDirection: '',
										CurrentDirectionDescription: '',
										CurrentSpeed: '',
										CurrentSpeedInKnots: ''
									}
								]
							}
						],
						pagination: {  
							totalPages: '',
							currentPage: ''
						}
					}
				}
			}
		*/

		const id = req.params.id

		const wave = await Station.findOne({
			include: [
				{
					model: WeatherData,
					as: 'weatherData',
					required: false,
					attributes: ['id', 'StationID', 'DataTime', 'WaveHeight', 'WaveDirection', 'WavePeriod', 'SeaTemperature', 'WindSpeed', 'WindDirection', 'WindScale'],
				},
			],
			attributes: ['id', 'StationID', 'StationName', 'StationNameEN'],
			where: { id },
			distinct: true,
			order: [['StationID', 'ASC']],
		})

		if (!wave) {
			return res.status(404).json({ success: false, message: 'Station not found' })
		}

		return res.status(200).json({ success: true, data: wave })
	} catch (error) {
		console.error('Error in getOneStation:', error)
		return res.status(500).json({
			success: false,
			error: 'Internal Server Error',
			message: error.message,
		})
	}
}
