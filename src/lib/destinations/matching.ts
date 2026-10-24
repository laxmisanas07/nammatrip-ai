import { Destination, InterestCategory, TravelStyle } from '@/types';
import { KARNATAKA_DESTINATIONS, getDestinationById } from './data';

export interface MatchingCriteria {
  interests: InterestCategory[];
  durationDays: number;
  destinationPreference?: string;
  travelStyle?: TravelStyle;
}

export function calculateDistanceKm(
  coord1: { lat: number; lng: number },
  coord2: { lat: number; lng: number }
): number {
  const R = 6371; // Earth radius in km
  const dLat = ((coord2.lat - coord1.lat) * Math.PI) / 180;
  const dLng = ((coord2.lng - coord1.lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((coord1.lat * Math.PI) / 180) *
      Math.cos((coord2.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

export function matchDestinations(criteria: MatchingCriteria): Destination[] {
  const { interests, durationDays, destinationPreference = 'anywhere' } = criteria;

  // Determine how many destinations make sense for this duration
  const targetDestinationCount = durationDays <= 2 ? 1 : durationDays <= 5 ? 2 : durationDays <= 8 ? 3 : 4;

  // If a specific destination was chosen
  if (destinationPreference && destinationPreference !== 'anywhere') {
    const specific = getDestinationById(destinationPreference);
    if (specific) {
      if (targetDestinationCount === 1) {
        return [specific];
      }
      // Pick geographically close companion destinations that match interests
      const others = KARNATAKA_DESTINATIONS.filter((d) => d.id !== specific.id)
        .map((d) => {
          const dist = calculateDistanceKm(specific.coordinates, d.coordinates);
          const interestOverlap = d.interests.filter((i) => interests.includes(i)).length;
          // Score: lower distance + higher interest overlap
          const score = interestOverlap * 20 - dist * 0.05;
          return { destination: d, score, dist };
        })
        .sort((a, b) => b.score - a.score);

      const companion = others.slice(0, targetDestinationCount - 1).map((item) => item.destination);
      return [specific, ...companion];
    }
  }

  // General matching by interests and geographic clusters
  const scored = KARNATAKA_DESTINATIONS.map((dest) => {
    let score = 0;

    // Interest match
    const matchingInterests = dest.interests.filter((i) => interests.includes(i));
    score += matchingInterests.length * 30;

    // Exact regional fit if user asked for a region
    if (
      destinationPreference &&
      destinationPreference.toLowerCase().includes(dest.region.toLowerCase())
    ) {
      score += 50;
    }

    // Recommended days penalty if too mismatched for single destination
    if (targetDestinationCount === 1 && Math.abs(dest.recommendedDays - durationDays) > 1) {
      score -= 10;
    }

    return { destination: dest, score };
  });

  scored.sort((a, b) => b.score - a.score);

  const primary = scored[0]?.destination || KARNATAKA_DESTINATIONS[0];
  const selected: Destination[] = [primary];

  // Pick remaining destinations that are geographically feasible from the primary
  if (targetDestinationCount > 1) {
    const remainingCandidates = scored
      .slice(1)
      .map((item) => item.destination)
      .filter((dest) => {
        const dist = calculateDistanceKm(primary.coordinates, dest.coordinates);
        // Realistic travel constraint: maximum 320 km distance between itinerary stops
        return dist <= 320;
      });

    for (let i = 0; i < remainingCandidates.length && selected.length < targetDestinationCount; i++) {
      selected.push(remainingCandidates[i]);
    }

    // If no candidate was within distance, pick next highest scored
    if (selected.length < targetDestinationCount && scored.length > selected.length) {
      for (const item of scored) {
        if (!selected.some((s) => s.id === item.destination.id)) {
          selected.push(item.destination);
          if (selected.length >= targetDestinationCount) break;
        }
      }
    }
  }

  return selected;
}
