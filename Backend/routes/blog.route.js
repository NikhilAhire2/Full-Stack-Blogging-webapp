import express from "express"
import { register, login, logout, updateProfile } from "../controllers/userController.js";
import { isAuthenticated } from "../controllers/isAuthenticated.js";
import { singleUpload } from "../multer.js";
import { createBlog, updateBlog,getOwnBlogs,DeleteBlog, likeBlog, disLikeBlog, getMyTotalBlogLikes, getPublishedBlog, togglePublishedBlog,summarizeBlog, askBlogQuestion, translateBlog } from "../controllers/blog_controller.js";

const router = express.Router()
router.route("/getownblogs").get(isAuthenticated,getOwnBlogs)
router.route("/").post(isAuthenticated, createBlog)

router.post(
  "/ask-blog",
  askBlogQuestion
);
router.route("/translate")
.post(translateBlog);
router.route("/summary").post(summarizeBlog);
router.route("/:id").put(isAuthenticated,singleUpload,updateBlog)  //dynamic route fom req.params.blogId
router.route("/delete/:id").delete(isAuthenticated,DeleteBlog)
router.route("/:id/like").get(isAuthenticated,likeBlog)
router.route("/:id/dislike").get(isAuthenticated,disLikeBlog)
router.route("/my-blogs/likes").get(isAuthenticated,getMyTotalBlogLikes)//isauthenticataed is remove here now
router.route("/get-published-blogs").get(getPublishedBlog)
router.route("/:blogId").patch(isAuthenticated,togglePublishedBlog)



export default router