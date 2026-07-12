'use client';

import { useState, FormEvent } from 'react';
import Image from 'next/image';
import { HeroSection } from '@/components/sections/HeroSection';
import { Container } from '@/components/layout/Container';
import {
  Heart,
  Shield,
  TrendingUp,
  Users,
  Check,
  Copy,
  CheckCircle,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

const impactAreas = [
  {
    icon: Heart,
    title: 'Emergency Rescue',
    description: 'Immediate response to animals in distress',
    percentage: 30,
  },
  {
    icon: Shield,
    title: 'Medical Care',
    description: 'Surgeries, treatments, and rehabilitation',
    percentage: 35,
  },
  {
    icon: Users,
    title: 'Shelter & Food',
    description: 'Safe housing and nutritious meals',
    percentage: 25,
  },
  {
    icon: TrendingUp,
    title: 'Programs & Outreach',
    description: 'Education and community initiatives',
    percentage: 10,
  },
];

export default function DonatePage() {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const paymentDetails = {
    bankName: 'IDFC FIRST Bank',
    upiId: 'sarwasociety@idfcbank',
    accountNumber: '55448899000',
    ifsc: 'IDFB0081109',
  };

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    const formData = new FormData(e.currentTarget);

    const donorName = formData.get('donorName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const amount = parseFloat(formData.get('amount') as string);
    const paymentMode = formData.get('paymentMode') as string;
    const notes = formData.get('notes') as string;

    try {
      // Check if Supabase is configured
      if (!isSupabaseConfigured()) {
        throw new Error(
          'Database connection not configured. Please contact the administrator.'
        );
      }

      const { error } = await supabase.from('donations').insert({
        donor_name: donorName,
        email,
        phone: phone || null,
        amount,
        payment_mode: paymentMode,
        notes: notes || null,
      });

      if (error) throw error;

      setSubmitStatus({
        type: 'success',
        message:
          'Thank you for your generous donation! We have received your confirmation and will send you a receipt via email shortly.',
      });

      // Reset form
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Error submitting donation confirmation:', error);
      setSubmitStatus({
        type: 'error',
        message:
          'There was an error submitting your donation confirmation. Please try again or contact us directly.',
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
        title="Your Donation Saves Lives"
        subtitle="Every contribution helps us rescue, rehabilitate, and rehome animals in need. Join thousands of compassionate supporters making a real difference."
        primaryCTA={{ text: 'Donate Now', href: '#donate-form' }}
        secondaryCTA={{ text: 'Become Monthly Donor', href: '#monthly' }}
      />

      {/* Donation Section with QR Code */}
      <section id="donate-form" className="bg-white py-20">
        <Container>
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Donate Today
              </h2>
              <p className="text-lg text-gray-600">
                Help us continue rescuing and caring for animals. Every
                contribution makes a difference.
              </p>
            </div>

            {/* QR Code and Payment Details */}
            <div className="mb-16 grid gap-8 md:grid-cols-2">
              {/* QR Code */}
              <div className="flex items-center justify-center rounded-2xl bg-gray-50 p-8">
                <div className="text-center">
                  <h3 className="mb-6 text-2xl font-bold text-gray-900">
                    Scan & Donate
                  </h3>
                  <div className="mb-6 inline-block rounded-xl bg-white p-4 shadow-lg">
                    <Image
                      src="/qr-code.jpg"
                      alt="Scan to donate via UPI"
                      width={300}
                      height={300}
                      className="rounded-lg"
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    Scan using any UPI app to donate
                  </p>
                </div>
              </div>

              {/* Payment Details */}
              <div className="rounded-2xl bg-gray-50 p-8">
                <h3 className="mb-6 text-xl font-semibold text-gray-900">
                  Payment Details
                </h3>
                <div className="space-y-6">
                  {/* Bank Name */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Bank Name
                    </label>
                    <div className="rounded-lg bg-white p-4 font-medium text-gray-900">
                      {paymentDetails.bankName}
                    </div>
                  </div>

                  {/* UPI ID */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      UPI ID
                    </label>
                    <div className="flex gap-2">
                      <div className="flex-1 rounded-lg bg-white p-4 font-mono text-sm text-gray-900">
                        {paymentDetails.upiId}
                      </div>
                      <Button
                        onClick={() =>
                          copyToClipboard(paymentDetails.upiId, 'upi')
                        }
                        variant="outline"
                        className="px-4"
                      >
                        {copiedField === 'upi' ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <Copy className="h-5 w-5" />
                        )}
                      </Button>
                    </div>
                    {copiedField === 'upi' && (
                      <p className="mt-1 text-sm text-green-600">Copied!</p>
                    )}
                  </div>

                  {/* Account Number */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Account Number
                    </label>
                    <div className="flex gap-2">
                      <div className="flex-1 rounded-lg bg-white p-4 font-mono text-sm text-gray-900">
                        {paymentDetails.accountNumber}
                      </div>
                      <Button
                        onClick={() =>
                          copyToClipboard(
                            paymentDetails.accountNumber,
                            'account'
                          )
                        }
                        variant="outline"
                        className="px-4"
                      >
                        {copiedField === 'account' ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <Copy className="h-5 w-5" />
                        )}
                      </Button>
                    </div>
                    {copiedField === 'account' && (
                      <p className="mt-1 text-sm text-green-600">Copied!</p>
                    )}
                  </div>

                  {/* IFSC Code */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      IFSC Code
                    </label>
                    <div className="flex gap-2">
                      <div className="flex-1 rounded-lg bg-white p-4 font-mono text-sm text-gray-900">
                        {paymentDetails.ifsc}
                      </div>
                      <Button
                        onClick={() =>
                          copyToClipboard(paymentDetails.ifsc, 'ifsc')
                        }
                        variant="outline"
                        className="px-4"
                      >
                        {copiedField === 'ifsc' ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <Copy className="h-5 w-5" />
                        )}
                      </Button>
                    </div>
                    {copiedField === 'ifsc' && (
                      <p className="mt-1 text-sm text-green-600">Copied!</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Donation Confirmation Form */}
            <div className="mx-auto max-w-3xl">
              <div className="mb-8 rounded-2xl bg-primary/10 p-6 text-center">
                <h3 className="text-2xl font-bold text-gray-900">
                  I Have Completed My Donation
                </h3>
                <p className="mt-2 text-gray-600">
                  Please fill out this form after making your donation so we can
                  send you a receipt and thank you note.
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

                <div>
                  <Label htmlFor="donorName">Donor Name *</Label>
                  <Input
                    id="donorName"
                    name="donorName"
                    placeholder="Your full name"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
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

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <Label htmlFor="amount">Amount (₹) *</Label>
                    <Input
                      id="amount"
                      name="amount"
                      type="number"
                      placeholder="1000"
                      min="1"
                      step="0.01"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <Label htmlFor="paymentMode">Payment Mode *</Label>
                    <select
                      id="paymentMode"
                      name="paymentMode"
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                      required
                      disabled={isSubmitting}
                    >
                      <option value="">Select payment mode</option>
                      <option value="UPI">UPI</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="Cash">Cash</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="notes">Message (Optional)</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    placeholder="Any message or notes about your donation..."
                    rows={4}
                    disabled={isSubmitting}
                  />
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
                      Submit Donation Confirmation
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </Container>
      </section>

      {/* How Funds Are Used */}
      <section className="bg-gray-50 py-20">
        <Container>
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              100% Transparent Fund Usage
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-gray-600">
              Every rupee is accounted for. Here's exactly how your donation
              makes an impact.
            </p>
          </div>

          <div className="mb-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {impactAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <div
                  key={index}
                  className="rounded-xl bg-white p-6 text-center"
                >
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="mb-2 text-4xl font-bold text-primary">
                    {area.percentage}%
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    {area.title}
                  </h3>
                  <p className="text-sm text-gray-600">{area.description}</p>
                </div>
              );
            })}
          </div>

          <div className="mx-auto max-w-3xl rounded-xl border-2 border-blue-200 bg-blue-50 p-8">
            <div className="flex items-start gap-4">
              <Shield className="h-8 w-8 flex-shrink-0 text-blue-600" />
              <div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  Our Commitment to Transparency
                </h3>
                <p className="mb-4 text-gray-700">
                  We publish detailed financial reports quarterly and maintain
                  complete transparency in all our operations. Your trust is our
                  responsibility.
                </p>
                <a
                  href="/about/transparency"
                  className="font-medium text-primary hover:underline"
                >
                  View Financial Reports →
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Tax Benefits */}
      <section className="bg-white py-20">
        <Container>
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 md:text-4xl">
              Tax Benefits
            </h2>
            <div className="rounded-xl border-2 border-green-200 bg-green-50 p-8">
              <div className="flex items-start gap-4">
                <Check className="h-8 w-8 flex-shrink-0 text-green-600" />
                <div>
                  <h3 className="mb-4 text-xl font-semibold text-gray-900">
                    80G Tax Exemption Certificate
                  </h3>
                  <p className="mb-4 text-gray-700">
                    Sarwa Foundation is registered under Section 80G of the
                    Income Tax Act. Your donations are eligible for tax
                    deductions as per Indian tax laws.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <Check className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                      <span>Instant tax receipt via email</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                      <span>
                        Annual consolidated statement for regular donors
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                      <span>PAN-based automatic record keeping</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Other Ways to Help */}
      <section className="bg-gray-50 py-20">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Other Ways to Support
            </h2>
            <p className="text-lg text-gray-600">
              Can't donate right now? There are many other ways to help our
              cause.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: 'Volunteer Your Time',
                description: 'Join our team and make a hands-on difference',
                link: '/volunteer',
                linkText: 'Become a Volunteer',
              },
              {
                title: 'Foster an Animal',
                description: 'Provide temporary care while they await adoption',
                link: '/foster',
                linkText: 'Learn About Fostering',
              },
              {
                title: 'Spread the Word',
                description: 'Share our mission on social media',
                link: '#share',
                linkText: 'Share Our Cause',
              },
            ].map((item, index) => (
              <div key={index} className="rounded-xl bg-white p-6 text-center">
                <h3 className="mb-3 text-xl font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="mb-4 text-gray-600">{item.description}</p>
                <a
                  href={item.link}
                  className="font-medium text-primary hover:underline"
                >
                  {item.linkText} →
                </a>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

// Made with Bob
