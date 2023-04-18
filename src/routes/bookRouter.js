const express = require('express');
const bookRouter = express.Router();

const BookController = require('../app/controllers/BookController');
const auth = require('../middeware/auth');
bookRouter.get('/create',auth,BookController.create);
bookRouter.post('/store',auth,BookController.store);
bookRouter.get('/:id/edit',auth,BookController.edit);
bookRouter.put('/:id',auth,BookController.update);
bookRouter.delete('/:id',auth,BookController.delete);
bookRouter.get('/dodunghoctap/:slug', BookController.show );
bookRouter.get('/docongnghe/:slug', BookController.show2);
bookRouter.get('/', BookController.index);

module.exports = bookRouter;