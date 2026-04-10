import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingOverlayProps {
  message?: string;
}

export function LoadingOverlay({ message = "EXEC_PROCESS..." }: LoadingOverlayProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950/90 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="scanline pointer-events-none opacity-20" />
      
      <div className="flex flex-col items-start gap-6 p-6 rounded border border-zinc-800 bg-zinc-900 shadow-[0_0_50px_rgba(0,0,0,0.5)] max-w-sm w-full mx-4 animate-in zoom-in-95 duration-500 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-emerald-500/30 animate-[scan_2s_linear_infinite]" />
        
        <div className="w-full flex justify-between items-center border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono font-bold text-emerald-500 uppercase tracking-widest leading-none">Status: Running</span>
          </div>
          <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-tighter">TASK_ID: {Math.random().toString(16).slice(2, 8)}</span>
        </div>

        <div className="space-y-4 w-full">
          <div className="space-y-1">
            <h3 className="text-xs font-bold font-mono tracking-tighter text-zinc-100 uppercase">{message}</h3>
            <p className="text-[9px] font-mono text-zinc-500 uppercase leading-relaxed tracking-tight">
              Executing atomic optimization nodes...
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-[8px] font-mono text-zinc-600 uppercase">
              <span>Progress</span>
              <span>[ AUTOMATED ]</span>
            </div>
            <div className="w-full bg-zinc-950 h-1 rounded-none overflow-hidden border border-zinc-800">
              <div className="bg-emerald-500 h-full animate-[progress_1.5s_ease-in-out_infinite] shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
            </div>
          </div>
        </div>

        <div className="w-full pt-4 font-mono text-[8px] text-zinc-700 leading-tight uppercase border-t border-zinc-800/50">
          - INITIALIZING LLM_ENGINE<br/>
          - PENDING SECTOR_SCAN<br/>
          - SYST: HireCraft_Core.dll
        </div>
      </div>
    </div>
  );
}

