import { Metadata } from 'next';
import { HeroSection } from '@/components/sections/HeroSection';
import { Container } from '@/components/layout/Container';
import { Heart, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Rescue Stories - Sarwa Foundation',
  description:
    'Read inspiring stories of animals rescued, rehabilitated, and rehomed by Sarwa Foundation. Every story is a testament to hope and compassion.',
};

const stories = [
  {
    id: 1,
    title: "Max's Journey: From Street to Forever Home",
    excerpt:
      "Found injured and alone on a busy highway, Max's transformation is nothing short of miraculous. Today, he's a beloved family member.",
    image: '/images/stories/max.jpg',
    date: '2024-01-15',
    location: 'Mumbai',
    category: 'Success Story',
    readTime: '5 min read',
  },
  {
    id: 2,
    title: 'The Miracle of Luna: A Second Chance at Life',
    excerpt:
      "Rescued from a construction site with severe injuries, Luna's recovery journey inspired our entire team and community.",
    image: '/images/stories/luna.jpg',
    date: '2024-01-10',
    location: 'Delhi',
    category: 'Medical Rescue',
    readTime: '7 min read',
  },
  {
    id: 3,
    title: "Bella and Her Puppies: A Mother's Love",
    excerpt:
      'A pregnant street dog found shelter just in time. Bella and all her puppies found loving homes.',
    image: '/images/stories/bella.jpg',
    date: '2024-01-05',
    location: 'Bangalore',
    category: 'Rescue & Adoption',
    readTime: '6 min read',
  },
  {
    id: 4,
    title: "Rocky's Recovery: Against All Odds",
    excerpt:
      "Hit by a vehicle and left for dead, Rocky's will to survive and our team's dedication brought him back to health.",
    image: '/images/stories/rocky.jpg',
    date: '2023-12-28',
    location: 'Pune',
    category: 'Emergency Rescue',
    readTime: '8 min read',
  },
  {
    id: 5,
    title: 'Whiskers: The Cat Who Came Back',
    excerpt:
      'Lost for months, Whiskers was reunited with his family through our microchip scanning program.',
    image: '/images/stories/whiskers.jpg',
    date: '2023-12-20',
    location: 'Chennai',
    category: 'Reunion',
    readTime: '4 min read',
  },
  {
    id: 6,
    title: 'The Great Flood Rescue: 50 Lives Saved',
    excerpt:
      'When floods hit the region, our team worked tirelessly to rescue 50 animals trapped in rising waters.',
    image: '/images/stories/flood-rescue.jpg',
    date: '2023-12-15',
    location: 'Kerala',
    category: 'Disaster Response',
    readTime: '10 min read',
  },
];

export default function RescueStoriesPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        variant="about"
        title="Rescue Stories"
        subtitle="Every rescue is a story of hope, resilience, and the power of compassion. These are the lives we've touched and the hearts we've healed."
        primaryCTA={{ text: 'Support More Rescues', href: '/donate' }}
        secondaryCTA={{ text: 'Share Your Story', href: '/contact' }}
      />

      {/* Stories Grid */}
      <section className="bg-white py-20">
        <Container>
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Stories of Hope and Transformation
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-gray-600">
              Each story represents a life saved, a family completed, and a
              community inspired to make a difference.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {stories.map((story) => (
              <article
                key={story.id}
                className="group overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Heart className="h-24 w-24 text-primary/30" />
                  </div>
                  <div className="absolute left-4 top-4">
                    <Badge className="bg-white text-primary">
                      {story.category}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="mb-3 text-xl font-bold text-gray-900 transition-colors group-hover:text-primary">
                    {story.title}
                  </h3>
                  <p className="mb-4 line-clamp-3 text-gray-600">
                    {story.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="mb-4 flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(story.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {story.location}
                      </span>
                    </div>
                  </div>

                  {/* Read More */}
                  <a
                    href={`/rescue-stories/${story.id}`}
                    className="inline-flex items-center font-medium text-primary transition-all hover:gap-2"
                  >
                    Read Full Story
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* Load More */}
          <div className="mt-12 text-center">
            <button className="rounded-lg bg-primary px-8 py-3 font-medium text-white transition-colors hover:bg-primary/90">
              Load More Stories
            </button>
          </div>
        </Container>
      </section>

      {/* Impact Stats */}
      <section className="bg-gray-50 py-20">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Every Story Matters
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-gray-600">
              Behind every number is a life transformed, a family reunited, or a
              community inspired.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-4">
            {[
              { value: '10,000+', label: 'Animals Rescued' },
              { value: '5,000+', label: 'Adoption Success' },
              { value: '98%', label: 'Recovery Rate' },
              { value: '24/7', label: 'Emergency Response' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mb-2 text-4xl font-bold text-primary md:text-5xl">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-br from-primary to-secondary py-20 text-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              Be Part of the Next Success Story
            </h2>
            <p className="mb-8 text-xl text-white/90">
              Your support helps us rescue more animals and create more happy
              endings. Every contribution makes a difference.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="/donate"
                className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 font-medium text-primary transition-colors hover:bg-white/90"
              >
                <Heart className="mr-2 h-5 w-5" />
                Donate Now
              </a>
              <a
                href="/volunteer"
                className="inline-flex items-center justify-center rounded-lg border-2 border-white bg-transparent px-8 py-3 font-medium text-white transition-colors hover:bg-white/10"
              >
                Volunteer With Us
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

// Made with Bob
