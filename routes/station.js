const express = require('express')
const router = express.Router()
const ctrl_station = require('../controllers/controllers_station')

router.get('/', ctrl_station.getStation)
router.get('/:id', ctrl_station.getOneStation)

module.exports = router
