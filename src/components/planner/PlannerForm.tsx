'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  MapPin,
  Users,
  Calendar,
  IndianRupee,
  Compass,
  Bus,
  Car,
  CheckCircle,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { KARNATAKA_DESTINATIONS } from '@/lib/destinations/data';
import { InterestCategory, PlannerFormInput, TransportMode, TravelStyle } from '@/types';
import { plannerInputSchema } from '@/lib/validation/itinerary-schema';
import { saveItinerary } from '@/lib/storage/saved-trips';

interface PlannerFormProps {
  initialDestination?: string;
}

const INTEREST_OPTIONS: { id: InterestCategory; label: string; icon: string; desc: string }[] = [
  { id: 'heritage', label: 'Heritage & History', icon: '🏛️', desc: 'Palaces, ruins & ancient empires' },
  { id: 'nature', label: 'Nature & Waterfalls', icon: '🌿', desc: 'Western Ghats & cascading falls' },
  { id: 'hillstations', label: 'Hill Stations', icon: '⛰️', desc: 'Misty coffee ridges & cool summits' },
  { id: 'wildlife', label: 'Wildlife & Safaris', icon: '🐅', desc: 'Elephants, tigers & forest reserves' },
  { id: 'beaches', label: 'Beaches & Coastal', icon: '🏖️', desc: 'Arabian sea sunsets & cliff walks' },
  { id: 'food', label: 'Food & Local Cuisine', icon: '🍛', desc: 'Mysore pak, dosas & coastal curries' },
  { id: 'culture', label: 'Spiritual & Cultural', icon: '🪔', desc: 'Temples, rituals & traditional arts' },
  { id: 'adventure', label: 'Adventure & Outdoors', icon: '🧗', desc: 'River rafting, treks & water sports' },
  { id: 'family', label: 'Family-Friendly', icon: '👨‍👩‍👦', desc: 'Relaxed sights, gardens & safe parks' },
];

export function PlannerForm({ initialDestination }: PlannerFormProps) {
  const router = useRouter();

  // Form State with sensible defaults
  const [origin, setOrigin] = useState('Bengaluru');
  const [destinationPreference, setDestinationPreference] = useState(initialDestination || 'anywhere');
  const [travellerCount, setTravellerCount] = useState<number>(2);
  const [durationDays, setDurationDays] = useState<number>(3);
  const [budget, setBudget] = useState<number>(18000);
  const [travelStyle, setTravelStyle] = useState<TravelStyle>('balanced');
  const [interests, setInterests] = useState<InterestCategory[]>(['heritage', 'food', 'nature']);
  const [transportMode, setTransportMode] = useState<TransportMode>('flexible');
  const [travelMonth, setTravelMonth] = useState('November');
  const [additionalPreferences, setAdditionalPreferences] = useState('');
  const [acknowledgedEstimates, setAcknowledgedEstimates] = useState(true);

  // Status & Error States
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const toggleInterest = (id: InterestCategory) => {
    setInterests((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((i) => i !== id) : prev) : [...prev, id]
    );
  };

  const handleQuickOrigin = (city: string) => {
    setOrigin(city);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setFieldErrors({});

    const formData: PlannerFormInput = {
      origin: origin.trim(),
      destinationPreference,
      travellerCount: Number(travellerCount),
      durationDays: Number(durationDays),
      budget: Number(budget),
      travelStyle,
      interests,
      transportMode,
      travelMonth: travelMonth || undefined,
      additionalPreferences: additionalPreferences.trim() || undefined,
      acknowledgedEstimates,
    };

    // Client-side validation using Zod
    const validation = plannerInputSchema.safeParse(formData);
    if (!validation.success) {
      const errors: Record<string, string> = {};
      validation.error.issues.forEach((issue) => {
        const fieldName = issue.path[0]?.toString() || 'general';
        errors[fieldName] = issue.message;
      });
      setFieldErrors(errors);
      setErrorMsg('Please review the highlighted fields in the form.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/itinerary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to generate itinerary. Please try again.');
      }

      const itinerary = await response.json();

      // Save to localStorage immediately so it's persisted and queryable
      saveItinerary(itinerary);

      // Store in sessionStorage as latest active plan and navigate to itinerary view
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('current_itinerary', JSON.stringify(itinerary));
      }

      router.push(`/itinerary/${itinerary.id}`);
    } catch (err: unknown) {
      console.error('Submission error:', err);
      setErrorMsg(
        err instanceof Error
          ? err.message
          : 'Unable to connect to the itinerary service. Please verify your internet or try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* Global error banner */}
      {errorMsg && (
        <div className="p-4 rounded-xl bg-[#FDF6F2] border border-[#C85A32] flex items-start gap-3 text-sm text-[#A84420] animate-in fade-in">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-bold">Attention: </span>
            {errorMsg}
          </div>
        </div>
      )}

      {/* SECTION 1: Origin and Destination */}
      <div className="editorial-card p-6 sm:p-8 space-y-6">
        <div className="border-b border-[#E3DED6] pb-4">
          <h2 className="text-xl font-bold text-[#0F2A1F] flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#2D6A4F]" />
            1. Starting Point & Destination
          </h2>
          <p className="text-xs text-[#4A5550] mt-1">
            Tell us where you are beginning and where in Karnataka you would like to head.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Origin */}
          <div className="space-y-2">
            <label htmlFor="origin" className="block text-xs font-bold text-[#0F2A1F] uppercase tracking-wider">
              Starting City / Origin *
            </label>
            <input
              id="origin"
              type="text"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              placeholder="e.g. Bengaluru, Mysuru, Hubballi, Mangaluru, Pune, Hyderabad"
              className={`w-full px-4 py-3 rounded-xl border bg-[#FAF7F2] text-sm text-[#1F2623] focus:outline-none focus:ring-2 focus:ring-[#1B4332] ${
                fieldErrors.origin ? 'border-red-500 bg-red-50/20' : 'border-[#E3DED6]'
              }`}
            />
            {fieldErrors.origin && (
              <p className="text-xs text-red-600 font-medium">{fieldErrors.origin}</p>
            )}
            {/* Quick Origin chips */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px] text-[#7E8B84]">
              <span>Quick pick:</span>
              {['Bengaluru', 'Mysuru', 'Mangaluru', 'Hubballi', 'Belagavi', 'Hyderabad'].map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => handleQuickOrigin(city)}
                  className={`px-2 py-0.5 rounded border text-[11px] transition-colors ${
                    origin === city
                      ? 'bg-[#1B4332] text-white border-[#1B4332]'
                      : 'bg-white border-[#E3DED6] text-[#4A5550] hover:bg-[#EFEBE4]'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* Destination Preference */}
          <div className="space-y-2">
            <label htmlFor="destinationPref" className="block text-xs font-bold text-[#0F2A1F] uppercase tracking-wider">
              Destination Preference *
            </label>
            <select
              id="destinationPref"
              value={destinationPreference}
              onChange={(e) => setDestinationPreference(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[#E3DED6] bg-[#FAF7F2] text-sm text-[#1F2623] focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
            >
              <option value="anywhere">✨ Anywhere in Karnataka (Recommend Best Route)</option>
              <optgroup label="Popular Karnataka Destinations">
                {KARNATAKA_DESTINATIONS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.kannadaName})
                  </option>
                ))}
              </optgroup>
              <optgroup label="By Geographic Region">
                <option value="South Karnataka">South Karnataka (Mysuru, Kabini, Bandipur)</option>
                <option value="Coastal Karnataka">Coastal Karnataka (Gokarna, Udupi, Murudeshwar)</option>
                <option value="Malenadu / Western Ghats">Malenadu / Western Ghats (Coorg, Chikkamagaluru, Shivamogga)</option>
                <option value="Central Karnataka">Central Karnataka (Hampi, Belur, Halebidu)</option>
                <option value="North Karnataka">North Karnataka (Badami, Dandeli, Vijayapura)</option>
              </optgroup>
            </select>
            <p className="text-[11px] text-[#7E8B84]">
              Choose a specific city, a preferred region, or let NammaTrip pair destinations according to your interests.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 2: Duration, Travellers & Budget */}
      <div className="editorial-card p-6 sm:p-8 space-y-6">
        <div className="border-b border-[#E3DED6] pb-4">
          <h2 className="text-xl font-bold text-[#0F2A1F] flex items-center gap-2">
            <Users className="w-5 h-5 text-[#2D6A4F]" />
            2. Travellers, Time & Budget
          </h2>
          <p className="text-xs text-[#4A5550] mt-1">
            Specify the party size, available days, and your total trip target budget in Indian Rupees (₹).
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Travellers */}
          <div className="space-y-2">
            <label htmlFor="travellers" className="block text-xs font-bold text-[#0F2A1F] uppercase tracking-wider">
              Travellers *
            </label>
            <div className="flex items-center gap-3">
              <input
                id="travellers"
                type="number"
                min={1}
                max={20}
                value={travellerCount}
                onChange={(e) => setTravellerCount(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-4 py-3 rounded-xl border border-[#E3DED6] bg-[#FAF7F2] text-sm text-[#1F2623] font-semibold text-center focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
              />
            </div>
            {fieldErrors.travellerCount && (
              <p className="text-xs text-red-600 font-medium">{fieldErrors.travellerCount}</p>
            )}
            <p className="text-[11px] text-[#7E8B84]">
              {travellerCount === 1
                ? 'Solo traveller'
                : travellerCount === 2
                ? 'Couple / 2 Travellers'
                : `${travellerCount} Travellers (Group / Family)`}
            </p>
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <label htmlFor="duration" className="block text-xs font-bold text-[#0F2A1F] uppercase tracking-wider">
              Trip Duration (Days) *
            </label>
            <div className="flex items-center gap-3">
              <input
                id="duration"
                type="number"
                min={1}
                max={10}
                value={durationDays}
                onChange={(e) => setDurationDays(Math.min(10, Math.max(1, parseInt(e.target.value) || 1)))}
                className="w-full px-4 py-3 rounded-xl border border-[#E3DED6] bg-[#FAF7F2] text-sm text-[#1F2623] font-semibold text-center focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
              />
            </div>
            {fieldErrors.durationDays && (
              <p className="text-xs text-red-600 font-medium">{fieldErrors.durationDays}</p>
            )}
            <p className="text-[11px] text-[#7E8B84]">
              {durationDays === 1
                ? '1 Day quick escape'
                : `${durationDays} Days / ${durationDays - 1} Nights`}
            </p>
          </div>

          {/* Budget */}
          <div className="space-y-2">
            <label htmlFor="budget" className="block text-xs font-bold text-[#0F2A1F] uppercase tracking-wider flex items-center justify-between">
              <span>Total Trip Budget (₹ INR) *</span>
            </label>
            <div className="relative">
              <IndianRupee className="w-4 h-4 text-[#C85A32] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="budget"
                type="number"
                step={500}
                min={1000}
                value={budget}
                onChange={(e) => setBudget(Math.max(1000, parseInt(e.target.value) || 1000))}
                className="w-full pl-9 pr-4 py-3 rounded-xl border border-[#E3DED6] bg-[#FAF7F2] text-sm text-[#1F2623] font-bold focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
              />
            </div>
            {fieldErrors.budget && (
              <p className="text-xs text-red-600 font-medium">{fieldErrors.budget}</p>
            )}
            <p className="text-[11px] text-[#7E8B84]">
              Approx. ₹{Math.round(budget / travellerCount).toLocaleString('en-IN')} per traveller
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 3: Travel Style & Transport */}
      <div className="editorial-card p-6 sm:p-8 space-y-6">
        <div className="border-b border-[#E3DED6] pb-4">
          <h2 className="text-xl font-bold text-[#0F2A1F] flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#2D6A4F]" />
            3. Travel Style & Transport Mode
          </h2>
          <p className="text-xs text-[#4A5550] mt-1">
            Choose the comfort level that matches your travel expectations and road preference.
          </p>
        </div>

        {/* Travel Style Selector */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-[#0F2A1F] uppercase tracking-wider">
            Travel Style Tier
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                id: 'budget' as TravelStyle,
                title: 'Budget',
                subtitle: 'Authentic & Economical',
                desc: 'Clean lodges & guest houses, KSRTC buses, local darshinis & mess food.',
              },
              {
                id: 'balanced' as TravelStyle,
                title: 'Balanced',
                subtitle: 'Comfort & Value (Recommended)',
                desc: '3-star hotels or estate homestays, mixed cabs/express trains, curated dining.',
              },
              {
                id: 'comfort' as TravelStyle,
                title: 'Comfort',
                subtitle: 'Premium & Relaxed',
                desc: '4/5-star boutique resorts, private chauffeur AC cabs, heritage experiences.',
              },
            ].map((style) => {
              const isSelected = travelStyle === style.id;
              return (
                <div
                  key={style.id}
                  onClick={() => setTravelStyle(style.id)}
                  className={`cursor-pointer p-4 rounded-xl border-2 transition-all ${
                    isSelected
                      ? 'border-[#1B4332] bg-[#E9F3EE]/40 shadow-sm'
                      : 'border-[#E3DED6] bg-white hover:border-[#2D6A4F]/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#0F2A1F]">{style.title}</span>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-[#1B4332] bg-[#1B4332]' : 'border-[#7E8B84]'
                      }`}
                    >
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-[#C85A32] block mt-0.5">
                    {style.subtitle}
                  </span>
                  <p className="text-xs text-[#4A5550] mt-2 leading-relaxed">{style.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Transport Mode */}
        <div className="space-y-2 pt-2">
          <label className="block text-xs font-bold text-[#0F2A1F] uppercase tracking-wider">
            Preferred Transport Mode
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                id: 'public' as TransportMode,
                label: 'Public Transport',
                icon: Bus,
                desc: 'KSRTC Express / Airavat buses & Indian Railways',
              },
              {
                id: 'self-drive' as TransportMode,
                label: 'Self-Drive / Car Rental',
                icon: Car,
                desc: 'Drive own car or hired self-drive vehicle',
              },
              {
                id: 'flexible' as TransportMode,
                label: 'Flexible / Mixed',
                icon: Compass,
                desc: 'Intercity train/bus + local private cabs',
              },
            ].map((mode) => {
              const Icon = mode.icon;
              const isSelected = transportMode === mode.id;
              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => setTransportMode(mode.id)}
                  className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all ${
                    isSelected
                      ? 'border-[#1B4332] bg-[#E9F3EE]/50 shadow-xs'
                      : 'border-[#E3DED6] bg-white hover:bg-[#FAF7F2]'
                  }`}
                >
                  <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${isSelected ? 'text-[#1B4332]' : 'text-[#7E8B84]'}`} />
                  <div>
                    <span className="text-xs font-bold text-[#0F2A1F] block">{mode.label}</span>
                    <span className="text-[11px] text-[#4A5550]">{mode.desc}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* SECTION 4: Travel Interests */}
      <div className="editorial-card p-6 sm:p-8 space-y-6">
        <div className="border-b border-[#E3DED6] pb-4">
          <h2 className="text-xl font-bold text-[#0F2A1F] flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#2D6A4F]" />
            4. Travel Interests & Experiences
          </h2>
          <p className="text-xs text-[#4A5550] mt-1">
            Select one or more themes that excite you. NammaTrip prioritizes destinations and daily
            activities aligned with your choices.
          </p>
        </div>

        {fieldErrors.interests && (
          <p className="text-xs text-red-600 font-medium">{fieldErrors.interests}</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {INTEREST_OPTIONS.map((item) => {
            const isChecked = interests.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => toggleInterest(item.id)}
                className={`cursor-pointer p-4 rounded-xl border transition-all flex items-start gap-3 ${
                  isChecked
                    ? 'border-[#2D6A4F] bg-[#E9F3EE]/60 shadow-xs'
                    : 'border-[#E3DED6] bg-white hover:border-[#7E8B84]'
                }`}
              >
                <span className="text-2xl shrink-0">{item.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#0F2A1F]">{item.label}</span>
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center border ${
                        isChecked ? 'bg-[#1B4332] border-[#1B4332]' : 'border-[#7E8B84]'
                      }`}
                    >
                      {isChecked && <CheckCircle className="w-3 h-3 text-white" />}
                    </div>
                  </div>
                  <p className="text-[11px] text-[#4A5550] mt-1 leading-snug">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 5: Timing & Additional Notes */}
      <div className="editorial-card p-6 sm:p-8 space-y-6">
        <div className="border-b border-[#E3DED6] pb-4">
          <h2 className="text-xl font-bold text-[#0F2A1F] flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#2D6A4F]" />
            5. Dates & Additional Preferences (Optional)
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="travelMonth" className="block text-xs font-bold text-[#0F2A1F] uppercase tracking-wider">
              Travel Month
            </label>
            <select
              id="travelMonth"
              value={travelMonth}
              onChange={(e) => setTravelMonth(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[#E3DED6] bg-[#FAF7F2] text-sm text-[#1F2623] focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
            >
              {[
                'January',
                'February',
                'March',
                'April',
                'May',
                'June (Monsoon)',
                'July (Monsoon)',
                'August',
                'September',
                'October (Dasara season)',
                'November',
                'December',
              ].map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="addPrefs" className="block text-xs font-bold text-[#0F2A1F] uppercase tracking-wider">
              Special Requests / Dietary / Senior Citizen Notes
            </label>
            <input
              id="addPrefs"
              type="text"
              maxLength={500}
              value={additionalPreferences}
              onChange={(e) => setAdditionalPreferences(e.target.value)}
              placeholder="e.g. Pure vegetarian food only, travelling with elderly parents, prefer minimal trekking"
              className="w-full px-4 py-3 rounded-xl border border-[#E3DED6] bg-[#FAF7F2] text-sm text-[#1F2623] focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
            />
          </div>
        </div>

        {/* Disclaimer Checkbox */}
        <div className="pt-2">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={acknowledgedEstimates}
              onChange={(e) => setAcknowledgedEstimates(e.target.checked)}
              className="mt-1 w-4 h-4 rounded border-[#E3DED6] text-[#1B4332] focus:ring-[#1B4332]"
            />
            <span className="text-xs text-[#4A5550] leading-relaxed">
              I understand that generated schedules, entrance costs, and transport rates are realistic
              estimates calculated in Indian Rupees (₹) for planning guidance. Actual prices may vary by
              season, fuel adjustments, and availability.
            </span>
          </label>
          {fieldErrors.acknowledgedEstimates && (
            <p className="text-xs text-red-600 font-medium mt-1">{fieldErrors.acknowledgedEstimates}</p>
          )}
        </div>
      </div>

      {/* Submit Action Button */}
      <div className="flex flex-col items-center justify-center space-y-3 pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto px-10 py-4 rounded-xl bg-[#1B4332] text-white font-bold text-base hover:bg-[#143828] active:scale-[0.99] transition-all shadow-md flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Synthesizing Your Karnataka Itinerary...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-[#D96B43]" />
              <span>Generate My Itinerary</span>
            </>
          )}
        </button>

        <p className="text-xs text-[#7E8B84] text-center max-w-md">
          {isLoading
            ? 'Matching regional attractions, calculating double-occupancy hotel rooms, and auditing budget feasibility...'
            : 'No login required. Generated travel plans are automatically stored in your local browser.'}
        </p>
      </div>
    </form>
  );
}
