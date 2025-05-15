import express from "express";
const router = express.Router();
import {HandleAddBlog,HandleAddCooment,HandleGetData,RenderBlogPage} from "../Controller/addBlogController.js"


// get request for render the add and blog page
router.get("/add",RenderBlogPage);
//get request for blog&comment data
router.get("/:id", HandleGetData);

//post requset for add bloges
router.post("/add",HandleAddBlog);
export default router;
//post requset for add comment
router.post("/comment/:id",HandleAddCooment);