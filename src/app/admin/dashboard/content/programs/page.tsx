import { PlaceholderContentPage } from '@/components/admin/PlaceholderContentPage';

export default function ProgramsContentPage() {
  return (
    <PlaceholderContentPage
      title="Programs Content"
      description="Manage programs and initiatives information"
      sections={[
        {
          title: 'Animal Rescue Program',
          fields: [
            {
              label: 'Program Name',
              type: 'text',
              value: 'Emergency Animal Rescue',
            },
            {
              label: 'Description',
              type: 'textarea',
              value:
                '24/7 emergency response team for rescuing animals in distress, including injured, abandoned, or abused animals.',
            },
            { label: 'Program Image', type: 'image' },
          ],
        },
        {
          title: 'Medical Care Program',
          fields: [
            {
              label: 'Program Name',
              type: 'text',
              value: 'Veterinary Care & Rehabilitation',
            },
            {
              label: 'Description',
              type: 'textarea',
              value:
                'Comprehensive medical care including surgeries, treatments, vaccinations, and rehabilitation services.',
            },
            { label: 'Program Image', type: 'image' },
          ],
        },
        {
          title: 'Adoption Program',
          fields: [
            {
              label: 'Program Name',
              type: 'text',
              value: 'Adoption & Forever Homes',
            },
            {
              label: 'Description',
              type: 'textarea',
              value:
                'Matching rescued animals with loving families through our thorough screening and adoption process.',
            },
            { label: 'Program Image', type: 'image' },
          ],
        },
      ]}
    />
  );
}

// Made with Bob