const storyModel = require('../model/story.model')
const userModel = require('../model/user.model')

const addStory = async(req,res)=>{
    try{
        const user = await userModel.findById(req.userId);
        if(!user){
            return res.status(403).json({
                message:"Unautrized access"
            })
        }


    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            message:"Someting went wrong "
        })
    }
}