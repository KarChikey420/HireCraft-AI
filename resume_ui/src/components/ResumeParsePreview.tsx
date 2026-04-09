import React, { useState } from 'react';
import { ChevronDown, ChevronUp, FileSearch, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ResumeParsePreviewProps {
  text: string;
}

export function ResumeParsePreview({ text }: ResumeParsePreviewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Extracted text copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full border border-zinc-800 rounded-2xl bg-zinc-900/30 overflow-hidden transition-all duration-300">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-zinc-800/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
            <FileSearch className="h-4 w-4 text-indigo-400" />
          </div>
          <div className="text-left">
            <h4 className="text-sm font-bold text-zinc-100 uppercase tracking-wider">Raw Resume Extraction</h4>
            <p className="text-[10px] text-zinc-500 font-medium tracking-tight">VIEW THE CLEANED PLAIN-TEXT VERSION OF YOUR UPLOAD</p>
          </div>
        </div>
        {isOpen ? <ChevronUp className="h-5 w-5 text-zinc-500" /> : <ChevronDown className="h-5 w-5 text-zinc-500" />}
      </button>

      {isOpen && (
        <div className="px-6 pb-6 animate-in slide-in-from-top-2 duration-300">
          <div className="relative group">
            <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={handleCopy}
                className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 gap-2 h-8"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? 'Copied' : 'Copy Text'}
              </Button>
            </div>
            <div className="p-6 rounded-xl bg-zinc-950/80 border border-zinc-800 max-h-96 overflow-y-auto custom-scrollbar">
              <pre className="text-sm font-mono text-zinc-400 whitespace-pre-wrap leading-relaxed">
                {text || "No text extracted yet. Upload a resume to begin."}
              </pre>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-[10px] text-zinc-600 font-medium">
            <div className="h-1 w-1 rounded-full bg-zinc-700" />
            THIS TEXT IS USED AS THE FOUNDATION FOR REFINE, TAILOR, AND ATS CHECK TASKS.
          </div>
        </div>
      )}
    </div>
  );
}
