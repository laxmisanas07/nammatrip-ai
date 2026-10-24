'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Itinerary } from '@/types';
import { getSavedItineraries, deleteSavedItinerary } from '@/lib/storage/saved-trips';
import { formatINR } from '@/lib/utils';
import {
  Bookmark,
  MapPin,
  Trash2,
  ArrowRight,
  PlusCircle,
  IndianRupee,
  Clock,
  Sparkles,
} from 'lucide-react';

export default function SavedTripsPage() {
  const [savedTrips, setSavedTrips] = useState<Itinerary[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const loadTrips = () => {
    setSavedTrips(getSavedItineraries());
    setLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadTrips();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleDelete = (id: string) => {
    deleteSavedItinerary(id);
    setDeleteConfirmId(null);
    loadTrips();
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-xs text-[#7E8B84]">
        Loading your saved trips...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E3DED6]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E9F3EE] text-[#1B4332] text-xs font-semibold mb-2">
            <Bookmark className="w-3.5 h-3.5 fill-[#1B4332]" />
            <span>Browser Persistent Storage</span>
          </div>
          <h1 className="text-3xl font-black text-[#0F2A1F] tracking-tight">Saved Itineraries</h1>
          <p className="text-xs text-[#7E8B84] mt-1">
            Access your previously planned Karnataka itineraries without requiring an account.
          </p>
        </div>

        {savedTrips.length > 0 && (
          <Link
            href="/plan"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1B4332] text-white text-xs font-semibold hover:bg-[#143828] transition-colors shadow-xs"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Plan New Trip</span>
          </Link>
        )}
      </div>

      {/* Trips list */}
      {savedTrips.length > 0 ? (
        <div className="space-y-4">
          {savedTrips.map((trip) => {
            const isDeleting = deleteConfirmId === trip.id;
            return (
              <div
                key={trip.id}
                className="editorial-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[#2D6A4F]/40 transition-colors"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-[#FAF7F2] border border-[#E3DED6] text-[#4A5550]">
                      {trip.durationDays} Days
                    </span>
                    <span className="text-[11px] font-medium text-[#7E8B84] capitalize">
                      {trip.travelStyle} tier
                    </span>
                    {trip.generatorSource === 'gemini' && (
                      <span className="text-[11px] font-semibold text-[#1B4332] bg-[#E9F3EE] px-2 py-0.5 rounded flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#C85A32]" />
                        Gemini AI
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-[#0F2A1F]">{trip.title}</h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-[#4A5550]">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#C85A32]" />
                      <strong>{trip.origin}</strong> → {trip.destinationSummary}
                    </span>
                    <span className="flex items-center gap-1">
                      <IndianRupee className="w-3.5 h-3.5 text-[#2D6A4F]" />
                      Est. Total: <strong>{formatINR(trip.budget.totalEstimatedCost)}</strong>
                    </span>
                    <span className="flex items-center gap-1 text-[#7E8B84]">
                      <Clock className="w-3.5 h-3.5" />
                      Saved on {new Date(trip.generatedAt).toLocaleDateString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 shrink-0">
                  {isDeleting ? (
                    <div className="flex items-center gap-2 bg-[#FDF6F2] p-2 rounded-xl border border-[#C85A32]/40">
                      <span className="text-xs text-[#A84420] font-medium">Confirm delete?</span>
                      <button
                        type="button"
                        onClick={() => handleDelete(trip.id)}
                        className="px-2.5 py-1 text-xs font-bold bg-[#C85A32] text-white rounded-md hover:bg-[#A84420]"
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteConfirmId(null)}
                        className="px-2.5 py-1 text-xs font-medium bg-white border border-[#E3DED6] text-[#4A5550] rounded-md"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setDeleteConfirmId(trip.id)}
                      className="p-2.5 rounded-xl border border-[#E3DED6] text-[#7E8B84] hover:text-[#C85A32] hover:bg-[#FAF7F2] transition-colors"
                      title="Delete saved itinerary"
                      aria-label="Delete saved itinerary"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}

                  <Link
                    href={`/itinerary/${trip.id}`}
                    className="px-5 py-2.5 rounded-xl bg-[#1B4332] text-white text-xs font-semibold hover:bg-[#143828] transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <span>View Itinerary</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="editorial-card p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#E3DED6] flex items-center justify-center mx-auto text-[#7E8B84]">
            <Bookmark className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-[#0F2A1F]">No Saved Trips Yet</h3>
            <p className="text-xs text-[#7E8B84] max-w-sm mx-auto">
              You haven&apos;t saved any Karnataka travel itineraries in this browser yet. Use our AI
              planner to create your first journey.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/plan"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1B4332] text-white text-xs font-bold hover:bg-[#143828] transition-colors shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-[#D96B43]" />
              <span>Plan Your First Trip</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
