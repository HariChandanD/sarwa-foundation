import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({ 
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sarwa Foundation - Rescuing, Rehabilitating, and Rehoming Animals",
  description: "Join Sarwa Foundation in our mission to rescue, rehabilitate, and rehome animals in need. Every life deserves love and care. Make a difference today.",
  keywords: ["animal welfare", "animal rescue", "NGO", "donate", "volunteer", "adopt pets", "animal shelter", "sarwa foundation"],
  authors: [{ name: "Sarwa Foundation" }],
  openGraph: {
    title: "Sarwa Foundation - Every Life Deserves Love and Care",
    description: "Join Sarwa Foundation in our mission to rescue, rehabilitate, and rehome animals in need.",
    type: "website",
    locale: "en_US",
    siteName: "Sarwa Foundation",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sarwa Foundation",
    description: "Rescuing, Rehabilitating, and Rehoming Animals in Need",
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
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

// Made with Bob
