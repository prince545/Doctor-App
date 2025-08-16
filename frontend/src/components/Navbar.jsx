import React, { useState, useEffect, useContext } from 'react';
import { assets } from '../assets/assets_frontend/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/doctors', label: 'Doctors' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src={assets.logo}
              alt="Logo"
              className="h-10 w-auto cursor-pointer"
              onClick={() => navigate('/')}
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-300'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Desktop Profile or Login */}
          <div className="hidden md:flex items-center relative">
            {user ? (
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
              >
                <img
                  className="w-8 h-8 rounded-full"
                  src={assets.profile_pic}
                  alt="Profile"
                />
                <span className="text-sm font-medium text-gray-700">{user.name}</span>
                <img
                  className="w-2.5"
                  src={assets.dropdown_icon}
                  alt="Dropdown"
                />
              </div>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="min-w-24 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
              >
                Login
              </button>
            )}

            {/* Dropdown menu */}
            {isDropdownOpen && user && (
              <div className="absolute top-full right-0 mt-2 w-40 bg-white shadow-lg rounded-md border">
                <button
                  className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                  onClick={() => navigate('/my-profile')}
                >
                  My Profile
                </button>
                <button
                  className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                  onClick={() => navigate('/my-appointments')}
                >
                  My Appointments
                </button>
                <button
                  className="block w-full px-4 py-2 text-left text-red-600 hover:bg-red-100"
                  onClick={() => {
                    setUser(null);
                    setIsDropdownOpen(false);
                    navigate('/');
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
            >
              {isMenuOpen ? (
                <img src={assets.cross_icon} alt="close" className="h-6 w-6" />
              ) : (
                <img src={assets.menu_icon} alt="menu" className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}

            {/* Mobile Profile/Login */}
            <div className="border-t border-gray-200 mt-2 pt-2">
              {user ? (
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                >
                  <img
                    className="w-8 h-8 rounded-full"
                    src={assets.profile_pic}
                    alt="Profile"
                  />
                  <span className="text-sm font-medium text-gray-700">{user.name}</span>
                  <img
                    className="w-2.5"
                    src={assets.dropdown_icon}
                    alt="Dropdown"
                  />
                </div>
              ) : (
                <NavLink
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </NavLink>
              )}

              {/* Mobile Dropdown */}
              {isDropdownOpen && user && (
                <div className="mt-2 bg-white shadow-lg rounded-md border">
                  <button
                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                    onClick={() => navigate('/my-profile')}
                  >
                    My Profile
                  </button>
                  <button
                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                    onClick={() => navigate('/my-appointments')}
                  >
                    My Appointments
                  </button>
                  <button
                    className="block w-full px-4 py-2 text-left text-red-600 hover:bg-red-100"
                    onClick={() => {
                      setUser(null);
                      setIsDropdownOpen(false);
                      setIsMenuOpen(false);
                      navigate('/');
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
