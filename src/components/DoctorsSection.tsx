import React from 'react';
import { Award, Clock, Languages } from 'lucide-react';
import { doctors } from '../config/clinic';
import { Button } from './Button';

interface DoctorsSectionProps {
  onBookAppointment: (doctorId: string) => void;
}

export const DoctorsSection: React.FC<DoctorsSectionProps> = ({ onBookAppointment }) => {
  return (
    <section id="doctors" className="py-20 bg-gradient-to-b from-pink-50 via-lavender-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Meet Our Specialists
          </h2>
          <p className="text-xl text-gray-600">
            Expert doctors dedicated to your health and well-being
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img
                    src={doctor.photo}
                    alt={doctor.name}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-6">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{doctor.name}</h3>
                    <p className="text-purple-600 font-semibold mb-1">{doctor.designation}</p>
                    <p className="text-gray-600">{doctor.specialty}</p>
                  </div>

                  <div className="flex items-center space-x-4 mb-4 text-sm">
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-semibold">
                      {doctor.experience} years
                    </span>
                  </div>

                  <p className="text-gray-700 text-sm mb-4 line-clamp-3">{doctor.about}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-start space-x-2 text-sm">
                      <Award className="w-4 h-4 text-purple-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{doctor.education}</span>
                    </div>
                    <div className="flex items-start space-x-2 text-sm">
                      <Clock className="w-4 h-4 text-purple-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{doctor.timings.weekdays}</span>
                    </div>
                    <div className="flex items-start space-x-2 text-sm">
                      <Languages className="w-4 h-4 text-purple-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{doctor.languages.join(', ')}</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="font-semibold text-gray-900 text-sm mb-2">Key Achievements:</h4>
                    <ul className="text-sm text-gray-600 space-y-1 mb-4">
                      {doctor.achievements.slice(0, 2).map((achievement, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-purple-600 mr-2">•</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                    <Button
                      onClick={() => onBookAppointment(doctor.id)}
                      variant="primary"
                      size="md"
                      className="w-full"
                    >
                      Book Appointment with {doctor.name.split(' ')[1]}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
