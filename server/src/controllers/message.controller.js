import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import { io } from "../../server.js";

export const sendMessage = async (req, res) => {
  try {
    const conversationId = req.params.id;
    const { content } = req.body;
    const sender = req.userId;

    const newMessage = await Message.create({
      conversationId,
      sender,
      content,
    });

    const populatedMessage = await newMessage.populate('sender', 'username email')
    
    await Conversation.findByIdAndUpdate(conversationId, {
        lastMessage: populatedMessage._id,
    });

    io.to(conversationId).emit('newMessage', populatedMessage)
    console.log('sender from token:', req.userId)
    return res.status(200).json(populatedMessage);
    
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getMessage = async (req, res) => {
    try {
         const conversationId=req.params.id;
    const messages = await Message.find({conversationId}).populate('sender', 'username email')
    res.status(200).json(messages)
        
    } catch (error) {
        res.status(500).json({
      message: "Server Error",
    });
    }
   
}