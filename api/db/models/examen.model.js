const { Model, DataTypes, Sequelize } = require('sequelize');

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
  idPaciente: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'id_paciente',
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
  static asssociate() {
    // associate
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
