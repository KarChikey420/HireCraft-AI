import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { FileText, Loader2, ShieldCheck, Zap, Target } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      toast.success("Welcome back!", {
        description: "You've been logged in successfully.",
      });
      navigate("/dashboard");
    } catch (error) {
      toast.error("Login failed", {
        description: error instanceof Error ? error.message : "Please check your credentials.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col lg:flex-row overflow-hidden font-sans selection:bg-emerald-500/30">
      {/* Visual Side */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-zinc-950 items-center justify-center p-12 overflow-hidden border-r border-zinc-900">
        <div className="scanline pointer-events-none opacity-20" />
        <div className="absolute inset-0 bg-dot-grid opacity-40 pointer-events-none" />
        
        {/* Technical Gloom */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 blur-[120px] rounded-full animate-pulse" />
        
        <div className="max-w-md relative z-10 space-y-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded border border-emerald-500/30 bg-emerald-500/5 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                <FileText className="h-8 w-8 text-emerald-500" />
              </div>
              <div className="h-[1px] w-24 bg-zinc-800" />
            </div>
            <h2 className="text-4xl font-bold tracking-tighter text-zinc-100 uppercase leading-none">
              Forge assets with<br/>
              <span className="text-emerald-500 terminal-glow">Atomic Precision.</span>
            </h2>
            <p className="text-xs font-mono text-zinc-600 uppercase tracking-widest leading-relaxed">
              High-fidelity career documentation engine for elite developers and technical operators.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { icon: <Target className="h-4 w-4 text-emerald-500/50" />, title: "ATS [INFILTRATION]", desc: "Outsmart algorithms with strategic keyword injection." },
              { icon: <Zap className="h-4 w-4 text-emerald-500/50" />, title: "INSTANT [REFINEMENT]", desc: "Rewrite weak bullets into high-impact metrics in seconds." },
              { icon: <ShieldCheck className="h-4 w-4 text-emerald-500/50" />, title: "VERIFIED [PATTERNS]", desc: "Industry-standard templates that recruiters love." }
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-5 rounded border border-zinc-900 bg-zinc-950/50 backdrop-blur-sm group hover:border-emerald-500/20 transition-colors">
                <div className="shrink-0 mt-0.5">{item.icon}</div>
                <div className="space-y-1">
                  <h4 className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-[0.2em]">{item.title}</h4>
                  <p className="text-[9px] text-zinc-600 font-mono uppercase leading-tight tracking-tighter">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-8 font-mono text-[8px] text-zinc-800 uppercase tracking-widest leading-tight">
            SYST_REF: 0x2A_FF<br/>
            STATUS: SECURE_CORE_ACTIVE<br/>
            ENCRYPTION: AES_256_ACTIVE
          </div>
        </div>
      </div>

      {/* Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-emerald-500/[0.02] blur-[100px] rounded-full pointer-events-none" />
        <div className="w-full max-w-sm space-y-10 animate-in fade-in slide-in-from-right-4 duration-700 relative z-10">
          <div className="space-y-4">
            <div className="inline-flex px-2 py-0.5 rounded border border-emerald-500/20 bg-emerald-500/5 text-emerald-500 text-[9px] font-mono font-bold uppercase tracking-widest">
              [ AUTH_GATE ]
            </div>
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tighter text-zinc-100 uppercase">Login</h1>
              <p className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">
                Access your HireCraft Command Center
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em] font-mono pl-1">Target Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="architect@hirecraft.ai"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 bg-zinc-950 border-zinc-800 text-zinc-100 placeholder:text-zinc-800 focus:ring-emerald-500/30 focus:border-emerald-500/50 rounded-sm font-mono text-xs transition-all uppercase px-4"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between pl-1">
                <Label htmlFor="password" className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em] font-mono">Access Key</Label>
                <a href="#" className="text-[9px] text-emerald-600 font-bold uppercase tracking-widest font-mono hover:text-emerald-500">Lost access?</a>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-11 bg-zinc-950 border-zinc-800 text-zinc-100 placeholder:text-zinc-800 focus:ring-emerald-500/30 focus:border-emerald-500/50 rounded-sm font-mono text-xs transition-all uppercase px-4"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold rounded shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all active:scale-[0.98] font-mono uppercase text-xs tracking-[0.2em]" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Authenticating...
                </>
              ) : (
                "Initialize Session"
              )}
            </Button>
          </form>

          <div className="pt-4 text-center">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] flex-grow bg-zinc-900" />
              <span className="text-[9px] text-zinc-800 font-mono font-bold uppercase tracking-widest">End_Gate</span>
              <div className="h-[1px] flex-grow bg-zinc-900" />
            </div>
            <span className="text-[10px] text-zinc-600 font-mono uppercase tracking-tight">Need an operative account?</span>{" "}
            <Link to="/signup" className="text-emerald-500 hover:text-emerald-400 transition-colors font-bold pl-2 font-mono uppercase text-[10px] tracking-widest">
              Join the Vanguard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
