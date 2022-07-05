"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Room extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Room.belongsTo(models.User, {
				foreignKey: "ownerId",
				as: "Owner",
			});
			Room.hasMany(models.Booking, { foreignKey: "roomId" });
			Room.hasMany(models.Review, { foreignKey: "roomId" });
			Room.hasMany(models.UserRoomImage, {
				foreignKey: "roomId",
				as: "images",
			});
		}
	}
	Room.init(
		{
			ownerId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			address: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			city: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			state: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			country: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			lat: {
				type: DataTypes.DECIMAL,
				allowNull: false,
			},
			lng: {
				type: DataTypes.DECIMAL,
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [0, 50],
				},
			},
			description: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			price: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			numOfReviews: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			previewImage: {
				type: DataTypes.STRING,
				allowNull: true,
			},
		},
		{
			sequelize,
			modelName: "Room",
		}
	);
	return Room;
};
