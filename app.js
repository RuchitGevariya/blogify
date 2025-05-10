import 'dotenv/config'
import express from "express";
const app = express();
import path from "path";
import userRouter from "./Routes/user.js";
import mongoose from "mongoose";
import cookie from "cookie-parser"
import {checkAuth} from "./Middleware/auth.js"
import staticRouter from "./Routes/staticRouter.js"
import addBlogesRouter from "./Routes/addBlogRouter.js"


//db connected
mongoose
  .connect(process.env.Mongoose_url)
  .then(() => console.log("DB connected"))
  .catch((error) => console.error(error));


//view engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//middleware 
app.use(express.urlencoded({ extended: false }));
app.use(cookie())
app.use(express.static(path.resolve("./public")))

// main routes
app.use("/user", userRouter);
app.use("/",staticRouter)
app.use("/blog",checkAuth,addBlogesRouter )


const Port = process.env.PORT||8000; 
app.listen(Port, () => {
  console.log(`server running on ${Port}`);
});
