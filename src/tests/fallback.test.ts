import { describe, it, expect } from 'vitest';
import { generateDeterministicItinerary } from '@/lib/ai/fallback-planner';
import { PlannerFormInput } from '@/types';

describe('Deterministic Fallback Planner', () => {
  const sampleInput: PlannerFormInput = {
    origin: 'Bengaluru',
    destinationPreference: 'anywhere',
    travellerCount: 2,
    durationDays: 3,
    budget: 20000,
    travelStyle: 'balanced',
    interests: ['heritage', 'food'],
    transportMode: 'public',
    travelMonth: 'December',
    additionalPreferences: 'Authentic local cuisine',
    acknowledgedEstimates: true,
  };

  it('generates a complete valid itinerary without an external API key', () => {
    const itinerary = generateDeterministicItinerary(sampleInput);

    expect(itinerary).toBeDefined();
    expect(itinerary.id).toBeDefined();
    expect(itinerary.title).toContain('Karnataka Journey');
    expect(itinerary.generatorSource).toBe('deterministic-fallback');
    expect(itinerary.durationDays).toBe(3);
    expect(itinerary.travellerCount).toBe(2);

    // Days match duration
    expect(itinerary.days.length).toBe(3);

    // Each day has structured activities
    itinerary.days.forEach((day, idx) => {
      expect(day.dayNumber).toBe(idx + 1);
      expect(day.activities.length).toBeGreaterThanOrEqual(2);
      expect(day.practicalNotes).toBeDefined();
    });

    // Budget totals calculated programmatically
    expect(itinerary.budget.totalEstimatedCost).toBeGreaterThan(0);
    expect(itinerary.budget.userBudget).toBe(20000);
    expect(itinerary.feasibility).toBeDefined();

    // Contains required transparency disclaimer
    expect(itinerary.limitations[0]).toContain(
      'Using the built-in planner. Add your AI API key to enable Gemini-generated itineraries.'
    );
  });

  it('gracefully falls back to deterministic planner when GEMINI_API_KEY is invalid or fails', async () => {
    const { generateItinerary } = await import('@/lib/ai/gemini');
    process.env.GEMINI_API_KEY = 'invalid_dummy_key_for_testing';

    const itinerary = await generateItinerary(sampleInput);

    expect(itinerary).toBeDefined();
    expect(itinerary.generatorSource).toBe('deterministic-fallback');
    expect(itinerary.days.length).toBe(3);
    expect(itinerary.budget.totalEstimatedCost).toBeGreaterThan(0);

    delete process.env.GEMINI_API_KEY;
  });
});
