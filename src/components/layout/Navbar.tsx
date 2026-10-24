'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, MapPin, Bookmark, Menu, X, Sparkles } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/explore', label: 'Explore Karnataka', icon: Compass },
    { href: '/plan', label: 'Plan a Trip', icon: Sparkles },
    { href: '/saved', label: 'Saved Trips', icon: Bookmark },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E3DED6] no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-[#1B4332] text-white flex items-center justify-center shadow-sm group-hover:bg-[#143828] transition-colors">
              <MapPin className="w-6 h-6 text-[#E9F3EE]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-[#0F2A1F]">
                NammaTrip <span className="text-[#C85A32]">AI</span>
              </span>
              <span className="text-xs font-medium text-[#4A5550]">
                ನಮ್ಮ ಟ್ರಿಪ್ • Karnataka Travel Planner
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? 'text-[#1B4332] border-b-2 border-[#1B4332] pb-1'
                      : 'text-[#4A5550] hover:text-[#0F2A1F]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/plan"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1B4332] text-white text-sm font-semibold hover:bg-[#143828] shadow-sm transition-all active:scale-[0.98]"
            >
              <Sparkles className="w-4 h-4 text-[#FDF6F2]" />
              Plan My Trip
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-[#1F2623] hover:bg-[#EFEBE4] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-[#E3DED6] bg-[#FAF7F2] px-4 pt-3 pb-6 space-y-3">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium ${
                  isActive
                    ? 'bg-[#E9F3EE] text-[#1B4332]'
                    : 'text-[#1F2623] hover:bg-[#EFEBE4]'
                }`}
              >
                <Icon className="w-5 h-5 text-[#2D6A4F]" />
                {link.label}
              </Link>
            );
          })}
          <div className="pt-2">
            <Link
              href="/plan"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#1B4332] text-white text-base font-semibold shadow-sm hover:bg-[#143828]"
            >
              <Sparkles className="w-5 h-5" />
              Plan My Trip
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
