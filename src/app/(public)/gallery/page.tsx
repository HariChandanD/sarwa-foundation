import { Metadata } from 'next';
import { HeroSection } from '@/components/sections/HeroSection';
import { Container } from '@/components/layout/Container';
import { Heart, Image as ImageIcon, Video, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Gallery - Sarwa Foundation',
  description:
    'Browse photos and videos of rescued animals, adoption success stories, and our team in action at Sarwa Foundation.',
};

const galleryItems = [
  {
    id: 1,
    type: 'image',
    title: 'Rescue Operation - Mumbai Floods',
    description: 'Our team rescuing animals during the 2024 monsoon floods',
    date: '2024-01-15',
    category: 'Rescue Operations',
    image: '/images/gallery/rescue-1.jpg',
  },
  {
    id: 2,
    type: 'image',
    title: 'Happy Adoption Day',
    description: 'Max finding his forever home with the Sharma family',
    date: '2024-01-10',
    category: 'Adoptions',
    image: '/images/gallery/adoption-1.jpg',
  },
  {
    id: 3,
    type: 'video',
    title: "Medical Miracle: Luna's Recovery",
    description: "Watch Luna's incredible journey from injury to full recovery",
    date: '2024-01-08',
    category: 'Medical Care',
    image: '/images/gallery/medical-1.jpg',
  },
  {
    id: 4,
    type: 'image',
    title: 'Sterilization Camp - Delhi',
    description:
      'Free sterilization drive helping control street animal population',
    date: '2024-01-05',
    category: 'Community Programs',
    image: '/images/gallery/camp-1.jpg',
  },
  {
    id: 5,
    type: 'image',
    title: 'Volunteer Training Day',
    description: 'New volunteers learning animal care basics',
    date: '2024-01-03',
    category: 'Volunteers',
    image: '/images/gallery/volunteers-1.jpg',
  },
  {
    id: 6,
    type: 'image',
    title: 'Puppies Ready for Adoption',
    description: 'Adorable puppies looking for their forever homes',
    date: '2023-12-28',
    category: 'Adoptions',
    image: '/images/gallery/puppies-1.jpg',
  },
  {
    id: 7,
    type: 'video',
    title: 'A Day at the Shelter',
    description: 'Behind the scenes at our main shelter facility',
    date: '2023-12-25',
    category: 'Shelter Life',
    image: '/images/gallery/shelter-1.jpg',
  },
  {
    id: 8,
    type: 'image',
    title: 'Community Awareness Event',
    description: 'Educating children about animal welfare and compassion',
    date: '2023-12-20',
    category: 'Education',
    image: '/images/gallery/education-1.jpg',
  },
  {
    id: 9,
    type: 'image',
    title: 'Emergency Night Rescue',
    description: 'Rescuing an injured dog from a highway accident',
    date: '2023-12-18',
    category: 'Rescue Operations',
    image: '/images/gallery/rescue-2.jpg',
  },
];

const categories = [
  'All',
  'Rescue Operations',
  'Adoptions',
  'Medical Care',
  'Community Programs',
  'Volunteers',
  'Shelter Life',
  'Education',
];

export default function GalleryPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        variant="about"
        title="Our Gallery"
        subtitle="Witness the impact of compassion through photos and videos of rescues, recoveries, and happy endings"
        primaryCTA={{ text: 'Support Our Work', href: '/donate' }}
        secondaryCTA={{ text: 'Share Your Story', href: '/contact' }}
      />

      {/* Gallery Filters */}
      <section className="border-b bg-white py-8">
        <Container>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`rounded-full px-6 py-2 font-medium transition-all ${
                  index === 0
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Gallery Grid */}
      <section className="bg-gray-50 py-20">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                className="group relative cursor-pointer overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                {/* Image/Video Thumbnail */}
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {item.type === 'video' ? (
                      <Video className="h-16 w-16 text-primary/30" />
                    ) : (
                      <ImageIcon className="h-16 w-16 text-primary/30" />
                    )}
                  </div>

                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="p-4 text-center text-white">
                      <h3 className="mb-2 text-lg font-semibold">
                        {item.title}
                      </h3>
                      <p className="text-sm text-white/90">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Type Badge */}
                  <div className="absolute left-4 top-4">
                    <Badge
                      className={
                        item.type === 'video' ? 'bg-red-500' : 'bg-blue-500'
                      }
                    >
                      {item.type === 'video' ? (
                        <>
                          <Video className="mr-1 h-3 w-3" />
                          Video
                        </>
                      ) : (
                        <>
                          <ImageIcon className="mr-1 h-3 w-3" />
                          Photo
                        </>
                      )}
                    </Badge>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute right-4 top-4">
                    <Badge className="bg-white text-gray-900">
                      {item.category}
                    </Badge>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="mb-1 font-semibold text-gray-900 transition-colors group-hover:text-primary">
                    {item.title}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="mr-1 h-4 w-4" />
                    {new Date(item.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="mt-12 text-center">
            <button className="rounded-lg bg-primary px-8 py-3 font-medium text-white transition-colors hover:bg-primary/90">
              Load More
            </button>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-20">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Moments That Matter
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-gray-600">
              Every photo tells a story of hope, resilience, and the power of
              compassion.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-4">
            {[
              { value: '10,000+', label: 'Photos Captured', icon: ImageIcon },
              { value: '500+', label: 'Video Stories', icon: Video },
              { value: '5,000+', label: 'Happy Endings', icon: Heart },
              { value: '50+', label: 'Locations Covered', icon: Calendar },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="mb-2 text-4xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-br from-primary to-secondary py-20 text-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              Be Part of Our Story
            </h2>
            <p className="mb-8 text-xl text-white/90">
              Every rescue, every recovery, every adoption is made possible by
              supporters like you.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="/donate"
                className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 font-medium text-primary transition-colors hover:bg-white/90"
              >
                <Heart className="mr-2 h-5 w-5" />
                Support Our Mission
              </a>
              <a
                href="/volunteer"
                className="inline-flex items-center justify-center rounded-lg border-2 border-white bg-transparent px-8 py-3 font-medium text-white transition-colors hover:bg-white/10"
              >
                Join Our Team
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

// Made with Bob
