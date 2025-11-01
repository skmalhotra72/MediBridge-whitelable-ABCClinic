import React from 'react';
import { Phone, Mail, MapPin, Clock, Car, Accessibility } from 'lucide-react';
import { clinicConfig } from '../config/clinic';
import { Button } from './Button';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Visit Us or Get in Touch
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-purple-100 rounded-lg p-3">
                <MapPin className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                <p className="text-gray-700">{clinicConfig.name}</p>
                <p className="text-gray-700">{clinicConfig.address.street}</p>
                <p className="text-gray-700">{clinicConfig.address.city}</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-purple-100 rounded-lg p-3">
                <Phone className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                <p className="text-gray-700">{clinicConfig.contact.phone} (Reception)</p>
                <p className="text-gray-700">{clinicConfig.contact.appointmentPhone} (Appointments)</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-purple-100 rounded-lg p-3">
                <Mail className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                <p className="text-gray-700">{clinicConfig.contact.email}</p>
                <p className="text-gray-700">{clinicConfig.contact.appointmentEmail}</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-purple-100 rounded-lg p-3">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Clinic Hours</h3>
                <p className="text-gray-700">Monday - Friday: {clinicConfig.hours.weekdays}</p>
                <p className="text-gray-700">Saturday: {clinicConfig.hours.saturday}</p>
                <p className="text-gray-700">Sunday: {clinicConfig.hours.sunday}</p>
              </div>
            </div>

            <div className="flex items-center space-x-6 pt-4">
              <div className="flex items-center space-x-2 text-gray-700">
                <Car className="w-5 h-5 text-purple-600" />
                <span>Parking Available</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <Accessibility className="w-5 h-5 text-purple-600" />
                <span>Wheelchair Access</span>
              </div>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <p className="font-semibold text-red-900">24x7 Emergency</p>
              <p className="text-red-800">{clinicConfig.contact.emergencyPhone}</p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => window.open(clinicConfig.address.googleMapsLink, '_blank')}
                variant="primary"
                size="md"
              >
                Get Directions
              </Button>
              <Button
                onClick={() => window.location.href = `tel:${clinicConfig.contact.phone}`}
                variant="secondary"
                size="md"
              >
                Call Now
              </Button>
              <Button
                onClick={() => window.open(`https://wa.me/${clinicConfig.contact.whatsapp.replace(/[^0-9]/g, '')}`, '_blank')}
                variant="accent"
                size="md"
              >
                WhatsApp Us
              </Button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose ABC Clinic?</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-white rounded-lg p-3 shadow-md">
                  <span className="text-2xl">🏆</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">15+ Years of Excellence</h4>
                  <p className="text-gray-600">Trusted by thousands of families in Mumbai</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-white rounded-lg p-3 shadow-md">
                  <span className="text-2xl">👨‍⚕️</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Expert Specialists</h4>
                  <p className="text-gray-600">4 highly qualified doctors across multiple specialties</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-white rounded-lg p-3 shadow-md">
                  <span className="text-2xl">🔬</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Advanced Diagnostics</h4>
                  <p className="text-gray-600">In-house lab with home sample collection</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-white rounded-lg p-3 shadow-md">
                  <span className="text-2xl">🤖</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">AI-Powered Support</h4>
                  <p className="text-gray-600">24x7 post-consultation care in your language</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-white rounded-lg p-3 shadow-md">
                  <span className="text-2xl">⭐</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">4.8/5 Rating</h4>
                  <p className="text-gray-600">2,500+ happy patients and counting</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-white rounded-lg p-3 shadow-md">
                  <span className="text-2xl">💳</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Insurance Accepted</h4>
                  <p className="text-gray-600">Cashless treatment for major providers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
