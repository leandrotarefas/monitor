const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const createServer = () => {
  const app = express();
  app.use(express.json());
  app.use(bodyParser.json());
  app.use('/', routes);
  return app;
};

module.exports = createServer;
