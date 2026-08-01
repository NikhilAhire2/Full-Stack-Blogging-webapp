import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar.jsx"
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import store from '../redux/store'
import { Textarea } from "../components/ui/textarea.jsx"
import { Button } from '../components/ui/button'
import { LuSend } from "react-icons/lu"
import { useEffect } from 'react'
import axios from 'axios'
import { setComment } from '../redux/commentSlice'
import { FaRegHeart } from "react-icons/fa"
import { useState } from "react"
import { setBlog } from "../redux/blogSlice.js"
import { toast } from "sonner"
import {
    DropdownMenu,
      DropdownMenuLabel,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BsThreeDots } from "react-icons/bs"
import { Delete, Edit, Trash2 } from "lucide-react"

import { FaHeart } from "react-icons/fa"
const CommentBox = ({ selectedBlog }) => {


    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);
    
    
    
    const { comment } = useSelector(store => store.comment);
    const { blog } = useSelector(store => store.blog)
    const [content, setContent] = useState("")
const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedContent, setEditedContent] = useState('');

    useEffect(() => {
        const getAllcommentofBlogs = async () => {
            try {
                const res = await axios.get(`https://full-stack-blogging-webapp.onrender.com/api/v1/comment/${selectedBlog._id}/comment/all`)
                const data = res.data.comments
                dispatch(setComment(data))
            } catch (error) {
                console.log(error);

            }
        }
        getAllcommentofBlogs();
    }, [])


    // const changeEventHandler = (e) => {
    //     const inputText = e.target.value;
    //     if (inputText.trim()) {
    //         setContent(inputText);
    //     }
    //     else {
    //         setContent("")
    //     }
    // }

    const changeEventHandler = (e) => {
    setContent(e.target.value);
};
const commentHandler = async () => {
    if (!content.trim()) {
        return toast.error("Comment cannot be empty");
    }

    try {
        const res = await axios.post(
            `https://full-stack-blogging-webapp.onrender.com/api/v1/comment/${selectedBlog._id}/create`,
            { content },
            {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            }
        );

        if (res.data.success) {
            const updatedCommentData = [...comment, res.data.comment];

            dispatch(setComment(updatedCommentData));

            const updatedBlogData = blog.map(b =>
                b._id === selectedBlog._id
                    ? { ...b, comments: updatedCommentData }
                    : b
            );

            dispatch(setBlog(updatedBlogData));

            setContent(""); // ✅ NOW IT WILL CLEAR
            toast.success(res.data.message);
        }
    } catch (error) {
        console.log(error);
        toast.error("Comment add failed");
    }
};



    const deleteComment = async (commentId) => {
  try {
    const res = await axios.delete(
      `https://full-stack-blogging-webapp.onrender.com/api/v1/comment/${commentId}/delete`,
      { withCredentials: true }
    );

    if (res.data.success) {
      const updatedCommentData = comment.filter(
        (item) => item?._id !== commentId
      );

      dispatch(setComment(updatedCommentData));

      //  RESET EDIT STATE
      setEditingCommentId(null);
      setEditedContent("");

      toast.success(res.data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error("Comment not deleted");
  }
};


    const editCommentHandler =async(commentId)=>{
        try {
            const res=await axios.put(`https://full-stack-blogging-webapp.onrender.com/api/v1/comment/${commentId}/edit`,{
                content:editedContent
            },{
            withCredentials:true,
            headers:{
                "Content-Type":"application/json"
            }
        })
        if(res.data.success){
         const updatedCommentData=comment.map(item=>item._id===commentId ?{...item,content:editedContent}:item);
         dispatch(setComment(updatedCommentData));
         toast.success(res.data.message);
         setEditingCommentId(null);
         setContent('');
           
        }
            
        } catch (error) {
            console.log(error);
            toast.error("Failed to edit comment");
            
            
        }
       
    }


    const likeCommentHandler = async (commentId) => {
         try {
             const res = await axios.get(
                 `https://full-stack-blogging-webapp.onrender.com/api/v1/comment/${commentId}/like`,
                 {
                     withCredentials: true,
                 }
             );

             if (res.data.success) {
                 const updatedComment = res.data.updatedComment;

                 const updatedCommentList = comment.map(item =>
                     item?._id === commentId ? updatedComment : item
                 );

                 dispatch(setComment(updatedCommentList));
                 toast.success(res.data.message)
             }
         } catch (error) {
             console.error("Error liking comment", error);
             toast.error("Something went wrong");
         }
     };
    return (
        <div>
            <div className='flex gap-4 mb-4 items-center'>
                <Avatar>
                    <AvatarImage src={user?.photoUrl} />
                    <AvatarFallback>NA</AvatarFallback>
                </Avatar>
                <h3 className='font-bold'>{user?.firstName} {user?.lastName}</h3>

            </div>
            <div className='flex gap-3'>
                <Textarea placeholder="Leave a comment" className="bg-gray-100 dark:bg-gray-800" value={content}  onChange={changeEventHandler} />
                <Button onClick={commentHandler}><LuSend /></Button>
            </div>
            {
               comment && comment.length > 0  ? <div className='mt-7 bg-gray-100 dark:bg-gray-800 p-5 rounded-md'>
                    {
                        comment.map((item, index) => {
                            return <div key={index} className='mb-4'>
                                <div className='flex items-center justify-between'>
                                    <div className='flex gap-3 items-start'>
                                        <Avatar>
                                            <AvatarImage src={item?.userId?.photoUrl} />
                                            <AvatarFallback>NA</AvatarFallback>
                                        </Avatar>
                                        <div className='mb-2 space-y-1 md:w-[400px]'>
                                            <h1 className='font-semibold'>{item?.userId?.firstName} {item?.userId.lastName}
                                                <span className="text-sm ml-2 font-light">yesterday</span></h1>
                                         
                                           {editingCommentId === item?._id ? (
                                                <>
                                                    <Textarea
                                                        value={editedContent}
                                                        onChange={(e) => setEditedContent(e.target.value)}
                                                        className="mb-2 bg-gray-200 dark:bg-gray-700"
                                                    />
                                                    <div className="flex py-1 gap-2">
                                                        <Button size="sm" onClick={() => editCommentHandler(item?._id)}>Save</Button>
                                                        <Button size="sm" variant="outline" onClick={() => setEditingCommentId(null)}>Cancel</Button>
                                                    </div>
                                                </>
                                            ) : (
                                                <p className=''>{item?.content}</p>
                                            )}

                                            <div className="flex gap-5 items-center">
                                                <div className="flex gap-2 items-center">
                                                    <div className="flex gap-1 items-center cursor-pointer" onClick={() => likeCommentHandler(item._id)}>
                                                         {
                                                            item.likes.includes(user?._id)
                                                           
                                                                ? <FaHeart fill='red' />
                                                                : <FaRegHeart />
                                                        }
                                                        <span>{item.numberOfLikes}</span>
                                                    </div>
                                                </div>
                                                <p className="text-sm cursor-pointer">Reply</p>

                                            </div>
                                        </div>
                                    </div>

                                    {
                                        user?._id === item?.userId?._id ? <DropdownMenu>
                                            <DropdownMenuTrigger><BsThreeDots /></DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-[180px]">
                                                <DropdownMenuItem onClick={() => {
                                                    setEditingCommentId(item._id);
                                                    setEditedContent(item.content);
                                                }}><Edit />Edit</DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-500" onClick={() => deleteComment(item._id)}><Trash2 />Delete</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu> : null
                                    }
                                </div>
                            </div>
                        })
                    }

                </div> : null
            }
        </div>
    )
}

export default CommentBox
