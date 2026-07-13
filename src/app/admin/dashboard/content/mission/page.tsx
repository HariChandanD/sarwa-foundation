import { PlaceholderContentPage } from '@/components/admin/PlaceholderContentPage';

export default function MissionContentPage() {
  return (
    <PlaceholderContentPage
      title="Mission & Vision Content"
      description="Manage mission statement, vision, and core values"
      sections={[
        {
          title: 'Mission Statement',
          fields: [
            {
              label: 'Mission',
              type: 'textarea',
              value:
                'To rescue, rehabilitate, and rehome animals in distress while promoting compassion and responsible pet ownership through education and community engagement.',
            },
          ],
        },
        {
          title: 'Vision Statement',
          fields: [
            {
              label: 'Vision',
              type: 'textarea',
              value:
                'A world where every animal is treated with dignity, compassion, and respect, and where human-animal coexistence is harmonious and sustainable.',
            },
          ],
        },
        {
          title: 'Core Values',
          fields: [
            {
              label: 'Value 1: Compassion',
              type: 'textarea',
              value: 'We treat every animal with empathy, kindness, and respect.',
            },
            {
              label: 'Value 2: Integrity',
              type: 'textarea',
              value:
                'We operate with transparency, honesty, and accountability in all our actions.',
            },
            {
              label: 'Value 3: Excellence',
              type: 'textarea',
              value:
                'We strive for the highest standards in animal care and welfare.',
            },
          ],
        },
      ]}
    />
  );
}

// Made with Bob