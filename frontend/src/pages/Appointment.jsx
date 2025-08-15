import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets_frontend/assets'

const Appointment = () => {
  const { id } = useParams()
  const { doctors } = useContext(AppContext)
  const [doctorInfo, setDoctorInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedSlot, setSelectedSlot] = useState(null)

  // Generate time slots from 9 AM to 5 PM with 30-minute intervals
const generateTimeSlots = () => {
  const slots = []
  const startHour = 9 // 9 AM
  const endHour = 17 // 5 PM
  
  for (let hour = startHour; hour < endHour; hour++) {
    slots.push({
      time: `${hour}:00 - ${hour + 1}:00`, // 1-hour slots
      available: Math.random() > 0.3 // 70% chance of being available
    })
  }
  return slots
}

  // Generate weekdays (Monday to Friday)
  const generateWeekdays = () => {
    const days = []
    const today = new Date()
    
    // Find next Monday
    let nextDay = new Date(today)
    nextDay.setDate(today.getDate() + ((1 + 7 - today.getDay()) % 7))
    
    for (let i = 0; i < 5; i++) {
      const date = new Date(nextDay)
      date.setDate(nextDay.getDate() + i)
      
      days.push({
        date: date,
        formattedDate: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
        timeSlots: generateTimeSlots()
      })
    }
    
    return days
  }

  const [weekdays, setWeekdays] = useState(generateWeekdays())

  const fetchDocInfo = () => {
    if (doctors && Array.isArray(doctors)) {
      const docInfo = doctors.find(doc => doc && doc._id === id)
      setDoctorInfo(docInfo || null)
    } else {
      setDoctorInfo(null)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (doctors !== undefined) {
      fetchDocInfo()
    }
  }, [id, doctors])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    )
  }

  if (!doctorInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center bg-white p-8 rounded-xl shadow-md max-w-md w-full animate-fade-in">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Doctor Not Found</h2>
          <p className="text-gray-600 mb-6">The requested doctor information could not be loaded.</p>
          <button 
            onClick={() => window.history.back()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
          {/* Doctor Profile Header */}
          <div className="md:flex">
            {/* Doctor Image */}
            <div className="md:w-1/3 h-64 md:h-auto relative overflow-hidden">
              <img 
                src={doctorInfo.image || 'https://via.placeholder.com/400x300?text=Doctor+Image'}
                alt={doctorInfo.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x300?text=Doctor+Image'
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  <p className="text-xs font-medium text-white">Available Today</p>
                </div>
              </div>
            </div>

            {/* Doctor Information */}
            <div className="md:w-2/3 p-6 md:p-8">
              <div className="flex items-start mb-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mr-2">{doctorInfo.name}</h1>
                <img 
                  src={assets.verified_icon} 
                  alt="Verified" 
                  className="w-5 h-5 mt-1"
                />
              </div>

              <p className="text-lg text-blue-600 font-medium mb-2">{doctorInfo.speciality}</p>
              <p className="text-gray-600 mb-4">{doctorInfo.degree} • {doctorInfo.experience} years experience</p>

              {/* Rating */}
              <div className="flex items-center mb-6">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-500 ml-2">(128 reviews)</span>
              </div>

              {/* About Doctor */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">About Dr. {doctorInfo.name.split(' ')[0]}</h3>
                <p className="text-gray-600 leading-relaxed">{doctorInfo.about}</p>
              </div>
            </div>
          </div>

          {/* Appointment Scheduling Section */}
          <div className="border-t border-gray-200 p-6 md:p-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Schedule Appointment</h3>
            
            {/* Date Selection */}
            <div className="mb-8">
              <h4 className="text-md font-medium text-gray-700 mb-4">Select a day</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {weekdays.map((day, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedDate(day)}
                    className={`p-3 rounded-lg border transition-colors ${
                      selectedDate?.date.getTime() === day.date.getTime()
                        ? 'border-blue-500 bg-blue-50 text-blue-600'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="font-medium">{day.formattedDate.split(',')[0]}</div>
                    <div className="text-sm text-gray-500">{day.formattedDate.split(',')[1]}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slot Selection */}
            {selectedDate && (
              <div className="mb-8">
                <h4 className="text-md font-medium text-gray-700 mb-4">Available time slots</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {selectedDate.timeSlots.map((slot, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedSlot(slot.time)}
                      disabled={!slot.available}
                      className={`p-3 rounded-lg border transition-colors ${
                        !slot.available
                          ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                          : selectedSlot === slot.time
                            ? 'border-blue-500 bg-blue-50 text-blue-600'
                            : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Appointment Summary */}
            {selectedDate && selectedSlot && (
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-blue-800 mb-2">Your Appointment</h4>
                <p className="text-gray-700">
                  <span className="font-medium">{selectedDate.formattedDate}</span> at <span className="font-medium">{selectedSlot}</span>
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                className={`px-6 py-3 rounded-lg font-medium transition-colors flex-1 ${
                  selectedDate && selectedSlot
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!selectedDate || !selectedSlot}
              >
                Confirm Appointment
              </button>
              <button className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors flex-1">
                Contact Office
              </button>
            </div>
          </div>

          {/* Additional Sections */}
          <div className="border-t border-gray-200 p-6 md:p-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Services Offered</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {['General Consultation', 'Follow-up Visits', 'Health Screening', 'Treatment Plans'].map((service, index) => (
                <div key={index} className="flex items-center bg-blue-50/50 rounded-lg p-3">
                  <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Appointment