'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/layout/Container';
import { CampaignCard } from '@/components/cards/CampaignCard';
import { cn } from '@/lib/utils';

interface Campaign {
  id: string;
  title: string;
  description: string;
  image: string;
  goalAmount: number;
  raisedAmount: number;
  currency?: string;
  urgency?: 'low' | 'medium' | 'high' | 'critical';
  status?: 'active' | 'completed' | 'upcoming';
  daysLeft?: number;
  donorCount?: number;
  slug: string;
  featured?: boolean;
}

interface FeaturedCampaignsSectionProps {
  title?: string;
  subtitle?: string;
  campaigns?: Campaign[];
  showViewAll?: boolean;
  className?: string;
}

// Mock data for demonstration
const mockCampaigns: Campaign[] = [
  {
    id: '1',
    title: 'Emergency Medical Fund for Rescued Street Dogs',
    description:
      'Help us provide critical medical care for 50+ street dogs rescued from harsh conditions. Your support covers surgeries, medications, and rehabilitation.',
    image: '/images/campaigns/medical-fund.jpg',
    goalAmount: 500000,
    raisedAmount: 325000,
    currency: '₹',
    urgency: 'critical',
    status: 'active',
    daysLeft: 15,
    donorCount: 234,
    slug: 'emergency-medical-fund',
    featured: true,
  },
  {
    id: '2',
    title: 'Build a New Shelter for Abandoned Animals',
    description:
      "We're expanding our facilities to accommodate 100 more rescued animals. Help us build a safe, comfortable shelter with modern amenities.",
    image: '/images/campaigns/new-shelter.jpg',
    goalAmount: 2000000,
    raisedAmount: 1450000,
    currency: '₹',
    urgency: 'high',
    status: 'active',
    daysLeft: 45,
    donorCount: 567,
    slug: 'new-shelter-construction',
  },
  {
    id: '3',
    title: 'Winter Care Package for Stray Animals',
    description:
      'Provide warm blankets, nutritious food, and medical care to help stray animals survive the harsh winter months.',
    image: '/images/campaigns/winter-care.jpg',
    goalAmount: 300000,
    raisedAmount: 180000,
    currency: '₹',
    urgency: 'medium',
    status: 'active',
    daysLeft: 30,
    donorCount: 156,
    slug: 'winter-care-package',
  },
];

export function FeaturedCampaignsSection({
  title = 'Active Campaigns',
  subtitle = 'Your support directly impacts the lives of animals in need. Choose a campaign that resonates with you.',
  campaigns = mockCampaigns,
  showViewAll = true,
  className,
}: FeaturedCampaignsSectionProps) {
  return (
    <section className={cn('bg-white py-20', className)}>
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-flex items-center space-x-2 rounded-full bg-primary/10 px-4 py-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Make an Impact
            </span>
          </div>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600">{subtitle}</p>
        </motion.div>

        {/* Campaigns Grid */}
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {campaigns.map((campaign, index) => (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <CampaignCard {...campaign} />
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        {showViewAll && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white"
              asChild
            >
              <a href="/campaigns">
                View All Campaigns
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </motion.div>
        )}

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 border-t border-gray-200 pt-12"
        >
          <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
            <div>
              <div className="mb-2 text-4xl font-bold text-primary">100%</div>
              <div className="text-sm text-gray-600">
                Transparent Fund Usage
              </div>
            </div>
            <div>
              <div className="mb-2 text-4xl font-bold text-primary">24/7</div>
              <div className="text-sm text-gray-600">Campaign Updates</div>
            </div>
            <div>
              <div className="mb-2 text-4xl font-bold text-primary">₹0</div>
              <div className="text-sm text-gray-600">Platform Fees</div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

// Made with Bob
