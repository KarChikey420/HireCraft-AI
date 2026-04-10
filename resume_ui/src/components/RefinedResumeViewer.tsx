import React from 'react';
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle, FileText, Target, Cpu } from "lucide-react";

interface RefinedResumeViewerProps {
  data: {
    refined_resume: string;
    suggestions: string[];
    technical_keywords: string[];
  };
}

export function RefinedResumeViewer({ data }: RefinedResumeViewerProps) {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Refined Content Area */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded border border-emerald-500/20 bg-emerald-500/5">
            <Cpu className="h-4 w-4 text-emerald-500" />
          </div>
          <h2 className="text-xl font-bold tracking-tighter text-zinc-100 font-mono uppercase">
            [ OUTPUT: OPTIMIZED_RESUME_NODE ]
          </h2>
          <div className="h-px flex-grow bg-zinc-900" />
        </div>
        
        <div className="p-10 rounded border border-zinc-800 bg-zinc-950/40 relative group overflow-hidden">
          <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-zinc-800 uppercase tracking-widest pointer-events-none">
            Enc_Type: AES-256 // Mode: RAW
          </div>
          <pre className="text-xs text-zinc-300 whitespace-pre-wrap leading-relaxed font-mono selection:bg-emerald-500/30 relative z-10">
            {data.refined_resume}
          </pre>
        </div>
      </section>

      {/* Suggestions & Keywords Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Atomic Suggestions */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <h3 className="text-sm font-bold text-zinc-200 font-mono uppercase tracking-widest">
              Optimization_Logs
            </h3>
          </div>
          <div className="space-y-3">
            {(data.suggestions ?? []).map((suggestion, index) => (
              <div 
                key={index}
                className="flex gap-4 p-4 rounded border border-zinc-900 bg-zinc-950/20 group hover:border-zinc-800 transition-colors"
              >
                <span className="text-[10px] font-mono text-zinc-700 mt-0.5">0{index + 1}</span>
                <p className="text-[11px] text-zinc-400 font-mono leading-relaxed uppercase tracking-tight">
                  {suggestion}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Semantic Keywords */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Target className="h-4 w-4 text-emerald-500" />
            <h3 className="text-sm font-bold text-zinc-200 font-mono uppercase tracking-widest">
              Semantic_Payload
            </h3>
          </div>
          <div className="p-6 rounded border border-zinc-900 bg-zinc-950/40">
            <div className="flex flex-wrap gap-2">
              {(data.technical_keywords ?? []).map((keyword, index) => (
                <Badge 
                  key={index} 
                  variant="outline"
                  className="bg-zinc-900/50 border-zinc-800 text-[9px] font-mono py-1 px-2 text-zinc-500 hover:text-emerald-500 hover:border-emerald-500/30 transition-all uppercase"
                >
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
