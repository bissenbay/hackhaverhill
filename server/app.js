const config = require('./config/secrets.json');
const mongoose = require('mongoose');
const http = require('http');
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const User = require('./models/user.js');
const ClassRoom = require('./models/classroom.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const accountSid = config.accountSid;
const authToken = config.authToken;
const client = require('twilio')(accountSid, authToken);

// DB Connection

mongoose.connect(config.mongoDB, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connection succeeded');
});

// User Creation

app.post('/user', function(req, res) {

    console.log(req);

    var user = new User({
        type: req.body.type,
        sections_visibility: req.body.sections_visibility,
        basic_info: req.body.basic_info,
        family: req.body.family,
        school: req.body.school,
        risks: req.body.risks,
        programs: req.body.programs,
        contact: req.body.contact
    });

    user.save(function (err, user) {
        if (err) return console.error(err);
        console.log("User has been saved!");
        User.findOne({ phone: req.body.phone }, function (err, doc) {
            if (err) return console.error(err);
            res.status(200).send(doc)
        });
    });

});

// Class Schema

app.post('/class', function(req, res) {

    var classRoom = new ClassRoom({
        name: req.body.name,
        teacher_id: req.body.teacher_id,
        student_ids: req.body.student_ids
    });

    classRoom.save(function(err, classRoom) {
        if (err) return console.error(err);
        console.log("Class saved");
        res.status(200).send(classRoom)
    })
});

// Message Creation

app.post('/message', function(req, res) {

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
        res.send(userMap)

    })
});

// SMS to teacher

app.post('/send', function(req, res) {

    ClassRoom.findOne({ _id: req.body.class_id }, (err, classroom) => {
        if (err) return console.error(err);
        classroom.student_ids.forEach(student_id => {
            User.findOne({ _id: student_id }, (err, student) => {
                if (err) return console.error(err);
                client.messages.create({
                    body: req.body.text,
                    from: config.twilio,
                    to: student.contact.phone
                }).then(message => console.log(message.sid)).done();
                  
            });
        });
    });

});

// SMS to students

app.post('/sms', (req, res) => {

    User.findOne({ 'contact.phone': req.body.From }, (err, user) => {
        if (err) return console.error(err);
        ClassRoom.find((err, classrooms) => {
            if (err) return console.error(err);
            classrooms.forEach(classroom => {
                if (classroom.student_ids.includes(user._id.toString())) {
                    User.findOne({ _id: classroom.teacher_id }, (err, teacher) => {
                        if (err) return console.error(err);
                        client.messages.create({
                            body: user.basic_info.first_name.toString() + ' ' + user.basic_info.last_name.toString() + ': \n' + req.body.Body,
                            from: config.twilio,
                            to: teacher.contact.phone
                        }).then(message => console.log(message.sid)).done();
                        return;
                    });
                }
            });
        });
    });
  
});
  

app.listen(3000);
