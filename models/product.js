'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class Product extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Product.hasMany(models.CartItem, {
				foreignKey: 'product_id', // 對應 CartItem 的 product_id
			})
		}
	}
	Product.init(
		{
			productId: DataTypes.STRING,
			name: DataTypes.STRING,
			type: DataTypes.STRING,
			grade: DataTypes.STRING,
			price: DataTypes.INTEGER,
			quantity: DataTypes.INTEGER,
			status: DataTypes.BOOLEAN,
			hasDiscount: DataTypes.BOOLEAN,
			imageUrl: DataTypes.STRING,
			description: DataTypes.STRING,
			length: DataTypes.INTEGER,
			width: DataTypes.INTEGER,
			thickness: DataTypes.INTEGER,
			buoyancy: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'Product',
		},
	)
	return Product
}
