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
    <div className="p-1 rounded border border-zinc-900 bg-zinc-950 shadow-2xl overflow-hidden group">
      <div className="p-6 space-y-6">
        {/* Header/Decision */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-6">
          <div className="flex items-center gap-4">
            <div className={`p-4 rounded border ${config.border} ${config.bg} shadow-[0_0_20px_rgba(0,0,0,0.3)]`}>
              {config.icon}
            </div>
            <div className="space-y-1">
              <h4 className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-[0.2em]">[ DECISION_UNIT ]</h4>
              <p className={`text-xl font-bold tracking-tighter uppercase font-mono ${config.color}`}>{config.text}</p>
            </div>
          </div>
          <div className="text-right space-y-1">
            <div className="flex items-center gap-2 text-zinc-700 text-[10px] uppercase tracking-widest font-mono font-bold justify-end">
              <Timer className="h-3 w-3" />
              SCAN_TIME
            </div>
            <span className="text-lg font-bold text-zinc-300 font-mono tracking-tighter">6.00s</span>
          </div>
        </div>

        {/* First 6 Seconds */}
        <div className="p-5 rounded border border-zinc-900 bg-zinc-900/30 group-hover:border-emerald-500/10 transition-colors">
          <h5 className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-600 mb-3 flex items-center gap-2 font-mono">
            <div className="h-1 w-1 rounded-full bg-zinc-700" />
            Initial_Trace_Impression
          </h5>
          <p className="text-zinc-500 font-mono text-[11px] leading-relaxed uppercase tracking-tighter italic selection:bg-emerald-500/20">
            "{data.first_6_seconds}"
          </p>
        </div>

        {/* In-depth Analysis */}
        <div className="space-y-4">
          <h5 className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-600 flex items-center gap-2 font-mono">
             <div className="h-1 w-1 rounded-full bg-zinc-700" />
             Logic_Reasoning
          </h5>
          <p className="text-zinc-400 text-[10px] font-mono leading-relaxed uppercase tracking-tighter">
            {data.reasoning}
          </p>
        </div>

        {/* Hazards/Risks */}
        {(data.rejection_risks ?? []).length > 0 && (
          <div className="pt-6 border-t border-zinc-900">
            <h5 className="text-[9px] font-bold uppercase tracking-[0.2em] text-red-900 mb-4 flex items-center gap-2 font-mono">
              <AlertTriangle className="h-3 w-3" />
              Critical_Failure_Risks
            </h5>
            <div className="flex flex-wrap gap-2">
              {(data.rejection_risks ?? []).map((risk, idx) => (
                <div key={idx} className="px-2 py-1.5 rounded border border-red-900/10 bg-red-900/5 text-[9px] font-bold font-mono text-red-900/60 uppercase tracking-tighter">
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

