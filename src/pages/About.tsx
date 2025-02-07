import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Heart, Award } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: <Users className="h-8 w-8 text-[#06347C]" />,
      title: 'Customer First',
      description: "We prioritize our customers' needs and satisfaction above all else."
    },
    {
      icon: <Target className="h-8 w-8 text-[#06347C]" />,
      title: 'Innovation',
      description: 'Continuously improving our platform to deliver the best car rental experience.'
    },
    {
      icon: <Heart className="h-8 w-8 text-[#06347C]" />,
      title: 'Reliability',
      description: 'Ensuring consistent, dependable service for all our users.'
    },
    {
      icon: <Award className="h-8 w-8 text-[#06347C]" />,
      title: 'Excellence',
      description: 'Striving for excellence in every aspect of our service.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-[#06347C] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About EmodoCar</h1>
            <p className="text-xl max-w-3xl mx-auto opacity-90">
              Transforming the car rental industry through innovation and exceptional service.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 2023, EmodoCar emerged from a vision to revolutionize the car rental industry. 
                  We recognized the need for a more efficient, transparent, and user-friendly platform that 
                  connects car rental companies with customers seeking reliable transportation solutions.
                </p>
                <p>
                  Our platform has grown to become a trusted name in the industry, serving thousands of 
                  satisfied customers and partnering with leading car rental companies across the region.
                </p>
                <p>
                  At EmodoCar, we're not just a car rental platform – we're a technology company dedicated 
                  to making vehicle rentals accessible, convenient, and enjoyable for everyone.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img
                src="https://raw.githubusercontent.com/frabrice/emodocar/refs/heads/main/op3%20123456.png"
                alt="EmodoCar Team"
                className="rounded-lg shadow-xl w-full h-auto object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide us in delivering exceptional service and value to our customers.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white p-8 rounded-lg shadow-lg text-center"
              >
                <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;