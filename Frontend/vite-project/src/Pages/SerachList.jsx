import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import store from '../redux/store'
import BlogCard from './BlogCard'



const SerachList = () => {
    const location=useLocation()
    const params=new URLSearchParams(location.search)
    const query=params.get('q')
    const {blog}=useSelector(store=>store.blog)


    
 // normalize query once
  const lowerQuery = query.toLowerCase();

  const filteredBlogs = blog.filter(
    (blog) =>
      blog.title.toLowerCase().includes(lowerQuery) ||
      blog.subtitle.toLowerCase().includes(lowerQuery) ||
      blog.category.toLowerCase() === lowerQuery
  );




    useEffect(()=>{
        window.scrollTo(0,0)
    },[])
  return (
    <div className='pt-32'>
        <div className='max-w-6xl mx-auto'>
            <h2>Search results for : "{query}"</h2>
            <div className='grid grid-cols-3 gap-7 my-10'>
                {
                    filteredBlogs.map((blog,index)=>{
                        return <BlogCard key={index} blog={blog}/>
                    })
                }
            </div>
        </div>
      
    </div>
  )
}

export default SerachList;
