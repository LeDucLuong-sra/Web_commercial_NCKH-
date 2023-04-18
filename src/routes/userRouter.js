const { json } = require('express');
const express= require('express');
const jwt = require('jsonwebtoken');
const userRouter= express.Router();
const auth = require('../middeware/auth');

const userController =  require('../app/controllers/UserController');

userRouter.post('/register',userController.createUser);
userRouter.post('/login',userController.login);
userRouter.get('/register',userController.getRegister);
userRouter.get('/login',userController.getLogin);
userRouter.get('/logout',userController.logout);
userRouter.get('/refresh_token',userController.refreshToken);
userRouter.get('/upload',userController.uploadFile);
userRouter.get('/',(req,res)=>{
    try{
        const token = req.cookies.refreshtoken;
        if(!token) return res.json('Xác thực chưa phù hợp!');

        jwt.verify(token,'secretKey',(err,user)=>{
            if(err) return res.json({mgs: "Xác thực chưa phù hợp!"});
            res.json({user});
        })
        
    }catch(err){
        return res.json({mgs: err.message});
    }
})
module.exports= userRouter;