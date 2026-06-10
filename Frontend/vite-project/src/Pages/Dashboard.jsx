import React from 'react'
import { Outlet } from 'react-router-dom'
import Slidebar from "../components/ui/SideBar.jsx"

const Dashboard = () => {
  return (
    <div className='flex min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white'>
      <Slidebar/>
      <div className='flex-1 '>
        <Outlet/> 
      </div>
    </div>
  )
}

export default Dashboard
