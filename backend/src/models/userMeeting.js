import mongoose ,{ Schema } from "mongoose"

const userMeetingSchema=new Schema({

    usie_id:{
        type:String,
        required:true,
    },

    meeting_id:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
        required:true,

    }

})

const UserMeeting = mongoose.model("UserMeeting",userMeetingSchema)
 export  {UserMeeting}
