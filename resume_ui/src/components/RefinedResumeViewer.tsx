import React from 'react';
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Target, Cpu, Briefcase, FileText } from "lucide-react";
import { RefinedResumeResponse } from "@/services/resume.service";

interface RefinedResumeViewerProps {
  data: RefinedResumeResponse;
}

export function RefinedResumeViewer({ data }: RefinedResumeViewerProps) {
  const refined_sections = data?.refined_sections;
  const gap_analysis = data?.gap_analysis;

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Executive Summary */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded border border-emerald-500/20 bg-emerald-500/5">
            <Cpu className="h-4 w-4 text-emerald-500" />
          </div>
          <h2 className="text-xl font-bold tracking-tighter text-zinc-100 font-mono uppercase">
            [ OUTPUT: EXECUTIVE_SUMMARY_NODE ]
          </h2>
          <div className="h-px flex-grow bg-zinc-900" />
        </div>
        
        <div className="p-8 rounded border border-zinc-900 bg-zinc-950/40 relative group">
          <pre className="text-xs text-zinc-300 whitespace-pre-wrap leading-relaxed font-mono selection:bg-emerald-500/30">
            {refined_sections?.summary ?? "No summary generated."}
          </pre>
        </div>
      </section>

      {/* Experience Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded border border-emerald-500/20 bg-emerald-500/5">
            <Briefcase className="h-4 w-4 text-emerald-500" />
          </div>
          <h2 className="text-lg font-bold tracking-tighter text-zinc-100 font-mono uppercase">
            [ RESULT: REFINED_EXPERIENCE_STACK ]
          </h2>
          <div className="h-px flex-grow bg-zinc-900" />
        </div>

        <div className="space-y-8">
          {(refined_sections?.experience ?? []).map((exp, idx) => (
            <div key={idx} className="relative pl-6 border-l border-zinc-900 space-y-4">
              <div className="absolute top-0 left-[-1px] w-[1px] h-4 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-zinc-100 font-mono uppercase tracking-tight">{exp.role}</h3>
                  <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">{exp.company}</p>
                </div>
                <span className="text-[9px] font-mono text-zinc-700 bg-zinc-900 px-2 py-1 rounded border border-zinc-800">
                  {exp.duration}
                </span>
              </div>
              
              <ul className="space-y-3">
                {(exp.bullets_refined ?? []).map((bullet, bIdx) => (
                  <li key={bIdx} className="text-[11px] text-zinc-400 font-mono leading-relaxed flex gap-3 group">
                    <span className="text-emerald-900 group-hover:text-emerald-500 transition-colors mt-0.5">»</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Skill Matrix */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded border border-emerald-500/20 bg-emerald-500/5">
            <Target className="h-4 w-4 text-emerald-500" />
          </div>
          <h2 className="text-lg font-bold tracking-tighter text-zinc-100 font-mono uppercase">
            [ RESULT: SKILL_MATRIX_OPT ]
          </h2>
          <div className="h-px flex-grow bg-zinc-900" />
        </div>

        <div className="p-8 rounded border border-zinc-900 bg-zinc-950/40">
          <div className="flex flex-wrap gap-2">
            {(refined_sections?.skills?.refined ?? []).map((skill, index) => (
              <Badge 
                key={index} 
                variant="outline"
                className="bg-zinc-900/50 border-zinc-800 text-[10px] font-mono py-1 px-3 text-zinc-400 hover:text-emerald-500 hover:border-emerald-500/30 transition-all uppercase"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Optimization Logs (Metadata) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-10 border-t border-zinc-900">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <h3 className="text-[10px] font-bold text-zinc-500 font-mono uppercase tracking-[0.2em]">Optimization_Queue</h3>
          </div>
          <div className="space-y-3">
            {(data?.what_to_fix_next ?? []).map((log, index) => (
              <div key={index} className="flex gap-4 p-4 rounded border border-zinc-900 bg-zinc-950/20">
                <span className="text-[10px] font-mono text-zinc-800">0{index + 1}</span>
                <p className="text-[10px] text-zinc-500 font-mono leading-relaxed uppercase tracking-tight">
                  {log}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <FileText className="h-4 w-4 text-emerald-500" />
            <h3 className="text-[10px] font-bold text-zinc-500 font-mono uppercase tracking-[0.2em]">Semantic_Gaps</h3>
          </div>
          <div className="p-6 rounded border border-zinc-900 bg-zinc-950/40">
             <div className="flex flex-wrap gap-2">
                {(gap_analysis?.missing_keywords ?? []).map((kw, index) => (
                  <Badge key={index} variant="destructive" className="bg-red-500/5 border-red-500/20 text-red-500/70 text-[9px] lowercase">
                    {kw}
                  </Badge>
                ))}
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
