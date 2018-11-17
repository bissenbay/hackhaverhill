var mongoose = require('mongoose');

// create schema
var userSchema = new mongoose.Schema({
    name: String,
    type: String
});

// create model
var User = mongoose.model('User', userSchema);

// allow other parts of app to use model
module.exports = User;