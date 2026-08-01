import React, { useState } from 'react'
import auth from "../assets/auth.jpg"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.jsx"
import { Input } from '../components/ui/input.jsx'
import { Label } from "../components/ui/label.jsx"
import { Button } from '../components/ui/button.jsx'
import { Link } from 'react-router-dom'
import axios from "axios"
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { setLoading, setUser } from '../redux/authSlice.js'
import store from '../redux/store.js'
import { Loader2 } from 'lucide-react'
const Login = () => {
  const {loading}=useSelector(store=>store.auth)
  const dispatch = useDispatch();

  const Navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: ""
  })
  const handleChange = (e) => {
    const { name, value } = e.target
    setInput((prev) => ({
      ...prev,
      [name]: value
    }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(input);

    try {
      dispatch(setLoading(true))
      const res = await axios.post("https://full-stack-blogging-webapp.onrender.com/api/v1/user/login", input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      })
      if (res.data.success) {
        Navigate("/")
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        Navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Login failed ! check internet connetion !"
      );
    }
    finally{
      dispatch(setLoading(false))
    }


  }



  return (




    <div className='flex pt-15 h-screen md:px-10 md:h-[760px] bg-gray-200'>

      <div className='hidden md:block'>
        <img src={auth} alt="" className='h-[700px] -ml-10' />

      </div>
      <div className='flex justify-center items-center flex-1 px-4 md:px-0'>


        <Card className="w-full max-w-md p-6 shadow-lg rounded-2xl dark:bg-gray-800 dark:border-gray-600">
          <CardHeader>
            <CardTitle>
              <h1 className='text-center text-xl font-semibold'>Login Account</h1>
            </CardTitle>
            <p className='mt-2 text-sm font-serif text-center dark:text-gray-300'>Enter your Email and Password</p>
          </CardHeader>
          <CardContent>
            <form className='space-y-4' onSubmit={handleSubmit}>

              <div>
                <Label>Email</Label>
                <Input type="email" placeholder="yash.bendre@example.com"

                  name="email"
                  className="dark:border-gray-600 dark:bg-gray-900"
                  value={input.email}
                  onChange={handleChange}
                />
              </div>
              <div className='relative'>
                <Label>Password</Label>
                <Input
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  className="dark:border-gray-600 dark:bg-gray-900"
                  value={input.password}
                  onChange={handleChange}
                />
              </div>
              <Button type="submit" className="w-full cursor-pointer">

                {
                  loading ? (<>
                  <Loader2 className='mr-2 w-4 h-4 animate-spin'/>
                  Please await
                  </>):("Login")
                }
              </Button>
              <p className='text-center text-gray-600 dark:text-gray-300'>dont't have an account <Link to={"/signup"}><span className='underline cursor-pointer hover:text-gray-800 dark:hover:text-gray-100'>SignUp</span></Link></p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Login
