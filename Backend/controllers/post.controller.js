const postModel = require('../model/post.model')
const userModel = require('../model/user.model')
const uploadFile = require('../services/storage.service')

const createPost = async (req,res)=>{
    try{
        // console.log("data",req.body);
        // console.log("file:",req.file);
        // console.log("user:",req.params)

        const {caption} = req.body;

        const user = await userModel.findById(req.userId);
        console.log(user)
        if(!user){
            return res.status(409).json({
                message:"Unautrized Access"
            })
        }

        if(!req.file){
            return res.status(403).json({
                message:"Image or video required"
            })
        }
        const result = await uploadFile(req.file.buffer)

        const post = await postModel.create({
            user:user._id,
            image:result.url,
            caption
        })
        user.posts.push(post._id);
        await user.save()


        return res.status(201).json({
            success:true,
            message:"Post created sucessfully",
            post
        })

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            sucess:false,
            message:"Somting went wrong"
        })
    }
}

const deletePost = async(req,res)=>{
    try{
        const post = await postModel.findById(req.params.id)
        console.log(req.params.id)
        if(!post){
            return res.status(404).json({
                message:"Post not found!"
            })
        }
        if(post.user.toString() !== req.userId){
            return res.status(403).json({
                message:"you don't have access to delete this post"
            })
        }
        await post.deleteOne()

        await userModel.findByIdAndUpdate(req.userId,{
            $pull:{posts:post._id}
        })

        return res.status(200).json({
            success:true,
            message:"post deleted succesfully!",
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
module.exports = {createPost,deletePost}