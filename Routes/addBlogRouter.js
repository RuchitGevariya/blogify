import express from "express";
import multer from "multer";
import path from "path";
const router = express.Router();
import {HandleAddBlog,HandleAddCooment,HandleGetData,RenderBlogPage} from "../Controller/addBlogController.js"


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, path.resolve("./public/upload"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// get request for render the add and blog page
router.get("/add",RenderBlogPage);
//get request for blog&comment data
router.get("/:id", HandleGetData);

//post requset for add bloges
router.post("/add", upload.single("coverImage"),HandleAddBlog);
export default router;
//post requset for add comment
router.post("/comment/:id",HandleAddCooment);