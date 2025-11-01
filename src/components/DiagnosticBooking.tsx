import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { Modal } from './Modal';
import { Button } from './Button';
import { diagnosticPackages } from '../config/clinic';
import { supabase } from '../lib/supabase';

interface DiagnosticBookingProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DiagnosticBooking: React.FC<DiagnosticBookingProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    patientName: '',
    gender: '',
    age: '',
    phone: '',
    email: '',
    hasPrescription: false,
    testsRequested: '',
    selectedPackages: [] as string[],
    collectionType: 'lab',
    collectionAddress: '',
    collectionLandmark: '',
    preferredDate: '',
    preferredTime: '',
    specialInstructions: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [bookingId, setBookingId] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handlePackageToggle = (packageId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedPackages: prev.selectedPackages.includes(packageId)
        ? prev.selectedPackages.filter(id => id !== packageId)
        : [...prev.selectedPackages, packageId],
    }));
  };

  const calculateEstimatedCost = () => {
    const packageCost = formData.selectedPackages.reduce((total, pkgId) => {
      const pkg = diagnosticPackages.find(p => p.id === pkgId);
      return total + (pkg?.price || 0);
    }, 0);
    const collectionFee = formData.collectionType === 'home' ? 100 : 0;
    return packageCost + collectionFee;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newBookingId = `LAB${Date.now().toString().slice(-6)}`;

    try {
      const { error } = await supabase.from('diagnostic_bookings').insert([
        {
          booking_id: newBookingId,
          patient_name: formData.patientName,
          gender: formData.gender,
          age: parseInt(formData.age),
          phone: formData.phone,
          email: formData.email,
          has_prescription: formData.hasPrescription,
          tests_requested: formData.testsRequested,
          selected_packages: formData.selectedPackages,
          collection_type: formData.collectionType,
          collection_address: formData.collectionAddress,
          collection_landmark: formData.collectionLandmark,
          preferred_date: formData.preferredDate,
          preferred_time: formData.preferredTime,
          special_instructions: formData.specialInstructions,
          estimated_cost: calculateEstimatedCost(),
          status: 'confirmed',
        },
      ]);

      if (error) throw error;

      setBookingId(newBookingId);
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        onClose();
        setFormData({
          patientName: '',
          gender: '',
          age: '',
          phone: '',
          email: '',
          hasPrescription: false,
          testsRequested: '',
          selectedPackages: [],
          collectionType: 'lab',
          collectionAddress: '',
          collectionLandmark: '',
          preferredDate: '',
          preferredTime: '',
          specialInstructions: '',
        });
      }, 7000);
    } catch (error) {
      console.error('Error booking diagnostic test:', error);
      alert('Failed to book test. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Test Booking Confirmed!" size="md">
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Booking ID: #{bookingId}</h3>
          <p className="text-gray-600 mb-6">Dear {formData.patientName}, your diagnostic test booking is confirmed.</p>

          <div className="bg-gray-50 rounded-lg p-6 text-left mb-6 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span className="font-semibold">{formData.preferredDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Time:</span>
              <span className="font-semibold">{formData.preferredTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Location:</span>
              <span className="font-semibold">{formData.collectionType === 'home' ? 'Home Collection' : 'Lab Visit'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Estimated Cost:</span>
              <span className="font-semibold text-purple-600">₹{calculateEstimatedCost()}</span>
            </div>
          </div>

          <div className="bg-purple-50 rounded-lg p-4 text-left mb-6 text-sm">
            <p className="font-semibold mb-2">Preparation Guidelines:</p>
            <ul className="space-y-1 text-gray-700">
              <li>• 8-12 hour fasting required (for some tests)</li>
              <li>• Drink plenty of water</li>
              <li>• Continue regular medications unless advised</li>
            </ul>
          </div>

          <p className="text-sm text-gray-600 mb-4">
            Reports ready in 24-48 hours via email and WhatsApp
          </p>

          <Button onClick={onClose} variant="primary" size="lg" className="w-full">
            Close
          </Button>
        </div>
      </Modal>
    );
  }

  const today = new Date().toISOString().split('T')[0];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Book Diagnostic Tests" size="lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="flex items-center space-x-2 mb-4">
            <input
              type="checkbox"
              name="hasPrescription"
              checked={formData.hasPrescription}
              onChange={handleInputChange}
              className="w-4 h-4 text-purple-600 rounded"
            />
            <span className="text-sm font-semibold text-gray-700">I have a prescription</span>
          </label>

          {!formData.hasPrescription && (
            <>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tests Requested
              </label>
              <textarea
                name="testsRequested"
                value={formData.testsRequested}
                onChange={handleInputChange}
                rows={2}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., Complete Blood Count, Blood Sugar, Lipid Profile"
              />

              <div className="mt-4">
                <p className="text-sm font-semibold text-gray-700 mb-3">Popular Test Packages:</p>
                <div className="space-y-2">
                  {diagnosticPackages.map(pkg => (
                    <label key={pkg.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.selectedPackages.includes(pkg.id)}
                        onChange={() => handlePackageToggle(pkg.id)}
                        className="w-4 h-4 text-purple-600 rounded"
                      />
                      <span className="flex-1 text-sm text-gray-700">{pkg.name}</span>
                      <span className="text-sm font-semibold text-purple-600">₹{pkg.price}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Sample Collection <span className="text-red-500">*</span>
          </label>
          <div className="space-y-2">
            <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="collectionType"
                value="lab"
                checked={formData.collectionType === 'lab'}
                onChange={handleInputChange}
                className="w-4 h-4 text-purple-600"
              />
              <span className="text-sm text-gray-700">Visit Lab (Free)</span>
            </label>
            <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="collectionType"
                value="home"
                checked={formData.collectionType === 'home'}
                onChange={handleInputChange}
                className="w-4 h-4 text-purple-600"
              />
              <span className="text-sm text-gray-700">Home Collection (+₹100)</span>
            </label>
          </div>

          {formData.collectionType === 'home' && (
            <div className="mt-4 space-y-3">
              <input
                type="text"
                name="collectionAddress"
                value={formData.collectionAddress}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Full address"
              />
              <input
                type="text"
                name="collectionLandmark"
                value={formData.collectionLandmark}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Landmark (optional)"
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Preferred Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="preferredDate"
              value={formData.preferredDate}
              onChange={handleInputChange}
              min={today}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Preferred Time <span className="text-red-500">*</span>
            </label>
            <select
              name="preferredTime"
              value={formData.preferredTime}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select time</option>
              <option value="7-9 AM">7-9 AM</option>
              <option value="9-11 AM">9-11 AM</option>
              <option value="11 AM-1 PM">11 AM-1 PM</option>
              <option value="2-4 PM">2-4 PM</option>
              <option value="4-6 PM">4-6 PM</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleInputChange}
            required
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="Patient Name *"
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Gender *</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            required
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="Age *"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="Phone Number *"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="Email *"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Special Instructions
          </label>
          <textarea
            name="specialInstructions"
            value={formData.specialInstructions}
            onChange={handleInputChange}
            rows={2}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="Any fasting requirements or special notes"
          />
        </div>

        {(formData.selectedPackages.length > 0 || formData.collectionType === 'home') && (
          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-sm font-semibold text-gray-900">
              Estimated Cost: <span className="text-purple-600 text-lg">₹{calculateEstimatedCost()}</span>
            </p>
            <p className="text-xs text-gray-600 mt-1">Final amount may vary based on actual tests</p>
          </div>
        )}

        <div className="flex space-x-4">
          <Button type="button" onClick={onClose} variant="outline" size="lg" className="flex-1">
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting} variant="accent" size="lg" className="flex-1">
            {isSubmitting ? 'Booking...' : 'Confirm Booking'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
