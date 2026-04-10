import React from 'react';
import { AlertTriangle, CheckCircle, Info, ThumbsDown, ThumbsUp, Timer } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { RefinedResumeResponse } from '@/services/resume.service';

interface RecruiterSimulationCardProps {
  data: RefinedResumeResponse['recruiter_simulation'];
}

export function RecruiterSimulationCard({ data }: RecruiterSimulationCardProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'YES':
        return { 
          icon: <ThumbsUp className="h-6 w-6 text-emerald-500" />, 
          bg: 'bg-emerald-500/10', 
          border: 'border-emerald-500/20', 
          text: 'Shortlisted', 
          color: 'text-emerald-500' 
        };
      case 'MAYBE':
        return { 
          icon: <Info className="h-6 w-6 text-zinc-400" />, 
          bg: 'bg-zinc-500/10', 
          border: 'border-zinc-500/20', 
          text: 'Potential Fit', 
          color: 'text-zinc-400' 
        };
      default:
        return { 
          icon: <ThumbsDown className="h-6 w-6 text-red-500" />, 
          bg: 'bg-red-500/10', 
          border: 'border-red-500/20', 
          text: 'High Risk', 
          color: 'text-red-500' 
        };
    }
  };

  const config = getStatusConfig(data.shortlist);

  return (
    <div className="p-1 rounded-3xl bg-gradient-to-br from-zinc-800 to-zinc-900 shadow-xl overflow-hidden border border-zinc-800">
      <div className="p-8 space-y-8">
        {/* Header/Decision */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-4 rounded-2xl ${config.bg} border ${config.border}`}>
              {config.icon}
            </div>
            <div>
              <h4 className="text-xl font-bold text-zinc-100">Recruiter Decision</h4>
              <p className={`text-sm font-bold uppercase tracking-widest ${config.color}`}>{config.text}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 text-zinc-500 text-xs uppercase tracking-widest font-bold mb-1">
              <Timer className="h-3 w-3" />
              Scan Time
            </div>
            <span className="text-xl font-bold text-zinc-100">6 Seconds</span>
          </div>
        </div>

        {/* First 6 Seconds */}
        <div className="p-6 rounded-2xl bg-zinc-950/50 border border-zinc-800">
          <h5 className="text-xs uppercase tracking-widest font-bold text-zinc-500 mb-3 flex items-center gap-2">
            First 6-Second Impression
          </h5>
          <p className="text-zinc-300 italic text-sm leading-relaxed">
            "{data.first_6_seconds}"
          </p>
        </div>

        {/* In-depth Analysis */}
        <div className="space-y-4">
          <h5 className="text-xs uppercase tracking-widest font-bold text-zinc-500 flex items-center gap-2">
            Detailed Reasoning
          </h5>
          <p className="text-zinc-400 text-sm leading-relaxed">
            {data.reasoning}
          </p>
        </div>

        {/* Hazards/Risks */}
        {data.rejection_risks.length > 0 && (
          <div className="pt-6 border-t border-zinc-800/50">
            <h5 className="text-xs uppercase tracking-widest font-bold text-red-500/80 mb-4 flex items-center gap-2">
              <AlertTriangle className="h-3 w-3" />
              Rejection Risks
            </h5>
            <div className="flex flex-wrap gap-2">
              {data.rejection_risks.map((risk, idx) => (
                <div key={idx} className="px-3 py-1.5 rounded-lg bg-red-500/5 border border-red-500/10 text-[11px] font-medium text-red-400">
                  {risk}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
