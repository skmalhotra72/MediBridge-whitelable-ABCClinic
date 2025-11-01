import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Heart } from 'lucide-react';
import { clinicConfig } from '../config/clinic';
import { Button } from './Button';

interface HeaderProps {
  onUploadPrescription: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onUploadPrescription }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/90 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 via-lavender-400 to-purple-500 rounded-xl flex items-center justify-center shadow-md">
              <Heart className="w-6 h-6 text-white" fill="currentColor" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">{clinicConfig.name}</h1>
              <p className="text-xs text-gray-500 hidden sm:block">{clinicConfig.tagline}</p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('doctors')}
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors text-sm"
            >
              Our Doctors
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors text-sm"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors text-sm"
            >
              Contact Us
            </button>
            <a
              href="/admin"
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              Admin
            </a>
          </nav>

          <div className="hidden lg:flex items-center space-x-3">
            <a
              href={`tel:${clinicConfig.contact.phone}`}
              className="flex items-center space-x-2 text-purple-700 hover:text-purple-800 font-medium text-sm"
            >
              <Phone className="w-4 h-4" />
              <span>{clinicConfig.contact.phone}</span>
            </a>
            <Button onClick={onUploadPrescription} variant="accent" size="sm">
              Upload Prescription
            </Button>
          </div>

          <button
            className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-4 space-y-2">
            <button
              onClick={() => scrollToSection('doctors')}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-purple-50 rounded-lg transition-colors"
            >
              Our Doctors
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-purple-50 rounded-lg transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-purple-50 rounded-lg transition-colors"
            >
              Contact Us
            </button>
            <a
              href="/admin"
              className="block w-full text-left px-4 py-2 text-gray-500 hover:bg-purple-50 rounded-lg transition-colors"
            >
              Admin
            </a>
            <div className="pt-2 space-y-2">
              <a
                href={`tel:${clinicConfig.contact.phone}`}
                className="flex items-center justify-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium"
              >
                <Phone className="w-4 h-4" />
                <span>Call Now</span>
              </a>
              <Button onClick={onUploadPrescription} variant="accent" size="sm" className="w-full">
                Upload Prescription
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
