const mongoose = require("mongoose");

const messageSchems = new mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    message:{
        type: String,
        required: true,
    }
},{timestamps: true});

const messageModel = mongoose.model("Message", messageSchems);

module.exports = messageModel;