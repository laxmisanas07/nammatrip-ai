import { GoogleGenAI } from '@google/genai';
import { Itinerary, PlannerFormInput } from '@/types';
import { matchDestinations } from '../destinations/matching';
import { buildItineraryPrompt } from './prompts';
import { aiItineraryOutputSchema } from '../validation/itinerary-schema';
import { calculateTripBudget } from '../budget/calculations';
import { generateDeterministicItinerary } from './fallback-planner';

export async function generateItinerary(input: PlannerFormInput): Promise<Itinerary> {
  const apiKey = process.env.GEMINI_API_KEY?.trim();

  // If no API key configured, use deterministic planner immediately
  if (!apiKey) {
    return generateDeterministicItinerary(input);
  }

  try {
    const candidateDestinations = matchDestinations({
      interests: input.interests,
      durationDays: input.durationDays,
      destinationPreference: input.destinationPreference,
      travelStyle: input.travelStyle,
    });

    const { systemInstruction, userPrompt } = buildItineraryPrompt(
      input,
      candidateDestinations
    );

    const modelName = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
    const ai = new GoogleGenAI({ apiKey });

    // Request with 25-second timeout guard
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Gemini API request timed out after 25s')), 25000)
    );

    const generatePromise = ai.models.generateContent({
      model: modelName,
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        temperature: 0.2, // Low temperature for high precision and schema compliance
      },
    });

    const response = await Promise.race([generatePromise, timeoutPromise]);
    const rawText = response.text || '';

    if (!rawText.trim()) {
      throw new Error('Empty response received from Gemini model');
    }

    // Clean any accidental markdown code fences
    let cleanedJson = rawText.trim();
    if (cleanedJson.startsWith('```json')) {
      cleanedJson = cleanedJson.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (cleanedJson.startsWith('```')) {
      cleanedJson = cleanedJson.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    const parsedJson = JSON.parse(cleanedJson);
    const validatedOutput = aiItineraryOutputSchema.parse(parsedJson);

    // Sum activity costs from the AI response
    let activityCostSum = 0;
    validatedOutput.days.forEach((day) => {
      day.activities.forEach((act) => {
        activityCostSum += (act.estimatedCost || 0) * input.travellerCount;
      });
    });

    // Programmatically normalize budget calculations
    const { budget, feasibility } = calculateTripBudget({
      durationDays: input.durationDays,
      travellerCount: input.travellerCount,
      userBudget: input.budget,
      travelStyle: input.travelStyle,
      transportMode: input.transportMode,
      activityCostSum: activityCostSum > 0 ? activityCostSum : undefined,
    });

    const itinerary: Itinerary = {
      id: `trip-ai-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      title: validatedOutput.title,
      origin: input.origin,
      destinationSummary: validatedOutput.destinationSummary,
      durationDays: input.durationDays,
      travellerCount: input.travellerCount,
      interests: input.interests,
      travelStyle: input.travelStyle,
      transportMode: input.transportMode,
      travelMonth: input.travelMonth,
      generatedAt: new Date().toISOString(),
      generatorSource: 'gemini',
      overview: validatedOutput.overview,
      destinations: validatedOutput.destinations.map((d) => {
        const matched = candidateDestinations.find((c) => c.id === d.id);
        return {
          id: d.id,
          name: d.name,
          kannadaName: d.kannadaName || matched?.kannadaName,
          region: d.region || matched?.region || 'Karnataka',
          coordinates: d.coordinates || matched?.coordinates || { lat: 12.9716, lng: 77.5946 },
          imageUrl: matched?.imageUrl,
        };
      }),
      days: validatedOutput.days,
      budget,
      feasibility,
      assumptions: validatedOutput.assumptions,
      travelTips: validatedOutput.travelTips,
      limitations: [
        'Generated with Google Gemini AI and cross-audited against NammaTrip budget engine and Karnataka destination catalogue.',
        ...validatedOutput.limitations,
      ],
    };

    return itinerary;
  } catch (error) {
    console.error('Gemini itinerary generation encountered an issue; falling back to deterministic planner:', error instanceof Error ? error.message : error);
    // Graceful fallback to verified deterministic planner
    const fallback = generateDeterministicItinerary(input);
    return fallback;
  }
}
