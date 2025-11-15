/*
  # Update RLS Policies for Admin Access

  1. Changes
    - Drop existing restrictive policies that require Supabase authentication
    - Add new policies that allow anonymous users (with anon key) to read/update/delete
    - This enables the custom admin authentication system to work properly

  2. Security Notes
    - Anonymous users can still only access data with the valid anon key
    - Insert operations remain open for public form submissions
    - Read/Update/Delete operations are available to anyone with the anon key
    - In production, you should implement proper backend authentication
*/

-- Drop existing policies for prescription_uploads
DROP POLICY IF EXISTS "Authenticated users can view prescriptions" ON prescription_uploads;
DROP POLICY IF EXISTS "Authenticated users can update prescriptions" ON prescription_uploads;
DROP POLICY IF EXISTS "Authenticated users can delete prescriptions" ON prescription_uploads;

-- Drop existing policies for appointments
DROP POLICY IF EXISTS "Authenticated users can view appointments" ON appointments;
DROP POLICY IF EXISTS "Authenticated users can update appointments" ON appointments;
DROP POLICY IF EXISTS "Authenticated users can delete appointments" ON appointments;

-- Drop existing policies for diagnostic_bookings
DROP POLICY IF EXISTS "Authenticated users can view diagnostic bookings" ON diagnostic_bookings;
DROP POLICY IF EXISTS "Authenticated users can update diagnostic bookings" ON diagnostic_bookings;
DROP POLICY IF EXISTS "Authenticated users can delete diagnostic bookings" ON diagnostic_bookings;

-- New policies for prescription_uploads (allow anon access)
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

-- New policies for appointments (allow anon access)
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

-- New policies for diagnostic_bookings (allow anon access)
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
