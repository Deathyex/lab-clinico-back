const { Model, DataTypes, Sequelize } = require('sequelize');

const { USER_TABLE } = require('./user.model');
const { EXAMEN_TABLE } = require('./examen.model');

const RESULTADO_TABLE = 'resultados';

const ResultadoSchema = {
  idResultado: {
    allowNull: false,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    field: 'id_resultado',
    unique: true,
    primaryKey: true
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: false
  },
  resultadoDate: {
    allowNull: false,
    type: DataTypes.DATEONLY,
    field: 'resultado_date',
    unique: false
  },
  url: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'url',
    unique: false
  }
  ,
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
  examenId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'id_examen',
    references: {
      model: EXAMEN_TABLE,
      key: 'id_examen'
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

class Resultado extends Model {
  static asssociate(models) {
    this.belongsTo(models.Examen, {as: 'examen'});
    this.belongsTo(models.User, {as: 'user'});
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: RESULTADO_TABLE,
      modelName: 'Resultado',
      timestamp: false
    }
  }
}

module.exports = { RESULTADO_TABLE, ResultadoSchema, Resultado }
