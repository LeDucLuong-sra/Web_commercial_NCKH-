const Book = require('../models/Book')
const {mutipleMongooseToObject} = require('../../util/mongoose')
class MeController {
    // [Get => /news]
    storedBooks(req, res,next) {    
        Book.find({}) 
        .then( books=> res.render('me/stored-books',{
            books: mutipleMongooseToObject(books)
        }))      
        .catch(next);
    }
}
module.exports = new MeController;