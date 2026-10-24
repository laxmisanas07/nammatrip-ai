'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Itinerary } from '@/types';
import {
  Bookmark,
  Printer,
  Share2,
  RotateCw,
  SlidersHorizontal,
  PlusCircle,
  Sparkles,
  MapPin,
  Calendar,
  Users,
  Check,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { BudgetBreakdown } from '../budget/BudgetBreakdown';
import { FeasibilityBadge } from '../budget/FeasibilityBadge';
import { DayScheduleCard } from './DayScheduleCard';
import { ItineraryMap } from './ItineraryMap';
import { isItinerarySaved, saveItinerary } from '@/lib/storage/saved-trips';

interface ItineraryViewProps {
  itinerary: Itinerary;
}

export function ItineraryView({ itinerary }: ItineraryViewProps) {
  const router = useRouter();
  const [isSaved, setIsSaved] = useState<boolean>(() => isItinerarySaved(itinerary.id));
  const [copied, setCopied] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  const handleSaveToggle = () => {
    saveItinerary(itinerary);
    setIsSaved(true);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleCopySummary = async () => {
    const summary = `NammaTrip AI Itinerary: ${itinerary.title}
Origin: ${itinerary.origin} | Destinations: ${itinerary.destinationSummary}
Duration: ${itinerary.durationDays} Days | Travellers: ${itinerary.travellerCount} | Style: ${itinerary.travelStyle}
Total Estimated Cost: ₹${itinerary.budget.totalEstimatedCost.toLocaleString('en-IN')} (Target: ₹${itinerary.budget.userBudget.toLocaleString('en-IN')})
Feasibility: ${itinerary.feasibility.status.replace('-', ' ').toUpperCase()}

Day-by-Day Highlights:
${itinerary.days
  .map(
    (d) =>
      `Day ${d.dayNumber}: ${d.title}\n` +
      d.activities.map((a) => ` - [${a.timeOfDay.toUpperCase()}] ${a.title}`).join('\n')
  )
  .join('\n\n')}

Plan created with NammaTrip AI — Your Intelligent Karnataka Travel Planner.`;

    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      alert('Unable to copy to clipboard.');
    }
  };

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    try {
      const response = await fetch('/api/itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          origin: itinerary.origin,
          destinationPreference: itinerary.destinations[0]?.id || 'anywhere',
          travellerCount: itinerary.travellerCount,
          durationDays: itinerary.durationDays,
          budget: itinerary.budget.userBudget,
          travelStyle: itinerary.travelStyle,
          interests: itinerary.interests,
          transportMode: itinerary.transportMode,
          acknowledgedEstimates: true,
        }),
      });

      if (!response.ok) throw new Error('Regeneration failed');
      const newItinerary = await response.json();
      saveItinerary(newItinerary);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('current_itinerary', JSON.stringify(newItinerary));
      }
      router.push(`/itinerary/${newItinerary.id}`);
    } catch {
      alert('Failed to regenerate itinerary. Please retry.');
    } finally {
      setIsRegenerating(false);
    }
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto pb-16">
      {/* Toast Notification */}
      {saveToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1B4332] text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-2 text-sm font-semibold animate-in fade-in slide-in-from-bottom-3 no-print">
          <CheckCircle2 className="w-5 h-5 text-[#E9F3EE]" />
          <span>Itinerary successfully saved to your browser!</span>
        </div>
      )}

      {/* Action Toolbar */}
      <div className="editorial-card p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 no-print">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSaveToggle}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              isSaved
                ? 'bg-[#E9F3EE] text-[#1B4332] border border-[#2D6A4F]/40'
                : 'bg-white border border-[#E3DED6] text-[#1F2623] hover:bg-[#FAF7F2]'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-[#1B4332]' : ''}`} />
            <span>{isSaved ? 'Saved to Browser' : 'Save Itinerary'}</span>
          </button>

          <Link
            href={`/plan?destination=${itinerary.destinations[0]?.id || ''}`}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-[#E3DED6] text-[#1F2623] hover:bg-[#FAF7F2] flex items-center gap-1.5"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#7E8B84]" />
            <span>Adjust Inputs</span>
          </Link>

          <button
            type="button"
            onClick={handleRegenerate}
            disabled={isRegenerating}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-[#E3DED6] text-[#1F2623] hover:bg-[#FAF7F2] flex items-center gap-1.5 disabled:opacity-50"
          >
            <RotateCw className={`w-4 h-4 text-[#2D6A4F] ${isRegenerating ? 'animate-spin' : ''}`} />
            <span>{isRegenerating ? 'Generating...' : 'Regenerate'}</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-[#E3DED6] text-[#1F2623] hover:bg-[#FAF7F2] flex items-center gap-1.5"
            title="Print or Save as PDF"
          >
            <Printer className="w-4 h-4 text-[#4A5550]" />
            <span>Print / PDF</span>
          </button>

          <button
            type="button"
            onClick={handleCopySummary}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-[#E3DED6] text-[#1F2623] hover:bg-[#FAF7F2] flex items-center gap-1.5"
          >
            {copied ? <Check className="w-4 h-4 text-green-600" /> : <Share2 className="w-4 h-4 text-[#4A5550]" />}
            <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
          </button>

          <Link
            href="/plan"
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#1B4332] text-white hover:bg-[#143828] flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Trip</span>
          </Link>
        </div>
      </div>

      {/* Header Banner */}
      <div className="editorial-card p-6 sm:p-10 space-y-6">
        {/* Source Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#E3DED6]">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                itinerary.generatorSource === 'gemini'
                  ? 'bg-[#E9F3EE] text-[#1B4332] border border-[#2D6A4F]/30'
                  : 'bg-[#FAF7F2] text-[#4A5550] border border-[#E3DED6]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C85A32]" />
              {itinerary.generatorSource === 'gemini'
                ? 'AI Generated via Google Gemini'
                : 'Built-in Karnataka Knowledge Planner'}
            </span>
          </div>

          <div className="text-xs text-[#7E8B84] flex items-center gap-1">
            <span>Trip ID: </span>
            <code className="font-mono bg-[#FAF7F2] px-2 py-0.5 rounded text-[11px]">
              {itinerary.id}
            </code>
          </div>
        </div>

        {/* Title & Key Specs */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0F2A1F] tracking-tight leading-snug">
            {itinerary.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mt-4 text-xs font-medium text-[#4A5550]">
            <div className="flex items-center gap-1.5 bg-[#FAF7F2] px-3 py-1.5 rounded-lg border border-[#E3DED6]">
              <MapPin className="w-4 h-4 text-[#C85A32]" />
              <span>
                <strong>{itinerary.origin}</strong> → {itinerary.destinationSummary}
              </span>
            </div>

            <div className="flex items-center gap-1.5 bg-[#FAF7F2] px-3 py-1.5 rounded-lg border border-[#E3DED6]">
              <Calendar className="w-4 h-4 text-[#2D6A4F]" />
              <span>{itinerary.durationDays} Days</span>
            </div>

            <div className="flex items-center gap-1.5 bg-[#FAF7F2] px-3 py-1.5 rounded-lg border border-[#E3DED6]">
              <Users className="w-4 h-4 text-[#2D6A4F]" />
              <span>{itinerary.travellerCount} Traveller(s)</span>
            </div>

            <div className="flex items-center gap-1.5 bg-[#FAF7F2] px-3 py-1.5 rounded-lg border border-[#E3DED6] capitalize">
              <span>Tier: <strong>{itinerary.travelStyle}</strong></span>
            </div>

            <div className="flex items-center gap-1.5 bg-[#FAF7F2] px-3 py-1.5 rounded-lg border border-[#E3DED6] capitalize">
              <span>Mode: <strong>{itinerary.transportMode}</strong></span>
            </div>
          </div>
        </div>

        {/* Overview Narrative */}
        <div className="pt-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#7E8B84] mb-2">
            Trip Overview
          </h3>
          <p className="text-sm text-[#4A5550] leading-relaxed whitespace-pre-line">
            {itinerary.overview}
          </p>
        </div>

        {/* Feasibility Indicator */}
        <div className="pt-2">
          <FeasibilityBadge feasibility={itinerary.feasibility} />
        </div>
      </div>

      {/* Programmatic Budget Breakdown */}
      <BudgetBreakdown budget={itinerary.budget} />

      {/* Day by Day Schedule */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#0F2A1F] tracking-tight">
            Day-by-Day Schedule
          </h2>
          <span className="text-xs text-[#7E8B84]">
            {itinerary.durationDays} curated days
          </span>
        </div>

        <div className="space-y-6">
          {itinerary.days.map((day) => (
            <DayScheduleCard key={day.dayNumber} day={day} />
          ))}
        </div>
      </div>

      {/* Interactive Map & Route */}
      <ItineraryMap destinations={itinerary.destinations} />

      {/* Assumptions, Travel Tips & Limitations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Assumptions */}
        <div className="editorial-card p-6 space-y-4">
          <h3 className="text-sm font-bold text-[#0F2A1F] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#2D6A4F]" />
            Budget & Operational Assumptions
          </h3>
          <ul className="space-y-2 text-xs text-[#4A5550]">
            {itinerary.assumptions.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#2D6A4F] font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Travel Tips */}
        <div className="editorial-card p-6 space-y-4">
          <h3 className="text-sm font-bold text-[#0F2A1F] flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-[#D96B43]" />
            Karnataka Route & Cultural Tips
          </h3>
          <ul className="space-y-2 text-xs text-[#4A5550]">
            {itinerary.travelTips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#C85A32] font-bold">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Transparent Disclaimer */}
      <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E3DED6] text-xs text-[#7E8B84] space-y-1">
        <div className="flex items-center gap-1.5 font-bold text-[#0F2A1F]">
          <AlertCircle className="w-4 h-4 text-[#7E8B84]" />
          <span>Transparency & Planning Limitations</span>
        </div>
        <ul className="list-disc list-inside space-y-0.5 text-[11px] text-[#4A5550]">
          {itinerary.limitations.map((lim, i) => (
            <li key={i}>{lim}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
