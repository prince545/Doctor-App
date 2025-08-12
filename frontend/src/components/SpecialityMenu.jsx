import React from 'react'
import { Link } from 'react-router-dom'
import { specialityData } from '../assets/assets_frontend/assets'

const SpecialityMenu = () => {
  return (
    <div id="speciality" className="py-12 px-6 md:px-12 bg-gray-50">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-4">
        Find Your Speciality
      </h1>
      <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
        Browse through our list of specialities to find the right doctor for your needs.
      </p>

      {/* Speciality List */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {specialityData.map((item, index) => (
          <Link
            to={`/doctors/${item.speciality}`}
            key={index}
            className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <img
              src={item.image}
              alt={`${item.speciality} icon`}
              className="w-20 h-20 object-contain mb-3"
            />
            <h2 className="text-lg font-semibold text-gray-700">{item.speciality}</h2>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SpecialityMenu
