import { organization } from './organization';

export const footer = {
  about: {
    title: organization.name,
    description: organization.description,
  },
  quickLinks: {
    title: 'Quick Links',
    links: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Programs', href: '/programs' },
      { name: 'Rescue Stories', href: '/rescue-stories' },
      { name: 'Adoption', href: '/adoption' },
      { name: 'Gallery', href: '/gallery' },
      { name: 'Blog', href: '/blog' },
    ],
  },
  getInvolved: {
    title: 'Get Involved',
    links: [
      { name: 'Donate', href: '/donate' },
      { name: 'Volunteer', href: '/volunteer' },
      { name: 'Sponsor an Animal', href: '/donate' },
      { name: 'Corporate Partnership', href: '/contact' },
      { name: 'Fundraise', href: '/contact' },
    ],
  },
  contact: {
    title: 'Contact Us',
    email: organization.email,
    phone: organization.phone,
    address: `${organization.address.street}, ${organization.address.city}, ${organization.address.state} ${organization.address.pincode}`,
  },
  social: {
    title: 'Follow Us',
    links: [
      { name: 'Facebook', href: organization.socialMedia.facebook },
      { name: 'Twitter', href: organization.socialMedia.twitter },
      { name: 'Instagram', href: organization.socialMedia.instagram },
      { name: 'YouTube', href: organization.socialMedia.youtube },
      { name: 'LinkedIn', href: organization.socialMedia.linkedin },
    ],
  },
  legal: {
    links: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
    ],
  },
  copyright: `© ${new Date().getFullYear()} ${organization.name}. All rights reserved.`,
};

// Made with Bob
