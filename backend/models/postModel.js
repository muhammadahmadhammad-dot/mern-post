import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    slug:{
        type:String,
        require:true,
        unique:true
    },
    text:{
        type:String,
        required:true,
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    featureImage:{
        secure_url:{
            type:String,
            required:true,
        },
        public_id:{
            type:String,
            required:true,
        },
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