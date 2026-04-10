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
          <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <Rocket className="h-5 w-5 text-emerald-500" />
          </div>
          <h3 className="text-xl font-bold tracking-tight text-zinc-100">Executive Summary</h3>
        </div>
        <div className="p-6 rounded-2xl bg-card border border-border backdrop-blur-sm group-hover:border-emerald-500/30 transition-colors duration-500">
          <p className="text-zinc-400 leading-relaxed italic text-lg">
            "{refined_sections.summary}"
          </p>
        </div>
      </section>

      {/* Experience Section */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <Briefcase className="h-5 w-5 text-emerald-500" />
          </div>
          <h3 className="text-xl font-bold tracking-tight text-zinc-100">Optimized Experience</h3>
        </div>
        <div className="space-y-8">
          {refined_sections.experience.map((exp, idx) => (
            <div key={idx} className="relative pl-8 border-l border-border group">
              <div className="absolute left-[-5px] top-0 h-2.5 w-2.5 rounded-full bg-zinc-700 group-hover:bg-emerald-500 transition-colors" />
              <div className="mb-4">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
                  <h4 className="text-lg font-bold text-zinc-100">{exp.role}</h4>
                  <Badge variant="outline" className="text-zinc-500 border-border font-mono text-[10px]">{exp.duration}</Badge>
                </div>
                <p className="text-zinc-500 font-bold font-mono text-xs uppercase tracking-wide mb-4">{exp.company}</p>
              </div>
              <div className="space-y-3">
                {exp.bullets_refined.map((bullet, bIdx) => (
                  <div key={bIdx} className="flex gap-3 text-sm leading-relaxed text-zinc-400 group/bullet">
                    <ChevronRight className="h-4 w-4 text-zinc-600 mt-0.5 group-hover/bullet:text-emerald-500 transition-colors shrink-0" />
                    <p>{bullet}</p>
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
          <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <Code className="h-5 w-5 text-emerald-500" />
          </div>
          <h3 className="text-xl font-bold tracking-tight text-zinc-100">Strategic Skills</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-card border border-border">
            <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 block mb-4 font-mono">Newly Added / Optimized</span>
            <div className="flex flex-wrap gap-2">
              {refined_sections.skills.added.map((skill, idx) => (
                <Badge key={idx} className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/20 cursor-default px-3 py-1 font-mono text-[10px]">
                  {skill}
                </Badge>
              ))}
              {refined_sections.skills.refined.map((skill, idx) => (
                <Badge key={idx} className="bg-emerald-500/10 text-zinc-100 border-border hover:bg-zinc-800 cursor-default px-3 py-1 font-mono text-[10px]">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-card border border-border opacity-60">
            <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 block mb-4 font-mono">Removed for ATS Optimization</span>
            <div className="flex flex-wrap gap-2">
              {refined_sections.skills.removed.map((skill, idx) => (
                <Badge key={idx} variant="outline" className="text-zinc-600 border-border line-through font-mono text-[10px]">
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
  );
}
