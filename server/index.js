const express = require('express');
const next = require('next');
const compression = require('compression');
const helmet = require('helmet');

const logger = require('../app/utils/logger');

const isDev = process.env.NODE_ENV !== 'production';
// const isProd = !isDev;

const customHost = process.env.HOST;
const host = customHost || null;
const prettyHost = customHost || 'localhost';
const port = parseInt(process.env.PORT, 10) || 3000;

// Security level configurations using the helmet module
// TODO: Finalize on the list of configurations
const helmetConfig = {
  contentSecurityPolicy: false, // Temporary removing this policy
  noCache: false,
  ieNoOpen: false,
  noSniff: false,
  hidePoweredBy: true,
};

const app = next({ dev: isDev, dir: './app' });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    // Enable compression on response
    server.use(compression());

    // Security configurations
    server.use(helmet(helmetConfig));

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, host, err => {
      if (err) {
        return logger.error(err.message);
      }

      logger.appStarted(port, prettyHost);
    });
  })
  .catch(ex => {
    logger.error(ex.stack);
    process.exit(1);
  });
