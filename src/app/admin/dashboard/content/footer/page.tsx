import { PlaceholderContentPage } from '@/components/admin/PlaceholderContentPage';

export default function FooterContentPage() {
  return (
    <PlaceholderContentPage
      title="Footer Content"
      description="Manage footer links, social media, and copyright information"
      sections={[
        {
          title: 'Footer Description',
          fields: [
            {
              label: 'Organization Description',
              type: 'textarea',
              value:
                'Sarwa Society for Animal Welfare is dedicated to rescuing, rehabilitating, and rehoming animals in need. Join us in making a difference.',
            },
          ],
        },
        {
          title: 'Social Media Links',
          fields: [
            {
              label: 'Facebook URL',
              type: 'text',
              placeholder: 'https://facebook.com/sarwafoundation',
            },
            {
              label: 'Instagram URL',
              type: 'text',
              placeholder: 'https://instagram.com/sarwafoundation',
            },
            {
              label: 'Twitter URL',
              type: 'text',
              placeholder: 'https://twitter.com/sarwafoundation',
            },
            {
              label: 'LinkedIn URL',
              type: 'text',
              placeholder: 'https://linkedin.com/company/sarwafoundation',
            },
          ],
        },
        {
          title: 'Copyright & Legal',
          fields: [
            {
              label: 'Copyright Text',
              type: 'text',
              value: '© 2024 Sarwa Society for Animal Welfare. All rights reserved.',
            },
            {
              label: 'Registration Info',
              type: 'text',
              value: 'Registered under Society Registration Act, 1860 | Reg. No: E-39746',
            },
          ],
        },
      ]}
    />
  );
}

// Made with Bob