import { blog } from "../Models/bloges.js";
import { Comment } from "../Models/comment.js";
import cloudinary from "../CloudConfigration/cloud.js"
export async function HandleAddBlog(req, res) {
  try{

  
  const { title, description } = req.body;
  if (!title ||!description) {
    return res
      .status(400)
      .render("addBlog", { error: "All fields are required " });
  }
  if(!req.files||!req.files.coverImage){
    return res.status(400).render("addBlog",{error:"image are required"})
  }
  console.log(req.files)
 const file= req.files.coverImage
 const result= await cloudinary.uploader.upload(file.tempFilePath,{
  folder:"blog_images",
  resource_type: "image"
 })
  const newBlog = await blog.create({
    imagesUrl:result.secure_url,
    title,
    description,
    createdBy: req.user.id,
  });

  return res.redirect(`/blog/${newBlog._id}`);
} catch(error){
  return res.render("addBlog",{error:"internal server issue please try again later"})
}
}

export async function HandleAddCooment(req, res) {
  const { content } = req.body;
  if (!content) {
    res.status(400).json({ message: "please enter the comment" });
  }

  await Comment.create({
    content,
    blogId: req.params.id,
    createdBy: req.user?.id,
  });
  res.redirect(`/blog/${req.params.id}`);
}

export async function HandleGetData(req, res) {
  const Blog = await blog.findById(req.params.id).populate("createdBy");
  const comment = await Comment.find({ blogId: req.params.id }).populate(
    "createdBy"
  );
  res.status(200).render("blog", {
    Blog,
    comment,
  });
}

export async function RenderBlogPage(req, res) {
  res.render("addBlog");
}
