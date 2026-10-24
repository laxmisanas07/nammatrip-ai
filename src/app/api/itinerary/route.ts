import { NextRequest, NextResponse } from 'next/server';
import { plannerInputSchema } from '@/lib/validation/itinerary-schema';
import { generateItinerary } from '@/lib/ai/gemini';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parseResult = plannerInputSchema.safeParse(body);
    if (!parseResult.success) {
      const fieldErrors = parseResult.error.flatten().fieldErrors;
      return NextResponse.json(
        {
          error: 'Validation failed',
          message: 'Please check the provided travel parameters.',
          fieldErrors,
        },
        { status: 400 }
      );
    }

    const itinerary = await generateItinerary(parseResult.data);
    return NextResponse.json(itinerary, { status: 200 });
  } catch (err) {
    console.error('API Error in /api/itinerary:', err);
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: 'An unexpected error occurred while generating your itinerary. Please try again.',
      },
      { status: 500 }
    );
  }
}
