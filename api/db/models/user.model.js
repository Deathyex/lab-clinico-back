const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'users';

const UserSchema = {
  id: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'id_document',
    unique: true,
    primaryKey: true
  },
  name: {
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
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'update_at'
  }
}

class User extends Model {
  static asssociate() {
    // associate
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamp: false
    }
  }
}

module.exports = { USER_TABLE, UserSchema, User }
