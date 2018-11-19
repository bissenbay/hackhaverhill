var mongoose = require('mongoose');

// User Schema

var userSchema = new mongoose.Schema({
    type: String, // Student, Teacher, Parent, Administrator (School or Agency/Nonprofit/Program)
    sections_visibility: Array,
    basic_info: {
        first_name: String,
        last_name: String,
        age: Number
    },
    family: {
        parent_1: String,
        parent_1_occupation: String,
        parent_1_education: String,
        parent_1_phone: String,
        parent_2: String,
        parent_2_occupation: String,
        parent_2_education: String,
        parent_2_phone: String,
        household_income: String,
        number_siblings: Number,
        other_household_members: Number,
        primary_household_language: String,
        reduced_lunch: Boolean
    },
    school: {
        mode_transport: String,
        attendance: Number,
        school_tardiness: Number,
        suspensions: Number,
        mcas: String,
        reading_levels: Number,
        attended_preschool: Boolean,
        graduated: Boolean, // graduated HS
        student_degree: Boolean, // earned college degree or not
        college_major: String
    },
    risks: {
        at_risk: Boolean,
        homeless: Boolean,
        special_education: Boolean
    },
    programs: {
        state_agencies_involved: Array
    },
    contact: {
        phone: String
    }
});

// create model
var User = mongoose.model('User', userSchema);

// allow other parts of app to use model
module.exports = User;