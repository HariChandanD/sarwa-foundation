# Database Migrations Guide

This guide explains how to run all database migrations in the correct order.

## Prerequisites

- Supabase project created
- Environment variables configured in `.env.local`

## Migration Order

Run these migrations in order in the Supabase SQL Editor:

### 1. Initial Schema (Forms & Basic Tables)
**File:** `supabase/migrations/20260712_initial_schema.sql`

Creates:
- `volunteers` table
- `contact_messages` table
- `donations` table
- Basic RLS policies

### 2. Authentication Schema
**File:** `supabase/migrations/20260713_auth_schema.sql`

Creates:
- `user_profiles` table with roles (super_admin, admin, volunteer)
- `admin_invitations` table
- Automatic profile creation trigger
- RLS policies for authentication

### 3. Super Admin Schema
**File:** `supabase/migrations/20260713_super_admin_schema.sql`

Creates:
- Super admin specific policies
- Admin management functions

### 4. Volunteer Applications
**File:** `supabase/migrations/20260713_volunteer_applications.sql`

Creates:
- `volunteer_applications` table
- Application workflow (pending/approved/rejected)
- RLS policies for volunteers and admins

### 5. Settings and Activity Logs
**File:** `supabase/migrations/20260713_settings_and_activity_logs.sql`

Creates:
- `activity_logs` table for audit trail
- `site_settings` table
- RLS policies

### 6. CMS Content Schema
**File:** `supabase/migrations/20260713_cms_content_schema.sql`

Creates:
- `homepage_hero` table
- `about_content` table
- `programs` table
- `rescue_stories` table
- `gallery_albums` and `gallery_media` tables
- `events` table
- `news_articles` table
- `contact_info` table
- `donation_settings` table
- `footer_content` table
- Public read and admin write RLS policies

### 7. Fix CMS RLS Policies (CRITICAL)
**File:** `supabase/migrations/20260714_fix_cms_rls_policies.sql`

Fixes:
- Adds explicit SELECT policies for admins
- Allows admins to view all content (including inactive/draft)
- Required for CMS pages to load correctly

## How to Run Migrations

1. Open Supabase Dashboard
2. Go to **SQL Editor**
3. Click **New Query**
4. Copy the entire contents of the migration file
5. Paste into the SQL editor
6. Click **Run**
7. Verify no errors appear
8. Repeat for the next migration

## Verification

After running all migrations, verify:

```sql
-- Check all tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Check RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';
```

## Troubleshooting

### "relation already exists" error
- This is normal if you're re-running a migration
- The migration uses `CREATE TABLE IF NOT EXISTS`
- Safe to ignore

### "policy already exists" error
- Drop the old policy first:
  ```sql
  DROP POLICY IF EXISTS "policy_name" ON table_name;
  ```
- Then re-run the migration

### CMS pages show "Failed to load"
- Ensure migration #7 (Fix CMS RLS Policies) has been run
- Check that your user has admin or super_admin role in `user_profiles`

### Volunteer application fails
- Ensure migration #4 (Volunteer Applications) has been run
- Check RLS policies allow public INSERT

## Made with Bob