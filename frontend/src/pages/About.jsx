import React from 'react'
import { motion } from 'framer-motion'
import { assets } from '../assets/assets_frontend/assets'

const About = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  const stats = [
    { value: '50K+', label: 'Happy Patients' },
    { value: '100+', label: 'Expert Doctors' },
    { value: '20+', label: 'Specialties' },
    { value: '95%', label: 'Satisfaction Rate' }
  ]

  const values = [
    { icon: '❤️', title: 'Patient First', description: 'Your health and well-being are our top priority' },
    { icon: '✓', title: 'Excellence', description: 'Committed to the highest standards of medical care' },
    { icon: '🤝', title: 'Trust', description: 'Building lasting relationships through transparency' },
    { icon: '💡', title: 'Innovation', description: 'Continuously improving healthcare delivery' },
    { icon: '🌍', title: 'Accessibility', description: 'Making quality healthcare available to all' },
    { icon: '🔄', title: 'Continuous Learning', description: 'Staying at the forefront of medical knowledge' }
  ]

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-24"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            About Us
          </motion.h1>
          <motion.p
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xl opacity-90 max-w-2xl mx-auto"
          >
            Your trusted healthcare partner connecting you with top medical professionals
          </motion.p>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Who We Are */}
        <motion.div 
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
  className="grid md:grid-cols-2 gap-12 items-center mb-24 bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl"
>
  <motion.div 
    variants={itemVariants}
    className="space-y-6"
  >
    <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
      About Our Platform
    </div>
    <h2 className="text-4xl font-bold text-gray-800 leading-tight">
      Redefining <span className="text-blue-600">Healthcare</span> Accessibility
    </h2>
    
    <div className="space-y-4 text-gray-600">
      <p className="flex items-start">
        <span className="flex-shrink-0 bg-blue-100 text-blue-600 rounded-full p-1 mr-3 mt-1">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </span>
        Welcome to <span className="font-semibold text-blue-600">Doctor App</span>, your premier destination for comprehensive healthcare services.
      </p>
      
      <p className="flex items-start">
        <span className="flex-shrink-0 bg-blue-100 text-blue-600 rounded-full p-1 mr-3 mt-1">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </span>
        Our platform brings together experienced doctors and cutting-edge technology for a seamless healthcare experience.
      </p>
      
      <p className="flex items-start">
        <span className="flex-shrink-0 bg-blue-100 text-blue-600 rounded-full p-1 mr-3 mt-1">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </span>
        Founded in 2015 with the vision of making quality healthcare accessible to everyone.
      </p>
    </div>
    
    <div className="pt-4">
      <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl">
        Learn More About Our Story
        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>
    </div>
  </motion.div>
  
  <motion.div 
    variants={itemVariants}
    className="relative"
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.3 }}
  >
    <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl opacity-20 blur-lg"></div>
    <img 
      src={assets.about_image} 
      alt="Medical team discussing patient care" 
      className="relative rounded-xl shadow-2xl w-full h-auto border-4 border-white transform rotate-1 hover:rotate-0 transition-transform duration-300"
    />
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 rounded-b-xl">
      <p className="text-white font-medium">Our team of specialists ready to serve you</p>
    </div>
  </motion.div>
</motion.div>

        {/* Mission & Vision */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 mb-24"
        >
          <motion.div 
            variants={itemVariants}
            className="bg-white p-8 rounded-lg shadow-md border-t-4 border-blue-500"
          >
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-2 rounded-full mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Our Mission</h3>
            </div>
            <p className="text-gray-600 pl-12">
              To provide accessible, affordable, and high-quality healthcare services by connecting 
              patients with the best medical professionals, leveraging technology to enhance the 
              healthcare experience for everyone.
            </p>
          </motion.div>
          <motion.div 
            variants={itemVariants}
            className="bg-white p-8 rounded-lg shadow-md border-t-4 border-purple-500"
          >
            <div className="flex items-center mb-4">
              <div className="bg-purple-100 p-2 rounded-full mr-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Our Vision</h3>
            </div>
            <p className="text-gray-600 pl-12">
              To be the leading healthcare platform that transforms how people access and experience 
              medical care, setting new standards for patient convenience and healthcare excellence 
              worldwide by 2025.
            </p>
          </motion.div>
        </motion.div>

        {/* Values */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-24"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl font-bold text-gray-800 text-center mb-16"
          >
            Our Core Values
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow"
              >
                <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 rounded-lg shadow-lg text-white mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Our Impact in Numbers</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm"
              >
                <h3 className="text-4xl font-bold mb-2">{stat.value}</h3>
                <p className="text-blue-100">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl font-bold text-gray-800 text-center mb-12"
          >
            Meet Our Leadership Team
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Dr. Sarah Johnson", role: "Chief Medical Officer", bio: "Board-certified physician with 15+ years of clinical experience" },
              { name: "Michael Chen", role: "CEO & Founder", bio: "Healthcare technology entrepreneur passionate about patient care" },
              { name: "Dr. Aisha Williams", role: "Director of Operations", bio: "Specializes in healthcare administration and patient experience" }
            ].map((member, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                  <img 
                    src={assets[`doc${index + 1}`] || assets.profile_pic} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-white p-8 rounded-lg shadow-lg text-center border border-gray-100"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Ready to experience better healthcare?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join thousands of satisfied patients who have found the right doctors through our platform.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
            Find a Doctor
          </button>
        </motion.div>
      </div>
    </div>
  )
}

export default About