import React from 'react';
import { BudgetBreakdownType } from '@/types';
import { formatINR } from '@/lib/utils';
import { Bus, Home, Utensils, Ticket, ShieldAlert, IndianRupee } from 'lucide-react';

interface BudgetBreakdownProps {
  budget: BudgetBreakdownType;
}

export function BudgetBreakdown({ budget }: BudgetBreakdownProps) {
  const categories = [
    {
      title: 'Transport & Travel',
      amount: budget.transport,
      icon: Bus,
      basis: budget.accountingBasis.transportBasis,
    },
    {
      title: 'Accommodation',
      amount: budget.accommodation,
      icon: Home,
      basis: budget.accountingBasis.accommodationBasis,
    },
    {
      title: 'Food & Dining',
      amount: budget.food,
      icon: Utensils,
      basis: budget.accountingBasis.foodBasis,
    },
    {
      title: 'Activities & Tickets',
      amount: budget.activities,
      icon: Ticket,
      basis: budget.accountingBasis.activitiesBasis,
    },
    {
      title: 'Contingency & Buffer',
      amount: budget.miscellaneous,
      icon: ShieldAlert,
      basis: budget.accountingBasis.miscBasis,
    },
  ];

  return (
    <div className="editorial-card p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E3DED6] gap-2">
        <div>
          <h3 className="text-lg font-bold text-[#0F2A1F] flex items-center gap-2">
            <IndianRupee className="w-5 h-5 text-[#C85A32]" />
            Programmatic Trip Budget Breakdown
          </h3>
          <p className="text-xs text-[#7E8B84]">
            Transparent cost accounting with separate group vs per-person line items
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs text-[#7E8B84] block">Cost Per Traveller</span>
          <span className="text-base font-extrabold text-[#1B4332]">
            {formatINR(budget.costPerTraveller)}
          </span>
        </div>
      </div>

      {/* Grid of category cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <div
              key={idx}
              className="p-4 rounded-xl border border-[#E3DED6] bg-[#FAF7F2] flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#E3DED6] flex items-center justify-center text-[#1B4332]">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-[#0F2A1F]">{cat.title}</span>
                </div>
                <span className="text-sm font-extrabold text-[#0F2A1F]">
                  {formatINR(cat.amount)}
                </span>
              </div>
              <p className="text-[11px] text-[#4A5550] mt-3 leading-relaxed border-t border-[#E3DED6]/70 pt-2">
                {cat.basis}
              </p>
            </div>
          );
        })}

        {/* Summary Card */}
        <div className="p-4 rounded-xl border-2 border-[#1B4332] bg-[#E9F3EE]/60 flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#1B4332]">
              Total Trip Expense
            </span>
            <div className="text-2xl font-black text-[#0F2A1F] mt-1">
              {formatINR(budget.totalEstimatedCost)}
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-[#2D6A4F]/20 text-xs flex justify-between items-center text-[#2D6A4F]">
            <span>Allocated Target:</span>
            <span className="font-bold">{formatINR(budget.userBudget)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
