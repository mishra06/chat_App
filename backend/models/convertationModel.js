const mongoose = require("mongoose");

const convertationSchema = new mongoose.Schema({
    participants: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
            default: [],
        },
    ],
},{timestamps: true});

const conversationModel = mongoose.model("ConversionModel",convertationSchema);

module.exports = conversationModel;