import {
  DayPlan,
  Itinerary,
  ItineraryActivity,
  PlannerFormInput,
} from '@/types';
import { matchDestinations } from '../destinations/matching';
import { calculateTripBudget } from '../budget/calculations';

export function generateDeterministicItinerary(input: PlannerFormInput): Itinerary {
  const {
    origin,
    destinationPreference,
    travellerCount,
    durationDays,
    budget: userBudget,
    travelStyle,
    interests,
    transportMode,
    travelMonth,
    additionalPreferences,
  } = input;

  // 1. Match destinations
  const matchedDestinations = matchDestinations({
    interests,
    durationDays,
    destinationPreference,
    travelStyle,
  });

  // 2. Allocate days across matched destinations
  const days: DayPlan[] = [];
  const destinationsCount = matchedDestinations.length;
  const daysPerDestination = Math.floor(durationDays / destinationsCount);
  let extraDays = durationDays % destinationsCount;

  let currentDayNumber = 1;

  matchedDestinations.forEach((dest) => {
    let daysForThisDest = daysPerDestination;
    if (extraDays > 0) {
      daysForThisDest += 1;
      extraDays -= 1;
    }
    if (daysForThisDest < 1) daysForThisDest = 1;

    for (let d = 0; d < daysForThisDest && currentDayNumber <= durationDays; d++) {
      const isFirstDay = currentDayNumber === 1;
      const isLastDay = currentDayNumber === durationDays;

      const activities: ItineraryActivity[] = [];

      // Morning Activity
      if (isFirstDay) {
        activities.push({
          timeOfDay: 'morning',
          title: `Depart from ${origin} & Journey to ${dest.name}`,
          description: `Travel from ${origin} to ${dest.name} via ${
            transportMode === 'public'
              ? 'KSRTC Express / train'
              : transportMode === 'self-drive'
              ? 'scenic highway drive'
              : 'comfortable intercity transport'
          }. Check into your accommodation, refresh, and get oriented with local surroundings.`,
          destinationName: dest.name,
          activityCategory: 'travel',
          estimatedCost: travelStyle === 'budget' ? 200 : travelStyle === 'balanced' ? 400 : 800,
          costBasis: 'Transit refreshment and porter/entry passes',
          coordinates: dest.coordinates,
        });
      } else {
        const morningAct = dest.suggestedActivities[0] || `Morning discovery of ${dest.name}`;
        activities.push({
          timeOfDay: 'morning',
          title: morningAct,
          description: `Experience the early morning beauty and pleasant climate. Perfect time for photography and avoiding afternoon crowds.`,
          destinationName: dest.name,
          activityCategory: dest.interests[0] || 'culture',
          estimatedCost: travelStyle === 'budget' ? 100 : travelStyle === 'balanced' ? 250 : 600,
          costBasis: 'Monument entry fee & camera permit per person',
          coordinates: dest.coordinates,
        });
      }

      // Afternoon Activity
      const afternoonAct =
        dest.suggestedActivities[1 + (d % Math.max(1, dest.suggestedActivities.length - 2))] ||
        `Heritage and cultural walk in ${dest.name}`;
      activities.push({
        timeOfDay: 'afternoon',
        title: afternoonAct,
        description: `Indulge in an authentic regional lunch (tasting local Karnataka specialties) followed by an immersive exploration of the heritage site, museum, or plantation.`,
        destinationName: dest.name,
        activityCategory: dest.interests[1] || 'food',
        estimatedCost: travelStyle === 'budget' ? 150 : travelStyle === 'balanced' ? 350 : 800,
        costBasis: 'Special entry tickets and guided commentary',
        coordinates: dest.coordinates,
      });

      // Evening Activity
      const eveningAct =
        dest.suggestedActivities[dest.suggestedActivities.length - 1] ||
        `Sunset view and vibrant local bazaar walk in ${dest.name}`;
      activities.push({
        timeOfDay: 'evening',
        title: isLastDay
          ? `Souvenir shopping & return journey towards ${origin}`
          : eveningAct,
        description: isLastDay
          ? `Pick up local handicrafts, spices, and traditional sweets before commencing the return journey to ${origin}.`
          : `Enjoy panoramic sunset vistas followed by a relaxed stroll through the bustling evening market. Sample local evening snacks and filter coffee.`,
        destinationName: dest.name,
        activityCategory: 'culture',
        estimatedCost: travelStyle === 'budget' ? 100 : travelStyle === 'balanced' ? 200 : 500,
        costBasis: 'Local snacks, artisan souvenirs & viewpoint ticket',
        coordinates: dest.coordinates,
      });

      const dailyActivitiesSum = activities.reduce((sum, a) => sum + a.estimatedCost, 0);

      days.push({
        dayNumber: currentDayNumber,
        title: `Day ${currentDayNumber}: Exploring ${dest.name}`,
        region: dest.region,
        destinationId: dest.id,
        destinationName: dest.name,
        activities,
        practicalNotes: dest.travelTips[d % dest.travelTips.length] || `Carry comfortable footwear, hydration, and sun protection.`,
        estimatedDailyCost: dailyActivitiesSum,
      });

      currentDayNumber++;
    }
  });

  // Calculate activities sum for the entire group
  const totalActivityTicketsPerPerson = days.reduce(
    (total, day) => total + day.activities.reduce((s, a) => s + a.estimatedCost, 0),
    0
  );
  const totalActivityGroupCost = totalActivityTicketsPerPerson * travellerCount;

  // 3. Programmatic budget calculations
  const { budget, feasibility } = calculateTripBudget({
    durationDays,
    travellerCount,
    userBudget,
    travelStyle,
    transportMode,
    activityCostSum: totalActivityGroupCost,
  });

  const destNames = matchedDestinations.map((d) => d.name).join(' and ');
  const title = `${durationDays}-Day Karnataka Journey: ${destNames}`;

  const itinerary: Itinerary = {
    id: `trip-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    title,
    origin,
    destinationSummary: destNames,
    durationDays,
    travellerCount,
    interests,
    travelStyle,
    transportMode,
    travelMonth,
    generatedAt: new Date().toISOString(),
    generatorSource: 'deterministic-fallback',
    overview: `This ${durationDays}-day curated travel plan connects ${origin} with Karnataka's iconic highlights in ${destNames}. Designed specifically for ${travellerCount} traveller(s) following a ${travelStyle} travel style with a focus on ${interests.join(
      ', '
    )}.${additionalPreferences ? ` Accommodating your request: "${additionalPreferences}".` : ''} Every day is balanced to avoid excessive travel fatigue while offering deep cultural immersion.`,
    destinations: matchedDestinations.map((d) => ({
      id: d.id,
      name: d.name,
      kannadaName: d.kannadaName,
      region: d.region,
      coordinates: d.coordinates,
      imageUrl: d.imageUrl,
    })),
    days,
    budget,
    feasibility,
    assumptions: [
      `Double occupancy hotel rooms calculated as ${Math.ceil(travellerCount / 2)} room(s) for ${
        durationDays > 1 ? durationDays - 1 : 0
      } night(s).`,
      `Food budget covers 3 hearty meals and daily filter coffee/refreshments.`,
      `Transport estimates assume ${
        transportMode === 'public'
          ? 'KSRTC Rajahamsa/Airavat buses or Indian Railways coaches with local autos'
          : transportMode === 'self-drive'
          ? 'hired or private vehicle with fuel, parking and toll coverage'
          : 'a pragmatic combination of trains, intercity buses and local hired cabs'
      }.`,
      `Activity charges include typical Archaeological Survey of India (ASI) tickets, wildlife safari permits where applicable, and camera permits.`,
      `Prices are estimates calculated in Indian Rupees (₹) and subject to seasonal fluctuation.`,
    ],
    travelTips: [
      `Book train tickets (KSR Bengaluru - Mysuru, or Hosapete/Hampi Express) at least 2 weeks in advance during festive periods.`,
      `Carry cash for remote temple towns, entry ticket counters, and local street delicacies where UPI network can occasionally be weak.`,
      `Respect cultural etiquette at sacred sites: remove shoes before entering temple complexes and dress conservatively.`,
      `Hydrate frequently with tender coconut water (elaneer), easily available along Karnataka state highways.`,
    ],
    limitations: [
      `Using the built-in planner. Add your AI API key to enable Gemini-generated itineraries.`,
      `Cost estimates are illustrative baselines derived from verified local Karnataka tourism averages; real-time dynamic airfares and seasonal surge prices are not tracked.`,
      `Opening hours and monument entry schedules must be reconfirmed locally prior to visit.`,
    ],
  };

  return itinerary;
}
