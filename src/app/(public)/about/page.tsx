import { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import Image from 'next/image';
import {
  Heart,
  Target,
  Eye,
  FileText,
  Shield,
  Users,
  Award,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us - Sarwa Society for Animal Welfare',
  description:
    'Learn about Sarwa Society for Animal Welfare - a community-driven animal welfare organization dedicated to rescue, rehabilitation, and adoption support.',
};

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary py-16 text-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">
              About Sarwa Society for Animal Welfare
            </h1>
            <p className="text-lg text-white/90">
              A community-driven initiative dedicated to animal welfare
            </p>
          </div>
        </Container>
      </section>

      {/* Our Story */}
      <section className="bg-white py-16">
        <Container>
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-gray-900">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Sarwa Society for Animal Welfare was founded in 2023 by a group of passionate animal lovers in Bangalore who witnessed the growing need for organized animal welfare efforts in our community. We started with a simple mission: to provide immediate help to animals in distress and create a compassionate community that values all life.
                </p>
                <p>
                  Our journey began with responding to emergency rescue calls for injured street dogs and abandoned puppies. What started as a small volunteer effort has grown into a registered charitable society dedicated to comprehensive animal welfare.
                </p>
                <p>
                  Though we are a young organization, our commitment is strong. With the support of our dedicated volunteers and compassionate community members, we continue to grow and expand our reach.
                </p>
              </div>
            </div>
            <div className="relative h-80 overflow-hidden rounded-lg">
              <Image
                src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&h=600&fit=crop"
                alt="Rescued dog receiving care"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="bg-background py-16">
        <Container>
          <div className="grid gap-8 md:grid-cols-2">
            {/* Mission */}
            <div className="rounded-lg bg-card p-8">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Our Mission
              </h2>
              <p className="text-gray-600">
                To rescue, rehabilitate, and rehome animals in need while promoting compassion and responsible pet ownership in our community.
              </p>
            </div>

            {/* Vision */}
            <div className="rounded-lg bg-card p-8">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Eye className="h-6 w-6 text-primary" />
              </div>
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Our Vision
              </h2>
              <p className="text-gray-600">
                A world where every animal is treated with dignity, compassion, and respect, and where the bond between humans and animals is celebrated and protected.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* What We Do */}
      <section className="bg-white py-16">
        <Container>
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            What We Do
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Heart,
                title: 'Animal Rescue',
                description:
                  'Emergency response and rescue operations for animals in distress.',
              },
              {
                icon: Award,
                title: 'Medical Care Coordination',
                description:
                  'Coordinating veterinary treatment and medical support for rescued animals.',
              },
              {
                icon: Users,
                title: 'Adoption Support',
                description:
                  'Helping rescued animals find loving forever homes through our adoption network.',
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="rounded-lg bg-background p-6 text-center"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Why We Started */}
      <section className="bg-background py-16">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">
              Why We Started
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                We started because we saw too many animals suffering on the streets without help. Every day, injured dogs, abandoned puppies, and sick cats needed immediate care but had nowhere to turn.
              </p>
              <p>
                Our founders realized that while individual efforts were valuable, organized action could create lasting change. We came together to build a community-driven organization that could respond quickly to emergencies and provide sustained support for animal welfare.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Our Values */}
      <section className="bg-white py-16">
        <Container>
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            Our Values
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'Compassion', description: 'Every life matters' },
              { title: 'Integrity', description: 'Honest and transparent' },
              { title: 'Community', description: 'Working together' },
              { title: 'Dedication', description: 'Committed to our cause' },
            ].map((value, index) => (
              <div
                key={index}
                className="rounded-lg bg-background p-6 text-center"
              >
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  {value.title}
                </h3>
                <p className="text-sm text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Registration & Transparency */}
      <section className="bg-background py-16">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h2 className="mb-4 text-3xl font-bold text-gray-900">
                Registration & Transparency
              </h2>
              <p className="text-gray-600">
                We believe in complete transparency and accountability
              </p>
            </div>

            <div className="space-y-6">
              {/* Registration Details */}
              <div className="rounded-lg bg-card p-6">
                <div className="mb-4 flex items-center gap-3">
                  <FileText className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-semibold text-gray-900">
                    NGO Registration
                  </h3>
                </div>
                <div className="space-y-3 text-gray-600">
                  <div className="flex flex-col gap-2 border-b border-gray-200 pb-3 sm:flex-row sm:justify-between">
                    <span className="font-medium">Registered Name:</span>
                    <span className="text-right">SARWA SOCIETY FOR ADVOCACY OF RIGHTS AND WELFARE OF ANIMALS</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="font-medium">Registration Number:</span>
                    <span>ABBTS8549JE20231</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="font-medium">Registration Date:</span>
                    <span>06-11-2023</span>
                  </div>
                  <div className="flex flex-col gap-2 border-b border-gray-200 pb-3 sm:flex-row sm:justify-between">
                    <span className="font-medium">Registered Office:</span>
                    <span className="text-right">24, 4th B main 4th Cross, Mahalakshmilayout, Bangalore, Karnataka 560086</span>
                  </div>
                  <div className="flex justify-between pb-2">
                    <span className="font-medium">Nature of Organisation:</span>
                    <span>Charitable</span>
                  </div>
                </div>
              </div>

              {/* Tax Exemptions */}
              <div className="rounded-lg bg-card p-6">
                <div className="mb-4 flex items-center gap-3">
                  <Award className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-semibold text-gray-900">
                    Tax Exemptions
                  </h3>
                </div>
                <div className="space-y-3 text-gray-600">
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="font-medium">12A Registration:</span>
                    <span>Provisional (AY 2024-25 to AY 2026-2027)</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="font-medium">80G Certification:</span>
                    <span>Application in process</span>
                  </div>
                </div>
              </div>

              {/* CSR Information */}
              <div className="rounded-lg bg-card p-6">
                <div className="mb-4 flex items-center gap-3">
                  <Users className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-semibold text-gray-900">
                    CSR Eligibility
                  </h3>
                </div>
                <div className="space-y-3 text-gray-600">
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="font-medium">CSR Registration:</span>
                    <span>Not applicable</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="font-medium">FCRA Status:</span>
                    <span>Not registered</span>
                  </div>
                </div>
              </div>

              {/* Official Documents Section */}
              <div className="rounded-lg bg-card p-6">
                <div className="mb-4 flex items-center gap-3">
                  <FileText className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-semibold text-gray-900">
                    Official Documents
                  </h3>
                </div>
                <p className="mb-4 text-sm text-gray-600">
                  View and download our official registration documents
                </p>
                <div className="space-y-3">
                  <a
                    href="/documents/registration-certificate.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium text-gray-900">Registration Certificate</p>
                        <p className="text-sm text-gray-500">Form 10AC - Section 12A Registration</p>
                      </div>
                    </div>
                    <span className="text-sm text-primary">View PDF →</span>
                  </a>
                  <a
                    href="/documents/form-10bd-acknowledgement.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium text-gray-900">Form 10BD Acknowledgement</p>
                        <p className="text-sm text-gray-500">Annual Return Acknowledgement</p>
                      </div>
                    </div>
                    <span className="text-sm text-primary">View PDF →</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 text-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold">Support Our Work</h2>
            <p className="mb-8 text-lg text-white/90">
              Join us in making a difference for animals in need
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="/volunteer"
                className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 font-medium text-primary transition-colors hover:bg-white/90"
              >
                <Users className="mr-2 h-5 w-5" />
                Become a Volunteer
              </a>
              <a
                href="/donate"
                className="inline-flex items-center justify-center rounded-lg border-2 border-white bg-transparent px-8 py-3 font-medium text-white transition-colors hover:bg-white/10"
              >
                <Heart className="mr-2 h-5 w-5" />
                Donate Now
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

// Made with Bob
