const express = require('express')
const router = express.Router()
const ctrlProduct = require('../controllers/controllers_product')

router.get('/', ctrlProduct.getProduct)

module.exports = router
