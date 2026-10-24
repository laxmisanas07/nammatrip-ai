import { describe, it, expect } from 'vitest';
import { calculateTripBudget } from '@/lib/budget/calculations';

describe('Budget Engine Calculations', () => {
  it('correctly calculates budget for a 3-day balanced trip for 2 travellers', () => {
    const result = calculateTripBudget({
      durationDays: 3,
      travellerCount: 2,
      userBudget: 20000,
      travelStyle: 'balanced',
      transportMode: 'public',
    });

    const { budget, feasibility } = result;

    // 3 days = 2 hotel nights, 2 travellers = 1 room
    // balanced room rate = 2800 * 2 nights * 1 room = 5600
    expect(budget.accommodation).toBe(5600);

    // food: 900 * 2 travellers * 3 days = 5400
    expect(budget.food).toBe(5400);

    // public transport: 750 * 2 * 3 = 4500
    expect(budget.transport).toBe(4500);

    // activities: 500 * 2 * 3 = 3000
    expect(budget.activities).toBe(3000);

    // subtotal = 5600 + 5400 + 4500 + 3000 = 18500
    // misc buffer = round(18500 * 0.06) = 1110
    // total = 19610
    expect(budget.totalEstimatedCost).toBe(19610);
    expect(budget.costPerTraveller).toBe(Math.round(19610 / 2));
    expect(budget.difference).toBe(20000 - 19610);

    expect(feasibility.status).toBe('within-budget');
    expect(feasibility.overrunAmount).toBeUndefined();
  });

  it('correctly flags an over-budget trip when user budget is insufficient', () => {
    const result = calculateTripBudget({
      durationDays: 5,
      travellerCount: 4,
      userBudget: 15000, // Very low budget for 4 people across 5 days
      travelStyle: 'comfort',
      transportMode: 'self-drive',
    });

    const { budget, feasibility } = result;

    expect(budget.totalEstimatedCost).toBeGreaterThan(15000);
    expect(budget.difference).toBeLessThan(0);
    expect(feasibility.status).toBe('over-budget');
    expect(feasibility.overrunAmount).toBeDefined();
    expect(feasibility.recommendations.length).toBeGreaterThan(0);
  });

  it('handles a 1-day trip with 0 hotel nights', () => {
    const result = calculateTripBudget({
      durationDays: 1,
      travellerCount: 2,
      userBudget: 5000,
      travelStyle: 'budget',
      transportMode: 'public',
    });

    expect(result.budget.accommodation).toBe(0);
    expect(result.budget.totalEstimatedCost).toBeLessThan(5000);
    expect(result.feasibility.status).toBe('within-budget');
  });
});
