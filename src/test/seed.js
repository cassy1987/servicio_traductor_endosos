const sequelize = require('../config/database');
const Template = require('../entity/template.entity');

(async () => {
  await sequelize.sync({ force: true });

  await Template.create({
    product: 'Rumbo',
    tipoEndoso: 'CambioFrecuencia',
    plantilla: {
      estructuraBase: {
        policyNumber: '',
        eventEntity: {},
        eventAppliedEntities: [
          { description: 'SolicitarEndoso', orderEvent: 1 },
          { description: 'AprobarEndoso', orderEvent: 2 }
        ]
      },
      dynamicData: [
        { etiqueta: 'FechaSolicitud', origen: 'fechaSolicitud' },
        { etiqueta: 'Frecuencia', origen: 'frecuencia' }
      ]
    }
  });

  console.log('🌱 Plantilla cargada');
  process.exit();
})();
