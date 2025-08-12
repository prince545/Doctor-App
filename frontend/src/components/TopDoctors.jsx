import React from 'react'
import { useNavigate } from 'react-router-dom'

import { AppContext } from '../context/AppContext.jsx'
const TopDoctors = () => {

   const navigate = useNavigate();
  const { doctors } = React.useContext(AppContext);
  return (
    <div className="py-12 px-6 md:px-12 bg-white">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
        Top Doctors
      </h2>
      <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
        Meet some of the top-rated doctors available on our platform.
      </p>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {doctors.slice(0, 10).map((item, index) => (
          <div onClick = {() => navigate(`/appointment/${item._id}`)}
            key={index}
            className="bg-white border border-gray-200 rounded-xl shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-blue-500"
          >
            <div className="overflow-hidden rounded-t-xl">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <p className="text-sm text-green-600 font-medium">Available</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.speciality}</p>
              </div>
              <div className="mt-4">
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200">
                  Book Appointment
                </button>
              </div>
              
            </div>
            

          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <button onClick={() => navigate('/doctors')} className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200">
          View All Doctors
        </button>
      </div>
    </div>
  )
}

export default TopDoctors

