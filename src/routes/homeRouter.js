const express = require('express');
const homeRouter = express.Router();

const HomeController = require('../app/controllers/Homecontroller');
homeRouter.get('/', HomeController.index);

module.exports = homeRouter;