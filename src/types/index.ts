export type InterestCategory =
  | 'heritage'
  | 'nature'
  | 'hillstations'
  | 'wildlife'
  | 'beaches'
  | 'food'
  | 'culture'
  | 'adventure'
  | 'family';

export type TravelStyle = 'budget' | 'balanced' | 'comfort';

export type TransportMode = 'public' | 'self-drive' | 'flexible';

export type KarnatakaRegion =
  | 'South Karnataka'
  | 'Coastal Karnataka'
  | 'Central Karnataka'
  | 'North Karnataka'
  | 'Malenadu / Western Ghats';

export interface Destination {
  id: string;
  name: string;
  kannadaName: string;
  region: KarnatakaRegion;
  coordinates: {
    lat: number;
    lng: number;
  };
  shortDescription: string;
  fullDescription: string;
  interests: InterestCategory[];
  recommendedDays: number;
  suggestedActivities: string[];
  travelTips: string[];
  dailyCostRange: {
    budget: number;
    balanced: number;
    comfort: number;
  };
  bestTimeToVisit: string;
  nearestHub: string;
  imageUrl: string;
  imageAlt: string;
  tags: string[];
}

export interface PlannerFormInput {
  origin: string;
  destinationPreference: string;
  travellerCount: number;
  durationDays: number;
  budget: number;
  travelStyle: TravelStyle;
  interests: InterestCategory[];
  transportMode: TransportMode;
  travelMonth?: string;
  additionalPreferences?: string;
  acknowledgedEstimates: boolean;
}

export interface ItineraryActivity {
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
  title: string;
  description: string;
  destinationName: string;
  activityCategory: InterestCategory | string;
  estimatedCost: number;
  costBasis: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface DayPlan {
  dayNumber: number;
  title: string;
  region: string;
  destinationId: string;
  destinationName: string;
  activities: ItineraryActivity[];
  practicalNotes: string;
  estimatedDailyCost: number;
}

export interface BudgetBreakdownType {
  transport: number;
  accommodation: number;
  food: number;
  activities: number;
  miscellaneous: number;
  totalEstimatedCost: number;
  costPerTraveller: number;
  userBudget: number;
  difference: number; // positive = surplus, negative = deficit
  accountingBasis: {
    transportBasis: string;
    accommodationBasis: string;
    foodBasis: string;
    activitiesBasis: string;
    miscBasis: string;
  };
}

export interface FeasibilityAssessment {
  status: 'within-budget' | 'close-to-budget' | 'over-budget';
  percentageUtilized: number;
  explanation: string;
  overrunAmount?: number;
  recommendations: string[];
}

export interface Itinerary {
  id: string;
  title: string;
  origin: string;
  destinationSummary: string;
  durationDays: number;
  travellerCount: number;
  interests: InterestCategory[];
  travelStyle: TravelStyle;
  transportMode: TransportMode;
  travelMonth?: string;
  generatedAt: string;
  generatorSource: 'gemini' | 'deterministic-fallback';
  overview: string;
  destinations: {
    id: string;
    name: string;
    kannadaName?: string;
    region: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    imageUrl?: string;
  }[];
  days: DayPlan[];
  budget: BudgetBreakdownType;
  feasibility: FeasibilityAssessment;
  assumptions: string[];
  travelTips: string[];
  limitations: string[];
}
