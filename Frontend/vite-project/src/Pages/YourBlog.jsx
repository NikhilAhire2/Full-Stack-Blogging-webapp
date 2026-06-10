import React, { useEffect } from 'react'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card } from '../components/ui/card'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setBlog } from '../redux/blogSlice'
import { BsThreeDotsVertical } from "react-icons/bs"
// import store from '../redux/store'
import { Edit, Trash } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const YourBlog = () => {

  const navigate=useNavigate()
  const dispatch = useDispatch()
  const { blog } = useSelector(store => store.blog)


  const formatDate = (index) => {
    const date = new Date(blog[index].createdAt)
    const formattedDate = date.toLocaleDateString("en-GB")
    return formattedDate;
  }

  const getOwnBlog = async (req, res) => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/blog/getownblogs", {
        withCredentials: true
      })
      if (res.data.success) {

        dispatch(setBlog(res.data.blogs))
        
      }

    } catch (error) {
      console.log(error);


    }
  }

const deleteBlog=async(id)=>{
  
  try {
    const res=await axios.delete(`http://localhost:8000/api/v1/blog/delete/${id}`,{withCredentials:true})
    if(res.data.success){
      const updateBlogData=blog.filter((blogItem)=>blogItem?._id!==id)
      dispatch(setBlog(updateBlogData));
      toast.success(res.data.message)
    }
  } catch (error) {
    console.log(error);
    toast.error("Something Went Wrong")
    
    
  }
}

  useEffect(() => {
    getOwnBlog()
  }, [])

  return (
    <div className='pb-10 pt-20 md:ml-[320px] h-screen'>
      <div className='max-w-6xl mx-auto mt-8'>
        <Card className="w-full p-5 spax-y-2 dark:bg-gray-800">
          <Table>
            <TableCaption>A list your reacent blogs.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead >Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead >Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              { Array.isArray(blog) && blog.map((item, index) => (

                <TableRow key={index}>
                  <TableCell className="flex gap-4 items-center">

                    <img src={item.thumbnail} className='w-20 rounded-md hidden md:block' alt='thumbnail' />
                    <h1 onClick={()=>navigate(`/blogs/${item._id}`)} className='hover:underline cursor-pointer'>{item.title}</h1>
                  </TableCell>
                  <TableCell>{item.category}</TableCell>

                  <TableCell>{formatDate(index)}</TableCell>

                  <TableCell >

                    <DropdownMenu>
                      <DropdownMenuTrigger><BsThreeDotsVertical /></DropdownMenuTrigger>
                      <DropdownMenuContent>

                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={()=>navigate(`/dashboard/write-blog/${item._id}`)}> <Edit/>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={()=>deleteBlog(item._id)} className="text-red-500"> <Trash className="text-red-500"/>Delete</DropdownMenuItem>
                       
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

          </Table>

        </Card>

      </div>


    </div>
  )
}

export default YourBlog
