import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#06347C] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <img
                src="https://raw.githubusercontent.com/frabrice/emodocar/refs/heads/main/modocar%20LOGO.jpg"
                alt="EmodoCar Logo"
                className="h-16 w-auto object-contain rounded-lg"
              />
            </div>
            <p className="text-sm">Revolutionizing car rentals through seamless connections.</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-gray-300 transition-colors">Home</a></li>
              <li><a href="/about" className="hover:text-gray-300 transition-colors">About Us</a></li>
              <li><a href="/contact" className="hover:text-gray-300 transition-colors">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <a href="mailto:administration@emodocar.com">administration@emodocar.com</a>
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <a href="tel:+250780849228">+250 780 849 228</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-300 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/10 text-center">
          <p>&copy; {new Date().getFullYear()} EmodoCar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer