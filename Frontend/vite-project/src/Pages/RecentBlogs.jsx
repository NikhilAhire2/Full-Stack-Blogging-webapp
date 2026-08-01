import React, { useEffect } from 'react'
import BlogCard from './BlogCard'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import BlogCardList from "../components/ui/BlogCardList"
import { Badge } from '../components/ui/badge'
import {Input} from "../components/ui/input"
import { Button } from '../components/ui/button'
import axios from 'axios'
import { setBlog } from '../redux/blogSlice'
const RecentBlogs = () => {
  const { blog } = useSelector(store => store.blog)
  const [category, setCategory] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()

useEffect(()=>{
  const getAllPublishedBlogs=async()=>{
    try {
      const res=await axios.get(`https://full-stack-blogging-webapp.onrender.com/api/v1/blog/get-published-blogs`,{withCredentials:true})
      if(res.data.success){
        dispatch(setBlog(res.data.blogs))
      }
    } catch (error) {
      console.log(error);
      
      
    }
  }
  getAllPublishedBlogs()
},[])

  return (
    <div className='bg-gray-100 dark:bg-gray-800 pb-10'>
      <div className='max-w-6xl mx-auto flex flex-col space-y-4 items-center'>
        <h1 className='text-4xl font-bold pt-10'>Recent Blogs</h1>
        <hr className='w-26 text-center border-2 border-red-500 rounded-full' />
      </div>
      <div className='max-w-7xl mx-auto flex gap-6'>
        <div>   
          <div className='mt-10 px-4 md:px-0 '>
            {
              blog?.slice(0, 4)?.map((blog, index) => {
                return <BlogCardList blog={blog} key={index} />
              })
            }
          </div>
        </div>

        <div className='bg-white md:block dark:bg-gray-700 w-[350px] p-6 rounded-md mt-10 mr-5'>
          <h1 className='text-2xl font-semibold'>Popular Categories</h1>
          <div className='my-5 flex flex-wrap gap-3'>
            {
              ["Blogging", "Web Development", "Digital Marketing", "Cooking", "Photography", "Sports"].map((item, index) => {
                return <Badge onClick={()=>navigate(`/search?q=${item}`)} key={index} className="cursor-pointer">{item}</Badge>
              })
            }
          </div>
          <h1 className='text-xl font-semibold '>Subscribe to Newsletter</h1>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>Get the latest posts and updates delivered straight to your inbox.</p>
                     <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto mt-5">
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            className="flex h-10 w-full rounded-md border bg-gray-200 dark:bg-gray-800 px-3 py-2 text-sm  text-gray-300"
                        />
                        <Button>Subscribe</Button>
                    </div>

                    <div className='mt-7'>
                      <h1 className='text-xl font-semibold mb-3'>Suggested Blogs</h1>
                      <ul className='space-y-3'>
                        {
                          [
                            '10 Tips to Master React',
                            'Understanding Tailwind CSS',
                            'Improve SEO in 2026'
                          ].map((title,index)=>(
                            <li key={index} className='text-sm dark:text-gray-100 hover:underline cursor-pointer'>
                              {title}
                              </li>
                          ))
                        }
                      </ul>
                    </div>
        </div>

      </div>
    </div>
  )
}

export default RecentBlogs
