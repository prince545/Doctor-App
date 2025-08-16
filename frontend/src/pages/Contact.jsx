import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { assets } from '../assets/assets_frontend/assets'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData)
      setIsSubmitting(false)
      setSubmitSuccess(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      })
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000)
    }, 1500)
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  const contactMethods = [
    {
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Address",
      content: "123 Healthcare Street, Medical City, MC 12345"
    },
    {
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: "Phone",
      content: "+1 (555) 123-4567"
    },
    {
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Email",
      content: "support@doctorapp.com"
    },
    {
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Hours",
      content: "24/7 Support Available"
    }
  ]

  const faqs = [
    {
      question: "How quickly will you respond?",
      answer: "We typically respond to all inquiries within 24 hours."
    },
    {
      question: "Can I book appointments through contact?",
      answer: "Yes, our team can help you book appointments with specialists."
    },
    {
      question: "Is my information secure?",
      answer: "Absolutely. We use industry-standard encryption to protect your data."
    },
    {
      question: "Do you offer emergency services?",
      answer: "For medical emergencies, please call 911 or your local emergency number."
    }
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
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xl opacity-90 max-w-2xl mx-auto"
          >
            We're here to help and answer any questions you may have
          </motion.p>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-12"
        >
          {/* Contact Information */}
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Get in Touch</h2>
            <p className="text-gray-600 mb-8">
              Have questions or need assistance? Our team is ready to help. 
              Reach out to us through any of the channels below, and we'll 
              respond as quickly as possible.
            </p>

            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ x: 5 }}
                  className="flex items-start bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    {method.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{method.title}</h3>
                    <p className="text-gray-600">{method.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="mt-8 overflow-hidden rounded-xl shadow-lg"
            >
              <img 
                src={assets.contact_image} 
                alt="Contact Us" 
                className="w-full h-auto object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h3>
              
              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6"
                >
                  Thank you for your message! We'll get back to you soon.
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Tell us how we can help you"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-all ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white shadow-md hover:shadow-lg flex items-center justify-center`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>

            {/* FAQ Section */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ scale: 1.01 }}
                    className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <h4 className="font-bold text-gray-800 mb-2">{faq.question}</h4>
                    <p className="text-gray-600">{faq.answer}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default Contact