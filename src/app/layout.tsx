import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
  description: "Free resources, tools, and expert advice for field service contractors. Marketing strategies, efficiency hacks, software reviews, and business growth tips for handyman, plumbing, HVAC, electrical, and landscaping businesses.",
  keywords: [
    "field service management",
    "contractor business growth",
    "handyman business tips",
    "plumbing business marketing",
    "HVAC contractor software",
    "electrical contractor tips",
    "landscaping business growth",
    "field service software comparison",
    "contractor marketing strategies",
    "service business efficiency",
    "contractor revenue growth",
    "field service scheduling",
    "contractor customer service",
    "field service best practices"
  ],
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
        url: "/png-logo-circle.png",
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
    images: ["/png-logo-circle.png"],
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
    logo: 'https://fieldserviceplaybook.com/png-logo-circle.png',
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
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-EFCTK1YX4E"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-EFCTK1YX4E');
            `,
          }}
        />
        
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
