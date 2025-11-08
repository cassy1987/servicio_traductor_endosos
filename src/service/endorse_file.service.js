const templateRepository = require('../repository/template.repository');
const { mapDynamicData } = require('../mapper/mapper');

exports.translateEndorse = async (input) => {
  const { producto, tipoEndoso } = input;
  const template = await templateRepository.getTemplate(producto, tipoEndoso);

  if (!template) throw new Error('Plantilla no encontrada para el producto o tipo de endoso.');

  const translated = {
    policyNumber: input.policyNumber,
    idEnvio: input.idEnvio,
    financialPlansEntity: { description: input.frecuencia },
    currency: { description: input.moneda },
    productEntity: { description: producto },
    eventEntity: {
      description: template.eventDescription,
      dynamicData: mapDynamicData(template.dynamicData, input)
    },
    eventAppliedEntities: template.eventAppliedEntities,
    riskUnitEntities: [
      {
        insuranceObjectEntities: [
          {
            insuranceObjectNumber: "1",
            coverageEntities: [],
            participationEntities: []
          }
        ],
        plansEntity: { description: input.plan },
        riskUnitNumber: "1"
      }
    ],
    participationEntities: []
  };

  return translated;
};
