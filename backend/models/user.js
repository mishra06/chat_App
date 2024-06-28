const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true
    },
    userName:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    gender:{
        type: String,
        required:true,
        enum:['male','female','other']
    },
    password:{
        type: String,
        required: true,
        MIDIInput:8
    },
    profilePic:{
        type: String,
        default: ''
    },
});

const userModel = mongoose.model("users",userSchema);

module.exports = userModel;