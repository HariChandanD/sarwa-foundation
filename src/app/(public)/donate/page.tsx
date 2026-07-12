import { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { Container } from "@/components/layout/Container";
import { Heart, Shield, TrendingUp, Users, Check, CreditCard, Smartphone, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Donate - Sarwa Foundation",
  description: "Support Sarwa Foundation's mission to rescue and rehabilitate animals. Your donation directly impacts lives. 100% transparent and tax-deductible.",
};

const donationAmounts = [
  { amount: 500, impact: "Feeds 5 animals for a day" },
  { amount: 1000, impact: "Provides basic medical care" },
  { amount: 2500, impact: "Covers emergency surgery" },
  { amount: 5000, impact: "Supports a rescue operation" },
  { amount: 10000, impact: "Sponsors an animal for a month" },
  { amount: 25000, impact: "Funds a sterilization camp" },
];

const impactAreas = [
  {
    icon: Heart,
    title: "Emergency Rescue",
    description: "Immediate response to animals in distress",
    percentage: 30,
  },
  {
    icon: Shield,
    title: "Medical Care",
    description: "Surgeries, treatments, and rehabilitation",
    percentage: 35,
  },
  {
    icon: Users,
    title: "Shelter & Food",
    description: "Safe housing and nutritious meals",
    percentage: 25,
  },
  {
    icon: TrendingUp,
    title: "Programs & Outreach",
    description: "Education and community initiatives",
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
        primaryCTA={{ text: "Donate Now", href: "#donate-form" }}
        secondaryCTA={{ text: "Become Monthly Donor", href: "#monthly" }}
      />

      {/* Donation Form Section */}
      <section id="donate-form" className="py-20 bg-white">
        <Container>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Choose Your Contribution
              </h2>
              <p className="text-lg text-gray-600">
                Select an amount or enter a custom donation. Every rupee makes a difference.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Donation Amounts */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">One-Time Donation</h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {donationAmounts.map((item, index) => (
                    <button
                      key={index}
                      className="p-4 border-2 border-gray-200 rounded-xl hover:border-primary hover:bg-primary/5 transition-all text-left group"
                    >
                      <div className="text-2xl font-bold text-gray-900 mb-1">
                        ₹{item.amount.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600 group-hover:text-primary transition-colors">
                        {item.impact}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Custom Amount */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Or Enter Custom Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">
                      ₹
                    </span>
                    <input
                      type="number"
                      placeholder="Enter amount"
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none text-lg"
                    />
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <button className="p-4 border-2 border-primary bg-primary/5 rounded-xl flex flex-col items-center gap-2">
                      <CreditCard className="h-6 w-6 text-primary" />
                      <span className="text-sm font-medium">Card</span>
                    </button>
                    <button className="p-4 border-2 border-gray-200 rounded-xl flex flex-col items-center gap-2 hover:border-primary hover:bg-primary/5 transition-all">
                      <Smartphone className="h-6 w-6 text-gray-600" />
                      <span className="text-sm font-medium">UPI</span>
                    </button>
                    <button className="p-4 border-2 border-gray-200 rounded-xl flex flex-col items-center gap-2 hover:border-primary hover:bg-primary/5 transition-all">
                      <Building className="h-6 w-6 text-gray-600" />
                      <span className="text-sm font-medium">Bank</span>
                    </button>
                  </div>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90 text-lg py-6">
                  <Heart className="mr-2 h-5 w-5" />
                  Proceed to Payment
                </Button>
              </div>

              {/* Monthly Donation */}
              <div id="monthly" className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8">
                <Badge className="bg-primary text-white mb-4">Recommended</Badge>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Become a Monthly Donor
                </h3>
                <p className="text-gray-600 mb-6">
                  Join our community of regular supporters and make a sustained impact on animal welfare.
                </p>

                <div className="space-y-4 mb-6">
                  {[
                    "Predictable support for ongoing care",
                    "Exclusive updates and impact reports",
                    "Priority volunteer opportunities",
                    "Annual appreciation event invite",
                    "Tax benefits on total annual donation",
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  {[500, 1000, 2500, 5000].map((amount) => (
                    <button
                      key={amount}
                      className="p-3 bg-white border-2 border-gray-200 rounded-xl hover:border-primary hover:bg-primary/5 transition-all"
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
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              100% Transparent Fund Usage
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Every rupee is accounted for. Here's exactly how your donation makes an impact.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {impactAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-4xl font-bold text-primary mb-2">
                    {area.percentage}%
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {area.title}
                  </h3>
                  <p className="text-sm text-gray-600">{area.description}</p>
                </div>
              );
            })}
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-8 max-w-3xl mx-auto">
            <div className="flex items-start gap-4">
              <Shield className="h-8 w-8 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Our Commitment to Transparency
                </h3>
                <p className="text-gray-700 mb-4">
                  We publish detailed financial reports quarterly and maintain complete transparency in all our operations. Your trust is our responsibility.
                </p>
                <a href="/about/transparency" className="text-primary font-medium hover:underline">
                  View Financial Reports →
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Tax Benefits */}
      <section className="py-20 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              Tax Benefits
            </h2>
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-8">
              <div className="flex items-start gap-4">
                <Check className="h-8 w-8 text-green-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    80G Tax Exemption Certificate
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Sarwa Foundation is registered under Section 80G of the Income Tax Act. Your donations are eligible for tax deductions as per Indian tax laws.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Instant tax receipt via email</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Annual consolidated statement for regular donors</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
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
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Other Ways to Support
            </h2>
            <p className="text-lg text-gray-600">
              Can't donate right now? There are many other ways to help our cause.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Volunteer Your Time",
                description: "Join our team and make a hands-on difference",
                link: "/volunteer",
                linkText: "Become a Volunteer",
              },
              {
                title: "Foster an Animal",
                description: "Provide temporary care while they await adoption",
                link: "/foster",
                linkText: "Learn About Fostering",
              },
              {
                title: "Spread the Word",
                description: "Share our mission on social media",
                link: "#share",
                linkText: "Share Our Cause",
              },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <a
                  href={item.link}
                  className="text-primary font-medium hover:underline"
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
