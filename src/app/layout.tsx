import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Sarwa Society for Animal Welfare - Rescuing, Rehabilitating, and Rehoming Animals',
  description:
    'Join Sarwa Society for Animal Welfare in our mission to rescue, rehabilitate, and rehome animals in need. Every life deserves love and care. Make a difference today.',
  keywords: [
    'animal welfare',
    'animal rescue',
    'NGO',
    'donate',
    'volunteer',
    'adopt pets',
    'animal shelter',
    'sarwa society',
    'bangalore animal rescue',
  ],
  authors: [{ name: 'Sarwa Society for Animal Welfare' }],
  openGraph: {
    title: 'Sarwa Society for Animal Welfare - Every Life Deserves Love and Care',
    description:
      'Join Sarwa Society for Animal Welfare in our mission to rescue, rehabilitate, and rehome animals in need.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Sarwa Society for Animal Welfare',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sarwa Society for Animal Welfare',
    description: 'Rescuing, Rehabilitating, and Rehoming Animals in Need',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className={`${inter.className} antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

// Made with Bob
