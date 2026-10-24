import React from 'react';
import { ItineraryActivity } from '@/types';
import { formatINR } from '@/lib/utils';
import { Sun, Sunset, Moon, Sunrise, IndianRupee } from 'lucide-react';

interface ActivityItemProps {
  activity: ItineraryActivity;
}

export function ActivityItem({ activity }: ActivityItemProps) {
  const getTimeBadge = (time: string) => {
    switch (time) {
      case 'morning':
        return {
          label: 'Morning',
          icon: Sunrise,
          badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
        };
      case 'afternoon':
        return {
          label: 'Afternoon',
          icon: Sun,
          badgeColor: 'bg-orange-100 text-orange-900 border-orange-300',
        };
      case 'evening':
        return {
          label: 'Evening',
          icon: Sunset,
          badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300',
        };
      case 'night':
      default:
        return {
          label: 'Night',
          icon: Moon,
          badgeColor: 'bg-slate-100 text-slate-900 border-slate-300',
        };
    }
  };

  const badge = getTimeBadge(activity.timeOfDay);
  const Icon = badge.icon;

  return (
    <div className="p-4 rounded-xl border border-[#E3DED6] bg-white hover:border-[#40916C]/40 transition-colors space-y-2">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${badge.badgeColor}`}
          >
            <Icon className="w-3 h-3" />
            {badge.label}
          </span>
          <span className="text-[11px] font-medium text-[#7E8B84] bg-[#FAF7F2] px-2 py-0.5 rounded capitalize">
            {activity.activityCategory}
          </span>
        </div>

        {activity.estimatedCost > 0 && (
          <div className="flex items-center gap-1 text-xs font-bold text-[#1B4332]">
            <IndianRupee className="w-3 h-3 text-[#C85A32]" />
            <span>~{formatINR(activity.estimatedCost)}</span>
          </div>
        )}
      </div>

      <h4 className="text-sm font-bold text-[#0F2A1F] tracking-tight">{activity.title}</h4>
      <p className="text-xs text-[#4A5550] leading-relaxed">{activity.description}</p>

      {activity.costBasis && (
        <p className="text-[10px] text-[#7E8B84] pt-1 border-t border-[#EFEBE4]">
          Basis: {activity.costBasis}
        </p>
      )}
    </div>
  );
}
