const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    gender:{
        type: String,
        required:true,
        enum:['male','female']
    },
    password:{
        type: String,
        required: true,
        minlength: 8,
    },
    profilePic:{
        type: String,
        default: ''
    },
},{timestamps:true});

const userModel = mongoose.model("users",userSchema);

module.exports = userModel;