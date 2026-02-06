-- ============================================================================
-- Row Level Security (RLS) Policies for Facility Platform
-- ============================================================================
-- UPDATED: 2026-02-06
-- This file reflects the actual deployed RLS policies in production
-- Uses the new auth_user_id columns and helper functions
-- ============================================================================

-- ============================================================================
-- HELPER FUNCTIONS (Already deployed)
-- ============================================================================

-- get_employee_id() - Returns employee.id for current authenticated user
-- get_guard_id() - Returns security_guards.id for current authenticated guard  
-- get_resident_id() - Returns residents.id for current authenticated resident
-- is_guard() - Returns true if current user is a security guard
-- is_resident() - Returns true if current user is a resident
-- is_employee() - Returns true if current user is linked to an employee record
-- has_role(role_name) - Returns true if user has the specified role
-- get_user_role() - Returns the user's role name from the users table

-- ============================================================================
-- 1. EMPLOYEES - Base employee data
-- ============================================================================

-- Employees can view their own record
-- "Employees can view their own record" ON employees FOR SELECT
-- USING (auth_user_id = auth.uid());

-- Employees can update limited fields on their own record
-- "Employees can update their own record" ON employees FOR UPDATE
-- USING (auth_user_id = auth.uid()) WITH CHECK (auth_user_id = auth.uid());

-- Guards can view other employees (for lookups)
-- "Guards can view employees" ON employees FOR SELECT
-- USING (is_guard());

-- Supervisors and managers can view all employees
-- "Supervisors can view all employees" ON employees FOR SELECT
-- USING (has_role('admin') OR has_role('security_supervisor') OR has_role('society_manager') OR has_role('company_hod'));

-- Admins can fully manage employees
-- "Admins can manage employees" ON employees FOR ALL
-- USING (has_role('admin'));

-- ============================================================================
-- 2. SECURITY GUARDS - Guard-specific data
-- ============================================================================

-- Guards can view their own record using get_guard_id()
-- "Guards can view their own record" ON security_guards FOR SELECT
-- USING (id = get_guard_id());

-- Guards can update their own record
-- "Guards can update their own record" ON security_guards FOR UPDATE
-- USING (id = get_guard_id()) WITH CHECK (id = get_guard_id());

-- Supervisors and admins can view all guards
-- "Supervisors can view all guards" ON security_guards FOR SELECT
-- USING (has_role('admin') OR has_role('security_supervisor') OR has_role('society_manager'));

-- Admins can manage all guard records
-- "Admins can manage guards" ON security_guards FOR ALL
-- USING (has_role('admin'));

-- ============================================================================
-- 3. PANIC ALERTS - Emergency alert management
-- ============================================================================

-- Guards can only insert alerts for themselves
-- "Guards can insert their own panic alerts" ON panic_alerts FOR INSERT
-- WITH CHECK (guard_id = get_guard_id());

-- Guards can view their own alerts
-- "Guards can view their own panic alerts" ON panic_alerts FOR SELECT
-- USING (guard_id = get_guard_id());

-- Supervisors, managers, and admins can view all alerts
-- "Supervisors can view all panic alerts" ON panic_alerts FOR SELECT
-- USING (has_role('admin') OR has_role('security_supervisor') OR has_role('society_manager'));

-- Supervisors and managers can resolve alerts
-- "Supervisors can resolve panic alerts" ON panic_alerts FOR UPDATE
-- USING (has_role('admin') OR has_role('security_supervisor') OR has_role('society_manager'));

-- ============================================================================
-- 4. RESIDENTS - Resident data
-- ============================================================================

-- Residents can view their own record using auth_user_id
-- "Residents can view their own record" ON residents FOR SELECT
-- USING (auth_user_id = auth.uid());

-- Residents can update their own record
-- "Residents can update their own record" ON residents FOR UPDATE
-- USING (auth_user_id = auth.uid()) WITH CHECK (auth_user_id = auth.uid());

-- Guards can view residents (for visitor verification)
-- "Guards can view residents" ON residents FOR SELECT
-- USING (is_guard());

-- Supervisors and managers can view all residents
-- "Supervisors can view all residents" ON residents FOR SELECT
-- USING (has_role('admin') OR has_role('security_supervisor') OR has_role('society_manager'));

-- Admins can manage all resident records
-- "Admins can manage residents" ON residents FOR ALL
-- USING (has_role('admin'));

-- ============================================================================
-- 5. VISITORS - Visitor management
-- ============================================================================

-- Residents can view visitors to their flat
-- "Residents can view their flat visitors" ON visitors FOR SELECT
-- USING (flat_id IN (SELECT flat_id FROM residents WHERE auth_user_id = auth.uid()));

-- Residents can invite visitors (pre-approve)
-- "Residents can invite visitors" ON visitors FOR INSERT
-- WITH CHECK (flat_id IN (SELECT flat_id FROM residents WHERE auth_user_id = auth.uid()) AND approved_by_resident = true);

-- Guards can view all visitors
-- "Guards can view all visitors" ON visitors FOR SELECT
-- USING (is_guard());

-- Guards can insert new visitors (walk-ins)
-- "Guards can check in visitors" ON visitors FOR INSERT
-- WITH CHECK (is_guard());

-- Guards can update visitors (check-in/check-out)
-- "Guards can update visitors" ON visitors FOR UPDATE
-- USING (is_guard());

-- Supervisors and managers can view all visitors
-- "Supervisors can view all visitors" ON visitors FOR SELECT
-- USING (has_role('admin') OR has_role('security_supervisor') OR has_role('society_manager'));

-- Admins can manage all visitor records
-- "Admins can manage visitors" ON visitors FOR ALL
-- USING (has_role('admin'));

-- ============================================================================
-- 6. ATTENDANCE LOGS - Employee attendance
-- ============================================================================

-- Employees can view their own attendance
-- "Employees can view their own attendance" ON attendance_logs FOR SELECT
-- USING (employee_id = get_employee_id());

-- Employees can insert their own attendance
-- "Employees can clock in" ON attendance_logs FOR INSERT
-- WITH CHECK (employee_id = get_employee_id());

-- Employees can update their own attendance (clock out)
-- "Employees can update their own attendance" ON attendance_logs FOR UPDATE
-- USING (employee_id = get_employee_id()) WITH CHECK (employee_id = get_employee_id());

-- Supervisors and managers can view all attendance
-- "Supervisors can view all attendance" ON attendance_logs FOR SELECT
-- USING (has_role('admin') OR has_role('security_supervisor') OR has_role('society_manager'));

-- ============================================================================
-- 7. GPS TRACKING - Location tracking for guards
-- ============================================================================

-- Note: GPS tracking employee_id references security_guards(id), not employees(id)
-- This is a known schema issue that may need migration

-- Guards can insert their own GPS data
-- "Guards can insert their own GPS data" ON gps_tracking FOR INSERT
-- WITH CHECK (employee_id = get_guard_id());

-- Guards can view their own GPS history
-- "Guards can view their own GPS history" ON gps_tracking FOR SELECT
-- USING (employee_id = get_guard_id());

-- Supervisors and managers can view all GPS data
-- "Supervisors can view all GPS data" ON gps_tracking FOR SELECT
-- USING (has_role('admin') OR has_role('security_supervisor') OR has_role('society_manager'));

-- ============================================================================
-- 8. STORAGE - Visitor Photos (If bucket exists)
-- ============================================================================

-- Authenticated users can view visitor photos
-- CREATE POLICY "Authenticated users can view visitor photos"
-- ON storage.objects FOR SELECT
-- USING (bucket_id = 'visitor-photos' AND auth.role() = 'authenticated');

-- Guards and service role can upload visitor photos
-- CREATE POLICY "Guards can upload visitor photos"
-- ON storage.objects FOR INSERT
-- WITH CHECK (bucket_id = 'visitor-photos' AND (auth.role() = 'service_role' OR is_guard()));

-- ============================================================================
-- DEPLOYMENT NOTES
-- ============================================================================

/*
SCHEMA CHANGES APPLIED (2026-02-06):

1. Added employees.auth_user_id (UUID, UNIQUE, FK to auth.users)
2. Added residents.auth_user_id (UUID, UNIQUE, FK to auth.users)
3. Fixed panic_alerts.resolved_by to reference employees(id) instead of auth.users(id)
4. Created helper functions using the new auth_user_id columns
5. Added GPS tracking partitions through December 2026
6. Recreated all RLS policies to use new helper functions

KNOWN ISSUE:
- gps_tracking.employee_id still references security_guards(id) instead of employees(id)
- Column name is misleading but functionality works with get_guard_id()

TESTING:
To test policies, temporarily set request.jwt.claims in SQL:
  SELECT set_config('request.jwt.claims', '{"sub": "user-uuid-here"}', true);
  
Then query tables to verify access.
*/
