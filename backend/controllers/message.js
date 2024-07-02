const errorHandler = require("../middleware/errorHandler");
const MessageModel = require("../models/messageModel");
const ConversationModel = require("../models/convertationModel");

const message = async(req,res)=>{
    try {
        const {message} = req.body;
        const { id:receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await ConversationModel.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await ConversationModel.create({
                participants :[senderId , receiverId],
            })
        }

        const newMessage = await MessageModel({
            senderId,
            receiverId,
            message,
            conversationId: conversation._id,
        });

        if(newMessage){
         conversation.messages.push(newMessage._id);   
        }

        await Promise.all([conversation.save(), newMessage.save()]);

        res.status(200).json({
            success: true,
            message: "Message sent successfully",
            data: newMessage,
        });

    } catch (error) {
        console.log("Error in sendMessage controller:",error.message);
        res.status(500).json({
            success: false,
            message: "Error sending message"
        });
    }
};

// const getMessages = async(req,res)=>{
//     try {
//         const { id: userToChatId } = req.params;
//         const senderId = req.user._id;

//         const conversation = await ConversationModel.findOne({
//             participants: { $all: [senderId, userToChatId] },
//         }).populate("messages");
        
//         if(!conversation){
//             return res.status(404).json({
//                 success: false,
//                 message: "No conversation found"
//             });
//         }
//         const messages = await ConversationModel.messages;
//         // console.log(messages);

//         res.status(200).json({
//             success: true,
//             message: "Messages fetched successfully",
//             data: conversation.messages,
//         });


//     } catch{
//         console.log("Error in getMessages controller");
//         res.status(500).json({
//             success: false,
//             message: "Error getting messages"
//         });
//     }
// }

const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        // Find the conversation that includes both the sender and the user to chat with
        const conversation = await ConversationModel.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages");

        if (!conversation) {
            return res.status(404).json({
                success: false,
                message: "No conversation found",
            });
        }

        // console.log("conversation.messages",conversation.messages);
        res.status(200).json({
            success: true,
            message: "Messages fetched successfully",
            data: conversation.messages,
        });
        console.log("conversation",conversation.messages);
    } catch (error) {
        console.error("Error in getMessages controller:", error);
        res.status(500).json({
            success: false,
            message: "Error getting messages",
        });
    }
}


const messageController = {
    Message: errorHandler.catchAsync(message),
    getMessages: errorHandler.catchAsync(getMessages),
}

module.exports = messageController;