import type { Metadata, Viewport } from 'next';
import React, { Suspense } from 'react';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'NammaTrip AI — Intelligent Karnataka Travel Planner',
  description:
    'Plan personalized Karnataka travel itineraries tailored to your budget, time, and travel interests. Day-by-day schedules with transparent INR cost breakdowns.',
  keywords: [
    'Karnataka travel planner',
    'NammaTrip AI',
    'Karnataka itineraries',
    'Mysore',
    'Hampi',
    'Coorg',
    'Gokarna',
    'Karnataka Tourism',
    'Travel budget India',
  ],
  authors: [{ name: 'NammaTrip AI Team' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#FAF7F2] text-[#1F2623]">
        <Suspense fallback={<div className="h-20 bg-[#FAF7F2] border-b border-[#E3DED6]" />}>
          <Navbar />
        </Suspense>
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
