import mongoose from "mongoose";

const blogesSchema= mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  imagesUrl:{
    type:String,
    required:false
  },
 description:{
  type:String,
  required:true
 },
 createdBy:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"user"
 }
},{timestamps:true})

 export const blog= mongoose.model("bloges",blogesSchema)