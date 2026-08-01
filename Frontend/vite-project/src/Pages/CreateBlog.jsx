import React, { useState } from 'react'
import { Card } from '../components/ui/card'
import { Label } from '@radix-ui/react-label'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import axios from 'axios'
import store from '../redux/store'
import { setBlog } from '../redux/blogSlice'
import { setLoading } from '../redux/authSlice'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

const CreateBlog = () => {

  const [title ,setTitel]=useState("")
  const[category,setCategory]=useState("");
  const dispatch=useDispatch();
  const navigate=useNavigate();
const {blog,loading}=useSelector(store=>store.blog)
const getSelectedCategory=(value)=>{
  setCategory(value);
}
const createBlogHandler=async()=>{
  try {

    const res=await axios.post("https://full-stack-blogging-webapp.onrender.com/api/v1/blog/",{title,category},{
      headers:{
        "Content-Type":"application/json"
      },
      withCredentials:true
    })
    
    if(res.data.success){
      dispatch(setBlog(res.data.blog))
      navigate(`/dashboard/write-blog/${res.data.blog._id}`) 
      toast.success(res.data.message) 
    }
    else{
      toast.error("Something went Wrong")
    }
  } catch (error) {
    console.log(error);
    
  }
  finally{
    dispatch(setLoading(false))
  }
}

  return (


    <div className='p-4 md:pr-20 h-screen md:ml-[320px] pt-40'>
      <Card className="md:p-10 p-4 dark:bg-gray-800 ">
        <h1 className='text-2xl font-bold'>Let's Create Blog</h1>
        <p className='mt-3'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit fuga quam maiores veritatis, dolor nemo ullam. Ratione commodi quis dicta ipsum nobis in velit, fugit omnis dolorum. Quia, unde magni.</p>
        <div className='mt-10'>
          <div>
            <Label>Title</Label>
            <Input type="text" placeholder="Your blog name" value={title} onChange={(e)=>setTitel(e.target.value)} className="bg-white dark:bg-gray-700 mt-3"  />
            <div className='mt-5'>
              <Label>Category</Label>
              <Select onValueChange={getSelectedCategory}>
                <SelectTrigger className="w-[180px] mt-3">
                  <SelectValue placeholder="Select a Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    <SelectItem value="Web development">Web development</SelectItem>
                    <SelectItem value="Digital Marketing">Digital Marketing</SelectItem>
                    <SelectItem value="Bloging">Bloging</SelectItem>
                    <SelectItem value="Photography">Photography</SelectItem>
                    <SelectItem value="Cooking">Cooking</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
           
          </div>
          
        </div>
         <Button className="mt-5" type="submit" onClick={createBlogHandler}>
          {
                        loading ? (<>
                          <Loader2 className='mr-2 w-4 h-4 animate-spin' />
                          Please await
                          
                        </>) : ("Create")
                      }
         </Button>
      </Card>
    </div>
  )
}

export default CreateBlog
