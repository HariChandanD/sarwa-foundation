import { HeroSection } from '@/components/sections/HeroSection';
import { ImpactStatsSection } from '@/components/sections/ImpactStatsSection';
import { CTASection } from '@/components/sections/CTASection';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title="Every Life Deserves Love and Care"
        subtitle="Join us in our mission to rescue, rehabilitate, and rehome animals in our community"
        primaryCTA={{ text: 'Donate Now', href: '/donate' }}
        secondaryCTA={{ text: 'Learn More', href: '/about' }}
      />

      {/* About Preview Section */}
      <section className="bg-white py-16">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="relative h-[400px] overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&h=600&fit=crop"
                alt="Rescued animals"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                About Sarwa Foundation
              </h2>
              <p className="mb-6 text-lg text-gray-600">
                We are a small community-based animal rescue organization dedicated to saving and caring for animals in need. Every rescue, every adoption, and every life saved is made possible by compassionate people like you.
              </p>
              <p className="mb-8 text-lg text-gray-600">
                Our team of volunteers works tirelessly to provide medical care, shelter, and love to abandoned and injured animals until they find their forever homes.
              </p>
              <div>
                <Button asChild size="lg">
                  <Link href="/about">Learn More About Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* What We Do Section */}
      <section className="bg-gray-50 py-16">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              What We Do
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Our mission is simple: rescue, rehabilitate, and rehome animals in need within our community.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-xl bg-white p-8 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100">
                <svg
                  className="h-6 w-6 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900">
                Animal Rescue
              </h3>
              <p className="text-gray-600">
                We respond to calls about abandoned, injured, or distressed animals in our community and provide immediate care and shelter.
              </p>
            </div>
            <div className="rounded-xl bg-white p-8 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100">
                <svg
                  className="h-6 w-6 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900">
                Medical Care
              </h3>
              <p className="text-gray-600">
                Every rescued animal receives necessary medical treatment, vaccinations, and spaying/neutering before adoption.
              </p>
            </div>
            <div className="rounded-xl bg-white p-8 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100">
                <svg
                  className="h-6 w-6 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900">
                Adoption Services
              </h3>
              <p className="text-gray-600">
                We carefully match rescued animals with loving families, ensuring each pet finds the perfect forever home.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Impact Stats Section */}
      <ImpactStatsSection
        title="Our Impact in Numbers"
        subtitle="Together, we're making a real difference in the lives of animals in our community"
      />

      {/* Recent Rescue Stories Section */}
      <section className="bg-white py-16">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Recent Rescue Stories
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Every animal has a story. Here are some of our recent rescues finding their way to safety and love.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-lg">
              <div className="relative h-64">
                <Image
                  src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&h=400&fit=crop"
                  alt="Rescued dog"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  Max's Second Chance
                </h3>
                <p className="mb-4 text-gray-600">
                  Found abandoned on the roadside, Max was scared and malnourished. After weeks of care and love, he's now healthy and ready for adoption.
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link href="/rescue-stories">Read More</Link>
                </Button>
              </div>
            </div>
            <div className="overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-lg">
              <div className="relative h-64">
                <Image
                  src="https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&h=400&fit=crop"
                  alt="Rescued cat"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  Luna's Journey Home
                </h3>
                <p className="mb-4 text-gray-600">
                  This sweet cat was found injured after an accident. Thanks to emergency medical care and foster support, Luna has fully recovered.
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link href="/rescue-stories">Read More</Link>
                </Button>
              </div>
            </div>
            <div className="overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-lg">
              <div className="relative h-64">
                <Image
                  src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=400&fit=crop"
                  alt="Rescued puppy"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  Bella's New Beginning
                </h3>
                <p className="mb-4 text-gray-600">
                  Rescued from a neglectful situation, little Bella is now thriving in foster care and learning what it means to be loved.
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link href="/rescue-stories">Read More</Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-12 text-center">
            <Button asChild size="lg">
              <Link href="/rescue-stories">View All Rescue Stories</Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* Gallery Preview Section */}
      <section className="bg-gray-50 py-16">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Our Happy Tails
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              See the joy and love in action through our gallery of rescued animals and their new families.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="relative h-64 overflow-hidden rounded-lg">
              <Image
                src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=400&fit=crop"
                alt="Happy adopted dog"
                fill
                className="object-cover transition-transform hover:scale-110"
              />
            </div>
            <div className="relative h-64 overflow-hidden rounded-lg">
              <Image
                src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop"
                alt="Rescued cat"
                fill
                className="object-cover transition-transform hover:scale-110"
              />
            </div>
            <div className="relative h-64 overflow-hidden rounded-lg">
              <Image
                src="https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=400&h=400&fit=crop"
                alt="Playful puppy"
                fill
                className="object-cover transition-transform hover:scale-110"
              />
            </div>
            <div className="relative h-64 overflow-hidden rounded-lg">
              <Image
                src="https://images.unsplash.com/photo-1573865526739-10c1d3a1f0cc?w=400&h=400&fit=crop"
                alt="Adopted kitten"
                fill
                className="object-cover transition-transform hover:scale-110"
              />
            </div>
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/gallery">View Full Gallery</Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* CTA Section - Volunteer */}
      <CTASection
        variant="volunteer"
        title="Join Our Community of Animal Lovers"
        description="Make a hands-on difference in the lives of animals. Whether you have a few hours a week or want to foster, we need you."
      />

      {/* CTA Section - Donate */}
      <CTASection
        variant="donate"
        title="Help Us Save More Lives"
        description="Your donation directly supports rescue operations, medical care, and finding forever homes for animals in need."
        className="mt-0"
      />

      {/* Contact Section */}
      <section className="bg-primary-800 py-16 text-white">
        <Container>
          <div className="text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Get in Touch
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-primary-100">
              Have questions or want to report an animal in need? We're here to help. Reach out to us anytime.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" variant="secondary">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

// Made with Bob
