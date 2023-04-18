const Book = require('../models/Book')
const Fashion = require('../models/Fashion')
const jwt= require('jsonwebtoken')
const {mutipleMongooseToObject} = require('../../util/mongoose')

const HomeController = {
    loginTrue: async(req, res, next)=> {       
        Book.find({})
        .then(books => {
            
            res.render('home2',{  books: mutipleMongooseToObject(books)});
        })
        .catch(next);
        },
    // [Get => home]
    index: async(req, res, next)=> {   
        const books= await Book.find({});   
        const fashions= await Fashion.find({}); 
        const token = req.cookies.refreshtoken;
        let user;
        if(!token){
            user= {username: 'tài khoản'};
        }
        else{
            user= await jwt.verify(token,'secretKey');
        }
        //console.log(user)
        res.render('home',{  books: mutipleMongooseToObject(books), fashions:mutipleMongooseToObject(fashions),userInfor: user});
    }
    
}
module.exports = HomeController;