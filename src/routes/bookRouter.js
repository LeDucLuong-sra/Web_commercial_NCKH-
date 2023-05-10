const express = require('express');
const bookRouter = express.Router();

const BookController = require('../app/controllers/BookController');
const auth = require('../middeware/auth');
const authAdmin = require('../middeware/authAdmin');

bookRouter.get('/create',auth,authAdmin,BookController.create);
bookRouter.post('/store',auth,authAdmin,BookController.store);
bookRouter.get('/:id/edit',auth,authAdmin,BookController.edit);
bookRouter.put('/:id',auth,authAdmin,BookController.update);
bookRouter.delete('/:id',auth,authAdmin,BookController.delete);
bookRouter.get('/dodunghoctap/:slug', BookController.show );
bookRouter.get('/docongnghe/:slug', BookController.show2);
bookRouter.get('/', BookController.index);

module.exports = bookRouter;