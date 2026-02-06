import { ResidentDashboard } from "@/components/dashboards/ResidentDashboard";

export default function TestResidentPage() {
  return (
    <div className="p-6">
      <div className="mb-6 p-4 bg-info/10 border-l-4 border-info rounded">
        <h2 className="text-lg font-bold text-info mb-2">🧪 Resident Dashboard Test Page</h2>
        <div className="text-sm space-y-1">
          <p><strong>Test Checklist:</strong></p>
          <ul className="list-disc list-inside ml-2 space-y-1 text-muted-foreground">
            <li>✓ Flat details (number, building, floor) should display</li>
            <li>✓ "Invite Visitor" form should open and submit successfully</li>
            <li>✓ Recent Activity should show visitors for this flat only</li>
            <li>✓ Check Supabase visitors table for new entries</li>
          </ul>
          <p className="mt-3 text-xs">
            <strong>Note:</strong> This uses MOCK_RESIDENT_ID. Verify in useResident hook.
          </p>
        </div>
      </div>
      <ResidentDashboard />
    </div>
  );
}
