import User from "../models/user.model.js";

export const searchUser = async (req, res) => {
    try {
         const query = req.query.query;
    const findUsers =await User.find({username:{$regex:query, $options:'i'}, _id:{$ne:req.userId}}).select('-password')
    res.status(200).json(findUsers)
        
    } catch (error) {
        res.status(500).json({
            message:error
        })
    }
   
    
}
export const getUserById = async (req, res) => {
    try {
         const targetUserId= req.params.id;
    const user =await User.findById(targetUserId).select('-password')
         res.status(200).json(user)
    } catch (error) {
        res.status(500).json({
            message:error
        })
    }
   
    
}
