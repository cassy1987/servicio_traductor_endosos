const Hapi = require('@hapi/hapi');
const endorseRoutes = require('./routes/endorse.routes');

async function init() {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: 'localhost'
  });

  // Registrar rutas
  server.route(endorseRoutes);

  await server.start();
  console.log(`🚀 Servidor corriendo en: ${server.info.uri}`);

  process.on('unhandledRejection', (reason) => {
  console.error('❌ Unhandled Rejection:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('💥 Uncaught Exception:', err);
});

}

module.exports = { init };
