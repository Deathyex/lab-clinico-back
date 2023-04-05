const { Model, DataTypes, Sequelize } = require('sequelize');

const { USER_TABLE } = require('./user.model');

const EXAMEN_TABLE = 'examenes';

const ExamenSchema = {
  idExamen: {
    allowNull: false,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    field: 'id_examen',
    unique: true,
    primaryKey: true
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: false
  },
  examenDate: {
    allowNull: false,
    type: DataTypes.DATEONLY,
    field: 'examen_date',
    unique: false
  },
  userId: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'id_paciente',
    references: {
      model: USER_TABLE,
      key: 'id_document'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
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

class Examen extends Model {
  static asssociate(models) {
    this.belongsTo(models.User, {as: 'user'});
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: EXAMEN_TABLE,
      modelName: 'Examen',
      timestamp: false
    }
  }
}

module.exports = { EXAMEN_TABLE, ExamenSchema, Examen }
