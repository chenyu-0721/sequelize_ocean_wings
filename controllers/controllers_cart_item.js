const { CartItem, Product, User } = require('../models')

exports.getCartItems = async (req, res, next) => {
	try {
		// #swagger.tags = ['cart']
		const userId = req.user.id

		// 取得該使用者的購物車項目
		const cartItems = await CartItem.findAll({
			where: { user_id: userId },
			include: ['Product'],
		})

		if (cartItems.length === 0) {
			return res.status(200).json({ data: [] })
		}

		// 處理回傳的資料，僅保留商品名稱、數量、價格等資訊
		const products = cartItems.map(item => ({
			productId: item.Product.productId,
			name: item.Product.name,
			quantity: item.quantity,
			price: item.Product.price,
		}))

		res.status(200).json({ data: products })
	} catch (error) {
		next(error)
	}
}

exports.addToCart = async (req, res, next) => {
	try {
		// #swagger.tags = ['cart']
		const userId = req.user.id
		const productId = req.params.productId
		const quantity = parseInt(req.body.quantity)

		const product = await Product.findByPk(productId)

		if (!product) {
			return res.status(404).json({ message: '找不到商品' })
		}

		const cartItem = await CartItem.findOne({
			where: { user_id: userId, product_id: productId },
		})

		if (cartItem) {
			cartItem.quantity += quantity
			await cartItem.save()
			return res.status(200).json({ message: '成功加入商品' })
		}

		const newCartItem = await CartItem.create({
			user_id: userId,
			product_id: productId,
			quantity: quantity,
		})

		res.status(201).json({ message: '成功加入商品', data: newCartItem })
	} catch (error) {
		console.error('Error occurred:', error)
		res.status(500).json({ message: '伺服器錯誤', error: error.message })
	}
}

exports.deleteCartItem = async (req, res) => {
	try {
		// #swagger.tags = ['cart']
		const userId = req.user.id
		const productId = req.params.productId

		const cartItem = await CartItem.findOne({ where: { user_id: userId, product_id: productId } })

		if (!cartItem) {
			return res.status(404).json({ message: '找不到商品' })
		}

		await cartItem.destroy()

		res.status(201).json({ message: '成功刪除商品' })
	} catch (error) {
		res.status(500).json({ message: '伺服器錯誤', error: error.message })
	}
}

exports.updateCartItemQuantity = async (req, res) => {
	try {
		// #swagger.tags = ['cart']
		const userId = req.user.id
		const productId = req.params.productId
		const quantity = parseInt(req.body.quantity)

		const cartItem = await CartItem.findOne({ where: { user_id: userId, product_id: productId } })

		if (!cartItem) {
			return res.status(404).json({ message: '找不到商品' })
		}

		cartItem.quantity = quantity
		await cartItem.save()

		res.status(200).json({ message: '成功更新數量', data: cartItem })
	} catch (error) {
		res.status(500).json({ message: '伺服器錯誤', error: error.message })
	}
}
