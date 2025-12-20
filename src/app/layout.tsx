import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://fieldserviceplaybook.com'),
  title: {
    default: "Field Service Playbook | Grow Your Field Service Business",
    template: "%s | Field Service Playbook"
  },
  description: "Free resources, tools, and expert advice to grow your field service business. Marketing tips, efficiency hacks, and software guides for contractors.",
  keywords: ["field service management", "contractor business", "handyman business", "plumbing business", "HVAC business", "electrical contractor", "field service software", "contractor marketing", "business growth"],
  authors: [{ name: "Jeremy McKinney", url: "https://creativejobhub.com" }],
  creator: "Field Service Playbook",
  publisher: "Field Service Playbook",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fieldserviceplaybook.com",
    siteName: "Field Service Playbook",
    title: "Field Service Playbook | Grow Your Field Service Business",
    description: "Free resources, tools, and expert advice to grow your field service business. Marketing tips, efficiency hacks, and software guides for contractors.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Field Service Playbook"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Field Service Playbook | Grow Your Field Service Business",
    description: "Free resources, tools, and expert advice to grow your field service business.",
    images: ["/og-image.jpg"],
    creator: "@fieldserviceplaybook"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  },
  verification: {
    google: "your-google-verification-code",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Organization Schema for SEO
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Field Service Playbook',
    url: 'https://fieldserviceplaybook.com',
    logo: 'https://fieldserviceplaybook.com/logo.png',
    description: 'Free resources, tools, and expert advice to grow your field service business',
    sameAs: [
      'https://twitter.com/fieldserviceplaybook',
      'https://www.facebook.com/fieldserviceplaybook'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'hello@fieldserviceplaybook.com'
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
