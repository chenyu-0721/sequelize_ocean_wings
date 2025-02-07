'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
	class Order extends Model {
		static associate(models) {
			// 關聯 User：一個 User 可以有多個 Order
			Order.belongsTo(models.User, {
				foreignKey: 'user_id',
				onDelete: 'CASCADE',
			})

			// 關聯 OrderItem：一個 Order 可以有多個 OrderItem
			Order.hasMany(models.OrderItem, {
				foreignKey: 'order_id',
				onDelete: 'CASCADE',
			})
		}
	}

	Order.init(
		{
			user_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'users',
					key: 'id',
				},
				onDelete: 'CASCADE',
			},
			status: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: 'pending', // 訂單狀態（pending, completed, canceled）
			},
			total_price: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: false,
				defaultValue: 0.0,
			},
		},
		{
			sequelize,
			modelName: 'Order',
			tableName: 'orders',
			underscored: true,
			timestamps: true,
		},
	)

	return Order
}
