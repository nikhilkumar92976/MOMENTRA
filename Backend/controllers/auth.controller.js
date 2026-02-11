const UserModel = require('../model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const uploadFile = require('../services/storage.service')

const createAccount = async(req,res) =>{
    try{
        const {username, fullname, email, password} = req.body;

        if(!username || !fullname || !email || !password){
            return res.status(400).json({
                message:"Please fill the all required feilds"
            })
        }
        const user = await UserModel.findOne({
            $or:[
                {username},
                {email}
            ]
        })
        if(user){
            return res.status(409).json({
                message:"User already found"
            })
        }
        const hashPassword = await bcrypt.hash(password,10);

        const newuser = await UserModel.create({
            username,
            fullname,
            email,
            password:hashPassword
        })

        const token =  jwt.sign({id:newuser._id},process.env.JWT_SECRET,{expiresIn:'7d'})

        res.cookie("token", token,
            {   
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000
            })

        const { password: _, ...userData } = newuser._doc;

        return res.status(200).json({
            success:true,
            message:"user created sucessfully",
            user : newuser
        })

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

const login = async(req,res)=>{
    try{
        const {identifire, password} = req.body;

        if(!password){
            return res.status(401).json({
                message:"Invalid or Missing inputs"
            })
        }
        const user = await UserModel.findOne({
            $or:[
                {email : identifire},
                {username: identifire}
            ]
        })

        if(!user){
            return res.status(404).json({
                message:"User not found"
            })
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({
                message:"Invalid password"
            })
        }

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'})

        res.cookie("token",token,{
            httpOnly:true,
            maxAge : 7*24*60*60*1000
        })

        return res.status(200).json({
            success:true,
            message:"User login succesfully",
            user
        })

    }
    catch(err){
        console.log(err.message);
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

const logout = async(req,res)=>{
    try{
        res.cookie("token","",{
            httpOnly:true,
            expires: new Date(0)
        })

        return res.status(200).json({
            success:true,
            message:"LogOut successfully"
        })

    }
    catch(err){
        console.log(err.message);
        return res.status(500).json({
            success:false,
            messages:"Something went wrong"
        })
    }
}

const updatePassword = async(req,res)=>{
    try{
        const {newPassword,oldPassword} = req.body;

        if(!newPassword || !oldPassword){
            return res.status(409).json({
                sucess:false,
                message:"All feailds are required"
            })
        }
        const user =await UserModel.findById(req.userId)
        console.log(req.body);
        if(!user){
            return res.status(404).json({
                message:"User not found"
            })
        }

        const isMatch = await bcrypt.compare(oldPassword,user.password);
        if(!isMatch){
            return res.status(403).json({
                message:"Wrong Password"
            })
        }
        const hashPassword = await bcrypt.hash(newPassword,10);

        user.password = hashPassword;
        await user.save();

        return res.status(200).json({
            success:true,
            message:"Password updated successfully"
        })

    }
    catch(err){
        console.log(err.message);
        return res.status(500).json({
            success:false,
            message:"something went wrong"
        })
    }
}

const deleteAccount = async(req,res)=>{
    try{
        const user = await UserModel.findById(req.userId);

        await user.deleteOne()

        res.cookie("token","",{
            httpOnly:true,
            expires: new Date(0)
        })

        return res.status(200).json({
            success:true,
            message:"User Account deleted successfully"
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

const updateUserProfile = async(req,res)=>{
    try{
        const user = await UserModel.findById(req.userId);
        if(!user){
            return res.status(403).json({
                message:"unotherized access"
            })
        }

        console.log("body :", req.body);
        const {fullname,date_of_birth,bio,username} = req.body;

        let profilePicUrl;

        if(req.file){
            profilePicUrl = await uploadFile(req.file.buffer);
            console.log("hello")

            if(!profilePicUrl){
                return res.status(403).json({
                    sucess:false,
                    message:"We are unable to upload file"
                })
            }
        }

        if(fullname) user.fullname = fullname;
        if(date_of_birth) user.date_of_birth = date_of_birth;
        if(bio) user.bio = bio;

        if(username && username !== user.username){
            const usernameExist = await UserModel.findOne({username})
            if(usernameExist){
                return res.status(409).json({
                    message:"Username already Exists"
                })
            }
            user.username = username;
        }
        await user.save()

        const { password, ...userData } = user._doc;

        return res.status(200).json({
            success:true,
            message:"User Profile updated successfully!",
            user,userData
        })
        
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            success:false,
            message:"Somthing went wrong"
        })
    }
}

const forgotPassword = async(req,res)=>{

}

module.exports = {createAccount,
                    login,
                    logout,
                    updatePassword,
                    deleteAccount,
                    updateUserProfile,
                }