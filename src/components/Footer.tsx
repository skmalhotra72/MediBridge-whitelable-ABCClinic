import React from 'react';
import { Heart, Phone, Mail, MapPin, Clock, AlertCircle } from 'lucide-react';
import { clinicConfig } from '../config/clinic';

export const Footer: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" fill="currentColor" />
              </div>
              <div>
                <h3 className="text-white font-bold">{clinicConfig.name}</h3>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-4">{clinicConfig.tagline}</p>
            <p className="text-sm text-gray-400">
              ABC Doctor Clinic is a multi-specialty medical center providing comprehensive
              healthcare services across Cardiology, Orthopedics, Dermatology, and General Medicine.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => scrollToSection('doctors')}
                  className="hover:text-purple-400 transition-colors"
                >
                  Our Doctors
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="hover:text-purple-400 transition-colors"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="hover:text-purple-400 transition-colors"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <a href="/admin" className="hover:text-purple-400 transition-colors">
                  Admin Portal
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-purple-400 transition-colors cursor-pointer">Cardiology</li>
              <li className="hover:text-purple-400 transition-colors cursor-pointer">Orthopedics</li>
              <li className="hover:text-purple-400 transition-colors cursor-pointer">Dermatology</li>
              <li className="hover:text-purple-400 transition-colors cursor-pointer">General Medicine</li>
              <li className="hover:text-purple-400 transition-colors cursor-pointer">Diagnostic Lab</li>
              <li className="hover:text-purple-400 transition-colors cursor-pointer">Teleconsultation</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <Phone className="w-4 h-4 text-purple-400 mt-1 flex-shrink-0" />
                <span>{clinicConfig.contact.phone}</span>
              </li>
              <li className="flex items-start space-x-2">
                <Mail className="w-4 h-4 text-purple-400 mt-1 flex-shrink-0" />
                <span>{clinicConfig.contact.email}</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-purple-400 mt-1 flex-shrink-0" />
                <span>{clinicConfig.address.city}</span>
              </li>
              <li className="flex items-start space-x-2">
                <Clock className="w-4 h-4 text-purple-400 mt-1 flex-shrink-0" />
                <div>
                  <p>Mon-Fri: {clinicConfig.hours.weekdays}</p>
                  <p>Sat: {clinicConfig.hours.saturday}</p>
                </div>
              </li>
            </ul>
            <div className="mt-4 bg-red-900/30 border border-red-700 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-red-400" />
                <p className="text-sm font-semibold text-red-400">24x7 Emergency</p>
              </div>
              <p className="text-sm text-red-300 mt-1">{clinicConfig.contact.emergencyPhone}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">
            © 2025 {clinicConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-gray-400">Powered by</span>
            <a
              href={clinicConfig.medibridge.appUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 font-semibold flex items-center space-x-1"
            >
              <span>MediBridge AI</span>
              <Heart className="w-4 h-4" fill="currentColor" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
