import { organization } from './organization';

export const contact = {
  info: {
    email: organization.email,
    phone: organization.phone,
    address: `${organization.address.street}, ${organization.address.city}, ${organization.address.state} ${organization.address.pincode}`,
    workingHours: organization.workingHours,
  },
  emergencyHelpline: {
    title: '24/7 Emergency Helpline',
    phone: organization.phone,
    description: 'For immediate animal rescue and emergency situations',
  },
  form: {
    title: 'Send Us a Message',
    description:
      'Have a question or want to get involved? Fill out the form below and we will get back to you as soon as possible.',
    fields: {
      name: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      subject: 'Subject',
      message: 'Message',
    },
    submitButton: 'Send Message',
  },
  reasons: [
    {
      title: 'Report an Animal in Distress',
      description:
        'If you see an injured or abandoned animal, contact us immediately for emergency rescue.',
    },
    {
      title: 'Volunteer Opportunities',
      description:
        'Join our team of dedicated volunteers and make a difference in animal lives.',
    },
    {
      title: 'Adoption Inquiries',
      description:
        'Interested in adopting? Reach out to learn about our available animals and adoption process.',
    },
    {
      title: 'Partnership & Collaboration',
      description:
        'We welcome partnerships with organizations that share our mission and values.',
    },
  ],
};

// Made with Bob
