import { PlaceholderContentPage } from '@/components/admin/PlaceholderContentPage';

export default function AboutContentPage() {
  return (
    <PlaceholderContentPage
      title="About Page Content"
      description="Manage about page content, mission, vision, and organizational information"
      sections={[
        {
          title: 'About Section',
          fields: [
            {
              label: 'Page Title',
              type: 'text',
              placeholder: 'About Sarwa Society for Animal Welfare',
              value: 'About Sarwa Society for Animal Welfare',
            },
            {
              label: 'Introduction',
              type: 'textarea',
              placeholder: 'Brief introduction about the organization...',
              value:
                'Sarwa Society for Animal Welfare is a registered non-profit organization dedicated to the rescue, rehabilitation, and rehoming of animals in distress.',
            },
          ],
        },
        {
          title: 'Registration Details',
          fields: [
            {
              label: 'Registration Number',
              type: 'text',
              value: 'E-39746 (Mumbai)',
            },
            {
              label: 'Registration Date',
              type: 'text',
              value: '12th December 2014',
            },
            {
              label: '80G Certificate Number',
              type: 'text',
              value: 'AACTS5287QF20221',
            },
          ],
        },
        {
          title: 'Team Section',
          fields: [
            {
              label: 'Team Description',
              type: 'textarea',
              placeholder: 'Description of the team...',
            },
            {
              label: 'Team Image',
              type: 'image',
              placeholder: 'Upload team photo',
            },
          ],
        },
      ]}
    />
  );
}

// Made with Bob