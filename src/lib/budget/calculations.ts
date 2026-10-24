import {
  BudgetBreakdownType,
  FeasibilityAssessment,
  TransportMode,
  TravelStyle,
} from '@/types';

export interface BudgetCalculationParams {
  durationDays: number;
  travellerCount: number;
  userBudget: number;
  travelStyle: TravelStyle;
  transportMode: TransportMode;
  activityCostSum?: number; // if provided from actual itinerary activities
}

export function calculateTripBudget(params: BudgetCalculationParams): {
  budget: BudgetBreakdownType;
  feasibility: FeasibilityAssessment;
} {
  const {
    durationDays,
    travellerCount,
    userBudget,
    travelStyle,
    transportMode,
    activityCostSum,
  } = params;

  // Multi-day trips require hotel nights (D - 1 nights, minimum 1 if day trip with stay, or 0 nights for 1-day day-trip)
  const hotelNights = durationDays <= 1 ? 0 : durationDays - 1;
  const roomCount = Math.ceil(travellerCount / 2); // 2 persons per room standard double occupancy

  // 1. Accommodation calculation
  let roomRatePerNight = 1400; // budget
  let hotelTierDesc = 'clean budget lodges / basic homestays';
  if (travelStyle === 'balanced') {
    roomRatePerNight = 2800;
    hotelTierDesc = '3-star hotels / reputable plantation homestays';
  } else if (travelStyle === 'comfort') {
    roomRatePerNight = 6000;
    hotelTierDesc = 'premium 4/5-star resorts / luxury heritage estates';
  }
  const accommodationTotal = hotelNights * roomCount * roomRatePerNight;
  const accommodationBasis =
    hotelNights > 0
      ? `${roomCount} room(s) @ ₹${roomRatePerNight.toLocaleString('en-IN')}/night for ${hotelNights} night(s) (${hotelTierDesc})`
      : 'Day trip — zero overnight accommodation required';

  // 2. Food & Dining calculation (per person per day)
  let foodPerPersonPerDay = 450;
  let foodDesc = 'authentic local darshinis, tiffin rooms & mess meals';
  if (travelStyle === 'balanced') {
    foodPerPersonPerDay = 900;
    foodDesc = 'curated family restaurants, traditional thalis & cafes';
  } else if (travelStyle === 'comfort') {
    foodPerPersonPerDay = 1800;
    foodDesc = 'multi-cuisine specialty dining & boutique resort cafes';
  }
  const foodTotal = foodPerPersonPerDay * travellerCount * durationDays;
  const foodBasis = `₹${foodPerPersonPerDay.toLocaleString('en-IN')}/person/day across ${durationDays} day(s) for ${travellerCount} traveller(s) (${foodDesc})`;

  // 3. Transport calculation
  let transportTotal = 0;
  let transportBasis = '';

  if (transportMode === 'public') {
    let perPersonDailyTransport = 400;
    if (travelStyle === 'balanced') perPersonDailyTransport = 750;
    if (travelStyle === 'comfort') perPersonDailyTransport = 1300;
    transportTotal = perPersonDailyTransport * travellerCount * durationDays;
    transportBasis = `Public & regional transport (KSRTC buses / Indian Railways / local autos) @ ~₹${perPersonDailyTransport}/person/day`;
  } else if (transportMode === 'self-drive') {
    const vehicleCount = Math.ceil(travellerCount / 4);
    let dailyVehicleCost = 2200; // rental + fuel estimate
    if (travelStyle === 'balanced') dailyVehicleCost = 3500;
    if (travelStyle === 'comfort') dailyVehicleCost = 5500;
    transportTotal = dailyVehicleCost * vehicleCount * durationDays;
    transportBasis = `${vehicleCount} vehicle(s) (fuel, toll & self-drive/rental estimate) @ ₹${dailyVehicleCost.toLocaleString('en-IN')}/day for ${durationDays} days`;
  } else {
    // flexible: mix of train/bus + local private cab
    let perPersonDaily = 550;
    if (travelStyle === 'balanced') perPersonDaily = 950;
    if (travelStyle === 'comfort') perPersonDaily = 1800;
    transportTotal = perPersonDaily * travellerCount * durationDays;
    transportBasis = `Flexible transport (train/intercity bus + local taxis/autos) @ ~₹${perPersonDaily}/person/day`;
  }

  // 4. Activities & Entry tickets
  let activitiesTotal = 0;
  let activitiesBasis = '';
  if (activityCostSum !== undefined && activityCostSum > 0) {
    activitiesTotal = activityCostSum;
    activitiesBasis = `Sum of verified itinerary entrance tickets, ASI heritage passes & activity fees`;
  } else {
    let dailyActivitiesPerPerson = 250;
    if (travelStyle === 'balanced') dailyActivitiesPerPerson = 500;
    if (travelStyle === 'comfort') dailyActivitiesPerPerson = 1200;
    activitiesTotal = dailyActivitiesPerPerson * travellerCount * durationDays;
    activitiesBasis = `Monuments, temple entry, nature park tickets & guided tours @ ~₹${dailyActivitiesPerPerson}/person/day`;
  }

  // 5. Miscellaneous buffer (hydration, local tips, tolls, emergency cushion ~ 6% of subtotal)
  const subtotal = accommodationTotal + foodTotal + transportTotal + activitiesTotal;
  const miscellaneousTotal = Math.round(subtotal * 0.06);
  const miscBasis = `6% contingency buffer for highway tolls, bottled water, parking, and incidental expenses`;

  // Total
  const totalEstimatedCost = Math.round(subtotal + miscellaneousTotal);
  const costPerTraveller = Math.round(totalEstimatedCost / travellerCount);
  const difference = userBudget - totalEstimatedCost;

  // Feasibility assessment
  // Score: percentage of budget utilized
  const percentageUtilized = Math.round((totalEstimatedCost / userBudget) * 100);

  let status: 'within-budget' | 'close-to-budget' | 'over-budget' = 'within-budget';
  let explanation = '';
  const recommendations: string[] = [];

  if (percentageUtilized <= 100) {
    status = 'within-budget';
    explanation = `Comfortably within your ₹${userBudget.toLocaleString('en-IN')} budget with an estimated ₹${difference.toLocaleString('en-IN')} contingency surplus remaining.`;
  } else if (percentageUtilized <= 112) {
    status = 'close-to-budget';
    explanation = `Close match to your ₹${userBudget.toLocaleString('en-IN')} budget with a modest ${percentageUtilized - 100}% variance.`;
    recommendations.push('Keep an eye on premium dining and optional guided activities to stay strictly under budget.');
  } else {
    status = 'over-budget';
    const overrun = Math.abs(difference);
    explanation = `Estimated cost of ₹${totalEstimatedCost.toLocaleString('en-IN')} exceeds your ₹${userBudget.toLocaleString('en-IN')} budget by ₹${overrun.toLocaleString('en-IN')} (${percentageUtilized}% of allocated budget).`;
    recommendations.push(
      'Switch travel style to "Budget" to save up to 40% on accommodation and dining.',
      'Opt for KSRTC Rajahamsa / Karnataka Sarige public buses or Indian Railways instead of private cabs.',
      'Consider reducing trip duration by 1 day or choosing closer regional destinations to minimize intercity fuel and travel costs.'
    );
  }

  const budgetBreakdown: BudgetBreakdownType = {
    transport: transportTotal,
    accommodation: accommodationTotal,
    food: foodTotal,
    activities: activitiesTotal,
    miscellaneous: miscellaneousTotal,
    totalEstimatedCost,
    costPerTraveller,
    userBudget,
    difference,
    accountingBasis: {
      transportBasis,
      accommodationBasis,
      foodBasis,
      activitiesBasis,
      miscBasis,
    },
  };

  const feasibility: FeasibilityAssessment = {
    status,
    percentageUtilized,
    explanation,
    overrunAmount: difference < 0 ? Math.abs(difference) : undefined,
    recommendations,
  };

  return {
    budget: budgetBreakdown,
    feasibility,
  };
}
