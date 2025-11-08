const Template = require('../entity/template.entity');

(async () => {
  const templates = await Template.findAll();
  console.log('📄 Plantillas:', JSON.stringify(templates, null, 2));
})();
