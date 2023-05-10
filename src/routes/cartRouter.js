const express = require('express');
const cartRouter = express.Router();
const auth = require('../middeware/auth');
const CartController = require('../app/controllers/CartController');

cartRouter.delete('/deletecart',CartController.deleteItem);
cartRouter.post('/addcart',CartController.addItemGioHang); 
cartRouter.get('/pay',CartController.getPay);
cartRouter.post('/payment',CartController.payment);
cartRouter.get('/',CartController.getGioHang);

module.exports = cartRouter;