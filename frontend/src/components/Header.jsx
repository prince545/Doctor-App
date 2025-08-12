import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Header = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="w-full bg-[#5B5FEF] overflow-hidden">
      {/* Inner container for centered content */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-12 md:py-20">
        
        {/* Text Section */}
        <div
          className={`max-w-lg space-y-6 transition-all duration-700 ${
            isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Book Appointment <br />
            With <span className="text-yellow-300">Trusted Doctors</span>
          </h1>

          <p className="text-white/90 text-lg">
            Simply browse through our extensive list of trusted doctors and schedule your appointment hassle-free.
          </p>

          {/* Profiles */}
          <div className="flex items-center gap-4">
            <img
              src={assets.group_profiles}
              alt="Group Profiles"
              className="w-14 h-14 rounded-full border-2 border-white object-cover"
            />
            <p className="text-white/80">
              Join 50,000+ satisfied patients who trust our platform
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#speciality"
              className="px-6 py-3 bg-white text-[#5B5FEF] rounded-full font-semibold shadow-md hover:bg-gray-100 transition transform hover:scale-105"
            >
              Book appointment →
            </a>
            
          </div>
        </div>

        {/* Doctor Image Section */}
        <div
          className={`max-w-lg mt-10 md:mt-0 transition-all duration-700 ${
            isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}
        >
          <img
            src={assets.header_img}
            alt="Doctors"
            className="w-full object-contain drop-shadow-xl"
          />
        </div>
      </div>
    </div>
  )
}

export default Header
