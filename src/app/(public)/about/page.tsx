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
                Who We Are
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  SARWA Society for Advocacy of Rights and Welfare of Animals is
                  a non-profit organization committed to protecting, rescuing,
                  and improving the lives of animals through timely
                  intervention, compassionate care, and community engagement.
                </p>
                <p>
                  We believe every animal deserves to live with dignity, free
                  from pain, cruelty, neglect, and exploitation. Our primary
                  focus is providing immediate medical assistance to injured,
                  sick, and distressed animals wherever they are found, ensuring
                  they receive the care they need as quickly as possible.
                </p>
                <p>
                  Unlike traditional shelter-based organizations, SARWA
                  specializes in on-site emergency rescue and treatment. Our
                  trained rescue volunteers and veterinary partners respond to
                  public reports, providing first aid and emergency medical care
                  directly at the location whenever possible—reducing stress for
                  the animal and enabling faster treatment.
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
                To protect and improve the lives of animals through rapid
                rescue, on-site medical treatment, advocacy, education, and
                collaboration with animal welfare organizations, ensuring every
                animal receives timely care and compassionate support.
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
                To create a society where every animal is treated with
                compassion, protected from cruelty, and provided the opportunity
                to live a safe, healthy, and dignified life.
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
                title: 'Emergency Rescue & On-Site Treatment',
                description:
                  'Rapid response to distress calls with trained volunteers providing immediate first aid and emergency medical care at the location.',
              },
              {
                icon: Award,
                title: 'Veterinary Partnerships',
                description:
                  'Collaboration with established organizations like CUPA for specialized treatment, surgery, and long-term rehabilitation when needed.',
              },
              {
                icon: Users,
                title: 'Cattle Rescue & Rehabilitation',
                description:
                  'Rescuing cattle from illegal transportation, abandonment, and neglect, relocating them to recognized shelter homes and goshalas.',
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

      {/* Our Approach */}
      <section className="bg-background py-16">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">
              Our Approach
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                When animals require advanced medical attention, surgery, or
                long-term rehabilitation, SARWA works in close collaboration
                with established animal welfare organizations such as CUPA
                (Compassion Unlimited Plus Action). Animals needing specialized
                treatment are safely transported to their facilities, ensuring
                they receive the highest standard of veterinary care.
              </p>
              <p>
                Our work extends beyond rescue operations. We strive to build a
                compassionate society by promoting animal welfare awareness,
                encouraging responsible pet ownership, educating communities
                about animal rights, and inspiring citizens to become active
                participants in protecting vulnerable animals.
              </p>
              <p className="text-lg font-medium text-gray-900">
                "Every Life Matters. Every Rescue Counts. Together We Can Make a
                Difference."
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
              { title: 'Compassion', description: 'For every living being' },
              {
                title: 'Rapid Response',
                description: 'Emergency rescue operations',
              },
              {
                title: 'Integrity',
                description: 'Transparency and accountability',
              },
              { title: 'Collaboration', description: 'Working with partners' },
              {
                title: 'Community',
                description: 'Volunteerism and participation',
              },
              {
                title: 'Respect',
                description: 'For animal rights and welfare',
              },
              {
                title: 'Sustainability',
                description: 'Long-term welfare initiatives',
              },
              { title: 'Commitment', description: 'Dedicated to our mission' },
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
                    <span className="text-right">
                      SARWA SOCIETY FOR ADVOCACY OF RIGHTS AND WELFARE OF
                      ANIMALS
                    </span>
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
                    <span className="text-right">
                      24, 4th B main 4th Cross, Mahalakshmilayout, Bangalore,
                      Karnataka 560086
                    </span>
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

              {/* Corporate Partnerships */}
              <div className="rounded-lg bg-card p-6">
                <div className="mb-4 flex items-center gap-3">
                  <Users className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-semibold text-gray-900">
                    Corporate Partnerships
                  </h3>
                </div>
                <div className="space-y-3 text-gray-600">
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="font-medium">CSR Partnerships:</span>
                    <span>
                      Open to CSR partnerships and corporate collaborations
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="font-medium">12A Registration:</span>
                    <span>Provisional (AY 2024-25 to AY 2026-2027)</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="font-medium">80G Status:</span>
                    <span>Application in Process</span>
                  </div>
                  <div className="flex justify-between pb-2">
                    <span className="font-medium">FCRA Status:</span>
                    <span>Not Registered (Domestic donations only)</span>
                  </div>
                </div>
                <div className="mt-4 rounded-lg bg-background p-4">
                  <p className="text-sm text-gray-600">
                    We welcome CSR partnerships, employee volunteering programs,
                    and community animal welfare initiatives with responsible
                    corporate organizations.
                  </p>
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
                        <p className="font-medium text-gray-900">
                          Registration Certificate
                        </p>
                        <p className="text-sm text-gray-500">
                          Form 10AC - Section 12A Registration
                        </p>
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
                        <p className="font-medium text-gray-900">
                          Form 10BD Acknowledgement
                        </p>
                        <p className="text-sm text-gray-500">
                          Annual Return Acknowledgement
                        </p>
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
