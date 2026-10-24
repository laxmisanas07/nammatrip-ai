'use client';

import React from 'react';
import { Search, X, Filter } from 'lucide-react';

interface DestinationFiltersProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedRegion: string;
  onRegionChange: (r: string) => void;
  selectedInterest: string;
  onInterestChange: (i: string) => void;
  onReset: () => void;
  totalCount: number;
  filteredCount: number;
}

const REGIONS: { label: string; value: string }[] = [
  { label: 'All Karnataka Regions', value: 'all' },
  { label: 'South Karnataka', value: 'South Karnataka' },
  { label: 'Coastal Karnataka', value: 'Coastal Karnataka' },
  { label: 'Malenadu / Western Ghats', value: 'Malenadu / Western Ghats' },
  { label: 'Central Karnataka', value: 'Central Karnataka' },
  { label: 'North Karnataka', value: 'North Karnataka' },
];

const INTERESTS: { label: string; value: string }[] = [
  { label: 'All Interests', value: 'all' },
  { label: '🏛️ Heritage & History', value: 'heritage' },
  { label: '🌿 Nature & Waterfalls', value: 'nature' },
  { label: '⛰️ Hill Stations', value: 'hillstations' },
  { label: '🐅 Wildlife & Safaris', value: 'wildlife' },
  { label: '🏖️ Beaches & Coastal', value: 'beaches' },
  { label: '🍛 Food & Local Flavors', value: 'food' },
  { label: '🪔 Spiritual & Culture', value: 'culture' },
  { label: '🧗 Adventure & Outdoors', value: 'adventure' },
  { label: '👨‍👩‍👦 Family-Friendly', value: 'family' },
];

export function DestinationFilters({
  searchQuery,
  onSearchChange,
  selectedRegion,
  onRegionChange,
  selectedInterest,
  onInterestChange,
  onReset,
  totalCount,
  filteredCount,
}: DestinationFiltersProps) {
  const isFiltered = searchQuery !== '' || selectedRegion !== 'all' || selectedInterest !== 'all';

  return (
    <div className="space-y-4 bg-white p-5 rounded-2xl border border-[#E3DED6] shadow-sm">
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#7E8B84] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by destination name, activities, or tags..."
            className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-[#E3DED6] bg-[#FAF7F2] text-sm text-[#1F2623] placeholder-[#7E8B84] focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7E8B84] hover:text-[#1F2623]"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Region Dropdown */}
        <div className="w-full sm:w-64">
          <select
            value={selectedRegion}
            onChange={(e) => onRegionChange(e.target.value)}
            className="w-full py-2.5 px-3 rounded-xl border border-[#E3DED6] bg-[#FAF7F2] text-sm text-[#1F2623] focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
          >
            {REGIONS.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Interest Pills */}
      <div>
        <div className="flex items-center justify-between text-xs font-semibold text-[#7E8B84] uppercase tracking-wider mb-2">
          <span className="flex items-center gap-1.5">
            <Filter className="w-3 h-3 text-[#2D6A4F]" />
            Filter by Interest Theme
          </span>
          {isFiltered && (
            <button
              type="button"
              onClick={onReset}
              className="text-[#C85A32] hover:underline capitalize font-medium"
            >
              Reset Filters
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {INTERESTS.map((int) => {
            const isSelected = selectedInterest === int.value;
            return (
              <button
                key={int.value}
                type="button"
                onClick={() => onInterestChange(isSelected && int.value !== 'all' ? 'all' : int.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-[#1B4332] text-white shadow-sm'
                    : 'bg-[#FAF7F2] text-[#4A5550] border border-[#E3DED6] hover:bg-[#EFEBE4]'
                }`}
              >
                {int.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Result counter */}
      <div className="text-xs text-[#7E8B84] pt-1 flex items-center justify-between">
        <span>
          Showing <strong className="text-[#0F2A1F]">{filteredCount}</strong> of {totalCount} curated Karnataka destinations
        </span>
      </div>
    </div>
  );
}
