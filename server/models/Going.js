// Dependencies.
const mongoose = require('mongoose'); // Mongoose DB driver.

// Mongoose schema.
const Schema = mongoose.Schema;

// Model definition.
const Going = mongoose.model('Going', new Schema({
  username: String,
  business_id: String,
  date: { type: Date, default: Date.now },
}));

// Model export.
module.exports = Going;
