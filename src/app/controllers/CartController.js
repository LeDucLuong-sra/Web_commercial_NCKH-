const users = require('../models/userModel');
const Book = require('../models/Book')
const Fashion = require('../models/Fashion')
const Cart = require('../models/cartModel')
const Bill = require('../models/billModel')
const {mutipleMongooseToObject,mongooseToObject} = require('../../util/mongoose')


const CartController ={
    getGioHang: async(req,res)=>{
        const carts = await Cart.find({});
        res.render('giohang',{carts: mutipleMongooseToObject(carts)});
        // const Users = await users.findOne({_id: req.user.id});
        // const carts= Users.cart;
        // res.render('giohang',{carts: mongooseToObject(carts)})
    },
    addItemGioHang: async(req,res)=>{
        try{
            const {name, image,giaBan,soLuong}= req.body;
            const book = await Cart.findOne({name: name});
            //kiem tra san pham da co trong gio hang
            if(book) return res.json({"msg": "Đã tồn tại san pham trong gio"});
            //san pham chua co trong gio hang
            const newCart= new Cart({
                name, image,giaBan,soLuong
            });
            await newCart.save();
            res.redirect('/cart');
        }
        catch(err){
            return res.json("msg: loi server")
        }
    },
    deleteItem: async(req,res)=>{
        // const Users = await users.findOne({_id: req.user.id});
        // //bo di product se xoa
        // const cartNew= Users.cart;
        // cartNew.map(function(item){
        //     if(item._id == req.body.id){
        //         return item;
        //     }
        // });
        // console.log(cartNew.map(function(item){
        //     if(item._id == req.body.id){
        //         return item;
        //     }
        // }))
        // await users.findByIdAndUpdate({_id: req.user.id},{cart: cartNew});
        // res.redirect('/cart');
        await Cart.deleteOne({_id: req.body.id});
        res.redirect('/cart');
    }
    ,
    getPay: async(req,res)=>{
        const carts = await Cart.find({});
        const SoLuongSP={SoLuongSP: await Cart.find({}).count()};
        res.render('menu/thanhToan',{carts: mutipleMongooseToObject(carts),SoLuongSP});
    }
    ,
    payment: async(req,res)=>{
        const infor_payment = new Bill(req.body);
        infor_payment.save();
    }
}

module.exports = CartController;