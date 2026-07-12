import { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { Container } from "@/components/layout/Container";
import { Heart, Users, Award, Target, Eye, Lightbulb } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us - Sarwa Foundation",
  description: "Learn about Sarwa Foundation's mission, vision, and the team dedicated to rescuing and rehabilitating animals in need.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        variant="about"
        title="About Sarwa Foundation"
        subtitle="Dedicated to creating a world where every animal is treated with compassion and respect"
        primaryCTA={{ text: "Support Our Mission", href: "/donate" }}
        secondaryCTA={{ text: "Join Our Team", href: "/volunteer" }}
        stats={[
          { value: "15+", label: "Years of Service" },
          { value: "10,000+", label: "Animals Rescued" },
          { value: "50+", label: "Rescue Centers" },
        ]}
      />

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid md:grid-cols-3 gap-12">
            {/* Mission */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600">
                To rescue, rehabilitate, and rehome animals in need while promoting compassion and responsible pet ownership through education and community engagement.
              </p>
            </div>

            {/* Vision */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <Eye className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-600">
                A world where every animal is treated with dignity, compassion, and respect, and where human-animal relationships are based on mutual understanding and care.
              </p>
            </div>

            {/* Values */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <Lightbulb className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h2>
              <p className="text-gray-600">
                Compassion, integrity, transparency, and dedication guide everything we do. We believe in the power of community and the importance of every single life.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              Our Story
            </h2>
            <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
              <p>
                Sarwa Foundation was born from a simple yet powerful belief: every animal deserves a chance at a happy, healthy life. Founded in 2010 by a group of passionate animal lovers, we started with a small shelter and a big dream.
              </p>
              <p>
                What began as a modest operation rescuing street animals has grown into a comprehensive animal welfare organization with over 50 rescue centers across the country. Our journey has been marked by countless success stories, from critically injured animals nursed back to health to abandoned pets finding their forever homes.
              </p>
              <p>
                Today, Sarwa Foundation stands as a beacon of hope for animals in distress. We've rescued over 10,000 animals, facilitated 5,000+ adoptions, and provided medical care to thousands more. But our work is far from over.
              </p>
              <p>
                Every day, we encounter animals who need our help – whether it's emergency medical care, shelter from harsh conditions, or simply a loving home. With the support of our dedicated volunteers, generous donors, and compassionate community, we continue to make a difference, one life at a time.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* What We Do */}
      <section className="py-20 bg-white">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            What We Do
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Rescue Operations",
                description: "24/7 emergency response team ready to rescue animals in distress, from street accidents to natural disasters.",
              },
              {
                icon: Award,
                title: "Medical Care",
                description: "State-of-the-art veterinary facilities providing comprehensive medical treatment, surgeries, and rehabilitation.",
              },
              {
                icon: Users,
                title: "Adoption Services",
                description: "Careful matching process to ensure every animal finds the perfect forever home with responsible families.",
              },
              {
                icon: Heart,
                title: "Shelter & Care",
                description: "Safe, comfortable shelters providing food, medical care, and love to animals awaiting adoption.",
              },
              {
                icon: Award,
                title: "Education Programs",
                description: "Community outreach and education on responsible pet ownership, animal welfare, and compassion.",
              },
              {
                icon: Users,
                title: "Sterilization Drives",
                description: "Free sterilization programs to control street animal population humanely and prevent suffering.",
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <Icon className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-primary to-secondary text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join Us in Making a Difference
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Whether through donations, volunteering, or adoption, you can be part of our mission to create a better world for animals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/donate"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary rounded-lg hover:bg-white/90 transition-colors font-medium"
              >
                <Heart className="mr-2 h-5 w-5" />
                Donate Now
              </a>
              <a
                href="/volunteer"
                className="inline-flex items-center justify-center px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors font-medium"
              >
                <Users className="mr-2 h-5 w-5" />
                Become a Volunteer
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

// Made with Bob
