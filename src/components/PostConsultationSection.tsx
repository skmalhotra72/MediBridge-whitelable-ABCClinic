import React from 'react';
import { Brain, Languages, Bell, FileCheck, Calendar, MessageCircle } from 'lucide-react';
import { Button } from './Button';

interface PostConsultationSectionProps {
  onUploadPrescription: () => void;
}

export const PostConsultationSection: React.FC<PostConsultationSectionProps> = ({
  onUploadPrescription,
}) => {
  const features = [
    {
      icon: Brain,
      title: 'Prescription Decoded',
      description: 'AI explains every medicine in simple terms - what it does, when to take it, and why.',
    },
    {
      icon: Languages,
      title: 'Your Language, Your Comfort',
      description: 'Get answers in Hindi, English, Marathi, Tamil, Gujarati - whatever you speak.',
    },
    {
      icon: FileCheck,
      title: 'Test Booking Made Easy',
      description: 'MediBridge books your diagnostic tests and arranges home collection automatically.',
    },
    {
      icon: Bell,
      title: 'Smart Reminders',
      description: "Never miss a dose or follow-up. Get timely WhatsApp reminders based on your doctor's advice.",
    },
    {
      icon: Calendar,
      title: 'Follow-Up Tracking',
      description: 'Keeps track of your next appointment and sends you reminders at the right time.',
    },
    {
      icon: MessageCircle,
      title: '24x7 Support',
      description: 'Have questions at 2 AM? MediBridge is always available to help you understand your treatment.',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white via-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-white border-2 border-purple-200 text-purple-700 px-5 py-2 rounded-full text-sm font-bold mb-6 shadow-md">
            <Brain className="w-4 h-4 mr-2" />
            Post-Consultation Support · Powered by MediBridge AI
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            From Confusion to Confidence
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            After your consultation at ABC Clinic, our AI assistant ensures you understand your treatment completely -
            in your language, available 24x7 on WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-purple-100"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl mb-4">
                  <Icon className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 text-center border border-purple-200">
          <p className="text-lg text-gray-700 mb-6">
            Walk out of your consultation with complete clarity. Upload your prescription and let MediBridge guide you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={onUploadPrescription}
              variant="primary"
              size="lg"
            >
              Upload Prescription
            </Button>
            <a
              href="https://medibridge24x7.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-700 hover:text-purple-800 font-semibold text-sm underline"
            >
              Learn more about MediBridge
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
