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
    shortDescription:{
        type:String,
        required:true,
    },
    description:{
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
    }
},{timestamps:true})

export default mongoose.model("Post",postSchema)