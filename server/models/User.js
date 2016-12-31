// Dependencies.
const mongoose = require('mongoose'); // Mongoose DB driver.

// Mongoose schema.
const Schema = mongoose.Schema;

// Model definition.
const User = mongoose.model('User', new Schema({
  username: String,
  password: {
    hash: String,
    salt: String,
  },
}));

// Model export.
module.exports = User;
