const storyModel = require('../model/story.model')
const userModel = require('../model/user.model')
const uploadFile = require('../services/storage.service')
const notficationModel = require('../model/story.model')

const addStory = async(req,res)=>{
    try{
        const user = await userModel.findById(req.userId);
        if(!user){
            return res.status(403).json({
                message:"Unautrized access"
            })
        }
        const {text} = req.body;
        const imageUrl = await uploadFile(req.file.buffer);
        console.log("imageUrl :",imageUrl.url)

        const story = await storyModel.create({
            user:user._id,
            text,
            image:imageUrl.url
        })

        user.story.push(story._id);
        await user.save();

        return res.status(200).json({
            success:true,
            message:"Story added successfully",
            story
        })

    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            message:"Someting went wrong "
        })
    }
}

const getUserStory = async(req,res)=>{
    try{
        const userId = req.params.userid;
        const user = await userModel.findById(userId);

        if(!user){
            return res.status(404).json({
                message:"Unautorize Access"
            })
        }

        const storys = await storyModel.find({user:userId}).sort({ createdAt: -1 })

        return res.status(200).json({
            success:true,
            message:"Story Fetched successfully!",
            totalStory:storys.length,
            storys
        })

    }
    catch(err){
        console.log(err);
    }
}

const getFollowingUserStory = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await userModel.findById(userId).select("following");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const stories = await storyModel.aggregate([
      {
        // only following users stories
        $match: {
          user: { $in: user.following }
        }
      },
      {
        // join user data
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user"
        }
      },
      {
        $unwind: "$user"
      },
      {
        // group by user
        $group: {
          _id: "$user._id",
          user: {
            $first: {
              _id: "$user._id",
              username: "$user.username",
              profilePic: "$user.profilePic"
            }
          },
          stories: {
            $push: {
              _id: "$_id",
              image: "$image",
              caption: "$caption",
              createdAt: "$createdAt"
            }
          }
        }
      },
      {
        // sort users by latest story
        $sort: {
          "stories.createdAt": -1
        }
      }
    ]);

    return res.status(200).json({
      success: true,
      totalUsers: stories.length,
      stories
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong!"
    });
  }
};

const deleteStory = async(req,res)=>{
     try{
            const story = await storyModel.findById(req.params.id)
            
            if(!story){
                return res.status(404).json({
                    message:"Story not found!"
                })
            }
            if(story.user.toString() !== req.userId){
                return res.status(403).json({
                    message:"you don't have access to delete this story"
                })
            }
            await story.deleteOne()
    
            await userModel.findByIdAndUpdate(req.userId,{
                $pull:{story:story._id}
            })
    
            return res.status(200).json({
                success:true,
                message:"story deleted succesfully!",
            })
    
        }
        catch(err){
            console.log(err)
            return res.status(500).json({
                success:false,
                message:"Somting went wrong"
            })
        }
}


const likeStory = async(req,res)=>{
    try{
            const userId = req.userId;
            const story = await storyModel.findById(req.params.id)
            if(!story){
                return res.status(404).json({
                    message:"Story Not found!"
                })
            }
    
            const isLike = story.likes.includes(userId)
    
            if(isLike){
                //unlike
                story.likes.pull(userId)
            }
            else{
                //like
                story.likes.push(userId)
                console.log("storyId :", story.user.toString())
                // await notficationModel.create({
                //     reciver:story.user.toString(),
                //     sender:userId,
                //     type:'like'
                // })
                console.log("userId :", userId)
            }
    
            await story.save();
    
            await story.populate("likes","username profile_pic")
    
    
            return res.status(200).json({
                sucess:true,
                message:isLike?"Story UnLike successfully":"Story Liked successfully",
                likeCount:story.likes.length,
                story
            })
           
        }
        catch(err){
            console.log(err)
            return res.status(500).json({
                success:false,
                message:"Somting went wrong!"
            })
        }
}


module.exports = {
    addStory,
    getUserStory,
    getFollowingUserStory,
    deleteStory,
    likeStory
}