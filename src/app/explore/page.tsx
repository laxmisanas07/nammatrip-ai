'use client';

import React, { useState, useMemo } from 'react';
import { KARNATAKA_DESTINATIONS } from '@/lib/destinations/data';
import { DestinationCard } from '@/components/destinations/DestinationCard';
import { DestinationDetailModal } from '@/components/destinations/DestinationDetailModal';
import { DestinationFilters } from '@/components/destinations/DestinationFilters';
import { Destination } from '@/types';
import { Compass, RotateCcw } from 'lucide-react';

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedInterest, setSelectedInterest] = useState('all');
  const [activeModalDest, setActiveModalDest] = useState<Destination | null>(null);

  const filteredDestinations = useMemo(() => {
    return KARNATAKA_DESTINATIONS.filter((dest) => {
      // Search query filter (matches name, kannadaName, description, tags, suggestedActivities)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = dest.name.toLowerCase().includes(query);
        const matchesKannada = dest.kannadaName.toLowerCase().includes(query);
        const matchesDesc = dest.shortDescription.toLowerCase().includes(query);
        const matchesTags = dest.tags.some((t) => t.toLowerCase().includes(query));
        const matchesActivities = dest.suggestedActivities.some((a) =>
          a.toLowerCase().includes(query)
        );

        if (!matchesName && !matchesKannada && !matchesDesc && !matchesTags && !matchesActivities) {
          return false;
        }
      }

      // Region filter
      if (selectedRegion !== 'all' && dest.region !== selectedRegion) {
        return false;
      }

      // Interest filter
      if (selectedInterest !== 'all') {
        const hasInterest = dest.interests.includes(selectedInterest as unknown as Destination['interests'][number]);
        if (!hasInterest) return false;
      }

      return true;
    });
  }, [searchQuery, selectedRegion, selectedInterest]);

  const handleReset = () => {
    setSearchQuery('');
    setSelectedRegion('all');
    setSelectedInterest('all');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Detail Modal */}
      <DestinationDetailModal
        destination={activeModalDest}
        onClose={() => setActiveModalDest(null)}
      />

      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E9F3EE] text-[#1B4332] text-xs font-semibold">
          <Compass className="w-3.5 h-3.5 text-[#2D6A4F]" />
          <span>Curated Karnataka Destination Directory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#0F2A1F] tracking-tight">
          Explore Karnataka
        </h1>
        <p className="text-sm text-[#4A5550] max-w-2xl leading-relaxed">
          Discover hand-curated destinations across the royal south, the Arabian coast, misty
          Western Ghats, and the rock-cut heritage of northern Karnataka.
        </p>
      </div>

      {/* Interactive Filters & Search */}
      <DestinationFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedRegion={selectedRegion}
        onRegionChange={setSelectedRegion}
        selectedInterest={selectedInterest}
        onInterestChange={setSelectedInterest}
        onReset={handleReset}
        totalCount={KARNATAKA_DESTINATIONS.length}
        filteredCount={filteredDestinations.length}
      />

      {/* Destination Grid */}
      {filteredDestinations.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map((dest) => (
            <DestinationCard
              key={dest.id}
              destination={dest}
              onSelectDetails={(d) => setActiveModalDest(d)}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="editorial-card p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#E3DED6] flex items-center justify-center mx-auto text-[#7E8B84]">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#0F2A1F]">No Matching Destinations Found</h3>
            <p className="text-xs text-[#7E8B84] max-w-md mx-auto mt-1">
              We couldn&apos;t find any destinations matching your current filter criteria. Try resetting
              or searching for another Karnataka location.
            </p>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1B4332] text-white text-xs font-semibold hover:bg-[#143828] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}
    </div>
  );
}
