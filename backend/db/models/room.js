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
				as: "owner",
			});
			Room.belongsTo(models.Review, {
				foreignKey: "id",
			});
			Room.hasMany(models.Booking, {
				foreignKey: "roomId",
				as: "bookings",
			});
			Room.hasMany(models.Review, {
				foreignKey: "roomId",
				as: "reviews",
			});
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
				validate: {
					min: -90.0,
					max: 90.0,
				},
			},
			lng: {
				type: DataTypes.DECIMAL,
				allowNull: false,
				validate: {
					min: -180.0,
					max: 180.0,
				},
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
				allowNull: true,
			},
			rules: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			price: {
				type: DataTypes.DECIMAL,
				allowNull: false,
			},
			guests: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			bedrooms: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			beds: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			baths: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			amenities: {
				type: DataTypes.STRING,
				allowNull: false
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
