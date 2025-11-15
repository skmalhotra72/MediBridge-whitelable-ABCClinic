# Database Setup Instructions

## Issue
The Supabase database tables have not been created yet. You need to manually apply the migrations.

## Steps to Fix

### 1. Open Supabase SQL Editor
Go to: https://supabase.com/dashboard/project/dnbylyvwgeivjgpxgudu/sql/new

### 2. Apply Migration 1 - Create Tables

Copy and paste the entire contents from:
`supabase/migrations/20251030075208_create_abc_clinic_schema.sql`

Then click **RUN** to execute.

This will create three tables:
- `prescription_uploads`
- `appointments`
- `diagnostic_bookings`

### 3. Apply Migration 2 - Update Security Policies

Copy and paste the entire contents from:
`supabase/migrations/20251115000000_update_rls_policies.sql`

Then click **RUN** to execute.

This will update the Row Level Security (RLS) policies to allow your admin panel to access the data.

### 4. Verify Tables Were Created

Run this SQL query to verify:

```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;
```

You should see:
- appointments
- diagnostic_bookings
- prescription_uploads

### 5. Test the Application

Once the migrations are applied:
1. Refresh your application
2. Try submitting a test form (appointment, prescription, or diagnostic booking)
3. Log into the admin panel (username: `Clinic_Admin`, password: `ABC@clinic`)
4. You should now see the submitted data

## Connection Details

- **Supabase URL**: https://dnbylyvwgeivjgpxgudu.supabase.co
- **Project Reference**: dnbylyvwgeivjgpxgudu
- **Dashboard**: https://supabase.com/dashboard/project/dnbylyvwgeivjgpxgudu

## Why This Happened

The Supabase MCP tools encountered an issue creating the tables automatically. This is why we need to apply the migrations manually through the Supabase dashboard.

## Important Note on Security

The current RLS policies allow anyone with the `anon` key to read/write data. This is necessary for the custom admin authentication to work. In a production environment, you should:

1. Implement proper Supabase Auth for admin users
2. Use more restrictive RLS policies
3. Consider using the service role key for admin operations
