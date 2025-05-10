import {blog} from "../Models/bloges.js"
import {Comment} from "../Models/comment.js"

export async function HandleAddBlog(req,res) {
  try {
    const { title, description } = req.body;

    if (!title || !req.file || !description) {
      return res
        .status(400)
        .render("addBlog", { error: "required all field fill up " });
    }
    const images = `/upload/${req.file.filename}`;

    if (!images) {
      return res.status(400).json({ message: "bad request" });
    }
    const newBlog = await blog.create({
      imagesUrl: images,
      title,
      description,
      createdBy: req.user.id,
    });

    return res.redirect(`/blog/${newBlog._id}`);
  } catch (error) {
    console.error("Error adding blog:", error);
    return res.status(500).render("error", {
      error: "internal server error please try again later",
    });
  }
}

 export async function HandleAddCooment(req,res) {
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

export async function HandleGetData(req,res) {
  const Blog = await blog.findById(req.params.id).populate("createdBy");
  const comment = await Comment.find({blogId:req.params.id}).populate("createdBy");
  res.status(200).render("blog", {
     Blog,
    comment
  });
}

export async function RenderBlogPage(req,res) {
  res.render("addBlog");
}