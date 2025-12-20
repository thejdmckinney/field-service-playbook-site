import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Free Time Tracking Template for Contractors | Field Service Playbook",
  description: "Download our free time tracking spreadsheet template. Track billable hours, job time, and labor costs for your field service business.",
  openGraph: {
    title: "Free Time Tracking Template for Contractors",
    description: "Track billable hours and job time with our free spreadsheet template",
    url: "https://fieldserviceplaybook.com/tools/time-tracking",
  },
  alternates: {
    canonical: "https://fieldserviceplaybook.com/tools/time-tracking",
  }
};

export default function TimeTrackingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
