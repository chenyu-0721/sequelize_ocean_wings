const { Station } = require('./models')
const fs = require('fs')

// 讀取 JSON 檔案
const data = JSON.parse(fs.readFileSync('O-B0076-001.json', 'utf-8'))

// 確認 JSON 內容的結構
console.log(data.cwaopendata.Resources.Resource.Data)

// 提取 SeaSurfaceObs.Location
const locations = data.cwaopendata.Resources.Resource.Data.SeaSurfaceObs.Location

const stations = []

// 提取 StationID, StationName, StationNameEN 並準備插入資料
locations.forEach(location => {
	const { StationID, StationName, StationNameEN } = location.Station

	const stationRecord = {
		StationID,
		StationName,
		StationNameEN,
	}

	stations.push(stationRecord)
})

// 使用 Sequelize 的 bulkCreate 來批量插入資料
Station.bulkCreate(stations)
	.then(() => {
		console.log('資料匯入成功')
	})
	.catch(err => {
		console.error('資料匯入失敗:', err)
	})
