import { log } from "console";
import {Blog} from "../Models/Blog_model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/data_uri.js";

export const createBlog=async(req,res)=>{
    try {
        const{title,category}=req.body;
        if(!title || ! category){
            return res.status(400).json({
                message:"Blog title and category is required"
            })
        }
        const blog=await Blog.create({
            title,
            category,
            author:req.id
        })
return res.status(201).json({
    success:true,
    blog,
    message:"blog Createad Successfully"
})
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Failed to Create Blog",
            success:false
        })
        
        
    }
}

export const updateBlog=async(req,res)=>{
    try {
        const blogId=req.params.id;
        const {title,subtitle,description,category}=req.body;
        const file=req.file;

        let blog=await Blog.findById(blogId)
        if(!blog){
            return res.status(404).json({
                message:"Blog not found"
            })
        }
      let thumbnail;   // ✅ declare first

        if(file){
            const fileUrl=getDataUri(file)
            thumbnail=await cloudinary.uploader.upload(fileUrl)
        }


        const updateDate={title,subtitle,description,category,author:req.id,thumbnail:thumbnail?.secure_url }
        blog=await Blog.findByIdAndUpdate(blogId,updateDate,{new:true})
        res.status(200).json({
            success:true,
            message:"Blog updated successfully",
            blog
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error updating Blog"
        })
        
        
    }
}

export const getOwnBlogs=async(req,res)=>{
    try {
        const userId=req.id;
        if(!userId){
            return res.status(400).json({
                message:"User ID is required !"

            })

        }
        const blogs=await Blog.find({author:userId}).populate({
            path:"author",
            select:'firstName lastName photoUrl'
        })
        if(!blogs){
            return res.status(400).json({message:"No Blogs Found",blogs:[],success:false})
        }
        return res.status(200).json({blogs,success:true})
    } catch (error) {
        return res.status(500).json({
            message:"Error fetching blogs",
            error:error.message
        })
        
    }
}

export const DeleteBlog=async(req,res)=>{
    try {
const Blogid=req.params.id;
const authorid=req.id;//comming from isAuthenticated middleware

        const blog=await Blog.findById(Blogid);
        if(!blog){
            return res.status({message:"Blog is Not Found",success:false});
        }
        if(blog.author.toString()!==authorid){
            return res.status(403).json({
                message:"Unauthorized ot deleted this Blog"
            })
        }
        await Blog.findByIdAndDelete(Blogid)
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({message:"Error deletiing Blog",error:error.message})
    }
}

export const getPublishedBlog=async (_,res)=>{
    try {//-1 means descending order (newest blogs first)
        const blogs=await Blog.find({isPublished:true}).sort({createdAt:-1}).populate({path:"author",select:"firstName lastName photoUrl"})
        if(!blogs){
            return res.status(401).json({message:"Blog is Not Found"})
        }
        return res.status(200).json({
            message:"Blog is Found",
            success:true,
            blogs
        })
    } catch (error) {
        return res.status(500).json({
            message:"Failed to get Published Blogs"
        })
        
    }
}

export const togglePublishedBlog=async(req,res)=>{
    try {
        const {blogId}=req.params;//gets the blog ID from the URL
        const {publish}=req.query;//true or false
        
        const blog=await Blog.findById(blogId);
        if(!blog){
            return res.status(400).json({
                message:"Blog is Not found !"
            })
        }
        //publish status based on the query parameter
        blog.isPublished=!blog.isPublished  // Toggle Publish Status  

        await blog.save();
        const statusMessage=blog.isPublished ? "Published":"Unpublished"
        return res.status(200).json({
            success:true,
            message:`Blog is ${statusMessage}`
        })
    } catch (error) {
        return res.status(500).json({
            message:"Failed to update status"
        })
    }
}

export const likeBlog=async(req,res)=>{
    try {
        const blogid=req.params.id;//Gets the blog ID from the URL parameter
        const likeKrnewaleKiId=req.id;
        const blog=await Blog.findById(blogid).populate({path:"likes"})
        if(!blog){
            return res.status(401).json({
                message:"Blog is not Found",
                success:false

            })

            
        }
// $addToSet → MongoDB operator that adds a value to an array only if it doesn’t already exist (prevents duplicate likes).
//like logic started here
        await blog.updateOne({$addToSet:{likes:likeKrnewaleKiId}})
            await blog.save()
            return res.status(200).json({
                message:"Blog is Liked",blog,success:true
            })

    } catch (error) {
        console.log(error);
         return res.status(500).json({
            success:false,
            message:"Failed to like the blogs"
        })
        
        
    }
}

export const disLikeBlog=async(req,res)=>{
    try {
       const blogid=req.params.id;
       const likeKrnewaleKiId=req.id;

       const blog=await Blog.findById(blogid);
       if(!blog){
            return res.status(401).json({
                message:"Blog is not Found",
                success:false

            })

            
        }

        //dislike logic started
        await blog.updateOne({$pull:{likes:likeKrnewaleKiId}})
        await blog.save()

        return res.status(200).json({
                message:"Blog is disLiked",blog,success:true
            })
    } catch (error) {
        console.log(error);
         return res.status(500).json({
            success:false,
            message:"Failed to dislikes"
        })
        
        
    }
}

export const getMyTotalBlogLikes=async(req,res)=>{
    try {
        const userId=req.id;
    
        
       
        
        const myBlogs=await Blog.find({author:userId}).select("likes")
        //const totalLike=myBlogs.reduce((acc,blog)=>acc+(blog.likes?.length || 0),0)
 const totalLike = myBlogs.reduce(
      (acc, blog) => acc + (Array.isArray(blog.likes) ? blog.likes.length : blog.likes || 0),
      0
    );


        return res.status(200).json({
            success:myBlogs.length,
            totalLike,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to featch total blog likes"
        })
        
    }
}