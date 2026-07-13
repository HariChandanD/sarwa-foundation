import { Metadata } from 'next';
import { HeroSection } from '@/components/sections/HeroSection';
import { Container } from '@/components/layout/Container';
import Image from 'next/image';
import {
  Heart,
  Stethoscope,
  Home,
  GraduationCap,
  Users,
  Utensils,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Programs - Sarwa Society for Animal Welfare',
  description:
    'Learn about our community-driven animal welfare programs including rescue response, veterinary coordination, feeding programs, and adoption support in Bangalore.',
};

const programs = [
  {
    icon: Heart,
    title: 'Animal Rescue Response',
    description:
      'We respond to calls about injured, sick, or distressed animals in our community and provide immediate assistance.',
    features: [
      'Emergency rescue coordination',
      'Transport to veterinary hospitals',
      'First aid and immediate care',
      'Follow-up and recovery support',
    ],
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    image:
      'https://images.unsplash.com/photo-1548681528-6a5c45b66b42?w=800&h=600&fit=crop',
    imageAlt: 'Volunteer rescuing injured street dog',
  },
  {
    icon: Stethoscope,
    title: 'Veterinary Coordination',
    description:
      'We coordinate with local veterinary hospitals to ensure rescued animals receive proper medical treatment and care.',
    features: [
      'Veterinary hospital coordination',
      'Treatment arrangement and support',
      'Medical expense assistance',
      'Post-treatment care guidance',
    ],
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    image:
      'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=800&h=600&fit=crop',
    imageAlt: 'Veterinarian treating rescued animal',
  },
  {
    icon: Utensils,
    title: 'Feeding Programs',
    description:
      'Regular feeding of stray dogs, cows, and other street animals in our community to ensure they have access to nutritious food.',
    features: [
      'Daily feeding of street animals',
      'Nutritious food distribution',
      'Water provision during summer',
      'Community feeding points',
    ],
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    image:
      'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=800&h=600&fit=crop',
    imageAlt: 'Volunteers feeding stray dogs',
  },
  {
    icon: Home,
    title: 'Adoption & Foster Support',
    description:
      'We help connect rescued animals with loving families and provide support throughout the adoption process.',
    features: [
      'Adoption facilitation',
      'Foster care coordination',
      'Adoption counseling',
      'Post-adoption guidance',
    ],
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
    image:
      'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&h=600&fit=crop',
    imageAlt: 'Happy adopted dog with new family',
  },
  {
    icon: GraduationCap,
    title: 'Community Awareness',
    description:
      'Educating the community about animal welfare, responsible pet ownership, and compassionate treatment of street animals.',
    features: [
      'Animal welfare education',
      'Responsible pet ownership guidance',
      'Community workshops',
      'Social media awareness campaigns',
    ],
    color: 'text-orange-500',
    bgColor: 'bg-orange-50',
    image:
      'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800&h=600&fit=crop',
    imageAlt: 'Community awareness session about animal welfare',
  },
  {
    icon: Users,
    title: 'Volunteer Network',
    description:
      'Building a community of dedicated volunteers who help with rescue, feeding, and care activities.',
    features: [
      'Volunteer coordination',
      'Training and guidance',
      'Community building',
      'Collaborative rescue efforts',
    ],
    color: 'text-teal-500',
    bgColor: 'bg-teal-50',
    image:
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
    imageAlt: 'Volunteers working together for animal welfare',
  },
];

export default function ProgramsPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        variant="about"
        title="Our Programs"
        subtitle="Community-driven initiatives to rescue, care for, and protect animals in need"
        primaryCTA={{ text: 'Support Our Work', href: '/donate' }}
        secondaryCTA={{ text: 'Join as Volunteer', href: '/volunteer' }}
      />

      {/* Introduction */}
      <section className="bg-background py-16">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              What We Do
            </h2>
            <p className="text-lg text-gray-600">
              As a small community-based organization, we focus on practical,
              hands-on animal welfare work. Our programs are designed to provide
              immediate help to animals in distress while building a more
              compassionate community.
            </p>
          </div>
        </Container>
      </section>

      {/* Programs Grid */}
      <section className="bg-white py-16">
        <Container>
          <div className="space-y-16">
            {programs.map((program, index) => {
              const Icon = program.icon;
              const isEven = index % 2 === 0;
              return (
                <div
                  key={index}
                  className={`grid gap-8 md:grid-cols-2 md:items-center ${
                    isEven ? '' : 'md:grid-flow-dense'
                  }`}
                >
                  <div className={isEven ? '' : 'md:col-start-2'}>
                    <div
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${program.bgColor} mb-4`}
                    >
                      <Icon className={`h-6 w-6 ${program.color}`} />
                    </div>
                    <h3 className="mb-3 text-2xl font-bold text-gray-900">
                      {program.title}
                    </h3>
                    <p className="mb-6 text-gray-600">{program.description}</p>
                    <ul className="space-y-3">
                      {program.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <svg
                            className={`h-5 w-5 ${program.color} mr-3 mt-0.5 flex-shrink-0`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div
                    className={`relative h-80 overflow-hidden rounded-lg ${
                      isEven ? '' : 'md:col-start-1 md:row-start-1'
                    }`}
                  >
                    <Image
                      src={program.image}
                      alt={program.imageAlt}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* How You Can Help */}
      <section className="bg-background py-16">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              How You Can Help
            </h2>
            <p className="mb-8 text-lg text-gray-600">
              Our programs run entirely on community support. Every contribution
              helps us continue our work and reach more animals in need.
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-lg bg-card p-6">
                <Heart className="mx-auto mb-3 h-8 w-8 text-primary" />
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  Donate
                </h3>
                <p className="text-sm text-gray-600">
                  Support our rescue and care activities
                </p>
              </div>
              <div className="rounded-lg bg-card p-6">
                <Users className="mx-auto mb-3 h-8 w-8 text-primary" />
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  Volunteer
                </h3>
                <p className="text-sm text-gray-600">
                  Join our team of dedicated volunteers
                </p>
              </div>
              <div className="rounded-lg bg-card p-6">
                <Home className="mx-auto mb-3 h-8 w-8 text-primary" />
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  Adopt
                </h3>
                <p className="text-sm text-gray-600">
                  Give a rescued animal a forever home
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="bg-primary py-16 text-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold">
              Join Us in Making a Difference
            </h2>
            <p className="mb-8 text-lg text-white/90">
              Every small action counts. Together, we can create a more
              compassionate community for all animals.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="/donate"
                className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 font-medium text-primary transition-colors hover:bg-white/90"
              >
                <Heart className="mr-2 h-5 w-5" />
                Support Our Programs
              </a>
              <a
                href="/volunteer"
                className="inline-flex items-center justify-center rounded-lg border-2 border-white bg-transparent px-8 py-3 font-medium text-white transition-colors hover:bg-white/10"
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
