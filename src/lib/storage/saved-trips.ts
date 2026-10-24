import { Itinerary } from '@/types';

const STORAGE_KEY = 'nammatrip_saved_itineraries_v1';

export function getSavedItineraries(): Itinerary[] {
  if (typeof window === 'undefined') return [];

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      // Basic validity check
      return parsed.filter((item) => item && typeof item.id === 'string' && item.title);
    }
    return [];
  } catch (err) {
    console.error('Failed to read saved itineraries from localStorage:', err);
    return [];
  }
}

export function getSavedItineraryById(id: string): Itinerary | null {
  const all = getSavedItineraries();
  return all.find((item) => item.id === id) || null;
}

export function saveItinerary(itinerary: Itinerary): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const all = getSavedItineraries();
    const existingIndex = all.findIndex((i) => i.id === itinerary.id);
    let updated: Itinerary[];

    if (existingIndex >= 0) {
      updated = [...all];
      updated[existingIndex] = itinerary;
    } else {
      updated = [itinerary, ...all];
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return true;
  } catch (err) {
    console.error('Failed to save itinerary to localStorage:', err);
    return false;
  }
}

export function deleteSavedItinerary(id: string): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const all = getSavedItineraries();
    const filtered = all.filter((i) => i.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (err) {
    console.error('Failed to delete itinerary from localStorage:', err);
    return false;
  }
}

export function isItinerarySaved(id: string): boolean {
  if (typeof window === 'undefined') return false;
  const all = getSavedItineraries();
  return all.some((item) => item.id === id);
}
