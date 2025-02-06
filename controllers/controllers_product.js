const { Product } = require('../models')

exports.getProduct = async (req, res) => {
	try {
		// #swagger.tags = ['Product']
		const page = parseInt(req.query.page) || 1
		const limit = parseInt(req.query.limit) || 10

		const offset = (page - 1) * limit
		const totalCount = await Product.count()
		const totalPages = Math.ceil(totalCount / limit)
		const products = await Product.findAll({
			limit,
			offset,
			order: [['id', 'DESC']],
		})

		res.status(200).json({ data: products, totalCount, totalPages })
	} catch (error) {
		res.status(500).json({ message: '商品取得失敗' })
	}
}
