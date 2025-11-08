const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const Template = require('./template.entity');

class TemplateSection extends Model {}

TemplateSection.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  structure: { type: DataTypes.JSON, allowNull: false },
}, { sequelize, modelName: 'TemplateSection' });

Template.hasMany(TemplateSection, { foreignKey: 'templateId', as: 'sections' });
TemplateSection.belongsTo(Template, { foreignKey: 'templateId' });

module.exports = TemplateSection;
