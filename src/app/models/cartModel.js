const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cart = new Schema({
    maloaihang:{type: String, maxLength: 255},
    name: {type: String, maxLength: 255},
    giaBan:{type: String, maxLength: 255},
    soLuong:{type: Number, default:1},
    image: {type: String},
    createAt: { type: Date, default: Date.now},
    updateAt: { type: Date, default: Date.now}
});
module.exports = mongoose.model('carts', cart);