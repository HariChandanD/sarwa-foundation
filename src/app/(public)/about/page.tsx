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
  title: 'About Us - Sarwa Foundation',
  description:
    'Learn about Sarwa Foundation - a community-driven animal welfare organization dedicated to rescue, rehabilitation, and adoption support.',
};

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary py-16 text-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">
              About Sarwa Foundation
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
                <p>[Our Story]</p>
                <p>
                  Placeholder for the organization's founding story, how it
                  started, and the journey so far.
                </p>
              </div>
            </div>
            <div className="relative h-80 overflow-hidden rounded-lg">
              <Image
                src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&h=600&fit=crop"
                alt="Our Story"
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
              <p className="text-gray-600">[Mission]</p>
              <p className="mt-2 text-gray-600">
                Placeholder for the organization's mission statement.
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
              <p className="text-gray-600">[Vision]</p>
              <p className="mt-2 text-gray-600">
                Placeholder for the organization's vision statement.
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
              <p>[Why We Started]</p>
              <p>
                Placeholder for the story behind why the organization was
                founded and what drives the work.
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
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="font-medium">Registration Number:</span>
                    <span>[Registration Number]</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="font-medium">Registration Date:</span>
                    <span>[Registration Date]</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="font-medium">Registered Under:</span>
                    <span>[Act/Authority Name]</span>
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
                    <span>[12A Details or N/A]</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="font-medium">80G Certification:</span>
                    <span>[80G Details or N/A]</span>
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
                    <span>[CSR Information or N/A]</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="font-medium">FCRA Status:</span>
                    <span>[FCRA Details or N/A]</span>
                  </div>
                </div>
              </div>

              {/* Documents Section */}
              <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center">
                <FileText className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                <h4 className="mb-2 text-lg font-semibold text-gray-900">
                  Registration Documents
                </h4>
                <p className="mb-4 text-sm text-gray-600">
                  Official registration certificates and documents will be
                  displayed here
                </p>
                <p className="text-xs text-gray-500">
                  Documents can be uploaded as scanned PDFs or images
                </p>
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
