import { Destination, PlannerFormInput } from '@/types';

export function buildItineraryPrompt(
  input: PlannerFormInput,
  candidateDestinations: Destination[]
): { systemInstruction: string; userPrompt: string } {
  const systemInstruction = `You are NammaTrip AI, an expert, thoughtful, and highly knowledgeable travel architect dedicated exclusively to Karnataka, India.
Your mission is to generate realistic, geographically feasible, culturally rich, and budget-conscious travel itineraries for Karnataka.

STRICT CONSTRAINTS:
1. Destination Scope: ONLY include destinations, attractions, and cultural experiences located entirely within the state of Karnataka, India.
2. Output Format: Return ONLY raw, valid JSON conforming exactly to the requested schema. Do NOT include markdown code fences (like \`\`\`json), explanations, or preamble before/after the JSON.
3. Realistic Scheduling: Provide morning, afternoon, and evening activities per day. Do not pack too many far-apart locations into a single day; respect Karnataka's travel distances and ghat road conditions.
4. Cultural Authenticity: Recommend authentic Karnataka experiences (e.g. regional breakfast spots, local crafts, temples, natural spots) with sensitivity to local culture.
5. Honesty & Factuality: Do NOT invent fake booking confirmations, live ticket prices, or guaranteed availability. Acknowledge that estimated prices and transit times are typical baselines in Indian Rupees (₹).
6. Budget Coherence: Provide balanced cost estimates in INR that align with the user's travel style (Budget, Balanced, or Comfort).`;

  const destinationsSummary = candidateDestinations
    .map(
      (d) =>
        `- ${d.name} (${d.kannadaName}) [Region: ${d.region}, Lat: ${d.coordinates.lat}, Lng: ${
          d.coordinates.lng
        }]: ${d.shortDescription} Interests: ${d.interests.join(
          ', '
        )}. Suggested Activities: ${d.suggestedActivities.slice(0, 3).join('; ')}`
    )
    .join('\n');

  const userPrompt = `Generate a personalized Karnataka travel itinerary for the following traveller request:

TRAVELLER DETAILS:
- Starting Location (Origin): ${input.origin}
- Destination Preference: ${input.destinationPreference}
- Number of Travellers: ${input.travellerCount} person(s)
- Total Trip Duration: ${input.durationDays} day(s)
- Total Trip Budget: ₹${input.budget.toLocaleString('en-IN')} INR
- Travel Style: ${input.travelStyle.toUpperCase()}
- Primary Interests: ${input.interests.join(', ')}
- Preferred Transport Mode: ${input.transportMode}
${input.travelMonth ? `- Travel Month: ${input.travelMonth}` : ''}
${input.additionalPreferences ? `- Additional Preferences: ${input.additionalPreferences}` : ''}

CURATED KARNATAKA DESTINATIONS FOR SELECTION:
${destinationsSummary}

REQUIRED JSON SCHEMA:
{
  "title": "A captivating, specific title (e.g. 3-Day Royal Heritage & Wildlife Journey from Bengaluru to Mysuru & Kabini)",
  "destinationSummary": "Concise summary of destinations visited (e.g. Mysuru and Kabini)",
  "overview": "A 2-3 paragraph compelling description of the trip flow, cultural highlights, and experiential balance.",
  "destinations": [
    {
      "id": "destination-id",
      "name": "Full Destination Name",
      "kannadaName": "Destination in Kannada script",
      "region": "Karnataka Region",
      "coordinates": { "lat": 12.3052, "lng": 76.6552 }
    }
  ],
  "days": [
    {
      "dayNumber": 1,
      "title": "Day 1: Journey & Royal Splendour of Mysuru",
      "region": "South Karnataka",
      "destinationId": "mysuru",
      "destinationName": "Mysuru (Mysore)",
      "activities": [
        {
          "timeOfDay": "morning",
          "title": "Scenic journey from origin & Check-in",
          "description": "Travel details and check-in guidance.",
          "destinationName": "Mysuru (Mysore)",
          "activityCategory": "travel",
          "estimatedCost": 350,
          "costBasis": "Per person refreshments & initial transit",
          "coordinates": { "lat": 12.3052, "lng": 76.6552 }
        },
        {
          "timeOfDay": "afternoon",
          "title": "Tour of Mysore Palace & Royal Gallery",
          "description": "Guided walking tour through the ornate Durbar Hall.",
          "destinationName": "Mysuru (Mysore)",
          "activityCategory": "heritage",
          "estimatedCost": 150,
          "costBasis": "Entry pass per adult",
          "coordinates": { "lat": 12.3052, "lng": 76.6552 }
        },
        {
          "timeOfDay": "evening",
          "title": "Devaraja Market & Mysore Pak Tasting",
          "description": "Sensory exploration of the historic flower and spice market.",
          "destinationName": "Mysuru (Mysore)",
          "activityCategory": "food",
          "estimatedCost": 200,
          "costBasis": "Tasting and local sweets per person",
          "coordinates": { "lat": 12.3052, "lng": 76.6552 }
        }
      ],
      "practicalNotes": "Practical tip for the day regarding footwear, optimal timing, or local etiquette.",
      "estimatedDailyCost": 700
    }
  ],
  "estimatedCosts": {
    "transport": 3500,
    "accommodation": 5600,
    "food": 3600,
    "activities": 1800,
    "miscellaneous": 800
  },
  "accountingBasis": {
    "transportBasis": "Basis explanation (e.g. KSRTC Airavat AC bus and local autorickshaws)",
    "accommodationBasis": "Basis explanation (e.g. 1 double room @ ₹2,800/night for 2 nights)",
    "foodBasis": "Basis explanation (e.g. ₹600/person/day for 2 people over 3 days)",
    "activitiesBasis": "Basis explanation (e.g. Monument entry tickets and guided palace tour)",
    "miscBasis": "Basis explanation (e.g. Contingency buffer for toll, hydration, and tips)"
  },
  "assumptions": [
    "List of 4-5 clear budgeting and operational assumptions."
  ],
  "travelTips": [
    "List of 4-5 actionable, high-value local tips for this specific route."
  ],
  "limitations": [
    "Transparent notes explaining that rates and road conditions are subject to real-world seasonality."
  ]
}

Return ONLY this valid JSON object without surrounding markdown.`;

  return { systemInstruction, userPrompt };
}
