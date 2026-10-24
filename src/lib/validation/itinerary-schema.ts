import { z } from 'zod';

export const interestCategoriesSchema = z.enum([
  'heritage',
  'nature',
  'hillstations',
  'wildlife',
  'beaches',
  'food',
  'culture',
  'adventure',
  'family',
]);

export const travelStyleSchema = z.enum(['budget', 'balanced', 'comfort']);
export const transportModeSchema = z.enum(['public', 'self-drive', 'flexible']);

export const plannerInputSchema = z.object({
  origin: z
    .string()
    .min(2, { message: 'Starting location must be at least 2 characters.' })
    .max(100, { message: 'Starting location must be under 100 characters.' }),
  destinationPreference: z.string().default('anywhere'),
  travellerCount: z
    .number({ message: 'Travellers must be a valid number.' })
    .int('Travellers must be a whole number.')
    .min(1, 'At least 1 traveller is required.')
    .max(20, 'Maximum 20 travellers supported for custom planning.'),
  durationDays: z
    .number({ message: 'Duration must be a valid number.' })
    .int('Duration must be whole days.')
    .min(1, 'Trip duration must be at least 1 day.')
    .max(10, 'Trip duration is limited to 10 days.'),
  budget: z
    .number({ message: 'Budget must be a valid number.' })
    .min(1000, 'Minimum realistic trip budget is ₹1,000.')
    .max(2000000, 'Maximum trip budget supported is ₹20,00,000.'),
  travelStyle: travelStyleSchema.default('balanced'),
  interests: z
    .array(interestCategoriesSchema)
    .min(1, { message: 'Select at least one interest to personalize your itinerary.' }),
  transportMode: transportModeSchema.default('flexible'),
  travelMonth: z.string().optional(),
  additionalPreferences: z.string().max(500).optional(),
  acknowledgedEstimates: z.boolean().refine((val) => val === true, {
    message: 'Please acknowledge that generated costs and times are estimates.',
  }),
});

export type ValidatedPlannerInput = z.infer<typeof plannerInputSchema>;

export const activitySchema = z.object({
  timeOfDay: z.enum(['morning', 'afternoon', 'evening', 'night']),
  title: z.string().min(2),
  description: z.string().min(5),
  destinationName: z.string().min(2),
  activityCategory: z.string().default('culture'),
  estimatedCost: z.number().nonnegative(),
  costBasis: z.string().min(2),
  coordinates: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .optional(),
});

export const dayPlanSchema = z.object({
  dayNumber: z.number().int().positive(),
  title: z.string().min(2),
  region: z.string().min(2),
  destinationId: z.string(),
  destinationName: z.string().min(2),
  activities: z.array(activitySchema).min(1),
  practicalNotes: z.string().min(5),
  estimatedDailyCost: z.number().nonnegative(),
});

export const aiItineraryOutputSchema = z.object({
  title: z.string().min(3),
  destinationSummary: z.string().min(3),
  overview: z.string().min(20),
  destinations: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      kannadaName: z.string().optional(),
      region: z.string(),
      coordinates: z.object({
        lat: z.number(),
        lng: z.number(),
      }),
    })
  ).min(1),
  days: z.array(dayPlanSchema).min(1),
  estimatedCosts: z.object({
    transport: z.number().nonnegative(),
    accommodation: z.number().nonnegative(),
    food: z.number().nonnegative(),
    activities: z.number().nonnegative(),
    miscellaneous: z.number().nonnegative(),
  }),
  accountingBasis: z.object({
    transportBasis: z.string(),
    accommodationBasis: z.string(),
    foodBasis: z.string(),
    activitiesBasis: z.string(),
    miscBasis: z.string(),
  }),
  assumptions: z.array(z.string()).min(1),
  travelTips: z.array(z.string()).min(1),
  limitations: z.array(z.string()).min(1),
});

export type AIItineraryOutput = z.infer<typeof aiItineraryOutputSchema>;
