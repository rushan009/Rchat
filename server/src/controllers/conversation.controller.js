import Conversation from "../models/conversation.model.js";

export const createConversation = async (req, res) => {
  try {
    const { participantOne } = req.body;
    const participantTwo = req.userId;
    
    const convo = await Conversation.findOne({
      participants: { $all: [participantOne, participantTwo] },
    });
    
    if (convo) {
      const populatedConvo = await convo.populate('participants', 'username email isOnline')
      return res.status(200).json(populatedConvo)
    }
    
    const newConvo = await Conversation.create({
      participants: [participantOne, participantTwo],
    });

    const populatedConvo = await newConvo.populate('participants', 'username email isOnline')
    return res.status(201).json(populatedConvo);
    
  } catch (error) {
    return res.status(500).json({
        message:"server error"
    })
  }
};


export const getConversation = async (req, res) => {
    try {
         const logedinUser = req.userId
    const conversations = await Conversation.find({participants:logedinUser}).populate('participants', 'username email isOnline')

    return res.status(200).json(conversations)

        
    } catch (error) {
         return res.status(500).json({
        message:"server error"
    })
    }
   
}
