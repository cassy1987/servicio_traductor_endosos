const Hapi = require('@hapi/hapi');
const routes = require('./routes/endorse.routes');
const sequelize = require('./config/database');
const Template = require('./entity/template.entity');
const initDatabase = require('./config/initDatabase');

const init = async () => {
  await sequelize.sync({ alter: true }); // crea tablas si no existen
  await initDatabase();
  
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: 'localhost'
  });

  server.route(routes);

  await server.start();
  console.log(`🚀 Servidor corriendo en: ${server.info.uri}`);
};

process.on('unhandledRejection', err => {
  console.error(err);
  process.exit(1);
});

init();
