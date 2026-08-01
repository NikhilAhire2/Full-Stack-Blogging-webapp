import React, { useRef, useState } from 'react'
//import { Button } from '../components/ui/Button'
import {Button} from "../components/ui/button.jsx";
import { Label } from '@radix-ui/react-label'
import { Input } from '../components/ui/input'
import { Card } from "../components/ui/card"
import JoditEditor from 'jodit-react';
import { Loader2 } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import store from '../redux/store'
import axios from 'axios'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from 'sonner'
import { setBlog } from '@/redux/blogSlice'


const UpdateBlog = () => {


  const [loading, setLoading] = useState(false)
  const [publish, setPublish] = useState(false)



  const params = useParams()
  const id = params.id;
  const { blog } = useSelector(store => store.blog)


  // const selectBlog = blog.find(blog => blog._id === id)
  const selectBlog = Array.isArray(blog) ? blog.find(b => b._id === id) : blog;

  // const[content,setcontent]=useState(selectBlog.description)


  //?. is used when data comes async (API / Redux)
  //his code copies blog data from Redux into local state so the edit form shows old values safely without crashing.
  // const [blogData,setBlogData]=useState({
  //   title:selectBlog?.title,
  //   subtitle:selectBlog?.subtitle,
  //   description:selectBlog?.description,
  //   category:selectBlog?.category
  // })//This state holds editable form data

  // Local state
  const [blogData, setBlogData] = useState({
    title: selectBlog?.title || "",
    subtitle: selectBlog?.subtitle || "",
    description: selectBlog?.description || "",
    category: selectBlog?.category || "",
    thumbnail: selectBlog?.thumbnail || null
  });





  // const [previewThumbanail,setpreviewThumbnail]=useState(selectBlog?.thumbnail)

  const [previewThumbanail, setpreviewThumbnail] = useState(selectBlog?.thumbnail);

  //👉 Used to show image preview before upload
  //const handleChange=(e)=>{

  // One function handles all inputs
  // ✔ Updates only the changed field
  // ✔ Keeps rest of data safe

  //   const {name,value}= e.target;

  //   selectBlog((prev)=>({
  //     ...prev,
  //     [name]:value
  //   }))
  // }


  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData(prev => ({ ...prev, [name]: value }));
  };


  const selectCategory = (value) => {
    setBlogData(prev => ({ ...prev, category: value }));
  };



  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setBlogData(prev => ({ ...prev, thumbnail: file }));



      // What’s really happening
      // - Conversion: Binary → Base64 → Data URL.
      // - Storage: React state holds the data URL string.
      // - Rendering: Browser <img> interprets the data URL as if it were a normal image file.





      const fileReader = new FileReader();//	This is a built‑in browser API that can read files into memory.

      fileReader.onloadend = () => {
        setpreviewThumbnail(fileReader.result); // ✅ result is the base64 string
      };
      fileReader.readAsDataURL(file); // Conversion: Binary → Base64 → Data URL.
    }
  };


  const UpdateBlogHandler = async () => {
    const formData = new FormData()
    formData.append("title", blogData.title)
    formData.append("subtitle", blogData.subtitle);
    formData.append("description", blogData.description)
    formData.append("category", blogData.category)
    formData.append("file", blogData.thumbnail)
    try {
      setLoading(true)
      const res = await axios.put(`https://full-stack-blogging-webapp.onrender.com/blog/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true

      })
      if (res.data.success) {
        toast.success(res.data.message)
        console.log(blogData);

      }

    } catch (error) {
      console.log(error);



    } finally {
      setLoading(false)
    }

  }


  const navigate = useNavigate()

  const editor = useRef();


  
  const togglePublishUnpublished=async ()=>{
    try {
      const res=await axios.patch(`https://full-stack-blogging-webapp.onrender.com/blog/${id}`,
        {},{

          withCredentials:true

      }
    );
      if(res.data.success){
        setPublish(!publish)
        toast.success(res.data.message)
        navigate("/dashboard/your-blogs")
      }else{
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error("failed to updated")
      
    }
  }
const deleteBlog=async ()=>{
  try {
    const res=await axios.delete("https://full-stack-blogging-webapp.onrender.com/blog/delete/${id}",{withCredentials:true})
const UpdatedBlogData=blog.filter((blogItem)=>blogItem?._id!==id)
dispatch(selectBlog(UpdatedBlogData));

toast.success(res.data.message);
navigate('/dashboard/your-blog')
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong")
    
  }
}
  return (


    <div className='md:ml-[320px] pt-15 px-3 pb-10'>
      <div className='max-w-6xl m-auto mt-8'>
        <Card className="w-full bg-white dark:bg-gray-800 p-5 space-y-2">
          <h1 className='text-4xl font-bold'>Basic Blog Information</h1>
          <p>Make Changes to Your blogs here . Click publish when you are done</p>
          <div className='space-x-2'>
            <Button onClick={()=>togglePublishUnpublished(selectBlog.isPublished ? "false":"true")}>

              {
                selectBlog?.isPublished? "UnPublish" : "Publish"
              }
            </Button>
            <Button onClick={deleteBlog} variant="destructive">Remove Blog</Button>

          </div>
          <div className="pt-5">
            <Label>Title</Label>
            <Input type="text"
              placeholder="Enter a title"
              name="title"
              value={blogData.title}
              onChange={handleChange}
              className="dark:border-gray-300" />
          </div>

          <div className="pt-5">
            <Label>Subtitle</Label>
            <Input type="text"
              placeholder="Enter a Subtitle"
              name="subtitle"
              value={blogData.subtitle}
              onChange={handleChange}
              className="dark:border-gray-300" />
          </div>
          <div>
            <JoditEditor
              ref={editor}
              className="jodit_toolbar dark:text-black"
              value={blogData.description}
              onChange={(newContent) =>
                setBlogData(prev => ({
                  ...prev,
                  description: newContent
                }))
              }
            />


          </div>
          <div>
            <Label className='mb-1'>Category</Label>
            <Select onValueChange={selectCategory} className="dark:border-gray-400">
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
          <div>
            <Label>Thumbnail</Label>
            <Input type="file"
              id="file"
              accept="image/*"
              onChange={selectThumbnail}
              className="w-fit dark:border-gray-300" />
            {
              previewThumbanail && (
                <img src={previewThumbanail} className='w-64 my-2' alt='Blog-Thumbnail' />
              )
            }
          </div>
          <div className='flex gap-3'>
            <Button variant="outline" onClick={() => navigate(-1)} >Back</Button>
            <Button onClick={UpdateBlogHandler}>

              {
                loading ? (<>
                  <Loader2 className='mr-2 w-4 h-4 animate-spin' />
                  Please await
                </>) : ("Save")
              }
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default UpdateBlog
