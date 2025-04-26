import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
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
    role:{
        type:Number,
        require:true,
        default:0// 1 => admin ,  0=> normal user
    },
    status:{
        type:Number,
        require:true,
        default:1 // 1 => active ,  0=> inactive
    },
},{timestamps:true})

export default mongoose.model("User",userSchema)