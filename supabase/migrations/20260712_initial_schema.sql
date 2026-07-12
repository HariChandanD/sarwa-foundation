-- Create volunteers table
CREATE TABLE IF NOT EXISTS public.volunteers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    city TEXT,
    interests TEXT,
    availability TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create donations table
CREATE TABLE IF NOT EXISTS public.donations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    donor_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    amount NUMERIC(10, 2) NOT NULL CHECK (amount > 0),
    payment_mode TEXT NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security on all tables
ALTER TABLE public.volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- Create policies for volunteers table
-- Allow public INSERT only
CREATE POLICY "Allow public insert on volunteers"
    ON public.volunteers
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Prevent public UPDATE
CREATE POLICY "Prevent public update on volunteers"
    ON public.volunteers
    FOR UPDATE
    TO anon
    USING (false);

-- Prevent public DELETE
CREATE POLICY "Prevent public delete on volunteers"
    ON public.volunteers
    FOR DELETE
    TO anon
    USING (false);

-- Create policies for contact_messages table
-- Allow public INSERT only
CREATE POLICY "Allow public insert on contact_messages"
    ON public.contact_messages
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Prevent public UPDATE
CREATE POLICY "Prevent public update on contact_messages"
    ON public.contact_messages
    FOR UPDATE
    TO anon
    USING (false);

-- Prevent public DELETE
CREATE POLICY "Prevent public delete on contact_messages"
    ON public.contact_messages
    FOR DELETE
    TO anon
    USING (false);

-- Create policies for donations table
-- Allow public INSERT only
CREATE POLICY "Allow public insert on donations"
    ON public.donations
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Prevent public UPDATE
CREATE POLICY "Prevent public update on donations"
    ON public.donations
    FOR UPDATE
    TO anon
    USING (false);

-- Prevent public DELETE
CREATE POLICY "Prevent public delete on donations"
    ON public.donations
    FOR DELETE
    TO anon
    USING (false);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_volunteers_email ON public.volunteers(email);
CREATE INDEX IF NOT EXISTS idx_volunteers_created_at ON public.volunteers(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_email ON public.contact_messages(email);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON public.contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_donations_email ON public.donations(email);
CREATE INDEX IF NOT EXISTS idx_donations_created_at ON public.donations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_donations_amount ON public.donations(amount);

-- Add comments to tables for documentation
COMMENT ON TABLE public.volunteers IS 'Stores volunteer registration information';
COMMENT ON TABLE public.contact_messages IS 'Stores contact form submissions';
COMMENT ON TABLE public.donations IS 'Stores donation records';

-- Add comments to columns
COMMENT ON COLUMN public.volunteers.id IS 'Unique identifier for volunteer';
COMMENT ON COLUMN public.volunteers.full_name IS 'Full name of the volunteer';
COMMENT ON COLUMN public.volunteers.email IS 'Email address of the volunteer';
COMMENT ON COLUMN public.volunteers.phone IS 'Phone number of the volunteer';
COMMENT ON COLUMN public.volunteers.city IS 'City where volunteer is located';
COMMENT ON COLUMN public.volunteers.interests IS 'Areas of interest for volunteering';
COMMENT ON COLUMN public.volunteers.availability IS 'Volunteer availability schedule';
COMMENT ON COLUMN public.volunteers.created_at IS 'Timestamp when volunteer registered';

COMMENT ON COLUMN public.contact_messages.id IS 'Unique identifier for message';
COMMENT ON COLUMN public.contact_messages.name IS 'Name of the person contacting';
COMMENT ON COLUMN public.contact_messages.email IS 'Email address of the person';
COMMENT ON COLUMN public.contact_messages.phone IS 'Phone number of the person';
COMMENT ON COLUMN public.contact_messages.subject IS 'Subject of the message';
COMMENT ON COLUMN public.contact_messages.message IS 'Content of the message';
COMMENT ON COLUMN public.contact_messages.created_at IS 'Timestamp when message was sent';

COMMENT ON COLUMN public.donations.id IS 'Unique identifier for donation';
COMMENT ON COLUMN public.donations.donor_name IS 'Name of the donor';
COMMENT ON COLUMN public.donations.email IS 'Email address of the donor';
COMMENT ON COLUMN public.donations.phone IS 'Phone number of the donor';
COMMENT ON COLUMN public.donations.amount IS 'Donation amount in currency';
COMMENT ON COLUMN public.donations.payment_mode IS 'Payment method used (e.g., card, UPI, bank transfer)';
COMMENT ON COLUMN public.donations.notes IS 'Additional notes or message from donor';
COMMENT ON COLUMN public.donations.created_at IS 'Timestamp when donation was made';

-- Made with Bob
