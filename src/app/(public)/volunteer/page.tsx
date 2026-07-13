'use client';

import { useState, FormEvent } from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { Container } from '@/components/layout/Container';
import {
  Heart,
  Users,
  Calendar,
  Clock,
  CheckCircle,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

const volunteerRoles = [
  {
    title: 'Animal Care Volunteer',
    description:
      'Help with daily care, feeding, grooming, and socializing rescued animals at our shelters.',
    commitment: '4-8 hours/week',
    skills: 'Love for animals, patience, physical fitness',
    icon: Heart,
  },
  {
    title: 'Rescue Team Member',
    description:
      'Join our emergency response team to rescue animals in distress across the city.',
    commitment: 'On-call basis',
    skills: 'Quick response, physical fitness, vehicle preferred',
    icon: Users,
  },
  {
    title: 'Foster Parent',
    description:
      'Provide temporary home care for animals recovering from trauma or awaiting adoption.',
    commitment: 'Flexible duration',
    skills: 'Safe home environment, time commitment',
    icon: Heart,
  },
  {
    title: 'Event Coordinator',
    description:
      'Help organize adoption drives, fundraising events, and awareness campaigns.',
    commitment: '10-15 hours/month',
    skills: 'Organization, communication, creativity',
    icon: Calendar,
  },
  {
    title: 'Social Media Volunteer',
    description:
      'Create content, manage social media, and help spread awareness about our cause.',
    commitment: '5-10 hours/week',
    skills: 'Social media, content creation, design',
    icon: Users,
  },
  {
    title: 'Administrative Support',
    description:
      'Assist with paperwork, data entry, donor management, and office tasks.',
    commitment: '8-12 hours/week',
    skills: 'Computer skills, attention to detail',
    icon: Clock,
  },
];

export default function VolunteerPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    const formData = new FormData(e.currentTarget);

    // Combine first and last name
    const fullName =
      `${formData.get('firstName')} ${formData.get('lastName')}`.trim();
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const city = formData.get('city') as string;
    const role = formData.get('role') as string;
    const availability = formData.get('availability') as string;
    const experience = formData.get('experience') as string;
    const motivation = formData.get('motivation') as string;

    // Combine interests
    const interests = `${role}${experience ? ` | Experience: ${experience}` : ''}${motivation ? ` | Motivation: ${motivation}` : ''}`;

    try {
      // Check if Supabase is configured
      if (!isSupabaseConfigured()) {
        throw new Error(
          'Database connection not configured. Please contact the administrator.'
        );
      }

      const { error } = await supabase.from('volunteers').insert({
        full_name: fullName,
        email,
        phone,
        city,
        interests,
        availability,
      });

      if (error) throw error;

      setSubmitStatus({
        type: 'success',
        message:
          'Thank you for your application! We will review it and get back to you within 48 hours.',
      });

      // Reset form
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Error submitting volunteer application:', error);
      setSubmitStatus({
        type: 'error',
        message:
          'There was an error submitting your application. Please try again or contact us directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <HeroSection
        variant="about"
        title="Volunteer With Us"
        subtitle="Join our community of passionate volunteers making a real difference in the lives of animals. Your time and skills can save lives."
        primaryCTA={{ text: 'Apply Now', href: '#application' }}
        secondaryCTA={{ text: 'Learn More', href: '#roles' }}
      />

      {/* Why Volunteer */}
      <section className="bg-white py-20">
        <Container>
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Why Volunteer With Sarwa Society for Animal Welfare?
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-gray-600">
              Volunteering is more than just giving your time—it's about being
              part of a compassionate community and making a tangible impact.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: 'Make Real Impact',
                description:
                  'See the direct results of your efforts in the lives you help save and transform.',
              },
              {
                title: 'Learn & Grow',
                description:
                  'Gain valuable skills, experience, and knowledge about animal welfare and care.',
              },
              {
                title: 'Join Community',
                description:
                  'Connect with like-minded people who share your passion for animal welfare.',
              },
              {
                title: 'Flexible Commitment',
                description:
                  'Choose roles and schedules that fit your availability and lifestyle.',
              },
              {
                title: 'Professional Development',
                description:
                  'Build your resume with meaningful volunteer experience and references.',
              },
              {
                title: 'Personal Fulfillment',
                description:
                  'Experience the joy and satisfaction of making a difference every day.',
              },
            ].map((benefit, index) => (
              <div key={index} className="rounded-xl bg-gray-50 p-6">
                <div className="mb-3 flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 flex-shrink-0 text-primary" />
                  <h3 className="text-xl font-semibold text-gray-900">
                    {benefit.title}
                  </h3>
                </div>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Volunteer Roles */}
      <section id="roles" className="bg-gray-50 py-20">
        <Container>
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Volunteer Opportunities
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-gray-600">
              We have diverse roles to match your skills, interests, and
              availability.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {volunteerRoles.map((role, index) => {
              const Icon = role.icon;
              return (
                <div
                  key={index}
                  className="rounded-xl bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-gray-900">
                    {role.title}
                  </h3>
                  <p className="mb-4 text-gray-600">{role.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                      <span className="text-gray-600">
                        <strong>Commitment:</strong> {role.commitment}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                      <span className="text-gray-600">
                        <strong>Skills:</strong> {role.skills}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Application Form */}
      <section id="application" className="bg-white py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Volunteer Application
              </h2>
              <p className="text-lg text-gray-600">
                Fill out the form below and we'll get back to you within 48
                hours.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-6 rounded-2xl bg-gray-50 p-8"
            >
              {/* Success/Error Messages */}
              {submitStatus.type && (
                <div
                  className={`flex items-start gap-3 rounded-lg p-4 ${
                    submitStatus.type === 'success'
                      ? 'bg-green-50 text-green-800'
                      : 'bg-red-50 text-red-800'
                  }`}
                >
                  {submitStatus.type === 'success' ? (
                    <CheckCircle className="h-5 w-5 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  )}
                  <p className="text-sm">{submitStatus.message}</p>
                </div>
              )}

              {/* Personal Information */}
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="John"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Doe"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  name="city"
                  placeholder="Mumbai"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Volunteer Preferences */}
              <div>
                <Label htmlFor="role">Preferred Volunteer Role *</Label>
                <select
                  id="role"
                  name="role"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                  required
                  disabled={isSubmitting}
                >
                  <option value="">Select a role</option>
                  {volunteerRoles.map((role, index) => (
                    <option key={index} value={role.title}>
                      {role.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="availability">Availability *</Label>
                <select
                  id="availability"
                  name="availability"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                  required
                  disabled={isSubmitting}
                >
                  <option value="">Select availability</option>
                  <option value="weekdays">Weekdays</option>
                  <option value="weekends">Weekends</option>
                  <option value="both">Both Weekdays & Weekends</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>

              <div>
                <Label htmlFor="experience">
                  Previous Experience with Animals
                </Label>
                <Textarea
                  id="experience"
                  name="experience"
                  placeholder="Tell us about any previous experience you have with animals or volunteering..."
                  rows={4}
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <Label htmlFor="motivation">
                  Why do you want to volunteer with us? *
                </Label>
                <Textarea
                  id="motivation"
                  name="motivation"
                  placeholder="Share your motivation and what you hope to contribute..."
                  rows={4}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  className="mt-1"
                  required
                  disabled={isSubmitting}
                />
                <Label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to undergo a background check and commit to the
                  volunteer guidelines and code of conduct.
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary py-6 text-lg hover:bg-primary/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Heart className="mr-2 h-5 w-5" />
                    Submit Application
                  </>
                )}
              </Button>
            </form>
          </div>
        </Container>
      </section>

      {/* Volunteer Testimonials */}
      <section className="bg-gray-50 py-20">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Hear From Our Volunteers
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                name: 'Priya Sharma',
                role: 'Animal Care Volunteer',
                quote:
                  'Volunteering at Sarwa Society for Animal Welfare has been the most rewarding experience. Seeing animals recover and find homes is priceless.',
              },
              {
                name: 'Rahul Mehta',
                role: 'Rescue Team Member',
                quote:
                  'Being part of the rescue team has taught me so much about compassion and quick thinking. Every rescue is a new adventure.',
              },
              {
                name: 'Anjali Patel',
                role: 'Foster Parent',
                quote:
                  'Fostering has brought so much joy to my life. Watching animals heal and thrive in a home environment is beautiful.',
              },
            ].map((testimonial, index) => (
              <div key={index} className="rounded-xl bg-white p-6 shadow-md">
                <p className="mb-4 italic text-gray-600">
                  "{testimonial.quote}"
                </p>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

// Made with Bob
