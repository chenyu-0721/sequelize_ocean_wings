const express = require('express')
const router = express.Router()
const ctrl_cartItem = require('../controllers/controllers_cart_item')
const { isAuth } = require('../statusHandle/auth')

router.get('/', isAuth, ctrl_cartItem.getCartItems)

router.post('/:productId', isAuth, ctrl_cartItem.addToCart)

router.delete('/:productId', isAuth, ctrl_cartItem.deleteCartItem)

router.put('/:productId', isAuth, ctrl_cartItem.updateCartItemQuantity)

module.exports = router
