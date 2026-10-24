import { describe, it, expect } from 'vitest';
import {
  plannerInputSchema,
  aiItineraryOutputSchema,
} from '@/lib/validation/itinerary-schema';

describe('Zod Validation Schemas', () => {
  it('successfully validates valid planner form inputs', () => {
    const validData = {
      origin: 'Bengaluru',
      destinationPreference: 'mysuru',
      travellerCount: 2,
      durationDays: 3,
      budget: 15000,
      travelStyle: 'balanced',
      interests: ['heritage', 'food'],
      transportMode: 'flexible',
      acknowledgedEstimates: true,
    };

    const res = plannerInputSchema.safeParse(validData);
    expect(res.success).toBe(true);
  });

  it('rejects budget below minimum threshold', () => {
    const invalidBudget = {
      origin: 'Bengaluru',
      destinationPreference: 'anywhere',
      travellerCount: 2,
      durationDays: 3,
      budget: 500, // min is 1000
      travelStyle: 'budget',
      interests: ['heritage'],
      transportMode: 'public',
      acknowledgedEstimates: true,
    };

    const res = plannerInputSchema.safeParse(invalidBudget);
    expect(res.success).toBe(false);
    if (!res.success) {
      expect(res.error.issues[0].message).toContain('Minimum realistic trip budget is ₹1,000');
    }
  });

  it('rejects duration outside supported 1-10 days range', () => {
    const invalidDuration = {
      origin: 'Bengaluru',
      destinationPreference: 'anywhere',
      travellerCount: 2,
      durationDays: 15, // max 10
      budget: 50000,
      travelStyle: 'comfort',
      interests: ['beaches'],
      transportMode: 'self-drive',
      acknowledgedEstimates: true,
    };

    const res = plannerInputSchema.safeParse(invalidDuration);
    expect(res.success).toBe(false);
  });

  it('validates AI itinerary output structure', () => {
    const validAIOutput = {
      title: '3-Day Royal Mysuru Experience',
      destinationSummary: 'Mysuru',
      overview: 'A delightful exploration of palaces, silk, and gardens in cultural Mysuru.',
      destinations: [
        {
          id: 'mysuru',
          name: 'Mysuru (Mysore)',
          region: 'South Karnataka',
          coordinates: { lat: 12.3052, lng: 76.6552 },
        },
      ],
      days: [
        {
          dayNumber: 1,
          title: 'Day 1: Arrival & Palace Visit',
          region: 'South Karnataka',
          destinationId: 'mysuru',
          destinationName: 'Mysuru',
          activities: [
            {
              timeOfDay: 'morning',
              title: 'Check-in and breakfast',
              description: 'Arrive in Mysuru and enjoy morning breakfast.',
              destinationName: 'Mysuru',
              activityCategory: 'food',
              estimatedCost: 200,
              costBasis: 'Per person breakfast',
            },
          ],
          practicalNotes: 'Arrive early at palace counters.',
          estimatedDailyCost: 200,
        },
      ],
      estimatedCosts: {
        transport: 3000,
        accommodation: 5600,
        food: 3600,
        activities: 1200,
        miscellaneous: 800,
      },
      accountingBasis: {
        transportBasis: 'Train and local autos',
        accommodationBasis: '1 room for 2 nights',
        foodBasis: '3 meals per day',
        activitiesBasis: 'Palace entrance',
        miscBasis: 'Contingency buffer',
      },
      assumptions: ['Double occupancy hotel'],
      travelTips: ['Wear comfortable walking shoes'],
      limitations: ['Subject to seasonal rates'],
    };

    const res = aiItineraryOutputSchema.safeParse(validAIOutput);
    expect(res.success).toBe(true);
  });
});
