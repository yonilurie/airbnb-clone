"use strict";
const bcrypt = require("bcryptjs");
const { Model, Validator } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		toSafeObject() {
			const { id, username, firstName, lastName, email } = this; // context will be the User instance
			return { id, username, firstName, lastName, email };
		}

		validatePassword(password) {
			return bcrypt.compareSync(password, this.hashedPassword.toString());
		}
		static associate(models) {
			// define association here
			User.hasMany(models.Room, {
				foreignKey: "ownerId",
				hooks: true,
				as: "owner",
			});
			User.hasMany(models.Booking, { foreignKey: "userId" });
			User.hasMany(models.Review, { foreignKey: "userId" });
			User.hasMany(models.UserRoomImage, { foreignKey: "userId" });
		}

		static async signup({
			username,
			email,
			password,
			firstName,
			lastName,
		}) {
			const hashedPassword = bcrypt.hashSync(password);
			const user = await User.create({
				username,
				email,
				firstName,
				lastName,
				hashedPassword,
			});
			return await User.scope("currentUser").findByPk(user.id);
		}

		static getCurrentUserById(id) {
			return User.scope("currentUser").findByPk(id);
		}

		static async login({ credential, password }) {
			const { Op } = require("sequelize");
			const user = await User.scope("loginUser").findOne({
				where: {
					[Op.or]: {
						username: credential,
						email: credential,
					},
				},
			});
			if (user && user.validatePassword(password)) {
				return await User.scope("currentUser").findByPk(user.id);
			}
		}
	}

	User.init(
		{
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [4, 30],
					isNotEmail(value) {
						if (Validator.isEmail(value)) {
							throw new Error("Cannot be an email.");
						}
					},
				},
			},
			firstName: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			lastName: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			description: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [3, 256],
				},
			},
			hashedPassword: {
				type: DataTypes.STRING.BINARY,
				allowNull: false,
				validate: {
					len: [60, 60],
				},
			},
		},
		{
			sequelize,
			modelName: "User",
			defaultScope: {
				attributes: {
					exclude: [
						"hashedPassword",
						"email",
						"createdAt",
						"updatedAt",
					],
				},
			},
			scopes: {
				currentUser: {
					attributes: { exclude: ["hashedPassword"] },
				},
				loginUser: {
					attributes: {},
				},
			},
		}
	);
	return User;
};
