import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, Users, Car, Smartphone, CreditCard, Search, Settings, DollarSign, Star, List, CheckCircle2, Award, Globe, Clock3, Building2, UserCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const features = [
    {
      icon: <Smartphone className="h-6 w-6 text-[#06347C]" />,
      title: 'Easy Booking',
      description: 'Rent vehicles with just a few taps on your phone'
    },
    {
      icon: <Search className="h-6 w-6 text-[#06347C]" />,
      title: 'Wide Range of Options',
      description: "From motorcycles to luxury cars, we've got it all"
    },
    {
      icon: <CreditCard className="h-6 w-6 text-[#06347C]" />,
      title: 'Flexible Payments',
      description: 'Secure transactions through Flutterwave and multiple payment methods'
    },
    {
      icon: <Settings className="h-6 w-6 text-[#06347C]" />,
      title: 'Seamless Experience',
      description: 'Optimized app with a user-friendly interface'
    }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img
                src="https://raw.githubusercontent.com/frabrice/emodocar/refs/heads/main/Emodocar%20Feeatured%20Graphivc.png"
                alt="EmodoCar App"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-[#06347C] text-white p-4 rounded-lg shadow-lg">
                <p className="font-bold">4.9/5</p>
                <div className="flex text-yellow-400">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                </div>
                <p className="text-sm mt-1">User Rating</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900">
                Rent Smart, <span className="text-[#06347C]">Ride Easy</span>
              </h1>
              <p className="text-xl mb-8 text-gray-600">
                Your trusted platform for seamless vehicle rentals – cars, motorcycles, and more!
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-[#06347C] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#052960] transition-colors">
                  Download App
                </button>
                <Link
                  to="/about"
                  className="border-2 border-[#06347C] text-[#06347C] px-8 py-3 rounded-full font-semibold hover:bg-[#06347C] hover:text-white transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-[#06347C]/[0.03] -z-1"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="bg-white p-8 rounded-2xl shadow-xl relative z-10">
                <div className="absolute -top-4 -left-4 bg-[#06347C]/10 w-24 h-24 rounded-full blur-2xl"></div>
                <div className="relative">
                  <h2 className="text-4xl font-bold text-gray-900 mb-6">Who We Are</h2>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    EmodoCar is revolutionizing the vehicle rental industry by creating seamless connections 
                    between renters and vehicle owners. Our platform is built on the foundation of trust, 
                    innovation, and exceptional service. We're committed to providing a secure, efficient, 
                    and user-friendly experience for both vehicle owners and renters.
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="bg-white p-8 rounded-2xl shadow-xl border-l-4 border-[#06347C]">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  To make vehicle rentals accessible, secure, and enjoyable for everyone while empowering 
                  vehicle owners to maximize their assets.
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-xl border-l-4 border-[#06347C]">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  To become Africa's leading platform for vehicle rentals, known for innovation, 
                  reliability, and exceptional customer experience.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Offer</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover why thousands choose EmodoCar for their rental needs.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white p-6 rounded-lg shadow-lg border border-gray-100"
              >
                <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* For Vehicle Owners Section */}
      <section className="py-20 bg-[#06347C] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')] opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Join Our Community</h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* For Car Rental Companies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-white/20 rounded-xl">
                  <Building2 className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold">For Car Rental Companies</h3>
              </div>
              <p className="text-lg mb-8 opacity-90">
                Expand your car rental business with EmodoCar. List your fleet on our platform
                and reach more customers while streamlining your rental operations.
              </p>
              <div className="space-y-4">
                {[
                  'Efficient fleet management system',
                  'Secure payment processing',
                  'Advanced booking management',
                  'Dedicated business support'
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center space-x-3 bg-white/5 p-4 rounded-xl"
                  >
                    <Shield className="h-5 w-5 flex-shrink-0" />
                    <span className="opacity-90">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* For Car Users */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-white/20 rounded-xl">
                  <UserCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold">For Car Users</h3>
              </div>
              <p className="text-lg mb-8 opacity-90">
                Find your perfect ride with ease. From daily commutes to special occasions,
                we have the right vehicle for every need at competitive prices.
              </p>
              <div className="space-y-4">
                {[
                  'Wide range of vehicles',
                  'Flexible rental periods',
                  'Transparent pricing',
                  'Verified vehicles',
                  '24/7 roadside assistance'
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center space-x-3 bg-white/5 p-4 rounded-xl"
                  >
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                    <span className="opacity-90">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* App Screenshots */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">See EmodoCar in Action</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience our intuitive and user-friendly mobile application designed for both renters and vehicle owners.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.img
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              src="https://raw.githubusercontent.com/frabrice/emodocar/refs/heads/main/Resize%2022222222.png"
              alt="EmodoCar App Screenshot 1"
              className="rounded-lg shadow-xl"
            />
            <motion.img
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              src="https://raw.githubusercontent.com/frabrice/emodocar/refs/heads/main/op3%20123456.png"
              alt="EmodoCar App Screenshot 2"
              className="rounded-lg shadow-xl"
            />
            <motion.img
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              src="https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=800&q=80"
              alt="EmodoCar App Screenshot 3"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#06347C] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied users who've discovered a better way to rent vehicles. Download the EmodoCar app today!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-white text-[#06347C] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                Download for iOS
              </button>
              <button className="bg-white text-[#06347C] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                Download for Android
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;