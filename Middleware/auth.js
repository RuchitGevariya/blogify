import { error } from "console";
import { getuser } from "../service/auth.js";
import fs from "fs/promises";
export async function checkAuth(req, res, next) {
  const token = req.cookies?.uid;
  if (!token) {
    return res.redirect("/login?error:please+login")
  }
  const user = getuser(token);
  if (!user) {
    return res.redirect("/login");
  }
    req.user = { id: user.id,username:user.fullname};
    res.locals.user=req.user;
  next();
}
