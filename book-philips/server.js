const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });
  server.route(routes);
  try {
    await server.start();
    console.log((`server berjalan pada  ${server.info.uri}`));
  } catch (e) {
    console.log(e.message);
  }
};

init();
