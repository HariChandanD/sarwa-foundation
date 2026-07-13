import { PlaceholderContentPage } from '@/components/admin/PlaceholderContentPage';

export default function PaymentContentPage() {
  return (
    <PlaceholderContentPage
      title="Payment Details"
      description="Manage bank account details and payment information for donations"
      sections={[
        {
          title: 'Bank Account Details',
          fields: [
            {
              label: 'Bank Name',
              type: 'text',
              value: 'IDFC FIRST Bank',
            },
            {
              label: 'Account Number',
              type: 'text',
              value: '55448899000',
            },
            {
              label: 'IFSC Code',
              type: 'text',
              value: 'IDFB0081109',
            },
            {
              label: 'Account Holder Name',
              type: 'text',
              value: 'Sarwa Society for Animal Welfare',
            },
          ],
        },
        {
          title: 'UPI Details',
          fields: [
            {
              label: 'UPI ID',
              type: 'text',
              value: 'sarwasociety@idfcbank',
            },
            {
              label: 'QR Code Image',
              type: 'image',
              placeholder: 'Upload QR code for UPI payments',
            },
          ],
        },
        {
          title: 'Tax Information',
          fields: [
            {
              label: '80G Certificate Number',
              type: 'text',
              value: 'AACTS5287QF20221',
            },
            {
              label: 'PAN Number',
              type: 'text',
              value: 'AACTS5287Q',
            },
          ],
        },
      ]}
    />
  );
}

// Made with Bob