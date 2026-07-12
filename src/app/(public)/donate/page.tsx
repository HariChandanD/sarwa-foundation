import { Metadata } from 'next';
import { HeroSection } from '@/components/sections/HeroSection';
import { Container } from '@/components/layout/Container';
import {
  Heart,
  Shield,
  TrendingUp,
  Users,
  Check,
  CreditCard,
  Smartphone,
  Building,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Donate - Sarwa Foundation',
  description:
    "Support Sarwa Foundation's mission to rescue and rehabilitate animals. Your donation directly impacts lives. 100% transparent and tax-deductible.",
};

const donationAmounts = [
  { amount: 500, impact: 'Feeds 5 animals for a day' },
  { amount: 1000, impact: 'Provides basic medical care' },
  { amount: 2500, impact: 'Covers emergency surgery' },
  { amount: 5000, impact: 'Supports a rescue operation' },
  { amount: 10000, impact: 'Sponsors an animal for a month' },
  { amount: 25000, impact: 'Funds a sterilization camp' },
];

const impactAreas = [
  {
    icon: Heart,
    title: 'Emergency Rescue',
    description: 'Immediate response to animals in distress',
    percentage: 30,
  },
  {
    icon: Shield,
    title: 'Medical Care',
    description: 'Surgeries, treatments, and rehabilitation',
    percentage: 35,
  },
  {
    icon: Users,
    title: 'Shelter & Food',
    description: 'Safe housing and nutritious meals',
    percentage: 25,
  },
  {
    icon: TrendingUp,
    title: 'Programs & Outreach',
    description: 'Education and community initiatives',
    percentage: 10,
  },
];

export default function DonatePage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        variant="about"
        title="Your Donation Saves Lives"
        subtitle="Every contribution helps us rescue, rehabilitate, and rehome animals in need. Join thousands of compassionate supporters making a real difference."
        primaryCTA={{ text: 'Donate Now', href: '#donate-form' }}
        secondaryCTA={{ text: 'Become Monthly Donor', href: '#monthly' }}
      />

      {/* Donation Form Section */}
      <section id="donate-form" className="bg-white py-20">
        <Container>
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Choose Your Contribution
              </h2>
              <p className="text-lg text-gray-600">
                Select an amount or enter a custom donation. Every rupee makes a
                difference.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {/* Donation Amounts */}
              <div>
                <h3 className="mb-6 text-xl font-semibold text-gray-900">
                  One-Time Donation
                </h3>
                <div className="mb-6 grid grid-cols-2 gap-4">
                  {donationAmounts.map((item, index) => (
                    <button
                      key={index}
                      className="group rounded-xl border-2 border-gray-200 p-4 text-left transition-all hover:border-primary hover:bg-primary/5"
                    >
                      <div className="mb-1 text-2xl font-bold text-gray-900">
                        ₹{item.amount.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600 transition-colors group-hover:text-primary">
                        {item.impact}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Custom Amount */}
                <div className="mb-6">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Or Enter Custom Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-gray-500">
                      ₹
                    </span>
                    <input
                      type="number"
                      placeholder="Enter amount"
                      className="w-full rounded-xl border-2 border-gray-200 py-3 pl-10 pr-4 text-lg focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="mb-6">
                  <label className="mb-3 block text-sm font-medium text-gray-700">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <button className="flex flex-col items-center gap-2 rounded-xl border-2 border-primary bg-primary/5 p-4">
                      <CreditCard className="h-6 w-6 text-primary" />
                      <span className="text-sm font-medium">Card</span>
                    </button>
                    <button className="flex flex-col items-center gap-2 rounded-xl border-2 border-gray-200 p-4 transition-all hover:border-primary hover:bg-primary/5">
                      <Smartphone className="h-6 w-6 text-gray-600" />
                      <span className="text-sm font-medium">UPI</span>
                    </button>
                    <button className="flex flex-col items-center gap-2 rounded-xl border-2 border-gray-200 p-4 transition-all hover:border-primary hover:bg-primary/5">
                      <Building className="h-6 w-6 text-gray-600" />
                      <span className="text-sm font-medium">Bank</span>
                    </button>
                  </div>
                </div>

                <Button className="w-full bg-primary py-6 text-lg hover:bg-primary/90">
                  <Heart className="mr-2 h-5 w-5" />
                  Proceed to Payment
                </Button>
              </div>

              {/* Monthly Donation */}
              <div
                id="monthly"
                className="rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 p-8"
              >
                <Badge className="mb-4 bg-primary text-white">
                  Recommended
                </Badge>
                <h3 className="mb-4 text-2xl font-bold text-gray-900">
                  Become a Monthly Donor
                </h3>
                <p className="mb-6 text-gray-600">
                  Join our community of regular supporters and make a sustained
                  impact on animal welfare.
                </p>

                <div className="mb-6 space-y-4">
                  {[
                    'Predictable support for ongoing care',
                    'Exclusive updates and impact reports',
                    'Priority volunteer opportunities',
                    'Annual appreciation event invite',
                    'Tax benefits on total annual donation',
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="mb-6 grid grid-cols-2 gap-3">
                  {[500, 1000, 2500, 5000].map((amount) => (
                    <button
                      key={amount}
                      className="rounded-xl border-2 border-gray-200 bg-white p-3 transition-all hover:border-primary hover:bg-primary/5"
                    >
                      <div className="text-xl font-bold text-gray-900">
                        ₹{amount}/mo
                      </div>
                    </button>
                  ))}
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90">
                  Start Monthly Donation
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* How Funds Are Used */}
      <section className="bg-gray-50 py-20">
        <Container>
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              100% Transparent Fund Usage
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-gray-600">
              Every rupee is accounted for. Here's exactly how your donation
              makes an impact.
            </p>
          </div>

          <div className="mb-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {impactAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <div
                  key={index}
                  className="rounded-xl bg-white p-6 text-center"
                >
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="mb-2 text-4xl font-bold text-primary">
                    {area.percentage}%
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    {area.title}
                  </h3>
                  <p className="text-sm text-gray-600">{area.description}</p>
                </div>
              );
            })}
          </div>

          <div className="mx-auto max-w-3xl rounded-xl border-2 border-blue-200 bg-blue-50 p-8">
            <div className="flex items-start gap-4">
              <Shield className="h-8 w-8 flex-shrink-0 text-blue-600" />
              <div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  Our Commitment to Transparency
                </h3>
                <p className="mb-4 text-gray-700">
                  We publish detailed financial reports quarterly and maintain
                  complete transparency in all our operations. Your trust is our
                  responsibility.
                </p>
                <a
                  href="/about/transparency"
                  className="font-medium text-primary hover:underline"
                >
                  View Financial Reports →
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Tax Benefits */}
      <section className="bg-white py-20">
        <Container>
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 md:text-4xl">
              Tax Benefits
            </h2>
            <div className="rounded-xl border-2 border-green-200 bg-green-50 p-8">
              <div className="flex items-start gap-4">
                <Check className="h-8 w-8 flex-shrink-0 text-green-600" />
                <div>
                  <h3 className="mb-4 text-xl font-semibold text-gray-900">
                    80G Tax Exemption Certificate
                  </h3>
                  <p className="mb-4 text-gray-700">
                    Sarwa Foundation is registered under Section 80G of the
                    Income Tax Act. Your donations are eligible for tax
                    deductions as per Indian tax laws.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <Check className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                      <span>Instant tax receipt via email</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                      <span>
                        Annual consolidated statement for regular donors
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                      <span>PAN-based automatic record keeping</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Other Ways to Help */}
      <section className="bg-gray-50 py-20">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Other Ways to Support
            </h2>
            <p className="text-lg text-gray-600">
              Can't donate right now? There are many other ways to help our
              cause.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: 'Volunteer Your Time',
                description: 'Join our team and make a hands-on difference',
                link: '/volunteer',
                linkText: 'Become a Volunteer',
              },
              {
                title: 'Foster an Animal',
                description: 'Provide temporary care while they await adoption',
                link: '/foster',
                linkText: 'Learn About Fostering',
              },
              {
                title: 'Spread the Word',
                description: 'Share our mission on social media',
                link: '#share',
                linkText: 'Share Our Cause',
              },
            ].map((item, index) => (
              <div key={index} className="rounded-xl bg-white p-6 text-center">
                <h3 className="mb-3 text-xl font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="mb-4 text-gray-600">{item.description}</p>
                <a
                  href={item.link}
                  className="font-medium text-primary hover:underline"
                >
                  {item.linkText} →
                </a>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

// Made with Bob
