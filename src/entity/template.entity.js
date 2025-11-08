const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Template = sequelize.define('Template', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  product: { type: DataTypes.STRING, allowNull: false},
  tipoEndoso: { type: DataTypes.STRING, allowNull: false},
  rootEntity: { type: DataTypes.STRING, allowNull: true },
  version: { type: DataTypes.STRING, allowNull: true },
  },{ sequelize, modelName: 'Template' });

module.exports = Template;
