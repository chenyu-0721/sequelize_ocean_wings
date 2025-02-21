const { Order, OrderItem, CartItem, Product } = require('../models')

/**
 * 🛒 結帳 API（檢查庫存 + 扣除庫存）
 */
exports.checkout = async (req, res) => {
	try {
		/*	
			#swagger.tags = ['Order']
				#swagger.description = '送出訂單' 

			#swagger.summary = '送出訂單'

			#swagger.responses[200] = {
				schema:{
					message: '結帳成功',
				}
			} 

			#swagger.responses[401] = {
				description: '尚未登入'
			} 
			
			#swagger.responses[403] = {
				description: '結帳失敗'
			} 
		*/

		const userId = req.user.id // 假設從 JWT 或 session 取得 user_id

		// 取得購物車商品
		const cartItems = await CartItem.findAll({
			where: { user_id: userId },
			include: [{ model: Product }],
		})

		if (!cartItems.length) {
			return res.status(400).json({ message: '購物車是空的' })
		}

		// 檢查庫存是否足夠
		for (const cartItem of cartItems) {
			if (cartItem.quantity > cartItem.Product.quantity) {
				return res.status(400).json({
					message: `商品 ${cartItem.Product.name} 庫存不足，剩餘 ${cartItem.Product.quantity} 件`,
				})
			}
		}

		// 計算訂單總價
		let totalPrice = 0
		const orderItemsData = cartItems.map(cartItem => {
			totalPrice += cartItem.quantity * cartItem.Product.price
			return {
				product_id: cartItem.product_id,
				quantity: cartItem.quantity,
				price: cartItem.Product.price,
			}
		})

		// 建立訂單
		const order = await Order.create({
			user_id: userId,
			total_price: totalPrice,
			status: 'pending',
		})

		// 建立 OrderItems 並扣除庫存
		await Promise.all(
			orderItemsData.map(async item => {
				await OrderItem.create({
					order_id: order.id,
					product_id: item.product_id,
					quantity: item.quantity,
					price: item.price,
				})

				// 扣除商品庫存
				await Product.decrement('quantity', {
					by: item.quantity,
					where: { id: item.product_id },
				})
			}),
		)

		// 清空購物車
		await CartItem.destroy({ where: { user_id: userId } })

		res.json({ message: '結帳成功', order })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: '結帳失敗' })
	}
}

/**
 * 📜 取得歷史訂單 API
 */
exports.history = async (req, res) => {
	try {
		/*	#swagger.tags = ['Order']
			#swagger.description = '取得歷史訂單' 

			#swagger.summary = '取得歷史訂單'

		
			
			#swagger.responses[401] = {
				description: '尚未登入'
			} 

			#swagger.responses[403] = {
				description: '取得失敗'
			} 
		*/

		const userId = req.user.id

		// 查詢訂單 + 訂單細節
		const orders = await Order.findAll({
			where: { user_id: userId },
			include: [
				{
					model: OrderItem,
					include: [{ model: Product }],
				},
			],
			order: [['created_at', 'DESC']], // 按時間排序
		})

		if (!orders.length) {
			return res.status(404).json({ message: '無歷史訂單' })
		}

		// 處理每一筆訂單，返回購買商品數量、總金額及商品資訊
		const formattedOrders = orders.map(order => {
			const items = order.OrderItems.map(orderItem => {
				const totalPrice = orderItem.quantity * orderItem.price
				return {
					product: {
						id: orderItem.Product.id,
						productId: orderItem.Product.productId,
						name: orderItem.Product.name,
						type: orderItem.Product.type,
						grade: orderItem.Product.grade,
						quantity: orderItem.quantity,
						total_price: totalPrice,
						status: orderItem.Product.status,
						hasDiscount: orderItem.Product.hasDiscount,
						imageUrl: orderItem.Product.imageUrl,
						description: orderItem.Product.description,
						length: orderItem.Product.length,
						width: orderItem.Product.width,
						thickness: orderItem.Product.thickness,
						buoyancy: orderItem.Product.buoyancy,
					},
				}
			})

			return {
				id: order.id,
				user_id: order.user_id,
				status: order.status,
				total_price: order.total_price,
				createdAt: order.createdAt,
				updatedAt: order.updatedAt,
				items: items,
			}
		})

		res.json({ orders: formattedOrders })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: '取得歷史訂單失敗' })
	}
}
