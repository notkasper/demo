const path = require('path');
require('dotenv').config(path.join(__dirname, '.env'));
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const xssClean = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const yield = require('./handlers/yield');
require('express-async-errors'); // catching async errors, that arent caught anywhere else, only needs to be required here

const start = async () => {
  const app = express();
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  // Body parser
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Cookie parser
  app.use(cookieParser());

  // Security headers
  app.use(
    helmet({
      // Setting this options allows us to use inline javascript. By default Helmet does now allow this, but as we are a SPA this is required
      contentSecurityPolicy: {
        directives: {
          ...helmet.contentSecurityPolicy.getDefaultDirectives(),
          'script-src': ["'self'", "'unsafe-inline'"],
        },
      },
    }),
  );

  // Xss prevention
  app.use(xssClean());

  // Prevent http param pollution
  app.use(hpp());

  // CORS
  app.use(cors());

  // Set static folder (build folder)
  app.use('/', express.static(path.join(__dirname, './static')));

  app.get('/api/v1/test', (req, res) => res.status(200).send({ message: 'OK' }));
  app.get('/api/v1/crops', yield.getCrops);
  app.get('/api/v1/proposals', yield.getproposals);
  app.get('/api/v1/areaYield', yield.getAreaYieldGraph);
  app.get('/api/v1/yieldCost', yield.getYieldCost);

  const port = process.env.SERVER_PORT || 5000;

  // MUST have all 4 of these parameters!
  app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  });

  if (process.env.NODE_ENV === 'production') {
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, './build/index.html'));
    });
  }

  const server = app.listen(port, console.info(`Server running in ${process.env.NODE_ENV} mode on port ${port}`));

  process.on('unhandledRejection', (error, promise) => {
    console.error(error);
    server.close(() => {
      process.exit(1);
    });
  });
};

start();
