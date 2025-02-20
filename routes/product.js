const express = require('express')
const router = express.Router()
const ctrl_product = require('../controllers/controllers_product')

router.get('/', ctrl_product.getProduct)
router.get('/:id', ctrl_product.getOneProducts)

router.post('/', ctrl_product.createProduct)

router.put('/:id', ctrl_product.updateProduct)

router.delete('/', ctrl_product.deleteProduct)

module.exports = router
