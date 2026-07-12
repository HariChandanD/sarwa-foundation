import { HeroSection } from '@/components/sections/HeroSection';
import { ImpactStatsSection } from '@/components/sections/ImpactStatsSection';
import { FeaturedCampaignsSection } from '@/components/sections/FeaturedCampaignsSection';
import { CTASection } from '@/components/sections/CTASection';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title="Every Life Deserves Love and Care"
        subtitle="Join us in our mission to rescue, rehabilitate, and rehome animals in need"
        primaryCTA={{ text: 'Donate Now', href: '/donate' }}
        secondaryCTA={{ text: 'Learn More', href: '/about' }}
      />

      {/* Impact Stats Section */}
      <ImpactStatsSection
        title="Our Impact in Numbers"
        subtitle="Together, we're making a real difference in the lives of animals"
      />

      {/* Featured Campaigns Section */}
      <FeaturedCampaignsSection
        title="Active Campaigns"
        subtitle="Your support directly impacts the lives of animals in need. Choose a campaign that resonates with you."
      />

      {/* CTA Section - Volunteer */}
      <CTASection
        variant="volunteer"
        title="Join Our Community of Animal Lovers"
        description="Make a hands-on difference in the lives of animals. Whether you have a few hours a week or want to foster, we need you."
      />

      {/* CTA Section - Emergency */}
      <CTASection
        variant="emergency"
        title="Emergency Rescue Fund"
        description="We have urgent cases requiring immediate medical attention. Your quick action can save lives today."
        className="mt-0"
      />
    </>
  );
}

// Made with Bob
