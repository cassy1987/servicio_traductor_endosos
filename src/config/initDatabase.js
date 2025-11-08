const sequelize = require('./database');
const Template = require('../entity/template.entity');
const TemplateSection = require('../entity/templateSection.entity');
const DynamicField = require('../entity/dynamicField.entity');

async function initDatabase() {
  await sequelize.sync({ force: true });

  console.log('🧩 No hay plantillas, insertando la plantilla por defecto...');

  const template = await Template.create({
    product: 'Rumbo',
    tipoEndoso: 'CambioFrecuencia',
    rootEntity: 'policy',
    version: '1.0',
  });

  const eventSection = await TemplateSection.create({
    name: 'eventEntity',
    structure: {
      description: 'SolicitarEndoso',
      dynamicData: [
        { etiqueta: 'ProductosVida', value: null },
        { etiqueta: 'NombreUsuario', value: null },
        { etiqueta: 'NumeroPolizaEndoso', value: null },
        { etiqueta: 'TipoEndosoPol', value: null },
        { etiqueta: 'ResponsableAtencion', value: null },
      ],
    },
    templateId: template.id,
  });

  await DynamicField.bulkCreate([
    { sectionId: eventSection.id, etiqueta: 'ProductosVida', source: 'request', value: 'producto' },
    { sectionId: eventSection.id, etiqueta: 'NombreUsuario', source: 'request', value: 'usuario' },
    { sectionId: eventSection.id, etiqueta: 'NumeroPolizaEndoso', source: 'request', value: 'policyNumber' },
    { sectionId: eventSection.id, etiqueta: 'TipoEndosoPol', source: 'default', value: 'Endoso Simple' },
    { sectionId: eventSection.id, etiqueta: 'ResponsableAtencion', source: 'default', value: 'SAC' },
  ]);

  console.log('✅ Plantilla por defecto insertada');
}

module.exports = initDatabase;
