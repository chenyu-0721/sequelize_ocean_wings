const { CartItem, Product, User } = require('../models')

exports.getCartItems = async (req, res, next) => {
	try {
		/*
			#swagger.tags = ['Cart']
				#swagger.description = '取得購物車資訊' 

			#swagger.summary = '取得購物車資訊'

			#swagger.responses[200] = {
				schema:{
					data: [
						{
							productId: 1,
							name: '商品名稱',
							quantity: 1,
							price: 100,
						}
					]
				}
			} 

			#swagger.responses[401] = {
				description: '尚未登入'
			} 
			
			#swagger.responses[403] = {
				description: '取得失敗'
			} 
		*/

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
		/*
			#swagger.tags = ['Cart']
				#swagger.description = '新增商品至購物車' 

			#swagger.summary = '新增商品至購物車'

			#swagger.parameters['productId'] = {
				type: 'integer',
                description: '商品 ID',
                in: 'path',
                required: true,
            }

			#swagger.parameters['body'] = {
				in: 'body',
				description: '數量',
				required: true,
				schema: {
					quantity: '1',
				}
			}

			#swagger.responses[200] = {
				schema:{
					message: '成功加入商品',
                    data: {
                        productId: 1,
                        name: '商品名稱',
                        quantity: 1,
                        price: 100,
                    },
				}
			} 

			#swagger.responses[401] = {
				description: '尚未登入'
			} 
			
			#swagger.responses[403] = {
				description: '加入失敗'
			} 
		*/

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

		if (product.quantity >= quantity) {
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
		} else {
			res.status(401).json({ message: '商品不足' })
		}
	} catch (error) {
		console.error('Error occurred:', error)
		res.status(500).json({ message: '伺服器錯誤', error: error.message })
	}
}

exports.deleteCartItem = async (req, res) => {
	try {
		/*
			#swagger.tags = ['Cart']
				#swagger.description = '刪除購物車商品(單筆)' 

			#swagger.summary = '刪除購物車商品(單筆)'

			#swagger.parameters['productId'] = {
				type: 'integer',
                description: '商品 ID',
                in: 'path',
                required: true,
            }

			#swagger.responses[200] = {
				schema:{
					message: '刪除成功',
				}
			} 

			#swagger.responses[401] = {
				description: '尚未登入'
			} 
			
			#swagger.responses[403] = {
				description: '刪除失敗'
			} 
		*/

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
		/*
			#swagger.tags = ['Cart']
				#swagger.description = '編輯購物車商品數量(單筆)' 

			#swagger.summary = '編輯購物車商品數量(單筆)'

			#swagger.parameters['productId'] = {
				type: 'integer',
                description: '商品 ID',
                in: 'path',
                required: true,
            }

			#swagger.responses[200] = {
				schema:{
					data: {
						productId: 1,
						name: '商品名稱',
						quantity: 1,
						price: 100,
					},
				}
			} 

			#swagger.responses[401] = {
				description: '尚未登入'
			} 
			
			#swagger.responses[403] = {
				description: '更新失敗'
			} 
		*/

		const userId = req.user.id
		const productId = req.params.productId
		const quantity = parseInt(req.body.quantity)

		const cartItem = await CartItem.findOne({ where: { user_id: userId, product_id: productId } })

		if (!cartItem) {
			return res.status(404).json({ message: '找不到商品' })
		}

		if (product.quantity < quantity) {
			return res.status(401).json({ message: '庫存不足' })
		}

		cartItem.quantity = quantity
		await cartItem.save()

		res.status(200).json({ message: '成功更新數量', data: cartItem })
	} catch (error) {
		res.status(500).json({ message: '伺服器錯誤', error: error.message })
	}
}
