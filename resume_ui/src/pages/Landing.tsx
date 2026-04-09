import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Target, 
  BarChart3, 
  Users,
  Star
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Landing() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-900">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg shadow-amber-500/20">
              <FileText className="h-6 w-6 text-zinc-950" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tighter leading-none">HireCraft AI</span>
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mt-0.5">Premium Operative Suite</span>
            </div>
          </div>
          

          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" className="text-zinc-400 hover:text-amber-500 hover:bg-amber-500/5 font-bold">Log in</Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold px-6 h-11 rounded-xl shadow-xl shadow-amber-500/10 transition-all active:scale-[0.98]">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-44 pb-44 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none animate-pulse" />
        
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto space-y-8 animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold uppercase tracking-widest leading-none">
              <Sparkles className="h-3.5 w-3.5" />
              Next-Gen Career Intelligence
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-zinc-100 leading-[1.1]">
              Engineered for <span className="text-amber-500">Maximum Impact.</span>
              <span className="block mt-2 opacity-90 text-zinc-400">Built for Elite Success.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-zinc-500 font-medium max-w-2xl mx-auto leading-relaxed">
              Transform legacy resumes into high-performance career assets. 
              Atomic-level optimization, JD-tailoring, and deep ATS auditing.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
              <Link to="/signup">
                <Button className="bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold px-10 h-14 rounded-2xl shadow-2xl shadow-amber-500/20 transition-all active:scale-[0.95] text-lg group">
                  Initialize Your Career
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
