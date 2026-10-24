'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Compass,
  Calendar,
  IndianRupee,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { KARNATAKA_DESTINATIONS } from '@/lib/destinations/data';
import { DestinationCard } from '@/components/destinations/DestinationCard';
import { DestinationDetailModal } from '@/components/destinations/DestinationDetailModal';
import { Destination } from '@/types';

export default function HomePage() {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

  // Top featured destinations
  const featuredDestinations = KARNATAKA_DESTINATIONS.slice(0, 6);

  return (
    <div className="space-y-24 pb-20">
      {/* Detail Modal */}
      <DestinationDetailModal
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
      />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 sm:pt-20 pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#E3DED6]">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E9F3EE] border border-[#2D6A4F]/20 text-[#1B4332] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#C85A32]" />
            <span>Problem Statement 06 • Kannada Digital Innovation Hackathon 2026</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl font-black text-[#0F2A1F] tracking-tight leading-[1.15]">
            Your Karnataka. Your Journey.{' '}
            <span className="text-[#1B4332] underline decoration-[#C85A32] decoration-wavy decoration-2">
              Intelligently Planned.
            </span>
          </h1>

          {/* Value proposition subtext */}
          <p className="text-lg sm:text-xl text-[#4A5550] max-w-2xl mx-auto leading-relaxed">
            Tell NammaTrip your budget, available days, interests, and travel preferences.
            Receive a personalized Karnataka travel itinerary with practical day-wise schedules
            and a transparent cost breakdown in Indian Rupees (₹).
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/plan"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#1B4332] text-white text-base font-bold hover:bg-[#143828] active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5 text-[#D96B43]" />
              <span>Plan My Trip</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/explore"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white border border-[#E3DED6] text-[#0F2A1F] text-base font-semibold hover:bg-[#FAF7F2] transition-all flex items-center justify-center gap-2 shadow-xs"
            >
              <Compass className="w-5 h-5 text-[#2D6A4F]" />
              <span>Explore Karnataka</span>
            </Link>
          </div>

          {/* Assurance pills */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-xs text-[#7E8B84] font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#2D6A4F]" />
              <span>No signup or login required</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#2D6A4F]" />
              <span>Transparent INR (₹) estimates</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#2D6A4F]" />
              <span>Built-in offline fallback planner</span>
            </div>
          </div>
        </div>
      </section>

      {/* HOW PLANNING WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C85A32]">
            Simple 3-Step Journey
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2A1F] tracking-tight">
            How NammaTrip AI Plans Your Trip
          </h2>
          <p className="text-xs sm:text-sm text-[#4A5550]">
            Combining verified Karnataka tourism knowledge with intelligent itinerary design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: '01',
              title: 'Share Your Constraints',
              desc: 'Provide your starting city, budget in INR, party size, travel duration (1–10 days), and themes like heritage, beaches, coffee hills, or wildlife.',
              icon: Calendar,
            },
            {
              step: '02',
              title: 'Intelligent Route & Schedule Synthesis',
              desc: 'NammaTrip pairs nearby destinations to avoid travel fatigue, structuring sensible morning, afternoon, and evening activities with local tips.',
              icon: Sparkles,
            },
            {
              step: '03',
              title: 'Transparent Budget & Local Saving',
              desc: 'Inspect separate costs for transport, stays, dining, and entry tickets. Save, adjust, print as PDF, or export with zero fuss.',
              icon: IndianRupee,
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="editorial-card p-6 sm:p-8 space-y-4 relative flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-black text-[#E3DED6] font-mono">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#E9F3EE] text-[#1B4332] flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#2D6A4F]" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-[#0F2A1F]">{item.title}</h3>
                  <p className="text-xs text-[#4A5550] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FEATURED DESTINATIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#C85A32]">
              Destination Discovery
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2A1F] tracking-tight mt-1">
              Featured Karnataka Destinations
            </h2>
            <p className="text-xs sm:text-sm text-[#4A5550] mt-1">
              Hand-curated regions with verified coordinates, authentic experiences, and daily cost guides.
            </p>
          </div>
          <Link
            href="/explore"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1B4332] hover:text-[#0F2A1F] transition-colors"
          >
            <span>View all 15+ curated destinations</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredDestinations.map((destination) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              onSelectDetails={(dest) => setSelectedDestination(dest)}
            />
          ))}
        </div>
      </section>

      {/* TRANSPARENT BUDGETING HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="editorial-card p-8 sm:p-12 bg-gradient-to-br from-white via-[#FAF7F2] to-[#E9F3EE]/40 border border-[#2D6A4F]/20 space-y-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F]">
              Budget Transparency
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0F2A1F] tracking-tight">
              Real Budget Accounting. Zero Surprise Expenses.
            </h2>
            <p className="text-sm text-[#4A5550] leading-relaxed">
              Unlike generic travel platforms that hide room occupancy rules or vehicle fuel costs,
              NammaTrip calculates every trip in Indian Rupees (₹) using consistent group vs person
              accounting. Double occupancy rooms, daily meals, state highway tolls, and monument tickets
              are separately audited.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-[#E3DED6]">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-[#0F2A1F]">
                <ShieldCheck className="w-5 h-5 text-[#2D6A4F]" />
                <span>Double Occupancy Stays</span>
              </div>
              <p className="text-xs text-[#4A5550] leading-relaxed">
                Stays are realistically calculated as 2 persons per room for multi-day trips, avoiding
                inflated or undercounted hotel bills.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-[#0F2A1F]">
                <ShieldCheck className="w-5 h-5 text-[#2D6A4F]" />
                <span>Group vs Person Segregation</span>
              </div>
              <p className="text-xs text-[#4A5550] leading-relaxed">
                Transport and lodging are pooled for your group, while food and entry tickets are
                calculated per person.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-[#0F2A1F]">
                <ShieldCheck className="w-5 h-5 text-[#2D6A4F]" />
                <span>Feasibility Alert & Advice</span>
              </div>
              <p className="text-xs text-[#4A5550] leading-relaxed">
                If your trip exceeds your target budget, NammaTrip highlights the overrun amount and
                provides actionable tips to economize.
              </p>
            </div>
          </div>

          <div className="pt-4">
            <Link
              href="/plan"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1B4332] text-white text-xs font-bold hover:bg-[#143828] transition-colors"
            >
              <span>Build Your Custom Plan Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
