import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@animalwelfare.org' },
    update: {},
    create: {
      email: 'admin@animalwelfare.org',
      name: 'Admin User',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
      status: 'ACTIVE',
      emailVerified: new Date(),
    },
  });

  console.log('✅ Admin user created:', admin.email);

  // Create sample categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'rescue-stories' },
      update: {},
      create: {
        name: 'Rescue Stories',
        slug: 'rescue-stories',
        description: 'Heartwarming stories of animal rescues',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'animal-welfare' },
      update: {},
      create: {
        name: 'Animal Welfare',
        slug: 'animal-welfare',
        description: 'Information about animal welfare and rights',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'events' },
      update: {},
      create: {
        name: 'Events',
        slug: 'events',
        description: 'Upcoming events and activities',
      },
    }),
  ]);

  console.log('✅ Categories created:', categories.length);

  // Create sample tags
  const tags = await Promise.all([
    prisma.tag.upsert({
      where: { slug: 'dogs' },
      update: {},
      create: { name: 'Dogs', slug: 'dogs' },
    }),
    prisma.tag.upsert({
      where: { slug: 'cats' },
      update: {},
      create: { name: 'Cats', slug: 'cats' },
    }),
    prisma.tag.upsert({
      where: { slug: 'rescue' },
      update: {},
      create: { name: 'Rescue', slug: 'rescue' },
    }),
    prisma.tag.upsert({
      where: { slug: 'adoption' },
      update: {},
      create: { name: 'Adoption', slug: 'adoption' },
    }),
  ]);

  console.log('✅ Tags created:', tags.length);

  // Create sample campaign
  const campaign = await prisma.campaign.upsert({
    where: { slug: 'emergency-medical-fund' },
    update: {},
    create: {
      title: 'Emergency Medical Fund',
      slug: 'emergency-medical-fund',
      description: 'Help us provide emergency medical care to injured and sick animals. Your donation can save lives.',
      shortDescription: 'Emergency medical care for animals in need',
      goalAmount: 100000,
      raisedAmount: 25000,
      status: 'ACTIVE',
      startDate: new Date(),
      endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
      featuredImage: '/images/campaigns/emergency-fund.jpg',
      publishedAt: new Date(),
    },
  });

  console.log('✅ Campaign created:', campaign.title);

  // Create sample site settings
  const settings = await Promise.all([
    prisma.siteSetting.upsert({
      where: { key: 'site_name' },
      update: {},
      create: {
        key: 'site_name',
        value: 'Animal Welfare NGO',
        type: 'string',
        description: 'Website name',
      },
    }),
    prisma.siteSetting.upsert({
      where: { key: 'site_description' },
      update: {},
      create: {
        key: 'site_description',
        value: 'Saving Lives, One Paw at a Time',
        type: 'string',
        description: 'Website description',
      },
    }),
    prisma.siteSetting.upsert({
      where: { key: 'contact_email' },
      update: {},
      create: {
        key: 'contact_email',
        value: 'contact@animalwelfare.org',
        type: 'string',
        description: 'Contact email address',
      },
    }),
    prisma.siteSetting.upsert({
      where: { key: 'contact_phone' },
      update: {},
      create: {
        key: 'contact_phone',
        value: '+91-1234567890',
        type: 'string',
        description: 'Contact phone number',
      },
    }),
  ]);

  console.log('✅ Site settings created:', settings.length);

  // Create sample pages
  const pages = await Promise.all([
    prisma.page.upsert({
      where: { slug: 'about' },
      update: {},
      create: {
        title: 'About Us',
        slug: 'about',
        content: 'We are dedicated to rescuing, rehabilitating, and rehoming animals in need.',
        published: true,
        publishedAt: new Date(),
      },
    }),
    prisma.page.upsert({
      where: { slug: 'privacy-policy' },
      update: {},
      create: {
        title: 'Privacy Policy',
        slug: 'privacy-policy',
        content: 'Your privacy is important to us. This policy outlines how we handle your data.',
        published: true,
        publishedAt: new Date(),
      },
    }),
  ]);

  console.log('✅ Pages created:', pages.length);

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// Made with Bob
