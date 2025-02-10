const { WeatherData } = require('./models')
const fs = require('fs')

// 假設你已經讀取了 JSON 資料並存在 data.json 檔案
const data = JSON.parse(fs.readFileSync('response_1739169950379.json', 'utf-8'))

// 提取 JSON 資料中的 Records 部分
const records = data.Records.SeaSurfaceObs.Location

const weatherData = []

// 從 JSON 中提取資料並準備插入
records.forEach(record => {
	const stationID = record.Station.StationID
	record.StationObsTimes.StationObsTime.forEach(obsTime => {
		const dateTime = obsTime.DateTime
		const weatherElements = obsTime.WeatherElements
		const primaryAnemometer = weatherElements.PrimaryAnemometer || {}

		const weatherRecord = {
			StationID: stationID,
			DataTime: new Date(dateTime),
			TideHeight: weatherElements.TideHeight || null,
			TideLevel: weatherElements.TideLevel || null,
			SeaTemperature: weatherElements.SeaTemperature || null,
			Temperature: weatherElements.Temperature || null,
			StationPressure: weatherElements.StationPressure || null,
			WaveHeight: weatherElements.WaveHeight || null,
			WaveDirection: weatherElements.WaveDirection || null,
			WaveDirectionDescription: weatherElements.WaveDirectionDescription || null,
			WavePeriod: weatherElements.WavePeriod || null,
			WindSpeed: primaryAnemometer.WindSpeed || null,
			WindScale: primaryAnemometer.WindScale || null,
			WindDirection: primaryAnemometer.WindDirection || null,
			WindDirectionDescription: primaryAnemometer.WindDirectionDescription || null,
			MaximumWindSpeed: primaryAnemometer.MaximumWindSpeed || null,
			MaximumWindScale: primaryAnemometer.MaximumWindScale || null,
			LayerNumber: weatherElements.SeaCurrents?.Layer[0].LayerNumber || null,
			CurrentDirection: weatherElements.SeaCurrents?.Layer[0].CurrentDirection || null,
			CurrentDirectionDescription: weatherElements.SeaCurrents?.Layer[0].CurrentDirectionDescription || null,
			CurrentSpeed: weatherElements.SeaCurrents?.Layer[0].CurrentSpeed || null,
			CurrentSpeedInKnots: weatherElements.SeaCurrents?.Layer[0].CurrentSpeedInKnots || null,
		}

		weatherData.push(weatherRecord)
	})
})

// 使用 Sequelize 的 bulkCreate 來批量插入資料
WeatherData.bulkCreate(weatherData)
	.then(() => {
		console.log('資料匯入成功')
	})
	.catch(err => {
		console.error('資料匯入失敗:', err)
	})
