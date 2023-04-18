const express = require('express');
const meRouter = express.Router();

const MeController = require('../app/controllers/MeController');
const auth = require('../middeware/auth');
meRouter.get('/stored/books',auth, MeController.storedBooks);

module.exports = meRouter;