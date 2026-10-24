import { describe, it, expect, beforeEach } from 'vitest';
import {
  saveItinerary,
  getSavedItineraries,
  getSavedItineraryById,
  deleteSavedItinerary,
  isItinerarySaved,
} from '@/lib/storage/saved-trips';
import { Itinerary } from '@/types';

describe('Saved Trips Local Storage Management', () => {
  const dummyItinerary: Itinerary = {
    id: 'test-trip-123',
    title: 'Test Mysuru Trip',
    origin: 'Bengaluru',
    destinationSummary: 'Mysuru',
    durationDays: 2,
    travellerCount: 2,
    interests: ['heritage'],
    travelStyle: 'budget',
    transportMode: 'public',
    generatedAt: new Date().toISOString(),
    generatorSource: 'deterministic-fallback',
    overview: 'Test trip overview description.',
    destinations: [
      {
        id: 'mysuru',
        name: 'Mysuru',
        region: 'South Karnataka',
        coordinates: { lat: 12.3052, lng: 76.6552 },
      },
    ],
    days: [],
    budget: {
      transport: 1000,
      accommodation: 1400,
      food: 1800,
      activities: 500,
      miscellaneous: 200,
      totalEstimatedCost: 4900,
      costPerTraveller: 2450,
      userBudget: 8000,
      difference: 3100,
      accountingBasis: {
        transportBasis: 'Train',
        accommodationBasis: 'Lodge',
        foodBasis: 'Local mess',
        activitiesBasis: 'Palace',
        miscBasis: 'Buffer',
      },
    },
    feasibility: {
      status: 'within-budget',
      percentageUtilized: 61,
      explanation: 'Within budget',
      recommendations: [],
    },
    assumptions: [],
    travelTips: [],
    limitations: [],
  };

  beforeEach(() => {
    localStorage.clear();
  });

  it('saves an itinerary and retrieves it', () => {
    const saved = saveItinerary(dummyItinerary);
    expect(saved).toBe(true);

    const all = getSavedItineraries();
    expect(all.length).toBe(1);
    expect(all[0].id).toBe('test-trip-123');

    const single = getSavedItineraryById('test-trip-123');
    expect(single).not.toBeNull();
    expect(single?.title).toBe('Test Mysuru Trip');

    expect(isItinerarySaved('test-trip-123')).toBe(true);
  });

  it('deletes an itinerary correctly', () => {
    saveItinerary(dummyItinerary);
    expect(getSavedItineraries().length).toBe(1);

    const deleted = deleteSavedItinerary('test-trip-123');
    expect(deleted).toBe(true);
    expect(getSavedItineraries().length).toBe(0);
  });

  it('gracefully handles corrupted or malformed data in localStorage', () => {
    localStorage.setItem('nammatrip_saved_itineraries_v1', 'corrupted{json');
    const all = getSavedItineraries();
    expect(all).toEqual([]);
  });
});
