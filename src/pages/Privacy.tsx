import React from 'react';
import { motion } from 'framer-motion';

const Privacy = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="bg-[#06347C] text-white p-8">
            <h1 className="text-3xl font-bold">Privacy Policy</h1>
          </div>
          
          <div className="p-8 prose prose-blue max-w-none">
            <p className="text-gray-600 mb-8">
              Welcome to EmodoCar Ltd ("EmodoCar," "we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and website.
            </p>

            <p className="text-gray-600 mb-8">
              By using EmodoCar, you consent to the data practices described in this policy. If you do not agree, please do not use our services.
            </p>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-900">1. Information We Collect</h2>
                <p className="text-gray-600 mb-4">When you use EmodoCar, we may collect the following types of personal information:</p>

                <h3 className="text-xl font-semibold text-gray-900">1.1 Information You Provide</h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li><strong>Account Information:</strong> Name, email address, phone number, and password during registration.</li>
                  <li><strong>Payment Details:</strong> Information needed to process payments securely.</li>
                  <li><strong>Vehicle Details:</strong> If you list a car, we collect details about the vehicle.</li>
                  <li><strong>Communications:</strong> Messages, reviews, and support inquiries.</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mt-4">1.2 Information Collected Automatically</h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li><strong>Device Information:</strong> IP address, device type, operating system, and app usage data.</li>
                  <li><strong>Location Data:</strong> If enabled, GPS location to facilitate better service recommendations.</li>
                  <li><strong>Transaction History:</strong> Rental bookings, payments, and refunds.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">2. How We Use Your Information</h2>
                <p className="text-gray-600 mb-4">We use your data to:</p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li><strong>Provide Our Services:</strong> Enable account creation, bookings, payments, and customer support.</li>
                  <li><strong>Enhance User Experience:</strong> Improve the app based on usage insights.</li>
                  <li><strong>Ensure Security:</strong> Detect fraud, prevent unauthorized access, and comply with legal obligations.</li>
                  <li><strong>Send Notifications:</strong> Inform you about bookings, updates, and verification requests.</li>
                  <li><strong>Comply with Legal Requirements:</strong> Maintain records as required by law.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">3. How We Share Your Information</h2>
                <p className="text-gray-600 mb-4">We do not sell your data. However, we may share it with:</p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li><strong>Payment Providers:</strong> To facilitate secure transactions (e.g., Flutterwave).</li>
                  <li><strong>Service Providers:</strong> For hosting, analytics, and security services.</li>
                  <li><strong>Legal Authorities:</strong> If required for fraud prevention or legal compliance.</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  We only share information as necessary to provide and improve our services while ensuring compliance with privacy laws.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">4. Data Security Measures</h2>
                <p className="text-gray-600 mb-4">We implement industry-standard security measures, including:</p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li><strong>Encryption:</strong> Secure data transmission and storage.</li>
                  <li><strong>Access Controls:</strong> Restricted access to sensitive information.</li>
                  <li><strong>Monitoring:</strong> Regular system checks to prevent security threats.</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  Despite our best efforts, no system is 100% secure. Users should safeguard their login credentials.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">5. Your Privacy Rights</h2>
                <p className="text-gray-600 mb-4">You have the right to:</p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li><strong>Access and Update Your Data:</strong> Edit your profile and settings.</li>
                  <li><strong>Opt-Out of Communications:</strong> Manage preferences in your account.</li>
                  <li><strong>Request Data Deletion:</strong> Contact us to remove your account and associated data.</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  For data access or deletion requests, email administration@emodocar.com.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">6. Third-Party Services</h2>
                <p className="text-gray-600">
                  We may link to third-party services (e.g., payment providers). These services operate independently, and we are not responsible for their privacy practices.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">7. Changes to This Policy</h2>
                <p className="text-gray-600">
                  We may update this Privacy Policy periodically. Changes will be communicated via our website or app. Continued use of EmodoCar after updates constitutes acceptance of the revised policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">8. Contact Us</h2>
                <p className="text-gray-600">If you have any questions about this Privacy Policy, please contact us at:</p>
                <div className="mt-4 text-gray-600">
                  <p className="font-semibold">EmodoCar Ltd</p>
                  <p>📍 Address: Nyarugenge, Kigali, Rwanda</p>
                  <p>📧 Email: administration@emodocar.com</p>
                </div>
              </section>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;