import React from 'react';
import { motion } from 'framer-motion';

const Terms = () => {
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
            <h1 className="text-3xl font-bold">Terms and Conditions</h1>
          </div>
          
          <div className="p-8 prose prose-blue max-w-none">
            <p className="text-gray-600 mb-8">
              Welcome to EmodoCar Ltd. ("EmodoCar," "we," "our," or "us"). These Terms and Conditions
              ("Terms") govern your use of our mobile application, website, and related services (collectively,
              the "Platform"). By accessing or using our Platform, you agree to comply with and be bound by
              these Terms.
            </p>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-900">1. Definitions</h2>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li><strong>Platform:</strong> Refers to the EmodoCar mobile app, website, and associated services.</li>
                  <li><strong>Car Host:</strong> A registered user who lists and offers vehicles for rental on the Platform.</li>
                  <li><strong>Client/Renter:</strong> A registered user who rents vehicles through the Platform.</li>
                  <li><strong>Rental Fee:</strong> The amount payable by the Renter for the use of a vehicle.</li>
                  <li><strong>Commission:</strong> A 7% fee added to the Rental Fee, payable by the Renter to EmodoCar.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">2. Eligibility</h2>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>You must be at least 18 years old and possess the legal authority to enter into contracts.</li>
                  <li>You must create a verified account on the Platform, providing accurate and complete information.</li>
                  <li>Renters must hold a valid driver's license and comply with all legal requirements for vehicle operation.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">3. Responsibilities of Users</h2>
                <h3 className="text-xl font-semibold text-gray-900 mt-4">3.1 Car Hosts</h3>
                <div className="pl-6">
                  <p className="font-semibold">1. Vehicle Listings:</p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Provide accurate, up-to-date information about the vehicle, including photos, specifications, and availability.</li>
                    <li>Ensure that the vehicle is in good working condition, insured, and compliant with local regulations.</li>
                  </ul>
                  
                  <p className="font-semibold mt-4">2. Maintenance:</p>
                  <ul className="list-disc pl-6 text-gray-600">
                    <li>Perform regular maintenance and repairs to ensure safety and reliability.</li>
                  </ul>
                  
                  <p className="font-semibold mt-4">3. Legal Compliance:</p>
                  <ul className="list-disc pl-6 text-gray-600">
                    <li>Ensure compliance with applicable laws, including registration, insurance, tax obligations, and KYC requirements.</li>
                  </ul>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mt-4">3.2 Renters/Clients</h3>
                <div className="pl-6">
                  <p className="font-semibold">1. Proper Use:</p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Use the rented vehicle responsibly and in compliance with all applicable laws.</li>
                    <li>Return the vehicle on time, in the condition in which it was received, except for reasonable wear and tear.</li>
                  </ul>
                  
                  <p className="font-semibold mt-4">2. Payments:</p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Pay the full Rental Fee, including the 7% commission, through the Platform.</li>
                    <li>Cover additional costs for damages, late returns, or other breaches of these Terms.</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">4. Payments and Fees</h2>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li><strong>Payment Processing:</strong> All payments are securely processed via Flutterwave, ensuring compliance with PCI-DSS standards.</li>
                  <li><strong>Rental Fee and Commission:</strong> Renters agree to pay the Rental Fee, plus a 7% commission, through the Platform. The commission is non-refundable and retained by EmodoCar.</li>
                  <li><strong>Refunds and Cancellations:</strong> Cancellations and refunds are subject to the Car Host's cancellation policy, which must be clearly stated in the vehicle listing.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">5. Insurance and Liability</h2>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li><strong>Car Host Insurance:</strong> Car Hosts are responsible for ensuring their vehicles are adequately insured for rentals.</li>
                  <li><strong>Renter Liability:</strong> Renters assume liability for damages, theft, or misuse of the rented vehicle during the rental period.</li>
                  <li><strong>EmodoCar's Role:</strong> EmodoCar facilitates transactions and provides the platform but does not own or manage vehicles and is not liable for disputes or damages.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">6. Monitoring and Fraud Prevention</h2>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>EmodoCar actively monitors transactions for unusual activity, such as spikes in payment volumes or other irregularities, using automated and manual reviews.</li>
                  <li>Any fraudulent or suspicious activity will result in account suspension or termination, and relevant authorities may be notified.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">7. Record Retention</h2>
                <p className="text-gray-600">EmodoCar maintains a record retention policy to store customer and transaction data securely for compliance with legal and regulatory requirements.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">8. Booking and Rental Process</h2>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Renters select vehicles based on listings provided by Car Hosts.</li>
                  <li>Booking is confirmed upon successful payment of the Rental Fee and commission.</li>
                  <li>The vehicle must be inspected by both parties at the start and end of the rental period.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">9. Privacy</h2>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>By using the Platform, you agree to our Privacy Policy, which governs the collection, use, and storage of your personal data.</li>
                  <li>EmodoCar complies with record retention and data security standards to protect user information.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">10. Termination</h2>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Users may terminate their accounts at any time by contacting support.</li>
                  <li>EmodoCar reserves the right to suspend or terminate accounts for breach of these Terms or for engaging in fraudulent activities.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">11. Governing Law and Jurisdiction</h2>
                <p className="text-gray-600">These Terms are governed by the laws of Rwanda. Any disputes shall be resolved exclusively in the courts of Kigali.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">12. Contact Information</h2>
                <p className="text-gray-600">For questions or concerns regarding these Terms, please contact us at:</p>
                <div className="mt-4 text-gray-600">
                  <p className="font-semibold">EmodoCar Ltd</p>
                  <p>Email: administration@emodocar.com</p>
                  <p>Phone: +250780849228</p>
                  <p>Address: Nyarugenge, Nyarugenge, Umujyi wa Kigali, RWANDA</p>
                </div>
              </section>
            </div>

            <p className="mt-8 text-gray-600 font-semibold">
              By using the EmodoCar Platform, you agree to these Terms and Conditions in their entirety.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;