'use client';

import React, { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Itinerary } from '@/types';
import { ItineraryView } from '@/components/itinerary/ItineraryView';
import { getSavedItineraryById } from '@/lib/storage/saved-trips';
import { AlertCircle, PlusCircle, Bookmark, Loader2 } from 'lucide-react';

function ItineraryDetailContent() {
  const params = useParams();
  const id = params?.id as string;

  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;

    const timer = setTimeout(() => {
      // 1. First check sessionStorage for the freshly generated plan
      if (typeof window !== 'undefined') {
        try {
          const sessionData = sessionStorage.getItem('current_itinerary');
          if (sessionData) {
            const parsed = JSON.parse(sessionData);
            if (parsed.id === id) {
              setItinerary(parsed);
              setLoading(false);
              return;
            }
          }
        } catch (e) {
          console.error('Session storage read error:', e);
        }

        // 2. Fall back to saved itineraries in localStorage
        const saved = getSavedItineraryById(id);
        if (saved) {
          setItinerary(saved);
          setLoading(false);
          return;
        }
      }

      // 3. If not found anywhere
      setNotFound(true);
      setLoading(false);
    }, 0);

    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-3">
        <Loader2 className="w-8 h-8 text-[#1B4332] animate-spin" />
        <p className="text-sm text-[#7E8B84]">Retrieving your Karnataka itinerary...</p>
      </div>
    );
  }

  if (notFound || !itinerary) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#FDF6F2] border border-[#C85A32]/40 text-[#C85A32] flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-[#0F2A1F]">Itinerary Not Found</h1>
          <p className="text-xs text-[#7E8B84] leading-relaxed">
            We couldn&apos;t locate an itinerary with ID <code className="bg-[#FAF7F2] px-2 py-0.5 rounded">{id}</code>.
            It may have expired or was created in a different browser session.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link
            href="/plan"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#1B4332] text-white text-xs font-bold hover:bg-[#143828] transition-colors flex items-center justify-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create New Plan</span>
          </Link>
          <Link
            href="/saved"
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-[#E3DED6] bg-white text-xs font-bold text-[#1F2623] hover:bg-[#FAF7F2] transition-colors flex items-center justify-center gap-2"
          >
            <Bookmark className="w-4 h-4 text-[#7E8B84]" />
            <span>View Saved Trips</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10">
      <ItineraryView itinerary={itinerary} />
    </div>
  );
}

export default function ItineraryDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-3">
          <Loader2 className="w-8 h-8 text-[#1B4332] animate-spin" />
          <p className="text-sm text-[#7E8B84]">Loading travel plan...</p>
        </div>
      }
    >
      <ItineraryDetailContent />
    </Suspense>
  );
}
