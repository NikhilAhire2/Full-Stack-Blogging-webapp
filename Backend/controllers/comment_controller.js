import { Blog } from "../Models/Blog_model.js";
import Comment from "../Models/comment_models.js";

export const createComment=async(req,res)=>{
    try {
        const postId=req.params.id
        const commentKrneWaleUserKiId=req.id;
        const {content}=req.body;

        const blog=await Blog.findById(postId);
        if(!content) return res.status(400).json({
            message:"Text is required",success:false
        })
        const comment=await Comment.create({
            content,
            userId:commentKrneWaleUserKiId,
            postId:postId
        })
        await comment.populate({
            path:'userId',
            select:'firstName lastName photoUrl'
        })
        blog.comments.push(comment._id);
        await blog.save();
        return res.status(201).json({
            message:"Comment Added",
            comment,
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}

export const getCommentsOfPost=async (req,res)=>{
    try {
        const blogId=req.params.id;
        
        const comments = await Comment.find({ postId: blogId })
        .populate({ path: 'userId', select: 'firstName lastName photoUrl' })
        .sort({ createdAt: -1 })
        if(!comments){
            return res.status(404).json({
                message:"No comments found for this Blog",success:false
               
            })
        }
        return res.status(200).json({
            success:true,
            comments
        })
    } catch (error) {
        console.log(error);
        
    }
}

export const deleteComment=async (req,res)=>{
    try {
        const commentId=req.params.id;//this id comes from url
        
        
        const authorId=req.id;// This is the ID of the currently logged-in user (probably set earlier by authentication middleware).
        const comment=await Comment.findById(commentId);
        if(!comment){
            return res.status(403).json({success:false,message:"Unauthorized to delete this comment"})
        }
        const blogId=comment.postId;


        if (comment.userId.toString() !== authorId) {
    return res.status(403).json({ success: false, message: "You can only delete your own comments" });
}
        //delete the comment
        await Comment.findByIdAndDelete(commentId);

        //Remove comment id from blogs comments array
        await Blog.findByIdAndUpdate(blogId,{
            $pull:{comments:commentId}
        })
        res.status(200).json({success:true,message:"deleted Successfully"})
    } catch (error) {
       
        res.status(500).json({success:false,message:"Error deleting comment",error:error.message})
        
    }
}

export const editComment=async (req,res)=>{
    try {
        const userId=req.id;//user id during the login 
        const {content}=req.body;//frontent text from user
        const commendId=req.params.id;//id from url

        const comment=await Comment.findById(commendId);
        if(!comment){
            res.status(403).json({success:false,message:"Not authorized to edit this comment"})
        }

        //check if the user owns the comment
        if (comment.userId.toString() !== userId) {
    return res.status(403).json({ success: false, message: "Not Authorized to edit this comment" });
}
        comment.content=content;
        comment.editedAt=new Date();

        await comment.save();
        res.status(200).json({success:true,message:"Comment updated Successfully",comment})
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:"comment is not edited",error:error.message})
        
    }
}

export const likecomment=async (req,res)=>{
    try {
          const userId=req.id;//user id during the login 
      //const userId = req.user.id; // or req.user._id depending on your middleware



        const commendId=req.params.id;//id from url
       
        
        const comment=await Comment.findById(commendId).populate("userId");
        if(!comment){
        return res.status(404).json({success:false,message:"comment is not found"})

        }
        //const alreadyLiked=comment.likes.includes(userId);

const alreadyLiked = comment.likes.some(
  (id) => id && id.toString() === userId.toString()
);
        if(alreadyLiked){
            //if alredy liked ,unlike it
            comment.likes=comment.likes.filter(id=>id !==userId);
           // comment.numberOfLikes =0;//can go nagative
            comment.numberOfLikes = Math.max(0, comment.numberOfLikes - 1);

        }
        else{//if not liked yet like it
            comment.likes.push(userId)
            comment.numberOfLikes +=1;

        }
        
        await comment.save();
        res.status(200).json({
            success:true,
            message:alreadyLiked? "Comment unliked" : "Comment Liked",
            updatedComment: comment,
        })
    } catch (error) {
        console.log(error);
         res.status(500).json({success:false,message:"something went wrong while liking the comment",error:error.message})
        
    }
}


export const getAllCommentsOnMyBlogs = async (req, res) => {
  try {
    const userId = req.id; // assuming you're using auth middleware

    // Step 1: Find all blog posts created by the logged-in user
    const myBlogs = await Blog.find({ author: userId }).select("_id");

    const blogIds = myBlogs.map(blog => blog._id);

    if (blogIds.length === 0) {
      return res.status(200).json({
        success: true,
        totalComments: 0,
        comments: [],
        message: "No blogs found for this user.",
      });
    }

    // Step 2: Find all comments on these blogs
    const comments = await Comment.find({ postId: { $in: blogIds } })
      .populate("userId", "firstName lastName email")
      .populate("postId", "title");

    res.status(200).json({
      success: true,
      totalComments: comments.length,
      comments,
    });
  } catch (error) {
    console.error("Error fetching comments on user's blogs:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get comments.",
    });
  }
};