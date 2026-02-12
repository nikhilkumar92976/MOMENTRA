const mongoose = require('mongoose');

const notificationModel = mongoose.Schema({
    reciver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    type:{
        type:String,
        enum:['like','comment','follow'],
        required:true
    },
    isRead:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})

module.exports = mongoose.model("Notification", notificationModel);