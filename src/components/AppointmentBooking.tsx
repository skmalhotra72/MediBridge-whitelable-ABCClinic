import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle } from 'lucide-react';
import { Modal } from './Modal';
import { Button } from './Button';
import { doctors } from '../config/clinic';
import { supabase } from '../lib/supabase';

interface AppointmentBookingProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'teleconsult' | 'in_clinic' | 'diagnostic';
  preselectedDoctorId?: string;
}

export const AppointmentBooking: React.FC<AppointmentBookingProps> = ({
  isOpen,
  onClose,
  type,
  preselectedDoctorId,
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    doctorId: preselectedDoctorId || '',
    patientName: '',
    gender: '',
    age: '',
    phone: '',
    email: '',
    appointmentDate: '',
    appointmentTime: '',
    chiefComplaint: '',
    returningPatient: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [bookingId, setBookingId] = useState('');

  useEffect(() => {
    if (preselectedDoctorId) {
      setFormData(prev => ({ ...prev, doctorId: preselectedDoctorId }));
    }
  }, [preselectedDoctorId]);

  const selectedDoctor = doctors.find(d => d.id === formData.doctorId);
  const fee = type === 'teleconsult' ? 500 : 700;

  const generateBookingId = () => {
    const prefix = type === 'teleconsult' ? 'TC' : 'IC';
    const timestamp = Date.now().toString().slice(-6);
    return `${prefix}${timestamp}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type: inputType } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: inputType === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async () => {
    if (!selectedDoctor) return;

    setIsSubmitting(true);
    const newBookingId = generateBookingId();

    try {
      const { error } = await supabase.from('appointments').insert([
        {
          booking_id: newBookingId,
          appointment_type: type,
          doctor_name: selectedDoctor.name,
          doctor_specialty: selectedDoctor.specialty,
          patient_name: formData.patientName,
          gender: formData.gender,
          age: parseInt(formData.age),
          phone: formData.phone,
          email: formData.email,
          appointment_date: formData.appointmentDate,
          appointment_time: formData.appointmentTime,
          chief_complaint: formData.chiefComplaint,
          returning_patient: formData.returningPatient,
          fee: fee,
          status: 'confirmed',
        },
      ]);

      if (error) throw error;

      setBookingId(newBookingId);
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        onClose();
        setStep(1);
        setFormData({
          doctorId: '',
          patientName: '',
          gender: '',
          age: '',
          phone: '',
          email: '',
          appointmentDate: '',
          appointmentTime: '',
          chiefComplaint: '',
          returningPatient: false,
        });
      }, 7000);
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Failed to book appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess && selectedDoctor) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Appointment Booked Successfully!" size="md">
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h3>
          <p className="text-lg text-purple-600 font-semibold mb-6">#{bookingId}</p>

          <div className="bg-gray-50 rounded-lg p-6 text-left mb-6 space-y-3">
            <p className="text-sm text-gray-600">Dear {formData.patientName},</p>
            <p className="text-sm text-gray-600">Your {type === 'teleconsult' ? 'video consultation' : 'in-clinic visit'} is confirmed:</p>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-semibold text-gray-900">{formData.appointmentDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time:</span>
                <span className="font-semibold text-gray-900">{formData.appointmentTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Doctor:</span>
                <span className="font-semibold text-gray-900">{selectedDoctor.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Type:</span>
                <span className="font-semibold text-gray-900">{type === 'teleconsult' ? 'Video Call' : 'In-Clinic Visit'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Fee:</span>
                <span className="font-semibold text-gray-900">₹{fee}</span>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 rounded-lg p-4 text-left mb-6">
            <p className="text-sm font-semibold text-gray-900 mb-2">You will receive:</p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• WhatsApp reminder 1 day before</li>
              {type === 'teleconsult' && <li>• Video call link 30 minutes before</li>}
              <li>• SMS with booking details</li>
            </ul>
          </div>

          {type === 'in_clinic' && (
            <div className="text-sm text-gray-600 mb-4">
              <p className="font-semibold mb-1">Clinic Address:</p>
              <p>ABC Doctor Clinic, 123 Health Street</p>
              <p>Medical District, Mumbai 400001</p>
            </div>
          )}

          <p className="text-sm text-gray-600 mb-4">
            For any changes, call: <span className="font-semibold">+91-9876543210</span>
          </p>

          <Button onClick={onClose} variant="primary" size="lg" className="w-full">
            Close
          </Button>
        </div>
      </Modal>
    );
  }

  const availableSlots = selectedDoctor?.timings.availability || [];
  const today = new Date().toISOString().split('T')[0];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={type === 'teleconsult' ? 'Book Video Consultation' : 'Book In-Clinic Visit'}
      size="lg"
    >
      <div className="space-y-6">
        {step === 1 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Step 1: Choose Doctor</h3>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select Doctor <span className="text-red-500">*</span>
            </label>
            <select
              name="doctorId"
              value={formData.doctorId}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-4"
            >
              <option value="">Select a doctor</option>
              {doctors.map(doctor => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name} ({doctor.specialty})
                </option>
              ))}
            </select>

            {selectedDoctor && (
              <div className="bg-purple-50 rounded-lg p-4 mb-4">
                <div className="flex items-start space-x-4">
                  <img
                    src={selectedDoctor.photo}
                    alt={selectedDoctor.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{selectedDoctor.name}</p>
                    <p className="text-sm text-gray-600">{selectedDoctor.designation}</p>
                    <p className="text-sm text-purple-600 mt-1">
                      Available: {selectedDoctor.timings.weekdays}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <Button
              onClick={() => setStep(2)}
              disabled={!formData.doctorId}
              variant="primary"
              size="lg"
              className="w-full"
            >
              Next: Pick Date & Time
            </Button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Step 2: Pick Date & Time</h3>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Preferred Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleInputChange}
                min={today}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Preferred Time Slot <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {availableSlots[0]?.slots.slice(0, 12).map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, appointmentTime: slot }))}
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                      formData.appointmentTime === slot
                        ? 'bg-purple-600 text-white border-purple-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-purple-500'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex space-x-4">
              <Button onClick={() => setStep(1)} variant="outline" size="lg" className="flex-1">
                Back
              </Button>
              <Button
                onClick={() => setStep(3)}
                disabled={!formData.appointmentDate || !formData.appointmentTime}
                variant="primary"
                size="lg"
                className="flex-1"
              >
                Next: Patient Details
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Step 3: Patient Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Patient Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter full name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Age <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="+91-XXXXXXXXXX"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Chief Complaint <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="chiefComplaint"
                  value={formData.chiefComplaint}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Please describe your health concern briefly"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="returningPatient"
                  checked={formData.returningPatient}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                />
                <label className="text-sm text-gray-700">
                  I have consulted this doctor before
                </label>
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
              <Button onClick={() => setStep(2)} variant="outline" size="lg" className="flex-1">
                Back
              </Button>
              <Button
                onClick={() => setStep(4)}
                disabled={!formData.patientName || !formData.gender || !formData.age || !formData.phone || !formData.chiefComplaint}
                variant="primary"
                size="lg"
                className="flex-1"
              >
                Next: Confirm
              </Button>
            </div>
          </div>
        )}

        {step === 4 && selectedDoctor && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Step 4: Confirmation</h3>
            <div className="bg-gray-50 rounded-lg p-6 space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Doctor:</span>
                <span className="font-semibold text-gray-900">{selectedDoctor.name} ({selectedDoctor.specialty})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-semibold text-gray-900">{formData.appointmentDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time:</span>
                <span className="font-semibold text-gray-900">{formData.appointmentTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Type:</span>
                <span className="font-semibold text-gray-900">{type === 'teleconsult' ? 'Video Call' : 'In-Clinic Visit'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Fee:</span>
                <span className="font-semibold text-purple-600 text-lg">₹{fee}</span>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button onClick={() => setStep(3)} variant="outline" size="lg" className="flex-1">
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                variant="accent"
                size="lg"
                className="flex-1"
              >
                {isSubmitting ? 'Booking...' : 'Confirm Booking'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
