import { GuardDashboard } from "@/components/dashboards/GuardDashboard";

export default function TestGuardPage() {
  return (
    <div className="p-6">
      <div className="mb-6 p-4 bg-warning/10 border-l-4 border-warning rounded">
        <h2 className="text-lg font-bold text-warning mb-2">🧪 Guard Dashboard Test Page</h2>
        <div className="text-sm space-y-1">
          <p><strong>Test Checklist:</strong></p>
          <ul className="list-disc list-inside ml-2 space-y-1 text-muted-foreground">
            <li>✓ Clock In button should be disabled if GPS is out of range</li>
            <li>✓ GPS status should show your current distance from gate</li>
            <li>✓ Visitor statistics should display counts</li>
            <li>✓ Attendance times should show correctly</li>
          </ul>
          <p className="mt-3 text-xs">
            <strong>Note:</strong> This uses MOCK_EMPLOYEE_ID. In production, this will use auth context.
          </p>
        </div>
      </div>
      <GuardDashboard />
    </div>
  );
}
