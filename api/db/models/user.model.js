// Importación de las clases y constantes necesarias desde sequelize
const { Model, DataTypes, Sequelize } = require('sequelize');

// Nombre de la tabla en la base de datos
const USER_TABLE = 'users';

// Definición del esquema del modelo de Usuario
const UserSchema = {
	id: {
		allowNull: false,
		type: DataTypes.STRING,
		field: 'id_document',
		unique: true,
		primaryKey: true
	},
	firstName: {
		allowNull: false,
		type: DataTypes.STRING,
		unique: false
	},
	lastName: {
		allowNull: false,
		type: DataTypes.STRING,
		unique: false
	},
	birthDate: {
		allowNull: false,
		type: DataTypes.DATEONLY,
		field: 'birth_date',
		unique: false
	},
	email: {
		allowNull: false,
		type: DataTypes.STRING,
		unique: true
	},
	password: {
		allowNull: false,
		type: DataTypes.STRING
	},
	recoveryToken: {
		allowNull: true,
		field: 'recovery_token',
		type: DataTypes.STRING
	},
	role: {
		allowNull: false,
		type: DataTypes.STRING,
		defaultValue: 'PACIENTE'
	}
};

// Definición de la clase User que extiende del modelo de Sequelize
class User extends Model {
	static asssociate(models) {
		this.hasMany(models.Resultado, {
			as: 'resultado',
			foreignKey: 'userId'
		});
	}

	static config(sequelize) {
		return {
			sequelize,
			tableName: USER_TABLE,
			modelName: 'User',
			paranoid: true
		};
	}
}

// Exportación de las constantes y la clase
module.exports = { USER_TABLE, UserSchema, User };
