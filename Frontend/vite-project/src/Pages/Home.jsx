import React from 'react'

import { Link } from "react-router-dom"
import Hero from './Hero.jsx';
import RecentBlogs from './RecentBlogs.jsx';
import PopularAuthors from "./PopularAuthors.jsx"

const Home = () => {
  return (
    <>
      <div className='pt-15 '>
        <Hero />
        <RecentBlogs />
        <PopularAuthors />
       
    
      </div>
    </>
  )
}

export default Home
