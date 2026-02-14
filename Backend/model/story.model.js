const mongoose = require('mongoose');

const storyModel = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    image:{
        type:String
    },
    text:{
        type:String
    },
    likes:{
        type:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'User',
            }
        ]
    },
    expiresAt: {
      type: Date,
      default: () => Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      index: { expires: 0 } // TTL index
    }
},{timestamps:true})

module.exports = mongoose.model("Story",storyModel);