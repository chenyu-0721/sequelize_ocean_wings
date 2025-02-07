const { Product } = require('../models')
const { Op } = require('sequelize')

exports.getProduct = async (req, res) => {
	try {
		// #swagger.tags = ['Product']
		const page = parseInt(req.query.page) || 1
		const limit = parseInt(req.query.limit) || 10

		const { name, type, status } = req.query

		const offset = (page - 1) * limit
		const totalCount = await Product.count()
		const totalPages = Math.ceil(totalCount / limit)

		const whereClause = {}
		if (name) whereClause.name = { [Op.like]: `%${name}%` }
		if (type) whereClause.type = type
		if (status) whereClause.status = status

		const products = await Product.findAll({
			limit,
			offset,
			order: [['id', 'ASC']],
			where: whereClause,
		})

		res.status(200).json({ data: products, totalCount, totalPages })
	} catch (error) {
		res.status(500).json({ message: '商品取得失敗', error: error.message })
	}
}

exports.getOneProducts = async (req, res) => {
	try {
		// #swagger.tags = ['Product']

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
		// #swagger.tags = ['Product']

		const product = await Product.create(req.body)

		res.status(201).json({ data: product })
	} catch (error) {
		res.status(500).json({ message: '商品新增失敗', error: error.message })
	}
}

exports.updateProduct = async (req, res) => {
	try {
		// #swagger.tags = ['Product']

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
		// #swagger.tags = ['Product']
		const id = parseInt(req.params.id)
		const product = await Product.findByPk(id)
		if (!product) {
			return res.status(404).json({ message: '商品不存在' })
		}
		await product.destroy()

		res.status(200).json({ message: '刪除成功' })
	} catch (error) {
		res.status(500).json({ message: '商品刪除失敗', error: error.message })
	}
}
