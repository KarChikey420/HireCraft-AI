import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingOverlayProps {
  message?: string;
}

export function LoadingOverlay({ message = "Processing your request..." }: LoadingOverlayProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="flex flex-col items-center gap-6 p-8 rounded-3xl bg-card border border-border shadow-2xl shadow-emerald-500/10 max-w-sm w-full mx-4 animate-in zoom-in-95 duration-500">
        <div className="relative">
          <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full" />
          <div className="relative p-4 bg-background rounded-2xl border border-border">
            <Loader2 className="h-10 w-10 text-emerald-500 animate-spin" />
          </div>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-bold font-mono tracking-tight text-zinc-100 mb-1">{message}</h3>
          <p className="text-sm text-zinc-500">This might take a few seconds as our AI agents optimize your resume.</p>
        </div>
        <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
          <div className="bg-emerald-500 h-full animate-[progress_2s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}
