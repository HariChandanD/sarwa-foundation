import { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import Image from 'next/image';
import { Heart, MapPin, Users, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Rescue Stories - Sarwa Society for Animal Welfare',
  description:
    'Real rescue stories from SARWA - on-site emergency response, veterinary coordination, and community-driven animal welfare in action.',
};

const placeholderStories = [
  {
    id: 1,
    animalType: 'Street Dog',
    image:
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&h=600&fit=crop',
    location: 'Bangalore',
    status: 'Coming Soon',
  },
  {
    id: 2,
    animalType: 'Cow',
    image:
      'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800&h=600&fit=crop',
    location: 'Bangalore',
    status: 'Coming Soon',
  },
  {
    id: 3,
    animalType: 'Calf',
    image:
      'https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=800&h=600&fit=crop',
    location: 'Bangalore',
    status: 'Coming Soon',
  },
  {
    id: 4,
    animalType: 'Puppy',
    image:
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=600&fit=crop',
    location: 'Bangalore',
    status: 'Coming Soon',
  },
  {
    id: 5,
    animalType: 'Cat',
    image:
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&h=600&fit=crop',
    location: 'Bangalore',
    status: 'Coming Soon',
  },
  {
    id: 6,
    animalType: 'Rescue Operation',
    image:
      'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=600&fit=crop',
    location: 'Bangalore',
    status: 'Coming Soon',
  },
];

export default function RescueStoriesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary py-16 text-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">
              Rescue Stories
            </h1>
            <p className="text-lg text-white/90">
              Real stories of hope, compassion, and community action
            </p>
          </div>
        </Container>
      </section>

      {/* Our Rescue Philosophy */}
      <section className="bg-white py-16">
        <Container>
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
              Our Rescue Approach
            </h2>
            <div className="space-y-6 text-gray-600">
              <p className="text-lg">
                At SARWA, every rescue begins with a call from a concerned
                community member. Our approach is built on rapid response,
                on-site emergency care, and collaborative partnerships that
                ensure every animal receives the help they need.
              </p>

              <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-lg bg-background p-6">
                  <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    On-Site Emergency Response
                  </h3>
                  <p className="text-sm text-gray-600">
                    Our trained volunteers provide immediate first aid and
                    emergency medical care directly at the rescue location,
                    reducing stress and enabling faster treatment.
                  </p>
                </div>

                <div className="rounded-lg bg-background p-6">
                  <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    Veterinary Coordination
                  </h3>
                  <p className="text-sm text-gray-600">
                    We work closely with veterinary partners and organizations
                    like CUPA for specialized treatment, surgery, and long-term
                    rehabilitation when needed.
                  </p>
                </div>

                <div className="rounded-lg bg-background p-6">
                  <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    Community Participation
                  </h3>
                  <p className="text-sm text-gray-600">
                    Every rescue is made possible through the support of
                    compassionate volunteers, donors, and community members who
                    share our vision.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Rescue Stories Grid */}
      <section className="bg-background py-16">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              Rescue Stories
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Each rescue represents a life saved through community action and
              compassionate care. Real SARWA rescue stories will be shared here
              as they happen.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {placeholderStories.map((story) => (
              <article
                key={story.id}
                className="overflow-hidden rounded-lg bg-white shadow-md"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={story.image}
                    alt={`${story.animalType} rescue`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute left-4 top-4">
                    <Badge className="bg-white text-primary">
                      {story.status}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="mb-3 text-xl font-bold text-gray-900">
                    {story.animalType}
                  </h3>

                  <div className="mb-4 space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>Rescue Location: {story.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>Date: To be updated</span>
                    </div>
                  </div>

                  <div className="rounded-lg bg-background p-4">
                    <p className="text-sm font-medium text-gray-900">
                      Real SARWA rescue story coming soon.
                    </p>
                    <div className="mt-3 space-y-1 text-xs text-gray-600">
                      <p>• Rescue summary</p>
                      <p>• Treatment provided</p>
                      <p>• Current status</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="bg-primary py-16 text-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold">
              Every Rescue is Possible Because of Volunteers and Donors
            </h2>
            <p className="mb-8 text-lg text-white/90">
              Join us in making a difference for animals in need. Your support
              enables us to respond quickly to emergencies and provide
              compassionate care.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="/volunteer"
                className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 font-medium text-primary transition-colors hover:bg-white/90"
              >
                <Users className="mr-2 h-5 w-5" />
                Volunteer
              </a>
              <a
                href="/donate"
                className="inline-flex items-center justify-center rounded-lg border-2 border-white bg-transparent px-8 py-3 font-medium text-white transition-colors hover:bg-white/10"
              >
                <Heart className="mr-2 h-5 w-5" />
                Donate
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

// Made with Bob
