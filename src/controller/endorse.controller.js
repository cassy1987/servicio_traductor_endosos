// endorse.controller.js
const TemplateRepository = require('../repository/template.repository');
const EndorseService = require('../service/endorse.service');
const endorseService = new EndorseService(TemplateRepository);

exports.translate = async (request, h) => {
  try {
    const result = await endorseService.generateResponse(request.payload);
    return h.response(result).code(200);
  } catch (error) {
    console.error(error);
    return h.response({ error: error.message }).code(500);
  }
};
