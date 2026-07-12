# Supabase Database Setup

This directory contains SQL migration files for the Sarwa Foundation NGO website database.

## Overview

The database schema includes three main tables:
- **volunteers**: Stores volunteer registration information
- **contact_messages**: Stores contact form submissions
- **donations**: Stores donation records

All tables have Row Level Security (RLS) enabled with policies that allow public INSERT only, preventing unauthorized UPDATE or DELETE operations.

## Prerequisites

1. Create a Supabase account at https://supabase.com
2. Create a new project in Supabase
3. Note down your project URL and anon key

## Setup Instructions

### Step 1: Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Update `.env.local` with your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

### Step 2: Run the Migration

You have two options to run the migration:

#### Option A: Using Supabase Dashboard (Recommended for beginners)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy the entire contents of `migrations/20260712_initial_schema.sql`
5. Paste into the SQL editor
6. Click **Run** to execute the migration

#### Option B: Using Supabase CLI (Recommended for developers)

1. Install Supabase CLI:
   ```bash
   npm install -g supabase
   ```

2. Login to Supabase:
   ```bash
   supabase login
   ```

3. Link your project:
   ```bash
   supabase link --project-ref your-project-ref
   ```

4. Push the migration:
   ```bash
   supabase db push
   ```

### Step 3: Verify the Setup

1. Go to **Table Editor** in your Supabase dashboard
2. You should see three tables: `volunteers`, `contact_messages`, and `donations`
3. Click on each table to verify the columns and structure

## Database Schema

### Volunteers Table

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key (auto-generated) |
| full_name | TEXT | Full name of the volunteer |
| email | TEXT | Email address |
| phone | TEXT | Phone number (optional) |
| city | TEXT | City location (optional) |
| interests | TEXT | Areas of interest |
| availability | TEXT | Availability schedule |
| created_at | TIMESTAMP | Registration timestamp |

### Contact Messages Table

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key (auto-generated) |
| name | TEXT | Name of the person |
| email | TEXT | Email address |
| phone | TEXT | Phone number (optional) |
| subject | TEXT | Message subject |
| message | TEXT | Message content |
| created_at | TIMESTAMP | Submission timestamp |

### Donations Table

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key (auto-generated) |
| donor_name | TEXT | Name of the donor |
| email | TEXT | Email address |
| phone | TEXT | Phone number (optional) |
| amount | NUMERIC(10,2) | Donation amount |
| payment_mode | TEXT | Payment method |
| notes | TEXT | Additional notes (optional) |
| created_at | TIMESTAMP | Donation timestamp |

## Row Level Security (RLS)

All tables have RLS enabled with the following policies:

### Public Access (anon role)
- ✅ **INSERT**: Allowed - Users can submit forms
- ❌ **UPDATE**: Denied - Users cannot modify existing records
- ❌ **DELETE**: Denied - Users cannot delete records
- ❌ **SELECT**: Denied - Users cannot view records (privacy protection)

### Admin Access (authenticated role)
To view and manage records, you'll need to:
1. Set up Supabase Authentication
2. Create admin policies for authenticated users
3. Build an admin dashboard (future phase)

## Indexes

The migration creates indexes on the following columns for better query performance:
- Email addresses (for all tables)
- Created_at timestamps (for sorting)
- Donation amounts (for reporting)

## Testing the Database

### Test Volunteer Insertion

```javascript
import { supabase } from '@/lib/supabase'

const { data, error } = await supabase
  .from('volunteers')
  .insert({
    full_name: 'John Doe',
    email: 'john@example.com',
    phone: '+91 9876543210',
    city: 'Mumbai',
    interests: 'Animal Rescue',
    availability: 'Weekends'
  })

if (error) console.error('Error:', error)
else console.log('Success:', data)
```

### Test Contact Message Insertion

```javascript
const { data, error } = await supabase
  .from('contact_messages')
  .insert({
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+91 9876543210',
    subject: 'Inquiry about adoption',
    message: 'I would like to adopt a dog...'
  })
```

### Test Donation Insertion

```javascript
const { data, error } = await supabase
  .from('donations')
  .insert({
    donor_name: 'Anonymous',
    email: 'donor@example.com',
    phone: '+91 9876543210',
    amount: 1000.00,
    payment_mode: 'UPI',
    notes: 'For animal food'
  })
```

## Next Steps

1. ✅ Database schema created
2. ⏳ Connect forms to Supabase (Volunteer, Contact, Donate pages)
3. ⏳ Add form validation and error handling
4. ⏳ Create admin authentication
5. ⏳ Build admin dashboard to view submissions
6. ⏳ Implement email notifications
7. ⏳ Add payment gateway integration

## Troubleshooting

### Error: "relation does not exist"
- Make sure you've run the migration successfully
- Check that you're connected to the correct Supabase project

### Error: "new row violates row-level security policy"
- Verify that RLS policies are created correctly
- Check that you're using the anon key, not the service role key

### Error: "permission denied for table"
- Ensure RLS is enabled on the table
- Verify that INSERT policies exist for the anon role

## Security Notes

- Never commit `.env.local` to version control
- The anon key is safe to use in client-side code
- Service role key should only be used in server-side code
- All user data is protected by RLS policies
- Consider adding rate limiting for form submissions

## Support

For issues or questions:
- Check Supabase documentation: https://supabase.com/docs
- Review the migration file: `migrations/20260712_initial_schema.sql`
- Contact the development team

---

**Last Updated**: July 12, 2026
**Migration Version**: 20260712_initial_schema