import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Doctors = () => {
  const { speciality } = useParams();
  const { doctors } = React.useContext(AppContext);
  const [filteredDoctors, setFilteredDoctors] = React.useState([]);
  const navigate = useNavigate();

  const applyFilter = (spec) => {
    if (spec) {
      setFilteredDoctors(
        doctors.filter(doc => doc.speciality.toLowerCase() === spec.toLowerCase())
      );
    } else {
      setFilteredDoctors(doctors);
    }
  };

  React.useEffect(() => {
    applyFilter(speciality);
  }, [speciality, doctors]);

  const specialties = [
    'General physician',
    'Gynecologist',
    'Dermatologist',
    'Pediatricians',
    'Neurologist'
    
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full px-4 sm:px-6 lg:px-12 py-8">
        {/* Title */}
        <br />
        <br />
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Browse Doctors</h1>
          <p className="text-lg text-gray-600">Find the perfect specialist for your needs</p>
        </div>

        {/* Filter Section */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {specialties.map((spec) => (
              <button
                key={spec}
                onClick={() => applyFilter(spec)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  speciality?.toLowerCase() === spec.toLowerCase()
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {spec}
              </button>
            ))}
            <button
              onClick={() => applyFilter(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                !speciality
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              All Doctors
            </button>
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid [grid-template-columns:repeat(auto-fit,minmax(250px,1fr))] gap-6 lg:gap-8">
          {filteredDoctors.map((item) => (
            <div
              onClick={() => navigate(`/appointment/${item._id}`)}
              key={item._id}
              className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-105 hover:border-blue-500 cursor-pointer"
            >
              <div className="overflow-hidden rounded-t-xl">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <p className="text-sm font-medium text-green-600">Available</p>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{item.name}</h3>
                <p className="text-sm text-gray-600 font-medium">{item.speciality}</p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500">Click to book appointment</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No doctors found */}
        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500">No doctors found for this specialty</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctors;
