import { describe, it, expect } from 'vitest';
import { matchDestinations, calculateDistanceKm } from '@/lib/destinations/matching';

describe('Destination Matching Logic', () => {
  it('prioritizes specific destination when explicitly requested', () => {
    const matched = matchDestinations({
      interests: ['nature'],
      durationDays: 2,
      destinationPreference: 'gokarna',
    });

    expect(matched[0].id).toBe('gokarna');
  });

  it('matches heritage destinations when user selects heritage interest', () => {
    const matched = matchDestinations({
      interests: ['heritage'],
      durationDays: 3,
      destinationPreference: 'anywhere',
    });

    expect(matched.length).toBeGreaterThanOrEqual(1);
    const heritageDest = matched.some(
      (d) => d.id === 'mysuru' || d.id === 'hampi' || d.id === 'badami'
    );
    expect(heritageDest).toBe(true);
  });

  it('limits destination count based on trip duration to prevent travel fatigue', () => {
    const shortTrip = matchDestinations({
      interests: ['nature', 'hillstations'],
      durationDays: 2,
    });
    expect(shortTrip.length).toBe(1);

    const longTrip = matchDestinations({
      interests: ['nature', 'hillstations', 'heritage'],
      durationDays: 7,
    });
    expect(longTrip.length).toBeGreaterThanOrEqual(2);
    expect(longTrip.length).toBeLessThanOrEqual(4);
  });

  it('accurately calculates Haversine distance between coordinates', () => {
    // Bengaluru (12.9716, 77.5946) to Mysuru (12.3052, 76.6552) is ~125-145 km straight line
    const dist = calculateDistanceKm(
      { lat: 12.9716, lng: 77.5946 },
      { lat: 12.3052, lng: 76.6552 }
    );
    expect(dist).toBeGreaterThan(115);
    expect(dist).toBeLessThan(150);
  });
});
