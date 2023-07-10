const express = require('express');
const cors = require('cors');
require('dotenv').config();

const usersRoutes = require('./routes/users.routes');
const citiesRoutes = require('./routes/cities.routes');
const HttpError = require('./utils/http-error');

const { PORT } = require('./config');
const { databaseConnection } = require('./database');

const StartServer = async () => {
  const app = express();

  await databaseConnection();
  app.use(express.json());
  app.use(cors());

  app.use('/api/users', usersRoutes);
  app.use('/api/users', citiesRoutes);

  // eslint-disable-next-line no-unused-vars
  app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
  });

  app.listen(PORT, () => {
    console.log(`Server listening to port ${PORT}`);
  }).on('error', (err) => {
    console.error(err);
    process.exit();
  });
};

StartServer();
