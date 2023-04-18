const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Fashion = new Schema({
  Gia: {type: String, maxLength: 255 },//slug:'name', unique: true
  MaSP: {type: String, maxLength: 255 },//slug:'name', unique: true
  slug: {type: String, maxLength: 255 },//slug:'name', unique: true
  ThuongHieu: {type: String, maxLength: 255 },//slug:'name', unique: true
  image: {type: String, maxLength: 255 },//slug:'name', unique: true
  name: {type: String, maxLength: 255 },//slug:'name', unique: true
  slug: {type: String, maxLength: 255 },//slug:'name', unique: true
  createAt: { type: Date, default: Date.now},
  updateAt: { type: Date, default: Date.now}
});
module.exports = mongoose.model('fashions', Fashion);