const express = require('express')
const router = express.Router()
const ctrl_station = require('../controllers/controllers_station')

router.get('/', ctrl_station.getStation)

module.exports = router
