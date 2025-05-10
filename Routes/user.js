import express from "express";
const router = express.Router();
import {HandleSignup,HandleLogin} from "../Controller/userController.js"



//post request for signup
router.post("/signup",HandleSignup);
//post request for login
router.post("/login",HandleLogin );

export default router;
