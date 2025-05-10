import mongoose from "mongoose";

const commentSchema= mongoose.Schema({
  content:{
    type:String,
    required:true
  },
  blogId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"bloges"
   },
   createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
   }
},{timestamps:true})

 export const Comment=mongoose.model("comment",commentSchema);
