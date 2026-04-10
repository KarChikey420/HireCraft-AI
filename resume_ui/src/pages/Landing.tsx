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
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden font-sans selection:bg-emerald-500/30">
      {/* Dev-Focused Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-zinc-900">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="p-1 px-2 rounded border border-emerald-500/30 bg-emerald-500/5 text-emerald-500 font-mono font-bold text-xs tracking-tighter">
                HC_AI // ROOT
              </div>
              <span className="font-bold text-sm tracking-tighter text-zinc-100 hidden sm:block uppercase">HireCraft</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" size="sm" className="text-zinc-500 hover:text-emerald-500 font-mono text-[10px] uppercase tracking-widest">Login</Button>
            </Link>
            <Link to="/signup">
              <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-mono font-bold px-4 h-8 rounded shadow-[0_0_15px_rgba(16,185,129,0.2)] text-[10px] uppercase tracking-widest">
                Initialize
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 overflow-hidden bg-dot-grid">
        <div className="scanline pointer-events-none opacity-[0.05]" />
        
        {/* Technical Ornaments */}
        <div className="absolute top-20 left-10 pointer-events-none opacity-20 hidden lg:block">
          <div className="font-mono text-[8px] text-emerald-500 leading-tight">
            [0x00] STATUS: OPTIMAL<br/>
            [0x01] AUTH: VERIFIED<br/>
            [0x02] SYST: HireCraft_Core.dll<br/>
            [0x03] MOD: Res_Opt_v2.0
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto space-y-10 animate-fade-up">
            <div className="inline-flex items-center gap-3 px-3 py-1 rounded border border-emerald-500/20 bg-emerald-500/5 text-emerald-500 text-[10px] font-mono font-bold uppercase tracking-[0.2em] leading-none mb-4 shadow-[0_0_15px_rgba(16,185,129,0.05)]">
              <Sparkles className="h-3 w-3" />
              Career_Intelligence_Engine
            </div>
            
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-zinc-100 uppercase leading-[0.9]">
              Engineered for<br/>
              <span className="text-emerald-500 terminal-glow">Max_Impact.</span>
            </h1>
            
            <div className="max-w-xl mx-auto space-y-6">
              <p className="text-xs md:text-sm text-zinc-500 font-mono uppercase tracking-wide leading-relaxed">
                Transform legacy documentation into high-performance career assets. 
                Atomic optimization // Deep ATS Audit // Semantic Tailoring.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link to="/signup">
                  <Button className="bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-mono font-bold px-10 h-14 rounded shadow-[0_0_25px_rgba(16,185,129,0.25)] transition-all active:scale-[0.98] text-xs uppercase tracking-widest group">
                    Start_Initialization_Engine
                    <ArrowRight className="ml-3 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                </Link>
                <div className="text-[10px] font-mono text-zinc-700 uppercase tracking-widest hidden sm:block">
                  Build Rev: 0x9F_24
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Side Element */}
        <div className="absolute bottom-10 right-10 pointer-events-none opacity-20 hidden lg:block">
           <div className="h-40 w-[1px] bg-gradient-to-t from-emerald-500/50 to-transparent" />
           <div className="font-mono text-[9px] text-zinc-600 rotate-90 origin-left mt-2 uppercase tracking-widest">
             End_to_End_Encryption_Active
           </div>
        </div>
      </section>

      {/* Feature Grid - Minimal & Technical */}
      <section className="py-24 border-t border-zinc-900 bg-zinc-950/20 backdrop-blur-sm relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1 w-full border border-zinc-900 bg-zinc-900">
            {[
              { icon: Sparkles, label: "Atomic_Refinement", desc: "Granular bullet-point optimization using proprietary verb-injection logic." },
              { icon: Target, label: "Semantic_Tailoring", desc: "Cross-referenced JD alignment via high-fidelity NLP matching." },
              { icon: Target, label: "ATS_Audit_Core", desc: "Enterprise-grade applicant tracking system compatibility verification." }
            ].map((feature, i) => (
              <div key={i} className="bg-background p-10 space-y-5 group hover:bg-emerald-500/[0.02] transition-colors">
                <div className="flex items-center justify-between">
                  <feature.icon className="h-5 w-5 text-emerald-500/50 group-hover:text-emerald-500 transition-colors" />
                  <span className="text-[9px] font-mono text-zinc-800 group-hover:text-zinc-600 transition-colors">0{i+1} //_</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xs font-mono font-bold text-zinc-200 uppercase tracking-widest">[{feature.label}]</h3>
                  <p className="text-[10px] font-mono text-zinc-600 leading-relaxed uppercase tracking-tight line-clamp-2">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

