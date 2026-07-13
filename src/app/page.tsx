import { HeroSection } from '@/components/sections/HeroSection';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <>
      {/* 1. Hero Section */}
      <HeroSection
        title="Every Life Deserves Love and Care"
        subtitle="Join us in our mission to rescue, rehabilitate, and rehome animals in our community"
        primaryCTA={{ text: 'Donate Now', href: '/donate' }}
        secondaryCTA={{ text: 'Learn More', href: '/about' }}
      />

      {/* 2. Who We Are Section */}
      <section className="bg-background py-16">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="relative h-[400px] overflow-hidden rounded-lg">
              <Image
                src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=600&fit=crop"
                alt="Volunteers caring for rescued street dogs"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900">
                Who We Are
              </h2>
              <p className="mb-4 text-lg text-gray-600">
                We are a small community-based animal rescue organization
                dedicated to saving and caring for animals in need.
              </p>
              <p className="mb-6 text-lg text-gray-600">
                Our team of volunteers works tirelessly to provide medical care,
                shelter, and love to abandoned and injured animals until they
                find their forever homes.
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

      {/* 3. What We Do Section */}
      <section className="bg-card py-16">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              What We Do
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Our mission is simple: rescue, rehabilitate, and rehome animals in
              need within our community.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-background p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <svg
                  className="h-6 w-6 text-primary"
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
                We respond to calls about abandoned, injured, or distressed
                animals and provide immediate care and shelter.
              </p>
            </div>
            <div className="rounded-lg bg-background p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <svg
                  className="h-6 w-6 text-primary"
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
                Every rescued animal receives necessary medical treatment,
                vaccinations, and spaying/neutering.
              </p>
            </div>
            <div className="rounded-lg bg-background p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <svg
                  className="h-6 w-6 text-primary"
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
                We carefully match rescued animals with loving families,
                ensuring each pet finds the perfect forever home.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. Recent Rescue Stories Section */}
      <section className="bg-background py-16">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              Recent Rescue Stories
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Every animal has a story. Here are some of our recent rescues
              finding their way to safety and love.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="overflow-hidden rounded-lg bg-card shadow-sm">
              <div className="relative h-64">
                <Image
                  src="https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?w=600&h=400&fit=crop"
                  alt="Rescued street dog recovering"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  Max's Second Chance
                </h3>
                <p className="mb-4 text-gray-600">
                  Found abandoned on the roadside, Max was scared and
                  malnourished. After weeks of care and love, he's now healthy
                  and ready for adoption.
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link href="/rescue-stories">Read More</Link>
                </Button>
              </div>
            </div>
            <div className="overflow-hidden rounded-lg bg-card shadow-sm">
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
                  This sweet cat was found injured after an accident. Thanks to
                  emergency medical care and foster support, Luna has fully
                  recovered.
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link href="/rescue-stories">Read More</Link>
                </Button>
              </div>
            </div>
            <div className="overflow-hidden rounded-lg bg-card shadow-sm">
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
                  Rescued from a neglectful situation, little Bella is now
                  thriving in foster care and learning what it means to be
                  loved.
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

      {/* 5. Gallery Preview Section */}
      <section className="bg-card py-16">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              Our Happy Tails
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              See the joy and love in action through our gallery of rescued
              animals and their new families.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="relative h-64 overflow-hidden rounded-lg">
              <Image
                src="https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=400&h=400&fit=crop"
                alt="Happy rescued dog with volunteer"
                fill
                className="object-cover transition-transform hover:scale-105"
              />
            </div>
            <div className="relative h-64 overflow-hidden rounded-lg">
              <Image
                src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop"
                alt="Rescued cat"
                fill
                className="object-cover transition-transform hover:scale-105"
              />
            </div>
            <div className="relative h-64 overflow-hidden rounded-lg">
              <Image
                src="https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=400&h=400&fit=crop"
                alt="Rescued puppy playing"
                fill
                className="object-cover transition-transform hover:scale-105"
              />
            </div>
            <div className="relative h-64 overflow-hidden rounded-lg">
              <Image
                src="https://images.unsplash.com/photo-1573865526739-10c1d3a1f0cc?w=400&h=400&fit=crop"
                alt="Adopted kitten"
                fill
                className="object-cover transition-transform hover:scale-105"
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

      {/* 6. Get Involved Section */}
      <section className="bg-primary py-16 text-white">
        <Container>
          <div className="text-center">
            <h2 className="mb-6 text-3xl font-bold">Get Involved</h2>
            <p className="mx-auto mb-12 max-w-2xl text-lg text-primary-foreground/90">
              Every contribution makes a difference. Whether you donate,
              volunteer, or spread the word, you're helping us save lives.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="min-w-[200px]"
              >
                <Link href="/volunteer">Become a Volunteer</Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="min-w-[200px] bg-accent hover:bg-accent/90"
              >
                <Link href="/donate">Donate Now</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

// Made with Bob
