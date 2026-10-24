'use client';

import React from 'react';
import Link from 'next/link';
import { Destination } from '@/types';
import { MapPin, Clock, IndianRupee, ExternalLink, ArrowRight } from 'lucide-react';
import { formatINR } from '@/lib/utils';

interface DestinationCardProps {
  destination: Destination;
  onSelectDetails?: (dest: Destination) => void;
}

export function DestinationCard({ destination, onSelectDetails }: DestinationCardProps) {
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${destination.coordinates.lat},${destination.coordinates.lng}`;

  return (
    <div className="editorial-card editorial-card-hover flex flex-col overflow-hidden group">
      {/* Image container */}
      <div className="relative h-56 w-full bg-[#EFEBE4] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={destination.imageUrl}
          alt={destination.imageAlt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            // Graceful image fallback
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        {/* Region badge */}
        <div className="absolute top-3 left-3 bg-[#0F2A1F]/85 backdrop-blur-sm text-[#E9F3EE] text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
          {destination.region}
        </div>
        {/* Duration badge */}
        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm text-[#1B4332] text-xs font-semibold px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-[#2D6A4F]" />
          {destination.recommendedDays} Days
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="text-lg font-bold text-[#0F2A1F] tracking-tight group-hover:text-[#1B4332] transition-colors">
              {destination.name}
            </h3>
            <span className="text-sm font-medium text-[#7E8B84] shrink-0 font-sans">
              {destination.kannadaName}
            </span>
          </div>
          <p className="text-xs text-[#4A5550] line-clamp-2 mt-2 leading-relaxed">
            {destination.shortDescription}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {destination.interests.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-medium bg-[#E9F3EE] text-[#1B4332] px-2 py-0.5 rounded-md capitalize"
            >
              {tag}
            </span>
          ))}
          {destination.tags.slice(0, 2).map((t) => (
            <span
              key={t}
              className="text-[11px] font-medium bg-[#EFEBE4] text-[#4A5550] px-2 py-0.5 rounded-md"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Pricing guide & external map link */}
        <div className="pt-2 border-t border-[#E3DED6] flex items-center justify-between text-xs text-[#4A5550]">
          <div className="flex items-center gap-1">
            <IndianRupee className="w-3.5 h-3.5 text-[#C85A32]" />
            <span>From </span>
            <span className="font-semibold text-[#0F2A1F]">
              {formatINR(destination.dailyCostRange.budget)}
            </span>
            <span className="text-[10px] text-[#7E8B84]">/day</span>
          </div>

          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] text-[#2D6A4F] hover:text-[#1B4332] hover:underline"
            title="Open location on external map"
          >
            <MapPin className="w-3 h-3" />
            <span>Map</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          {onSelectDetails && (
            <button
              type="button"
              onClick={() => onSelectDetails(destination)}
              className="px-3 py-2 text-xs font-semibold rounded-lg border border-[#E3DED6] text-[#1F2623] hover:bg-[#EFEBE4] transition-colors"
            >
              View Guide
            </button>
          )}
          <Link
            href={`/plan?destination=${destination.id}`}
            className={`px-3 py-2 text-xs font-semibold rounded-lg bg-[#1B4332] text-white hover:bg-[#143828] flex items-center justify-center gap-1 transition-colors ${
              !onSelectDetails ? 'col-span-2' : ''
            }`}
          >
            <span>Plan Trip</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
