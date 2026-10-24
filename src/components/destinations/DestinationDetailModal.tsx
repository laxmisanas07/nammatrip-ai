'use client';

import React from 'react';
import Link from 'next/link';
import { Destination } from '@/types';
import { X, Calendar, Compass, IndianRupee, Lightbulb, CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';
import { formatINR } from '@/lib/utils';

interface DestinationDetailModalProps {
  destination: Destination | null;
  onClose: () => void;
}

export function DestinationDetailModal({ destination, onClose }: DestinationDetailModalProps) {
  if (!destination) return null;

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${destination.coordinates.lat},${destination.coordinates.lng}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-[#E3DED6] overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header with image */}
        <div className="relative h-64 sm:h-72 w-full bg-[#EFEBE4] shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={destination.imageUrl}
            alt={destination.imageAlt}
            className="w-full h-full object-cover"
            onError={(e) => {
              const img = e.currentTarget;
              if (!img.src.includes('/images/destinations/hampi.jpg')) {
                img.src = '/images/destinations/hampi.jpg';
              }
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title overlay */}
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-[#2D6A4F] text-[#E9F3EE]">
              {destination.region}
            </span>
            <div className="flex items-baseline gap-3 mt-1">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {destination.name}
              </h2>
              <span className="text-lg font-medium text-white/80 font-sans">
                {destination.kannadaName}
              </span>
            </div>
            <p className="text-xs text-white/80 mt-1 flex items-center gap-2">
              <span>{destination.coordinates.lat.toFixed(4)}° N, {destination.coordinates.lng.toFixed(4)}° E</span>
              <span>•</span>
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white flex items-center gap-1"
              >
                <span>View on Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </p>
          </div>
        </div>

        {/* Scrollable body content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-[#1F2623]">
          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#7E8B84] mb-1">
              About Destination
            </h4>
            <p className="text-[#4A5550] leading-relaxed">
              {destination.fullDescription}
            </p>
          </div>

          {/* Key Facts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-[#FAF7F2] border border-[#E3DED6]">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-[#2D6A4F] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-[#0F2A1F]">Best Time to Visit</span>
                <p className="text-xs text-[#4A5550]">{destination.bestTimeToVisit}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Compass className="w-5 h-5 text-[#C85A32] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-[#0F2A1F]">Transit & Nearest Hub</span>
                <p className="text-xs text-[#4A5550]">{destination.nearestHub}</p>
              </div>
            </div>
          </div>

          {/* Cost Estimates */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#7E8B84] mb-2 flex items-center gap-1.5">
              <IndianRupee className="w-4 h-4 text-[#C85A32]" />
              Estimated Daily Costs (Illustrative Guidelines)
            </h4>
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-lg border border-[#E3DED6] bg-white text-center">
                <span className="text-[11px] font-semibold text-[#7E8B84] uppercase">Budget</span>
                <p className="text-base font-bold text-[#1B4332] mt-0.5">
                  {formatINR(destination.dailyCostRange.budget)}
                </p>
                <span className="text-[10px] text-[#7E8B84]">per day/person</span>
              </div>
              <div className="p-3 rounded-lg border-2 border-[#2D6A4F] bg-[#E9F3EE]/40 text-center">
                <span className="text-[11px] font-bold text-[#1B4332] uppercase">Balanced</span>
                <p className="text-base font-bold text-[#1B4332] mt-0.5">
                  {formatINR(destination.dailyCostRange.balanced)}
                </p>
                <span className="text-[10px] text-[#7E8B84]">per day/person</span>
              </div>
              <div className="p-3 rounded-lg border border-[#E3DED6] bg-white text-center">
                <span className="text-[11px] font-semibold text-[#7E8B84] uppercase">Comfort</span>
                <p className="text-base font-bold text-[#1B4332] mt-0.5">
                  {formatINR(destination.dailyCostRange.comfort)}
                </p>
                <span className="text-[10px] text-[#7E8B84]">per day/person</span>
              </div>
            </div>
          </div>

          {/* Suggested Activities */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#7E8B84] mb-2">
              Must-Experience Highlights
            </h4>
            <ul className="space-y-2">
              {destination.suggestedActivities.map((act, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-[#4A5550]">
                  <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-0.5" />
                  <span>{act}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Practical Tips */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#7E8B84] mb-2 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-[#D96B43]" />
              Local Travel Advice
            </h4>
            <ul className="space-y-1.5 bg-[#FAF7F2] p-4 rounded-xl border border-[#E3DED6]">
              {destination.travelTips.map((tip, idx) => (
                <li key={idx} className="text-xs text-[#4A5550] flex items-start gap-2">
                  <span className="text-[#C85A32] font-bold">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-[#FAF7F2] border-t border-[#E3DED6] flex items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-[#E3DED6] text-xs font-semibold text-[#4A5550] hover:bg-white"
          >
            Close Guide
          </button>
          <Link
            href={`/plan?destination=${destination.id}`}
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[#1B4332] text-white text-xs font-semibold hover:bg-[#143828] flex items-center gap-2 shadow-sm"
          >
            <span>Plan Itinerary for {destination.name.split(' ')[0]}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
