"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class UserRoomImage extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			UserRoomImage.belongsTo(models.Room, {
				foreignKey: "roomId",
				as: "images",
			});
			UserRoomImage.belongsTo(models.User, {
				foreignKey: "userId",
			});
		}
	}
	UserRoomImage.init(
		{
			roomId: DataTypes.INTEGER,
			userId: DataTypes.INTEGER,
			imageUrl: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "UserRoomImage",
		}
	);
	return UserRoomImage;
};
