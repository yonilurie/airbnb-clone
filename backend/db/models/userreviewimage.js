"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class UserReviewImage extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			UserReviewImage.belongsTo(models.Review, {
				foreignKey: "reviewId",
			});
			UserReviewImage.belongsTo(models.User, { foreignKey: "userId" });
		}
	}
	UserReviewImage.init(
		{
			reviewId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			imageUrl: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "UserReviewImage",
		}
	);
	return UserReviewImage;
};
