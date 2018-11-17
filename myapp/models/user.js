var mongoose = require('mongoose');

// create schema
var userSchema = new mongoose.Schema({
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
        parent_1_phone: Number,
        parent_2: String,
        parent_2_occupation: String,
        parent_2_education: String,
        parent_2_phone: Number,
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
    }
    contact: {
        phone: Number
    },
    id: {
        state_id: Number,
        school_id: Number,
        program_id: Number
    }
});

// create model
var User = mongoose.model('User', userSchema);

// allow other parts of app to use model
module.exports = User;