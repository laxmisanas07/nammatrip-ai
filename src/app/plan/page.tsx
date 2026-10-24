'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PlannerForm } from '@/components/planner/PlannerForm';
import { Sparkles, Compass } from 'lucide-react';

function PlannerContent() {
  const searchParams = useSearchParams();
  const initialDestination = searchParams.get('destination') || undefined;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E9F3EE] text-[#1B4332] text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-[#C85A32]" />
          <span>Interactive AI Travel Architect</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#0F2A1F] tracking-tight">
          Plan Your Karnataka Journey
        </h1>
        <p className="text-sm text-[#4A5550] max-w-xl mx-auto leading-relaxed">
          Configure your travel constraints below. NammaTrip synthesizes day-by-day schedules,
          calculates transparent INR costs, and aligns with your travel style.
        </p>
      </div>

      {/* Planner Form */}
      <PlannerForm key={initialDestination} initialDestination={initialDestination} />

      {/* Planning Advice Strip */}
      <div className="p-6 rounded-2xl bg-white border border-[#E3DED6] space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F2A1F] flex items-center gap-1.5">
          <Compass className="w-4 h-4 text-[#2D6A4F]" />
          Planning Guidelines for Karnataka Routes
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#4A5550]">
          <div>
            <strong className="text-[#0F2A1F] block mb-1">Western Ghats & Hill Stations:</strong>
            Ghat roads in Coorg, Chikkamagaluru, and Agumbe have speed limits of 30–40 km/h with sharp
            hairpin bends. Allow extra transit buffer time compared to plain highways.
          </div>
          <div>
            <strong className="text-[#0F2A1F] block mb-1">Temple & Heritage Etiquette:</strong>
            Certain sanctums in Gokarna, Udupi, and Chamundi Hill have traditional dress requirements
            and camera restrictions in inner corridors.
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PlanPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh] flex items-center justify-center text-sm text-[#7E8B84]">
          Loading trip planner...
        </div>
      }
    >
      <PlannerContent />
    </Suspense>
  );
}
