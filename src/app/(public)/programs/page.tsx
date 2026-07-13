import { Metadata } from 'next';
import { HeroSection } from '@/components/sections/HeroSection';
import { Container } from '@/components/layout/Container';
import {
  Heart,
  Stethoscope,
  Home,
  GraduationCap,
  Users,
  Shield,
  Scissors,
  BookOpen,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Programs - Sarwa Society for Animal Welfare',
  description:
    "Discover Sarwa Society for Animal Welfare's comprehensive programs including rescue operations, medical care, adoption services, and community education.",
};

const programs = [
  {
    icon: Heart,
    title: 'Emergency Rescue',
    description:
      '24/7 emergency response team ready to rescue animals in distress from accidents, abuse, or natural disasters.',
    features: [
      'Round-the-clock helpline',
      'Trained rescue professionals',
      'Specialized rescue equipment',
      'Immediate medical assessment',
    ],
    color: 'text-red-500',
    bgColor: 'bg-red-50',
  },
  {
    icon: Stethoscope,
    title: 'Veterinary Care',
    description:
      'State-of-the-art medical facilities providing comprehensive treatment, surgeries, and rehabilitation services.',
    features: [
      'Fully equipped veterinary hospitals',
      'Experienced veterinarians',
      'Advanced surgical facilities',
      'Post-operative care',
    ],
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  {
    icon: Home,
    title: 'Adoption Program',
    description:
      'Careful matching process to ensure every rescued animal finds a loving, permanent home with responsible families.',
    features: [
      'Thorough screening process',
      'Home visits and counseling',
      'Post-adoption support',
      'Lifetime guidance',
    ],
    color: 'text-green-500',
    bgColor: 'bg-green-50',
  },
  {
    icon: Users,
    title: 'Foster Care Network',
    description:
      'Temporary foster homes providing love and care to animals recovering from trauma or awaiting adoption.',
    features: [
      'Foster parent training',
      'Medical support provided',
      'Foster supplies included',
      'Community of foster families',
    ],
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
  },
  {
    icon: Scissors,
    title: 'Sterilization Drives',
    description:
      'Free sterilization programs to humanely control street animal population and prevent suffering.',
    features: [
      'Free sterilization camps',
      'Post-operative care',
      'Vaccination included',
      'Community awareness',
    ],
    color: 'text-orange-500',
    bgColor: 'bg-orange-50',
  },
  {
    icon: GraduationCap,
    title: 'Education & Awareness',
    description:
      'Community outreach programs promoting responsible pet ownership, animal welfare, and compassion.',
    features: [
      'School programs',
      'Community workshops',
      'Online resources',
      'Awareness campaigns',
    ],
    color: 'text-teal-500',
    bgColor: 'bg-teal-50',
  },
  {
    icon: Shield,
    title: 'Animal Protection',
    description:
      'Working with authorities to prevent animal cruelty and ensure legal protection for animals.',
    features: [
      'Cruelty investigation',
      'Legal advocacy',
      'Policy development',
      'Enforcement support',
    ],
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-50',
  },
  {
    icon: BookOpen,
    title: 'Research & Documentation',
    description:
      'Conducting research and maintaining records to improve animal welfare practices and outcomes.',
    features: [
      'Case documentation',
      'Best practices research',
      'Data-driven insights',
      'Knowledge sharing',
    ],
    color: 'text-pink-500',
    bgColor: 'bg-pink-50',
  },
];

export default function ProgramsPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        variant="about"
        title="Our Programs"
        subtitle="Comprehensive initiatives designed to rescue, rehabilitate, and protect animals while building a compassionate community"
        primaryCTA={{ text: 'Support Our Programs', href: '/donate' }}
        secondaryCTA={{ text: 'Volunteer With Us', href: '/volunteer' }}
      />

      {/* Programs Grid */}
      <section className="bg-white py-20">
        <Container>
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Making a Difference Through Action
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-gray-600">
              Our programs address every aspect of animal welfare, from
              emergency rescue to long-term care and community education.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {programs.map((program, index) => {
              const Icon = program.icon;
              return (
                <div
                  key={index}
                  className="rounded-2xl border-2 border-gray-100 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div
                    className={`inline-flex h-16 w-16 items-center justify-center rounded-xl ${program.bgColor} mb-6`}
                  >
                    <Icon className={`h-8 w-8 ${program.color}`} />
                  </div>
                  <h3 className="mb-3 text-2xl font-bold text-gray-900">
                    {program.title}
                  </h3>
                  <p className="mb-6 text-gray-600">{program.description}</p>
                  <ul className="space-y-3">
                    {program.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg
                          className={`h-6 w-6 ${program.color} mr-3 flex-shrink-0`}
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
              );
            })}
          </div>
        </Container>
      </section>

      {/* Impact Section */}
      <section className="bg-gray-50 py-20">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Program Impact
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-gray-600">
              Our programs have created measurable positive change in the lives
              of thousands of animals.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-4">
            {[
              { value: '10,000+', label: 'Animals Rescued', icon: Heart },
              {
                value: '15,000+',
                label: 'Medical Treatments',
                icon: Stethoscope,
              },
              { value: '5,000+', label: 'Successful Adoptions', icon: Home },
              { value: '8,000+', label: 'Sterilizations Done', icon: Scissors },
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
              Help Us Expand Our Programs
            </h2>
            <p className="mb-8 text-xl text-white/90">
              Your support enables us to reach more animals in need and create
              lasting change in our community.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="/donate"
                className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 font-medium text-primary transition-colors hover:bg-white/90"
              >
                <Heart className="mr-2 h-5 w-5" />
                Donate to Programs
              </a>
              <a
                href="/volunteer"
                className="inline-flex items-center justify-center rounded-lg border-2 border-white bg-transparent px-8 py-3 font-medium text-white transition-colors hover:bg-white/10"
              >
                <Users className="mr-2 h-5 w-5" />
                Join as Volunteer
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

// Made with Bob
