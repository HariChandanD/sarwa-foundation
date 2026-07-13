# Supabase Authentication Setup Guide

This guide will help you set up Supabase authentication for the Admin Portal.

## Prerequisites

1. A Supabase account (sign up at https://supabase.com)
2. Node.js and npm installed
3. The project cloned and dependencies installed

## Step 1: Create a Supabase Project

1. Go to https://supabase.com and sign in
2. Click "New Project"
3. Fill in the project details:
   - **Name**: sarwa-animal-welfare (or your preferred name)
   - **Database Password**: Choose a strong password (save this!)
   - **Region**: Choose the closest region to your users
4. Click "Create new project" and wait for it to initialize (~2 minutes)

## Step 2: Get Your API Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (under "Project API keys")

## Step 3: Configure Environment Variables

1. In your project root, create a `.env.local` file (if it doesn't exist)
2. Add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

3. Replace the placeholder values with your actual credentials from Step 2

## Step 4: Run Database Migrations

You need to run two SQL migrations to set up the database schema.

### Migration 1: Initial Schema (Forms Data)

1. In Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy the contents of `supabase/migrations/20260712_initial_schema.sql`
4. Paste into the SQL editor
5. Click **Run** to execute

This creates tables for:
- `volunteers` - Volunteer applications
- `contact_messages` - Contact form submissions
- `donations` - Donation records

### Migration 2: Authentication Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy the contents of `supabase/migrations/20260713_auth_schema.sql`
4. Paste into the SQL editor
5. Click **Run** to execute

This creates:
- `user_profiles` table - Stores user roles and additional info
- Row Level Security (RLS) policies
- Automatic profile creation trigger
- Admin and volunteer access policies

## Step 5: Create Admin User

You need to create at least one admin user to access the admin portal.

### Option A: Using Supabase Dashboard (Recommended)

1. Go to **Authentication** → **Users** in Supabase dashboard
2. Click **Add user** → **Create new user**
3. Fill in the details:
   - **Email**: your-admin-email@example.com
   - **Password**: Choose a strong password
   - **Auto Confirm User**: ✅ Check this box
4. Click **Create user**
5. After the user is created, click on the user to edit
6. Scroll to **User Metadata** section
7. Click **Edit** and add the following JSON:

```json
{
  "role": "admin",
  "full_name": "Admin Name"
}
```

8. Click **Save**

### Option B: Using SQL (Alternative)

1. Go to **SQL Editor** in Supabase dashboard
2. Run this query (replace with your details):

```sql
-- Create admin user
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_user_meta_data,
  created_at,
  updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@sarwafoundation.org',
  crypt('your-secure-password', gen_salt('bf')),
  now(),
  '{"role": "admin", "full_name": "Admin User"}'::jsonb,
  now(),
  now()
);
```

## Step 6: Verify Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to http://localhost:3000/admin/login

3. Try logging in with your admin credentials

4. If successful, you should be redirected to the admin dashboard

## Step 7: Create Volunteer Users (Optional)

To create volunteer users, follow the same process as creating admin users, but use:

```json
{
  "role": "volunteer",
  "full_name": "Volunteer Name"
}
```

## Troubleshooting

### "Invalid login credentials" error

- Double-check your email and password
- Ensure the user's email is confirmed in Supabase dashboard
- Verify the user has the correct role in user metadata

### "Database connection not configured" error

- Check that `.env.local` exists and has the correct values
- Restart your development server after adding environment variables
- Verify the Supabase URL and anon key are correct

### "Access denied" error

- Verify the user has the correct role (`admin` or `volunteer`) in user metadata
- Check that the authentication migration ran successfully
- Ensure RLS policies are enabled on the `user_profiles` table

### Tables not found

- Make sure you ran both SQL migrations
- Check the **Table Editor** in Supabase to verify tables exist
- Re-run the migrations if needed

## Security Notes

1. **Never commit `.env.local`** - It's already in `.gitignore`
2. **Use strong passwords** for admin accounts
3. **The anon key is safe** to use in client-side code
4. **Service role key** should only be used in server-side code (not included in this setup)
5. **Enable 2FA** on your Supabase account for extra security

## Next Steps

After setup is complete:

1. ✅ Test admin login at `/admin/login`
2. ✅ Test volunteer login at `/volunteer/login`
3. ✅ Explore the admin dashboard
4. ✅ Test form submissions (Contact, Volunteer, Donate pages)
5. ✅ View submitted data in admin dashboard

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)

## Support

If you encounter issues:

1. Check the browser console for error messages
2. Check the Supabase logs in the dashboard
3. Review this guide carefully
4. Contact the development team

---

**Last Updated**: July 13, 2026  
**Version**: 1.0.0
### Migration 7: Fix CMS RLS Policies (CRITICAL - Run this if CMS pages fail to load)

1. In Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy the contents of `supabase/migrations/20260714_fix_cms_rls_policies.sql`
4. Paste into the SQL editor
5. Click **Run** to execute

This fixes Row Level Security policies to allow admins to view all CMS content (including inactive/draft items).

---
