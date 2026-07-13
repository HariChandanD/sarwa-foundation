import { PlaceholderContentPage } from '@/components/admin/PlaceholderContentPage';

export default function ContactContentPage() {
  return (
    <PlaceholderContentPage
      title="Contact Information"
      description="Manage contact details, office hours, and location information"
      sections={[
        {
          title: 'Contact Details',
          fields: [
            {
              label: 'Emergency Helpline',
              type: 'text',
              value: '1800-XXX-XXXX',
            },
            {
              label: 'WhatsApp Number',
              type: 'text',
              value: '+91 98765 43210',
            },
            {
              label: 'General Email',
              type: 'text',
              value: 'contact@sarwafoundation.org',
            },
            {
              label: 'Adoption Email',
              type: 'text',
              value: 'adopt@sarwafoundation.org',
            },
          ],
        },
        {
          title: 'Office Address',
          fields: [
            {
              label: 'Street Address',
              type: 'text',
              value: '123 Rescue Street, Animal Welfare Complex',
            },
            {
              label: 'City, State, PIN',
              type: 'text',
              value: 'Mumbai, Maharashtra 400001',
            },
          ],
        },
        {
          title: 'Office Hours',
          fields: [
            {
              label: 'Weekdays',
              type: 'text',
              value: 'Monday - Saturday: 9:00 AM - 6:00 PM',
            },
            {
              label: 'Weekends',
              type: 'text',
              value: 'Sunday: 10:00 AM - 4:00 PM',
            },
          ],
        },
      ]}
    />
  );
}

// Made with Bob