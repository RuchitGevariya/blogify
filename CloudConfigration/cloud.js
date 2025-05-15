
import {v2 as cloudinary} from "cloudinary"
// // that is way to config manule 

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,      
//   api_secret: process.env.API_SECRET,
// });
// // that is way to config automatic that is when we have need to deploye your project 
cloudinary.config({
  secure:true,
})
export default cloudinary
