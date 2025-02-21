const { Product } = require('../models')
const { Op } = require('sequelize')

exports.getProduct = async (req, res) => {
	try {
		/*	#swagger.tags = ['Product']
				#swagger.description = '取得衝浪板商品內容' 

			#swagger.summary = '取得衝浪板商品內容'

			#swagger.responses[200] = {
				schema:[
					{
						"id": 'integer',
						"productId": 'string',
						"name": 'string',
						"type": 'string',
						"grade": 'string',
						"price": 'integer',
						"quantity": 'integer',
						"status": false,
						"hasDiscount": false,
						"imageUrl": 'string',
						"description": 'string',
						"length": 'integer',
						"width": 'integer',
						"thickness": 'integer',
						"buoyancy": 'integer',
						"createdAt": "2025-02-10T05:35:04.000Z",
						"updatedAt": "2025-02-10T05:35:04.000Z"
					}
				]
			} 
		
			#swagger.responses[403] = {
				description: '查無資料'
			} 
		*/

		const page = parseInt(req.query.page) || 1
		const limit = parseInt(req.query.limit) || 10

		const { name, type, status } = req.query
		const offset = (page - 1) * limit

		const whereClause = {}
		if (name) whereClause.name = { [Op.like]: `%${name}%` }
		if (type) whereClause.type = type
		if (status) whereClause.status = status

		const result = await Product.findAndCountAll({
			limit,
			offset,
			order: [['id', 'ASC']],
			where: whereClause,
		})

		const { rows: products, count: totalCount } = result
		const totalPages = Math.ceil(totalCount / limit)

		res.status(200).json({ data: products, totalCount, totalPages })
	} catch (error) {
		res.status(500).json({ message: '商品取得失敗', error: error.message })
	}
}

exports.getOneProducts = async (req, res) => {
	try {
		/*
			#swagger.tags = ['Product']
				#swagger.description = '取得衝浪板單一商品內容'

			#swagger.summary = '取得衝浪板單一商品內容'

			#swagger.parameters['id'] = {
				in: 'path',
				description: '商品 ID',
				required: true,
				type: 'integer'
			} 
		
			#swagger.responses[200] = {
				schema:
					{
						"id": 'integer',
						"productId": 'string',
						"name": 'string',
						"type": 'string',
						"grade": 'string',
						"price": 'integer',
						"quantity": 'integer',
						"status": false,
						"hasDiscount": false,
						"imageUrl": 'string',
						"description": 'string',
						"length": 'integer',
						"width": 'integer',
						"thickness": 'integer',
						"buoyancy": 'integer',
						"createdAt": "2025-02-10T05:35:04.000Z",
						"updatedAt": "2025-02-10T05:35:04.000Z"
					}
			}
		*/

		const id = parseInt(req.params.id)

		const products = await Product.findOne({ where: { id: id } })

		if (!products) {
			return res.status(404).json({ message: '商品不存在' })
		}

		res.status(200).json({ data: products })
	} catch (error) {
		res.status(500).json({ message: '商品取得失敗' })
	}
}

exports.createProduct = async (req, res) => {
	try {
		/*
			#swagger.tags = ['Product']
				#swagger.description = '新增衝浪板商品(一筆)'

			#swagger.summary = '新增衝浪板商品(一筆)'

			#swagger.parameters['body'] = {
				in: 'body',
				description: '新增商品資訊',
				required: false,
				schema: {
						"productId": 'string',
						"name": 'string',
						"type": 'string',
						"grade": 'string',
						"price": 'integer',
						"quantity": 'integer',
						"status": false,
						"hasDiscount": false,
						"imageUrl": 'string',
						"description": 'string',
						"length": 'integer',
						"width": 'integer',
						"thickness": 'integer',
						"buoyancy": 'integer',
						"createdAt": "2025-02-10T05:35:04.000Z",
                        "updatedAt": "2025-02-10T05:35:04.000Z"
					}
			}


			#swagger.responses[201] = {
				schema:
					{
						"productId": 'string',
						"name": 'string',
						"type": 'string',
						"grade": 'string',
						"price": 'integer',
						"quantity": 'integer',
						"status": false,
						"hasDiscount": false,
						"imageUrl": 'string',
						"description": 'string',
						"length": 'integer',
						"width": 'integer',
						"thickness": 'integer',
						"buoyancy": 'integer',
					}
			}

			#swagger.responses[500] = {
				description: '商品新增失敗'
			}
		*/

		const product = await Product.create(req.body)

		res.status(201).json({ data: product })
	} catch (error) {
		res.status(500).json({ message: '商品新增失敗', error: error.message })
	}
}

exports.updateProduct = async (req, res) => {
	try {
		/*
			#swagger.tags = ['Product']
				#swagger.description = '更新衝浪板商品(一筆)'

			#swagger.summary = '更新衝浪板商品(一筆)'

			#swagger.parameters['id'] = {
				in: 'path',
                description: '商品 ID',
                required: true,
                type: 'integer'
            }

			#swagger.parameters['body'] = {
				in: 'body',
				description: '新增商品資訊',
				required: false,
				schema: {
						"productId": 'string',
						"name": 'string',
						"type": 'string',
						"grade": 'string',
						"price": 'integer',
						"quantity": 'integer',
						"status": false,
						"hasDiscount": false,
						"imageUrl": 'string',
						"description": 'string',
						"length": 'integer',
						"width": 'integer',
						"thickness": 'integer',
						"buoyancy": 'integer',
						"createdAt": "2025-02-10T05:35:04.000Z",
                        "updatedAt": "2025-02-10T05:35:04.000Z"
					}
			}
		
			#swagger.responses[200] = {
				schema:
					{
						"productId": 'string',
						"name": 'string',
						"type": 'string',
						"grade": 'string',
						"price": 'integer',
						"quantity": 'integer',
						"status": false,
						"hasDiscount": false,
						"imageUrl": 'string',
						"description": 'string',
						"length": 'integer',
						"width": 'integer',
						"thickness": 'integer',
						"buoyancy": 'integer',
					}
			}

			#swagger.responses[404] = {
				description: '商品不存在'
			}

			#swagger.responses[500] = {
				description: '商品更新失敗'
			}

		*/

		const id = parseInt(req.params.id)
		const product = await Product.findByPk(id)
		if (!product) {
			return res.status(404).json({ message: '商品不存在' })
		}
		await product.update(req.body)
		res.status(200).json({ data: product })
	} catch (error) {
		res.status(500).json({ message: '商品更新失敗', error: error.message })
	}
}

exports.deleteProduct = async (req, res) => {
	try {
		/*
			#swagger.tags = ['Product']
				#swagger.description = '刪除衝浪板商品(多筆)'

			#swagger.summary = '刪除衝浪板商品(多筆)'

			#swagger.parameters['body'] = {
				in: 'body',
				description: '刪除商品(陣列)',
				required: true,
				schema: {
					ids: [1, 2, 3]
				}
			}

			#swagger.responses[200] = {
				description: '刪除成功'
			}

			#swagger.responses[400] = {
				description: '請提供有效的商品 ID 列表'
			}

			#swagger.responses[404] = {
				description: '部分商品不存在或已刪除'
			}

			#swagger.responses[500] = {
				description: '商品刪除失敗'
			}
				
		*/

		const ids = req.body.ids

		// 檢查 ids 是否為陣列且不為空
		if (!Array.isArray(ids) || ids.length === 0) {
			return res.status(400).json({ message: '請提供有效的商品 ID 列表' })
		}

		// 刪除指定的商品
		const deleteCount = await Product.destroy({ where: { id: { [Op.in]: ids } } })

		// 檢查是否有商品被刪除
		if (deleteCount === 0) {
			return res.status(404).json({ message: '部分商品不存在或已刪除' })
		}

		res.status(200).json({ message: '刪除成功', deletedCount: deleteCount })
	} catch (error) {
		res.status(500).json({ message: '商品刪除失敗', error: error.message })
	}
}
