'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const footerLinks = {
  about: [
    { name: 'Our Mission', href: '/about/mission' },
    { name: 'Our Team', href: '/about/team' },
    { name: 'Transparency', href: '/about/transparency' },
    { name: 'Annual Reports', href: '/about/reports' },
  ],
  getInvolved: [
    { name: 'Donate', href: '/donate' },
    { name: 'Volunteer', href: '/volunteer' },
    { name: 'Foster', href: '/foster' },
    { name: 'Adopt', href: '/adopt' },
  ],
  resources: [
    { name: 'Blog', href: '/blog' },
    { name: 'Rescue Stories', href: '/rescue-stories' },
    { name: 'FAQs', href: '/faq' },
    { name: 'Contact Us', href: '/contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Refund Policy', href: '/refund-policy' },
    { name: 'Accessibility', href: '/accessibility' },
  ],
};

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
];

export function Footer() {
  return (
    <footer className="text-gray-300" style={{ backgroundColor: '#23412E' }}>
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="mb-4 flex items-center space-x-3">
              <div className="relative h-12 w-12 flex-shrink-0">
                <Image
                  src="/logo/sarwa-logo.jpg"
                  alt="SARWA Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold text-white">
                Sarwa Society
              </span>
            </Link>
            <p className="mb-6 max-w-md text-sm text-gray-400">
              Sarwa Society for Animal Welfare is dedicated to rescuing,
              rehabilitating, and rehoming animals in need. Every life matters,
              and together we can make a difference.
            </p>

            {/* Contact Info */}
            <div className="mb-6 space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <span>+91 1800-XXX-XXXX</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <span>contact@sarwasociety.org</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span>123 Rescue Street, City, State</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 transition-colors hover:bg-primary"
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* About Links */}
          <div>
            <h3 className="mb-4 font-semibold text-white">About Us</h3>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved Links */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Get Involved</h3>
            <ul className="space-y-3">
              {footerLinks.getInvolved.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="max-w-md">
            <h3 className="mb-2 font-semibold text-white">Stay Updated</h3>
            <p className="mb-4 text-sm text-gray-400">
              Subscribe to our newsletter for rescue updates and success
              stories.
            </p>
            <form className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="border-gray-700 bg-gray-800 text-white placeholder:text-gray-500"
              />
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Sarwa Society for Animal Welfare. All
              rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-gray-400 transition-colors hover:text-primary"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Made with Bob
