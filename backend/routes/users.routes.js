const express = require('express');

const route = express.Router();
const userController = require('../controllers/users.controller');

route.post('/signup', userController.signup);
route.post('/signin', userController.login);

module.exports = route;
