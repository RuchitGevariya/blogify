import express from "express"
import {checkAuth} from "../Middleware/auth.js"
import { blog } from "../Models/bloges.js";
const router=express.Router()

router.get("/",checkAuth, async(req, res) => {
  const allbloges=await blog.find({})
  res.render("homePage",{
    bloges:allbloges
  });
});



router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/logout",(req,res)=>{
  const uid=req.cookies?.uid;
  if(!uid){
    return res.status(400).json({message:"bad requsest"})
  }
res.clearCookie("uid",{
  httpOnly:true,
  secure:true
})
return res.redirect("/login")
})
export default router;