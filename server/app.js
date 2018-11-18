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

app.post('/newuser', function(req, res) {
    console.log("hit route", req.body);
    var user = new User({
        type: req.body.type,
        sections_visibility: req.body.sections_visibility,
        basic_info: {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            age: req.body.age
        },
        family: {
            parent_1: req.body.parent_1,
            parent_1_occupation: req.body.parent_1_occupation,
            parent_1_education: req.body.parent_1_education,
            parent_1_phone: req.body.parent_1_phone,
            parent_2: req.body.parent_2,
            parent_2_occupation: req.body.parent_2_occupation,
            parent_2_education: req.body.parent_2_education,
            parent_2_phone: req.body.parent_2_phone,
            household_income: req.body.household_income,
            number_siblings: req.body.req.body.number_siblings,
            other_household_members: req.body.other_household_members,
            primary_household_language: req.body.primary_household_language,
            reduced_lunch: req.body.reduced_lunch
        },
        school: {
            mode_transport: req.body.mode_transport,
            attendance: req.body.attendance,
            school_tardiness: req.body.school_tardiness,
            suspensions: req.body.suspensions,
            mcas: req.body.mcas,
            reading_levels: req.body.reading_levels,
            attended_preschool: req.body.attended_preschool,
            graduated: req.body.graduated, // graduated HS
            student_degree: req.body.student_degree, // earned college degree or not
            college_major: req.body.college_major
        },
        risks: {
            at_risk: req.body.at_risk,
            homeless: req.body.homeless,
            special_education: req.body.special_education
        },
        programs: {
            state_agencies_involved: req.body.state_agencies_involved
        },
        contact: {
            phone: req.body.phone,
            twilio: twilio_number
        }
    });


    user.save(function (err, user) {
        if (err) return console.error(err);
        console.log("User has been saved!", user);
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
