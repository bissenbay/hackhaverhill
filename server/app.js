var mongoose = require('mongoose');
var express = require('express');
var cors = require('cors');
var bodyParser = require("body-parser");
var app = express();

var User = require('./models/user.js');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors())

app.get('/', function (req, res) {
  res.send('hello world');
});

var getConnection = function() {
    mongoose.connect('mongodb://team:team123@ds157559.mlab.com:57559/hackathon', { useNewUrlParser: true });
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log('connection to mongodb succeeded');
    });
}();

app.post('/user', function(req, res) {
    getConnection();

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
    getConnection();

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

app.post('/message', function(req, res) {
    getConnection();

    var message = new Message({
        time: Date.now(), // is this how you do it?
        value: req.body.value,
        from: req.body.from,
        to: req.body.to,
        recipient_type: req.body.recipient_type
    });

    message.save(function(err, message) {
        if (err) return console.error(err);
        console.log("Message sent");
    });
});

app.get('/userList', function(req,res) {
    User.find({}, function(err, users) {
        let userMap = {};
        users.forEach(function(user){
            userMap[user._id] = user;
        })
        console.log('all students', userMap);
        res.send(userMap)
    })
})

const port = 3000;

app.listen(port, function(){
    console.log(`running on port: ${port}`)
});
