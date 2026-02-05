# AddVisitorForm Implementation Guide

## Overview

The `AddVisitorForm` component has been successfully implemented with the complete visitor check-in logic as requested.

## Features Implemented

### 1. Gate ID Resolution

- Fetches the gate ID from `company_locations` table using `MAIN_GATE_CODE` constant
- Stores the resolved gate ID as `entry_location_id` in the visitor record

### 2. Photo Upload

- Camera access with live video preview
- Capture and retake functionality
- Converts base64 image to Blob
- Uploads to Supabase Storage `visitor-photos` bucket
- Retrieves and stores the public URL
- Graceful error handling if photo upload fails

### 3. Visitor Record Insertion

- Inserts into `visitors` table with all required fields:
  - `visitor_name` - from form input
  - `phone` - from form input
  - `vehicle_number` - optional field from form
  - `visitor_type` - selected from dropdown (guest, vendor, contractor, service_staff)
  - `flat_id` - selected from dynamically loaded flats list
  - `entry_location_id` - resolved gate ID from step 1
  - `photo_url` - from step 2 (if photo was taken)
  - `entry_guard_id` - currently using dummy UUID (TODO: fetch current user)
  - `entry_time` - current timestamp

### 4. Error Handling

- Comprehensive try-catch blocks for all async operations
- User-friendly error messages via toast notifications
- Graceful degradation if photo upload fails (continues with check-in)
- Loading states during submission

### 5. UX Enhancements

- Form validation for required fields
- Success toast notification on completion
- Form reset after successful submission
- Loading state with spinner during submission
- Camera controls (start, capture, retake, cancel)
- Flats loaded with building names for easy identification

## Usage Example

### Basic Integration in Dialog

```tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddVisitorForm } from "@/components/forms/AddVisitorForm";
import { UserPlus } from "lucide-react";

export function VisitorCheckInDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" />
          Quick Entry
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Visitor Check-In</DialogTitle>
          <DialogDescription>
            Register a new visitor entering the premises
          </DialogDescription>
        </DialogHeader>
        <AddVisitorForm
          onSuccess={() => {
            setOpen(false);
            // Optionally refresh visitor list here
          }}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
```

## Required Setup

### 1. Supabase Storage Bucket

Create a storage bucket named `visitor-photos`:

```sql
-- In Supabase SQL Editor
insert into storage.buckets (id, name, public)
values ('visitor-photos', 'visitor-photos', true);

-- Set up RLS policies
create policy "Public read access"
on storage.objects for select
using ( bucket_id = 'visitor-photos' );

create policy "Authenticated users can upload"
on storage.objects for insert
with check (
  bucket_id = 'visitor-photos'
  AND auth.role() = 'authenticated'
);
```

### 2. Environment Variables

Ensure these are set in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Guard ID Integration (TODO)

Currently using a dummy UUID for `entry_guard_id`. To implement proper guard tracking:

```tsx
import { supabase } from "@/src/lib/supabaseClient";

// Get current logged-in guard
const {
  data: { user },
} = await supabase.auth.getUser();

// Query security_guards table
const { data: guardData } = await supabase
  .from("security_guards")
  .select("id")
  .eq("employee_id", user.id)
  .single();

const entryGuardId = guardData?.id || null;
```

## Form Fields

| Field          | Type         | Required | Description                              |
| -------------- | ------------ | -------- | ---------------------------------------- |
| Photo          | Camera/Image | No       | Visitor photo captured via device camera |
| Visitor Name   | Text         | Yes      | Full name of the visitor                 |
| Phone          | Tel          | Yes      | Contact number of the visitor            |
| Vehicle Number | Text         | No       | Vehicle registration number              |
| Visitor Type   | Select       | Yes      | guest, vendor, contractor, service_staff |
| Visiting Flat  | Select       | Yes      | Destination flat (loaded from DB)        |

## Dependencies

The form uses these UI components:

- `Button` - Action buttons
- `Input` - Text inputs
- `Label` - Form labels
- `Select` - Dropdown selections
- `useToast` - Toast notifications

All dependencies are already present in the project.

## Next Steps

1. **Integrate with Visitor Page**: Add the dialog to the visitors page.tsx
2. **Implement Guard Authentication**: Replace dummy UUID with actual guard ID
3. **Add Resident Approval**: Implement notification to resident for approval
4. **Real-time Updates**: Add real-time subscription to update visitor list
5. **Photo Validation**: Add image quality checks before upload
6. **Offline Support**: Handle offline mode with local storage queue

## Error Scenarios Handled

1. ✅ Gate location not found
2. ✅ Photo upload failure (continues without photo)
3. ✅ Database insertion errors
4. ✅ Camera access denied
5. ✅ Network failures
6. ✅ Validation errors
