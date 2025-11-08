class EndorseService {
  constructor(templateRepository) {
    this.templateRepository = templateRepository;
  }

  async generateResponse(policyData) {

    const template = await this.templateRepository.findByProductAndType(
      policyData.producto,
      policyData.tipoEndoso
    );

      console.log(template)

    if (!template) throw new Error('No existe plantilla configurada');

    const response = {
      policyNumber: policyData.policyNumber,
      idEnvio: policyData.idEnvio,
    };

    for (const section of template.sections) {
      const sectionObj = JSON.parse(JSON.stringify(section.structure));

      for (const field of section.dynamicFields) {
        const value = this.resolveValue(field, policyData);
        this.applyDynamicValue(sectionObj, field.etiqueta, value);
      }

      response[section.name] = sectionObj;
    }

    return response;
  }

  resolveValue(field, data) {
    switch (field.source) {
      case 'request': return data[field.value] || null;
      case 'default': return field.value;
      case 'fechaSistema': return new Date().toISOString().split('T')[0];
      default: return null;
    }
  }

  applyDynamicValue(sectionObj, etiqueta, value) {
    if (Array.isArray(sectionObj.dynamicData)) {
      const item = sectionObj.dynamicData.find(d => d.etiqueta === etiqueta);
      if (item) item.value = value;
    }
  }
}

module.exports = EndorseService;
