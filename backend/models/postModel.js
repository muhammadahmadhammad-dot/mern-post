import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
   
    text:{
        type:String,
        required:true,
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    status:{
        type:Boolean,
        required:true,
        default:true,
    },
    views:{
        type:Number,
        required:true,
        default:0,
    },
    likes:{
        type:Number,
        required:true,
        default:0,
    }
},{timestamps:true})

export default mongoose.model("Post",postSchema)