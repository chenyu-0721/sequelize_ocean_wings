'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			User.hasMany(models.CartItem, {
				foreignKey: 'user_id', // 這是對應 CartItem 中的 user_id
			})
		}
	}
	User.init(
		{
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			confirmPassword: DataTypes.STRING,
			name: DataTypes.STRING,
			role: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'User',
		},
	)
	return User
}
