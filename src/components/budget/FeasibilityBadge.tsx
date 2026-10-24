import React from 'react';
import { FeasibilityAssessment } from '@/types';
import { CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';

interface FeasibilityBadgeProps {
  feasibility: FeasibilityAssessment;
}

export function FeasibilityBadge({ feasibility }: FeasibilityBadgeProps) {
  const { status, percentageUtilized, explanation, recommendations, overrunAmount } = feasibility;

  if (status === 'within-budget') {
    return (
      <div className="p-4 rounded-xl bg-[#E9F3EE] border border-[#2D6A4F]/30 text-[#0F2A1F]">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-[#2D6A4F] shrink-0" />
          <span className="font-bold text-sm">Within Allocated Budget ({percentageUtilized}%)</span>
        </div>
        <p className="text-xs text-[#2D6A4F] mt-1 leading-relaxed">{explanation}</p>
      </div>
    );
  }

  if (status === 'close-to-budget') {
    return (
      <div className="p-4 rounded-xl bg-[#FEF9EE] border border-[#F59E0B]/40 text-[#92400E]">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-[#D97706] shrink-0" />
          <span className="font-bold text-sm">Close to Estimated Budget ({percentageUtilized}%)</span>
        </div>
        <p className="text-xs text-[#B45309] mt-1 leading-relaxed">{explanation}</p>
        {recommendations.length > 0 && (
          <ul className="mt-2 space-y-1 text-xs">
            {recommendations.map((rec, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="font-bold">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <div className="p-4 rounded-xl bg-[#FDF6F2] border border-[#C85A32]/40 text-[#9C2A10]">
      <div className="flex items-center gap-2">
        <AlertCircle className="w-5 h-5 text-[#C85A32] shrink-0" />
        <span className="font-bold text-sm">
          Likely Over Budget by ₹{overrunAmount?.toLocaleString('en-IN')} ({percentageUtilized}% of budget)
        </span>
      </div>
      <p className="text-xs text-[#A84420] mt-1 leading-relaxed">{explanation}</p>
      {recommendations.length > 0 && (
        <div className="mt-3 pt-2 border-t border-[#C85A32]/20">
          <span className="text-[11px] font-bold uppercase tracking-wider block mb-1">
            Budget Optimization Advice:
          </span>
          <ul className="space-y-1 text-xs">
            {recommendations.map((rec, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-[#C85A32] font-bold">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
