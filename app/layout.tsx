import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'OG GBS — AI Job Demand Tracker | International Management',
  description: 'AI-powered global job demand research for post-grad International Management students. Built by OG GBS for the AI Native Enterprise course.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}