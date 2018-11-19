var mongoose = require('mongoose');

// create schema
var classSchema = new mongoose.Schema({
    name: String,
    teacher_id: String,
    student_ids: Array
});

// create model
var Class = mongoose.model('Class', classSchema);

// allow other parts of app to use model
module.exports = Class;