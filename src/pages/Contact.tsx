import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get in touch with us. We're here to help with any questions about EmodoCar.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-[#06347C] text-white p-8">
              <h2 className="text-2xl font-bold mb-2">Our Contact Information</h2>
              <p className="opacity-90">Reach out to us through any of these channels</p>
            </div>
            
            <div className="p-8 space-y-8">
              <div className="flex items-center space-x-6">
                <div className="bg-blue-50 p-4 rounded-full">
                  <Phone className="h-6 w-6 text-[#06347C]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Phone</h3>
                  <a 
                    href="tel:+250780849228" 
                    className="text-[#06347C] hover:text-[#052960] transition-colors"
                  >
                    +250 780 849 228
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="bg-blue-50 p-4 rounded-full">
                  <Mail className="h-6 w-6 text-[#06347C]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Email</h3>
                  <a 
                    href="mailto:administration@emodocar.com" 
                    className="text-[#06347C] hover:text-[#052960] transition-colors"
                  >
                    administration@emodocar.com
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="bg-blue-50 p-4 rounded-full">
                  <MapPin className="h-6 w-6 text-[#06347C]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Address</h3>
                  <p className="text-gray-600">1, KN 78 St</p>
                  <p className="text-gray-600">Kigali, Rwanda</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;