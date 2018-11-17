var mongoose = require('mongoose');

// create schema
var classSchema = new mongoose.Schema({
    name: String,
    teachers: Array,
    students: Array
});

// create model
var Class = mongoose.model('Class', classSchema);

// allow other parts of app to use model
module.exports = Class;