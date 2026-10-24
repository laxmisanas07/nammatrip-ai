import React from 'react';
import { DayPlan } from '@/types';
import { ActivityItem } from './ActivityItem';
import { MapPin, Lightbulb } from 'lucide-react';

interface DayScheduleCardProps {
  day: DayPlan;
}

export function DayScheduleCard({ day }: DayScheduleCardProps) {
  return (
    <div className="editorial-card overflow-hidden">
      {/* Day header banner */}
      <div className="p-5 bg-[#FAF7F2] border-b border-[#E3DED6] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#1B4332] text-white flex items-center justify-center font-extrabold text-sm shadow-xs">
            {day.dayNumber}
          </div>
          <div>
            <h3 className="text-base font-bold text-[#0F2A1F]">{day.title}</h3>
            <div className="flex items-center gap-1.5 text-xs text-[#4A5550] mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-[#2D6A4F]" />
              <span>{day.destinationName}</span>
              <span>•</span>
              <span className="text-[#7E8B84]">{day.region}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Activities list */}
      <div className="p-5 space-y-4">
        <div className="space-y-3">
          {day.activities.map((activity, idx) => (
            <ActivityItem key={idx} activity={activity} />
          ))}
        </div>

        {/* Practical day note */}
        {day.practicalNotes && (
          <div className="p-3.5 rounded-xl bg-[#E9F3EE]/50 border border-[#2D6A4F]/20 flex items-start gap-2.5 text-xs text-[#2D6A4F]">
            <Lightbulb className="w-4 h-4 text-[#D96B43] shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong className="text-[#0F2A1F]">Day Travel Tip: </strong>
              {day.practicalNotes}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
