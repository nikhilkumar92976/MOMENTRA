const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    image:{
        type:String,
        required:true
    },
    caption:{
        type:String,
    },
    likes:{
        type:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:'User'
            }
        ]
    },
    comments:{
        type:[
            {
                user:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref:'User'
                },
                message:{
                    type:String,
                    required:true
                },
                createdAt:{
                    type:Date,
                    default:Date.now
                }
            }
        ]
    },
    
},{
    timestamps:true
}
)

const postModel = mongoose.model('Post',postSchema);

module.exports = postModel;