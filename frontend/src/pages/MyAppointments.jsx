import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets_frontend/assets'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const MyAppointments = () => {
  const { appointments, removeAppointment } = useContext(AppContext)
  const navigate = useNavigate()

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      case 'completed':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleCancelAppointment = (appointmentId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      removeAppointment(appointmentId)
      toast.success('Appointment cancelled successfully')
    }
  }

  const handleReschedule = (appointment) => {
    navigate(`/appointment/${appointment.doctorId}`, {
      state: {
        reschedule: true,
        originalAppointmentId: appointment.id
      }
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Appointments</h1>
          <p className="text-gray-600">Manage your upcoming and past appointments</p>
        </div>

        {appointments.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments yet</h3>
            <p className="text-gray-500 mb-4">You haven't booked any appointments yet.</p>
            <button
              onClick={() => navigate('/doctors')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Find a Doctor
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {appointments.map((appointment) => {
              const appointmentDate = new Date(appointment.date)
              const isPastAppointment = appointmentDate < new Date()
              const status = isPastAppointment ? 'completed' : appointment.status

              return (
                <div key={appointment.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-start space-x-4">
                      <img 
                        src={appointment.doctorImage || assets.profile_pic} 
                        alt={appointment.doctorName}
                        className="w-16 h-16 rounded-full object-cover"
                        onError={(e) => {
                          e.target.src = assets.profile_pic
                        }}
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{appointment.doctorName}</h3>
                        <p className="text-sm text-gray-600">{appointment.doctorSpeciality}</p>
                        <div className="mt-2 space-y-1">
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Date:</span> {formatDate(appointment.date)}
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Time:</span> {appointment.time}
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Fee:</span> ${appointment.fees}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 sm:mt-0 flex flex-col items-start sm:items-end space-y-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </span>
                      
                      <div className="flex space-x-2">
                        {status === 'confirmed' && !isPastAppointment && (
                          <button
                            onClick={() => handleReschedule(appointment)}
                            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                          >
                            Reschedule
                          </button>
                        )}
                        {status !== 'cancelled' && status !== 'completed' && (
                          <button
                            onClick={() => handleCancelAppointment(appointment.id)}
                            className="text-sm text-red-600 hover:text-red-800 font-medium"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyAppointments