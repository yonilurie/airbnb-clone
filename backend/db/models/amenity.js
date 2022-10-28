"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Amenity extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Amenity.belongsTo(models.Room, {
				foreignKey: "roomId",
				as: "room",
			});
		}
	}
	Amenity.init(
		{
			roomId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			type: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "Amenity",
		}
	);
	return Amenity;
};
