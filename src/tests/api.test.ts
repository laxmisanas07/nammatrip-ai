import { describe, it, expect } from 'vitest';
import { POST } from '@/app/api/itinerary/route';
import { NextRequest } from 'next/server';

describe('POST /api/itinerary API Route', () => {
  it('returns 200 and a complete itinerary for valid request body', async () => {
    const validBody = {
      origin: 'Bengaluru',
      destinationPreference: 'mysuru',
      travellerCount: 2,
      durationDays: 2,
      budget: 12000,
      travelStyle: 'balanced',
      interests: ['heritage'],
      transportMode: 'public',
      acknowledgedEstimates: true,
    };

    const req = new NextRequest('http://localhost:3000/api/itinerary', {
      method: 'POST',
      body: JSON.stringify(validBody),
      headers: { 'Content-Type': 'application/json' },
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.id).toBeDefined();
    expect(data.title).toBeDefined();
    expect(data.budget.totalEstimatedCost).toBeGreaterThan(0);
    expect(data.days.length).toBe(2);
  });

  it('returns 400 when required fields are missing or invalid', async () => {
    const invalidBody = {
      origin: '', // Invalid: min 2 chars
      budget: -500, // Invalid: must be positive >= 1000
      acknowledgedEstimates: false,
    };

    const req = new NextRequest('http://localhost:3000/api/itinerary', {
      method: 'POST',
      body: JSON.stringify(invalidBody),
      headers: { 'Content-Type': 'application/json' },
    });

    const res = await POST(req);
    expect(res.status).toBe(400);

    const errorData = await res.json();
    expect(errorData.error).toBe('Validation failed');
    expect(errorData.fieldErrors).toBeDefined();
    expect(errorData.fieldErrors.origin).toBeDefined();
    expect(errorData.fieldErrors.budget).toBeDefined();
  });
});
