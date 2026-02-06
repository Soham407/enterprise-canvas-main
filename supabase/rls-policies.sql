-- ============================================================================
-- Row Level Security (RLS) Policies for Facility Platform
-- ============================================================================
-- This file contains recommended RLS policies to secure the application
-- Run these after enabling RLS on each table
-- ============================================================================

-- ============================================================================
-- 1. PANIC ALERTS - Prevent Impersonation
-- ============================================================================

-- Enable RLS on panic_alerts table
ALTER TABLE panic_alerts ENABLE ROW LEVEL SECURITY;

-- Guards can only insert alerts for themselves
CREATE POLICY "Guards can insert their own panic alerts"
ON panic_alerts FOR INSERT
WITH CHECK (
  guard_id IN (
    SELECT id FROM security_guards WHERE employee_id = auth.uid()
  )
);

-- Guards can view their own alerts
CREATE POLICY "Guards can view their own panic alerts"
ON panic_alerts FOR SELECT
USING (
  guard_id IN (
    SELECT id FROM security_guards WHERE employee_id = auth.uid()
  )
);

-- Admins and supervisors can view all alerts
CREATE POLICY "Supervisors can view all panic alerts"
ON panic_alerts FOR SELECT
USING (
  auth.jwt() ->> 'role' IN ('admin', 'supervisor')
);

-- Supervisors can update/resolve alerts
CREATE POLICY "Supervisors can resolve panic alerts"
ON panic_alerts FOR UPDATE
USING (
  auth.jwt() ->> 'role' IN ('admin', 'supervisor')
);

-- ============================================================================
-- 2. SECURITY GUARDS - Protect Guard Data
-- ============================================================================

ALTER TABLE security_guards ENABLE ROW LEVEL SECURITY;

-- Guards can view their own record
CREATE POLICY "Guards can view their own record"
ON security_guards FOR SELECT
USING (employee_id = auth.uid());

-- Guards can update their own record (limited fields)
CREATE POLICY "Guards can update their own record"
ON security_guards FOR UPDATE
USING (employee_id = auth.uid())
WITH CHECK (employee_id = auth.uid());

-- Admins can view all guards
CREATE POLICY "Admins can view all guards"
ON security_guards FOR SELECT
USING (auth.jwt() ->> 'role' = 'admin');

-- Admins can insert/update/delete guards
CREATE POLICY "Admins can manage guards"
ON security_guards FOR ALL
USING (auth.jwt() ->> 'role' = 'admin');

-- ============================================================================
-- 3. RESIDENTS - Protect Resident Data
-- ============================================================================

ALTER TABLE residents ENABLE ROW LEVEL SECURITY;

-- Residents can view their own record
CREATE POLICY "Residents can view their own record"
ON residents FOR SELECT
USING (
  id = auth.uid() OR
  employee_id = auth.uid()
);

-- Residents can update their own record
CREATE POLICY "Residents can update their own record"
ON residents FOR UPDATE
USING (
  id = auth.uid() OR
  employee_id = auth.uid()
);

-- Guards can view residents (for visitor verification)
CREATE POLICY "Guards can view residents"
ON residents FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM security_guards WHERE employee_id = auth.uid()
  )
);

-- Admins can manage all residents
CREATE POLICY "Admins can manage residents"
ON residents FOR ALL
USING (auth.jwt() ->> 'role' = 'admin');

-- ============================================================================
-- 4. VISITORS - Secure Visitor Data
-- ============================================================================

ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;

-- Residents can view visitors to their flat
CREATE POLICY "Residents can view their flat visitors"
ON visitors FOR SELECT
USING (
  flat_id IN (
    SELECT flat_id FROM residents WHERE employee_id = auth.uid()
  )
);

-- Residents can insert visitors (pre-approve)
CREATE POLICY "Residents can invite visitors"
ON visitors FOR INSERT
WITH CHECK (
  flat_id IN (
    SELECT flat_id FROM residents WHERE employee_id = auth.uid()
  )
  AND approved_by_resident = true
);

-- Guards can view all visitors
CREATE POLICY "Guards can view all visitors"
ON visitors FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM security_guards WHERE employee_id = auth.uid()
  )
);

-- Guards can insert visitors (walk-ins)
CREATE POLICY "Guards can check in visitors"
ON visitors FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM security_guards WHERE employee_id = auth.uid()
  )
);

-- Guards can update visitors (check-in/check-out)
CREATE POLICY "Guards can update visitors"
ON visitors FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM security_guards WHERE employee_id = auth.uid()
  )
);

-- Admins can manage all visitors
CREATE POLICY "Admins can manage visitors"
ON visitors FOR ALL
USING (auth.jwt() ->> 'role' = 'admin');

-- ============================================================================
-- 5. ATTENDANCE LOGS - Secure Attendance Data
-- ============================================================================

ALTER TABLE attendance_logs ENABLE ROW LEVEL SECURITY;

-- Guards can view their own attendance
CREATE POLICY "Guards can view their own attendance"
ON attendance_logs FOR SELECT
USING (
  employee_id IN (
    SELECT employee_id FROM security_guards WHERE employee_id = auth.uid()
  )
);

-- Guards can insert their own attendance
CREATE POLICY "Guards can clock in/out"
ON attendance_logs FOR INSERT
WITH CHECK (
  employee_id = auth.uid()
);

-- Guards can update their own attendance (clock out)
CREATE POLICY "Guards can update their own attendance"
ON attendance_logs FOR UPDATE
USING (employee_id = auth.uid())
WITH CHECK (employee_id = auth.uid());

-- Admins can view all attendance
CREATE POLICY "Admins can view all attendance"
ON attendance_logs FOR SELECT
USING (auth.jwt() ->> 'role' = 'admin');

-- ============================================================================
-- 6. GPS TRACKING - Secure Location Data
-- ============================================================================

ALTER TABLE gps_tracking ENABLE ROW LEVEL SECURITY;

-- Guards can insert their own GPS data
CREATE POLICY "Guards can insert their own GPS data"
ON gps_tracking FOR INSERT
WITH CHECK (employee_id = auth.uid());

-- Guards can view their own GPS history
CREATE POLICY "Guards can view their own GPS history"
ON gps_tracking FOR SELECT
USING (employee_id = auth.uid());

-- Supervisors can view all GPS data
CREATE POLICY "Supervisors can view all GPS data"
ON gps_tracking FOR SELECT
USING (auth.jwt() ->> 'role' IN ('admin', 'supervisor'));

-- ============================================================================
-- 7. STORAGE - Visitor Photos
-- ============================================================================

-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Authenticated users can view visitor photos
CREATE POLICY "Authenticated users can view visitor photos"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'visitor-photos' 
  AND auth.role() = 'authenticated'
);

-- Guards and service role can upload visitor photos
CREATE POLICY "Guards can upload visitor photos"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'visitor-photos'
  AND (
    auth.role() = 'service_role' OR
    EXISTS (SELECT 1 FROM security_guards WHERE employee_id = auth.uid())
  )
);

-- Only service role can delete photos (for admin cleanup)
CREATE POLICY "Service role can delete visitor photos"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'visitor-photos'
  AND auth.role() = 'service_role'
);

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Function to check if user is a guard
CREATE OR REPLACE FUNCTION is_guard()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM security_guards WHERE employee_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user is a resident
CREATE OR REPLACE FUNCTION is_resident()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM residents WHERE employee_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user's guard_id
CREATE OR REPLACE FUNCTION get_guard_id()
RETURNS UUID AS $$
BEGIN
  RETURN (
    SELECT id FROM security_guards WHERE employee_id = auth.uid() LIMIT 1
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user's resident_id
CREATE OR REPLACE FUNCTION get_resident_id()
RETURNS UUID AS $$
BEGIN
  RETURN (
    SELECT id FROM residents WHERE employee_id = auth.uid() LIMIT 1
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- USAGE NOTES
-- ============================================================================

/*
1. Run this file in Supabase SQL Editor after your schema is created
2. Test each policy with different user roles
3. Adjust policies based on your specific requirements
4. Consider adding policies for other tables (flats, buildings, etc.)
5. Monitor policy performance and add indexes if needed

TESTING:
-- Test as guard
SELECT set_config('request.jwt.claims', '{"sub": "guard-user-id"}', true);
SELECT * FROM panic_alerts; -- Should only see own alerts

-- Test as admin
SELECT set_config('request.jwt.claims', '{"sub": "admin-user-id", "role": "admin"}', true);
SELECT * FROM panic_alerts; -- Should see all alerts

IMPORTANT:
- Always test policies before deploying to production
- Use service role only for admin operations
- Never expose service role key to client
- Implement additional application-level checks
*/
