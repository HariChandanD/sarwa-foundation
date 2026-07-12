# Animal Welfare NGO Website

A production-ready, full-featured website for Animal Welfare NGOs built with Next.js 14, TypeScript, and modern web technologies.

## 🌟 Features

- **Donation Management**: Secure online donations with Razorpay integration
- **Campaign Management**: Create and manage fundraising campaigns
- **Animal Rescue Tracking**: Track rescued animals and their rehabilitation
- **Volunteer Management**: Volunteer registration and management system
- **Blog & Content**: Content management for blog posts and pages
- **Admin Dashboard**: Comprehensive admin panel for managing all aspects
- **Authentication**: Secure authentication with NextAuth.js
- **Responsive Design**: Mobile-first, fully responsive design
- **SEO Optimized**: Built-in SEO optimization for better visibility
- **Email Notifications**: Automated email notifications with Resend

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js v5
- **Payments**: Razorpay
- **Email**: Resend
- **Forms**: React Hook Form + Zod
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js 18.17 or later
- npm 9.0 or later
- PostgreSQL 14 or later
- Git

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd animal-welfare-ngo
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the `.env.example` file to `.env` and fill in your values:

```bash
cp .env.example .env
```

Required environment variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/animal_welfare_ngo"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# Razorpay
RAZORPAY_KEY_ID="your-razorpay-key-id"
RAZORPAY_KEY_SECRET="your-razorpay-key-secret"

# Resend (Email)
RESEND_API_KEY="your-resend-api-key"
EMAIL_FROM="noreply@yourdomain.com"
```

### 4. Set up the database

```bash
# Generate Prisma Client
npm run db:generate

# Push the schema to your database
npm run db:push

# Or run migrations (recommended for production)
npm run db:migrate
```

### 5. Seed the database (optional)

```bash
npm run db:seed
```

### 6. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
animal-welfare-ngo/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (public)/          # Public routes
│   │   ├── admin/             # Admin dashboard
│   │   ├── api/               # API routes
│   │   └── auth/              # Authentication pages
│   ├── components/            # React components
│   │   ├── ui/               # shadcn/ui components
│   │   ├── layout/           # Layout components
│   │   ├── sections/         # Page sections
│   │   ├── forms/            # Form components
│   │   └── cards/            # Card components
│   ├── features/             # Feature-specific code
│   │   ├── donations/        # Donation feature
│   │   ├── campaigns/        # Campaign feature
│   │   ├── animals/          # Animal management
│   │   ├── volunteers/       # Volunteer management
│   │   └── blog/             # Blog feature
│   ├── lib/                  # Utility libraries
│   │   ├── db/              # Database utilities
│   │   ├── auth/            # Auth utilities
│   │   ├── payments/        # Payment utilities
│   │   ├── email/           # Email utilities
│   │   └── utils/           # General utilities
│   └── types/               # TypeScript type definitions
├── prisma/
│   └── schema.prisma        # Database schema
├── public/                  # Static assets
└── package.json
```

## 🎨 Adding shadcn/ui Components

This project uses shadcn/ui for UI components. To add new components:

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add dialog
```

## 🗄️ Database Management

### View database in Prisma Studio

```bash
npm run db:studio
```

### Create a new migration

```bash
npm run db:migrate
```

### Reset the database

```bash
npx prisma migrate reset
```

## 🧪 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking
- `npm run db:generate` - Generate Prisma Client
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio
- `npm run db:seed` - Seed the database

## 🔐 Authentication

The application uses NextAuth.js v5 for authentication with support for:

- Email/Password authentication
- OAuth providers (Google, etc.)
- Role-based access control (User, Volunteer, Admin, Super Admin)
- Session management

## 💳 Payment Integration

Razorpay is integrated for secure payment processing:

- One-time donations
- Recurring donations (monthly/yearly)
- Campaign-specific donations
- Automatic receipt generation
- Webhook handling for payment verification

## 📧 Email Notifications

Automated emails are sent for:

- Donation receipts
- Volunteer application confirmations
- Campaign updates
- Contact form submissions
- Admin notifications

## 🎯 Key Features Implementation

### Donations
- Secure payment processing with Razorpay
- Multiple donation types (one-time, monthly, yearly)
- Campaign-specific donations
- Anonymous donation option
- Tax receipt generation

### Campaigns
- Create and manage fundraising campaigns
- Track campaign progress
- Set goals and deadlines
- Campaign analytics
- Social sharing

### Animal Management
- Track rescued animals
- Medical history tracking
- Adoption management
- Photo galleries
- Rescue stories

### Volunteer Management
- Online volunteer registration
- Skill-based matching
- Volunteer approval workflow
- Activity tracking
- Communication tools

### Blog & Content
- Rich text editor
- Categories and tags
- SEO optimization
- Comment system
- Social sharing

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms

The application can be deployed to any platform that supports Next.js:

- Netlify
- AWS Amplify
- Railway
- Render
- DigitalOcean App Platform

## 🔒 Security

- Environment variables for sensitive data
- CSRF protection
- XSS prevention
- SQL injection protection via Prisma
- Rate limiting on API routes
- Secure headers configuration
- Input validation with Zod

## 🌐 SEO

- Dynamic meta tags
- Open Graph tags
- Twitter Card tags
- Sitemap generation
- Robots.txt
- Structured data (JSON-LD)

## 📱 Progressive Web App (PWA)

The application is PWA-ready with:

- Service worker support
- Offline functionality
- App manifest
- Install prompts

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Prisma](https://www.prisma.io/)
- [NextAuth.js](https://next-auth.js.org/)
- [Razorpay](https://razorpay.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## 📞 Support

For support, email support@yourdomain.com or join our Slack channel.

## 🗺️ Roadmap

- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] SMS notifications
- [ ] WhatsApp integration
- [ ] Volunteer mobile app
- [ ] AI-powered animal identification
- [ ] Blockchain donation tracking

---

Made with ❤️ for Animal Welfare