const express = require('express');
const cartRouter = express.Router();

const CartController = require('../app/controllers/CartController');

cartRouter.delete('/deletecart',CartController.deleteItem);
cartRouter.post('/addcart',CartController.addItemGioHang); 
cartRouter.get('/pay',CartController.getPay);
cartRouter.get('/',CartController.getGioHang);

module.exports = cartRouter;