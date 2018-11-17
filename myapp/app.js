var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('hello world');
});

var getConnection = function() {
    mongoose.connect('mongodb://team:team123@ds157559.mlab.com:57559/hackathon', { useNewUrlParser: true });
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log('connection succeeded');
    });
}

app.post('/user', function(req, res) {
    getConnection()
    var userSchema = new mongoose.Schema({
        name: String,
        type: String
    });
    var User = mongoose.model('User', userSchema);
    var user = new User({ 
        name: req.body.name,
        type: req.body.type
    });
    user.save(function (err, user) {
        if (err) return console.error(err);
        console.log("User has been saved!");
    });
});

app.post('/class', function(req, res) {
    getConnection()
    var classSchema = new mongoose.Schema({
        name: String,
        teachers: Array,
        students: Array
    });
    var Class = mongoose.model('Class', classSchema);
    var classRoom = new Class({
        name: req.body.name,
        teachers: req.body.teachers,
        students: req.body.students
    });

    classRoom.save(function(err, classRoom) {
        if (err) return console.error(err);
        console.log("Class saved");
    })
});

app.listen(3000);