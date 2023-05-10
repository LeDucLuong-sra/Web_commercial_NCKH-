const Book = require('../models/Book')
const Fashion = require('../models/Fashion')
const {mutipleMongooseToObject} = require('../../util/mongoose')
const MeController=  {
    // [Get => /news]
    storedBooks: async(req, res, next)=> {       
        const books= await Book.find({}); 
        const fashions= await Fashion.find({}); 
        res.render('me/stored-books',{
            books: mutipleMongooseToObject(books)
        , fashions:mutipleMongooseToObject(fashions)});
        }
}
module.exports = MeController;