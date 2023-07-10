const express = require('express');

const route = express.Router();
const cityController = require('../controllers/cities.controller');
const checkAuth = require('../middlewares/check-auth');

route.use(checkAuth);

route.post('/cities/add', cityController.addCity);
route.get('/cities', cityController.getCities);

module.exports = route;
