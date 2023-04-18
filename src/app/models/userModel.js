const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const user = new Schema({
  name: { type: String, maxLength: 255},
  email: { type: String, maxLength: 255},
  password: { type: String, maxLength: 255}
});
module.exports = mongoose.model('Users', user);