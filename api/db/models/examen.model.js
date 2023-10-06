// Importación de las clases y constantes necesarias desde sequelize
const { Model, DataTypes, Sequelize } = require('sequelize');

// Nombre de la tabla en la base de datos
const EXAMEN_TABLE = 'examenes';

// Definición del esquema del modelo
const ExamenSchema = {
  id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'id_examen',
    unique: true,
    primaryKey: true
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  function_description: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: false
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

// Definición de la clase Examen que extiende del modelo de Sequelize
class Examen extends Model {
  static asssociate(models) {
    this.hasMany(models.Resultado,{
      as: 'resultado',
      foreignKey: 'examenId'
    });
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

// Exportación de las constantes y la clase
module.exports = { EXAMEN_TABLE, ExamenSchema, Examen }
