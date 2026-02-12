const mongoose = require('mongoose');

//needed to add follow and following array
const UserSchema = mongoose.Schema({
    fullname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    username:{
        type:String,
        require:true,
        unique:true
    },
    date_of_birth:{
        type:String,
    },
    bio:{
        type:String,
    },
    profile_pic:{
        type:String
    },
    posts:{
       type:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'Post'
            }
       ]
    },
    following:{
        type:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'User'
            }
        ]
    },
    followers:{
        type:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'User'
            }
        ]
    },
    story:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Story'
    }
})
const UserModel = mongoose.model("User",UserSchema);

module.exports = UserModel;