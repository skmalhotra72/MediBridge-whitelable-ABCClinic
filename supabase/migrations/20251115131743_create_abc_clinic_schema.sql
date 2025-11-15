/*
  # ABC Doctor Clinic Database Schema

  1. New Tables
    - `prescription_uploads`
      - `id` (uuid, primary key)
      - `patient_name` (text)
      - `gender` (text)
      - `age` (integer)
      - `phone` (text)
      - `primary_question` (text)
      - `file_url` (text)
      - `file_type` (text)
      - `status` (text: new, in_progress, completed)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `appointments`
      - `id` (uuid, primary key)
      - `booking_id` (text, unique)
      - `appointment_type` (text: teleconsult, in_clinic)
      - `doctor_name` (text)
      - `doctor_specialty` (text)
      - `patient_name` (text)
      - `gender` (text)
      - `age` (integer)
      - `phone` (text)
      - `email` (text)
      - `appointment_date` (date)
      - `appointment_time` (text)
      - `chief_complaint` (text)
      - `returning_patient` (boolean)
      - `fee` (integer)
      - `status` (text: confirmed, completed, cancelled)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `diagnostic_bookings`
      - `id` (uuid, primary key)
      - `booking_id` (text, unique)
      - `patient_name` (text)
      - `gender` (text)
      - `age` (integer)
      - `phone` (text)
      - `email` (text)
      - `has_prescription` (boolean)
      - `prescription_url` (text)
      - `tests_requested` (text)
      - `selected_packages` (text[])
      - `collection_type` (text: home, lab)
      - `collection_address` (text)
      - `collection_landmark` (text)
      - `preferred_date` (date)
      - `preferred_time` (text)
      - `special_instructions` (text)
      - `estimated_cost` (integer)
      - `status` (text: confirmed, completed, cancelled)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Public can insert (for patient submissions)
    - Anonymous users can view/update/delete (for custom admin auth)
*/

-- Create prescription_uploads table
CREATE TABLE IF NOT EXISTS prescription_uploads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_name text NOT NULL,
  gender text NOT NULL,
  age integer NOT NULL,
  phone text NOT NULL,
  primary_question text,
  file_url text,
  file_type text,
  status text DEFAULT 'new' NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id text UNIQUE NOT NULL,
  appointment_type text NOT NULL,
  doctor_name text NOT NULL,
  doctor_specialty text NOT NULL,
  patient_name text NOT NULL,
  gender text NOT NULL,
  age integer NOT NULL,
  phone text NOT NULL,
  email text,
  appointment_date date NOT NULL,
  appointment_time text NOT NULL,
  chief_complaint text NOT NULL,
  returning_patient boolean DEFAULT false,
  fee integer NOT NULL,
  status text DEFAULT 'confirmed' NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create diagnostic_bookings table
CREATE TABLE IF NOT EXISTS diagnostic_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id text UNIQUE NOT NULL,
  patient_name text NOT NULL,
  gender text NOT NULL,
  age integer NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  has_prescription boolean DEFAULT false,
  prescription_url text,
  tests_requested text,
  selected_packages text[],
  collection_type text NOT NULL,
  collection_address text,
  collection_landmark text,
  preferred_date date NOT NULL,
  preferred_time text NOT NULL,
  special_instructions text,
  estimated_cost integer,
  status text DEFAULT 'confirmed' NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE prescription_uploads ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE diagnostic_bookings ENABLE ROW LEVEL SECURITY;

-- Policies for prescription_uploads (allow anon access for custom admin auth)
CREATE POLICY "Anyone can insert prescriptions"
  ON prescription_uploads FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can view prescriptions"
  ON prescription_uploads FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can update prescriptions"
  ON prescription_uploads FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete prescriptions"
  ON prescription_uploads FOR DELETE
  TO anon
  USING (true);

-- Policies for appointments (allow anon access for custom admin auth)
CREATE POLICY "Anyone can insert appointments"
  ON appointments FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can view appointments"
  ON appointments FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can update appointments"
  ON appointments FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete appointments"
  ON appointments FOR DELETE
  TO anon
  USING (true);

-- Policies for diagnostic_bookings (allow anon access for custom admin auth)
CREATE POLICY "Anyone can insert diagnostic bookings"
  ON diagnostic_bookings FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can view diagnostic bookings"
  ON diagnostic_bookings FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can update diagnostic bookings"
  ON diagnostic_bookings FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete diagnostic bookings"
  ON diagnostic_bookings FOR DELETE
  TO anon
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_prescriptions_status ON prescription_uploads(status);
CREATE INDEX IF NOT EXISTS idx_prescriptions_created ON prescription_uploads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_appointments_created ON appointments(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_diagnostic_date ON diagnostic_bookings(preferred_date);
CREATE INDEX IF NOT EXISTS idx_diagnostic_status ON diagnostic_bookings(status);
CREATE INDEX IF NOT EXISTS idx_diagnostic_created ON diagnostic_bookings(created_at DESC);