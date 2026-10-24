import React from 'react';
import Link from 'next/link';
import { MapPin, ShieldCheck, Heart, Sparkles, Compass, Bookmark } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0F2A1F] text-[#EFEBE4] mt-24 border-t border-[#1B4332] no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand & Purpose */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#2D6A4F] text-white flex items-center justify-center">
                <MapPin className="w-5 h-5 text-[#E9F3EE]" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                NammaTrip <span className="text-[#D96B43]">AI</span>
              </span>
            </div>
            <p className="text-sm text-[#A2B3AB] max-w-md leading-relaxed">
              Your Intelligent Karnataka Travel Planner. Tailoring personalized itineraries,
              day-by-day schedules, and transparent budget breakdowns for travellers, students,
              and families exploring Karnataka.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#7E8B84] pt-2">
              <span className="inline-block px-2.5 py-1 rounded-md bg-[#1B4332] text-[#E9F3EE] font-mono">
                Problem Statement 06: Travel & Tourism
              </span>
              <span>Kannada Digital Innovation Hackathon 2026</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider text-white uppercase mb-4">
              Explore & Plan
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/plan" className="hover:text-white transition-colors flex items-center gap-1.5 text-[#A2B3AB]">
                  <Sparkles className="w-3.5 h-3.5 text-[#D96B43]" />
                  AI Trip Planner
                </Link>
              </li>
              <li>
                <Link href="/explore" className="hover:text-white transition-colors flex items-center gap-1.5 text-[#A2B3AB]">
                  <Compass className="w-3.5 h-3.5 text-[#40916C]" />
                  Explore Destinations
                </Link>
              </li>
              <li>
                <Link href="/saved" className="hover:text-white transition-colors flex items-center gap-1.5 text-[#A2B3AB]">
                  <Bookmark className="w-3.5 h-3.5 text-[#A2B3AB]" />
                  Saved Itineraries
                </Link>
              </li>
            </ul>
          </div>

          {/* Transparency & Disclaimer */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider text-white uppercase mb-4">
              Planning Disclaimer
            </h4>
            <p className="text-xs text-[#A2B3AB] leading-relaxed">
              All budgets, admission fees, and transit durations are realistic baseline estimates in
              Indian Rupees (₹). Dynamic flight/bus surge fares, seasonality, and local holiday
              schedules should always be confirmed prior to travel.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-[#A2B3AB]">
              <ShieldCheck className="w-4 h-4 text-[#40916C]" />
              <span>Offline-ready & LocalStorage enabled</span>
            </div>
          </div>
        </div>

        <div className="border-t border-[#1B4332] mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7E8B84] gap-4">
          <p>© 2026 NammaTrip AI. Dedicated to celebrating the heritage and beauty of Karnataka.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-[#C85A32] fill-[#C85A32]" /> for Karnataka Tourism
          </p>
        </div>
      </div>
    </footer>
  );
}
