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

		res.status(200).json({ data: cartItems })
	} catch (error) {
		next(error)
	}
}

exports.addToCart = async (req, res, next) => {
	try {
		// #swagger.tags = ['cart']
		const userId = req.user.id
		const productId = req.params.productId
		const quantity = parseInt(req.params.quantity)
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
			quantity,
		})

		res.status(201).json({ message: '成功加入��物��', data: newCartItem })
	} catch (error) {
		next(error)
	}
}
