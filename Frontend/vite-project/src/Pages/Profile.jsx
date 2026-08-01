import React from 'react'
import axios from 'axios';
import { Card } from "../components/ui/card"
import UserLogo from "../assets/UserLogo.jpg"
import { Avatar, AvatarImage } from "../components/ui/avatar.jsx"
import { Link } from 'react-router-dom'
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { Label } from "../components/ui/label.jsx"
import { Button } from '../components/ui/button.jsx';
import { Input } from "../components/ui/input.jsx";
import { Textarea } from "../components/ui/textarea.jsx"
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react'
import { toast } from 'sonner'
import { setLoading, setUser } from '../redux/authSlice.js'
import { Loader2 } from 'lucide-react'
import TotalProperty from "../components/ui/TotalProperty.jsx"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


const Profile = () => {

  const [open, setOpen] = useState(false)
  const { user, loading } = useSelector(store => store.auth)
  const dispatch = useDispatch();



  const [input, setInput] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    occupation: user?.occupation,
    instagram: user?.instagram,
    linkedin: user?.linkedin,
    github: user?.github,
    facebook: user?.facebook,
    file: null

  })

  const changeEventHandle = (e) => {
    const { name, value } = e.target;
    setInput((prev) => (
      {
        ...prev,
        [name]: value
      }

    ))
  }


  const changeFileHandler = (e) => {
    const file = e.target.files[0];
    setInput({ ...input, file });
  };


  const submitHandler = async (e) => {
    e.preventDefault()
    //if you want send file or any data use formData
    const formData = new FormData();
    formData.append("firstName", input.firstName);
    formData.append("lastName", input.lastName);
    formData.append("bio", input.bio);
    formData.append("occupation", input.occupation);
    formData.append("facebook", input.facebook);
    formData.append("linkedin", input.linkedin);
    formData.append("instagram", input.instagram);
    formData.append("github", input.github);

    if (input?.file) {
      formData.append("file", input.file);

    }
    

    try {
      dispatch(setLoading(true));

      const res = await axios.put("https://full-stack-blogging-webapp.onrender.com/api/v1/user/profile/update", formData, {

        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true

      })

      if (res.data.success) {
        setOpen(false);
        toast.success(res.data.message)
        dispatch(setUser(res.data.user))
      }


    } catch (error) {
      console.log(error);


    }
    finally {
      dispatch(setLoading(false))
    }


  }

  return (
    <div className='pt-20 md:ml-[320px] md:h-screen'>
      <div className='max-w-6xl mx-auto mt-3'>
        <Card className="flex md:flex-row flex-col gap-10 p-6 md:p-10 dark:bg-gray-800 mx-4 md:mx-0">
          {/* image section  */}
          <div className='flex md:flex-col items-center justify-center md:w-[400px]'>
            <Avatar className="w-40 h-40 border-2">
              <AvatarImage src={user?.photoUrl || UserLogo} />
            </Avatar>
            <h1 className='text-center font-semibold text-xl text-gray-700 dark:text-gray-300 mt-4'>{user?.occupation || "Full Stack Developer "}</h1>
            <div className='flex gap-4 items-center mt-3 md:h'>
              <Link to={`${user?.facebook}`}><FaFacebook className='w-6 h-6 text-gray-700 dark:text-gray-300' /></Link>
              <Link to={`${user?.linkedin}`}><FaLinkedin className='w-6 h-6 text-gray-700 dark:text-gray-300' /></Link>
              <Link to={`${user?.github}`}><FaGithub className='w-6 h-6 text-gray-700 dark:text-gray-300' /></Link>
              <Link to={`${user?.instagram}`}><FaInstagram className='w-6 h-6 text-gray-700 dark:text-gray-300' /></Link>
            </div>

          </div>
          <div>
            {/*info section*/}
            <h1 className='font-bold text-center md:text-start text-4xl mb-7'>Welcome {user?.firstName || "User"} !</h1>
            <p><span className='font-semibold'>Email : </span>{user?.email}</p>
            <div className='flex flex-col gap-2 items-start justify-start my-5'>
              <Label>About Me</Label>
              <p className='  border dark:border-gray-600 p-6 rounded-lg'>{user?.bio || " Lorem ipsum dolor sit ameconsectetur, adi officia minima aut quisquam, temporibus a aliquid quo, repellat ducimus velit ea voluptate"}</p>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
              <form className=' dark:border-gray-600'>
                <DialogTrigger asChild>
                  <Button>Edit Profile</Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-center">Edit profile</DialogTitle>
                    <DialogDescription className="text-center">
                      Make changes to your profile here. Click save when you&apos;re
                      done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-2 py-4">
                    <div className='flex gap-2 '>
                      <div className="grid gap-3" >
                        <Label htmlFor="name-1" className="text-right mb-1">First Name</Label>
                        <Input id="name-1" name="firstName" placeholder="Enter FirstName" className="col-span-3 text-gray-500" value={input.firstName} onChange={changeEventHandle} />

                      </div>

                      <div className="grid gap-3">
                        <Label htmlFor="username-1" className="text-right mb-1">Last Name</Label>
                        <Input id="name-1" name="lastName" placeholder="Enter LastName" type="text" className="col-span-3 text-gray-500" value={input.lastName} onChange={changeEventHandle} />
                      </div>

                    </div>
                    
                      <div className="grid gap-3" >
                        <Label htmlFor="name-1" >Occupation</Label>
                        <Input id="name-1" name="occupation" placeholder="Enter occupation" className="col-span-3 text-gray-500" value={input.occupation} onChange={changeEventHandle} />

                      </div>
                  </div>

                  <div className="grid gap-3 py-4">
                    <div className='flex gap-2'>

                      <div className="grid gap-3" >
                        <Label htmlFor="name-1" className="text-right mb-1">Facebook</Label>
                        <Input id="name-1" name="facebook" placeholder="Enter Url" className="col-span-3 text-gray-500" value={input.facebook} onChange={changeEventHandle} />

                      </div>

                      <div className="grid gap-3">
                        <Label htmlFor="username-1" className="text-right mb-1">Instagram</Label>
                        <Input id="name-1" name="instagram" placeholder="Enter Url" type="text" className="col-span-3 text-gray-500" value={input.instagram} onChange={changeEventHandle} />
                      </div>
                    </div>
                 
                  <div className="grid gap-3 py-4">
                    <div className='flex gap-2'>

                      <div className="grid gap-3" >
                        <Label htmlFor="name-1" className="text-right mb-1">Linkedin</Label>
                        <Input id="linkedin" name="linkedin" placeholder="Enter Url" className="col-span-3 text-gray-500" value={input.linkedin} onChange={changeEventHandle} />

                      </div>

                      <div className="grid gap-3">
                        <Label htmlFor="name-1" className="text-right mb-1">GitHub</Label>
                        <Input id="github" name="github" placeholder="Enter Url" className="col-span-3 text-gray-500" value={input.github} onChange={changeEventHandle} />
                      </div>
                    </div>
                     </div>
                    <div>
                      <Label className="text-right mb-1">Description</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        value={input.bio}
                        onChange={changeEventHandle}
                      />

                    </div>

                    <div>
                      <Label className="text-right mb-1">Picture</Label>
                      <Input
                        id="file"
                        type="file"
                        accept="image/*"
                        className="w-[277px]"
                        onChange={changeFileHandler}
                      />

                    </div>

                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" onClick={submitHandler}
                    >

                      {
                        loading ? (<>
                          <Loader2 className='mr-2 w-4 h-4 animate-spin' />
                          Please await
                        </>) : ("Save changes")
                      }
                    </Button>

                  </DialogFooter>
                </DialogContent>
              </form>
            </Dialog>
          </div>
        </Card>
      </div>
      <TotalProperty/>
    </div>
  )
}

export default Profile
