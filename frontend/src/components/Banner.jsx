import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Banner = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 px-4 md:px-16 lg:px-24 py-12 md:py-20 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl mx-auto max-w-7xl">
      {/* Left Content */}
      <div className="flex-1 text-center lg:text-left">
        <div className="space-y-4">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
            Book Appointment
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            With 100+ <span className="text-blue-600">Trusted Doctors</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-md mx-auto lg:mx-0">
            Connect with verified healthcare professionals and get the care you deserve, when you need it most.
          </p>
        </div>
        
        <button className="mt-8 px-8 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
          Create Account
        </button>
      </div>

      {/* Right Image */}
      <div className="flex-1 mt-8 lg:mt-0">
        <img 
          src={assets.appointment_img} 
          alt="Appointment" 
          className="w-full max-w-md mx-auto lg:mx-0 rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
        />
      </div>
    </div>
  )
}

export default Banner