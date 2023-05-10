const users = require('../models/userModel');
const Cart = require('../models/cartModel')
const jwt= require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UserController = {

    getRegister: async (req, res)=>{    
        //res.send("sucessfully");    
        //layout: false / bo header v footer default
        res.render('login/register',{layout: false});
    },

    getLogin: async (req, res)=>{    
        res.render('login/login',{layout: false});
    },

    createUser: async(req,res)=>{
        try{
            const {name, email,password} = req.body;
            const user= await users.findOne({name: name});
            console.log(user)
            if(user) return res.json("msg: Đã tồn tại tài khoản");
            //logic
            if(password.length <6) return res.json("msg: Mat khau < 6 ki tu");
            
            const passwordHash = await bcrypt.hash(password,10);
            const newUser = new users({
                name, email, password: passwordHash
            })
            await newUser.save();
            //res.json("msg: tao tài khoản thành công");

            //Tạo jsonwebtoken để xác thực
            const accesstoken = createAccessToken({id: newUser._id});
            const refreshtoken = createRefreshToken({id: newUser._id})

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000 // 7d
            })

            res.json({accesstoken})


        }
        catch(err){
            return res.json("msg: loi server")
        }
        

    },

    login: async(req, res)=>{
        try{
            const {name, password} = req.body;
            const user= await users.findOne({name: name});
            if(!user) return res.json("msg: Không tồn tại tài khoản này");
            //logic
            
           //oke
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch) return res.json({msg: "Mat khau nhap sai"});
            //res.json("msg: login sucesss!");
            //
            const accesstoken = createAccessToken({id: user._id,username: user.name})
            const refreshtoken = createRefreshToken({id: user._id,username: user.name})

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
               // path: '/user/refresh_token'
            })

            //res.json({accesstoken})
            //tro lai trang home
            
            res.redirect('/');
        }
        catch(err){
            return res.json("msg: loi server")
        }
    }
    ,
    logout: async(req,res)=>{
        try{
            res.clearCookie('refreshtoken');
            //return res.json({msg: "Logged out"});
            res.redirect('/');

        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    //đang thử nghiệm addcart
    addcart: async(req,res)=>{
        try {
            const user = await users.findById(req.user.id)
            if(!user) return res.status(400).json({msg: "User does not exist."})
            
            //add cart
            const {name, image,giaBan,soLuong}= req.body;
            const book = await Cart.findOne({name: name});
            //kiem tra san pham da co trong gio hang
            if(book) return res.json({"msg": "Đã tồn tại san pham trong gio"});
            //san pham chua co trong gio hang
            const newCart= new Cart({
                name, image,giaBan,soLuong
            });
            await newCart.save();

            //add cart to user
            const products = await Cart.find({});
            await users.findOneAndUpdate({_id: req.user.id}, {
                cart: products
            })

            return res.json({msg: "Added to cart"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
    ,
    //trả về user infor
    getUserIf: async(req,res)=>{
        const token = req.cookies.refreshtoken;
        let user;
        if(!token){
            user= {username: 'Tài khoản'};
        }
        else{
            user= await jwt.verify(token,'secretKey');
        }

        res.json({UserInfor: user});
    }
    ,
    refreshToken: async(req,res)=>{
        res.json(req.header("Authorization"));
    },
    uploadFile: async(req,res)=>{
        res.render('upload')
    }
    
}

const createAccessToken = (user)=>{
    return jwt.sign(user,'secretKey',{expiresIn: '10m'});
 }

const createRefreshToken = (user)=>{
    return jwt.sign(user,'secretKey',{expiresIn: '7d'});
 }


module.exports = UserController;