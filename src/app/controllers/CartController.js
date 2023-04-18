const users = require('../models/userModel');
const Book = require('../models/Book')
const Fashion = require('../models/Fashion')
const Cart = require('../models/cartModel')
const {mutipleMongooseToObject} = require('../../util/mongoose')


const CartController ={
    getGioHang: async(req,res)=>{
        const carts = await Cart.find({});
        res.render('giohang',{carts: mutipleMongooseToObject(carts)});
    },

    addItemGioHang: async(req,res)=>{
        try{
            const {name, image,giaban,soluongton}= req.body;
            const book = await Cart.findOne({name: name});
            //kiem tra san pham da co trong gio hang
            if(book) return res.json("msg: Đã tồn tại san pham trong gio");
            //san pham chua co trong gio hang
            const newCart= new Cart({
                name, image,giaban,soluongton
            });
            await newCart.save();
            res.redirect('/cart');
        }
        catch(err){
            return res.json("msg: loi server")
        }
    },
    deleteItem: async(req,res)=>{
        await Cart.deleteOne({_id: req.body.id});
        res.redirect('/cart');
    }

}

module.exports = CartController;