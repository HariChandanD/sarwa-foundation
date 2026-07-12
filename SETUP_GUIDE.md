# 🚀 Complete Setup Guide - Animal Welfare NGO Website

This guide will walk you through setting up the Animal Welfare NGO website from scratch.

## 📋 Prerequisites Checklist

Before starting, ensure you have:

- [ ] Node.js 18.17 or later installed
- [ ] npm 9.0 or later installed
- [ ] PostgreSQL 14 or later installed and running
- [ ] Git installed
- [ ] A code editor (VS Code recommended)
- [ ] A Razorpay account (for payments)
- [ ] A Resend account (for emails)

## 🔧 Step-by-Step Setup

### Step 1: Install Node.js and npm

If you don't have Node.js installed:

**macOS (using Homebrew):**
```bash
brew install node
```

**Windows:**
Download from [nodejs.org](https://nodejs.org/)

**Verify installation:**
```bash
node --version  # Should be 18.17 or higher
npm --version   # Should be 9.0 or higher
```

### Step 2: Install PostgreSQL

**macOS (using Homebrew):**
```bash
brew install postgresql@14
brew services start postgresql@14
```

**Windows:**
Download from [postgresql.org](https://www.postgresql.org/download/)

**Create database:**
```bash
# Connect to PostgreSQL
psql postgres

# Create database
CREATE DATABASE animal_welfare_ngo;

# Create user (optional)
CREATE USER ngo_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE animal_welfare_ngo TO ngo_user;

# Exit
\q
```

### Step 3: Install Project Dependencies

```bash
cd /Users/hari/Desktop/animal-welfare-ngo
npm install
```

This will install all dependencies listed in `package.json`.

### Step 4: Configure Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Edit `.env` and fill in your values:

```env
# Database - Update with your PostgreSQL credentials
DATABASE_URL="postgresql://username:password@localhost:5432/animal_welfare_ngo?schema=public"

# NextAuth - Generate a secret key
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="run: openssl rand -base64 32"

# Razorpay - Get from https://dashboard.razorpay.com/
RAZORPAY_KEY_ID="your_key_id"
RAZORPAY_KEY_SECRET="your_key_secret"
RAZORPAY_WEBHOOK_SECRET="your_webhook_secret"

# Resend - Get from https://resend.com/
RESEND_API_KEY="your_resend_api_key"
EMAIL_FROM="noreply@yourdomain.com"
ADMIN_EMAIL="admin@yourdomain.com"

# Cloudinary (Optional - for image uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# Application Settings
NEXT_PUBLIC_APP_NAME="Animal Welfare NGO"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_CONTACT_EMAIL="contact@yourdomain.com"
NEXT_PUBLIC_CONTACT_PHONE="+91-1234567890"
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### Step 5: Set Up Database Schema

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database (for development)
npm run db:push

# OR run migrations (recommended for production)
npm run db:migrate
```

### Step 6: Seed the Database (Optional)

```bash
npm run db:seed
```

This creates:
- Admin user (email: admin@animalwelfare.org, password: admin123)
- Sample categories and tags
- Sample campaign
- Site settings
- Sample pages

**⚠️ IMPORTANT:** Change the admin password after first login!

### Step 7: Install shadcn/ui Components

The project is configured for shadcn/ui. Install core components:

```bash
# Install all at once
npx shadcn-ui@latest add button card input label select textarea dialog dropdown-menu navigation-menu accordion tabs badge separator alert toast form

# Or install individually as needed
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
# etc.
```

### Step 8: Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎨 Development Workflow

### Running the Application

```bash
# Development mode with hot reload
npm run dev

# Production build
npm run build

# Start production server
npm run start
```

### Code Quality

```bash
# Run linter
npm run lint

# Format code
npm run format

# Type checking
npm run type-check
```

### Database Management

```bash
# Open Prisma Studio (visual database editor)
npm run db:studio

# Create new migration
npm run db:migrate

# Reset database (⚠️ deletes all data)
npx prisma migrate reset
```

## 🔐 Setting Up Third-Party Services

### Razorpay Setup

1. Sign up at [razorpay.com](https://razorpay.com/)
2. Go to Settings → API Keys
3. Generate Test/Live keys
4. Add to `.env`:
   - `RAZORPAY_KEY_ID`
   - `RAZORPAY_KEY_SECRET`
5. Set up webhooks:
   - URL: `https://yourdomain.com/api/webhooks/razorpay`
   - Events: `payment.captured`, `payment.failed`

### Resend Setup

1. Sign up at [resend.com](https://resend.com/)
2. Verify your domain
3. Create API key
4. Add to `.env`:
   - `RESEND_API_KEY`
   - `EMAIL_FROM`

### Cloudinary Setup (Optional)

1. Sign up at [cloudinary.com](https://cloudinary.com/)
2. Get credentials from Dashboard
3. Add to `.env`:
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`

### Google OAuth Setup (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Add to `.env`:
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`

## 📁 Project Structure Overview

```
animal-welfare-ngo/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── (public)/       # Public pages (home, about, etc.)
│   │   ├── admin/          # Admin dashboard
│   │   ├── api/            # API routes
│   │   └── auth/           # Auth pages (login, register)
│   ├── components/         # Reusable components
│   │   ├── ui/            # shadcn/ui components
│   │   ├── layout/        # Layout components (Header, Footer)
│   │   ├── sections/      # Page sections
│   │   ├── forms/         # Form components
│   │   └── cards/         # Card components
│   ├── features/          # Feature modules
│   │   ├── donations/     # Donation feature
│   │   ├── campaigns/     # Campaign management
│   │   ├── animals/       # Animal tracking
│   │   ├── volunteers/    # Volunteer management
│   │   └── blog/          # Blog feature
│   ├── lib/               # Utilities and libraries
│   │   ├── db/           # Database client
│   │   ├── auth/         # Auth utilities
│   │   ├── payments/     # Payment integration
│   │   ├── email/        # Email utilities
│   │   └── utils/        # Helper functions
│   └── types/            # TypeScript types
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Database seeding
└── public/               # Static assets
```

## 🐛 Troubleshooting

### Database Connection Issues

**Error: Can't reach database server**
```bash
# Check if PostgreSQL is running
brew services list  # macOS
# or
sudo systemctl status postgresql  # Linux

# Restart PostgreSQL
brew services restart postgresql@14  # macOS
```

**Error: Database does not exist**
```bash
# Create database manually
createdb animal_welfare_ngo
```

### Port Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

### Module Not Found Errors

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Next.js cache
rm -rf .next
```

### Prisma Client Issues

```bash
# Regenerate Prisma Client
npx prisma generate

# If still issues, reset
npx prisma migrate reset
npm run db:generate
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

### Environment Variables for Production

Update these in production:
- `NEXTAUTH_URL` → Your production URL
- `NEXT_PUBLIC_APP_URL` → Your production URL
- `DATABASE_URL` → Production database URL
- Use production keys for Razorpay, Resend, etc.

## 📚 Next Steps

1. **Customize Design**: Update colors in `tailwind.config.ts`
2. **Add Content**: Create pages, blog posts, campaigns
3. **Configure Email Templates**: Customize in `src/lib/email/`
4. **Set Up Analytics**: Add Google Analytics
5. **Add More Features**: Extend functionality as needed

## 🆘 Getting Help

- Check the [README.md](./README.md) for feature documentation
- Review [Next.js Documentation](https://nextjs.org/docs)
- Check [Prisma Documentation](https://www.prisma.io/docs)
- Review [shadcn/ui Documentation](https://ui.shadcn.com)

## 📝 Important Notes

- **Security**: Never commit `.env` file to Git
- **Passwords**: Change default admin password immediately
- **Backups**: Set up regular database backups
- **Updates**: Keep dependencies updated regularly
- **Testing**: Test payment flows in test mode first

---

**Ready to build something amazing! 🎉**

For questions or issues, refer to the documentation or create an issue in the repository.