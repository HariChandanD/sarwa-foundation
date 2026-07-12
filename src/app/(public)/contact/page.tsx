'use client';

import { useState, FormEvent } from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { Container } from '@/components/layout/Container';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  Loader2,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

const contactInfo = [
  {
    icon: Phone,
    title: 'Emergency Helpline',
    details: ['24/7 Rescue: 1800-XXX-XXXX', 'WhatsApp: +91 98765 43210'],
    color: 'text-red-500',
    bgColor: 'bg-red-50',
  },
  {
    icon: Mail,
    title: 'Email Us',
    details: [
      'General: contact@sarwafoundation.org',
      'Adoptions: adopt@sarwafoundation.org',
    ],
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    details: [
      '123 Rescue Street, Animal Welfare Complex',
      'Mumbai, Maharashtra 400001',
    ],
    color: 'text-green-500',
    bgColor: 'bg-green-50',
  },
  {
    icon: Clock,
    title: 'Office Hours',
    details: [
      'Monday - Saturday: 9:00 AM - 6:00 PM',
      'Sunday: 10:00 AM - 4:00 PM',
    ],
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
  },
];

const departments = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'rescue', label: 'Emergency Rescue' },
  { value: 'adoption', label: 'Adoption Inquiry' },
  { value: 'volunteer', label: 'Volunteer Opportunity' },
  { value: 'donation', label: 'Donation & Sponsorship' },
  { value: 'media', label: 'Media & Press' },
  { value: 'partnership', label: 'Partnership Opportunity' },
  { value: 'complaint', label: 'Complaint or Feedback' },
];

export default function ContactPage() {
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
    const name =
      `${formData.get('firstName')} ${formData.get('lastName')}`.trim();
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const department = formData.get('department') as string;
    const subjectText = formData.get('subject') as string;
    const message = formData.get('message') as string;

    // Combine department and subject for the subject field
    const subject = department ? `[${department}] ${subjectText}` : subjectText;

    try {
      // Check if Supabase is configured
      if (!isSupabaseConfigured()) {
        throw new Error(
          'Database connection not configured. Please contact the administrator.'
        );
      }

      const { error } = await supabase.from('contact_messages').insert({
        name,
        email,
        phone: phone || null,
        subject,
        message,
      });

      if (error) throw error;

      setSubmitStatus({
        type: 'success',
        message:
          'Thank you for your message! We will get back to you within 24-48 hours.',
      });

      // Reset form
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitStatus({
        type: 'error',
        message:
          'There was an error sending your message. Please try again or contact us directly via phone or email.',
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
        title="Get in Touch"
        subtitle="Have questions? Need help? Want to get involved? We're here to help and would love to hear from you."
        primaryCTA={{ text: 'Emergency Rescue', href: 'tel:1800-XXX-XXXX' }}
        secondaryCTA={{ text: 'Send Message', href: '#contact-form' }}
      />

      {/* Contact Information */}
      <section className="bg-white py-20">
        <Container>
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              How to Reach Us
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-gray-600">
              Multiple ways to connect with us. Choose what works best for you.
            </p>
          </div>

          <div className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div
                  key={index}
                  className="rounded-xl border-2 border-gray-100 bg-white p-6 transition-all hover:shadow-lg"
                >
                  <div
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${info.bgColor} mb-4`}
                  >
                    <Icon className={`h-6 w-6 ${info.color}`} />
                  </div>
                  <h3 className="mb-3 text-lg font-semibold text-gray-900">
                    {info.title}
                  </h3>
                  <div className="space-y-1">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-sm text-gray-600">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Emergency Notice */}
          <div className="mx-auto max-w-3xl rounded-xl border-2 border-red-200 bg-red-50 p-6">
            <div className="flex items-start gap-4">
              <Phone className="mt-1 h-6 w-6 flex-shrink-0 text-red-600" />
              <div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  Emergency Animal Rescue
                </h3>
                <p className="mb-3 text-gray-700">
                  If you've found an injured or distressed animal that needs
                  immediate help, please call our 24/7 emergency helpline:
                </p>
                <a
                  href="tel:1800-XXX-XXXX"
                  className="inline-flex items-center rounded-lg bg-red-600 px-6 py-3 font-medium text-white transition-colors hover:bg-red-700"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Call 1800-XXX-XXXX
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className="bg-gray-50 py-20">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Send Us a Message
              </h2>
              <p className="text-lg text-gray-600">
                Fill out the form below and we'll get back to you within 24-48
                hours.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {/* Form */}
              <div className="md:col-span-2">
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6 rounded-2xl bg-white p-8 shadow-md"
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
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="department">Department *</Label>
                    <select
                      id="department"
                      name="department"
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                      required
                      disabled={isSubmitting}
                    >
                      <option value="">Select a department</option>
                      {departments.map((dept) => (
                        <option key={dept.value} value={dept.value}>
                          {dept.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="Brief subject of your message"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Please provide details about your inquiry..."
                      rows={6}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="consent"
                      name="consent"
                      className="mt-1"
                      required
                      disabled={isSubmitting}
                    />
                    <Label htmlFor="consent" className="text-sm text-gray-600">
                      I agree to be contacted by Sarwa Foundation regarding my
                      inquiry and understand that my information will be handled
                      according to the privacy policy.
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
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>

              {/* Quick Links */}
              <div className="space-y-6">
                <div className="rounded-xl bg-white p-6 shadow-md">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">
                    Quick Links
                  </h3>
                  <ul className="space-y-3">
                    {[
                      { label: 'Adoption Process', href: '/adoption' },
                      { label: 'Volunteer Application', href: '/volunteer' },
                      { label: 'Donation Options', href: '/donate' },
                      { label: 'FAQs', href: '/faq' },
                      { label: 'Our Programs', href: '/programs' },
                    ].map((link, index) => (
                      <li key={index}>
                        <a
                          href={link.href}
                          className="flex items-center gap-2 text-primary hover:underline"
                        >
                          <MessageSquare className="h-4 w-4" />
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl bg-primary/10 p-6">
                  <h3 className="mb-3 text-lg font-semibold text-gray-900">
                    Follow Us
                  </h3>
                  <p className="mb-4 text-sm text-gray-600">
                    Stay updated with our latest rescues and success stories on
                    social media.
                  </p>
                  <div className="flex gap-3">
                    {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map(
                      (platform) => (
                        <a
                          key={platform}
                          href="#"
                          className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-primary/90"
                          aria-label={platform}
                        >
                          {platform[0]}
                        </a>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Map Section */}
      <section className="bg-white py-20">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Visit Our Shelter
            </h2>
            <p className="text-lg text-gray-600">
              Come visit us and meet the animals. Volunteers and visitors are
              always welcome!
            </p>
          </div>

          {/* Map Placeholder */}
          <div className="flex h-96 items-center justify-center rounded-2xl bg-gray-200">
            <div className="text-center">
              <MapPin className="mx-auto mb-4 h-16 w-16 text-gray-400" />
              <p className="text-gray-600">
                Interactive map will be displayed here
              </p>
              <p className="mt-2 text-sm text-gray-500">
                123 Rescue Street, Animal Welfare Complex, Mumbai 400001
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

// Made with Bob
