import React from 'react'
import { Button } from '../components/ui/button'
import { Link } from "react-router-dom"
import HeroImg from "../assets/Heroimg.png"

const Hero = () => {
  return (
    <div className="pt-24 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center h-[600px] px-4">

        {/* TEXT SECTION */}
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900 dark:text-white">
            Explore the Latest Tech & Web Trends
          </h1>

          <p className="text-lg md:text-xl mb-6 text-gray-700 dark:text-gray-300">
            Stay ahead with in-depth articles and insights on web development,
            digital marketing, and tech innovations.
          </p>

          <div className="flex space-x-5">
            <Link to={"/dashboard/write"}>
              <Button className="text-lg cursor-pointer">
                Get Started
              </Button>
            </Link>

            <Link to={"/about"}>
              <Button
                variant="outline"
                className="px-5 py-4 text-lg border-gray-800 text-gray-800 dark:border-gray-300 dark:text-gray-300"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>

        {/* IMAGE SECTION */}
        <div className="flex items-center justify-center mt-10 md:mt-0 relative">
          <img
            src={HeroImg}
            alt="Hero"
            className="md:h-[550px] md:w-[550px] dark:brightness-90"
          />
        </div>

      </div>
    </div>
  )
}

export default Hero
