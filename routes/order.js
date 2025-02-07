const express = require('express')
const router = express.Router()
const orderController = require('../controllers/controllers_order')
const { isAuth } = require('../statusHandle/auth')

// 結帳
router.post('/checkout', isAuth, orderController.checkout)

// 查詢歷史訂單
router.get('/history', isAuth, orderController.history)

module.exports = router
