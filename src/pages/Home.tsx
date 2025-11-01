import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { PrescriptionUpload } from '../components/PrescriptionUpload';
import { PostConsultationSection } from '../components/PostConsultationSection';
import { DoctorsSection } from '../components/DoctorsSection';
import { ServicesSection } from '../components/ServicesSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';
import { AppointmentBooking } from '../components/AppointmentBooking';
import { DiagnosticBooking } from '../components/DiagnosticBooking';

export const Home: React.FC = () => {
  const [showPrescriptionUpload, setShowPrescriptionUpload] = useState(false);
  const [showAppointmentBooking, setShowAppointmentBooking] = useState(false);
  const [showDiagnosticBooking, setShowDiagnosticBooking] = useState(false);
  const [appointmentType, setAppointmentType] = useState<'teleconsult' | 'in_clinic'>('teleconsult');
  const [preselectedDoctorId, setPreselectedDoctorId] = useState<string | undefined>(undefined);

  const handleUploadPrescription = () => {
    setShowPrescriptionUpload(true);
  };

  const handleBookTeleconsult = () => {
    setAppointmentType('teleconsult');
    setPreselectedDoctorId(undefined);
    setShowAppointmentBooking(true);
  };

  const handleBookInClinic = () => {
    setAppointmentType('in_clinic');
    setPreselectedDoctorId(undefined);
    setShowAppointmentBooking(true);
  };

  const handleBookDiagnostic = () => {
    setShowDiagnosticBooking(true);
  };

  const handleBookAppointmentWithDoctor = (doctorId: string) => {
    setAppointmentType('in_clinic');
    setPreselectedDoctorId(doctorId);
    setShowAppointmentBooking(true);
  };

  const handleBookAppointment = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onUploadPrescription={handleUploadPrescription} />

      <Hero
        onUploadPrescription={handleUploadPrescription}
        onBookAppointment={handleBookAppointment}
      />

      <DoctorsSection onBookAppointment={handleBookAppointmentWithDoctor} />

      <ServicesSection
        onBookTeleconsult={handleBookTeleconsult}
        onBookInClinic={handleBookInClinic}
        onBookDiagnostic={handleBookDiagnostic}
      />

      <PostConsultationSection onUploadPrescription={handleUploadPrescription} />

      <TestimonialsSection />

      <ContactSection />

      <Footer />

      <PrescriptionUpload
        isOpen={showPrescriptionUpload}
        onClose={() => setShowPrescriptionUpload(false)}
      />

      <AppointmentBooking
        isOpen={showAppointmentBooking}
        onClose={() => {
          setShowAppointmentBooking(false);
          setPreselectedDoctorId(undefined);
        }}
        type={appointmentType}
        preselectedDoctorId={preselectedDoctorId}
      />

      <DiagnosticBooking
        isOpen={showDiagnosticBooking}
        onClose={() => setShowDiagnosticBooking(false)}
      />
    </div>
  );
};
