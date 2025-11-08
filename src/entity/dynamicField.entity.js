const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const TemplateSection = require('./templateSection.entity');

class DynamicField extends Model {}

DynamicField.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  etiqueta: { type: DataTypes.STRING, allowNull: false },
  source: { type: DataTypes.STRING, allowNull: false },
  value: { type: DataTypes.STRING, allowNull: true },
}, { sequelize, modelName: 'DynamicField' });

TemplateSection.hasMany(DynamicField, { foreignKey: 'sectionId', as: 'dynamicFields' });
DynamicField.belongsTo(TemplateSection, { foreignKey: 'sectionId' });

module.exports = DynamicField;
