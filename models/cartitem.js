'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
	class CartItem extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			//  User 關聯
			CartItem.belongsTo(models.User, {
				foreignKey: 'user_id', // 外鍵
				onDelete: 'CASCADE', // 如果 User 被刪除，對應的 CartItem 也會被刪除
			})

			//  Product 關聯
			CartItem.belongsTo(models.Product, {
				foreignKey: 'product_id', // 設定外鍵
				onDelete: 'CASCADE', // 如果 Product 被刪除，對應的 CartItem 也會被刪除
			})
		}
	}

	CartItem.init(
		{
			user_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'users', // 對應到 'users' 資料表
					key: 'id',
				},
				onDelete: 'CASCADE',
			},
			product_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'products', // 對應到 'products' 資料表
					key: 'id',
				},
				onDelete: 'CASCADE',
			},
			quantity: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 1,
			},
		},
		{
			sequelize,
			modelName: 'CartItem',
			tableName: 'cart_items', // 指定資料表名稱
			underscored: true, // 欄位使用 snake_case（例如：created_at, updated_at）
			timestamps: true,
		},
	)

	return CartItem
}
