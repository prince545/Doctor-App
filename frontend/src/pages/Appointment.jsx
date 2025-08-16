import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets_frontend/assets'
import 'react-toastify/dist/ReactToastify.css'

const Appointment = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { doctors, user, addAppointment, updateAppointment, removeAppointment } = useContext(AppContext)
  
  const [doctorInfo, setDoctorInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [isBooking, setIsBooking] = useState(false)
  const [isRescheduling, setIsRescheduling] = useState(false)
  const [originalAppointmentId, setOriginalAppointmentId] = useState(null)

  useEffect(() => {
    if (location.state?.reschedule) {
      setIsRescheduling(true)
      setOriginalAppointmentId(location.state.originalAppointmentId)
    }
  }, [location.state])

  const generateTimeSlots = () => {
    const slots = []
    const startHour = 9 // 9 AM
    const endHour = 17 // 5 PM
    
    for (let hour = startHour; hour < endHour; hour++) {
      const morningAvailability = hour < 12 ? Math.random() > 0.2 : Math.random() > 0.4
      
      slots.push(
        {
          time: `${hour}:00 - ${hour}:30`,
          available: morningAvailability && Math.random() > 0.3
        },
        {
          time: `${hour}:30 - ${hour + 1}:00`,
          available: morningAvailability && Math.random() > 0.4
        }
      )
    }
    return slots
  }

  const generateWeekdays = () => {
    const days = []
    const today = new Date()
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      
      if (date.getDay() === 0 || date.getDay() === 6) continue
      
      days.push({
        date: date,
        formattedDate: date.toLocaleDateString('en-US', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric' 
        }),
        timeSlots: generateTimeSlots(),
        isToday: i === 0
      })
    }
    
    return days.slice(0, 5)
  }

  const [weekdays, setWeekdays] = useState(generateWeekdays())

  const fetchDocInfo = () => {
    if (doctors && Array.isArray(doctors)) {
      const docInfo = doctors.find(doc => doc && doc._id === id)
      if (docInfo) {
        setDoctorInfo(docInfo)
      } else {
        setDoctorInfo(null)
      }
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

  const handleBookAppointment = () => {
    if (!user) {
      toast.info('Please login to book an appointment')
      navigate('/login', { state: { from: `/appointment/${id}` } })
      return
    }

    setIsBooking(true)

    const appointment = {
      id: Date.now().toString(),
      doctorId: doctorInfo._id,
      doctorName: doctorInfo.name,
      doctorImage: doctorInfo.image,
      doctorSpeciality: doctorInfo.speciality,
      date: selectedDate.date,
      formattedDate: selectedDate.formattedDate,
      time: selectedSlot,
      fees: doctorInfo.fees,
      status: 'confirmed',
      bookedAt: new Date().toISOString()
    }

    setTimeout(() => {
      if (isRescheduling) {
        removeAppointment(originalAppointmentId)
        addAppointment(appointment)
        toast.success('Appointment rescheduled successfully!')
      } else {
        addAppointment(appointment)
        toast.success('Appointment booked successfully!')
      }

      setIsBooking(false)
      // Show toast and redirect to My Appointments
      navigate('/my-appointments')
    }, 1500)
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`full-${i}`} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )
    }
    
    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-5 h-5 fill-current" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half-star" x1="0" x2="100%" y1="0" y2="0">
              <stop offset="50%" stopColor="#FBBF24" />
              <stop offset="50%" stopColor="#D1D5DB" />
            </linearGradient>
          </defs>
          <path fill="url(#half-star)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )
    }
    
    const emptyStars = 5 - stars.length
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-5 h-5 text-gray-300 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )
    }
    
    return stars
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    )
  }

  if (!doctorInfo) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <h2 className="text-2xl font-bold mb-2">Doctor Not Found</h2>
        <p className="mb-4 text-center">The requested doctor information could not be loaded.</p>
        <button
          onClick={() => navigate('/doctors')}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Back to Doctors
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {isRescheduling && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  You are rescheduling an existing appointment. Your original appointment will be cancelled once you confirm the new one.
                </p>
              </div>
            </div>
          </div>
        )}
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
          {/* Doctor Profile Header */}
          <div className="md:flex">
            <div className="md:w-1/3 h-64 md:h-auto relative overflow-hidden">
              <img 
                src={doctorInfo.image || assets.profile_pic}
                alt={doctorInfo.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                onError={(e) => {
                  e.target.src = assets.profile_pic
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  <p className="text-xs font-medium text-white">Available Today</p>
                </div>
              </div>
            </div>

            <div className="md:w-2/3 p-6 md:p-8">
              <div className="flex flex-wrap items-start justify-between mb-4">
                <div className="flex items-start">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mr-2">{doctorInfo.name}</h1>
                  <img 
                    src={assets.verified_icon} 
                    alt="Verified" 
                    className="w-5 h-5 mt-1"
                  />
                </div>
              </div>

              <p className="text-lg text-blue-600 font-medium mb-2">{doctorInfo.speciality}</p>
              <p className="text-gray-600 mb-4">{doctorInfo.degree} • {doctorInfo.experience} years experience</p>

              <div className="flex items-center mb-6">
                <div className="flex">
                  {renderStars(doctorInfo.rating || 4.5)}
                </div>
                <span className="text-sm text-gray-500 ml-2">({doctorInfo.reviews || 128} reviews)</span>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">About Dr. {doctorInfo.name.split(' ')[1]}</h3>
                <p className="text-gray-600 leading-relaxed">{doctorInfo.about}</p>
              </div>
            </div>
          </div>

          {/* Appointment Scheduling Section */}
          <div className="border-t border-gray-200 p-6 md:p-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              {isRescheduling ? 'Reschedule Appointment' : 'Schedule Appointment'}
            </h3>
            
            <div className="mb-8">
              <h4 className="text-md font-medium text-gray-700 mb-4">Select a day</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {weekdays.map((day, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedDate(day)
                      setSelectedSlot(null)
                    }}
                    className={`p-3 rounded-lg border transition-colors flex flex-col items-center ${
                      selectedDate?.date.getTime() === day.date.getTime()
                        ? 'border-blue-500 bg-blue-50 text-blue-600'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    {day.isToday && (
                      <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full mb-1">
                        Today
                      </span>
                    )}
                    <div className="font-medium">{day.formattedDate.split(',')[0]}</div>
                    <div className="text-sm text-gray-500">{day.formattedDate.split(',')[1]}</div>
                  </button>
                ))}
              </div>
            </div>

            {selectedDate && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-md font-medium text-gray-700">Available time slots</h4>
                  <div className="text-sm text-gray-500">
                    Consultation fee: ${doctorInfo.fees}
                  </div>
                </div>
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
                      {!slot.available && (
                        <span className="block text-xs mt-1">Booked</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selectedDate && selectedSlot && (
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-blue-800 mb-2">Appointment Summary</h4>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    <span className="font-medium">Date:</span> {selectedDate.formattedDate}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Time:</span> {selectedSlot}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Fee:</span> ${doctorInfo.fees}
                  </p>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleBookAppointment}
                disabled={!selectedDate || !selectedSlot || isBooking}
                className={`px-6 py-3 rounded-lg font-medium transition-colors flex-1 flex items-center justify-center ${
                  selectedDate && selectedSlot
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isBooking ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {isRescheduling ? 'Rescheduling...' : 'Booking...'}
                  </>
                ) : (
                  isRescheduling ? 'Confirm Reschedule' : 'Confirm Appointment'
                )}
              </button>
              <button 
                onClick={() => window.location.href = `tel:${doctorInfo.phone || '+1234567890'}`}
                className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors flex-1 flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Contact Office
              </button>
            </div>
          </div>

          <div className="border-t border-gray-200 p-6 md:p-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Services Offered</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(doctorInfo.services || ['General Consultation', 'Follow-up Visits', 'Health Screening', 'Treatment Plans']).map((service, index) => (
                <div key={index} className="flex items-center bg-blue-50/50 rounded-lg p-3">
                  <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{service}</span>
                </div>
              ))}
            </div>
          </div>

          {doctorInfo.address && (
            <div className="border-t border-gray-200 p-6 md:p-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Location</h3>
              <div className="bg-gray-100 rounded-lg p-4">
                <p className="text-gray-700 mb-2">{doctorInfo.address.line1}</p>
                <p className="text-gray-700 mb-4">{doctorInfo.address.line2}</p>
                <a 
                  href={doctorInfo.address.mapLink || 'https://maps.google.com'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800"
                >
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  View on Map
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Appointment