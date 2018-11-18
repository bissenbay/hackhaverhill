var mongoose = require('mongoose');

// create schema
var messageSchema = new mongoose.Schema({
    time: Date,
    value: String,
    from: String,
    to: String,
    recipient_type: String // class, student
});

// create model
var Message = mongoose.model('Message', messageSchema);

// allow other parts of app to use model
module.exports = Message;