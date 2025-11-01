import React from 'react';
import { Star, Building2, Users, Phone, MapPin, Clock } from 'lucide-react';
import { clinicConfig } from '../config/clinic';
import { Button } from './Button';

interface HeroProps {
  onUploadPrescription: () => void;
  onBookAppointment: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onUploadPrescription, onBookAppointment }) => {
  return (
    <div className="relative min-h-screen flex items-center pt-16">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/85 via-lavender-800/80 to-pink-900/75"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Expert Healthcare,
            <span className="text-purple-200"> Right When You Need It</span>
          </h1>

          <p className="text-xl md:text-2xl text-purple-100 mb-4 leading-relaxed">
            {clinicConfig.name} - Your trusted partner in health with experienced specialists across
            Cardiology, Orthopedics, Dermatology, and General Medicine
          </p>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 mb-8 border border-white/20">
            <p className="text-purple-100 text-base leading-relaxed">
              <span className="font-semibold text-white">Plus:</span> Walk out with clarity, not questions.
              Our AI-powered post-consultation support explains your treatment in your language - 24x7.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 mb-10">
            <div className="flex items-center space-x-2 text-white">
              <div className="flex items-center bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl px-3 py-2 shadow-lg">
                <Star className="w-5 h-5 fill-current mr-1" />
                <span className="font-bold">{clinicConfig.stats.rating}/5</span>
              </div>
              <span className="text-purple-100">({clinicConfig.stats.reviews} Reviews)</span>
            </div>

            <div className="flex items-center space-x-2 text-white">
              <Building2 className="w-6 h-6 text-purple-200" />
              <span>
                <span className="font-bold text-purple-200">{clinicConfig.stats.yearsOfService}</span> Years of Service
              </span>
            </div>

            <div className="flex items-center space-x-2 text-white">
              <Users className="w-6 h-6 text-purple-200" />
              <span>
                <span className="font-bold text-purple-200">{clinicConfig.stats.doctors}</span> Specialist Doctors
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button onClick={onBookAppointment} variant="primary" size="lg" className="text-base font-bold">
              Book Appointment
            </Button>
            <Button onClick={onUploadPrescription} variant="accent" size="lg" className="text-base font-bold">
              Get Post-Consultation Support
            </Button>
          </div>

          <div className="flex flex-wrap gap-6 text-white">
            <a
              href={`tel:${clinicConfig.contact.phone}`}
              className="flex items-center space-x-2 hover:text-purple-200 transition-colors bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg"
            >
              <Phone className="w-5 h-5" />
              <span className="font-medium">Call Now</span>
            </a>
            <a
              href={clinicConfig.address.googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:text-purple-200 transition-colors bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg"
            >
              <MapPin className="w-5 h-5" />
              <span className="font-medium">Get Directions</span>
            </a>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <Clock className="w-5 h-5 text-purple-200" />
              <span className="font-medium">Today: {clinicConfig.hours.weekdays}</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 right-8 hidden lg:block">
          <div className="bg-white/20 backdrop-blur-md rounded-xl px-4 py-2 text-white text-sm border border-white/30">
            Post-Consultation Support Powered by{' '}
            <a
              href={clinicConfig.medibridge.appUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-200 hover:text-purple-100 font-semibold"
            >
              MediBridge AI
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
