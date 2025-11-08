const endorseController = require('../controller/endorse.controller');

module.exports = [
  {
    method: 'POST',
    path: '/endorse/translate',
    handler: endorseController.translate
  }
];
