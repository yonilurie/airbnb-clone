"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Review extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Review.belongsTo(models.Room, {
				foreignKey: "roomId",
				as: "reviews",
			});
			Review.belongsTo(models.User, {
				foreignKey: "userId",
				as: "guest",
			});

			Review.hasMany(models.Room, {
				foreignKey: "id",
				as: "room",
			});
		}
	}
	Review.init(
		{
			roomId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			review: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			stars: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					min: 1,
					max: 5,
				},
			},
		},
		{
			sequelize,
			modelName: "Review",
		}
	);
	return Review;
};
