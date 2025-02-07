'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
	class OrderItem extends Model {
		static associate(models) {
			// 關聯 Order：一個 OrderItem 屬於一個 Order
			OrderItem.belongsTo(models.Order, {
				foreignKey: 'order_id',
				onDelete: 'CASCADE',
			})

			// 關聯 Product：一個 OrderItem 屬於一個 Product
			OrderItem.belongsTo(models.Product, {
				foreignKey: 'product_id',
				onDelete: 'CASCADE',
			})
		}
	}

	OrderItem.init(
		{
			order_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'orders',
					key: 'id',
				},
				onDelete: 'CASCADE',
			},
			product_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'products',
					key: 'id',
				},
				onDelete: 'CASCADE',
			},
			quantity: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 1,
			},
			price: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'OrderItem',
			tableName: 'order_items',
			underscored: true,
			timestamps: true,
		},
	)

	return OrderItem
}
