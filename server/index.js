/**
 * server.js
 *
 * This is the main file where server starts up
 *
 */

/**
 * Module dependencies.
 */
const express = require('express');
const next = require('next');
const compression = require('compression');
const helmet = require('helmet');

const logger = require('../app/utils/logger');

/**
 * Module variables.
 * @private
 */
const isDev = process.env.NODE_ENV !== 'production';
// const isProd = !isDev;
const customHost = process.env.HOST;
const host = customHost || null;
const prettyHost = customHost || 'localhost';
const port = parseInt(process.env.PORT, 10) || 3000;

// Security level configurations using the helmet module
// update this config accordingly
const helmetConfig = {
  contentSecurityPolicy: false,
  noCache: false,
  ieNoOpen: false,
  noSniff: false,
  hidePoweredBy: true,
};

const app = next({ dev: isDev, dir: './app' });
const handle = app.getRequestHandler();

/**
 * Connect to next and then start the server
 */
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

    // Start up the server and listening to port
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
