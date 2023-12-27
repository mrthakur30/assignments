const mongoose = require('mongoose');

// Define schemas
const AdminSchema = new mongoose.Schema({
     username : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    }
});

const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    courses : {
        type : Array
    } 
});

const CourseSchema = new mongoose.Schema({
     title : {
        type : String,
        required : true,
     },
     description : {
        type : String,
     },
     price : {
        type : Number,
     },
     imgLink : {
        type : String,
     },
     published : {
        type : Boolean,
        default : true,
     }

});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}