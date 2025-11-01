import React, { useState } from 'react';
import { FileText, Camera, Mic, Upload, CheckCircle, Lock } from 'lucide-react';
import { Button } from './Button';
import { Modal } from './Modal';
import { supabase } from '../lib/supabase';

interface PrescriptionUploadProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrescriptionUpload: React.FC<PrescriptionUploadProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    patientName: '',
    gender: '',
    age: '',
    phone: '',
    primaryQuestion: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [uploadMethod, setUploadMethod] = useState<'pdf' | 'photo' | 'voice' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const fileType = file ? file.type : uploadMethod || 'none';

      const { error } = await supabase.from('prescription_uploads').insert([
        {
          patient_name: formData.patientName,
          gender: formData.gender,
          age: parseInt(formData.age),
          phone: formData.phone,
          primary_question: formData.primaryQuestion,
          file_url: file ? URL.createObjectURL(file) : null,
          file_type: fileType,
          status: 'new',
        },
      ]);

      if (error) throw error;

      setShowSuccess(true);
      setFormData({ patientName: '', gender: '', age: '', phone: '', primaryQuestion: '' });
      setFile(null);
      setUploadMethod(null);

      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 5000);
    } catch (error) {
      console.error('Error submitting prescription:', error);
      alert('Failed to submit prescription. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Prescription Received!" size="md">
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Thank you, {formData.patientName}!
          </h3>
          <p className="text-gray-600 mb-6">
            We've received your prescription successfully.
          </p>
          <div className="bg-purple-50 rounded-lg p-6 text-left mb-6">
            <p className="text-gray-700 mb-4">
              Our AI assistant will contact you shortly on WhatsApp to:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                Explain your medicines in simple terms
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                Answer your questions
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                Help you book any required tests
              </li>
            </ul>
          </div>
          <div className="text-sm text-gray-600">
            <p className="mb-2">You can also reach us:</p>
            <p className="font-semibold">+91-9876543210</p>
            <p>care@abcdoctorclinic.com</p>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Have a Prescription? Upload It Now" size="lg">
      <div className="mb-6">
        <p className="text-gray-600 text-center">
          Our AI assistant will help you understand your medicines, book tests, and answer your
          questions - all in your language.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <label className="cursor-pointer">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
          />
          <div
            className={`border-2 rounded-xl p-6 text-center transition-all hover:border-purple-500 hover:shadow-md ${
              uploadMethod === 'pdf' ? 'border-purple-500 bg-purple-50' : 'border-gray-300'
            }`}
            onClick={() => setUploadMethod('pdf')}
          >
            <FileText className="w-12 h-12 mx-auto mb-3 text-purple-600" />
            <h3 className="font-semibold text-gray-900 mb-1">Upload PDF</h3>
            <p className="text-sm text-gray-600">Select PDF file</p>
          </div>
        </label>

        <label className="cursor-pointer">
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
            className="hidden"
          />
          <div
            className={`border-2 rounded-xl p-6 text-center transition-all hover:border-purple-500 hover:shadow-md ${
              uploadMethod === 'photo' ? 'border-purple-500 bg-purple-50' : 'border-gray-300'
            }`}
            onClick={() => setUploadMethod('photo')}
          >
            <Camera className="w-12 h-12 mx-auto mb-3 text-purple-600" />
            <h3 className="font-semibold text-gray-900 mb-1">Take Photo</h3>
            <p className="text-sm text-gray-600">Use camera</p>
          </div>
        </label>

        <div
          className={`border-2 rounded-xl p-6 text-center cursor-pointer transition-all hover:border-purple-500 hover:shadow-md ${
            uploadMethod === 'voice' ? 'border-purple-500 bg-purple-50' : 'border-gray-300'
          }`}
          onClick={() => setUploadMethod('voice')}
        >
          <Mic className="w-12 h-12 mx-auto mb-3 text-purple-600" />
          <h3 className="font-semibold text-gray-900 mb-1">Voice Note</h3>
          <p className="text-sm text-gray-600">Record audio</p>
        </div>
      </div>

      {file && (
        <div className="mb-6 p-4 bg-purple-50 rounded-lg flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Upload className="w-5 h-5 text-purple-600" />
            <span className="text-sm text-gray-700">{file.name}</span>
          </div>
          <button
            onClick={() => setFile(null)}
            className="text-red-600 hover:text-red-700 text-sm font-medium"
          >
            Remove
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter full name"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Select gender</option>
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
              min="1"
              max="120"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter age"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-4 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-gray-700">
              +91
            </span>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              pattern="[0-9]{10}"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="10-digit mobile number"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Primary Question
          </label>
          <textarea
            name="primaryQuestion"
            value={formData.primaryQuestion}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="What would you like to know about your prescription?"
          />
        </div>

        <div className="flex items-center space-x-2 text-sm text-gray-600 bg-gray-50 rounded-lg p-4">
          <Lock className="w-4 h-4 text-purple-600" />
          <span>Your health data is secure and confidential. Powered by MediBridge AI.</span>
        </div>

        <div className="flex space-x-4">
          <Button
            type="button"
            onClick={onClose}
            variant="outline"
            size="lg"
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="accent"
            size="lg"
            className="flex-1"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Prescription'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
