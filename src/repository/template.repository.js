const Template = require('../entity/template.entity');
const TemplateSection = require('../entity/templateSection.entity');
const DynamicField = require('../entity/dynamicField.entity');

class TemplateRepository {
  async findByProductAndType(product, tipoEndoso) {
    return await Template.findOne({
      where: { product, tipoEndoso },
      include: {
        model: TemplateSection,
        as: 'sections',
        include: [{ model: DynamicField, as: 'dynamicFields' }]
      }
    });
  }

  async createTemplate(templateData) {
    return await Template.create(templateData);
  }
}

module.exports = new TemplateRepository();
