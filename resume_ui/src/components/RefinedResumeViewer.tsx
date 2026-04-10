import React from 'react';
import { CheckCircle2, AlertCircle, ChevronRight, Briefcase, GraduationCap, Code, Rocket } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { RefinedResumeResponse } from '@/services/resume.service';

interface RefinedResumeViewerProps {
  data: RefinedResumeResponse;
}

export function RefinedResumeViewer({ data }: RefinedResumeViewerProps) {
  const { refined_sections } = data;

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Summary Section */}
      <section className="relative group">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded border border-emerald-500/20 bg-emerald-500/5 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
            <Rocket className="h-5 w-5 text-emerald-500" />
          </div>
          <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-zinc-400">[ EXECUTIVE_SUMMARY ]</h3>
        </div>
        <div className="p-8 rounded border border-zinc-900 bg-zinc-950 hover:border-emerald-500/20 transition-colors duration-500">
          <p className="text-zinc-500 font-mono text-sm leading-relaxed italic uppercase tracking-tighter">
            "{refined_sections.summary}"
          </p>
        </div>
      </section>

      {/* Experience Section */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded border border-emerald-500/20 bg-emerald-500/5 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
            <Briefcase className="h-5 w-5 text-emerald-500" />
          </div>
          <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-zinc-400">[ OPTIMIZED_CHRONOLOGY ]</h3>
        </div>
        <div className="space-y-10">
          {refined_sections.experience.map((exp, idx) => (
            <div key={idx} className="relative pl-8 border-l border-zinc-900 group">
              <div className="absolute left-[-2.5px] top-0 h-[6px] w-[6px] bg-zinc-800 group-hover:bg-emerald-500 transition-colors" />
              <div className="mb-6">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
                  <h4 className="text-lg font-bold text-zinc-100 uppercase tracking-tighter font-mono">{exp.role}</h4>
                  <Badge variant="outline" className="text-zinc-600 border-zinc-900 font-mono text-[9px] uppercase tracking-widest bg-zinc-950">{exp.duration}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-[1px] w-4 bg-emerald-500/50" />
                  <p className="text-[10px] text-zinc-600 font-bold font-mono uppercase tracking-widest">{exp.company}</p>
                </div>
              </div>
              <div className="space-y-4">
                {exp.bullets_refined.map((bullet, bIdx) => (
                  <div key={bIdx} className="flex gap-4 text-[11px] leading-relaxed text-zinc-500 group/bullet font-mono uppercase tracking-tighter">
                    <ChevronRight className="h-3.5 w-3.5 text-zinc-800 mt-0.5 group-hover/bullet:text-emerald-500 transition-colors shrink-0" />
                    <p className="group-hover/bullet:text-zinc-300 transition-colors">{bullet}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded border border-emerald-500/20 bg-emerald-500/5 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
            <Code className="h-5 w-5 text-emerald-500" />
          </div>
          <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-zinc-400">[ STRATEGIC_ASSET_MATRIX ]</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 rounded border border-zinc-900 bg-zinc-950">
            <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-zinc-700 block mb-6 font-mono">01 // INJECTED_KEYNodes</span>
            <div className="flex flex-wrap gap-2">
              {refined_sections.skills.added.map((skill, idx) => (
                <Badge key={idx} className="bg-emerald-500/5 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/10 cursor-default px-3 py-1 font-mono text-[9px] rounded-none uppercase tracking-tighter shadow-[0_0_10px_rgba(16,185,129,0.05)]">
                  {skill}
                </Badge>
              ))}
              {refined_sections.skills.refined.map((skill, idx) => (
                <Badge key={idx} className="bg-zinc-900/50 text-zinc-400 border-zinc-800 hover:bg-zinc-800 cursor-default px-3 py-1 font-mono text-[9px] rounded-none uppercase tracking-tighter">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <div className="p-8 rounded border border-zinc-900 bg-zinc-950 opacity-40 grayscale">
            <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-zinc-800 block mb-6 font-mono">02 // DEPRECATED_LEGACY</span>
            <div className="flex flex-wrap gap-2">
              {refined_sections.skills.removed.map((skill, idx) => (
                <Badge key={idx} variant="outline" className="text-zinc-700 border-zinc-900 line-through font-mono text-[9px] rounded-none uppercase tracking-tighter">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
