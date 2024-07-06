const errorHandler = require("../middleware/errorHandler");
const MessageModel = require("../models/messageModel");
const ConversationModel = require("../models/convertationModel");
const { getReceiverSocketId, io } = require("../socket/socket");
// const conversationModel = require("../models/convertationModel");

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
            });
        }

        const newMessage = new MessageModel({
            senderId,
            receiverId,
            message,
            
        });

        if(newMessage){
         conversation.messages.push(newMessage._id);   
        }
        await Promise.all([conversation.save(), newMessage.save()]);

        const receiverSocketId = getReceiverSocketId(receiverId);

        if(receiverSocketId){
            // Broadcast the new message to the receiver's socket
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json({
            message: newMessage
        });

    } catch (error) {
        console.log("Error in sendMessage controller:",error.message);
        res.status(500).json({
            success: false,
            message: "Error sending message"
        });
    }
};



// const getMessages = async (req, res) => {
//     try {
// 		const { id: userToChatId } = req.params;
// 		const senderId = req.user._id;

// 		const conversation = await ConversationModel.findOne({
// 			participants: { $all: [senderId, userToChatId] },
// 		}).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

// 		if (!conversation) return res.status(404).json([]);

// 		const messages = conversation.messages;

// 		res.status(200).json(messages);
// 	} catch (error) {
// 		console.log("Error in getMessages controller: ", error.message);
// 		res.status(500).json({ error: "Internal server error" });
// 	}
// }

const getMessages = async (req, res) => {
    try {
      const { id: userToChatId } = req.params;
      const senderId = req.user._id;
  
      const conversation = await ConversationModel.findOne({
        participants: { $all: [senderId, userToChatId] },
      }).populate('messages');
  
      if (!conversation) {
        return res.status(404).json({ error: 'Conversation not found' });
      }
        
      const messages = conversation.messages;
      res.status(200).json({
            success:true,
            message:messages
      });
    } catch (error) {
      console.error('Error in getMessages controller:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


const messageController = {
    Message: errorHandler.catchAsync(message),
    getMessages: errorHandler.catchAsync(getMessages),
}

module.exports = messageController;


// conversationId: conversation._id,