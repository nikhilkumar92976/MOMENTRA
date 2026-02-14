const userModel = require('../model/user.model');
const postModel = require('../model/post.model');
const notificationModel = require('../model/notification.model');

const getAllPost = async (req,res)=>{
    try{
        const limit = parseInt(req.query.limit) || 10;
        const cursor = req.query.cursor; // createdAt of last post

        let query = {};

        if (cursor) {
            query.createdAt = { $lt: new Date(cursor) };
        }

        const posts = await postModel.find(query)
            .sort({ createdAt: -1 })
            .limit(limit)
            .populate("user", "username profile_pic")
            .lean()

        const nextCursor =
            posts.length > 0
                ? posts[posts.length - 1].createdAt
                : null;

         res.status(200).json({
            posts,
            nextCursor,
            hasMore: posts.length === limit
        });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Somting went wrong"
        })
    }
}

const getUserByPost = async(req,res)=>{
    try{
        const post = await postModel.findById(req.params.id);
        if(!post){
            return res.status(404).json({
                message:"unable to find post"
            })
        }
        const user = await userModel.findById(post.user.toString()).populate('posts')
        if(!user){
            return res.status(403).json({
                message:"User not found"
            })
        }

        return res.status(200).json({
            success:true,
            message:"User Profile fetch successfully",
            user
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

const likePost = async(req,res)=>{
    try{
        const userId = req.userId;
        const post = await postModel.findByIdAndUpdate(req.params.id)
        if(!post){
            return res.status(404).json({
                message:"Post Not found!"
            })
        }

        const isLike = post.likes.includes(userId)

        if(isLike){
            //unlike
            post.likes.pull(userId)
        }
        else{
            //like
            post.likes.push(userId)
            await notificationModel.create({
                reciver:post.user.toString(),
                sender:userId,
                type:'like'
            })
        }

        await post.save();

        await post.populate("likes","username profile_pic")


        return res.status(200).json({
            sucess:true,
            message:isLike?"UnLike successfully":"Liked successfully",
            likeCount:post.likes.length,
            post
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

const commentPost = async(req,res)=>{
    try{
        const userId = req.userId;
        const {message} = req.body;
        if(!message && !message.trim()){
            return res.status(403).json({
                message:"message not found"
            })
        }
        const post = await postModel.findById(req.params.id);
        if(!post){
            return res.status(404).json({
                message:"Post not found"
            })
        }

        post.comments.push({
            userId,
            message
        })

        await post.save();

         await notficationModel.create({
                reciver:post.user.toString(),
                sender:userId,
                type:'comment'
        })

        await post.populate("comments", "username profilePic");

        return res.status(200).json({
            success:true,
            message:"comment succesfully",
            post
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

const deleteComment = async(req,res)=>{
    try{
        const {postId,commentId} = req.params;
        const userId = req.userId;

        const post = await postModel.findById(postId);
        if(!post){
            return res.status(404).json({
                message:"Post Not Found"
            })
        }

        const comment = post.comments.id(commentId);
        if(!comment){
            return res.status(404).json({
                message:"Comment Not found"
            })
        }

        // premission for post user or comment user able to delete comment
    
        if(comment._id.toString() !== userId  && post.user.toString() !== userId){
            return res.status(403).json({
                message:"You don't have access to delete comment"
            })
        }

        post.comments.pull(commentId);
        await post.save();

        return res.status(200).json({
            success:true,
            message:"Comment deleted successfully",
            comments:post.comments
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

const followUser = async(req,res)=>{
    try{
        const userId = req.userId;
        const targetUserId = req.params.id;

        if(userId === targetUserId){
            return res.status(403).json({
                message:"You can't follow yourself"
            })
        }

        const user = await userModel.findById(req.userId);
        const targetUser = await userModel.findById(req.params.id);
        
        if(!user || !targetUserId){
            return res.status(404).json({
                message:"User not found"
            })
        }

        const isFollowing = user.following.includes(targetUserId);

        if (isFollowing) {
                // UNFOLLOW
            user.following.pull(targetUserId);
            targetUser.followers.pull(userId);
        } else {
                // FOLLOW
            user.following.addToSet(targetUserId);
            targetUser.followers.addToSet(userId);

            await notificationModel.create({
                reciver:targetUser,
                sender:user,
                type:'follow'
            })
        }

        await Promise.all([
            user.save(),
            targetUser.save()
        ]);

        return res.status(200).json({
            success:true,
            message: isFollowing ? "User unfollowed" : "User followed",
            followingCount: user.following.length,
            followersCount: targetUser.followers.length
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

const getNotification = async(req,res)=>{
    try{
        const userId = req.userId;

        const notification = await notificationModel.find({
            reciver:userId
        })
        .populate("sender", "username profilePic")
        .sort({ createdAt: -1 });

        return res.status(200).json({
            success:true,
            message:"Notification Fetched Successfully",
            notification
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

const deleteNotification = async(req,res)=>{
    try{
        const userId = req.userId;
        const notificationId = req.params.id;
        if(!notificationId){
            return res.status(404).json({
                message:"Comment not found!"
            })
        }

        const notification = await notificationModel.findById(notificationId)
       
        if(notification.reciver.toString() !== userId){
            return res.status(409).json({
                message:"You don't have access to delete notification!"
            })
        }

        await notification.deleteOne();

        return res.status(200).json({
            success:true,
            message:"Notification deleted successfully"
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
                    getAllPost,
                    getUserByPost,
                    likePost,
                    commentPost,
                    deleteComment,
                    followUser,
                    getNotification,
                    deleteNotification,
                }