import {User} from "../Models/user.js"
import {setuser} from "../service/auth.js"
import argon2 from "argon2";

export async function HandleSignup(req,res) {
    const { fullname, email, password } = req.body;
    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "bad request" });
    }
  
    const haspassword = await argon2.hash(password);
    if (!haspassword) {
      return res.status(400).json({ message: "password not hased wait.." });
    }
     await User.create({
      fullname,
      email,
      password: haspassword,
    });
   return res.redirect("/");
}

export async function HandleLogin(req,res) {
  const { email, password } = req.body;
  if (!email || !password) { 
    return res.status(400).json({ message: "bad request" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }
  const isVaildPassword = await argon2.verify(user.password, password);

  if (!isVaildPassword) {
    return res.render("login",{
      error:"invalid password & email"
    })
  }
  const token=setuser(user);
  if(!token){
    return res.status(400).json({message:"token not created",success:true})
  }
res.cookie("uid",token,{
  httpOnly:true,
  maxAge:900000,
  secure:true,
})
return res.redirect("/")
}