import React from 'react'
import Home from './Pages/Home'
import About from './Pages/About'
import Blogs from './Pages/Blogs'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Navbar from './Pages/Navbar'
import Dashboard from './Pages/Dashboard'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Profile from './Pages/Profile'
import YourBlog from './Pages/YourBlog'
import CreateBlog from './Pages/CreateBlog'
import Comments from './Pages/Comments'
import UpdateBlog from './Pages/UpdateBlog'
import BlogsView from './Pages/BlogsView'
import Footer from "./Pages/Footer"
import SerachList from './Pages/SerachList'

const router=createBrowserRouter([
  {
    path:"/",
    element:<><Navbar/> <Home/> <Footer/></>

  },
  {
    path:"/about",
    element:<><Navbar/> <About/> <Footer/></>
  },
  {
    path:"/blogs",
    element:<><Navbar/> <Blogs/><Footer/></>


  }, 
  {
    path:"/login",
    element:<><Navbar/> <Login/><Footer/></>
  },
  {
    path:"/signup",
    element:<><Navbar/> <Signup/><Footer/></>
  },

  {
    path:"/blogs/:id",
    element:<><Navbar/><BlogsView/><Footer/></>
  },
  {
    path: "/search",
    element: <><Navbar/><SerachList/><Footer/></>
  },
  {
    path:"/dashboard",
    element:<><Navbar/><Dashboard/></>,

    children:[
      {
      path:"profile",
      element:<><Profile/></>
    },
     {
      path:"your-blogs",
      element:<><YourBlog/></>
    },

    {
      path:"write-blog/:id",
      element:<UpdateBlog/>
    },
     {
      path:"comments",
      element:<><Comments/></>
    },
     {
      path:"write",
      element:<><CreateBlog/></>
    },
  
  ]
  }

])
const App = () => {
  return (
   <>
 <RouterProvider router={router}/>
   
   </>
  )
}

export default App
