import express from "express"
import { isAuthenticated } from "../controllers/isAuthenticated.js";
import { createComment, deleteComment, editComment, getAllCommentsOnMyBlogs, getCommentsOfPost, likecomment } from "../controllers/comment_controller.js";
import { getMyTotalBlogLikes } from "../controllers/blog_controller.js";

const router=express.Router()

router.post('/:id/create',isAuthenticated,createComment);
router.delete('/:id/delete',isAuthenticated,deleteComment);
router.put("/:id/edit",isAuthenticated,editComment);
router.get('/:id/like',isAuthenticated, likecomment);
router.route("/:id/comment/all").get(getCommentsOfPost);
router.get("/my-blogs/comments",isAuthenticated,getAllCommentsOnMyBlogs);

export default router;