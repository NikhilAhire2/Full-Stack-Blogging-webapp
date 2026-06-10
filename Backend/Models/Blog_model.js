import mongoose from "mongoose"

const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
     subtitle:{
        type:String
        
    },
     description:{
        type:String
        
    },
     thumbnail:{
        type:String
        
    },
    author:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    category:{
        type:String
    },
    likes:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
    comments:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
    isPublished:{
        type:Boolean,
        default:false
    }

},{timestamps:true})

export const Blog =mongoose.model("Blog",blogSchema)