const express = require('express');
const meRouter = express.Router();

const MeController = require('../app/controllers/MeController');
const auth = require('../middeware/auth');
const authAdmin = require('../middeware/authAdmin');

meRouter.get('/stored/books',auth,authAdmin, MeController.storedBooks);

module.exports = meRouter;