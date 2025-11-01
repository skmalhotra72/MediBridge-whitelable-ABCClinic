import React from 'react';
import { Video, Building2, TestTube, Check } from 'lucide-react';
import { Button } from './Button';

interface ServicesSectionProps {
  onBookTeleconsult: () => void;
  onBookInClinic: () => void;
  onBookDiagnostic: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onBookTeleconsult,
  onBookInClinic,
  onBookDiagnostic,
}) => {
  const services = [
    {
      icon: Video,
      title: 'Video Consultation',
      description: 'Consult with our doctors from the comfort of your home via secure video call.',
      features: [
        'No travel needed',
        'Same-day appointments available',
        'E-prescription provided',
        'Follow-up included',
      ],
      fee: '₹500',
      onClick: onBookTeleconsult,
      color: 'emerald',
    },
    {
      icon: Building2,
      title: 'In-Clinic Visit',
      description: 'Visit our state-of-the-art clinic for comprehensive physical examination and treatment.',
      features: [
        'Complete health check',
        'Advanced diagnostics available',
        'Same-day reports',
        'All insurance accepted',
      ],
      fee: '₹700',
      onClick: onBookInClinic,
      color: 'cyan',
    },
    {
      icon: TestTube,
      title: 'Diagnostic Tests',
      description: 'Get blood tests, X-rays, ECG, and other diagnostics done at our in-house lab.',
      features: [
        'NABL certified lab',
        'Home sample collection',
        'Reports in 24 hours',
        'Competitive pricing',
      ],
      fee: 'From ₹200',
      onClick: onBookDiagnostic,
      color: 'amber',
    },
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Book Your Appointment
          </h2>
          <p className="text-xl text-gray-600">
            Choose the service you need - we make healthcare accessible
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-purple-500 hover:shadow-xl transition-all duration-300"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-${service.color}-100 rounded-xl mb-6`}>
                  <Icon className={`w-8 h-8 text-${service.color}-600`} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>

                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="w-5 h-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-gray-200 pt-6">
                  <p className="text-sm text-gray-600 mb-4">
                    <span className="font-semibold text-gray-900 text-lg">
                      {service.fee}
                    </span>
                    {service.title !== 'Diagnostic Tests' && ' Consultation Fee'}
                  </p>
                  <Button
                    onClick={service.onClick}
                    variant={service.color === 'emerald' ? 'primary' : service.color === 'cyan' ? 'secondary' : 'accent'}
                    size="lg"
                    className="w-full"
                  >
                    Book {service.title}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
